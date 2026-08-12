import React, {
  useEffect,
  useRef
} from "react";

import Message from "./Message";


function ChatWindow({ messages = [] }) {

  const bottomRef = useRef(null);


  // -----------------------------------------
  // AUTO SCROLL
  // -----------------------------------------

  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages]);


  // -----------------------------------------
  // EMPTY STATE
  // -----------------------------------------

  if (messages.length === 0) {

    return (

      <div className="empty-state">

        <img
          src="/src/assest/favicon.jpg"
          alt="Agent Logo"
          className="welcome-logo"
        />

        <h1>
          How can I help you today?
        </h1>

        <p>
          Ask a question to interact with the
          Agentic AI system. The agent can use
          tools, maintain conversational memory,
          and execute tasks using the selected
          AI model.
        </p>

      </div>

    );
  }


  // -----------------------------------------
  // CHAT MESSAGES
  // -----------------------------------------

  return (

    <div className="chat-window">

      {messages.map((msg, index) => (

        <React.Fragment key={index}>

          {msg.user && (
            <Message
              role="user"
              content={msg.user}
            />
          )}

          {msg.bot && (
            <Message
              role="bot"
              content={msg.bot}
            />
          )}

        </React.Fragment>

      ))}


      <div ref={bottomRef} />

    </div>

  );
}


export default ChatWindow;