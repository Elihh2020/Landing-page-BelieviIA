"use client";

import { useEffect, useState } from "react";
import AnalyticsScripts from "@/components/AnalyticsScripts";

const CONSENT_KEY = "believi_cookie_consent";

type ConsentState = "granted" | "denied" | null;

/**
 * Banner de consentimento (LGPD). Tags de marketing (GTM/GA4/Pixel) só são
 * carregadas depois do aceite — ver <AnalyticsScripts/>. Alternativa mais
 * robusta: integrar ao Google Consent Mode v2 dentro do próprio container GTM.
 */
export default function ConsentManager() {
  const [consent, setConsent] = useState<ConsentState>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- sincronização única
       com localStorage no mount; necessária para SSR, pois window não existe
       no servidor e não pode ser lido durante o render. */
    try {
      const stored = window.localStorage.getItem(CONSENT_KEY) as ConsentState;
      if (stored === "granted" || stored === "denied") {
        setConsent(stored);
      } else {
        setShowBanner(true);
      }
    } catch {
      setShowBanner(true);
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const handleChoice = (choice: "granted" | "denied") => {
    try {
      window.localStorage.setItem(CONSENT_KEY, choice);
    } catch {
      // segue sem persistir se localStorage não estiver disponível
    }
    setConsent(choice);
    setShowBanner(false);
  };

  return (
    <>
      {consent === "granted" && <AnalyticsScripts />}

      {showBanner && (
        <div
          role="dialog"
          aria-label="Consentimento de cookies"
          className="fixed inset-x-0 bottom-0 z-[60] border-t border-believi-gray/20 bg-believi-dark-deeper/98 px-4 py-4 shadow-[0_-4px_24px_rgba(0,0,0,0.4)] sm:px-6"
        >
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-body text-sm text-believi-gray">
              Usamos cookies para melhorar sua experiência e medir o desempenho das
              nossas campanhas. Ao continuar navegando, você concorda com nossa{" "}
              <a href="/politica-de-privacidade" className="text-believi-cyan underline">
                Política de Privacidade
              </a>
              .
            </p>
            <div className="flex w-full gap-3 sm:w-auto">
              <button
                type="button"
                onClick={() => handleChoice("denied")}
                className="flex-1 rounded-full border border-believi-gray/40 px-4 py-2 font-heading text-sm font-medium text-believi-gray transition-colors hover:border-believi-cyan hover:text-believi-cyan sm:flex-none"
              >
                Recusar
              </button>
              <button
                type="button"
                onClick={() => handleChoice("granted")}
                className="flex-1 rounded-full bg-believi-cyan px-4 py-2 font-heading text-sm font-semibold text-believi-dark transition-transform hover:scale-[1.02] sm:flex-none"
              >
                Aceitar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
