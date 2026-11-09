"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Demonstração animada do Clinic.Chat (produto da Believi), simulando uma
 * gravação de tela: painel → conversa atendida pela IA → agendamento criado.
 * Todos os dados são fictícios.
 *
 * A tela é desenhada num "canvas" fixo de 880×560 e escalada para caber
 * no espaço disponível, como um vídeo.
 */

const W = 880;
const H = 560;
const SIDEBAR_W = 180;
const TOP_H = 44;
const NAV_Y0 = 84;
const NAV_STEP = 36;

const C = {
  sidebar: "#141414",
  bg: "#E6E6E6",
  card: "#EFEFEF",
  border: "#D5D5D5",
  text: "#1F1F1F",
  muted: "#6B6B6B",
  yellow: "#D4B30C",
  yellowBg: "#F3E7A6",
};

type Scene = "overview" | "chat" | "agenda";

const NAV = [
  { label: "Visão Geral", scene: "overview" as Scene, icon: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" },
  { label: "Conversas", scene: "chat" as Scene, icon: "M4 5h16v11H8l-4 4z" },
  { label: "Relatórios", scene: null, icon: "M5 20V10M12 20V4M19 20v-7" },
  { label: "Equipe", scene: null, icon: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20c0-3 3-5 6-5s6 2 6 5M17 11a3 3 0 0 0 0-6M21 20c0-2-1.5-4-4-4.6" },
  { label: "Agendamentos", scene: "agenda" as Scene, icon: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4" },
];

const navPoint = (i: number) => ({ x: 70, y: NAV_Y0 + i * NAV_STEP + 16 });
const POINT = {
  idle: { x: 620, y: 300 },
  firstChat: { x: 300, y: 163 },
};

const MESSAGES = [
  { from: "patient", text: "Olá! Gostaria de agendar uma consulta com clínico geral." },
  { from: "ia", text: "Olá, Ana! Tenho horários na quinta-feira às 10h ou às 15h. Qual prefere?" },
  { from: "patient", text: "Às 15h, por favor." },
  { from: "ia", text: "Pronto! Consulta agendada para quinta, 12/11, às 15h. Enviaremos um lembrete na véspera.", booked: true },
] as const;

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function ProductDemo() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(false);
  const [scale, setScale] = useState(0);
  const [scene, setScene] = useState<Scene>("overview");
  const [cursor, setCursor] = useState(POINT.idle);
  const [showCursor, setShowCursor] = useState(true);
  const [clickKey, setClickKey] = useState(0);
  const [selected, setSelected] = useState(false);
  const [msgs, setMsgs] = useState(0);
  const [typing, setTyping] = useState(false);
  const [newRow, setNewRow] = useState(false);
  const [loop, setLoop] = useState(0);

  // Escala o canvas para a largura disponível.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / W));
    ro.observe(el);
    const io = new IntersectionObserver(([entry]) => (visibleRef.current = entry.isIntersecting));
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  // Roteiro da "gravação".
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cancelled = false;
    // Espera o tempo pedido, pausando enquanto a demo está fora da tela.
    const step = async (ms: number) => {
      let left = ms;
      while (left > 0) {
        if (cancelled) throw new Error("cancelled");
        await wait(150);
        if (visibleRef.current) left -= 150;
      }
    };
    const click = () => setClickKey((k) => k + 1);

    const run = async () => {
      await wait(0);
      // Sem animações: mostra a conversa completa, parada.
      if (reduced) {
        setShowCursor(false);
        setScene("chat");
        setSelected(true);
        setMsgs(MESSAGES.length);
        return;
      }
      for (;;) {
        // 1. Visão geral
        setScene("overview");
        setLoop((l) => l + 1);
        setSelected(false);
        setMsgs(0);
        setTyping(false);
        setNewRow(false);
        setCursor(POINT.idle);
        await step(3600);

        // 2. Conversas
        setCursor(navPoint(1));
        await step(900);
        click();
        await step(250);
        setScene("chat");
        await step(900);
        setCursor(POINT.firstChat);
        await step(900);
        click();
        await step(200);
        setSelected(true);
        await step(500);
        setMsgs(1);
        await step(800);
        setTyping(true);
        await step(1400);
        setTyping(false);
        setMsgs(2);
        await step(1500);
        setMsgs(3);
        await step(700);
        setTyping(true);
        await step(1400);
        setTyping(false);
        setMsgs(4);
        await step(2400);

        // 3. Agendamentos
        setCursor(navPoint(4));
        await step(900);
        click();
        await step(250);
        setScene("agenda");
        await step(800);
        setNewRow(true);
        await step(800);
        setCursor({ x: 560, y: 150 });
        await step(3200);

        // volta ao início
        setCursor(navPoint(0));
        await step(900);
        click();
        await step(250);
      }
    };
    run().catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      role="img"
      aria-label="Demonstração animada do Clinic.Chat: painel de atendimentos, conversa em que a IA agenda uma consulta e a lista de agendamentos. Dados fictícios."
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: `${W} / ${H}` }}
    >
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 origin-top-left select-none"
        style={{
          width: W,
          height: H,
          transform: `scale(${scale})`,
          visibility: scale ? "visible" : "hidden",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
          color: C.text,
          background: C.bg,
        }}
      >
        <Sidebar scene={scene} />

        <div className="absolute inset-y-0 right-0" style={{ left: SIDEBAR_W }}>
          <TopBar />
          <div className="absolute inset-x-0 bottom-0" style={{ top: TOP_H }}>
            {scene === "overview" && <Overview key={loop} />}
            {scene === "chat" && <Chat selected={selected} msgs={msgs} typing={typing} />}
            {scene === "agenda" && <Agenda newRow={newRow} />}
          </div>
        </div>

        {showCursor && (
          <>
            <span
              key={clickKey}
              className={clickKey ? "pd-click absolute rounded-full" : "hidden"}
              style={{
                left: cursor.x - 14,
                top: cursor.y - 14,
                width: 28,
                height: 28,
                background: C.yellow,
              }}
            />
            <svg
              width="20"
              height="24"
              viewBox="0 0 20 24"
              className="absolute top-0 left-0 drop-shadow-[0_2px_3px_rgba(0,0,0,0.35)]"
              style={{
                transform: `translate(${cursor.x - 3}px, ${cursor.y - 2}px)`,
                transition: "transform 0.85s cubic-bezier(0.45, 0, 0.2, 1)",
              }}
            >
              <path d="M3 2v17l4.5-4.2 3 6.6 3-1.4-3-6.4H17z" fill="#fff" stroke="#111" strokeWidth="1.4" strokeLinejoin="round" />
            </svg>
          </>
        )}
      </div>
    </div>
  );
}

function Icon({ d, size = 14, color = "currentColor" }: { d: string; size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

function Sidebar({ scene }: { scene: Scene }) {
  return (
    <div className="absolute inset-y-0 left-0 flex flex-col" style={{ width: SIDEBAR_W, background: C.sidebar }}>
      <div className="flex items-center px-4 text-[20px] font-bold tracking-tight text-white" style={{ height: 64 }}>
        Clinic<span style={{ color: C.yellow }}>.Chat</span>
      </div>
      <div className="flex flex-col gap-1 px-2" style={{ marginTop: NAV_Y0 - 64 }}>
        {NAV.map((n) => {
          const active = n.scene === scene;
          return (
            <div
              key={n.label}
              className="flex items-center gap-2.5 rounded-md px-2.5 text-[12.5px] transition-colors duration-300"
              style={{
                height: NAV_STEP - 4,
                background: active ? "#2A2A2A" : "transparent",
                color: active ? "#fff" : "#BDBDBD",
              }}
            >
              <Icon d={n.icon} />
              {n.label}
            </div>
          );
        })}
      </div>
      <div className="mt-auto border-t border-[#262626] px-4 py-3 text-[10px] leading-tight text-[#8A8A8A]">
        <span className="font-semibold text-white">
          Clinic<span style={{ color: C.yellow }}>.Chat</span>
        </span>
        <br />
        por Believi IA
      </div>
    </div>
  );
}

function TopBar() {
  return (
    <div
      className="flex items-center justify-between border-b px-5 text-[11px]"
      style={{ height: TOP_H, borderColor: C.border, color: C.muted }}
    >
      <Icon d="M4 5h16v14H4zM9 5v14" />
      <span className="flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[#22A55B]" />
        Sistema ativo
      </span>
    </div>
  );
}

function useCountUp(target: number, duration = 1300) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setValue(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

function Card({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`rounded-lg border ${className}`} style={{ background: C.card, borderColor: C.border, ...style }}>
      {children}
    </div>
  );
}

const STATS = [
  { label: "Total de atendimentos", value: 128, color: C.yellow, icon: "M4 5h16v11H8l-4 4z" },
  { label: "Em atendimento", value: 6, color: "#22A55B", icon: "M3 12h4l3-7 4 14 3-7h4" },
  { label: "Aguardando resposta", value: 3, color: "#E0A100", icon: "M12 7v5l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" },
  { label: "Agendamentos", value: 42, color: "#4F6BED", icon: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4" },
];

function Stat({ s, i }: { s: (typeof STATS)[number]; i: number }) {
  const v = useCountUp(s.value);
  return (
    <Card className="pd-in flex flex-col gap-1 px-3.5 py-3" style={{ animationDelay: `${i * 80}ms` }}>
      <Icon d={s.icon} color={s.color} size={15} />
      <span className="mt-1 text-[22px] font-bold leading-none">{v}</span>
      <span className="text-[10.5px]" style={{ color: C.muted }}>
        {s.label}
      </span>
    </Card>
  );
}

const DAYS = [
  { d: "Seg", v: 18 },
  { d: "Ter", v: 24 },
  { d: "Qua", v: 21 },
  { d: "Qui", v: 30 },
  { d: "Sex", v: 27 },
  { d: "Sáb", v: 12 },
  { d: "Dom", v: 8 },
];

function Overview() {
  const pct = useCountUp(87, 1600);
  return (
    <div className="flex h-full flex-col gap-3 p-4">
      <div className="grid grid-cols-4 gap-3">
        {STATS.map((s, i) => (
          <Stat key={s.label} s={s} i={i} />
        ))}
      </div>

      <div className="grid flex-1 grid-cols-[1.55fr_1fr] gap-3">
        <Card className="pd-in flex flex-col p-4" style={{ animationDelay: "200ms" }}>
          <span className="text-[13px] font-semibold">Atendimentos por dia</span>
          <div className="relative mt-4 flex flex-1 items-end gap-4 border-b border-l px-3" style={{ borderColor: "#BDBDBD" }}>
            {[0.25, 0.5, 0.75].map((p) => (
              <span
                key={p}
                className="absolute inset-x-0 border-t border-dashed"
                style={{ bottom: `${p * 100}%`, borderColor: "#D2D2D2" }}
              />
            ))}
            {DAYS.map((day, i) => (
              <div key={day.d} className="relative flex h-full flex-1 flex-col justify-end">
                <div
                  className="pd-grow rounded-t-[3px]"
                  style={{ height: `${(day.v / 32) * 100}%`, background: C.yellow, animationDelay: `${300 + i * 70}ms` }}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-4 px-3 pt-1.5">
            {DAYS.map((day) => (
              <span key={day.d} className="flex-1 text-center text-[10px]" style={{ color: C.muted }}>
                {day.d}
              </span>
            ))}
          </div>
        </Card>

        <Card className="pd-in flex flex-col gap-3 p-4" style={{ animationDelay: "300ms" }}>
          <span className="text-[13px] font-semibold">Resolvidos pela IA</span>
          <span className="text-[38px] font-bold leading-none">{pct}%</span>
          <div className="h-2 overflow-hidden rounded-full bg-[#D9D9D9]">
            <div className="pd-fill h-full rounded-full" style={{ width: "87%", background: C.yellow, animationDelay: "300ms" }} />
          </div>
          <div className="mt-auto flex flex-col gap-2 text-[11px]">
            {[
              ["Consultas agendadas", "42"],
              ["Transferidos para a equipe", "9"],
              ["Tempo médio de resposta", "8s"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between border-t pt-2" style={{ borderColor: C.border }}>
                <span style={{ color: C.muted }}>{k}</span>
                <span className="font-semibold">{v}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

const CONVERSAS = [
  { name: "Ana Ribeiro", last: "Olá! Gostaria de agendar uma consulta", time: "09:12", badge: "IA atendendo" },
  { name: "Carlos Mendes", last: "Vocês atendem por convênio?", time: "09:05", badge: "IA atendendo" },
  { name: "Juliana Costa", last: "Obrigada, até amanhã!", time: "08:47", badge: "Humano atendendo" },
  { name: "Pedro Alves", last: "Qual o endereço da clínica?", time: "08:30", badge: "Aguardando" },
];

function Badge({ label }: { label: string }) {
  const style =
    label === "IA atendendo"
      ? { background: C.yellowBg, color: "#5C4B00", borderColor: "#E2CF6A" }
      : label === "Aguardando"
        ? { background: "#F6E2C4", color: "#7A4A00", borderColor: "#E9C68E" }
        : { background: "#DCE4FB", color: "#2B3F8F", borderColor: "#B9C7F2" };
  return (
    <span className="rounded border px-1.5 py-px text-[9px] font-medium" style={style}>
      {label}
    </span>
  );
}

function Chat({ selected, msgs, typing }: { selected: boolean; msgs: number; typing: boolean }) {
  return (
    <div className="flex h-full">
      <div className="flex w-[240px] flex-none flex-col border-r" style={{ borderColor: C.border }}>
        <div className="flex flex-col gap-2 p-3" style={{ height: 88 }}>
          <div
            className="flex h-[34px] items-center gap-2 rounded-md border px-2.5 text-[11px]"
            style={{ borderColor: C.border, background: C.card, color: C.muted }}
          >
            <Icon d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4" size={12} />
            Buscar paciente...
          </div>
          <div className="flex gap-1.5 text-[9.5px]">
            {["Todos", "IA atendendo", "Aguardando"].map((f, i) => (
              <span
                key={f}
                className="rounded-md border px-2 py-1"
                style={i === 0 ? { background: C.yellow, borderColor: C.yellow } : { borderColor: C.border }}
              >
                {f}
              </span>
            ))}
          </div>
        </div>
        <div className="border-t" style={{ borderColor: C.border }}>
          {CONVERSAS.map((c, i) => (
            <div
              key={c.name}
              className="flex gap-2.5 border-b px-3 transition-colors duration-300"
              style={{
                height: 62,
                paddingTop: 10,
                borderColor: C.border,
                background: selected && i === 0 ? "#DADADA" : "transparent",
              }}
            >
              <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-[#D0D0D0] text-[11px] font-semibold">
                {c.name[0]}
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <div className="flex justify-between text-[11.5px] font-semibold">
                  {c.name}
                  <span className="text-[9px] font-normal" style={{ color: C.muted }}>
                    {c.time}
                  </span>
                </div>
                <span className="truncate text-[10px]" style={{ color: C.muted }}>
                  {c.last}
                </span>
                <span>
                  <Badge label={c.badge} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {!selected ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-1.5" style={{ color: C.muted }}>
          <Icon d="M4 5h16v11H8l-4 4z" size={34} color="#A8A8A8" />
          <span className="text-[13px] font-semibold text-[#4A4A4A]">Selecione uma conversa</span>
          <span className="text-[10.5px]">Escolha um paciente na lista para visualizar o atendimento.</span>
        </div>
      ) : (
        <div className="pd-in flex flex-1 flex-col">
          <div className="flex items-center gap-2.5 border-b px-4" style={{ height: 52, borderColor: C.border }}>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D0D0D0] text-[12px] font-semibold">A</span>
            <div className="flex flex-col">
              <span className="text-[12.5px] font-semibold">Ana Ribeiro</span>
              <span className="text-[9.5px]" style={{ color: C.muted }}>
                WhatsApp · online
              </span>
            </div>
            <span className="ml-auto">
              <Badge label="IA atendendo" />
            </span>
          </div>

          <div className="flex flex-1 flex-col justify-end gap-2.5 overflow-hidden px-4 py-3">
            {MESSAGES.slice(0, msgs).map((m, i) => (
              <div key={i} className={`pd-in flex flex-col ${m.from === "ia" ? "items-end" : "items-start"}`}>
                <div
                  className="max-w-[78%] rounded-xl px-3 py-2 text-[11.5px] leading-snug"
                  style={
                    m.from === "ia"
                      ? { background: C.yellowBg, borderBottomRightRadius: 3 }
                      : { background: "#FFFFFF", borderBottomLeftRadius: 3 }
                  }
                >
                  {m.text}
                </div>
                {"booked" in m && (
                  <span className="pd-in mt-1.5 flex items-center gap-1 rounded-full bg-[#D7F0DF] px-2 py-0.5 text-[9.5px] font-medium text-[#1B6B3A]" style={{ animationDelay: "400ms" }}>
                    ✓ Agendamento criado
                  </span>
                )}
                <span className="mt-0.5 text-[8.5px]" style={{ color: C.muted }}>
                  {m.from === "ia" ? "IA · agora" : "Ana · agora"}
                </span>
              </div>
            ))}
            {typing && (
              <div className="pd-in flex items-center gap-1 self-end rounded-xl px-3 py-2.5" style={{ background: C.yellowBg }}>
                {[0, 1, 2].map((d) => (
                  <span key={d} className="pd-dot h-1.5 w-1.5 rounded-full bg-[#7A6500]" style={{ animationDelay: `${d * 0.15}s` }} />
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 border-t px-4" style={{ height: 46, borderColor: C.border }}>
            <div className="flex-1 rounded-md border px-3 py-1.5 text-[10.5px]" style={{ borderColor: C.border, background: C.card, color: C.muted }}>
              A IA está respondendo esta conversa…
            </div>
            <span className="rounded-md border px-2.5 py-1.5 text-[10px] font-medium" style={{ borderColor: C.border }}>
              Assumir
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

const ROWS = [
  { contato: "06/11/2026", data: "10/11/2026 às 09:00", tipo: "Consulta", nome: "Carlos Mendes", ok: true },
  { contato: "05/11/2026", data: "10/11/2026 às 14:30", tipo: "Retorno", nome: "Juliana Costa", ok: true },
  { contato: "05/11/2026", data: "11/11/2026 às 11:00", tipo: "Exame", nome: "Pedro Alves", ok: false },
  { contato: "04/11/2026", data: "12/11/2026 às 16:00", tipo: "Consulta", nome: "Marina Souza", ok: true },
];
const NEW_ROW = { contato: "09/11/2026", data: "12/11/2026 às 15:00", tipo: "Consulta", nome: "Ana Ribeiro", ok: true };

function Row({ r, fresh }: { r: (typeof ROWS)[number]; fresh?: boolean }) {
  return (
    <div
      className={`grid grid-cols-[1fr_1.3fr_0.8fr_1.2fr_0.9fr] items-center border-t px-4 text-[11px] ${fresh ? "pd-in pd-flash" : ""}`}
      style={{ height: 50, borderColor: C.border }}
    >
      <span style={{ color: C.muted }}>{r.contato}</span>
      <span className="font-semibold">{r.data}</span>
      <span>
        <span className="rounded-full border px-2 py-0.5 text-[9.5px] font-medium" style={{ borderColor: C.border }}>
          {r.tipo}
        </span>
      </span>
      <span className="font-medium">{r.nome}</span>
      <span>
        <span
          className="rounded-full border px-2 py-0.5 text-[9.5px] font-semibold"
          style={
            r.ok
              ? { background: "#D7F0DF", color: "#1B6B3A", borderColor: "#A9DDBA" }
              : { background: "#F8D9DC", color: "#A3202F", borderColor: "#EDB0B7" }
          }
        >
          {r.ok ? "✓ Confirmado" : "✕ Cancelado"}
        </span>
      </span>
    </div>
  );
}

function Agenda({ newRow }: { newRow: boolean }) {
  return (
    <div className="pd-in flex h-full flex-col gap-3 p-4">
      <div className="flex items-center justify-between">
        <span className="text-[17px] font-bold">Agendamentos</span>
        <div className="flex items-center gap-2 text-[10px]">
          <span className="rounded-full border px-2 py-0.5 font-medium" style={{ borderColor: C.border }}>
            {ROWS.length + (newRow ? 1 : 0)} agendamentos
          </span>
          <span className="rounded-md border px-2.5 py-1.5 font-medium" style={{ borderColor: C.border, background: C.card }}>
            Exportar CSV
          </span>
        </div>
      </div>
      <Card className="overflow-hidden">
        <div
          className="grid grid-cols-[1fr_1.3fr_0.8fr_1.2fr_0.9fr] px-4 py-2.5 text-[10.5px] font-medium"
          style={{ color: C.muted }}
        >
          <span>Data do contato</span>
          <span>Agendamento</span>
          <span>Tipo</span>
          <span>Paciente</span>
          <span>Status</span>
        </div>
        {newRow && <Row r={NEW_ROW} fresh />}
        {ROWS.map((r) => (
          <Row key={r.nome} r={r} />
        ))}
      </Card>
    </div>
  );
}
