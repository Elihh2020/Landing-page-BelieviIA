"use client";

import { useRef, type MouseEvent } from "react";
import Header from "@/components/Header";
import WhatsAppButton from "@/components/WhatsAppButton";
import CtaLink from "@/components/CtaLink";
import { CONTAINER } from "@/lib/ui";

/**
 * Hero com fundo em 3 camadas de parallax (wireframes, linhas de fluxo e
 * "chips" flutuantes). O mouse atualiza as variáveis CSS --mx/--my no
 * container, então não há re-render do React a cada movimento.
 */
function layer(strength: number) {
  return {
    transform: `translate(calc(var(--mx, 0) * ${-strength}px), calc(var(--my, 0) * ${-strength}px))`,
  };
}

const CHIP =
  "flex items-center gap-2.5 rounded-[10px] border border-bv-border-accent bg-bv-card px-3.5 py-2.5 text-bv-text-2";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const b = el.getBoundingClientRect();
    el.style.setProperty("--mx", (((e.clientX - b.left) / b.width - 0.5) * 2).toFixed(3));
    el.style.setProperty("--my", (((e.clientY - b.top) / b.height - 0.5) * 2).toFixed(3));
  };

  const onLeave = () => {
    ref.current?.style.setProperty("--mx", "0");
    ref.current?.style.setProperty("--my", "0");
  };

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative overflow-hidden border-b border-[#1A2422] lg:min-h-[900px]"
    >
      {/* Camada 1 — wireframes de planilha/gráfico/documento */}
      <div aria-hidden="true" className="bv-parallax pointer-events-none absolute -inset-10" style={layer(10)}>
        <svg width="100%" height="100%" viewBox="0 0 1440 960" preserveAspectRatio="xMidYMid slice" fill="none">
          <g stroke="#15292A" strokeWidth="1">
            <rect x="70" y="150" width="210" height="130" rx="10" />
            <line x1="70" y1="180" x2="280" y2="180" />
            <line x1="90" y1="205" x2="250" y2="205" />
            <line x1="90" y1="225" x2="220" y2="225" />
            <line x1="90" y1="245" x2="240" y2="245" />
            <rect x="1160" y="130" width="220" height="140" rx="10" />
            <line x1="1160" y1="160" x2="1380" y2="160" />
            <rect x="1180" y="210" width="20" height="40" />
            <rect x="1215" y="190" width="20" height="60" />
            <rect x="1250" y="225" width="20" height="25" />
            <rect x="1285" y="180" width="20" height="70" />
            <rect x="1320" y="200" width="20" height="50" />
            <rect x="100" y="640" width="190" height="150" rx="10" />
            <line x1="100" y1="670" x2="290" y2="670" />
            <line x1="160" y1="670" x2="160" y2="790" />
            <line x1="225" y1="670" x2="225" y2="790" />
            <line x1="100" y1="705" x2="290" y2="705" />
            <line x1="100" y1="740" x2="290" y2="740" />
            <rect x="1150" y="660" width="210" height="120" rx="10" />
            <line x1="1170" y1="695" x2="1340" y2="695" />
            <line x1="1170" y1="720" x2="1300" y2="720" />
            <line x1="1170" y1="745" x2="1320" y2="745" />
          </g>
        </svg>
      </div>

      {/* Camada 2 — linhas de fluxo animadas */}
      <div aria-hidden="true" className="bv-parallax pointer-events-none absolute -inset-[60px]" style={layer(26)}>
        <svg width="100%" height="100%" viewBox="0 0 1440 960" preserveAspectRatio="xMidYMid slice" fill="none">
          <g stroke="var(--bv-accent)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5">
            <path className="bv-flow" d="M280 215 C 400 215, 420 400, 520 430" />
            <path className="bv-flow slow" d="M290 715 C 400 700, 430 560, 520 510" />
            <path className="bv-flow" d="M920 430 C 1020 400, 1060 220, 1160 200" />
            <path className="bv-flow slow" d="M920 510 C 1020 560, 1060 700, 1150 720" />
          </g>
          <g fill="var(--bv-accent)">
            <circle className="bv-pulse" cx="520" cy="430" r="4" />
            <circle className="bv-pulse d2" cx="920" cy="510" r="4" />
          </g>
        </svg>
      </div>

      {/* Camada 3 — chips flutuantes (só em telas largas, para não cobrir o texto) */}
      <div
        aria-hidden="true"
        className="bv-parallax pointer-events-none absolute inset-0 hidden font-mono text-[13px] xl:block"
        style={layer(52)}
      >
        <div className="absolute top-[33%] left-[5%]">
          <div className={`bv-floaty ${CHIP}`}>
            <span className="rounded bg-[#2A1A14] px-1.5 py-[3px] text-[11px] text-[#FF8A5B]">PDF</span>
            pedido_0412.pdf · processado
          </div>
        </div>
        <div className="absolute top-[58%] left-[7%]">
          <div className={`bv-floaty d2 ${CHIP}`}>
            <span className="rounded bg-[#132617] px-1.5 py-[3px] text-[11px] text-[#6EE787]">XLS</span>
            planilha consolidada
          </div>
        </div>
        <div className="absolute top-[33%] right-[5%]">
          <div className={`bv-floaty d3 ${CHIP}`}>
            <span className="text-bv-accent">⇄</span>CRM → ERP sincronizado
          </div>
        </div>
        <div className="absolute top-[58%] right-[6%]">
          <div className={`bv-floaty ${CHIP}`}>
            <span className="text-bv-accent">✓</span>solicitação registrada
          </div>
        </div>
      </div>

      <div className={`relative ${CONTAINER}`}>
        <Header />

        <div className="mx-auto flex max-w-[900px] flex-col items-center gap-7 py-20 text-center sm:py-28 lg:pt-[120px] lg:pb-[130px]">
          <p className="m-0 inline-flex items-center gap-2 rounded-full border border-bv-border-accent bg-bv-panel px-3.5 py-1.5 font-mono text-[12px] text-bv-muted sm:text-[13px]">
            <span className="bv-pulse h-2 w-2 rounded-full bg-bv-accent" />
            automação · integração · sistemas sob medida
          </p>

          <h1 className="m-0 text-[clamp(40px,5.4vw,74px)] font-semibold leading-[1.02] tracking-[-2.5px]">
            Sua empresa tem processos que poderiam ser mais simples?{" "}
            <span className="text-bv-accent">Nós desenvolvemos a solução.</span>
          </h1>

          <p className="m-0 max-w-[700px] text-[clamp(17px,1.5vw,20px)] leading-[1.55] text-bv-muted">
            Automatizamos tarefas, conectamos sistemas e desenvolvemos soluções sob medida para
            reduzir trabalho manual, evitar retrabalho e deixar sua operação mais eficiente.
          </p>

          <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <WhatsAppButton section="hero" variant="primary">
              Quero automatizar um processo
            </WhatsAppButton>
            <CtaLink href="#solucoes" trackName="cta_solucoes" variant="secondary">
              Conheça nossas soluções
            </CtaLink>
          </div>
        </div>
      </div>
    </section>
  );
}
