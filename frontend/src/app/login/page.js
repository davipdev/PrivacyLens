"use client";

import { useState } from "react";
import Link from "next/link";
import AuthShell from "@/components/AuthShell";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "@/components/Icons";

const fieldLabel =
  "mb-2 block font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-400";
const fieldInput =
  "w-full rounded-none border border-white/10 bg-black/20 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-emerald-400/60 focus:bg-black/30";
const fieldIcon =
  "pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500";

export default function LoginPage() {
  const [mostrarSenha, setMostrarSenha] = useState(false);

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
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <label className="block">
          <span className={fieldLabel}>E-mail</span>
          <div className="relative">
            <Mail className={fieldIcon} />
            <input
              type="email"
              placeholder="voce@empresa.com"
              className={fieldInput}
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

        <button
          type="submit"
          className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-none bg-emerald-400 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-300"
        >
          Entrar
          <ArrowRight className="h-[18px] w-[18px] transition group-hover:translate-x-0.5" />
        </button>
      </form>
    </AuthShell>
  );
}
