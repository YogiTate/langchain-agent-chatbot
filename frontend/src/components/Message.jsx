import React from "react";

function Message({ role, content }) {
  const isUser = role === "user";

  return (
    <div className={`msg-row ${isUser ? "user" : "bot"}`}>
      {isUser ? (
        // User Avatar Badge
        <div className="avatar user-icon">U</div>
      ) : (
        // Agent Bot Avatar utilizing your custom JPEG icon
        <img 
          className="avatar" 
          src="/src/assest/favicon.jpg" 
          alt="Agent Icon" 
        />
      )}

      <div className="bubble-container">
        <span className="bubble-sender">
          {isUser ? "You" : "Agent AI"}
        </span>
        <div className="bubble">
          {content}
        </div>
      </div>
    </div>
  );
}

export default Message;