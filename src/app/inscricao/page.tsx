"use client";

import { useState, useRef, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import Link from "next/link";
import Image from "next/image";

// ─── Data ─────────────────────────────────────────────────────────────────────

const FACULDADES = ["FIAP", "USP", "UFABC", "Outro"];

const CURSOS = [
  "Análise e Desenvolvimento de Sistemas",
  "Administração",
  "Ciência da Computação",
  "Ciência e Tecnologia",
  "Economia",
  "Engenharia da Computação",
  "Engenharia de Software",
  "Engenharia Elétrica",
  "Estatística",
  "Física",
  "Inteligência Artificial",
  "Matemática",
  "Sistemas de Informação",
  "Outros",
];

const ESTADOS = [
  "Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará",
  "Distrito Federal", "Espírito Santo", "Goiás", "Maranhão",
  "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Pará",
  "Paraíba", "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro",
  "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia", "Roraima",
  "Santa Catarina", "São Paulo", "Sergipe", "Tocantins", "Outro país",
];

const EXPERIENCIA_LABELS: Record<number, string> = {
  1: "Nenhuma",
  2: "Já ouvi falar",
  3: "Algumas noções",
  4: "Estudei um pouco",
  5: "Tenho experiência",
};

// ─── Combobox ─────────────────────────────────────────────────────────────────

function CourseCombobox({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const filtered = CURSOS.filter((c) =>
    c.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function select(curso: string) {
    onChange(curso);
    setQuery(curso);
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <input
        type="text"
        placeholder="Digite para buscar..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onChange("");
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1f2328] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B3FFC]/30 focus:border-[#8B3FFC]"
      />
      {open && filtered.length > 0 && (
        <ul className="absolute z-20 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg max-h-48 overflow-y-auto text-sm">
          {filtered.map((c) => (
            <li
              key={c}
              onMouseDown={() => select(c)}
              className="px-3 py-2 cursor-pointer hover:bg-[#f7f9ff] text-[#1f2328]"
            >
              {c}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ─── Field wrapper ────────────────────────────────────────────────────────────

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-[#1f2328]">{label}</label>
      {children}
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
  );
}

// ─── Section divider ──────────────────────────────────────────────────────────

function Section({ title }: { title: string }) {
  return (
    <div className="pt-2 pb-1 border-t border-gray-100">
      <p className="text-xs font-semibold uppercase tracking-widest text-[#8B3FFC]">
        {title}
      </p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Inscricao() {
  const [form, setForm] = useState({
    name: "",
    universityEmail: "",
    personalEmail: "",
    password: "",
    birthDate: "",
    faculdade: "",
    curso: "",
    estado: "",
    experiencia: 0,
    hackathon: "" as "Sim" | "Não" | "Ainda não sei" | "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function set(key: string, value: string | number) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.curso) {
      setError("Selecione um curso válido na lista.");
      return;
    }

    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        form.universityEmail,
        form.password
      );

      await setDoc(doc(db, "users", user.uid), {
        name: form.name,
        universityEmail: form.universityEmail,
        personalEmail: form.personalEmail || null,
        birthDate: form.birthDate,
        faculdade: form.faculdade,
        curso: form.curso,
        estado: form.estado,
        experiencia: form.experiencia,
        hackathon: form.hackathon,
        createdAt: serverTimestamp(),
      });

      setSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error && "code" in err) {
        const code = (err as { code: string }).code;
        if (code === "auth/email-already-in-use") {
          setError("Esse e-mail já está cadastrado.");
        } else if (code === "auth/invalid-email") {
          setError("E-mail inválido.");
        } else if (code === "auth/weak-password") {
          setError("Senha muito fraca. Use pelo menos 8 caracteres.");
        } else {
          setError("Algo deu errado. Tente novamente.");
        }
      }
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#31135E] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl p-10 max-w-md w-full text-center flex flex-col items-center gap-4">
          <Image src="/assets/badges/badge-pink.svg" alt="" width={72} height={72} />
          <h1 className="text-2xl font-bold text-[#31135E]">Inscrição confirmada!</h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            Até novembro. Fique de olho no seu e-mail para mais novidades.
          </p>
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

  const inputClass =
    "w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-[#1f2328] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B3FFC]/30 focus:border-[#8B3FFC]";

  return (
    <div className="min-h-screen bg-[#31135E] flex items-center justify-center px-4 py-16">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 flex flex-col gap-5">

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-2 pb-1">
          <Image src="/assets/badges/badge-pink.svg" alt="" width={56} height={56} />
          <h1 className="text-2xl font-bold text-[#31135E]">Inscrição</h1>
          <p className="text-sm text-gray-400">Qiskit Fall Fest Brasil · 24–26 nov 2026</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Conta */}
          <Section title="Conta" />

          <Field label="Nome completo">
            <input
              type="text"
              required
              placeholder="Seu nome"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field
            label="E-mail universitário"
          >
            <input
              type="email"
              required
              placeholder="voce@universidade.edu.br"
              value={form.universityEmail}
              onChange={(e) => set("universityEmail", e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field
            label="E-mail pessoal"
            hint="Recomendado para o envio do certificado."
          >
            <input
              type="email"
              placeholder="voce@gmail.com"
              value={form.personalEmail}
              onChange={(e) => set("personalEmail", e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field label="Senha">
            <input
              type="password"
              required
              minLength={8}
              placeholder="Mínimo 8 caracteres"
              value={form.password}
              onChange={(e) => set("password", e.target.value)}
              className={inputClass}
            />
          </Field>

          {/* Formação */}
          <Section title="Formação" />

          <Field label="Faculdade">
            <select
              required
              value={form.faculdade}
              onChange={(e) => set("faculdade", e.target.value)}
              className={inputClass}
            >
              <option value="">Selecione...</option>
              {FACULDADES.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </Field>

          <Field label="Curso">
            <CourseCombobox
              value={form.curso}
              onChange={(v) => set("curso", v)}
            />
          </Field>

          <Field label="Data de nascimento">
            <input
              type="date"
              required
              value={form.birthDate}
              onChange={(e) => set("birthDate", e.target.value)}
              className={inputClass}
            />
          </Field>

          {/* Perfil */}
          <Section title="Perfil" />

          <Field label="Estado">
            <select
              required
              value={form.estado}
              onChange={(e) => set("estado", e.target.value)}
              className={inputClass}
            >
              <option value="">Selecione...</option>
              {ESTADOS.map((e) => (
                <option key={e} value={e}>{e}</option>
              ))}
            </select>
          </Field>

          <Field label="Experiência com computação quântica">
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  type="button"
                  key={n}
                  onClick={() => set("experiencia", n)}
                  title={EXPERIENCIA_LABELS[n]}
                  className={`flex-1 rounded-lg border py-2.5 text-sm font-semibold transition-colors ${
                    form.experiencia === n
                      ? "bg-[#8B3FFC] border-[#8B3FFC] text-white"
                      : "border-gray-200 text-gray-400 hover:border-[#8B3FFC] hover:text-[#8B3FFC]"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
            {form.experiencia > 0 && (
              <p className="text-xs text-gray-400 mt-1">
                {EXPERIENCIA_LABELS[form.experiencia]}
              </p>
            )}
          </Field>

          {/* Hackathon */}
          <Section title="Hackathon" />

          <Field label="Tem interesse em participar do hackathon?">
            <div className="flex gap-2">
              {(["Sim", "Não", "Ainda não sei"] as const).map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => set("hackathon", opt)}
                  className={`flex-1 rounded-lg border py-2.5 text-sm font-medium transition-colors ${
                    form.hackathon === opt
                      ? "bg-[#FF7EB6] border-[#FF7EB6] text-white"
                      : "border-gray-200 text-gray-400 hover:border-[#FF7EB6] hover:text-[#FF7EB6]"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Sua resposta não afeta sua participação. É só para estatística.
            </p>
          </Field>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-full bg-[#FF7EB6] py-3 text-white font-semibold text-sm hover:bg-[#e8609e] transition-colors disabled:opacity-60"
          >
            {loading ? "Inscrevendo..." : "Confirmar inscrição"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400">
          Já tem conta?{" "}
          <Link href="/login" className="text-[#8B3FFC] hover:underline font-medium">
            Entre aqui
          </Link>
        </p>
      </div>
    </div>
  );
}
