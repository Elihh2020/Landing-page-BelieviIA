import type { Metadata } from "next";
import { spaceGrotesk, jetbrainsMono, caveat } from "@/lib/fonts";
import {
  LINKEDIN_URL,
  TRACKING,
  SITE_NAME,
  SITE_URL,
  SOCIAL_URL,
  WHATSAPP_NUMBER,
} from "@/config/site";
import { jsonLd } from "@/lib/jsonLd";
import { gtmHeadScript } from "@/lib/consent";
import UtmCapture from "@/components/UtmCapture";
import ConsentManager from "@/components/ConsentManager";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Believi IA | Automação de Processos e Soluções Personalizadas",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Desenvolvemos soluções personalizadas para automatizar processos, integrar sistemas, processar documentos e melhorar a eficiência operacional da sua empresa.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Believi IA | Automação de Processos e Soluções Personalizadas",
    description:
      "Automatizamos tarefas, conectamos sistemas e desenvolvemos soluções sob medida para tornar a operação da sua empresa mais eficiente.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Believi IA | Automação de Processos e Soluções Personalizadas",
    description:
      "Automatizamos tarefas, conectamos sistemas e desenvolvemos soluções sob medida para a sua empresa.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  description:
    "Desenvolvimento de soluções personalizadas de automação de processos, integração de sistemas e processamento de documentos para empresas.",
  areaServed: "BR",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: `+${WHATSAPP_NUMBER}`,
    contactType: "customer service",
    availableLanguage: "Portuguese",
  },
  sameAs: [SOCIAL_URL, LINKEDIN_URL],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "pt-BR",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${caveat.variable}`}
    >
      <head>
        {/* Google Tag Manager — logo no início do <head>, com Consent Mode v2 */}
        <script dangerouslySetInnerHTML={{ __html: gtmHeadScript(TRACKING.gtmId) }} />
      </head>
      <body className="min-h-screen bg-bv-bg font-sans text-bv-text antialiased">
        {/* Google Tag Manager (noscript) — logo após a abertura do <body> */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${TRACKING.gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd([organizationJsonLd, websiteJsonLd]) }}
        />
        <UtmCapture />
        {children}
        <WhatsAppFloat />
        <ConsentManager />
      </body>
    </html>
  );
}
