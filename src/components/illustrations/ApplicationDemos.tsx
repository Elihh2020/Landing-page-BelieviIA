/**
 * Demonstrações ilustrativas da seção "Aplicações na prática".
 * Dados fictícios e genéricos, sem nomes de empresas reais — apenas para
 * representar visualmente o tipo de transformação possível.
 */

const ROW = "grid grid-cols-[1.4fr_1fr_1fr_0.9fr] px-3.5 py-2.5";

export function SmartSheetsDemo() {
  const rows = [
    ["Cliente Exemplo A", "ontem"],
    ["Cliente Exemplo B", "ontem"],
    ["Cliente Exemplo C", "seg"],
  ];
  return (
    <div aria-hidden="true" className="overflow-hidden rounded-[10px] border border-bv-border-2 bg-bv-surface font-mono text-[11px] sm:text-xs">
      <div className={`${ROW} bg-bv-surface-2 text-bv-subtle`}>
        <span>cliente</span>
        <span>data</span>
        <span>valor</span>
        <span>status</span>
      </div>
      <div className={`bv-rowin ${ROW} border-t border-bv-border bg-bv-accent-bg text-bv-text`}>
        <span>Cliente Exemplo D</span>
        <span>hoje</span>
        <span>R$ 0.000</span>
        <span className="text-bv-accent">novo</span>
      </div>
      {rows.map(([cliente, data]) => (
        <div key={cliente} className={`${ROW} border-t border-bv-border text-bv-text-2`}>
          <span>{cliente}</span>
          <span>{data}</span>
          <span>R$ 0.000</span>
          <span>ok</span>
        </div>
      ))}
    </div>
  );
}

export function DocumentProcessingDemo() {
  return (
    <div aria-hidden="true" className="flex flex-wrap items-center gap-3.5">
      <div className="flex flex-col gap-2">
        {["nota_01.pdf", "nota_02.pdf", "contrato.pdf"].map((f) => (
          <span
            key={f}
            className="flex items-center gap-2 rounded-lg border border-bv-border-2 bg-bv-surface px-3 py-2 font-mono text-xs text-bv-text-2"
          >
            <span className="rounded-[3px] bg-[#2A1A14] px-[5px] py-0.5 text-[10px] text-[#FF8A5B]">PDF</span>
            {f}
          </span>
        ))}
      </div>
      <svg width="44" height="20" viewBox="0 0 44 20" fill="none">
        <path className="bv-flow" d="M0 10h40" stroke="var(--bv-accent)" strokeWidth="2" />
        <path d="M34 4l6 6-6 6" stroke="var(--bv-accent)" strokeWidth="2" />
      </svg>
      <div className="grid flex-[1_1_200px] grid-cols-[auto_1fr] gap-x-3.5 gap-y-2 rounded-[10px] border border-bv-accent bg-bv-surface px-3.5 py-3 font-mono text-xs">
        <span className="text-bv-subtle">fornecedor</span>
        <span>Empresa Exemplo</span>
        <span className="text-bv-subtle">documento</span>
        <span>NF 0000</span>
        <span className="text-bv-subtle">valor</span>
        <span>R$ 0.000,00</span>
        <span className="text-bv-subtle">vencimento</span>
        <span>00/00</span>
      </div>
    </div>
  );
}

function FlowArrow() {
  return (
    <svg width="36" height="12" viewBox="0 0 36 12" fill="none" className="hidden sm:block">
      <path className="bv-flow" d="M0 6h36" stroke="var(--bv-accent)" strokeWidth="2" />
    </svg>
  );
}

export function SystemIntegrationDemo() {
  const nodes = [
    { tag: "ORIGEM", label: "Formulário do site" },
    { tag: "CRM", label: "Lead cadastrado", active: true },
    { tag: "PLANILHA", label: "Linha criada" },
    { tag: "EQUIPE", label: "Aviso enviado" },
  ];
  return (
    <div aria-hidden="true" className="flex flex-wrap items-center gap-x-2 gap-y-3 sm:gap-x-0">
      {nodes.map((n, i) => (
        <div key={n.tag} className="contents">
          {i > 0 && <FlowArrow />}
          <div
            className={`flex flex-[1_1_110px] flex-col gap-1 rounded-[10px] border bg-bv-surface p-3 ${
              n.active ? "border-bv-accent" : "border-bv-border-2"
            }`}
          >
            <span className={`font-mono text-[10px] ${n.active ? "text-bv-accent" : "text-bv-subtle"}`}>
              {n.tag}
            </span>
            <span className="text-sm font-semibold">{n.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

const TASK = "rounded-lg border border-bv-border-2 bg-bv-surface p-2.5";
const TASK_ACTIVE = "rounded-lg border border-bv-accent bg-bv-surface p-2.5";

export function CustomSystemDemo() {
  return (
    <div aria-hidden="true" className="grid grid-cols-3 gap-2.5 text-[12px] sm:text-[13px]">
      <div className="flex flex-col gap-2">
        <span className="font-mono text-[10px] text-bv-subtle sm:text-[11px]">NOVAS · 3</span>
        <span className={TASK}>Compra de material</span>
        <span className={TASK}>Acesso ao sistema</span>
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-mono text-[10px] text-bv-subtle sm:text-[11px]">EM ANDAMENTO · 2</span>
        <span className={TASK_ACTIVE}>Reembolso #0000</span>
        <span className={TASK}>Manutenção</span>
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-mono text-[10px] text-bv-subtle sm:text-[11px]">CONCLUÍDAS · 8</span>
        <span className={`${TASK} text-bv-subtle line-through`}>Férias equipe</span>
        <span className={`${TASK} text-bv-subtle line-through`}>Novo fornecedor</span>
      </div>
    </div>
  );
}
