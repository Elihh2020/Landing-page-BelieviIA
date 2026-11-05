"use client";

/**
 * Captura e persistência de UTMs e cliques de anúncio (fbclid/gclid).
 * Capturamos na primeira visita e mantemos em sessionStorage durante a navegação,
 * para anexar ao WhatsApp e ao formulário de diagnóstico.
 */

const STORAGE_KEY = "believi_utm_params";

const TRACKED_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
  "gclid",
] as const;

export type UtmParams = Partial<Record<(typeof TRACKED_PARAMS)[number], string>>;

export function captureUtmParams(): UtmParams {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const captured: UtmParams = {};

  for (const key of TRACKED_PARAMS) {
    const value = params.get(key);
    if (value) captured[key] = value;
  }

  if (Object.keys(captured).length > 0) {
    try {
      const existing = getStoredUtmParams();
      window.sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ...existing, ...captured })
      );
    } catch {
      // sessionStorage indisponível (modo privado etc.) — segue sem persistir.
    }
  }

  return getStoredUtmParams();
}

export function getStoredUtmParams(): UtmParams {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UtmParams) : {};
  } catch {
    return {};
  }
}

export function getPageReferrer(): string {
  if (typeof document === "undefined") return "";
  return document.referrer || "";
}

export function getCurrentPageUrl(): string {
  if (typeof window === "undefined") return "";
  return window.location.href;
}
