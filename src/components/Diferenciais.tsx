import { Settings2, Target, MoveHorizontal, Puzzle, Ruler } from "lucide-react";
import Reveal from "@/components/Reveal";

const DIFERENCIAIS = [
  {
    icon: Settings2,
    title: "Soluções personalizadas",
    text: "Desenvolvidas conforme o problema e a necessidade identificada.",
  },
  {
    icon: Target,
    title: "Foco na operação",
    text: "Buscamos melhorar processos reais, não apenas implementar tecnologia.",
  },
  {
    icon: MoveHorizontal,
    title: "Flexibilidade",
    text: "Podemos resolver desde uma tarefa específica até fluxos operacionais mais amplos.",
  },
  {
    icon: Puzzle,
    title: "Integração",
    text: "Buscamos aproveitar as ferramentas que a empresa já utiliza, quando tecnicamente viável.",
  },
  {
    icon: Ruler,
    title: "Desenvolvimento sob medida",
    text: "A solução considera a realidade e os objetivos de cada negócio.",
  },
];

export default function Diferenciais() {
  return (
    <section className="bg-believi-dark-deeper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="max-w-3xl font-heading text-2xl font-bold leading-tight text-believi-white sm:text-3xl lg:text-4xl">
            Tecnologia desenvolvida de acordo com a{" "}
            <span className="text-believi-cyan">realidade da sua empresa</span>.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {DIFERENCIAIS.map((d, i) => (
            <Reveal key={d.title} delayMs={i * 70}>
              <div className="h-full rounded-2xl border border-believi-white/10 bg-believi-dark p-6">
                <d.icon size={26} className="text-believi-cyan" strokeWidth={1.5} aria-hidden />
                <h3 className="mt-4 font-heading text-base font-semibold text-believi-white">
                  {d.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-believi-gray">
                  {d.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
