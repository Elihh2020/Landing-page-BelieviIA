import { WHATSAPP_NUMBER } from "@/config/site";

/** Limite prático e seguro para URLs wa.me (a maioria dos clientes aceita bem menos que isso). */
const MAX_MESSAGE_LENGTH = 1800;

/** Trunca um texto com segurança, preservando palavras, e adiciona um indicador de corte. */
export function truncateSafely(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(" ");
  const safeCut = lastSpace > 0 ? cut.slice(0, lastSpace) : cut;
  return `${safeCut}…`;
}

/** Monta o link do WhatsApp (wa.me) com mensagem pré-preenchida e codificada. */
export function buildWhatsAppLink(message: string, number: string = WHATSAPP_NUMBER): string {
  const safeMessage = truncateSafely(message, MAX_MESSAGE_LENGTH);
  return `https://wa.me/${number}?text=${encodeURIComponent(safeMessage)}`;
}

export interface DiagnosticoMessageData {
  nome: string;
  empresa: string;
  cargo?: string;
  whatsapp: string;
  email: string;
  problema: string;
  comoFunciona: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
}

/** Formata a mensagem do formulário de diagnóstico no padrão definido para a equipe comercial. */
export function buildDiagnosticoMessage(data: DiagnosticoMessageData): string {
  const origem = [
    data.utmSource,
    data.utmMedium,
    data.utmCampaign,
    data.utmContent,
    data.utmTerm,
  ]
    .filter(Boolean)
    .join(" / ");

  const lines = [
    "Novo diagnóstico pelo site Believi IA",
    `Nome: ${data.nome}`,
    `Empresa: ${data.empresa}`,
    `Cargo/função: ${data.cargo || "Não informado"}`,
    `WhatsApp: ${data.whatsapp}`,
    `E-mail: ${data.email}`,
    `Problema a resolver: ${data.problema}`,
    `Como funciona hoje: ${data.comoFunciona}`,
    `Origem: ${origem || "Direto"}`,
  ];

  return lines.join("\n");
}
