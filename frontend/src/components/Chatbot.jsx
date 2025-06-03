import React, { useState, useEffect, useRef } from "react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! How can I help you prepare for your interviews today?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleInputChange = (e) => setInputValue(e.target.value);

  // Function to process markdown formatting
  const processMarkdown = (text) => {
    if (!text) return "";

    // Convert **text** to bold
    const parts = text.split(/(\*\*.*?\*\*)/g);

    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        const boldText = part.slice(2, -2);
        return <strong key={index}>{boldText}</strong>;
      }
      // Handle line breaks
      return part.split("\n").map((line, lineIndex, array) => (
        <span key={`${index}-${lineIndex}`}>
          {line}
          {lineIndex < array.length - 1 && <br />}
        </span>
      ));
    });
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;

    const newMessage = { sender: "user", text: inputValue };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const apiUrl = "https://interviewdb-backend.onrender.com";
      const response = await fetch(`${apiUrl}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputValue, userId: "guest-user" }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.reply || "Failed to get response from AI");
      }

      const data = await response.json();
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: data.reply },
      ]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "bot",
          text: error.message || "Sorry, I couldn't connect. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button using DaisyUI */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="btn btn-circle btn-primary fixed bottom-6 right-6 z-[9999] shadow-lg text-lg"
          style={{ width: "60px", height: "60px" }}
        >
          💬
        </button>
      )}

      {/* Chat Window using DaisyUI */}
      {isOpen && (
        <div
          className="fixed bottom-6 right-6 w-96 h-[32rem] bg-base-100 border border-base-300 rounded-lg shadow-xl flex flex-col z-[9999]"
          style={{ maxWidth: "calc(100vw - 3rem)" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-primary text-primary-content rounded-t-lg">
            <div className="flex items-center">
              <span className="mr-2">🤖</span>
              <h3 className="font-semibold text-lg">AI Interview Helper</h3>
            </div>
            <button
              onClick={toggleChat}
              className="btn btn-sm btn-ghost text-primary-content hover:bg-primary-focus"
            >
              ✕
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-base-200">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`chat ${
                    msg.sender === "user" ? "chat-end" : "chat-start"
                  }`}
                >
                  <div className="chat-header text-sm opacity-70">
                    {msg.sender === "user" ? "You" : "AI Assistant"}
                  </div>
                  <div
                    className={`chat-bubble ${
                      msg.sender === "user"
                        ? "chat-bubble-primary"
                        : "chat-bubble-secondary"
                    }`}
                  >
                    {processMarkdown(msg.text)}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="chat chat-start">
                  <div className="chat-header text-sm opacity-70">
                    AI Assistant
                  </div>
                  <div className="chat-bubble chat-bubble-secondary">
                    <span className="loading loading-dots loading-sm"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-base-300 bg-base-100 rounded-b-lg">
            <div className="flex items-center space-x-2">
              <textarea
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about interview preparation..."
                className="textarea textarea-bordered flex-grow resize-none text-sm"
                rows={2}
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || inputValue.trim() === ""}
                className="btn btn-primary"
              >
                📤
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
