"use client";

import Script from "next/script";
import { TRACKING } from "@/config/site";
import ScrollDepthTracker from "@/components/ScrollDepthTracker";

/**
 * Scripts de marketing (GTM, GA4, Meta Pixel). Só são montados depois que o
 * visitante aceita cookies em <ConsentManager/>. IDs vazios simplesmente não
 * renderizam o script correspondente — configure em .env.local.
 */
export default function AnalyticsScripts() {
  return (
    <>
      {TRACKING.gtmId && (
        <Script id="gtm-base" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${TRACKING.gtmId}');
          `}
        </Script>
      )}

      {TRACKING.ga4Id && (
        <>
          <Script
            id="ga4-lib"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${TRACKING.ga4Id}`}
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${TRACKING.ga4Id}');
              ${
                TRACKING.googleAdsId
                  ? `gtag('config', '${TRACKING.googleAdsId}');`
                  : ""
              }
            `}
          </Script>
        </>
      )}

      {TRACKING.metaPixelId && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${TRACKING.metaPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}

      <ScrollDepthTracker />
    </>
  );
}
