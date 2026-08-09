import "./app.css";

import Editor from "./components/Editor";
import Preview from "./components/Preview";
import TopBar from "./components/TopBar";
import Tree from "./components/Tree";
import { AppStateProvider } from "./state";

function App() {
  return (
    <AppStateProvider>
      <div className="app-shell">
        <header className="app-topbar">
          <TopBar />
        </header>
        <aside className="app-tree">
          <Tree />
        </aside>
        <main className="app-preview">
          <Preview />
        </main>
        <aside className="app-editor">
          <Editor />
        </aside>
      </div>
    </AppStateProvider>
  );
}

export default App;
