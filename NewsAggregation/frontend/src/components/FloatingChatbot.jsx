import { useState } from 'react';
import { Bot, Send, X } from 'lucide-react';

const FloatingChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ from: 'ai', text: 'Ask me for a quick news brief or source suggestion.' }]);
  const [text, setText] = useState('');

  const send = (event) => {
    event.preventDefault();
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { from: 'you', text }, { from: 'ai', text: `AI brief ready for: "${text}". Check sources, trending, and saved stories.` }]);
    setText('');
  };

  return (
    <div className="fixed bottom-24 right-5 z-50">
      {open && (
        <div className="mb-4 w-[320px] rounded-2xl border border-white/10 bg-dark-900/95 p-4 text-white shadow-glass-lg backdrop-blur-2xl">
          <div className="mb-4 flex items-center justify-between">
            <p className="font-bold">NewsSphere Assistant</p>
            <button onClick={() => setOpen(false)}><X size={18} /></button>
          </div>
          <div className="mb-4 max-h-56 space-y-3 overflow-y-auto">
            {messages.map((message, index) => (
              <div key={index} className={`rounded-xl px-3 py-2 text-sm ${message.from === 'you' ? 'ml-8 bg-neon-cyan/20 text-cyan-100' : 'mr-8 bg-white/10 text-gray-200'}`}>
                {message.text}
              </div>
            ))}
          </div>
          <form onSubmit={send} className="flex gap-2">
            <input value={text} onChange={(e) => setText(e.target.value)} className="min-w-0 flex-1 rounded-xl bg-white/10 px-3 py-2 text-sm outline-none" placeholder="Ask AI..." />
            <button className="rounded-xl bg-gradient-neon p-2"><Send size={18} /></button>
          </form>
        </div>
      )}
      <button onClick={() => setOpen((prev) => !prev)} className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-neon text-white shadow-neon-cyan">
        <Bot />
      </button>
    </div>
  );
};

export default FloatingChatbot;
