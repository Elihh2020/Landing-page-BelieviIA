import { Table2, FileText, Unplug, RotateCcw, Wrench } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";
import Reveal from "@/components/Reveal";

const PROBLEMAS = [
  {
    icon: Table2,
    title: "Planilhas manuais",
    text: "Sua equipe perde tempo preenchendo, atualizando e conferindo informações em diferentes planilhas?",
  },
  {
    icon: FileText,
    title: "Documentos e PDFs",
    text: "Sua empresa precisa organizar, converter, extrair ou processar grandes volumes de documentos?",
  },
  {
    icon: Unplug,
    title: "Sistemas desconectados",
    text: "Informações precisam ser copiadas manualmente de uma plataforma para outra porque os sistemas não se comunicam?",
  },
  {
    icon: RotateCcw,
    title: "Retrabalho operacional",
    text: "Sua equipe executa várias vezes as mesmas tarefas ou precisa corrigir erros causados por processos manuais?",
  },
  {
    icon: Wrench,
    title: "Falta de sistemas específicos",
    text: "Sua empresa precisa de uma ferramenta para controlar determinado processo, mas as soluções disponíveis não atendem exatamente à necessidade?",
  },
];

export default function Problemas() {
  return (
    <section id="problemas" className="bg-believi-dark-deeper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="max-w-3xl font-heading text-2xl font-bold leading-tight text-believi-white sm:text-3xl lg:text-4xl">
            Quanto tempo sua empresa perde com processos que poderiam ser{" "}
            <span className="text-believi-cyan">automatizados</span>?
          </h2>
          <p className="mt-5 max-w-2xl font-body text-base leading-relaxed text-believi-gray sm:text-lg">
            Muitas empresas continuam utilizando processos manuais mesmo quando já
            existem maneiras mais inteligentes de executar essas tarefas. O
            problema nem sempre está na equipe. Muitas vezes, está na forma como
            as atividades são realizadas.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROBLEMAS.map((p, i) => (
            <Reveal key={p.title} delayMs={i * 80}>
              <div className="h-full rounded-2xl border border-believi-white/10 bg-believi-dark p-6 transition-colors hover:border-believi-cyan/40">
                <p.icon size={28} className="text-believi-cyan" strokeWidth={1.5} aria-hidden />
                <h3 className="mt-4 font-heading text-lg font-semibold text-believi-white">
                  {p.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-believi-gray">
                  {p.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delayMs={120}>
          <div className="mt-14 flex flex-col items-start gap-6 border-t border-believi-white/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl font-heading text-lg font-semibold text-believi-white sm:text-xl">
              Se algum desses problemas faz parte da sua rotina, podemos
              desenvolver uma solução para sua empresa.
            </p>
            <WhatsAppButton section="problemas" variant="primary" className="flex-none">
              QUERO RESOLVER ESSE PROBLEMA
            </WhatsAppButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
