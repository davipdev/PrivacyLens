import Link from "next/link";
import Logo from "@/components/Logo";
import Meter from "@/components/Meter";
import Corners from "@/components/Corners";
import {
  ScanLine,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Check,
  Globe,
} from "@/components/Icons";

const recursos = [
  {
    icon: ScanLine,
    titulo: "Escaneamento automático",
    texto:
      "Aponte uma URL e o PrivacyLens lê os formulários da página para descobrir cada dado solicitado.",
  },
  {
    icon: ShieldCheck,
    titulo: "Score de privacidade",
    texto:
      "Dados necessários, talvez ou abusivos viram uma nota objetiva de 0 a 100 por site.",
  },
  {
    icon: AlertTriangle,
    titulo: "Níveis de risco",
    texto:
      "Cada análise é marcada como baixo, médio, alto ou crítico para priorizar o que importa.",
  },
];

const camadas = [
  { label: "Necessário", qtd: 6, cor: "bg-emerald-400", texto: "text-emerald-400" },
  { label: "Talvez", qtd: 3, cor: "bg-amber-400", texto: "text-amber-400" },
  { label: "Abusivo", qtd: 4, cor: "bg-rose-500", texto: "text-rose-400" },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-white/10">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
          <Logo />
          <nav className="flex items-center gap-1">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-zinc-300 transition hover:text-white"
            >
              Entrar
            </Link>
            <Link
              href="/register"
              className="border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/5"
            >
              Criar conta
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-6">
        <section className="grid items-center gap-14 py-16 lg:grid-cols-[1.1fr_1fr] lg:py-24">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-emerald-400/80">
              // análise de privacidade web
            </p>
            <h1 className="mt-6 text-[42px] font-semibold leading-[1.05] tracking-tight text-white sm:text-[52px]">
              Descubra quais dados os sites realmente pedem.
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-zinc-400">
              O PrivacyLens escaneia páginas, classifica cada informação
              solicitada e entrega um score de privacidade com alertas de risco
              — sem achismo.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register"
                className="group inline-flex h-11 items-center justify-center gap-2 bg-emerald-400 px-6 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-300"
              >
                Começar agora
                <ArrowRight className="h-[18px] w-[18px] transition group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex h-11 items-center justify-center border border-white/15 px-6 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/5"
              >
                Ver o dashboard
              </Link>
            </div>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.12em] text-zinc-500">
              <span className="inline-flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" />
                Sem cartão de crédito
              </span>
              <span className="inline-flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" />
                Multiempresa por código
              </span>
            </div>
          </div>

          <div className="relative border border-white/12 bg-[#0a0e14] p-6">
            <Corners />
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400">
                <Globe className="h-4 w-4 text-zinc-500" />
                checkout.lojamoda.com.br
              </span>
              <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-rose-400">
                <span className="h-1.5 w-1.5 bg-rose-500" />
                Crítico
              </span>
            </div>

            <div className="mt-6 flex items-baseline justify-between">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                Score
              </span>
              <span className="font-mono text-sm text-zinc-500">38 / 100</span>
            </div>
            <div className="mt-3">
              <Meter value={38} fill="bg-rose-500" height="h-8" />
            </div>

            <div className="mt-8 space-y-3 border-t border-white/10 pt-5">
              {camadas.map((c) => (
                <div
                  key={c.label}
                  className="flex items-center justify-between"
                >
                  <span className="inline-flex items-center gap-2.5 text-sm text-zinc-300">
                    <span className={`h-2.5 w-2.5 ${c.cor}`} />
                    {c.label}
                  </span>
                  <span className={`font-mono text-sm ${c.texto}`}>
                    {String(c.qtd).padStart(2, "0")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <section className="border-y border-white/10">
        <div className="mx-auto grid w-full max-w-6xl sm:grid-cols-3">
          {recursos.map(({ icon: Icon, titulo, texto }, i) => (
            <div
              key={titulo}
              className="border-white/10 px-6 py-10 sm:[&:not(:first-child)]:border-l"
            >
              <div className="flex items-center justify-between">
                <Icon className="h-6 w-6 text-emerald-400" />
                <span className="font-mono text-[11px] text-zinc-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-6 text-base font-semibold text-white">
                {titulo}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {texto}
              </p>
            </div>
          ))}
        </div>
      </section>

      <footer>
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 sm:flex-row">
          <Logo />
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-600">
            PrivacyLens · projeto pessoal
          </span>
        </div>
      </footer>
    </div>
  );
}
