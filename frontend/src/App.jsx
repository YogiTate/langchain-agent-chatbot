import { useState } from "react";
import { v4 as uuid } from "uuid";
import ChatWindow from "./components/ChatWindow";
import TraceRail from "./components/TraceRail";
import { sendMessage } from "./api";

const SESSION_ID = uuid();

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [trace, setTrace] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isProcessing) return;
    const currentPrompt = input;
    setInput("");
    setIsProcessing(true);

    try {
      const response = await sendMessage(SESSION_ID, currentPrompt);
      setMessages((prev) => [...prev, { user: currentPrompt, bot: response.reply }]);
      setTrace(response.trace);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { user: currentPrompt, bot: "Error: Cannot connect to Agent Backend." }
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar Live Trace */}
      <TraceRail trace={trace} />
      
      {/* Primary Communication Space */}
      <div className="chat-canvas">
        <div className="chat-header-bar">
          <h2>Agentic Command Center</h2>
          <div className="status-badge">
            <span className="status-dot"></span>
            {isProcessing ? "Processing constraints..." : "System Idle"}
          </div>
        </div>

        <ChatWindow messages={messages} />

        <div className="input-dock">
          <div className="input-wrapper">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={isProcessing ? "Compiling tools..." : "Message Agent AI..."}
              disabled={isProcessing}
            />
            <button 
              className="action-btn" 
              onClick={handleSend} 
              disabled={isProcessing || !input.trim()}
            >
              {isProcessing ? "Computing" : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;