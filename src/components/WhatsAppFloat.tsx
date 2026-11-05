"use client";

import { WHATSAPP_MESSAGES } from "@/config/site";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackWhatsAppClick } from "@/lib/tracking";

export default function WhatsAppFloat() {
  const message = WHATSAPP_MESSAGES.float;
  const href = buildWhatsAppLink(message);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick("float", message)}
      aria-label="Falar com a Believi IA pelo WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-believi-cyan text-believi-dark shadow-xl shadow-black/30 transition-transform duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-believi-cyan sm:h-16 sm:w-16"
    >
      <svg
        viewBox="0 0 32 32"
        width="28"
        height="28"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M16.004 3.2c-7.07 0-12.8 5.73-12.8 12.8 0 2.263.602 4.432 1.747 6.33L3.2 28.8l6.69-1.705a12.73 12.73 0 0 0 6.114 1.56h.005c7.07 0 12.8-5.73 12.8-12.8s-5.73-12.655-12.805-12.655Zm0 23.238h-.004a10.59 10.59 0 0 1-5.39-1.476l-.387-.23-4.005 1.02 1.07-3.903-.252-.4a10.6 10.6 0 0 1-1.624-5.65c0-5.86 4.768-10.627 10.63-10.627 2.838 0 5.506 1.107 7.51 3.117a10.56 10.56 0 0 1 3.117 7.52c-.002 5.86-4.77 10.63-10.665 10.63Zm5.826-7.953c-.32-.16-1.885-.93-2.177-1.037-.292-.107-.504-.16-.716.16-.212.32-.822 1.037-1.008 1.25-.186.213-.372.24-.69.08-.318-.16-1.344-.495-2.56-1.58-.946-.843-1.584-1.885-1.77-2.203-.186-.318-.02-.49.14-.65.147-.147.33-.384.495-.576.164-.192.22-.33.33-.55.11-.218.055-.41-.03-.57-.084-.16-.39-.94-.736-1.624-.346-.683-.698-.59-.958-.6-.246-.01-.528-.012-.812-.012-.283 0-.743.106-1.133.53-.39.425-1.49 1.46-1.49 3.56 0 2.1 1.524 4.124 1.736 4.407.213.283 2.953 4.506 7.157 6.136 1.188.454 1.713.515 2.313.436.635-.083 1.886-.77 2.154-1.512.268-.742.268-1.378.187-1.512-.08-.134-.292-.213-.612-.373Z" />
      </svg>
    </a>
  );
}
