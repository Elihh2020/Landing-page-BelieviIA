import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { WHATSAPP_NUMBER_DISPLAY } from "@/config/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como a Believi IA coleta, utiliza e protege os dados pessoais informados no site, em conformidade com a LGPD.",
  alternates: { canonical: "/politica-de-privacidade" },
  robots: { index: true, follow: true },
};

export default function PoliticaDePrivacidadePage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 pt-28 pb-20 sm:px-6 sm:pt-36">
        <h1 className="font-heading text-3xl font-bold text-believi-white">
          Política de Privacidade
        </h1>
        <p className="mt-2 font-body text-sm text-believi-gray">
          Última atualização: {new Date().toLocaleDateString("pt-BR")}
        </p>

        <div className="mt-8 space-y-8 font-body text-base leading-relaxed text-believi-gray">
          <section>
            <h2 className="font-heading text-xl font-semibold text-believi-white">
              1. Quem somos
            </h2>
            <p className="mt-2">
              A Believi IA desenvolve soluções personalizadas de automação de
              processos, integração de sistemas e processamento de documentos
              para empresas. Esta política explica como coletamos, usamos e
              protegemos os dados pessoais informados neste site, em
              conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº
              13.709/2018).
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-believi-white">
              2. Quais dados coletamos
            </h2>
            <p className="mt-2">
              Coletamos os dados que você informa voluntariamente no
              formulário de diagnóstico (nome, empresa, cargo, WhatsApp,
              e-mail e a descrição do seu processo/problema), além de dados de
              navegação como origem do acesso, parâmetros de campanha (UTMs),
              identificadores de clique de anúncios (fbclid/gclid) e páginas
              visitadas, por meio de cookies e ferramentas de análise.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-believi-white">
              3. Para que usamos seus dados
            </h2>
            <p className="mt-2">
              Utilizamos seus dados para: (a) entender sua necessidade e
              responder ao seu contato; (b) elaborar propostas comerciais; (c)
              medir o desempenho de nossas campanhas de marketing (Google Ads
              e Meta Ads); e (d) melhorar a experiência de navegação no site.
              Não vendemos seus dados a terceiros.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-believi-white">
              4. Com quem compartilhamos
            </h2>
            <p className="mt-2">
              Ao enviar o formulário, seus dados são encaminhados diretamente
              para o WhatsApp da nossa equipe comercial ({WHATSAPP_NUMBER_DISPLAY}).
              Também podemos utilizar ferramentas de terceiros para
              mensuração de campanhas (Google Analytics, Google Tag Manager,
              Meta Ads/API de Conversões), que processam dados de forma
              agregada e, quando aplicável, de forma anonimizada/hash.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-believi-white">
              5. Cookies
            </h2>
            <p className="mt-2">
              Usamos cookies essenciais ao funcionamento do site e, com seu
              consentimento, cookies de marketing e análise (via banner de
              cookies exibido na primeira visita). Você pode gerenciar suas
              preferências a qualquer momento limpando os dados de navegação
              do seu navegador.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-believi-white">
              6. Seus direitos
            </h2>
            <p className="mt-2">
              Você pode solicitar, a qualquer momento, a confirmação da
              existência de tratamento, acesso, correção, anonimização ou
              eliminação dos seus dados pessoais, entrando em contato pelo
              WhatsApp {WHATSAPP_NUMBER_DISPLAY}.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-believi-white">
              7. Contato
            </h2>
            <p className="mt-2">
              Em caso de dúvidas sobre esta política, fale com a Believi IA
              pelo WhatsApp {WHATSAPP_NUMBER_DISPLAY}.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
