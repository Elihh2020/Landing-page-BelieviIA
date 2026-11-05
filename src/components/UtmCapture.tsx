"use client";

import { useEffect } from "react";
import { captureUtmParams } from "@/lib/utm";
import { pushToDataLayer } from "@/lib/tracking";

/**
 * Componente invisível: captura UTMs/fbclid/gclid na primeira visita e
 * dispara o page_view inicial. Não depende de consentimento de marketing —
 * é atribuição de primeira parte, usada para contextualizar o lead.
 */
export default function UtmCapture() {
  useEffect(() => {
    captureUtmParams();
    pushToDataLayer("page_view", {
      page_path: window.location.pathname,
      page_location: window.location.href,
    });
  }, []);

  return null;
}
