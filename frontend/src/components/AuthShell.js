import Link from "next/link";
import Image from "next/image";
import Logo from "@/components/Logo";

export default function AuthShell({ eyebrow, title, subtitle, children, footer }) {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[1.05fr_1fr]">
      <div className="scanlines relative hidden flex-col items-center justify-center overflow-hidden border-r border-white/10 bg-[#0a0a0a] p-12 text-center lg:flex">
        <p className="absolute left-10 top-10 font-mono text-[11px] uppercase tracking-[0.25em] text-emerald-400/70">
          // controle de exposição
        </p>

        <Link href="/" className="block w-full max-w-[320px]">
          <Image
            src="/PrivacyLens-logo.png"
            alt="PrivacyLens"
            width={640}
            height={640}
            priority
            className="h-auto w-full"
          />
        </Link>
        <p className="mt-1 max-w-sm text-sm leading-relaxed text-zinc-400">
          Escaneie páginas, descubra quais dados elas pedem e receba um score de
          privacidade com alertas de risco.
        </p>

        <p className="absolute bottom-10 left-10 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-600">
          PrivacyLens · análise de privacidade web
        </p>
      </div>

      <div className="flex items-center justify-center px-6 py-12 sm:px-12">
        <div className="w-full max-w-sm">
          <div className="mb-10 lg:hidden">
            <Link href="/">
              <Logo />
            </Link>
          </div>
          <div className="mb-8">
            {eyebrow && (
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-emerald-400/80">
                {eyebrow}
              </p>
            )}
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              {title}
            </h1>
            <p className="mt-2 text-sm text-zinc-400">{subtitle}</p>
          </div>
          {children}
          {footer && <p className="mt-8 text-sm text-zinc-500">{footer}</p>}
        </div>
      </div>
    </div>
  );
}
