"use client";

import { useState } from "react";
import Link from "next/link";
import AuthShell from "@/components/AuthShell";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Lock,
  Building,
  Hash,
  Eye,
  EyeOff,
  ArrowRight,
} from "@/components/Icons";

const fieldLabel =
  "mb-2 block font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-400";
const fieldInput =
  "w-full rounded-none border border-white/10 bg-black/20 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-emerald-400/60 focus:bg-black/30";
const fieldIcon =
  "pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500";

export default function RegisterPage() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [codigo, setCodigo] = useState("");
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState("")
  const router = useRouter()
  async function handleSubmit(e) {
    e.preventDefault()
    setErro("")
    setLoading(true)

    try {
    const resposta = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({
        nome: nome,
        email: email,
        senha: senha,
        nomeEmpresa: empresa,
        codigo: codigo
      })
    })

    const dados = await resposta.json()

    if (!resposta.ok) {
      setErro(dados.erro || "nao foi possivel criar a conta")
      return
    }
    router.push("/login")
  } catch(err) {
    setErro("falha no servidor")
  } finally {
    setLoading(false)
  }
  }


  return (
    <AuthShell
      eyebrow="// novo cadastro"
      title="Criar conta"
      subtitle="Comece a analisar a privacidade dos seus sites em minutos."
      footer={
        <>
          Já tem uma conta?{" "}
          <Link
            href="/login"
            className="font-medium text-emerald-400 hover:text-emerald-300"
          >
            Entrar
          </Link>
        </>
      }
    >
      <form className="space-y-4" onSubmit={(handleSubmit)}>
        <label className="block">
          <span className={fieldLabel}>Nome completo</span>
          <div className="relative">
            <User className={fieldIcon} />
            <input 
              type="text" 
              placeholder="Seu nome" 
              className={fieldInput} 
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
        </label>

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
              placeholder="Mínimo de 6 caracteres"
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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block">
            <span className={fieldLabel}>Empresa</span>
            <div className="relative">
              <Building className={fieldIcon} />
              <input
                type="text"
                placeholder="Opcional"
                className={fieldInput}
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
              />
            </div>
          </label>

          <label className="block">
            <span className={fieldLabel}>Código</span>
            <div className="relative">
              <Hash className={fieldIcon} />
              <input
                type="text"
                placeholder="PK-XXXX"
                className={`${fieldInput} uppercase placeholder:normal-case`}
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
              />
            </div>
          </label>
        </div>

        <div className="border-l-2 border-emerald-400/40 bg-emerald-400/[0.04] px-4 py-3">
          <p className="text-xs leading-relaxed text-zinc-400">
            Use um código para entrar em uma empresa existente. Sem código, uma
            nova empresa é criada e você vira o administrador dela.
          </p>
        </div>
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
          {loading ? "Criando..." : "Criar conta"}
          <ArrowRight className="h-[18px] w-[18px] transition group-hover:translate-x-0.5" />   
        </button>
      </form>
    </AuthShell>
  );
}
