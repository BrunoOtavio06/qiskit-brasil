import Image from "next/image";
import Link from "next/link";
import Countdown from "@/components/Countdown";

// ─── colour tokens ────────────────────────────────────────────────────────────
// bg:        #DAE5FC  (hero sky)
// deep:      #31135E  (dark purple text / accents)
// pink:      #FF7EB6  (hot pink CTA / accents)
// purple:    #8B3FFC  (mid purple dots)
// lavender:  #BE95FF  (light purple)

// ─── Section: Navbar ──────────────────────────────────────────────────────────
function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-[#DAE5FC]">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3">
          <Image
            src="/assets/badges/badge-dark.png"
            alt="Qiskit Fall Fest 2026 badge"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="font-semibold text-[#31135E] text-sm tracking-wide hidden sm:block">
            Qiskit Fall Fest Brasil
          </span>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium text-[#31135E]">
          <a
            href="#sobre"
            className="hover:text-[#8B3FFC] transition-colors hidden md:block"
          >
            Sobre
          </a>
          <a
            href="#programacao"
            className="hover:text-[#8B3FFC] transition-colors hidden md:block"
          >
            Programação
          </a>
          <a
            href="#inscricao"
            className="hover:text-[#8B3FFC] transition-colors hidden md:block"
          >
            Inscrição
          </a>
          <a
            href="/inscricao"
            className="rounded-full bg-[#FF7EB6] px-4 py-1.5 text-white hover:bg-[#e8609e] transition-colors"
          >
            Inscreva-se
          </a>
        </div>
      </nav>
    </header>
  );
}

// ─── Section: Hero ────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#DAE5FC] min-h-[580px] flex items-center">
      {/* full-bleed illustration */}
      <Image
        src="/assets/illustrations/hero-bg.png"
        alt=""
        fill
        className="object-cover object-center pointer-events-none select-none"
        priority
      />

      {/* overlay content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-20 flex flex-col items-center text-center gap-6">
        {/* pill badge */}
        <span className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-[#31135E] border border-[#BE95FF]/50">
          Novembro · 2026 · Brasil
        </span>

        {/* title — white card to ensure readability over the busy illustration */}
        <div className="rounded-3xl bg-white/75 backdrop-blur-sm px-8 py-6">
          <h1 className="text-5xl sm:text-7xl font-bold text-[#31135E] leading-tight">
            Qiskit
            <br />
            Fall Fest
            <br />
            2026
          </h1>
        </div>

        {/* sub */}
        <p className="max-w-md text-lg text-[#31135E] font-medium bg-white/60 backdrop-blur-sm rounded-2xl px-6 py-3">
          Semana de aprendizado em computação quântica aberta para estudantes e
          entusiastas de todo o Brasil.
        </p>

        {/* Countdown */}
        <Countdown />

        {/* CTA row */}
        <div className="flex flex-wrap justify-center gap-4 mt-2">
          <a
            href="/inscricao"
            className="rounded-full bg-[#FF7EB6] px-7 py-3 text-white font-semibold hover:bg-[#e8609e] transition-colors shadow-md"
          >
            Quero participar
          </a>
          <a
            href="#sobre"
            className="rounded-full bg-white/80 border border-[#31135E]/20 px-7 py-3 text-[#31135E] font-semibold hover:bg-white transition-colors"
          >
            Saiba mais
          </a>
        </div>
      </div>

      {/* floating stickers — decorative, aria-hidden */}
      <div aria-hidden className="pointer-events-none select-none">
        <Image
          src="/assets/stickers/sticker-05.png"
          alt=""
          width={140}
          height={140}
          className="absolute -top-4 right-4 opacity-90 rotate-12 hidden lg:block"
        />
        <Image
          src="/assets/stickers/sticker-07.png"
          alt=""
          width={120}
          height={120}
          className="absolute bottom-6 left-4 opacity-90 -rotate-6 hidden lg:block"
        />
      </div>
    </section>
  );
}

// ─── Section: About ───────────────────────────────────────────────────────────
function About() {
  const cards = [
    {
      sticker: "/assets/stickers/sticker-04.png",
      title: "Computação Quântica",
      body: "Explore os princípios de superposição, entrelaçamento e interferência que tornam computadores quânticos tão poderosos.",
    },
    {
      sticker: "/assets/stickers/sticker-08.png",
      title: "Qiskit na Prática",
      body: "Escreva seus primeiros circuitos quânticos com o SDK open-source Qiskit e execute em simuladores ou hardware real da IBM.",
    },
    {
      sticker: "/assets/stickers/sticker-09.png",
      title: "Comunidade",
      body: "Conecte-se com estudantes e pesquisadores de todo o Brasil que compartilham a mesma curiosidade pelo mundo quântico.",
    },
  ];

  return (
    <section id="sobre" className="bg-white py-20 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center gap-4 mb-14">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#8B3FFC]">
            O que é
          </span>
          <h2 className="text-4xl font-bold text-[#31135E]">
            Qiskit Fall Fest
          </h2>
          <p className="max-w-xl text-[#31135E]/70 text-lg leading-relaxed">
            Uma semana global de eventos dedicados à computação quântica,
            organizada por estudantes para estudantes — e este ano pela primeira
            vez no Brasil!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-[#DAE5FC] bg-[#f7f9ff] p-8 flex flex-col items-center text-center gap-4 hover:shadow-md transition-shadow"
            >
              <Image src={c.sticker} alt="" width={96} height={96} />
              <h3 className="text-xl font-bold text-[#31135E]">{c.title}</h3>
              <p className="text-[#31135E]/65 leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: Schedule ────────────────────────────────────────────────────────
const days = [
  {
    day: "Dia 1",
    date: "24 Nov",
    title: "Introdução",
    items: [
      "Abertura do evento",
      "O que é computação quântica",
      "Apresentações e comunidade",
    ],
  },
  {
    day: "Dia 2",
    date: "25 Nov",
    title: "Workshop & Hackathon",
    items: [
      "Labs práticos com Qiskit",
      "Início do hackathon",
      "Networking entre participantes",
    ],
  },
  {
    day: "Dia 3",
    date: "26 Nov",
    title: "Pitches & Encerramento",
    items: [
      "Apresentações de grupos de pesquisa",
      "Anúncio dos vencedores",
      "Mercado quântico: onde estamos",
    ],
  },
];

function Schedule() {
  return (
    <section id="programacao" className="bg-[#f7f9ff] py-20 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center gap-4 mb-14">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#8B3FFC]">
            24 – 26 de Novembro de 2026
          </span>
          <h2 className="text-4xl font-bold text-[#31135E]">Programação</h2>
          <p className="max-w-lg text-[#31135E]/70 text-lg">
            Três dias de workshops, palestras e labs práticos — online e
            gratuitos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {days.map((d) => (
            <div
              key={d.day}
              className="rounded-2xl bg-white border border-[#DAE5FC] p-6 flex flex-col gap-3 hover:shadow-md transition-shadow"
            >
              {/* day header */}
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#8B3FFC]">
                  {d.day}
                </span>
                <span className="text-xs text-[#31135E]/50 font-medium">
                  {d.date}
                </span>
              </div>
              <h3 className="text-base font-bold text-[#31135E] leading-snug">
                {d.title}
              </h3>
              <ul className="flex flex-col gap-1.5 mt-1">
                {d.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-[#31135E]/70"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF7EB6]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: Sticker strip ───────────────────────────────────────────────────
function StickerStrip() {
  const stickers = [
    { src: "/assets/stickers/flamingo.png", label: "Flamingo" },
    { src: "/assets/stickers/sticker-02.png", label: "Birds" },
    { src: "/assets/stickers/sticker-03.png", label: "Blue bird" },
    { src: "/assets/stickers/sticker-04.png", label: "Hummingbirds" },
    { src: "/assets/stickers/sticker-06.png", label: "Kingfisher" },
    { src: "/assets/stickers/sticker-07.png", label: "Falcon" },
  ];

  return (
    <section aria-hidden className="bg-[#DAE5FC] py-10 overflow-hidden">
      <div className="flex gap-6 animate-none px-6 justify-center flex-wrap">
        {stickers.map((s) => (
          <Image
            key={s.src}
            src={s.src}
            alt={s.label}
            width={88}
            height={88}
            className="rounded-full shadow-sm hover:scale-105 transition-transform duration-300"
          />
        ))}
      </div>
    </section>
  );
}

// ─── Section: Registration CTA ────────────────────────────────────────────────
function Registration() {
  return (
    <section id="inscricao" className="bg-[#31135E] py-20 px-6">
      <div className="mx-auto max-w-2xl flex flex-col items-center text-center gap-6">
        <Image
          src="/assets/badges/badge-pink.svg"
          alt="Qiskit Fall Fest 2026"
          width={100}
          height={100}
        />
        <h2 className="text-4xl font-bold text-white">Garanta sua vaga</h2>
        <p className="text-[#BE95FF] text-lg leading-relaxed max-w-md">
          As inscrições são gratuitas e abertas para estudantes de graduação,
          pós-graduação e entusiastas de computação quântica.
        </p>
        <a
          href="/inscricao"
          className="rounded-full bg-[#FF7EB6] px-8 py-3.5 text-white font-semibold text-lg hover:bg-[#e8609e] transition-colors shadow-lg"
        >
          Inscrever-se agora →
        </a>
        <p className="text-[#BE95FF]/60 text-sm">
          Vagas limitadas · Evento online e gratuito
        </p>
      </div>
    </section>
  );
}

// ─── Section: Footer ─────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#1c0b38] py-12 px-6 text-[#BE95FF]/70 text-sm">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
        {/* brand */}
        <div className="flex items-center gap-3">
          <Image
            src="/assets/badges/badge-dark.png"
            alt="Qiskit Fall Fest 2026"
            width={44}
            height={44}
            className="rounded-full opacity-80"
          />
          <div>
            <p className="font-semibold text-white text-sm">
              Qiskit Fall Fest 2026
            </p>
            <p className="text-xs text-[#BE95FF]/50">Brasil</p>
          </div>
        </div>

        {/* links */}
        <nav className="flex flex-wrap justify-center gap-6 text-sm">
          <a href="#sobre" className="hover:text-[#FF7EB6] transition-colors">
            Sobre
          </a>
          <a
            href="#programacao"
            className="hover:text-[#FF7EB6] transition-colors"
          >
            Programação
          </a>
          <a
            href="#inscricao"
            className="hover:text-[#FF7EB6] transition-colors"
          >
            Inscrição
          </a>
        </nav>

        {/* badge strip */}
        <div className="flex items-center gap-3">
          <Image
            src="/assets/stickers/sticker-08.png"
            alt=""
            width={40}
            height={40}
            className="opacity-60 rounded"
          />
          <Image
            src="/assets/stickers/sticker-09.png"
            alt=""
            width={40}
            height={40}
            className="opacity-60 rounded"
          />
        </div>
      </div>

      <div className="mt-8 border-t border-white/10 pt-6 text-center text-xs text-[#BE95FF]/40">
        © 2026 Qiskit Fall Fest Brasil
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Schedule />
        <StickerStrip />
        <Registration />
      </main>
      <Footer />
    </>
  );
}
