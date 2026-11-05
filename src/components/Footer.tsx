import { SOCIAL_HANDLE, SOCIAL_URL } from "@/config/site";

export default function Footer() {
  return (
    <footer className="border-t border-believi-white/10 bg-believi-dark-deeper py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-4 text-center sm:flex-row sm:justify-between sm:text-left sm:px-6">
        <div>
          {/* LOGO OFICIAL AQUI — versão clara/branca */}
          <span className="rounded-md border border-believi-cyan/60 px-2.5 py-1 font-heading text-base font-bold text-believi-white">
            Believi<span className="text-believi-cyan"> IA</span>
          </span>
          <a
            href={SOCIAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block font-body text-sm text-believi-gray hover:text-believi-cyan"
          >
            {SOCIAL_HANDLE}
          </a>
        </div>

        <nav aria-label="Links institucionais" className="flex gap-6">
          <a href="/politica-de-privacidade" className="font-body text-sm text-believi-gray hover:text-believi-cyan">
            Política de Privacidade
          </a>
          <a href="/termos" className="font-body text-sm text-believi-gray hover:text-believi-cyan">
            Termos
          </a>
        </nav>

        <p className="font-body text-xs text-believi-gray/70">
          © {new Date().getFullYear()} Believi IA. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
