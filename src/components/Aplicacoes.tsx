import Reveal from "@/components/Reveal";
import {
  SmartSheetsDemo,
  DocumentProcessingDemo,
  SystemIntegrationDemo,
  CustomSystemDemo,
} from "@/components/illustrations/ApplicationDemos";

const APLICACOES = [
  {
    title: "Planilhas inteligentes",
    text: "Informações sendo inseridas e automaticamente organizadas em uma planilha ou relatório.",
    Demo: SmartSheetsDemo,
  },
  {
    title: "Processamento de documentos",
    text: "PDFs sendo recebidos, processados e organizados em uma estrutura de informações.",
    Demo: DocumentProcessingDemo,
  },
  {
    title: "Integração entre sistemas",
    text: "Dados saindo de uma ferramenta e sendo encaminhados automaticamente para outra.",
    Demo: SystemIntegrationDemo,
  },
  {
    title: "Sistema personalizado",
    text: "Interface ilustrativa de controle de tarefas, solicitações ou processos internos.",
    Demo: CustomSystemDemo,
  },
];

export default function Aplicacoes() {
  return (
    <section className="bg-believi-dark py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="max-w-3xl font-heading text-2xl font-bold leading-tight text-believi-white sm:text-3xl lg:text-4xl">
            Veja o que pode ser{" "}
            <span className="text-believi-cyan">transformado</span> dentro de
            uma empresa.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {APLICACOES.map(({ title, text, Demo }, i) => (
            <Reveal key={title} delayMs={i * 80}>
              <div className="rounded-2xl border border-believi-white/10 bg-believi-dark-deeper p-5">
                <span className="inline-block rounded-full border border-believi-cyan/30 px-3 py-1 font-body text-[11px] font-semibold uppercase tracking-wide text-believi-cyan">
                  Demonstração ilustrativa
                </span>
                <h3 className="mt-3 font-heading text-lg font-semibold text-believi-white">
                  {title}
                </h3>
                <p className="mt-1.5 font-body text-sm leading-relaxed text-believi-gray">
                  {text}
                </p>
                <div className="mt-4">
                  <Demo />
                </div>
                <p className="mt-2 font-body text-[11px] italic text-believi-gray/70">
                  Exemplo de aplicação com dados fictícios, apenas para
                  ilustração.
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
