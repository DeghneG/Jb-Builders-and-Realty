"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { answer, GREETING, type Reply } from "@/lib/chatbot";

type Msg = { from: "bot" | "me"; reply?: Reply; text: string };

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([{ from: "bot", text: GREETING.text, reply: GREETING }]);
  const panel = useRef<HTMLDivElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (open && panel.current) {
      gsap.fromTo(panel.current, { autoAlpha: 0, y: 24, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, ease: "power3.out" });
    }
  }, [open]);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  useEffect(() => () => clearTimeout(timer.current), []);

  function send(text: string) {
    const t = text.trim();
    if (!t || typing) return;
    setMsgs((m) => [...m, { from: "me", text: t }]);
    setInput("");
    setTyping(true);
    const r = answer(t);
    timer.current = setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { from: "bot", text: r.text, reply: r }]);
    }, 550 + Math.min(r.text.length * 6, 900));
  }

  const lastBotIdx = msgs.map((m) => m.from).lastIndexOf("bot");

  return (
    <>
      {open && (
        <div
          ref={panel}
          role="dialog"
          aria-label="JB Builders assistant"
          data-lenis-prevent
          className="fixed bottom-24 right-4 z-[80] flex h-[min(560px,calc(100svh-8rem))] w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden border border-bone/15 bg-ink text-bone shadow-2xl md:right-8"
        >
          <div className="flex items-center justify-between border-b border-bone/15 px-5 py-4">
            <div>
              <p className="display text-xl">JB Builders Assistant</p>
              <p className="eyebrow mt-1 flex items-center gap-2 !text-[0.62rem] text-sand">
                <span className="h-1.5 w-1.5 rounded-full bg-sand" /> Ask about our work
              </p>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="eyebrow p-2">
              ✕
            </button>
          </div>

          <div ref={scroller} className="flex-1 space-y-4 overflow-y-auto px-5 py-5" aria-live="polite">
            {msgs.map((m, i) => (
              <div key={i} className={m.from === "me" ? "flex justify-end" : ""}>
                <div
                  className={`max-w-[88%] whitespace-pre-line px-4 py-3 text-[0.88rem] leading-relaxed ${
                    m.from === "me" ? "bg-sand text-ink" : "bg-bone/10 text-bone"
                  }`}
                >
                  {m.text}
                  {m.reply?.links && (
                    <span className="mt-3 flex flex-col gap-1.5">
                      {m.reply.links.map((l) => (
                        <a
                          key={l.href}
                          href={l.href}
                          onClick={() => l.href.startsWith("#") && setOpen(false)}
                          target={l.href.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="text-sand underline underline-offset-4"
                        >
                          {l.label}
                        </a>
                      ))}
                    </span>
                  )}
                </div>
                {m.from === "bot" && i === lastBotIdx && !typing && m.reply?.chips && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {m.reply.chips.map((c) => (
                      <button
                        key={c}
                        onClick={() => send(c)}
                        className="border border-sand/60 px-3 py-1.5 text-xs text-sand transition-colors hover:bg-sand hover:text-ink"
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {typing && (
              <div className="inline-flex gap-1 bg-bone/10 px-4 py-3" role="status" aria-label="Assistant is typing">
                {[0, 1, 2].map((d) => (
                  <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-sand" style={{ animationDelay: `${d * 0.15}s` }} />
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex border-t border-bone/15"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about JB Builders…"
              aria-label="Your question"
              className="min-w-0 flex-1 bg-transparent px-5 py-4 text-sm text-bone placeholder:text-bone/40 focus:outline-none"
            />
            <button type="submit" className="eyebrow px-5 text-sand">
              Send
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Ask us: chat with the JB Builders assistant"}
        aria-expanded={open}
        className="fixed bottom-4 right-4 z-[80] flex h-14 items-center gap-3 bg-sand px-4 text-ink sm:px-5 shadow-xl transition-transform hover:-translate-y-0.5 md:right-8"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" />
        </svg>
        <span className="eyebrow hidden sm:inline">{open ? "Close" : "Ask us"}</span>
      </button>
    </>
  );
}
