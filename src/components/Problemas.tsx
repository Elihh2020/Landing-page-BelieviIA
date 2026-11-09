import Reveal from "@/components/Reveal";
import CtaLink from "@/components/CtaLink";
import { CARD, CONTAINER, H2 } from "@/lib/ui";

const PROBLEMAS = [
  {
    title: "Planilhas manuais",
    text: "Sua equipe perde tempo preenchendo, atualizando e conferindo informações em diferentes planilhas?",
    link: "automação de planilhas",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 3v18" />
      </>
    ),
  },
  {
    title: "Documentos e PDFs",
    text: "Sua empresa precisa organizar, converter, extrair ou processar grandes volumes de documentos?",
    link: "processamento de PDFs",
    icon: (
      <>
        <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
        <path d="M14 3v6h6M8 13h8M8 17h5" />
      </>
    ),
  },
  {
    title: "Sistemas desconectados",
    text: "Informações precisam ser copiadas à mão de uma plataforma para outra porque os sistemas não se comunicam?",
    link: "integração entre sistemas",
    icon: <path d="M10 14l4-4M8 12l-2 2a3 3 0 0 0 4 4l2-2M16 12l2-2a3 3 0 0 0-4-4l-2 2" />,
  },
  {
    title: "Retrabalho operacional",
    text: "Sua equipe executa várias vezes as mesmas tarefas ou precisa corrigir erros causados por processos manuais?",
    link: "automação de processos internos",
    icon: <path d="M4 12a8 8 0 1 0 2.3-5.7L4 8.6M4 4v4.6h4.6" />,
  },
  {
    title: "Falta de sistemas específicos",
    text: "Sua empresa precisa de uma ferramenta para controlar um processo, mas as soluções do mercado não atendem exatamente?",
    link: "sistemas personalizados",
    icon: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
  },
];

export default function Problemas() {
  return (
    <section id="problemas" className={`${CONTAINER} pt-24 sm:pt-[120px]`}>
      <Reveal>
        <div className="flex max-w-[860px] flex-col gap-5">
          <h2 className={H2}>
            Quanto tempo sua empresa perde com o que poderia ser{" "}
            <span className="text-bv-accent">automático</span>?
          </h2>
          <p className="m-0 text-lg leading-[1.6] text-bv-muted">
            O problema quase nunca é a equipe. É a forma como as tarefas são feitas. Veja se você
            se reconhece em algum destes:
          </p>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {PROBLEMAS.map((p, i) => (
          <Reveal key={p.title} delayMs={i * 70} className="h-full">
            <article className={`${CARD} flex h-full flex-col gap-3.5 p-7 transition-colors hover:border-bv-border-accent`}>
              <svg
                aria-hidden="true"
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--bv-accent)"
                strokeWidth="1.6"
              >
                {p.icon}
              </svg>
              <h3 className="m-0 text-[22px] font-semibold">{p.title}</h3>
              <p className="m-0 text-[15px] leading-[1.55] text-bv-muted">{p.text}</p>
              <a
                href="#solucoes"
                className="mt-auto border-t border-bv-border pt-3.5 font-mono text-[13px] text-bv-accent hover:text-white"
              >
                → {p.link}
              </a>
            </article>
          </Reveal>
        ))}

        <Reveal delayMs={PROBLEMAS.length * 70} className="h-full">
          <div className="flex h-full min-h-[260px] flex-col justify-between gap-6 rounded-2xl bg-bv-accent p-7 text-bv-bg">
            <span className="font-mono text-xs">SE RECONHECEU ALGUM?</span>
            <p className="m-0 text-[26px] font-semibold leading-[1.15] tracking-[-0.5px]">
              Se algum desses problemas faz parte da sua rotina, podemos desenvolver uma solução
              para sua empresa.
            </p>
            <CtaLink href="#diagnostico" trackName="cta_problemas" variant="dark">
              Quero resolver esse problema
            </CtaLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
