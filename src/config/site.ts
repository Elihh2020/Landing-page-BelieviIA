/**
 * Configuração central da Believi IA.
 * Troque aqui número de WhatsApp, mensagens, IDs de rastreamento e URL do site.
 * Valores sensíveis/variáveis por ambiente vêm de `.env.local` (ver `.env.example`).
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://believiia.com.br";

export const SITE_NAME = "Believi IA";

/** Número oficial de WhatsApp da Believi IA, em formato internacional (sem símbolos). */
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5511959132422";

/** Mesmo número, formatado para exibição humana. */
export const WHATSAPP_NUMBER_DISPLAY = "(11) 95913-2422";

export const SOCIAL_HANDLE = "@believi.ia";
export const SOCIAL_URL = "https://instagram.com/believi.ia";

/** Mensagens pré-preenchidas do WhatsApp, por origem/seção do clique. */
export const WHATSAPP_MESSAGES = {
  header: "Olá! Vim pela página da Believi IA e quero falar com a equipe.",
  hero: "Olá! Vim pela página da Believi IA e quero automatizar um processo da minha empresa.",
  problemas: "Olá! Vim pela página da Believi IA e quero resolver esse problema.",
  solucoes: "Olá! Vim pela página da Believi IA e quero desenvolver uma solução.",
  ctaFinal: "Olá! Vim pela página da Believi IA e quero desenvolver uma solução.",
  float: "Olá! Vim pela página da Believi IA e gostaria de mais informações.",
} as const;

export type WhatsAppSection = keyof typeof WHATSAPP_MESSAGES;

/** Links de navegação do cabeçalho (âncoras internas). */
export const NAV_LINKS = [
  { href: "#problemas", label: "Problemas" },
  { href: "#solucoes", label: "Soluções" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#faq", label: "FAQ" },
] as const;

/** IDs de rastreamento — substitua pelos valores reais antes de publicar. */
export const TRACKING = {
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || "",
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID || "",
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || "",
  googleAdsId: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "",
  googleAdsConversionLabel: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL || "",
};

/**
 * Envio paralelo (opcional) do formulário para um endpoint/webhook externo
 * (CRM, planilha, n8n etc). Desativado por padrão — ative com
 * NEXT_PUBLIC_ENABLE_FORM_ENDPOINT=true e configure NEXT_PUBLIC_FORM_ENDPOINT.
 */
export const FORM_ENDPOINT_ENABLED =
  process.env.NEXT_PUBLIC_ENABLE_FORM_ENDPOINT === "true";

export const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "/api/lead";

export const PROBLEM_OPTIONS = [
  "Automação de planilhas",
  "Processamento de documentos e PDFs",
  "Integração entre sistemas",
  "Desenvolvimento de sistema personalizado",
  "Automação de processos internos",
  "Outro problema",
] as const;
