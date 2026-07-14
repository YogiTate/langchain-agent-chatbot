import React, { useEffect, useRef } from "react";
import Message from "./Message";

function ChatWindow({ messages }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="empty-state">
        {/* Big glowing welcome logo centered in empty state */}
        <img 
          src="/src/assest/favicon.jpg" 
          alt="Agent Logo" 
          className="welcome-logo" 
        />
        <h1>How can I help you today?</h1>
        <p>
          Ask a question to query the custom LLM agent environment. Watch live execution processes, math solvers, and system details populate the sidebar.
        </p>
      </div>
    );
  }

  return (
    <div className="chat-window">
      {messages.map((msg, index) => (
        <React.Fragment key={index}>
          <Message role="user" content={msg.user} />
          <Message role="bot" content={msg.bot} />
        </React.Fragment>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}

export default ChatWindow;