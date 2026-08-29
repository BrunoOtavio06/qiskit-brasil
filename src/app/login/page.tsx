"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import Image from "next/image";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error && "code" in err) {
        const code = (err as { code: string }).code;
        if (
          code === "auth/invalid-credential" ||
          code === "auth/user-not-found" ||
          code === "auth/wrong-password"
        ) {
          setError("E-mail ou senha incorretos.");
        } else {
          setError("Algo deu errado. Tente novamente.");
        }
      }
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1f2328] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B3FFC]/30 focus:border-[#8B3FFC]";

  if (success) {
    return (
      <div className="min-h-screen bg-[#31135E] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl p-10 max-w-md w-full text-center flex flex-col items-center gap-4">
          <Image src="/assets/badges/badge-pink.svg" alt="" width={72} height={72} />
          <h1 className="text-2xl font-bold text-[#31135E]">Bem-vindo de volta!</h1>
          <p className="text-gray-500 text-sm">Você está logado.</p>
          <Link
            href="/"
            className="mt-2 rounded-full bg-[#FF7EB6] px-6 py-2.5 text-white font-semibold text-sm hover:bg-[#e8609e] transition-colors"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#31135E] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-8 flex flex-col gap-5">

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-2 pb-1">
          <Image src="/assets/badges/badge-pink.svg" alt="" width={56} height={56} />
          <h1 className="text-2xl font-bold text-[#31135E]">Entrar</h1>
          <p className="text-sm text-gray-400">Qiskit Fall Fest Brasil</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#1f2328]">E-mail universitário</label>
            <input
              type="email"
              required
              placeholder="voce@universidade.edu.br"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#1f2328]">Senha</label>
            <input
              type="password"
              required
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-full bg-[#FF7EB6] py-3 text-white font-semibold text-sm hover:bg-[#e8609e] transition-colors disabled:opacity-60"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400">
          Não tem conta?{" "}
          <Link href="/inscricao" className="text-[#8B3FFC] hover:underline font-medium">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}
