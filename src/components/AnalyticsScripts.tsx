"use client";

import Script from "next/script";
import { TRACKING } from "@/config/site";
import ScrollDepthTracker from "@/components/ScrollDepthTracker";

/**
 * Scripts que só podem rodar depois do aceite de cookies (Meta Pixel e
 * profundidade de rolagem). O GTM fica no <head> (ver app/layout.tsx), com
 * Consent Mode v2 controlando o que ele pode gravar.
 */
export default function AnalyticsScripts() {
  return (
    <>
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
