/**
 * Ilustração do Hero: planilha + documentos (processo manual) → setas de fluxo
 * → painel organizado (operação automatizada). Construída em HTML/CSS/SVG,
 * sem imagens externas, para manter o carregamento leve.
 */
export default function ProcessFlowIllustration() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto grid w-full max-w-xl grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4"
    >
      {/* Planilha + PDF (processo manual) */}
      <div className="flex flex-col gap-3">
        <div className="rounded-xl border border-believi-white/10 bg-believi-dark-deeper/80 p-3 shadow-lg">
          <div className="mb-2 h-1.5 w-10 rounded-full bg-believi-gray/40" />
          <div className="grid grid-cols-4 gap-1">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="h-3 rounded-sm bg-believi-white/10"
                style={{ opacity: i % 5 === 0 ? 0.9 : 0.35 }}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-believi-white/10 bg-believi-dark-deeper/80 p-3 shadow-lg">
          <div className="flex h-8 w-6 flex-none items-center justify-center rounded-sm bg-believi-gray/20 text-[8px] font-bold text-believi-gray">
            PDF
          </div>
          <div className="flex-1 space-y-1">
            <div className="h-1.5 w-full rounded-full bg-believi-white/15" />
            <div className="h-1.5 w-2/3 rounded-full bg-believi-white/10" />
          </div>
        </div>
      </div>

      {/* Setas de fluxo */}
      <div className="flex flex-col items-center gap-2 px-1 text-believi-cyan">
        <svg width="40" height="20" viewBox="0 0 40 20" fill="none" className="hidden sm:block">
          <path d="M2 10h32M26 3l8 7-8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <svg width="20" height="40" viewBox="0 0 20 40" fill="none" className="sm:hidden">
          <path d="M10 2v32M3 26l7 8 7-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="h-2 w-2 rounded-full bg-believi-cyan shadow-[0_0_12px_2px_rgba(6,255,239,0.6)]" />
      </div>

      {/* Painel / dashboard organizado (operação automatizada) */}
      <div className="rounded-xl border border-believi-cyan/30 bg-believi-dark-deeper/80 p-3 shadow-lg shadow-believi-cyan/10">
        <div className="mb-2 flex items-center justify-between">
          <div className="h-1.5 w-10 rounded-full bg-believi-cyan/60" />
          <span className="h-1.5 w-1.5 rounded-full bg-believi-cyan" />
        </div>
        <div className="flex items-end gap-1.5 h-14">
          {[40, 70, 55, 90, 65].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm bg-believi-cyan/70"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="mt-2 h-1.5 w-full rounded-full bg-believi-white/10" />
      </div>
    </div>
  );
}
