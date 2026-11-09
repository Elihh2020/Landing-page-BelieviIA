"use client";

/**
 * Camada única de rastreamento. Tudo passa pelo dataLayer (GTM), que deve
 * mapear os eventos abaixo para GA4, Meta Pixel e Google Ads nas tags configuradas.
 *
 * Regra de mensuração: `whatsapp_click` e `form_start` são sinais de interesse
 * inicial. Somente `generate_lead` (envio válido e confirmado do formulário)
 * deve ser tratado como lead qualificado nas plataformas de anúncio.
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function pushToDataLayer(event: string, payload: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });
}

export function trackViewContent(detail: string): void {
  pushToDataLayer("view_content", { content_name: detail });
}

export function trackWhatsAppClick(section: string, message: string): void {
  pushToDataLayer("whatsapp_click", { click_section: section, message_preview: message.slice(0, 80) });
}

export function trackFormStart(formName: string): void {
  pushToDataLayer("form_start", { form_name: formName });
}

export interface LeadEventPayload {
  eventId: string;
  formName: string;
  problema: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
}

/** Dispara o evento de lead. Deve ser chamado apenas após envio válido e confirmado. */
export function trackGenerateLead(payload: LeadEventPayload): void {
  pushToDataLayer("generate_lead", { ...payload });
}

/** event_id único por envio, usado para deduplicação entre Pixel (client) e CAPI (server). */
export function generateEventId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `lead_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

/** Clique em CTA interno (âncora para o formulário ou outra seção). */
export function trackCtaClick(ctaName: string): void {
  pushToDataLayer("cta_click", { cta_name: ctaName });
}
