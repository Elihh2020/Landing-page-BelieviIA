import { NextResponse } from "next/server";

/**
 * Rota opcional de recebimento de leads. O canal principal é o WhatsApp
 * (ver src/lib/whatsapp.ts e FormularioDiagnostico.tsx); esta rota só é
 * chamada quando NEXT_PUBLIC_ENABLE_FORM_ENDPOINT=true, e serve como ponto
 * central para registrar o lead em um CRM/planilha/webhook (ex.: n8n),
 * configurável via LEAD_FORWARD_WEBHOOK_URL, e/ou enviar a API de
 * Conversões (CAPI) do Meta usando o mesmo event_id do Pixel para dedupe.
 *
 * Proteções: aceita só JSON vindo do próprio site, limita o tamanho do corpo,
 * valida tipo/tamanho de cada campo e encaminha apenas os campos conhecidos.
 */

const MAX_BODY_BYTES = 10_000;

/** Campo → tamanho máximo permitido. */
const TEXT_FIELDS = {
  nome: 120,
  empresa: 160,
  cargo: 120,
  whatsapp: 30,
  email: 160,
  problema: 120,
  comoFunciona: 3000,
  eventId: 100,
  pageUrl: 500,
  referrer: 500,
  submittedAt: 40,
} as const;
const REQUIRED = ["nome", "empresa", "whatsapp", "email", "problema", "comoFunciona"] as const;
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "fbclid", "gclid"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function error(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

/** Só aceita requisições cuja origem é o próprio site. */
function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return error("Origem não permitida.", 403);
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return error("Formato inválido.", 415);
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return error("Conteúdo muito grande.", 413);

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return error("JSON inválido.", 400);
  }
  if (!body || typeof body !== "object") return error("JSON inválido.", 400);

  // Honeypot: robôs costumam preencher o campo oculto "website".
  if (body.website) return NextResponse.json({ ok: true });

  const lead: Record<string, unknown> = {};
  for (const [field, max] of Object.entries(TEXT_FIELDS)) {
    const value = body[field];
    if (value === undefined || value === null || value === "") continue;
    if (typeof value !== "string" || value.length > max) {
      return error(`Campo inválido: ${field}.`, 422);
    }
    lead[field] = value.trim();
  }

  if (REQUIRED.some((f) => !lead[f])) return error("Campos obrigatórios ausentes.", 422);
  if (!EMAIL_RE.test(String(lead.email))) return error("E-mail inválido.", 422);
  // Registro do aceite da Política de Privacidade (LGPD).
  if (body.consentimento !== true) return error("Consentimento obrigatório.", 422);
  lead.consentimento = true;

  if (body.utm && typeof body.utm === "object") {
    const utm: Record<string, string> = {};
    for (const key of UTM_KEYS) {
      const v = (body.utm as Record<string, unknown>)[key];
      if (typeof v === "string" && v.length <= 200) utm[key] = v;
    }
    lead.utm = utm;
  }

  const webhookUrl = process.env.LEAD_FORWARD_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
        signal: AbortSignal.timeout(8000),
      });
    } catch {
      // Não registra o conteúdo do lead nos logs (dados pessoais).
      console.error("Falha ao encaminhar lead para o webhook configurado.");
    }
  }

  // Ponto de extensão: enviar evento "Lead" para a Meta Conversions API (CAPI)
  // aqui, no servidor, usando META_CAPI_ACCESS_TOKEN e o mesmo lead.eventId
  // do Pixel do navegador para deduplicação. Dados pessoais devem ser
  // hasheados (SHA-256) antes do envio, conforme a documentação da Meta.

  return NextResponse.json({ ok: true });
}

/** Qualquer outro método é recusado. */
export function GET() {
  return error("Método não permitido.", 405);
}
