import type { Metadata } from "next";
import { poppins, openSans } from "@/lib/fonts";
import { SITE_URL, SITE_NAME } from "@/config/site";
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
  description:
    "Desenvolvimento de soluções personalizadas de automação de processos, integração de sistemas e processamento de documentos para empresas.",
  sameAs: ["https://instagram.com/believi.ia"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${poppins.variable} ${openSans.variable}`}
    >
      <body className="min-h-screen bg-believi-dark font-body text-believi-white antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <UtmCapture />
        {children}
        <WhatsAppFloat />
        <ConsentManager />
      </body>
    </html>
  );
}
