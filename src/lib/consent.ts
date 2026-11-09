/**
 * Consentimento de cookies (LGPD) + Google Consent Mode v2.
 * O GTM carrega no <head> com tudo "negado"; as tags só passam a gravar
 * cookies depois que o visitante clica em "Aceitar".
 */

export const CONSENT_KEY = "believi_cookie_consent";

const CONSENT_TYPES = ["ad_storage", "ad_user_data", "ad_personalization", "analytics_storage"];

/** Script inline do <head>: define o consentimento padrão e carrega o GTM. */
export function gtmHeadScript(gtmId: string) {
  const denied = Object.fromEntries(CONSENT_TYPES.map((t) => [t, "denied"]));
  const granted = Object.fromEntries(CONSENT_TYPES.map((t) => [t, "granted"]));
  return `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',${JSON.stringify({ ...denied, wait_for_update: 500 })});
try{if(localStorage.getItem('${CONSENT_KEY}')==='granted'){gtag('consent','update',${JSON.stringify(granted)});}}catch(e){}
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',${JSON.stringify(gtmId)});`;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Atualiza o Consent Mode quando o visitante aceita ou recusa. */
export function updateConsent(granted: boolean) {
  const value = granted ? "granted" : "denied";
  window.gtag?.("consent", "update", Object.fromEntries(CONSENT_TYPES.map((t) => [t, value])));
}
