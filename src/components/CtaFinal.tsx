import WhatsAppButton from "@/components/WhatsAppButton";
import Reveal from "@/components/Reveal";
import { CONTAINER } from "@/lib/ui";

export default function CtaFinal() {
  return (
    <section id="contato" className={`${CONTAINER} pt-24 sm:pt-[140px]`}>
      <Reveal>
        <div className="flex flex-col items-center gap-6 rounded-3xl border border-bv-border-accent bg-bv-panel px-6 py-14 text-center sm:px-10 sm:py-[72px]">
          <h2 className="m-0 max-w-[860px] text-[clamp(32px,4vw,56px)] font-semibold leading-[1.05] tracking-[-2px]">
            Sua empresa pode trabalhar de uma maneira mais inteligente.
          </h2>
          <p className="m-0 max-w-[620px] text-lg leading-[1.6] text-bv-muted">
            Não deixe processos manuais, tarefas repetitivas e sistemas desconectados limitarem sua
            operação. Conte seu desafio — vamos avaliar como desenvolver uma solução para a sua
            empresa.
          </p>
          <WhatsAppButton section="ctaFinal" variant="primary" className="min-h-[56px] px-7 text-[17px]">
            Quero desenvolver uma solução
          </WhatsAppButton>
        </div>
      </Reveal>
    </section>
  );
}
