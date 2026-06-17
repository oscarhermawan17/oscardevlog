"use client";

import { useState, useEffect } from "react";
import { useLang } from "@/app/context/lang-context";

const COOLDOWN_MS = 10 * 60 * 1000;
const COOLDOWN_KEY = "contact_last_sent";

const strings = {
  en: {
    title: "## Get in Touch",
    subtitle:
      "Have a project idea, collaboration offer, or just want to say hi? Drop me a message and I'll get back to you.",
    responseTime: "Usually responds within 1–2 business days.",
    topics: ["Project collaboration", "Freelance work", "Content ideas", "Just saying hi"],
    name: "Name",
    email: "Email",
    message: "Message",
    namePlaceholder: "Your name",
    emailPlaceholder: "your@email.com",
    messagePlaceholder: "Tell me what's on your mind...",
    send: "Send Message",
    sending: "Sending...",
    success: "Message sent! I'll get back to you soon.",
    error: "Something went wrong. Please try again.",
  },
  id: {
    title: "## Hubungi Saya",
    subtitle:
      "Ada ide proyek, tawaran kolaborasi, atau sekadar ingin menyapa? Tinggalkan pesan dan saya akan membalas sesegera mungkin.",
    responseTime: "Biasanya membalas dalam 1–2 hari kerja.",
    topics: ["Kolaborasi proyek", "Freelance", "Ide konten", "Sekadar menyapa"],
    name: "Nama",
    email: "Email",
    message: "Pesan",
    namePlaceholder: "Nama kamu",
    emailPlaceholder: "kamu@email.com",
    messagePlaceholder: "Ceritakan apa yang ada di pikiranmu...",
    send: "Kirim Pesan",
    sending: "Mengirim...",
    success: "Pesan terkirim! Saya akan segera membalas.",
    error: "Terjadi kesalahan. Silakan coba lagi.",
  },
};

export function ContactContent() {
  const { lang } = useLang();
  const s = strings[lang];

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [cooldownLeft, setCooldownLeft] = useState(0);

  useEffect(() => {
    const last = localStorage.getItem(COOLDOWN_KEY);
    if (last) {
      const remaining = COOLDOWN_MS - (Date.now() - parseInt(last));
      if (remaining > 0) setCooldownLeft(remaining);
    }
  }, []);

  useEffect(() => {
    if (cooldownLeft <= 0) return;
    const timer = setInterval(() => {
      setCooldownLeft((prev) => (prev <= 1000 ? 0 : prev - 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldownLeft]);

  const formatCooldown = (ms: number) => {
    const m = Math.floor(ms / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      localStorage.setItem(COOLDOWN_KEY, Date.now().toString());
      setCooldownLeft(COOLDOWN_MS);
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-ink placeholder:text-muted/40 transition-colors focus:border-sky/50 focus:outline-none focus:ring-1 focus:ring-sky/20";

  return (
    <div className="mx-auto max-w-5xl px-6 py-8 lg:py-16">
      <h1 className="mb-12 font-mono text-2xl font-bold text-sky sm:text-3xl">
        {s.title}
      </h1>

      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        {/* Left — info */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-lg leading-8 text-muted">{s.subtitle}</p>

          <div className="mt-8 rounded-xl border border-white/10 bg-surface p-6">
            <p className="mb-4 font-mono text-xs text-muted/60">{s.responseTime}</p>
            <ul className="flex flex-col gap-2">
              {s.topics.map((topic) => (
                <li key={topic} className="flex items-center gap-2 text-sm text-muted">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sky/60" />
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right — form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-xs text-muted">{s.name}</label>
              <input
                name="name"
                type="text"
                required
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                placeholder={s.namePlaceholder}
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-xs text-muted">{s.email}</label>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder={s.emailPlaceholder}
                className={inputClass}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-xs text-muted">{s.message}</label>
            <textarea
              name="message"
              required
              rows={6}
              value={form.message}
              onChange={handleChange}
              placeholder={s.messagePlaceholder}
              className={`${inputClass} resize-none`}
            />
          </div>

          {status === "success" && (
            <p className="rounded-lg border border-sky/20 bg-sky/10 px-4 py-3 text-sm text-sky">
              {s.success}
            </p>
          )}
          {status === "error" && (
            <p className="rounded-lg border border-rose/20 bg-rose/10 px-4 py-3 text-sm text-rose">
              {s.error}
            </p>
          )}

          {cooldownLeft > 0 && (
            <p className="font-mono text-xs text-muted/60">
              {lang === "id" ? "Bisa kirim lagi dalam" : "Can send again in"}{" "}
              <span className="text-sky">{formatCooldown(cooldownLeft)}</span>
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading" || cooldownLeft > 0}
            className="self-start rounded-lg bg-sky px-6 py-3 text-sm font-semibold text-[#0B0F19] transition-all hover:bg-sky/85 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === "loading" ? s.sending : s.send}
          </button>
        </form>
      </div>
    </div>
  );
}
