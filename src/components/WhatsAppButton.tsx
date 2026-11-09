"use client";

import { type ReactNode } from "react";
import { WHATSAPP_MESSAGES, type WhatsAppSection } from "@/config/site";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackWhatsAppClick } from "@/lib/tracking";
import { BUTTON_STYLES, type ButtonVariant } from "@/lib/ui";

interface WhatsAppButtonProps {
  section: WhatsAppSection;
  children: ReactNode;
  className?: string;
  /** "inline" = link de texto simples (sem aparência de botão). */
  variant?: ButtonVariant | "inline";
  ariaLabel?: string;
}

export default function WhatsAppButton({
  section,
  children,
  className = "",
  variant = "primary",
  ariaLabel,
}: WhatsAppButtonProps) {
  const message = WHATSAPP_MESSAGES[section];
  const href = buildWhatsAppLink(message);
  const base =
    variant === "inline"
      ? "text-bv-accent underline underline-offset-4 hover:text-white"
      : BUTTON_STYLES[variant];

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      onClick={() => trackWhatsAppClick(section, message)}
      className={`${base} ${className}`}
    >
      {children}
    </a>
  );
}
