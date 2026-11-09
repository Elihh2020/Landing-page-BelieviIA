"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Pequeno atraso em ms para escalonar cards dentro de uma grade. */
  delayMs?: number;
  /** Elemento renderizado (use "li" dentro de listas). */
  as?: "div" | "li";
}

/** Fade/slide sutil ao entrar na viewport. Respeita prefers-reduced-motion via CSS. */
export default function Reveal({ children, className = "", delayMs = 0, as = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = as;
  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: visible ? `${delayMs}ms` : "0ms" }}
    >
      {children}
    </Tag>
  );
}
