"use client";

import { useChat } from "ai/react";
import { FaUser, FaRobot, FaPaperPlane } from "react-icons/fa";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1
        style={{
          textAlign: "center",
          color: "white",
          margin: "20px 0",
          fontSize: "25px",
        }}
      >
        Chatbot
      </h1>
      <div
        style={{
          border: "1px solid #ccc",
          backgroundColor: "#f9f9f9",
          padding: "10px",
          height: "600px",
          overflowY: "scroll",
          borderRadius: "5px",
        }}
      >
        {messages.length > 0 &&
          messages.map((message, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent:
                  message.role === "user" ? "flex-end" : "flex-start",
                margin: "5px 0",
              }}
            >
              {message.role === "user" ? (
                <>
                  <div
                    style={{
                      padding: "10px",
                      backgroundColor: "#409CFF",
                      borderRadius: "10px",
                      maxWidth: "70%",
                    }}
                  >
                    {message.content}
                  </div>
                  <FaUser
                    style={{
                      marginLeft: "10px",
                      color: "#007bff",
                      fontSize: "22px",
                    }}
                  />
                </>
              ) : (
                <>
                  <FaRobot
                    style={{
                      marginRight: "10px",
                      color: "#333",
                      fontSize: "22px",
                    }}
                  />
                  <div
                    style={{
                      padding: "10px",
                      backgroundColor: "#A5A5A5",
                      borderRadius: "10px",
                      maxWidth: "70%",
                    }}
                  >
                    {message.content}
                  </div>
                </>
              )}
            </div>
          ))}
      </div>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Ask me anything"
          style={{
            flex: "1",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            color: "black",
          }}
        />
        <button
          title="Send message"
          type="submit"
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "10px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            marginLeft: "10px",
          }}
        >
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
}
