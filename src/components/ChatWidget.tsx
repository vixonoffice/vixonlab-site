import { useState, useRef, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Message = {
  role: 'user' | 'model';
  text: string;
  whatsapp?: boolean;
  waNumber?: string;
};

const WELCOME = 'Salut! 👋 Sunt asistentul Vixon Lab. Cu ce te pot ajuta?';

function WhatsAppButton({ waNumber, text }: { waNumber: string; text: string }) {
  const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 mt-2 px-3 py-2 rounded-xl text-sm font-medium text-white transition-opacity hover:opacity-90"
      style={{ background: '#25D366' }}
    >
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current flex-shrink-0">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.553 4.122 1.522 5.855L.057 23.882l6.198-1.626A11.937 11.937 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.002-1.371l-.359-.213-3.718.975.993-3.63-.234-.374A9.818 9.818 0 0112 2.182c5.42 0 9.818 4.398 9.818 9.818 0 5.421-4.398 9.818-9.818 9.818z" />
      </svg>
      Scrie-ne pe WhatsApp
    </a>
  );
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: WELCOME },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Lock page scroll (iOS-safe: body position fixed)
  useEffect(() => {
    if (!open) return;

    const scrollY = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.documentElement.style.overflow = '';
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  // Adjust INNER container to visual viewport (keyboard aware)
  useEffect(() => {
    if (!open) return;
    const vv = window.visualViewport;
    if (!vv || window.innerWidth >= 768) return;

    function sync() {
      if (!innerRef.current || !vv) return;
      innerRef.current.style.height = `${vv.height}px`;
      innerRef.current.style.transform = `translateY(${vv.offsetTop}px)`;
    }

    sync();
    vv.addEventListener('resize', sync);
    vv.addEventListener('scroll', sync);
    return () => {
      vv.removeEventListener('resize', sync);
      vv.removeEventListener('scroll', sync);
    };
  }, [open]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: 'user', text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    setTimeout(() => inputRef.current?.focus(), 50);

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
        {
          role: 'model',
          text: data.text || 'Eroare. Încearcă din nou.',
          whatsapp: data.whatsapp ?? false,
          waNumber: data.waNumber,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'model', text: 'Conexiune eșuată. Încearcă din nou.' },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [input, loading, messages]);

  return (
    <>
      {/* Floating bubble — always visible */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-5 right-5 z-50 w-12 h-12 rounded-full gradient-primary text-white shadow-lg shadow-primary/25 flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-transform"
            aria-label="Deschide chat"
          >
            <MessageCircle className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <>
            {/* OUTER: always fullscreen on mobile, panel on desktop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] md:inset-auto md:bottom-5 md:right-5 md:w-[380px] md:h-[min(520px,calc(100vh-80px))]"
              style={{ background: 'transparent' }}
            >
              {/* Desktop backdrop click to close */}
              <div
                className="fixed inset-0 -z-10 md:hidden"
                onClick={() => setOpen(false)}
              />

              {/* INNER: chat panel */}
              <div
                ref={innerRef}
                className="
                  flex flex-col w-full h-full
                  md:rounded-2xl md:border md:border-white/10
                  md:shadow-2xl
                  overflow-hidden
                "
                style={{ background: '#0e0e14' }}
              >
                {/* Header */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-white/5 flex-shrink-0">
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
                    className="w-7 h-7 text-muted-foreground hover:text-foreground flex-shrink-0"
                    onClick={() => setOpen(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0 overscroll-contain">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
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
                      {msg.whatsapp && msg.waNumber && (
                        <WhatsAppButton
                          waNumber={msg.waNumber}
                          text="Bună! Vreau să discutăm despre un proiect."
                        />
                      )}
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
                <div
                  className="p-3 border-t border-white/10 flex gap-2 flex-shrink-0"
                  style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
                >
                  <input
                    ref={inputRef}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-foreground placeholder:text-muted-foreground outline-none focus:border-white/30 transition-colors"
                    style={{ fontSize: '16px' }}
                    placeholder="Scrie un mesaj..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && send()}
                    disabled={loading}
                  />
                  <Button
                    size="icon"
                    className="gradient-primary rounded-xl w-10 h-10 flex-shrink-0"
                    onClick={send}
                    disabled={loading || !input.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
