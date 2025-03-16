import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm here to help! Let me know if there are any questions regarding your medical history!", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to chat
    setMessages([...messages, { text: input, sender: "user" }]);

    const userMessage = input;
    setInput(""); // Clear input field

    try {
      // Send message to Flask backend
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      // Add bot's response from Flask
      setMessages((prev) => [...prev, { text: data.response, sender: "bot" }]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => [...prev, { text: "Oops! Backend error!", sender: "bot" }]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end" style={{ zIndex: 9999 }}>
      {isOpen && (
        <div className="w-80 h-100 bg-white shadow-lg rounded-2xl p-6 border border-gray-200 flex flex-col" style={{ zIndex: 10000 }}>
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-black">Chat Bot Assistant</span>
            <button onClick={() => setIsOpen(false)} style={{ zIndex: 10001 }}>
              <X className="w-5 h-5 text-black" />
            </button>
          </div>
          <div className="h-full overflow-y-auto space-y-2 p-2 border rounded-md bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`text-sm p-2 rounded-lg ${
                  msg.sender === "bot"
                    ? "bg-purple-200 text-black self-start"
                    : "bg-blue-500 text-black self-end"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="mt-2 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 p-2 border rounded-md text-sm text-black"
              placeholder="Type a message..."
            />
            {/* Native HTML button for testing */}
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white hover:bg-blue-600 p-2 rounded-md"
              style={{ zIndex: 10001 }}
            >
              Send
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full p-3 shadow-lg bg-blue-500 text-white"
        style={{ zIndex: 10002 }}
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
}
