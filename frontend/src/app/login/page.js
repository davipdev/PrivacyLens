"use client";

import { useState } from "react";
import Link from "next/link";
import AuthShell from "@/components/AuthShell";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "@/components/Icons";
import { useRouter } from "next/navigation";

const fieldLabel =
  "mb-2 block font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-400";
const fieldInput =
  "w-full rounded-none border border-white/10 bg-black/20 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-emerald-400/60 focus:bg-black/30";
const fieldIcon =
  "pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500";

export default function LoginPage() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState("")
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    setErro("")
    setLoading(true)

    try {
      const resposta = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, senha})
      })
      const dados = await resposta.json()

      if (!resposta.ok) {
        setErro(dados.erro || dados.error || "nao foi possivel fazer login")
        return
      }

      localStorage.setItem("token", dados.token)
      router.push("/dashboard")
    } catch (err) {
      setErro("falha dentro do servidor")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell
      eyebrow="// acesso"
      title="Bem-vindo de volta"
      subtitle="Entre para acompanhar suas análises de privacidade."
      footer={
        <>
          Ainda não tem conta?{" "}
          <Link
            href="/register"
            className="font-medium text-emerald-400 hover:text-emerald-300"
          >
            Criar conta
          </Link>
        </>
      }
    >
      <form className="space-y-5" onSubmit={(handleSubmit)}>
        <label className="block">
          <span className={fieldLabel}>E-mail</span>
          <div className="relative">
            <Mail className={fieldIcon} />
            <input
              type="email"
              placeholder="voce@empresa.com"
              className={fieldInput}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </label>

        <label className="block">
          <span className={fieldLabel}>Senha</span>
          <div className="relative">
            <Lock className={fieldIcon} />
            <input
              type={mostrarSenha ? "text" : "password"}
              placeholder="••••••••"
              className={`${fieldInput} pr-11`}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setMostrarSenha((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-500 transition hover:text-zinc-300"
            >
              {mostrarSenha ? (
                <EyeOff className="h-[18px] w-[18px]" />
              ) : (
                <Eye className="h-[18px] w-[18px]" />
              )}
            </button>
          </div>
        </label>

      {erro && (
    <p className="border-l-2 border-red-400/60 bg-red-400/[0.05] px-4 py-3 text-sm text-red-300">
    {erro}
  </p>
)}
        <button
          type="submit"
          disabled={loading}
          className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-none bg-emerald-400 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-300"
        >
          {loading ? "entrando..." : "entrar"}
          <ArrowRight className="h-[18px] w-[18px] transition group-hover:translate-x-0.5" />   
        </button>
      </form>
    </AuthShell>
  );
}
