import Reveal from "@/components/Reveal";
import CtaLink from "@/components/CtaLink";
import { CONTAINER, H2 } from "@/lib/ui";

/** Cada solução tem um tom próprio para o ícone (fundo, borda, traço). */
const SOLUCOES = [
  {
    title: "Automação de planilhas e documentos",
    text: "Preenchimentos, atualizações, consolidação de informações, relatórios e processamento de documentos — sem digitação manual.",
    tone: { bg: "#10302C", border: "#1E4A44", stroke: "#2DE2D0" },
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 3v18" />
      </>
    ),
  },
  {
    title: "Conversão e processamento de PDFs",
    text: "Converter, organizar, extrair e processar informações de documentos, conforme a necessidade de cada operação.",
    tone: { bg: "#2A1A14", border: "#4A2A1E", stroke: "#FF8A5B" },
    icon: (
      <>
        <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
        <path d="M14 3v6h6" />
      </>
    ),
  },
  {
    title: "Integração entre sistemas",
    text: "Plataformas e ferramentas conectadas para que as informações circulem sozinhas, sem copiar e colar dados.",
    tone: { bg: "#14213A", border: "#22385E", stroke: "#7FB2FF" },
    icon: (
      <>
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="6" r="3" />
        <circle cx="18" cy="18" r="3" />
        <path d="M8.6 10.6l6.8-3.2M8.6 13.4l6.8 3.2" />
      </>
    ),
  },
  {
    title: "Sistemas e soluções personalizadas",
    text: "Ferramentas específicas para organizar informações, controlar solicitações, acompanhar atividades e resolver necessidades internas.",
    tone: { bg: "#1F1A33", border: "#352B57", stroke: "#B49CFF" },
    icon: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
  },
  {
    title: "Automação de processos internos",
    text: "Identificamos as etapas que consomem tempo da equipe e automatizamos o que pode ser feito de forma mais eficiente.",
    tone: { bg: "#10302C", border: "#1E4A44", stroke: "#2DE2D0" },
    icon: <path d="M13 2L4 14h7l-1 8 9-12h-7z" />,
  },
];

export default function Solucoes() {
  return (
    <section id="solucoes" className={`${CONTAINER} pt-24 sm:pt-[140px]`}>
      <Reveal>
        <div className="flex max-w-[860px] flex-col gap-4">
          <h2 className={H2}>
            Não oferecemos apenas ferramentas. Desenvolvemos{" "}
            <span className="text-bv-accent">soluções</span> para a sua empresa.
          </h2>
          <p className="m-0 text-lg leading-[1.6] text-bv-muted">
            Cada empresa tem processos, desafios e necessidades diferentes. Por isso, cada solução
            é desenhada para a realidade da sua operação.
          </p>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {SOLUCOES.map((s, i) => (
          <Reveal key={s.title} delayMs={i * 70} className="h-full">
            <article className="flex h-full flex-col gap-3.5 rounded-[18px] border border-bv-border bg-bv-card p-[30px] transition-colors hover:border-bv-border-accent">
              <div className="flex items-center justify-between">
                <span
                  className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-[14px] border"
                  style={{ background: s.tone.bg, borderColor: s.tone.border }}
                >
                  <svg
                    aria-hidden="true"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={s.tone.stroke}
                    strokeWidth="1.8"
                  >
                    {s.icon}
                  </svg>
                </span>
                <span className="font-mono text-[13px] text-bv-dim">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="m-0 text-[23px] font-semibold leading-tight">{s.title}</h3>
              <p className="m-0 text-[15px] leading-[1.6] text-bv-muted">{s.text}</p>
            </article>
          </Reveal>
        ))}

        <Reveal delayMs={SOLUCOES.length * 70} className="h-full">
          <div className="flex h-full min-h-[240px] flex-col justify-between gap-6 rounded-[18px] bg-bv-accent p-[30px] text-bv-bg">
            <span className="font-mono text-xs">PRÓXIMO PASSO</span>
            <p className="m-0 text-[28px] font-semibold leading-[1.12] tracking-[-0.5px]">
              Tem um processo que precisa de uma solução?
            </p>
            <CtaLink href="#diagnostico" trackName="cta_solucoes_equipe" variant="dark">
              Converse com nossa equipe
            </CtaLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
