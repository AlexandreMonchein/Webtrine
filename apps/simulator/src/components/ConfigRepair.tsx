import { useState } from "react";

import { useAppState } from "../state";

/**
 * Shown in the Editor pane instead of the usual tabs whenever
 * `state.configError` is set — i.e. the current customer/lang's
 * `config.<lang>.json` failed to parse as JSON on the server. Lets the
 * user fix the raw text in place: "Réparer et enregistrer" parses it
 * locally (an inline error on failure, textarea left untouched so nothing
 * typed is lost), then PUTs it back and reloads the config on success.
 */
function ConfigRepair() {
  const { state, repairConfig } = useAppState();
  const configError = state.configError;
  const [text, setText] = useState(() => configError?.raw ?? "");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  if (!configError) return null;

  const onRepair = async (): Promise<void> => {
    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      return;
    }
    setError(null);
    setSaving(true);
    const ok = await repairConfig(parsed);
    setSaving(false);
    if (!ok) {
      setError("Échec de l'enregistrement — réessayez.");
    }
  };

  return (
    <div className="config-repair">
      <div className="config-repair-title">Fichier JSON invalide</div>
      <div className="config-repair-message">{configError.parseError}</div>
      <textarea
        className="config-repair-textarea"
        value={text}
        spellCheck={false}
        onChange={(event) => setText(event.target.value)}
      />
      {error && (
        <div className="config-repair-error" role="alert">
          {error}
        </div>
      )}
      <button
        type="button"
        className="config-repair-apply"
        disabled={saving}
        onClick={() => void onRepair()}
      >
        Réparer et enregistrer
      </button>
    </div>
  );
}

export default ConfigRepair;
