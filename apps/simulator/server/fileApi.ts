import fs from "node:fs";
import type { IncomingMessage, ServerResponse } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

import type { Plugin } from "vite";

import {
  type FileKind,
  listCustomers,
  NAME_PATTERN,
  readJsonFile,
  writeJsonFile,
} from "./files";
import { buildRegistry, type CatalogEntry } from "./registry";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const webtrineRoot = path.resolve(dirname, "../../webtrine");
const designSystemDir = path.join(webtrineRoot, "src", "design-system");

const MAX_BODY_BYTES = 5 * 1024 * 1024; // 5MB
const IMAGE_EXTENSIONS = new Set([
  ".webp",
  ".png",
  ".jpg",
  ".jpeg",
  ".svg",
  ".gif",
]);

const json = (res: ServerResponse, status: number, payload: unknown): void => {
  const body = JSON.stringify(payload);
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(body);
};

const readBody = (req: IncomingMessage): Promise<string> =>
  new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    let total = 0;
    let rejected = false;

    req.on("data", (chunk: Buffer) => {
      if (rejected) return;
      total += chunk.length;
      if (total > MAX_BODY_BYTES) {
        rejected = true;
        // Do not destroy the socket here: the client may still be
        // streaming the request body, and destroying it now resets the
        // connection before the 413 JSON response can be delivered. Just
        // stop buffering and let the PUT handler close the request after
        // the response has been flushed to the client.
        reject(new Error("payload too large"));
        return;
      }
      chunks.push(chunk);
    });

    req.on("end", () => {
      if (rejected) return;
      resolve(Buffer.concat(chunks).toString("utf8"));
    });

    req.on("error", (err) => {
      if (rejected) return;
      rejected = true;
      reject(err);
    });
  });

const listImageBasenames = (dir: string): string[] => {
  const names: string[] = [];

  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      names.push(...listImageBasenames(full));
      continue;
    }
    const ext = path.extname(entry.name).toLowerCase();
    if (IMAGE_EXTENSIONS.has(ext)) {
      names.push(path.basename(entry.name, path.extname(entry.name)));
    }
  }

  return names;
};

export const fileApiPlugin = (): Plugin => {
  let schemaCache: CatalogEntry[] | undefined;

  const handleRoute = async (
    method: string,
    segments: string[],
    req: IncomingMessage,
    res: ServerResponse,
    query: URLSearchParams,
  ): Promise<void> => {
    const [resource, customer, lang] = segments;

    if (resource === "customers" && method === "GET" && segments.length === 1) {
      json(res, 200, listCustomers(webtrineRoot));
      return;
    }

    if (resource === "schemas" && method === "GET" && segments.length === 1) {
      if (!schemaCache || query.get("refresh") === "1") {
        schemaCache = buildRegistry(designSystemDir);
      }
      json(res, 200, schemaCache);
      return;
    }

    if (resource === "assets" && method === "GET" && segments.length === 2) {
      if (!NAME_PATTERN.test(customer)) {
        throw new Error(`invalid customer: "${customer}"`);
      }
      const dir = path.join(webtrineRoot, "public", "assets", customer);
      // Different files can share a basename (e.g. a .png and a .webp of
      // the same image, or the same name reused in a nested folder) — they
      // all refer to the same asset from a config author's point of view,
      // so de-dupe rather than handing the client a list with repeats
      // (which, rendered as <option> keys in a <datalist>, React rejects
      // with a duplicate-key warning).
      json(res, 200, [...new Set(listImageBasenames(dir))]);
      return;
    }

    const kindMap: Record<string, { kind: FileKind; segmentCount: number }> = {
      config: { kind: "config", segmentCount: 3 },
      style: { kind: "style", segmentCount: 2 },
      lang: { kind: "lang", segmentCount: 3 },
    };

    const kindEntry = kindMap[resource];
    if (kindEntry && segments.length === kindEntry.segmentCount) {
      const { kind } = kindEntry;

      if (method === "GET") {
        const result = readJsonFile(webtrineRoot, kind, customer, lang);
        if ("parseError" in result) {
          json(res, 422, { parseError: result.parseError, raw: result.raw });
        } else {
          json(res, 200, { data: result.data });
        }
        return;
      }

      if (method === "PUT") {
        let raw: string;
        try {
          raw = await readBody(req);
        } catch (err) {
          if (err instanceof Error && err.message === "payload too large") {
            // Deliver the 413 JSON before tearing down the connection: the
            // client is still uploading (or waiting for a response), and
            // destroying the socket first would reset it before the error
            // body ever arrives.
            json(res, 413, { error: err.message });
            res.once("finish", () => req.destroy());
          } else {
            json(res, 400, {
              error: err instanceof Error ? err.message : String(err),
            });
          }
          return;
        }

        let data: unknown;
        try {
          data = JSON.parse(raw);
        } catch (err) {
          json(res, 400, {
            error: `invalid JSON body: ${err instanceof Error ? err.message : String(err)}`,
          });
          return;
        }

        writeJsonFile(webtrineRoot, kind, customer, data, lang);
        json(res, 200, { ok: true });
        return;
      }
    }

    json(res, 404, { error: "unknown endpoint" });
  };

  return {
    name: "file-api",
    configureServer(server) {
      server.middlewares.use("/api", (req, res) => {
        void (async () => {
          try {
            const url = new URL(req.url ?? "/", "http://localhost");
            const segments = url.pathname.split("/").filter(Boolean);
            const method = req.method ?? "GET";

            await handleRoute(method, segments, req, res, url.searchParams);
          } catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            const status = message.startsWith("not found") ? 404 : 400;
            json(res, status, { error: message });
          }
        })().catch((err) => {
          const message = err instanceof Error ? err.message : String(err);
          // A response may already have been sent (or be mid-flight) by the
          // time this fires; writing again would throw on top of the
          // original error and crash the dev server.
          if (res.headersSent) {
            console.error(
              `file-api: unhandled error after response sent: ${message}`,
            );
            return;
          }
          json(res, 500, { error: message });
        });
      });
    },
  };
};
