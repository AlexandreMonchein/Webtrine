import type {
  AppConfig,
  CatalogEntry,
  CustomerInfo,
  LangData,
  StyleConfig,
} from "./types";

const BASE_URL = "/api";

export type ApiErrorPayload =
  | { error: string }
  | { parseError: string; raw: string };

const isApiErrorPayload = (payload: unknown): payload is ApiErrorPayload =>
  typeof payload === "object" &&
  payload !== null &&
  ("error" in payload || "parseError" in payload);

const describeError = (status: number, payload: unknown): string => {
  if (isApiErrorPayload(payload)) {
    return "error" in payload ? payload.error : payload.parseError;
  }
  return `request failed with status ${status}`;
};

/**
 * Thrown for any non-2xx response. Carries the HTTP status and the parsed
 * JSON payload the server sent (`{error}` or, for a 422 config parse
 * failure, `{parseError, raw}`).
 */
export class ApiError extends Error {
  readonly status: number;
  readonly payload: ApiErrorPayload | undefined;

  constructor(status: number, payload: unknown) {
    super(describeError(status, payload));
    this.name = "ApiError";
    this.status = status;
    this.payload = isApiErrorPayload(payload) ? payload : undefined;
  }
}

const parseBody = async (res: Response): Promise<unknown> => {
  const text = await res.text();
  if (!text) return undefined;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

const request = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const res = await fetch(`${BASE_URL}${path}`, init);
  const payload = await parseBody(res);
  if (!res.ok) {
    throw new ApiError(res.status, payload);
  }
  return payload as T;
};

const putJson = <T>(path: string, data: unknown): Promise<T> =>
  request<T>(path, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

const seg = (value: string): string => encodeURIComponent(value);

export const getCustomers = (): Promise<CustomerInfo[]> =>
  request("/customers");

export const getConfig = (customer: string, lang: string): Promise<AppConfig> =>
  request<{ data: AppConfig }>(`/config/${seg(customer)}/${seg(lang)}`).then(
    (res) => res.data,
  );

export const putConfig = (
  customer: string,
  lang: string,
  data: AppConfig,
): Promise<void> =>
  putJson<{ ok: true }>(`/config/${seg(customer)}/${seg(lang)}`, data).then(
    () => undefined,
  );

export const getStyle = (customer: string): Promise<StyleConfig> =>
  request<{ data: StyleConfig }>(`/style/${seg(customer)}`).then(
    (res) => res.data,
  );

export const putStyle = (customer: string, data: StyleConfig): Promise<void> =>
  putJson<{ ok: true }>(`/style/${seg(customer)}`, data).then(() => undefined);

export const getLang = (customer: string, lang: string): Promise<LangData> =>
  request<{ data: LangData }>(`/lang/${seg(customer)}/${seg(lang)}`).then(
    (res) => res.data,
  );

export const putLang = (
  customer: string,
  lang: string,
  data: LangData,
): Promise<void> =>
  putJson<{ ok: true }>(`/lang/${seg(customer)}/${seg(lang)}`, data).then(
    () => undefined,
  );

export const getSchemas = (): Promise<CatalogEntry[]> => request("/schemas");

export const getAssets = (customer: string): Promise<string[]> =>
  request(`/assets/${seg(customer)}`);
