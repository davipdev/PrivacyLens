import Link from "next/link";
import Logo from "@/components/Logo";
import Meter from "@/components/Meter";
import {
  LayoutDashboard,
  ScanLine,
  History,
  BarChart,
  Search,
  Globe,
  ShieldCheck,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  LogOut,
  ArrowRight,
} from "@/components/Icons";

const scoreGeral = 74;

const navItems = [
  { label: "Visão geral", icon: LayoutDashboard, ativo: true },
  { label: "Nova análise", icon: ScanLine, ativo: false },
  { label: "Histórico", icon: History, ativo: false },
  { label: "Ranking", icon: BarChart, ativo: false },
];

const nivelStyles = {
  critico: { label: "Crítico", texto: "text-rose-400", barra: "bg-rose-500", swatch: "bg-rose-500" },
  alto: { label: "Alto", texto: "text-orange-400", barra: "bg-orange-500", swatch: "bg-orange-500" },
  medio: { label: "Médio", texto: "text-amber-400", barra: "bg-amber-400", swatch: "bg-amber-400" },
  baixo: { label: "Baixo", texto: "text-emerald-400", barra: "bg-emerald-400", swatch: "bg-emerald-400" },
};

const metricas = [
  { label: "Total de consultas", valor: "128", delta: "+12 / semana", sobe: true, icon: Globe, cor: "text-sky-400" },
  { label: "Alertas críticos", valor: "09", delta: "+2 / semana", sobe: false, icon: AlertTriangle, cor: "text-rose-400" },
  { label: "Sites suspeitos", valor: "26", delta: "score < 70", sobe: false, icon: ShieldCheck, cor: "text-amber-400" },
];

const distribuicao = [
  { nivel: "critico", total: 9 },
  { nivel: "alto", total: 17 },
  { nivel: "medio", total: 24 },
  { nivel: "baixo", total: 78 },
];

const ranking = [
  { urlsite: "checkout.lojamoda.com.br", score: 38, nivel: "critico" },
  { urlsite: "portal.creditofacil.com", score: 41, nivel: "critico" },
  { urlsite: "app.fintechpay.com", score: 62, nivel: "alto" },
  { urlsite: "promo.descontoja.net", score: 66, nivel: "alto" },
  { urlsite: "cadastro.vendasplus.com", score: 69, nivel: "alto" },
];

const consultas = [
  { id: 412, urlsite: "checkout.lojamoda.com.br", categoria: "E-commerce", score: 38, nivel: "critico", data: "29 jun · 14:22" },
  { id: 411, urlsite: "app.fintechpay.com", categoria: "Fintech", score: 62, nivel: "alto", data: "29 jun · 11:08" },
  { id: 410, urlsite: "blog.noticiashoje.com", categoria: "Conteúdo", score: 94, nivel: "baixo", data: "28 jun · 19:47" },
  { id: 409, urlsite: "loja.techstore.com.br", categoria: "E-commerce", score: 81, nivel: "medio", data: "28 jun · 16:30" },
  { id: 408, urlsite: "portal.creditofacil.com", categoria: "Fintech", score: 41, nivel: "critico", data: "28 jun · 09:12" },
  { id: 407, urlsite: "cadastro.vendasplus.com", categoria: "E-commerce", score: 69, nivel: "alto", data: "27 jun · 22:05" },
];

const maxDistribuicao = Math.max(...distribuicao.map((d) => d.total));
const eyebrow = "font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500";

function NivelBadge({ nivel }) {
  const s = nivelStyles[nivel];
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider">
      <span className={`h-1.5 w-1.5 ${s.swatch}`} />
      <span className={s.texto}>{s.label}</span>
    </span>
  );
}

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full">
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-white/10 bg-[#080b10] lg:flex">
        <div className="border-b border-white/10 px-5 py-[18px]">
          <Logo />
        </div>

        <nav className="flex-1 p-3">
          <p className={`${eyebrow} px-3 pb-2 pt-2`}>Painel</p>
          {navItems.map(({ label, icon: Icon, ativo }) => (
            <a
              key={label}
              href="#"
              className={`flex items-center gap-3 border-l-2 px-3 py-2.5 text-sm font-medium transition ${
                ativo
                  ? "border-emerald-400 bg-emerald-400/[0.07] text-emerald-300"
                  : "border-transparent text-zinc-400 hover:bg-white/[0.03] hover:text-white"
              }`}
            >
              <Icon className="h-[18px] w-[18px]" />
              {label}
            </a>
          ))}
        </nav>

        <div className="border-t border-white/10 p-3">
          <div className="flex items-center gap-3 px-2 py-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-[3px] bg-emerald-400 font-mono text-sm font-semibold text-emerald-950">
              DO
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">Davi Oliveira</p>
              <p className={`${eyebrow} truncate`}>Administrador</p>
            </div>
          </div>
          <Link
            href="/login"
            className="mt-1 flex items-center gap-3 px-3 py-2 text-sm text-zinc-400 transition hover:bg-white/[0.03] hover:text-white"
          >
            <LogOut className="h-[18px] w-[18px]" />
            Sair
          </Link>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-white/10 bg-[#06080c]/90 px-5 backdrop-blur lg:px-8">
          <div className="lg:hidden">
            <Logo showText={false} />
          </div>
          <div className="relative hidden flex-1 sm:block">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Analisar uma URL..."
              className="w-full max-w-md rounded-none border border-white/10 bg-black/20 py-2.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-emerald-400/60 focus:bg-black/30"
            />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-[3px] bg-emerald-400 font-mono text-sm font-semibold text-emerald-950">
              DO
            </span>
          </div>
        </header>

        <main className="flex-1 space-y-6 p-5 lg:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className={eyebrow}>Painel / Visão geral</p>
              <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                Visão geral
              </h1>
              <p className="mt-1 text-sm text-zinc-400">
                Empresa PrivacyLens Labs
              </p>
            </div>
            <button className="group inline-flex h-11 items-center justify-center gap-2 self-start bg-emerald-400 px-5 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-300 sm:self-auto">
              <ScanLine className="h-[18px] w-[18px]" />
              Analisar nova URL
            </button>
          </div>

          <div className="grid grid-cols-1 border border-white/10 md:grid-cols-2 xl:grid-cols-4">
            <div className="border-white/10 p-6 max-md:border-b md:border-r">
              <div className="flex items-center justify-between">
                <span className={eyebrow}>Score geral</span>
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
              </div>
              <p className="mt-4 font-mono text-4xl font-semibold tracking-tight text-white">
                {scoreGeral}
                <span className="text-lg text-zinc-600"> /100</span>
              </p>
              <div className="mt-4">
                <Meter value={scoreGeral} segments={16} height="h-2.5" />
              </div>
            </div>

            {metricas.map(({ label, valor, delta, sobe, icon: Icon, cor }, i) => (
              <div
                key={label}
                className={`border-white/10 p-6 ${
                  i < metricas.length - 1 ? "max-md:border-b" : ""
                } ${i % 2 === 0 ? "md:border-r" : ""} xl:border-r xl:last:border-r-0`}
              >
                <div className="flex items-center justify-between">
                  <span className={eyebrow}>{label}</span>
                  <Icon className={`h-4 w-4 ${cor}`} />
                </div>
                <p className="mt-4 font-mono text-4xl font-semibold tracking-tight text-white">
                  {valor}
                </p>
                <p
                  className={`mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider ${
                    sobe ? "text-emerald-400" : "text-zinc-500"
                  }`}
                >
                  {sobe ? (
                    <TrendingUp className="h-3.5 w-3.5" />
                  ) : (
                    <TrendingDown className="h-3.5 w-3.5" />
                  )}
                  {delta}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 border border-white/10 xl:grid-cols-3">
            <div className="border-white/10 p-6 max-xl:border-b xl:col-span-2 xl:border-r">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-white">
                  Distribuição de risco
                </h2>
                <span className={eyebrow}>128 análises</span>
              </div>
              <div className="mt-6 space-y-5">
                {distribuicao.map(({ nivel, total }) => {
                  const s = nivelStyles[nivel];
                  return (
                    <div key={nivel}>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="inline-flex items-center gap-2 text-sm">
                          <span className={`h-2 w-2 ${s.swatch}`} />
                          <span className={s.texto}>{s.label}</span>
                        </span>
                        <span className="font-mono text-sm text-zinc-400">
                          {String(total).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="h-2 w-full bg-white/[0.06]">
                        <div
                          className={`h-full ${s.barra}`}
                          style={{ width: `${(total / maxDistribuicao) * 100}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-white">
                  Sites suspeitos
                </h2>
                <AlertTriangle className="h-4 w-4 text-amber-400" />
              </div>
              <ul className="mt-5 divide-y divide-white/[0.06]">
                {ranking.map((site, i) => {
                  const s = nivelStyles[site.nivel];
                  return (
                    <li
                      key={site.urlsite}
                      className="flex items-center gap-3 py-2.5"
                    >
                      <span className="font-mono text-[11px] text-zinc-600">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-sm text-zinc-300">
                        {site.urlsite}
                      </span>
                      <span className={`font-mono text-sm ${s.texto}`}>
                        {site.score}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="border border-white/10">
            <div className="flex items-center justify-between border-b border-white/10 p-6">
              <h2 className="text-sm font-semibold text-white">
                Histórico de análises
              </h2>
              <a
                href="#"
                className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-emerald-400 transition hover:text-emerald-300"
              >
                Ver tudo
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className={`px-6 py-3 font-medium ${eyebrow}`}>Site</th>
                    <th className={`px-6 py-3 font-medium ${eyebrow}`}>Categoria</th>
                    <th className={`px-6 py-3 font-medium ${eyebrow}`}>Score</th>
                    <th className={`px-6 py-3 font-medium ${eyebrow}`}>Nível</th>
                    <th className={`px-6 py-3 font-medium ${eyebrow}`}>Data</th>
                  </tr>
                </thead>
                <tbody>
                  {consultas.map((c) => {
                    const s = nivelStyles[c.nivel];
                    return (
                      <tr
                        key={c.id}
                        className="border-b border-white/[0.06] transition last:border-0 hover:bg-white/[0.02]"
                      >
                        <td className="px-6 py-4">
                          <span className="flex items-center gap-2.5">
                            <Globe className="h-4 w-4 shrink-0 text-zinc-600" />
                            <span className="text-zinc-200">{c.urlsite}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 text-zinc-400">{c.categoria}</td>
                        <td className="px-6 py-4">
                          <span className={`font-mono ${s.texto}`}>{c.score}</span>
                          <span className="font-mono text-zinc-600"> /100</span>
                        </td>
                        <td className="px-6 py-4">
                          <NivelBadge nivel={c.nivel} />
                        </td>
                        <td className="px-6 py-4 font-mono text-zinc-500">
                          {c.data}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
