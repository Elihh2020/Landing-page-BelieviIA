"use client";

import { type ReactNode } from "react";
import { trackCtaClick } from "@/lib/tracking";
import { BUTTON_STYLES, type ButtonVariant } from "@/lib/ui";

interface CtaLinkProps {
  href: string;
  /** Nome do CTA enviado ao dataLayer (evento `cta_click`). */
  trackName: string;
  variant?: ButtonVariant;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}

/** Link interno com aparência de botão e rastreamento de clique. */
export default function CtaLink({
  href,
  trackName,
  variant = "primary",
  className = "",
  onClick,
  children,
}: CtaLinkProps) {
  return (
    <a
      href={href}
      onClick={() => {
        trackCtaClick(trackName);
        onClick?.();
      }}
      className={`${BUTTON_STYLES[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
