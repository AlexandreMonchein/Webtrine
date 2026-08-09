import { useEffect, useState } from "react";

import { useAppState } from "../state";

const PREVIEW_ORIGIN = "http://localhost:3000";
const POLL_INTERVAL_MS = 5000;

function Preview() {
  const { state } = useAppState();
  const { customer, lang, page, previewVersion, configError } = state;
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const checkOnline = async () => {
      try {
        // no-cors: we only care whether the request reaches a server at all
        // (rejects on connection failure); the opaque response itself is
        // never read.
        await fetch(`${PREVIEW_ORIGIN}/`, { mode: "no-cors" });
        if (!cancelled) setOffline(false);
      } catch {
        if (!cancelled) setOffline(true);
      }
    };

    void checkOnline();
    const timer = setInterval(() => void checkOnline(), POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, []);

  // A `configError` (422 parse failure) means there is no valid config to
  // render — pointing the iframe at it anyway just makes webtrine's own
  // dynamic import of the broken JSON blow up inside the iframe's console.
  // Skip it until the file is repaired.
  const ready = customer !== "" && lang !== "" && !configError;
  const src = `${PREVIEW_ORIGIN}${page.path}?customer=${encodeURIComponent(
    customer,
  )}&lng=${encodeURIComponent(lang)}`;

  return (
    <div className="preview-pane">
      {offline && (
        <div className="preview-banner" role="alert">
          Preview server hors-ligne — lancez pnpm dev
        </div>
      )}
      {configError && (
        <div className="preview-banner" role="alert">
          Configuration invalide — aperçu indisponible.
        </div>
      )}
      {ready && (
        <iframe
          key={previewVersion}
          className="preview-iframe"
          src={src}
          title="Aperçu"
        />
      )}
    </div>
  );
}

export default Preview;
