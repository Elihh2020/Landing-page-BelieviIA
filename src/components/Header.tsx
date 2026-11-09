"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/config/site";
import CtaLink from "@/components/CtaLink";

export function Logo() {
  return (
    <Image
      src="/logo-believi.png"
      alt="Believi IA"
      width={908}
      height={213}
      priority
      className="h-8 w-auto sm:h-9"
    />
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-20 py-5 sm:py-7">
      <div className="flex items-center justify-between gap-4">
        <a href="#top" aria-label="Believi IA — início">
          <Logo />
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-8 text-[15px] font-medium lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-bv-text-2 transition-colors hover:text-bv-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <CtaLink href="#diagnostico" trackName="cta_header" variant="outline">
            Falar com a equipe
          </CtaLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="menu-mobile"
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-bv-border-accent bg-bv-panel text-bv-text lg:hidden"
        >
          {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
        </button>
      </div>

      {open && (
        <nav
          id="menu-mobile"
          aria-label="Navegação mobile"
          className="absolute inset-x-0 top-full mt-1 flex flex-col gap-1 rounded-2xl border border-bv-border-accent bg-bv-panel p-3 text-base font-medium shadow-2xl lg:hidden"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-bv-text hover:bg-bv-surface hover:text-bv-accent"
            >
              {link.label}
            </a>
          ))}
          <CtaLink
            href="#diagnostico"
            trackName="cta_header"
            variant="primary"
            className="mt-2 w-full"
            onClick={() => setOpen(false)}
          >
            Falar com a equipe
          </CtaLink>
        </nav>
      )}
    </header>
  );
}
