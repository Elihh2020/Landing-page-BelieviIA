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

  if (status === "success") {
    return (
      <section id="diagnostico" className="bg-believi-dark py-20 sm:py-28">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <Reveal>
            <div className="rounded-2xl border border-believi-cyan/30 bg-believi-dark-deeper p-10">
              <h2 className="font-heading text-2xl font-bold text-believi-white sm:text-3xl">
                Recebemos suas informações!
              </h2>
              <p className="mt-4 font-body text-base leading-relaxed text-believi-gray">
                Nossa equipe entrará em contato para entender melhor sua
                necessidade e avaliar as possibilidades de solução.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-6 font-heading text-sm font-semibold text-believi-cyan underline"
              >
                Enviar outro diagnóstico
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section id="diagnostico" className="bg-believi-dark py-20 sm:py-28">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <Reveal>
          <h2 className="font-heading text-2xl font-bold leading-tight text-believi-white sm:text-3xl">
            Conte para nós: qual processo sua empresa precisa{" "}
            <span className="text-believi-cyan">melhorar</span>?
          </h2>
          <p className="mt-4 font-body text-base leading-relaxed text-believi-gray">
            Explique brevemente o que acontece hoje na sua operação e onde
            estão as principais dificuldades. Nossa equipe poderá avaliar sua
            necessidade e conversar sobre as possibilidades de solução.
          </p>
        </Reveal>

        <Reveal delayMs={80}>
          <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
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

            <Field label="Nome" htmlFor="nome" error={errors.nome} required>
              <input
                id="nome"
                name="nome"
                type="text"
                autoComplete="name"
                required
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
                value={form.whatsapp}
                onChange={(e) => updateField("whatsapp", maskPhoneBR(e.target.value))}
                className={inputClass(!!errors.whatsapp)}
              />
            </Field>

            <Field label="E-mail" htmlFor="email" error={errors.email} required>
              <input
                id="email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
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
                value={form.comoFunciona}
                onChange={(e) => updateField("comoFunciona", e.target.value)}
                className={inputClass(!!errors.comoFunciona)}
              />
            </Field>

            <div>
              <label className="flex items-start gap-3 font-body text-sm text-believi-gray">
                <input
                  type="checkbox"
                  checked={form.consentimento}
                  onChange={(e) => updateField("consentimento", e.target.checked)}
                  className="mt-0.5 h-5 w-5 flex-none rounded border-believi-gray/40 bg-believi-dark-deeper text-believi-cyan focus-visible:outline-2 focus-visible:outline-believi-cyan"
                />
                <span>
                  Li e concordo com a{" "}
                  <a href="/politica-de-privacidade" className="text-believi-cyan underline">
                    Política de Privacidade
                  </a>{" "}
                  e autorizo o contato da Believi IA.
                </span>
              </label>
              {errors.consentimento && (
                <p className="mt-1.5 font-body text-xs text-red-300">{errors.consentimento}</p>
              )}
            </div>

            <p className="font-body text-xs text-believi-gray/80">
              Ao enviar, você será direcionado ao WhatsApp para confirmar o
              envio da mensagem.
            </p>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-full bg-believi-cyan px-6 py-4 font-heading text-base font-semibold text-believi-dark transition-transform hover:scale-[1.01] disabled:opacity-60"
            >
              ENVIAR MEU PROBLEMA
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function inputClass(hasError: boolean) {
  return `w-full rounded-lg border bg-believi-dark-deeper px-4 py-3.5 font-body text-base text-believi-white placeholder:text-believi-gray/50 focus:outline-none ${
    hasError ? "border-red-400" : "border-believi-gray/30 focus:border-believi-cyan"
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
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block font-body text-sm font-semibold text-believi-white">
        {label} {required && <span className="text-believi-cyan">*</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 font-body text-xs text-red-300">{error}</p>}
    </div>
  );
}
