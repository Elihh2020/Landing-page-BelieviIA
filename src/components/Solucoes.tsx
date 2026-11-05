import { Table2, FileCog, Share2, LayoutDashboard, Zap } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";
import Reveal from "@/components/Reveal";

const SOLUCOES = [
  {
    icon: Table2,
    title: "Automação de planilhas e documentos",
    text: "Automatização de preenchimentos, atualizações, consolidação de informações, geração de relatórios e processamento de documentos.",
  },
  {
    icon: FileCog,
    title: "Conversão e processamento de PDFs",
    text: "Desenvolvimento de soluções para converter, organizar, extrair e processar informações de documentos, conforme a necessidade de cada operação.",
  },
  {
    icon: Share2,
    title: "Integração entre sistemas",
    text: "Conexão entre plataformas e ferramentas para permitir que informações circulem automaticamente, reduzindo a necessidade de copiar e transferir dados manualmente.",
  },
  {
    icon: LayoutDashboard,
    title: "Sistemas e soluções personalizadas",
    text: "Desenvolvimento de ferramentas e sistemas específicos para organizar informações, controlar solicitações, acompanhar atividades e resolver necessidades internas.",
  },
  {
    icon: Zap,
    title: "Automação de processos internos",
    text: "Identificação e automatização de etapas operacionais que consomem tempo da equipe e podem ser executadas de maneira mais eficiente.",
  },
];

export default function Solucoes() {
  return (
    <section id="solucoes" className="bg-believi-dark py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="max-w-3xl font-heading text-2xl font-bold leading-tight text-believi-white sm:text-3xl lg:text-4xl">
            Não oferecemos apenas ferramentas. Desenvolvemos{" "}
            <span className="text-believi-cyan">soluções</span> para as
            necessidades da sua empresa.
          </h2>
          <p className="mt-5 max-w-2xl font-body text-base leading-relaxed text-believi-gray sm:text-lg">
            Cada empresa possui processos, desafios e necessidades diferentes.
            Por isso, desenvolvemos soluções personalizadas que se adaptam à
            realidade da sua operação.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SOLUCOES.map((s, i) => (
            <Reveal key={s.title} delayMs={i * 80}>
              <div className="h-full rounded-2xl border border-believi-white/10 bg-believi-dark-deeper p-6 transition-colors hover:border-believi-cyan/40">
                <s.icon size={28} className="text-believi-cyan" strokeWidth={1.5} aria-hidden />
                <h3 className="mt-4 font-heading text-lg font-semibold text-believi-white">
                  {s.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-believi-gray">
                  {s.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delayMs={120}>
          <div className="mt-14 flex flex-col items-start gap-6 border-t border-believi-white/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl font-heading text-lg font-semibold text-believi-white sm:text-xl">
              Tem um processo que precisa de uma solução?
            </p>
            <WhatsAppButton section="solucoes" variant="primary" className="flex-none">
              CONVERSE COM NOSSA EQUIPE
            </WhatsAppButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
