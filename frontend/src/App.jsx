import { useState } from "react";
import { v4 as uuid } from "uuid";

import ChatWindow from "./components/ChatWindow";
import TraceRail from "./components/TraceRail";
import ModelSelector from "./components/ModelSelector";

import { sendMessage } from "./api";


// -----------------------------------------
// CREATE SESSION ID
// -----------------------------------------

const SESSION_ID = uuid();


// -----------------------------------------
// APP
// -----------------------------------------

function App() {

  // ---------------------------------------
  // STATE
  // ---------------------------------------

  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([]);

  const [trace, setTrace] = useState([]);

  const [isProcessing, setIsProcessing] = useState(false);

  // Selected AI provider
  //
  // ollama = Local Qwen
  // nvidia = NVIDIA Cloud
  //
  const [provider, setProvider] =
  useState(
    import.meta.env.PROD
      ? "nvidia"
      : "ollama"
  );


  // ---------------------------------------
  // SEND MESSAGE
  // ---------------------------------------

  const handleSend = async () => {

    if (!input.trim() || isProcessing) {
      return;
    }

    const currentPrompt = input.trim();

    // Clear input
    setInput("");

    // Start processing
    setIsProcessing(true);


    try {

      // -----------------------------------
      // SEND REQUEST TO BACKEND
      // -----------------------------------

      const response = await sendMessage(
        SESSION_ID,
        currentPrompt,
        provider
      );


      // -----------------------------------
      // ADD MESSAGE
      // -----------------------------------

      setMessages((prev) => [
        ...prev,
        {
          user: currentPrompt,
          bot: response.reply,
          provider: provider,
        },
      ]);


      // -----------------------------------
      // UPDATE TRACE
      // -----------------------------------

      setTrace(response.trace || []);


    } catch (error) {

      console.error(
        "Agent request failed:",
        error
      );


      // -----------------------------------
      // ERROR MESSAGE
      // -----------------------------------

      setMessages((prev) => [
        ...prev,
        {
          user: currentPrompt,
          bot: "Error: Cannot connect to Agent Backend.",
          provider: provider,
        },
      ]);

    } finally {

      setIsProcessing(false);

    }
  };


  // ---------------------------------------
  // RENDER
  // ---------------------------------------

  return (
    <div className="dashboard-container">

      {/* ==================================
          SIDEBAR
      ================================== */}

      <TraceRail
        trace={trace}
      />


      {/* ==================================
          MAIN CHAT AREA
      ================================== */}

      <div className="chat-canvas">


        {/* =================================
            HEADER
        ================================= */}

        <div className="chat-header-bar">

          <h2>
            Agentic Command Center
          </h2>

          <div className="status-badge">

            <span
              className={`status-dot ${
                isProcessing
                  ? "processing"
                  : "online"
              }`}
            />

            {isProcessing
              ? "Processing..."
              : "System Ready"}

          </div>

        </div>


        {/* =================================
            AI MODEL SELECTOR
        ================================= */}

        <ModelSelector
          provider={provider}
          setProvider={setProvider}
        />


        {/* =================================
            CHAT WINDOW
        ================================= */}

        <ChatWindow
          messages={messages}
        />


        {/* =================================
            INPUT AREA
        ================================= */}

        <div className="input-dock">

          <div className="input-wrapper">

            <input
              type="text"
              value={input}

              onChange={(e) =>
                setInput(e.target.value)
              }

              onKeyDown={(e) => {

                if (
                  e.key === "Enter" &&
                  !e.shiftKey
                ) {
                  e.preventDefault();

                  handleSend();
                }

              }}

              placeholder={
                isProcessing
                  ? "Agent is processing..."
                  : "Message Agent AI..."
              }

              disabled={isProcessing}

            />


            <button
              className="action-btn"

              onClick={handleSend}

              disabled={
                isProcessing ||
                !input.trim()
              }
            >

              {isProcessing
                ? "Computing..."
                : "Send"}

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}


export default App;