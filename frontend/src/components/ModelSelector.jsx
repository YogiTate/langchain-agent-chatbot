import "./ModelSelector.css";
function ModelSelector({ provider, setProvider }) {
  return (
    <div className="model-selector">
      <div className="model-selector-label">
        <span className="model-icon">
          🤖
        </span>

        <div>
          <div className="model-title">
            AI MODEL
          </div>

          <div className="model-subtitle">
            Select inference provider
          </div>
        </div>
      </div>

      <select
        className="model-select"
        value={provider}
        onChange={(e) => setProvider(e.target.value)}
      >
        <option value="ollama">
          Local Ollama 
        </option>

        <option value="nvidia">
          Cloud AI
        </option>
      </select>

      <div
        className={`model-status ${
          provider === "ollama"
            ? "local"
            : "cloud"
        }`}
      >
        <span className="model-status-dot"></span>

        {provider === "ollama"
          ? "Local"
          : "Cloud"}
      </div>
    </div>
  );
}

export default ModelSelector;