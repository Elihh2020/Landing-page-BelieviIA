/**
 * Demonstrações ilustrativas da seção "Aplicações na prática".
 * Dados fictícios e genéricos, sem nomes de empresas reais — apenas para
 * representar visualmente o tipo de transformação possível.
 */

function DemoFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-44 flex-col justify-center rounded-xl border border-believi-white/10 bg-believi-dark-deeper/70 p-4">
      {children}
    </div>
  );
}

export function SmartSheetsDemo() {
  return (
    <DemoFrame>
      <div className="space-y-2">
        {[1, 2, 3, 4].map((row) => (
          <div key={row} className="flex items-center gap-2">
            <span className="h-2 w-2 flex-none rounded-full bg-believi-cyan/70" />
            <div
              className="animate-believi-row-in h-2.5 flex-1 rounded-sm bg-believi-white/15"
              style={{ animationDelay: `${row * 0.18}s` }}
            />
            <div
              className="animate-believi-row-in h-2.5 w-10 rounded-sm bg-believi-cyan/40"
              style={{ animationDelay: `${row * 0.18}s` }}
            />
          </div>
        ))}
      </div>
    </DemoFrame>
  );
}

export function DocumentProcessingDemo() {
  return (
    <DemoFrame>
      <div className="flex items-center justify-between">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="animate-believi-blink flex h-12 w-9 items-center justify-center rounded-sm border border-believi-white/20 bg-believi-white/10 text-[7px] font-bold text-believi-gray"
              style={{ animationDelay: `${i * 0.3}s` }}
            >
              PDF
            </div>
          ))}
        </div>
        <svg width="36" height="16" viewBox="0 0 36 16" fill="none" className="text-believi-cyan">
          <path d="M1 8h30M24 2l7 6-7 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="flex flex-col gap-1.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-2.5 w-16 rounded-sm bg-believi-cyan/40" />
          ))}
        </div>
      </div>
    </DemoFrame>
  );
}

export function SystemIntegrationDemo() {
  return (
    <DemoFrame>
      <div className="relative flex items-center justify-between">
        <div className="z-10 rounded-lg border border-believi-white/15 bg-believi-dark px-3 py-4 text-center font-heading text-[10px] font-semibold text-believi-gray">
          Sistema A
        </div>
        <div className="relative mx-2 h-px flex-1 bg-believi-white/15">
          <span className="animate-believi-flow-dot absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-believi-cyan shadow-[0_0_8px_2px_rgba(6,255,239,0.6)]" />
        </div>
        <div className="z-10 rounded-lg border border-believi-cyan/40 bg-believi-dark px-3 py-4 text-center font-heading text-[10px] font-semibold text-believi-cyan">
          Sistema B
        </div>
      </div>
    </DemoFrame>
  );
}

export function CustomSystemDemo() {
  return (
    <DemoFrame>
      <div className="grid grid-cols-3 gap-2">
        {["Pendente", "Em andamento", "Concluído"].map((col, ci) => (
          <div key={col} className="rounded-md border border-believi-white/10 bg-believi-dark p-1.5">
            <p className="mb-1.5 text-[7px] font-semibold uppercase tracking-wide text-believi-gray">
              {col}
            </p>
            <div className="space-y-1">
              {Array.from({ length: ci === 1 ? 2 : 1 }).map((_, i) => (
                <div key={i} className="h-3 rounded-sm bg-believi-cyan/30" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </DemoFrame>
  );
}
