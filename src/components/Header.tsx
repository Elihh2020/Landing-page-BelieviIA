"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/config/site";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-believi-white/10 bg-believi-dark/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#top" className="flex items-center gap-2" aria-label="Believi IA — início">
          {/* LOGO OFICIAL AQUI — substituir pelo arquivo oficial (versão clara/branca para fundo escuro) */}
          <span className="rounded-md border border-believi-cyan/60 px-2.5 py-1 font-heading text-lg font-bold tracking-tight text-believi-white">
            Believi<span className="text-believi-cyan"> IA</span>
          </span>
        </a>

        <nav aria-label="Navegação principal" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-sm font-semibold text-believi-gray transition-colors hover:text-believi-cyan"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <WhatsAppButton section="header" variant="outline" className="px-5 py-2.5 text-sm">
            Falar com a equipe
          </WhatsAppButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-md text-believi-white md:hidden"
        >
          {open ? <X size={24} aria-hidden /> : <Menu size={24} aria-hidden />}
        </button>
      </div>

      {open && (
        <nav
          aria-label="Navegação mobile"
          className="flex flex-col gap-1 border-t border-believi-white/10 bg-believi-dark px-4 py-4 md:hidden"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-3 font-body text-base font-semibold text-believi-gray hover:bg-believi-white/5 hover:text-believi-cyan"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-2">
            <WhatsAppButton section="header" variant="primary" className="w-full">
              Falar com a equipe
            </WhatsAppButton>
          </div>
        </nav>
      )}
    </header>
  );
}
