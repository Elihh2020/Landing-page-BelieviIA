import Reveal from "@/components/Reveal";
import CtaLink from "@/components/CtaLink";
import { CONTAINER, H2 } from "@/lib/ui";

const ETAPAS = [
  {
    titulo: "Você apresenta o problema",
    texto: "Conte como o processo funciona hoje, onde a equipe trava e o que gostaria de melhorar.",
  },
  {
    titulo: "Analisamos sua necessidade",
    texto: "Entendemos a operação e identificamos as possibilidades de automação ou desenvolvimento.",
  },
  {
    titulo: "Desenvolvemos a solução",
    texto: "Criamos a solução considerando o processo, as ferramentas que você já usa e seus objetivos.",
  },
  {
    titulo: "Implementamos e entregamos",
    texto: "A solução é implementada conforme o escopo definido, com orientações para o uso.",
  },
];

export default function ComoFunciona() {
  return (
    <section id="como-funciona" className={`${CONTAINER} pt-24 sm:pt-[140px]`}>
      <Reveal>
        <div className="flex max-w-[860px] flex-col gap-4">
          <h2 className={H2}>Da identificação do problema à solução implementada.</h2>
        </div>
      </Reveal>

      <ol className="m-0 mt-12 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
        {ETAPAS.map((etapa, i) => (
          <Reveal
            as="li"
            key={etapa.titulo}
            delayMs={i * 90}
            className="flex h-full flex-col gap-3 rounded-[18px] border border-bv-border bg-bv-card p-7"
          >
              <span
                className={`inline-flex h-[46px] w-[46px] items-center justify-center rounded-full font-mono text-[15px] font-medium ${
                  i === 0
                    ? "bg-bv-accent text-bv-bg"
                    : "border border-bv-accent-border bg-bv-accent-bg text-bv-accent"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="m-0 text-[21px] font-semibold leading-tight">{etapa.titulo}</h3>
              <p className="m-0 text-[15px] leading-[1.55] text-bv-muted">{etapa.texto}</p>
          </Reveal>
        ))}
      </ol>

      <Reveal delayMs={120}>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 rounded-[20px] border border-bv-border-accent bg-bv-panel px-6 py-8 sm:px-9">
          <p className="m-0 flex-[1_1_520px] text-[clamp(20px,2vw,26px)] font-medium leading-[1.35]">
            Sua empresa não precisa se adaptar a uma ferramenta genérica.{" "}
            <span className="text-bv-accent">
              A solução pode ser desenvolvida para se adaptar à sua operação.
            </span>
          </p>
          <CtaLink
            href="#diagnostico"
            trackName="cta_como_funciona"
            variant="primary"
            className="min-h-[50px] text-[15px]"
          >
            Apresentar meu problema
          </CtaLink>
        </div>
      </Reveal>
    </section>
  );
}
