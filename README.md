# Believi IA — Landing Page

Landing page institucional/comercial da Believi IA, construída em
[Next.js](https://nextjs.org) (App Router) + TypeScript + Tailwind CSS,
com foco em conversão para tráfego pago (Meta Ads e Google Ads), SEO e
performance.

## Stack

- Next.js 16 (App Router), TypeScript, Tailwind CSS v4
- Server Components por padrão; `"use client"` apenas nos pontos
  interativos (formulário, accordion do FAQ, menu mobile, botão
  flutuante, animações de rolagem e scripts de rastreamento)
- Fontes: Poppins (títulos/botões) e Open Sans (texto), via `next/font/google`
- Ilustrações em HTML/CSS/SVG inline (sem imagens pesadas)
- Lucide React para ícones de linha

## Instalação e execução

```bash
npm install
cp .env.example .env.local   # preencha os IDs de rastreamento reais
npm run dev                  # http://localhost:3000
```

Build de produção:

```bash
npm run build
npm run start
```

Lint:

```bash
npm run lint
```

## Estrutura do projeto

```
src/
  app/                      # rotas (App Router)
    layout.tsx               # metadata global, fontes, JSON-LD Organization
    page.tsx                 # monta as seções da home + JSON-LD FAQPage
    sitemap.ts, robots.ts     # SEO técnico
    icon.tsx, opengraph-image.tsx  # favicon e imagem OG gerados em build-time
    politica-de-privacidade/ # página legal
    termos/                   # página legal
    api/lead/route.ts         # endpoint opcional de encaminhamento de leads
  components/                # um componente por seção (Hero, Problemas, ...)
    illustrations/            # mockups SVG/HTML/CSS (hero + seção Aplicações)
  lib/                        # utm.ts, whatsapp.ts, tracking.ts, validators.ts, fonts.ts
  config/
    site.ts                   # configuração central (WhatsApp, mensagens, IDs)
```

## Configuração central

Todos os pontos de configuração ficam em **`src/config/site.ts`**:

- `WHATSAPP_NUMBER` — número oficial da Believi IA (já definido como
  `5511959132422`). Todos os CTAs do site usam esta constante.
- `WHATSAPP_MESSAGES` — mensagem pré-preenchida por seção/origem do clique.
- `TRACKING` — IDs de GTM, GA4, Meta Pixel e Google Ads (lidos de `.env.local`).
- `FORM_ENDPOINT_ENABLED` / `FORM_ENDPOINT` — envio paralelo opcional do
  formulário (desativado por padrão).

Variáveis de ambiente: ver `.env.example`.

## Formulário de diagnóstico → WhatsApp

O formulário (`src/components/FormularioDiagnostico.tsx`) é o canal
principal de captação. Ao enviar com dados válidos, a página:

1. Dispara o evento `generate_lead` no `dataLayer`.
2. Abre o WhatsApp (`https://wa.me/5511959132422`) com a mensagem
   formatada (todos os campos + UTMs de origem).
3. Exibe a confirmação na própria página, sem recarregar.
4. Opcionalmente (`NEXT_PUBLIC_ENABLE_FORM_ENDPOINT=true`), envia os
   mesmos dados via `POST` para `app/api/lead/route.ts`, que pode
   encaminhar a um webhook (CRM, planilha, n8n) via
   `LEAD_FORWARD_WEBHOOK_URL`.

Anti-spam: campo honeypot invisível (`website`). Para reCAPTCHA/Turnstile,
adicione a verificação no `handleSubmit` do formulário antes do envio.

## Rastreamento

Eventos padronizados via `dataLayer` (`src/lib/tracking.ts`):
`page_view`, `view_content`, `whatsapp_click`, `form_start`, `generate_lead`.

Os scripts de GTM/GA4/Meta Pixel (`src/components/AnalyticsScripts.tsx`)
só carregam depois que o visitante aceita cookies no banner de
consentimento (`src/components/ConsentManager.tsx`), conforme LGPD.

UTMs (`utm_source/medium/campaign/content/term`), `fbclid` e `gclid` são
capturados na primeira visita e persistidos em `sessionStorage`
(`src/lib/utm.ts`), sendo anexados ao WhatsApp e ao formulário.

## Deploy

Pronto para deploy na [Vercel](https://vercel.com) (ou qualquer
plataforma compatível com Next.js). Configure as variáveis de ambiente
de `.env.example` no painel da plataforma antes de publicar.

## Checklist antes de publicar

- [ ] Substituir o texto "Believi IA" nos componentes `Header` e
      `Footer` pelo **logotipo oficial** (procure o comentário
      `LOGO OFICIAL AQUI`).
- [ ] Substituir `icon.tsx` e `opengraph-image.tsx` (gerados
      provisoriamente) por arquivos estáticos com a arte oficial da marca.
- [ ] Preencher os IDs reais em `.env.local`: `NEXT_PUBLIC_GTM_ID`,
      `NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_META_PIXEL_ID`,
      `NEXT_PUBLIC_GOOGLE_ADS_ID`, `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL`.
- [ ] Revisar o texto final da Política de Privacidade e dos Termos
      (`app/politica-de-privacidade`, `app/termos`) com jurídico/LGPD.
- [ ] Implementar a Meta Conversions API (CAPI) no servidor
      (`app/api/lead/route.ts`), usando o mesmo `event_id` do Pixel
      para deduplicação — ponto de extensão já sinalizado no código.
- [ ] Definir `NEXT_PUBLIC_SITE_URL` com o domínio definitivo (usado em
      metadata, Open Graph e sitemap).
