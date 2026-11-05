import { NextResponse } from "next/server";

/**
 * Rota opcional de recebimento de leads. O canal principal é o WhatsApp
 * (ver src/lib/whatsapp.ts e FormularioDiagnostico.tsx); esta rota só é
 * chamada quando NEXT_PUBLIC_ENABLE_FORM_ENDPOINT=true, e serve como ponto
 * central para registrar o lead em um CRM/planilha/webhook (ex.: n8n),
 * configurável via LEAD_FORWARD_WEBHOOK_URL, e/ou enviar a API de
 * Conversões (CAPI) do Meta usando o mesmo event_id do Pixel para dedupe.
 */

interface LeadPayload {
  nome: string;
  empresa: string;
  cargo?: string;
  whatsapp: string;
  email: string;
  problema: string;
  comoFunciona: string;
  eventId: string;
  pageUrl?: string;
  referrer?: string;
  utm?: Record<string, string | undefined>;
  submittedAt?: string;
}

export async function POST(request: Request) {
  let payload: LeadPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  if (!payload.nome || !payload.email || !payload.whatsapp) {
    return NextResponse.json({ error: "Campos obrigatórios ausentes." }, { status: 422 });
  }

  const webhookUrl = process.env.LEAD_FORWARD_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error("Falha ao encaminhar lead para o webhook configurado:", error);
    }
  }

  // Ponto de extensão: enviar evento "Lead" para a Meta Conversions API (CAPI)
  // aqui, no servidor, usando META_CAPI_ACCESS_TOKEN e o mesmo payload.eventId
  // do Pixel do navegador para deduplicação. Dados pessoais devem ser
  // hasheados (SHA-256) antes do envio, conforme a documentação da Meta.

  return NextResponse.json({ ok: true });
}
