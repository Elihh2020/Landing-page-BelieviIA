/** Classes de botão compartilhadas (design "Técnica v2"). */
export const BUTTON_STYLES = {
  /** Fundo ciano, texto escuro — CTA principal. */
  primary:
    "inline-flex items-center justify-center rounded-lg bg-bv-accent px-6 min-h-[54px] text-base font-semibold text-bv-bg transition-colors duration-200 hover:bg-white",
  /** Contorno discreto sobre fundo escuro. */
  secondary:
    "inline-flex items-center justify-center rounded-lg border border-bv-border-accent bg-bv-panel px-[22px] min-h-[54px] text-base text-bv-text transition-colors duration-200 hover:border-bv-accent hover:text-bv-accent",
  /** Contorno ciano em fonte mono — usado no cabeçalho. */
  outline:
    "inline-flex items-center justify-center rounded-lg border border-bv-accent px-[18px] min-h-[44px] font-mono text-sm text-bv-accent transition-colors duration-200 hover:bg-bv-accent hover:text-bv-bg",
  /** Botão preto para usar dentro dos cards ciano. */
  dark:
    "inline-flex items-center self-start rounded-lg bg-bv-bg px-5 min-h-[48px] text-[15px] font-semibold text-bv-text transition-colors duration-200 hover:bg-bv-surface",
} as const;

export type ButtonVariant = keyof typeof BUTTON_STYLES;

/** Container central das seções. */
export const CONTAINER = "mx-auto w-full max-w-[1280px] px-4 sm:px-8";


/** Título padrão das seções. */
export const H2 =
  "m-0 text-[clamp(30px,3.6vw,52px)] font-semibold leading-[1.05] tracking-[-1.5px]";

/** Card escuro padrão. */
export const CARD = "rounded-2xl border border-bv-border bg-bv-card";
