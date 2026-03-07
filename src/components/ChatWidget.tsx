import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Message = {
  role: 'user' | 'model';
  text: string;
};

const WELCOME = 'Salut! 👋 Sunt asistentul Vixon Lab. Cu ce te pot ajuta?';
const BUBBLE_MSG = 'Bună! 👋 Ai întrebări despre site sau prețuri?';

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: WELCOME },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setShowBubble(true), 4000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  function handleOpen() {
    setOpen((o) => !o);
    setShowBubble(false);
  }

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: 'user', text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const history = newMessages.slice(0, -1).map((m) => ({
        role: m.role,
        parts: [{ text: m.text }],
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: 'model', text: data.text || 'Eroare. Încearcă din nou.' },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'model', text: 'Conexiune eșuată. Încearcă din nou.' },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Speech bubble teaser */}
      <AnimatePresence>
        {showBubble && !open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="relative max-w-[220px] rounded-2xl rounded-br-sm border border-white/10 bg-[#0e0e14]/95 backdrop-blur-xl px-4 py-3 shadow-xl cursor-pointer"
            onClick={handleOpen}
          >
            <button
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              onClick={(e) => { e.stopPropagation(); setShowBubble(false); }}
            >
              <X className="w-3 h-3" />
            </button>
            <p className="text-sm text-foreground leading-snug">{BUBBLE_MSG}</p>
            {/* little triangle */}
            <div className="absolute -bottom-[7px] right-6 w-3 h-3 bg-[#0e0e14] border-r border-b border-white/10 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-[340px] sm:w-[380px] rounded-2xl border border-white/10 bg-[#0e0e14]/95 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden"
            style={{ maxHeight: '520px' }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-white/5">
              <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">Vixon Lab</p>
                <p className="text-xs text-green-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" />
                  Online
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="w-7 h-7 text-muted-foreground hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: 0 }}>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'gradient-primary text-white rounded-br-sm'
                        : 'bg-white/10 text-foreground rounded-bl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 rounded-2xl rounded-bl-sm px-4 py-3">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="w-1.5 h-1.5 bg-muted-foreground rounded-full block"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/10 flex gap-2">
              <input
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-white/30 transition-colors"
                placeholder="Scrie un mesaj..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                disabled={loading}
              />
              <Button
                size="icon"
                className="gradient-primary rounded-xl w-9 h-9 flex-shrink-0"
                onClick={send}
                disabled={loading || !input.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleOpen}
        className="w-14 h-14 rounded-full gradient-primary shadow-lg shadow-primary/30 flex items-center justify-center text-white relative"
        aria-label="Chat"
      >
        {/* Pulse ring — visible only when closed */}
        {!open && (
          <span className="absolute inset-0 rounded-full animate-ping gradient-primary opacity-30 pointer-events-none" />
        )}
        {/* Notification dot */}
        {!open && (
          <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-green-400 border-2 border-[#0e0e14] rounded-full" />
        )}
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-6 h-6" />
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
