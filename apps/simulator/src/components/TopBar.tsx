import { PAGE_ROUTES } from "../routes";
import { findPageTemplate, type SavingState, useAppState } from "../state";

const SAVE_CHIP: Record<SavingState, { label: string; color: string }> = {
  saved: { label: "saved ✓", color: "#1a7f37" },
  saving: { label: "saving…", color: "#9a6700" },
  error: { label: "error ⚠", color: "#cf222e" },
};

function TopBar() {
  const { state, setCustomer, setLang, setPage } = useAppState();
  const { customers, customer, lang, page, config, saving } = state;

  const langs = customers.find((entry) => entry.name === customer)?.langs ?? [];
  const saveChip = SAVE_CHIP[saving];

  return (
    <div className="topbar">
      <label className="topbar-field">
        <span>Client</span>
        <select
          value={customer}
          onChange={(event) => void setCustomer(event.target.value)}
        >
          {customers.map((entry) => (
            <option key={entry.name} value={entry.name}>
              {entry.name}
            </option>
          ))}
        </select>
      </label>

      <div className="topbar-langs" role="group" aria-label="Langue">
        {langs.map((entry) => (
          <button
            key={entry}
            type="button"
            className={entry === lang ? "lang-toggle active" : "lang-toggle"}
            onClick={() => void setLang(entry)}
          >
            {entry}
          </button>
        ))}
      </div>

      <label className="topbar-field">
        <span>Page</span>
        <select
          value={page.path}
          onChange={(event) => {
            const next = PAGE_ROUTES.find(
              (route) => route.path === event.target.value,
            );
            if (next) setPage(next);
          }}
        >
          {PAGE_ROUTES.map((route) => {
            const exists = Boolean(
              findPageTemplate(config, route.templateName),
            );
            return (
              <option key={route.path} value={route.path}>
                {route.templateName}
                {exists ? "" : " (vide)"}
              </option>
            );
          })}
        </select>
      </label>

      <div className="topbar-spacer" />

      <div
        className="save-chip"
        style={{ color: saveChip.color }}
        role="status"
      >
        état&nbsp;: {saveChip.label}
      </div>
    </div>
  );
}

export default TopBar;
