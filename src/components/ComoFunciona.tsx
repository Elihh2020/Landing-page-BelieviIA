import Reveal from "@/components/Reveal";

const ETAPAS = [
  {
    numero: "01",
    titulo: "Você apresenta o problema",
    texto:
      "Conte como funciona o processo atualmente, quais dificuldades sua equipe enfrenta e o que gostaria de melhorar.",
  },
  {
    numero: "02",
    titulo: "Analisamos sua necessidade",
    texto:
      "Entendemos o funcionamento da operação e identificamos as possibilidades de automação ou desenvolvimento.",
  },
  {
    numero: "03",
    titulo: "Desenvolvemos a solução",
    texto:
      "Criamos uma solução personalizada, considerando o processo, as ferramentas utilizadas e os objetivos da empresa.",
  },
  {
    numero: "04",
    titulo: "Implementamos e entregamos",
    texto:
      "A solução é implementada conforme o escopo definido, com orientações para sua utilização.",
  },
];

export default function ComoFunciona() {
  return (
    <section id="como-funciona" className="bg-believi-dark-deeper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="max-w-3xl font-heading text-2xl font-bold leading-tight text-believi-white sm:text-3xl lg:text-4xl">
            Da identificação do problema à{" "}
            <span className="text-believi-cyan">solução implementada</span>.
          </h2>
        </Reveal>

        <div className="relative mt-14 grid gap-10 lg:grid-cols-4 lg:gap-6">
          {/* Linha conectora (desktop) */}
          <div
            aria-hidden="true"
            className="absolute top-6 left-0 right-0 hidden h-px bg-gradient-to-r from-transparent via-believi-cyan/50 to-transparent lg:block"
          />

          {ETAPAS.map((etapa, i) => (
            <Reveal key={etapa.numero} delayMs={i * 100}>
              <div className="relative flex gap-4 lg:flex-col lg:gap-5">
                <div className="relative z-10 flex h-12 w-12 flex-none items-center justify-center rounded-full border-2 border-believi-cyan bg-believi-dark font-heading text-base font-bold text-believi-cyan">
                  {etapa.numero}
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-believi-white">
                    {etapa.titulo}
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-believi-gray">
                    {etapa.texto}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delayMs={150}>
          <p className="mt-16 border-t border-believi-white/10 pt-10 text-center font-heading text-xl font-semibold leading-snug text-believi-white sm:text-2xl">
            Sua empresa não precisa se adaptar a uma ferramenta genérica.{" "}
            <span className="text-believi-cyan">
              A solução pode ser desenvolvida para se adaptar à sua operação.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
