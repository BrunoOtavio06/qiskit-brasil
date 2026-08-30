import Image from "next/image";
import Countdown from "@/components/Countdown";

// ─── IBM Quantum brand color reference (see globals.css for full token list) ──
// Cool Gray 100  #121619  — deepest background
// Cool Gray 90   #21272a  — surface / card
// Gray 10        #f4f4f4  — body text on dark
// Blue 60        #0f62fe  — primary action / links
// Purple 40      #be95ff  — accent / labels
// Magenta 40     #ff7eb6  — CTA buttons
// Hero gradient  Blue 60 → Purple 40 → Magenta 40

// ─── Section: Navbar ──────────────────────────────────────────────────────────
function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#121619]/90 backdrop-blur border-b border-[#343a3f]">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <Image
            src="/assets/badges/badge-pink.svg"
            alt="Qiskit Fall Fest 2026 badge"
            width={36}
            height={36}
          />
          <span className="font-semibold text-[#f4f4f4] text-sm tracking-wide hidden sm:block">
            Qiskit Fall Fest Brasil
          </span>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium text-[#a8a8a8]">
          <a
            href="#sobre"
            className="hover:text-[#be95ff] transition-colors hidden md:block"
          >
            Sobre
          </a>
          <a
            href="#programacao"
            className="hover:text-[#be95ff] transition-colors hidden md:block"
          >
            Programação
          </a>
          <a
            href="#inscricao"
            className="hover:text-[#be95ff] transition-colors hidden md:block"
          >
            Inscrição
          </a>
          {/* Primary CTA — Blue 60, sharp IBM corners */}
          <a
            href="/inscricao"
            className="bg-[#0f62fe] px-4 py-2 text-white font-medium hover:bg-[#4589ff] transition-colors"
          >
            Inscreva-se
          </a>
        </div>
      </nav>
    </header>
  );
}

// ─── Section: Hero ────────────────────────────────────────────────────────────
// Dark Cool Gray 100 bg + brand SVG illustration fills the right side.
// Text anchored to a left column, IBM "Dynamic" asymmetric composition.
function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#121619] min-h-[600px] flex items-center">
      {/* brand hero illustration — right-anchored, bleeds off edge */}
      <div className="absolute inset-0 flex items-end justify-end pointer-events-none select-none">
        <Image
          src="/assets/illustrations/hero-main.svg"
          alt=""
          width={900}
          height={480}
          className="object-cover object-right opacity-90 max-h-full"
          priority
        />
      </div>

      {/* left-column content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6">
          {/* label — Purple 40, all-caps tracking */}
          <span className="text-xs font-semibold tracking-widest uppercase text-[#be95ff]">
            Novembro · 2026 · Brasil
          </span>

          {/* title — Gray 10 on dark */}
          <h1 className="text-5xl sm:text-6xl font-bold text-[#f4f4f4] leading-tight">
            Qiskit
            <br />
            Fall Fest
            <br />
            {/* "2026" with hero gradient */}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #0f62fe, #be95ff, #ff7eb6)",
              }}
            >
              2026
            </span>
          </h1>

          <p className="text-[#a8a8a8] text-lg leading-relaxed max-w-sm">
            Semana de aprendizado em computação quântica aberta para estudantes
            e entusiastas de todo o Brasil.
          </p>

          {/* Countdown */}
          <Countdown />

          {/* CTA row */}
          <div className="flex flex-wrap gap-3 mt-2">
            {/* primary — Magenta 40 */}
            <a
              href="/inscricao"
              className="bg-[#ff7eb6] px-6 py-3 text-[#121619] font-semibold hover:bg-[#ee5396] transition-colors"
            >
              Quero participar
            </a>
            {/* secondary — outlined */}
            <a
              href="#sobre"
              className="border border-[#697077] px-6 py-3 text-[#f4f4f4] font-medium hover:border-[#be95ff] hover:text-[#be95ff] transition-colors"
            >
              Saiba mais
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section: About ───────────────────────────────────────────────────────────
// Modular grid: 3 cards on Cool Gray 90 surface, flat bird illustrations.
// IBM "Modular" composition — systematic, aligned to grid, consistent proportions.
function About() {
  const cards = [
    {
      illustration: "/assets/illustrations/birds/hummingbird.png",
      title: "Computação Quântica",
      body: "Explore os princípios de superposição, entrelaçamento e interferência que tornam computadores quânticos tão poderosos.",
    },
    {
      illustration: "/assets/illustrations/birds/falcon.png",
      title: "Qiskit na Prática",
      body: "Escreva seus primeiros circuitos quânticos com o SDK open-source Qiskit e execute em simuladores ou hardware real da IBM.",
    },
    {
      illustration: "/assets/illustrations/birds/flamingo.png",
      title: "Comunidade",
      body: "Conecte-se com estudantes e pesquisadores de todo o Brasil que compartilham a mesma curiosidade pelo mundo quântico.",
    },
  ];

  return (
    <section id="sobre" className="bg-[#21272a] py-20 px-6">
      <div className="mx-auto max-w-6xl">
        {/* section header */}
        <div className="flex flex-col gap-3 mb-14 max-w-xl">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#be95ff]">
            O que é
          </span>
          <h2 className="text-4xl font-bold text-[#f4f4f4]">
            Qiskit Fall Fest
          </h2>
          <p className="text-[#a8a8a8] text-lg leading-relaxed">
            Uma semana global de eventos dedicados à computação quântica,
            organizada por estudantes para estudantes — e este ano pela primeira
            vez no Brasil!
          </p>
        </div>

        {/* 3-column modular grid — 16px gutter (Carbon narrow) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((c) => (
            <div
              key={c.title}
              className="bg-[#121619] border border-[#343a3f] p-8 flex flex-col gap-6 hover:border-[#4589ff] transition-colors"
            >
              <Image
                src={c.illustration}
                alt={c.title}
                width={128}
                height={128}
                className="w-32 h-32 object-contain"
              />
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-[#f4f4f4]">
                  {c.title}
                </h3>
                <p className="text-[#a8a8a8] leading-relaxed text-sm">
                  {c.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: Schedule ────────────────────────────────────────────────────────
// IBM "Essential" — form follows function, generous negative space.
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
    <section id="programacao" className="bg-[#121619] py-20 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-3 mb-14 max-w-xl">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#be95ff]">
            24 – 26 de Novembro de 2026
          </span>
          <h2 className="text-4xl font-bold text-[#f4f4f4]">Programação</h2>
          <p className="text-[#a8a8a8] text-lg">
            Três dias de workshops, palestras e labs práticos — online e
            gratuitos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {days.map((d, i) => (
            <div
              key={d.day}
              className="bg-[#21272a] border border-[#343a3f] p-6 flex flex-col gap-4"
            >
              {/* coloured top-border accent — Blue 60 / Purple 60 / Magenta 40 */}
              <div
                className="h-1 w-12"
                style={{
                  background:
                    i === 0
                      ? "#0f62fe"
                      : i === 1
                        ? "#8a3ffc"
                        : "#ff7eb6",
                }}
              />
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#be95ff]">
                  {d.day}
                </span>
                <span className="text-xs text-[#697077] font-medium">
                  {d.date}
                </span>
              </div>
              <h3 className="text-base font-semibold text-[#f4f4f4] leading-snug">
                {d.title}
              </h3>
              <ul className="flex flex-col gap-2 mt-1">
                {d.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-[#a8a8a8]"
                  >
                    {/* Blue 60 bullet */}
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[#0f62fe]" />
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

// ─── Section: Illustration strip ──────────────────────────────────────────────
// Shows flat Qiskit bird illustrations in a horizontal row on Cool Gray 90.
function IllustrationStrip() {
  const birds = [
    { src: "/assets/illustrations/birds/condor.png", label: "Condor" },
    { src: "/assets/illustrations/birds/eagle.png", label: "Eagle" },
    { src: "/assets/illustrations/birds/heron.png", label: "Heron" },
    { src: "/assets/illustrations/birds/kookaburra.png", label: "Kookaburra" },
    { src: "/assets/illustrations/birds/osprey.png", label: "Osprey" },
    { src: "/assets/illustrations/birds/starling.png", label: "Starling" },
  ];

  return (
    <section aria-hidden className="bg-[#21272a] py-12 overflow-hidden border-y border-[#343a3f]">
      <div className="flex gap-8 px-6 justify-center flex-wrap">
        {birds.map((b) => (
          <Image
            key={b.src}
            src={b.src}
            alt={b.label}
            width={96}
            height={96}
            className="w-24 h-24 object-contain opacity-90 hover:opacity-100 transition-opacity"
          />
        ))}
      </div>
    </section>
  );
}

// ─── Section: Registration CTA ────────────────────────────────────────────────
// Hero gradient bar + dark CTA block — IBM "Dynamic" expressive moment.
function Registration() {
  return (
    <section id="inscricao" className="bg-[#121619] py-24 px-6">
      {/* hero gradient accent bar */}
      <div
        className="h-1 max-w-6xl mx-auto mb-16"
        style={{
          background: "linear-gradient(to right, #0f62fe, #be95ff, #ff7eb6)",
        }}
      />

      <div className="mx-auto max-w-2xl flex flex-col items-center text-center gap-6">
        <Image
          src="/assets/badges/badge-pink.svg"
          alt="Qiskit Fall Fest 2026"
          width={80}
          height={80}
        />
        <h2 className="text-4xl font-bold text-[#f4f4f4]">Garanta sua vaga</h2>
        <p className="text-[#a8a8a8] text-lg leading-relaxed max-w-md">
          As inscrições são gratuitas e abertas para estudantes de graduação,
          pós-graduação e entusiastas de computação quântica.
        </p>
        {/* Magenta 40 CTA */}
        <a
          href="/inscricao"
          className="bg-[#ff7eb6] px-8 py-4 text-[#121619] font-semibold text-lg hover:bg-[#ee5396] transition-colors"
        >
          Inscrever-se agora →
        </a>
        <p className="text-[#697077] text-sm">
          Vagas limitadas · Evento online e gratuito
        </p>
      </div>
    </section>
  );
}

// ─── Section: Footer ──────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#21272a] border-t border-[#343a3f] py-12 px-6 text-[#697077] text-sm">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* brand */}
        <div className="flex items-center gap-3">
          <Image
            src="/assets/badges/badge-pink.svg"
            alt="Qiskit Fall Fest 2026"
            width={40}
            height={40}
          />
          <div>
            <p className="font-semibold text-[#f4f4f4] text-sm">
              Qiskit Fall Fest 2026
            </p>
            <p className="text-xs text-[#697077]">Brasil</p>
          </div>
        </div>

        {/* links */}
        <nav className="flex flex-wrap gap-6 text-sm">
          <a href="#sobre" className="hover:text-[#be95ff] transition-colors">
            Sobre
          </a>
          <a
            href="#programacao"
            className="hover:text-[#be95ff] transition-colors"
          >
            Programação
          </a>
          <a
            href="#inscricao"
            className="hover:text-[#be95ff] transition-colors"
          >
            Inscrição
          </a>
        </nav>

        {/* svg sticker accent */}
        <div className="flex items-center gap-3 opacity-50">
          <Image
            src="/assets/stickers/svg/qiskit-purple.svg"
            alt=""
            width={48}
            height={24}
            className="h-6 w-auto"
          />
          <Image
            src="/assets/stickers/svg/quantum-blue.svg"
            alt=""
            width={72}
            height={24}
            className="h-6 w-auto"
          />
        </div>
      </div>

      <div className="mt-8 border-t border-[#343a3f] pt-6 text-center text-xs text-[#697077]">
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
        <IllustrationStrip />
        <Registration />
      </main>
      <Footer />
    </>
  );
}
