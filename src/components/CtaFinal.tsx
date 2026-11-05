import WhatsAppButton from "@/components/WhatsAppButton";
import Reveal from "@/components/Reveal";

export default function CtaFinal() {
  return (
    <section className="relative overflow-hidden bg-believi-dark py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-believi-cyan/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <Reveal>
          <h2 className="font-heading text-2xl font-bold leading-tight text-believi-white sm:text-3xl lg:text-4xl">
            Sua empresa pode trabalhar de uma maneira{" "}
            <span className="text-believi-cyan">mais inteligente</span>.
          </h2>
          <p className="mt-5 font-body text-base leading-relaxed text-believi-gray sm:text-lg">
            Não deixe processos manuais, tarefas repetitivas e sistemas
            desconectados limitarem a eficiência da sua operação. Conte seu
            desafio para a Believi IA. Vamos avaliar como desenvolver uma
            solução para sua empresa.
          </p>
          <div className="mt-8 flex justify-center">
            <WhatsAppButton section="ctaFinal" variant="primary">
              QUERO DESENVOLVER UMA SOLUÇÃO
            </WhatsAppButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
