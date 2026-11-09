"use client";

import { useRef, useState, type FormEvent } from "react";
import {
  PROBLEM_OPTIONS,
  FORM_ENDPOINT,
  FORM_ENDPOINT_ENABLED,
} from "@/config/site";
import { isValidEmail, isValidPhoneBR, maskPhoneBR } from "@/lib/validators";
import { buildDiagnosticoMessage, buildWhatsAppLink } from "@/lib/whatsapp";
import {
  trackFormStart,
  trackGenerateLead,
  generateEventId,
} from "@/lib/tracking";
import {
  captureUtmParams,
  getCurrentPageUrl,
  getPageReferrer,
} from "@/lib/utm";
import Reveal from "@/components/Reveal";
import { CONTAINER, H2 } from "@/lib/ui";

interface FormState {
  nome: string;
  empresa: string;
  cargo: string;
  whatsapp: string;
  email: string;
  problema: string;
  comoFunciona: string;
  consentimento: boolean;
  website: string; // honeypot — deve permanecer vazio
}

const INITIAL_STATE: FormState = {
  nome: "",
  empresa: "",
  cargo: "",
  whatsapp: "",
  email: "",
  problema: "",
  comoFunciona: "",
  consentimento: false,
  website: "",
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

export default function FormularioDiagnostico() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const hasStartedRef = useRef(false);

  const handleFirstInteraction = () => {
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      trackFormStart("diagnostico");
    }
  };

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    handleFirstInteraction();
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (!form.nome.trim()) next.nome = "Informe seu nome.";
    if (!form.empresa.trim()) next.empresa = "Informe o nome da empresa.";
    if (!isValidPhoneBR(form.whatsapp)) next.whatsapp = "Informe um WhatsApp válido com DDD.";
    if (!isValidEmail(form.email)) next.email = "Informe um e-mail válido.";
    if (!form.problema) next.problema = "Selecione o problema que deseja resolver.";
    if (!form.comoFunciona.trim()) next.comoFunciona = "Descreva brevemente o processo atual.";
    if (!form.consentimento) next.consentimento = "É necessário aceitar a Política de Privacidade.";
    return next;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Honeypot: se preenchido, é um bot — ignora silenciosamente.
    if (form.website) {
      setStatus("success");
      return;
    }

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const utms = captureUtmParams();
    const eventId = generateEventId();

    const message = buildDiagnosticoMessage({
      nome: form.nome,
      empresa: form.empresa,
      cargo: form.cargo,
      whatsapp: form.whatsapp,
      email: form.email,
      problema: form.problema,
      comoFunciona: form.comoFunciona,
      utmSource: utms.utm_source,
      utmMedium: utms.utm_medium,
      utmCampaign: utms.utm_campaign,
      utmContent: utms.utm_content,
      utmTerm: utms.utm_term,
    });

    // 1) Rastreamento (evento de lead qualificado — só após envio válido).
    trackGenerateLead({
      eventId,
      formName: "diagnostico",
      problema: form.problema,
      utmSource: utms.utm_source,
      utmMedium: utms.utm_medium,
      utmCampaign: utms.utm_campaign,
      utmContent: utms.utm_content,
      utmTerm: utms.utm_term,
    });

    // 2) Abre o WhatsApp com a mensagem formatada — dentro do mesmo gesto do
    // usuário (clique no botão de envio), para evitar bloqueio de pop-up.
    const waLink = buildWhatsAppLink(message);
    window.open(waLink, "_blank", "noopener,noreferrer");

    // 3) Confirmação imediata na página, sem recarregar.
    setStatus("success");
    setForm(INITIAL_STATE);

    // 4) Envio paralelo opcional (desativado por padrão) para CRM/planilha/n8n.
    if (FORM_ENDPOINT_ENABLED) {
      fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          website: undefined,
          eventId,
          pageUrl: getCurrentPageUrl(),
          referrer: getPageReferrer(),
          utm: utms,
          submittedAt: new Date().toISOString(),
        }),
      }).catch(() => {
        // Falha no envio paralelo não deve impedir o fluxo principal (WhatsApp).
      });
    }
  };

  const successCard = (
    <div role="status" className="flex flex-col items-start gap-3.5 py-10">
      <span className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-full bg-bv-accent text-2xl font-bold text-bv-bg">
        ✓
      </span>
      <h3 className="m-0 text-[28px] font-semibold">Recebemos suas informações!</h3>
      <p className="m-0 text-base leading-[1.6] text-bv-muted">
        Nossa equipe entrará em contato para entender melhor sua necessidade e avaliar as
        possibilidades de solução.
      </p>
      <button
        type="button"
        onClick={() => setStatus("idle")}
        className="min-h-[44px] cursor-pointer rounded-lg border border-bv-border-accent bg-transparent px-[18px] text-bv-text transition-colors hover:border-bv-accent hover:text-bv-accent"
      >
        Enviar outro processo
      </button>
    </div>
  );

  return (
    <section
      id="diagnostico"
      className={`${CONTAINER} grid items-start gap-12 pt-24 sm:pt-[140px] lg:grid-cols-2`}
    >
      <Reveal>
        <div className="flex flex-col gap-[18px]">
          <h2 className={H2}>Conte para nós: qual processo sua empresa precisa melhorar?</h2>
          <p className="m-0 text-lg leading-[1.6] text-bv-muted">
            Explique rapidamente o que acontece hoje e onde estão as dificuldades. Nossa equipe
            avalia a necessidade e conversa com você sobre as possibilidades.
          </p>
          <ul className="m-0 mt-2 flex list-none flex-col gap-2.5 p-0 font-mono text-[13px] text-bv-muted">
            <li>
              <span className="text-bv-accent">✓</span> sem compromisso
            </li>
            <li>
              <span className="text-bv-accent">✓</span> avaliamos antes de propor qualquer solução
            </li>
            <li>
              <span className="text-bv-accent">✓</span> seus dados protegidos conforme a LGPD
            </li>
          </ul>
        </div>
      </Reveal>

      <Reveal delayMs={80}>
        <div className="rounded-[18px] border border-bv-border-accent bg-bv-card p-5 sm:p-8">
          {status === "success" ? (
            successCard
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
              {/* Honeypot anti-spam — invisível para humanos */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Não preencha este campo</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(e) => setForm((prev) => ({ ...prev, website: e.target.value }))}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Nome" htmlFor="nome" error={errors.nome} required>
                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    autoComplete="name"
                    required
                    aria-invalid={!!errors.nome}
                    value={form.nome}
                    onChange={(e) => updateField("nome", e.target.value)}
                    className={inputClass(!!errors.nome)}
                  />
                </Field>

                <Field label="Empresa" htmlFor="empresa" error={errors.empresa} required>
                  <input
                    id="empresa"
                    name="empresa"
                    type="text"
                    autoComplete="organization"
                    required
                    aria-invalid={!!errors.empresa}
                    value={form.empresa}
                    onChange={(e) => updateField("empresa", e.target.value)}
                    className={inputClass(!!errors.empresa)}
                  />
                </Field>

                <Field label="Cargo ou função" htmlFor="cargo">
                  <input
                    id="cargo"
                    name="cargo"
                    type="text"
                    autoComplete="organization-title"
                    value={form.cargo}
                    onChange={(e) => updateField("cargo", e.target.value)}
                    className={inputClass(false)}
                  />
                </Field>

                <Field label="WhatsApp" htmlFor="whatsapp" error={errors.whatsapp} required>
                  <input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="(00) 00000-0000"
                    required
                    aria-invalid={!!errors.whatsapp}
                    value={form.whatsapp}
                    onChange={(e) => updateField("whatsapp", maskPhoneBR(e.target.value))}
                    className={inputClass(!!errors.whatsapp)}
                  />
                </Field>
              </div>

              <Field label="E-mail" htmlFor="email" error={errors.email} required>
                <input
                  id="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  aria-invalid={!!errors.email}
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className={inputClass(!!errors.email)}
                />
              </Field>

              <Field
                label="Qual problema sua empresa deseja resolver?"
                htmlFor="problema"
                error={errors.problema}
                required
              >
                <select
                  id="problema"
                  name="problema"
                  required
                  aria-invalid={!!errors.problema}
                  value={form.problema}
                  onChange={(e) => updateField("problema", e.target.value)}
                  className={inputClass(!!errors.problema)}
                >
                  <option value="" disabled>
                    Selecione uma opção
                  </option>
                  {PROBLEM_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </Field>

              <Field
                label="Descreva brevemente como esse processo funciona atualmente"
                htmlFor="comoFunciona"
                error={errors.comoFunciona}
                required
              >
                <textarea
                  id="comoFunciona"
                  name="comoFunciona"
                  rows={4}
                  required
                  aria-invalid={!!errors.comoFunciona}
                  value={form.comoFunciona}
                  onChange={(e) => updateField("comoFunciona", e.target.value)}
                  className={`${inputClass(!!errors.comoFunciona)} resize-y py-3`}
                />
              </Field>

              <div>
                <label className="flex items-start gap-2.5 text-[13px] leading-[1.5] text-bv-muted">
                  <input
                    type="checkbox"
                    checked={form.consentimento}
                    onChange={(e) => updateField("consentimento", e.target.checked)}
                    className="mt-px h-5 w-5 flex-none accent-[#2DE2D0]"
                  />
                  <span>
                    Li e concordo com a{" "}
                    <a href="/politica-de-privacidade" className="text-bv-text underline hover:text-bv-accent">
                      Política de Privacidade
                    </a>{" "}
                    e autorizo o contato da Believi IA.
                  </span>
                </label>
                {errors.consentimento && (
                  <p className="mt-1.5 text-xs text-red-300">{errors.consentimento}</p>
                )}
              </div>

              <p className="m-0 text-xs leading-[1.5] opacity-75">
                Ao enviar, você será direcionado ao WhatsApp para confirmar o envio da mensagem.
              </p>

              <button
                type="submit"
                disabled={status === "loading"}
                className="min-h-[54px] cursor-pointer rounded-lg border-0 bg-bv-accent text-base font-semibold text-bv-bg transition-colors hover:bg-white disabled:opacity-60"
              >
                Enviar meu problema
              </button>
            </form>
          )}
        </div>
      </Reveal>
    </section>
  );
}

function inputClass(hasError: boolean) {
  return `w-full min-h-[48px] rounded-lg border bg-bv-bg px-3.5 text-bv-text placeholder:text-bv-dim ${
    hasError ? "border-red-400" : "border-bv-border-2"
  }`;
}

function Field({
  label,
  htmlFor,
  error,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm text-bv-muted">
        {label}{" "}
        {required && (
          <span aria-hidden="true" className="text-bv-accent">
            *
          </span>
        )}
      </label>
      {children}
      {error && <p className="m-0 text-xs text-red-300">{error}</p>}
    </div>
  );
}
