import Reveal from "@/components/Reveal";
import WhatsAppButton from "@/components/WhatsAppButton";
import { FAQ_ITEMS } from "@/lib/faqData";
import { CONTAINER, H2 } from "@/lib/ui";

export default function Faq() {
  return (
    <section id="faq" className={`${CONTAINER} grid gap-12 pt-24 sm:pt-[140px] lg:grid-cols-2`}>
      <Reveal>
        <div className="flex flex-col gap-4">
          <h2 className={H2}>Perguntas frequentes</h2>
          <p className="m-0 text-[17px] leading-[1.6] text-bv-muted">
            Não achou sua dúvida?{" "}
            <WhatsAppButton section="float" variant="inline">
              Fale com a gente no WhatsApp
            </WhatsAppButton>
            .
          </p>
        </div>
      </Reveal>

      <Reveal delayMs={80}>
        <div className="flex flex-col border-t border-bv-border">
          {FAQ_ITEMS.map((item) => (
            <details key={item.question} className="border-b border-bv-border py-[22px]">
              <summary className="flex justify-between gap-4 text-[17px] font-medium sm:text-[19px]">
                {item.question}
                <span
                  aria-hidden="true"
                  className="bv-plus flex-none text-bv-accent transition-transform duration-200"
                >
                  +
                </span>
              </summary>
              <p className="m-0 mt-3.5 text-base leading-[1.6] text-bv-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
