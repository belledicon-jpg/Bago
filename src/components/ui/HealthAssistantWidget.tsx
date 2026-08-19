import { useState, useRef, useEffect } from "react";
import { Bot, X, Send } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  time: string;
}

interface HealthAssistantWidgetProps {
  onClose: () => void;
}

export function HealthAssistantWidget({ onClose }: HealthAssistantWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I am your Health Assistant. How can I help you today?",
      sender: "assistant",
      time: "Now",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");

    setTimeout(() => {
      const responses = [
        "Based on the latest health protocols, I recommend scheduling a routine checkup.",
        "For sanitation concerns, please review the latest guidelines on waste disposal.",
        "I have added a health reminder to your dashboard for follow-up.",
        "Please ensure all health surveillance forms are submitted on time.",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: "assistant",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSendMessage();
  };

  return (
    <div ref={panelRef} className="fixed bottom-24 right-4 w-80 h-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-emerald-700 text-white rounded-t-lg">
        <div className="flex items-center gap-2">
          <Bot size={20} />
          <h3 className="font-semibold">Health Assistant</h3>
        </div>
        <button className="text-white hover:text-emerald-200" onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => {
          const containerClass = message.sender === "user" ? "flex justify-end" : "flex justify-start";
          const bubbleClass = message.sender === "user"
            ? "max-w-[80%] p-3 rounded-lg text-sm bg-emerald-100 text-gray-800"
            : "max-w-[80%] p-3 rounded-lg text-sm bg-gray-100 text-gray-800";
          return (
            <div key={message.id} className={containerClass}>
              <div className={bubbleClass}>
                {message.content}
                <div className="text-xs opacity-70 mt-1">
                  {message.time}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-3 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask a health question..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button className="p-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-600 transition" onClick={handleSendMessage}>
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}