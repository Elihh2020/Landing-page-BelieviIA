import WhatsAppButton from "@/components/WhatsAppButton";
import ProcessFlowIllustration from "@/components/illustrations/ProcessFlowIllustration";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-believi-dark pt-28 pb-16 sm:pt-36 sm:pb-24"
    >
      {/* Brilho sutil ciano/teal no canto, conforme identidade da marca */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-believi-cyan/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-believi-cyan/5 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div>
          <h1 className="font-heading text-3xl font-bold leading-tight text-believi-white sm:text-4xl lg:text-5xl">
            Sua empresa tem processos que poderiam ser{" "}
            <span className="text-believi-cyan">mais simples</span>? Nós
            desenvolvemos a solução.
          </h1>

          <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-believi-gray sm:text-lg">
            Automatizamos tarefas, conectamos sistemas e desenvolvemos soluções
            inteligentes sob medida para reduzir trabalhos manuais, evitar
            retrabalho e tornar a operação da sua empresa mais eficiente.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <WhatsAppButton section="hero" variant="primary" className="text-center">
              QUERO AUTOMATIZAR UM PROCESSO
            </WhatsAppButton>
            <a
              href="#solucoes"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-believi-gray/40 px-6 py-3.5 font-heading text-sm font-semibold text-believi-white transition-colors hover:border-believi-cyan hover:text-believi-cyan sm:text-base"
            >
              CONHEÇA NOSSAS SOLUÇÕES
            </a>
          </div>
        </div>

        <ProcessFlowIllustration />
      </div>
    </section>
  );
}
