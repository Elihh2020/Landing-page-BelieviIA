import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { CONTAINER } from "@/lib/ui";

/**
 * Foto real da equipe (sem banco de imagens). Basta salvar o arquivo em
 * public/equipe-believi.jpg — enquanto ele não existir, aparece um placeholder.
 */
const TEAM_PHOTO = "/equipe-believi.jpg";
const hasTeamPhoto = existsSync(path.join(process.cwd(), "public", TEAM_PHOTO));

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
      className={`${CONTAINER} grid items-center gap-14 pt-24 sm:pt-[140px] lg:grid-cols-2`}
    >
      {/* Foto da equipe em "janela" + nota manuscrita */}
      <Reveal>
        <div className="relative min-h-[440px] sm:min-h-[560px]">
          <div className="absolute inset-[0_24px_50px_0] flex flex-col overflow-hidden rounded-[22px] border border-bv-border bg-bv-card sm:inset-[0_40px_50px_0]">
            <div className="flex items-center gap-2 border-b border-bv-border px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#2A302D]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#2A302D]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#2A302D]" />
              <span className="ml-2 font-mono text-xs text-bv-subtle">equipe-believi.jpg</span>
            </div>
            <div className="relative flex flex-1 items-center justify-center bg-[#121918]">
              {hasTeamPhoto ? (
                <Image
                  src={TEAM_PHOTO}
                  alt="Equipe da Believi IA"
                  fill
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="object-cover"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="inline-flex h-16 w-16 items-center justify-center rounded-xl bg-bv-accent-bg font-mono text-2xl text-bv-accent"
                >
                  b/
                </span>
              )}
            </div>
          </div>

          <div className="absolute right-0 bottom-0 w-[320px] max-w-[90%] -rotate-[2.5deg] rounded-md bg-[#F4EFE7] px-[22px] py-5 shadow-[0_24px_50px_-18px_rgba(0,0,0,0.7)]">
            <p className="m-0 mb-1.5 font-mono text-[11px] text-[#0B6B62]">nota da equipe</p>
            <p className="m-0 font-hand text-[26px] leading-[1.2] text-[#1C2A22]">
              Antes de propor qualquer solução, a gente quer entender como seu processo funciona
              hoje.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal delayMs={100}>
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
