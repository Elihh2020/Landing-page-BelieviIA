import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Problemas from "@/components/Problemas";
import Solucoes from "@/components/Solucoes";
import ComoFunciona from "@/components/ComoFunciona";
import Aplicacoes from "@/components/Aplicacoes";
import Diferenciais from "@/components/Diferenciais";
import FormularioDiagnostico from "@/components/FormularioDiagnostico";
import Faq from "@/components/Faq";
import { FAQ_ITEMS } from "@/lib/faqData";
import CtaFinal from "@/components/CtaFinal";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <main>
        <Hero />
        <Problemas />
        <Solucoes />
        <ComoFunciona />
        <Aplicacoes />
        <Diferenciais />
        <FormularioDiagnostico />
        <Faq />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
