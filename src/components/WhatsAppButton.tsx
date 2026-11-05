"use client";

import { type ReactNode } from "react";
import { WHATSAPP_MESSAGES, type WhatsAppSection } from "@/config/site";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackWhatsAppClick } from "@/lib/tracking";

interface WhatsAppButtonProps {
  section: WhatsAppSection;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  ariaLabel?: string;
}

const VARIANT_CLASSES: Record<NonNullable<WhatsAppButtonProps["variant"]>, string> = {
  primary:
    "bg-believi-cyan text-believi-dark hover:bg-white hover:text-believi-dark shadow-lg shadow-believi-cyan/20",
  secondary:
    "bg-transparent border border-believi-gray text-believi-white hover:border-believi-cyan hover:text-believi-cyan",
  outline:
    "bg-transparent border border-believi-cyan text-believi-cyan hover:bg-believi-cyan hover:text-believi-dark",
};

export default function WhatsAppButton({
  section,
  children,
  className = "",
  variant = "primary",
  ariaLabel,
}: WhatsAppButtonProps) {
  const message = WHATSAPP_MESSAGES[section];
  const href = buildWhatsAppLink(message);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      onClick={() => trackWhatsAppClick(section, message)}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-heading font-semibold text-sm sm:text-base transition-colors duration-200 ${VARIANT_CLASSES[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
