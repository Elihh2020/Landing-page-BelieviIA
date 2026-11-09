import Reveal from "@/components/Reveal";
import {
  SmartSheetsDemo,
  DocumentProcessingDemo,
  SystemIntegrationDemo,
  CustomSystemDemo,
} from "@/components/illustrations/ApplicationDemos";
import { CONTAINER, H2 } from "@/lib/ui";

const APLICACOES = [
  {
    title: "Planilhas inteligentes",
    text: "Informações inseridas e organizadas automaticamente em planilhas ou relatórios.",
    Demo: SmartSheetsDemo,
  },
  {
    title: "Processamento de documentos",
    text: "PDFs recebidos, lidos e transformados em dados organizados.",
    Demo: DocumentProcessingDemo,
  },
  {
    title: "Integração entre sistemas",
    text: "Dados enviados automaticamente de uma ferramenta para outra.",
    Demo: SystemIntegrationDemo,
  },
  {
    title: "Sistema personalizado",
    text: "Controle de tarefas, solicitações e processos internos em um só lugar.",
    Demo: CustomSystemDemo,
  },
];

export default function Aplicacoes() {
  return (
    <section id="aplicacoes" className={`${CONTAINER} pt-24 sm:pt-[140px]`}>
      <Reveal>
        <div className="grid items-end gap-x-16 gap-y-6 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h2 className={H2}>Veja o que pode ser transformado dentro de uma empresa.</h2>
          </div>
          <p className="m-0 text-base leading-[1.6] text-bv-subtle">
            As telas abaixo são demonstrações ilustrativas de aplicações possíveis. Cada projeto é
            desenvolvido conforme o processo do cliente.
          </p>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-4 lg:grid-cols-2">
        {APLICACOES.map(({ title, text, Demo }, i) => (
          <Reveal key={title} delayMs={i * 80} className="h-full">
            <div className="bv-dots flex h-full flex-col gap-[18px] rounded-2xl border border-bv-border bg-[#0B0F0E] p-5 sm:p-[26px]">
              <h3 className="m-0 text-[21px] font-semibold">{title}</h3>
              <Demo />
              <p className="m-0 text-sm leading-[1.55] text-bv-muted">{text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
