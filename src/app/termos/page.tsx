import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { WHATSAPP_NUMBER_DISPLAY } from "@/config/site";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Termos de uso do site institucional da Believi IA.",
  alternates: { canonical: "/termos" },
  robots: { index: true, follow: true },
};

export default function TermosPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 pt-28 pb-20 sm:px-6 sm:pt-36">
        <h1 className="font-heading text-3xl font-bold text-believi-white">
          Termos de Uso
        </h1>
        <p className="mt-2 font-body text-sm text-believi-gray">
          Última atualização: {new Date().toLocaleDateString("pt-BR")}
        </p>

        <div className="mt-8 space-y-8 font-body text-base leading-relaxed text-believi-gray">
          <section>
            <h2 className="font-heading text-xl font-semibold text-believi-white">
              1. Aceitação dos termos
            </h2>
            <p className="mt-2">
              Ao acessar e utilizar este site, você concorda com os termos
              descritos nesta página. Caso não concorde, recomendamos não
              utilizar o site.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-believi-white">
              2. Objetivo do site
            </h2>
            <p className="mt-2">
              Este site tem caráter institucional e comercial, com o objetivo
              de apresentar as soluções da Believi IA e permitir que
              potenciais clientes entrem em contato para avaliação de
              projetos de automação, integração de sistemas e desenvolvimento
              de soluções personalizadas.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-believi-white">
              3. Conteúdo e propriedade
            </h2>
            <p className="mt-2">
              Todo o conteúdo deste site (textos, identidade visual, logotipo
              e ilustrações) pertence à Believi IA e não pode ser reproduzido
              sem autorização prévia.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-believi-white">
              4. Orçamentos e propostas
            </h2>
            <p className="mt-2">
              As informações apresentadas no site são de caráter geral. Toda
              proposta comercial, prazo e investimento são definidos somente
              após a avaliação específica do processo e da necessidade
              apresentada pelo cliente.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-believi-white">
              5. Limitação de responsabilidade
            </h2>
            <p className="mt-2">
              Buscamos manter as informações deste site atualizadas e
              corretas, mas não garantimos resultados específicos de economia
              ou produtividade sem uma avaliação prévia do processo da sua
              empresa.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-believi-white">
              6. Contato
            </h2>
            <p className="mt-2">
              Em caso de dúvidas sobre estes termos, fale com a Believi IA
              pelo WhatsApp {WHATSAPP_NUMBER_DISPLAY}.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
