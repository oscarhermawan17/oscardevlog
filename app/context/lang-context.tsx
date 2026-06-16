"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import translations, { type Lang } from "@/lib/i18n";

type LangContextValue = {
  lang: Lang;
  t: typeof translations.en;
  toggle: () => void;
};

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  // Baca preferensi dari localStorage saat pertama load
  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved === "id" || saved === "en") setLang(saved);
  }, []);

  function toggle() {
    setLang((prev) => {
      const next = prev === "id" ? "en" : "id";
      localStorage.setItem("lang", next);
      return next;
    });
  }

  return (
    <LangContext.Provider value={{ lang, t: translations[lang], toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}
