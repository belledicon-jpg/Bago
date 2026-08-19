import { useState, useRef, useEffect } from "react";
import type { FormEvent } from "react";
import {
  Send,
  BotMessageSquare,
  User,
  Mail,
  Tag,
  MessageCircle,
} from "lucide-react";

interface Message {
  id: string;
  author: "user" | "agent";
  text: string;
  time: string;
}

const BOT_FIRST =
  "Hello! 👋 You've reached the Municipal Health & Sanitation inbox. How can we help you today? You can ask about permits, appointments, immunizations, or sanitation services.";

const AUTO_REPLIES: Record<string, string> = {
  appointment:
    "You can book an appointment anytime using the 'Book Appointment' tab above. Available slots are shown in real time.",
  permit:
    "Sanitation permits can be applied for in the 'Request Service' tab. An inspector will review your application within 2 working days.",
  immunization:
    "Please use the 'Request Service' tab to register for immunizations. Bring your ID and previous vaccination card.",
  "septic":
    "Septic and wastewater services are request-based. Submit a request in the 'Request Service' tab and we'll schedule an inspection.",
  default:
    "Thanks for reaching out. Our office hours are Mon–Fri, 8:00 AM–5:00 PM. We'll reply to your message within one business day.",
};

export default function PublicInquiryForm() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m1",
      author: "agent",
      text: BOT_FIRST,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const botReply = (prompt: string) => {
    const lower = prompt.toLowerCase();
    if (lower.includes("appointment")) return AUTO_REPLIES.appointment;
    if (lower.includes("permit")) return AUTO_REPLIES.permit;
    if (lower.includes("immun")) return AUTO_REPLIES.immunization;
    if (lower.includes("septic") || lower.includes("wastewater"))
      return AUTO_REPLIES.septic;
    return AUTO_REPLIES.default;
  };

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    const now = () =>
      new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

    setMessages((prev) => [
      ...prev,
      {
        id: `u${prev.length}`,
        author: "user",
        text: text.trim(),
        time: now(),
      },
    ]);

    const reply = botReply(text);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `a${prev.length}`,
          author: "agent",
          text: reply,
          time: now(),
        },
      ]);
    }, 600);

    setText("");
  };

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `u${prev.length}`,
          author: "user",
          text: `${subject}\n${message} — ${name} (${email})`,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setMessages((prev) => [
        ...prev,
        {
          id: `a${prev.length}`,
          author: "agent",
          text: "Thank you. Your inquiry has been received and a ticket has been created. We'll follow up via email.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setIsSending(false);
    }, 600);
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          Quick Chat
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Ask a question and get an instant answer from our assistant.
        </p>
      </div>

      <div className="lg:col-span-2 flex flex-col-reverse lg:flex-col">
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-4 pr-2 pb-2">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            <div ref={bottomRef} />
          </div>
        </div>

        <form onSubmit={handleSend} className="mt-4 flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
          />
          <button
            type="submit"
            disabled={!text.trim()}
            className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>

      <div className="lg:col-span-2">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          Contact Form
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Send us an email and we'll reply within one business day.
        </p>
        <form onSubmit={handleContactSubmit} className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
              Subject
            </label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief subject"
                className="w-full rounded-lg border border-gray-300 bg-white pl-9 pr-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
              Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-lg border border-gray-300 bg-white pl-9 pr-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-gray-300 bg-white pl-9 pr-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
              Message
            </label>
            <div className="relative">
              <MessageCircle className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help?"
                rows={3}
                className="w-full rounded-lg border border-gray-300 bg-white pl-9 pr-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={isSending}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
            >
              {isSending ? "Sending..." : "Send Message"}
              <Send className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.author === "user";
  const Icon = isUser ? User : BotMessageSquare;
  const bg = isUser
    ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
    : "bg-emerald-600 text-white";
  const align = isUser ? "justify-end" : "justify-start";
  return (
    <div className={`flex ${align}`}>
      <div
        className={`max-w-[80%] rounded-xl px-3.5 py-2.5 text-sm ${bg} shadow-sm`}
      >
        <div className="flex items-center gap-1.5">
          <Icon className="h-3.5 w-3.5" />
          <span className="font-medium">
            {isUser ? "You" : "Municipal Health Office"}
          </span>
          <span className="text-xs opacity-70">{message.time}</span>
        </div>
        <p className="mt-1 leading-relaxed">{message.text}</p>
      </div>
    </div>
  );
}
