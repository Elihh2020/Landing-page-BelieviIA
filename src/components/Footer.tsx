import { LINKEDIN_URL, SITE_NAME, SOCIAL_HANDLE, SOCIAL_URL } from "@/config/site";
import { CONTAINER } from "@/lib/ui";

const LINK = "text-bv-muted underline-offset-4 hover:text-bv-accent hover:underline";
const ICON_LINK =
  "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-bv-border text-bv-muted transition-colors hover:border-bv-accent hover:text-bv-accent";

export default function Footer() {
  return (
    <footer className={CONTAINER}>
      <div className="mt-20 flex flex-col gap-4 border-t border-bv-border pt-14 pb-24 font-mono text-[13px] text-bv-subtle sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:pb-12">
        {/* CNPJ AQUI — adicionar quando disponível */}
        <span>
          © {new Date().getFullYear()} {SITE_NAME}
        </span>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <nav aria-label="Links institucionais" className="flex flex-wrap gap-x-2 gap-y-1">
            <a href="/politica-de-privacidade" className={LINK}>
              Política de Privacidade
            </a>
            <span aria-hidden="true">·</span>
            <a href="/termos" className={LINK}>
              Termos
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={SOCIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram ${SOCIAL_HANDLE}`}
              className={ICON_LINK}
            >
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
                <circle cx="12" cy="12" r="4.2" />
                <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
              </svg>
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn da Believi IA"
              className={ICON_LINK}
            >
              <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
