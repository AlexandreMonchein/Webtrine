import { useEffect, useState } from "react";

import { useAppState } from "../state";

interface JsonEditorProps {
  block: unknown;
}

/**
 * Raw JSON view of the currently selected block. "Appliquer" parses the
 * textarea and, on success, replaces the whole block via
 * `updateBlock([], parsed)` (an empty path is a full replace — see
 * `setAtPath` in state.tsx). On a parse error the block is left untouched
 * and the error is shown inline; the draft text is never reset in that
 * case, so the user's edit isn't lost.
 */
function JsonEditor({ block }: JsonEditorProps) {
  const { updateBlock } = useAppState();
  const [text, setText] = useState(() => JSON.stringify(block, null, 2));
  const [error, setError] = useState<string | null>(null);

  // Reload the draft whenever the underlying block changes identity (a
  // different block got selected, or it was replaced by a save/reload) —
  // but not on every keystroke, so typing isn't clobbered.
  useEffect(() => {
    setText(JSON.stringify(block, null, 2));
    setError(null);
  }, [block]);

  const apply = (): void => {
    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      return;
    }
    setError(null);
    updateBlock([], parsed);
  };

  return (
    <div className="json-editor">
      <textarea
        className="json-editor-textarea"
        value={text}
        spellCheck={false}
        onChange={(event) => setText(event.target.value)}
      />
      {error && (
        <div className="json-editor-error" role="alert">
          {error}
        </div>
      )}
      <button type="button" className="json-editor-apply" onClick={apply}>
        Appliquer
      </button>
    </div>
  );
}

export default JsonEditor;
