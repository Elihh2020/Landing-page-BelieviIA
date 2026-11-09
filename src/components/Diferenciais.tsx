import Reveal from "@/components/Reveal";
import ProductDemo from "@/components/illustrations/ProductDemo";
import { CONTAINER } from "@/lib/ui";

const DIFERENCIAIS = [
  { title: "Soluções personalizadas", text: "desenvolvidas a partir do problema identificado." },
  { title: "Foco na operação", text: "melhoramos processos reais, não apenas implementamos tecnologia." },
  { title: "Flexibilidade", text: "de uma tarefa específica até fluxos operacionais mais amplos." },
  { title: "Integração", text: "aproveitamos as ferramentas que sua empresa já usa, quando tecnicamente viável." },
  { title: "Desenvolvimento sob medida", text: "cada solução considera a realidade e os objetivos do negócio." },
];

export default function Diferenciais() {
  return (
    <section
      id="diferenciais"
      className={`${CONTAINER} grid items-center gap-14 pt-24 sm:pt-[140px] lg:grid-cols-[1.3fr_1fr]`}
    >
      {/* Demonstração animada do Clinic.Chat + nota manuscrita */}
      <Reveal className="min-w-0">
        <div className="relative">
          <div className="overflow-hidden rounded-[18px] border border-bv-border bg-bv-card shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)] sm:mr-10">
            <div className="flex items-center gap-2 border-b border-bv-border px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
              <span className="ml-2 font-mono text-xs text-bv-subtle">Clinic.Chat · atendimento com IA</span>
            </div>
            <ProductDemo />
          </div>

          <div className="relative z-10 -mt-5 mr-2 ml-auto w-[280px] max-w-[85%] -rotate-[2.5deg] rounded-md bg-[#F4EFE7] px-5 py-4 shadow-[0_24px_50px_-18px_rgba(0,0,0,0.7)]">
            <p className="m-0 mb-1 font-mono text-[11px] text-[#0B6B62]">nota da equipe</p>
            <p className="m-0 font-hand text-[22px] leading-[1.2] text-[#1C2A22] sm:text-[24px]">
              Antes de propor qualquer solução, a gente quer entender como seu processo funciona
              hoje.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal delayMs={100} className="min-w-0">
        <div className="flex flex-col gap-[22px]">
          <h2 className="m-0 text-[clamp(30px,3.4vw,48px)] font-semibold leading-[1.05] tracking-[-1.5px]">
            Tecnologia desenvolvida de acordo com a{" "}
            <span className="text-bv-accent">realidade da sua empresa</span>.
          </h2>
          <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
            {DIFERENCIAIS.map((d) => (
              <li
                key={d.title}
                className="flex items-start gap-3.5 rounded-[14px] border border-bv-border bg-bv-card px-[18px] py-4"
              >
                <span
                  aria-hidden="true"
                  className="inline-flex h-7 w-7 flex-none items-center justify-center rounded-full bg-bv-accent-bg text-sm font-bold text-bv-accent"
                >
                  ✓
                </span>
                <span className="text-base leading-[1.5] text-bv-muted">
                  <strong className="font-semibold text-bv-text">{d.title}</strong> — {d.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
