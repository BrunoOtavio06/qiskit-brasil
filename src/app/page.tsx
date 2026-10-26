"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";
import Countdown from "@/components/Countdown";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// next/image does not auto-apply basePath, so we prefix every src manually
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// IBM Quantum brand colors (full token list in globals.css)
// Cool Gray 100  #121619  background
// Cool Gray 90   #21272a  surface/card
// Gray 10        #f4f4f4  body text on dark
// Blue 60        #0f62fe  primary action/links
// Purple 40      #be95ff  accent/labels
// Magenta 40     #ff7eb6  CTA buttons
// Hero gradient  Blue 60 → Purple 40 → Magenta 40

// Section links shared by the navbar (desktop + mobile menu) and the footer
const navLinks = [
  { href: "#sobre", label: "Sobre" },
  { href: "#programacao", label: "Programação" },
  { href: "#palestrantes", label: "Palestrantes" },
  { href: "#local", label: "Local" },
  { href: "#faq", label: "Dúvidas" },
  { href: "#inscricao", label: "Inscrição" },
];

// Navbar
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#121619]/90 backdrop-blur border-b border-[#343a3f]">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <Image
            src={`${BASE}/assets/badges/badge-pink.svg`}
            alt="Qiskit Fall Fest 2026 badge"
            width={36}
            height={36}
          />
          <span className="font-normal text-[#f4f4f4] text-sm tracking-wide hidden sm:block">
            Qiskit Fall Fest Brasil
          </span>
        </div>
        <div className="flex items-center gap-4 lg:gap-6 whitespace-nowrap text-sm font-normal text-[#a8a8a8]">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hover:text-[#be95ff] transition-colors hidden md:block"
            >
              {l.label}
            </a>
          ))}
          {/* Mobile menu toggle, below md the links live in the panel below */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="md:hidden text-[#f4f4f4] hover:text-[#be95ff] transition-colors"
          >
            {menuOpen ? <XIcon className="size-6" /> : <MenuIcon className="size-6" />}
          </button>
          {/* Primary CTA — Blue 60, sharp IBM corners */}
          <a
            href="https://forms.cloud.microsoft/r/YuW1uLvY6m"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0f62fe] px-4 py-2 text-white font-medium hover:bg-[#4589ff] transition-colors"
          >
            Inscreva-se
          </a>
        </div>
      </nav>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden absolute top-full inset-x-0 bg-[#121619] border-b border-[#343a3f]"
        >
          <ul className="flex flex-col px-6 py-2">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-3 text-[#f4f4f4] hover:text-[#be95ff] transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

// Hero
function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#121619] min-h-[480px] lg:min-h-[600px] flex items-center">
      {/* hero illustration, right-anchored — hidden on mobile, narrower on small laptops, to avoid overlap */}
      <div className="hidden lg:flex absolute inset-y-0 right-0 lg:max-w-[55%] xl:max-w-full items-center justify-end select-none pointer-events-none lg:pr-12">
        <Image
          src={`${BASE}/assets/illustrations/hero-main.svg`}
          alt="Ilustração Qiskit Fall Fest Brasil 2026"
          width={900}
          height={480}
          className="w-auto max-h-[480px] max-w-full object-contain"
          priority
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-14 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center pointer-events-none">
        <div className="flex flex-col gap-6 pointer-events-auto">
          <span className="text-xs font-medium tracking-widest uppercase text-[#be95ff]">
            24–26 de novembro · FIAP + online · Gratuito
          </span>
          <h1 className="text-[13vw] sm:text-5xl lg:text-7xl font-light text-[#e0e0e0] leading-tight">
            {/* On mobile: single flowing line. On sm+: stacked with breaks. */}
            <span className="sm:hidden">Qiskit Fall Fest </span>
            <span className="hidden sm:inline">
              Qiskit
              <br />
              Fall Fest
              <br />
            </span>
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(to right, #be95ff, #ff7eb6)",
              }}
            >
              2026
            </span>
          </h1>

          <p className="text-[#a8a8a8] text-lg leading-relaxed max-w-sm">
            Três dias de computação quântica para estudantes e entusiastas de
            todo o Brasil.
          </p>

          <Countdown />

          <div className="flex flex-wrap gap-3 mt-2">
            <a
              href="https://forms.cloud.microsoft/r/YuW1uLvY6m"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#ff7eb6] px-6 py-3 text-[#121619] font-medium hover:bg-[#ee5396] transition-colors"
            >
              Quero participar
            </a>
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

// About
const aboutPanels = [
  {
    image: `${BASE}/assets/illustrations/qiskit/qiskit-01-wide.webp`,
    title: "Computação Quântica",
    body: "Você não precisa ser físico ou matemático pra entender computação quântica. A base está em fenômenos como superposição, entrelaçamento e interferência, e é isso que permite resolver problemas que computadores clássicos não conseguem resolver. O nome assusta, mas dá pra entender a ideia com calma, começando do zero.",
  },
  {
    image: `${BASE}/assets/illustrations/qiskit/qiskit-04-wide.webp`,
    title: "Qiskit",
    body: "Qiskit é o SDK open-source da IBM pra computação quântica. É a porta de entrada pra quem quer sair da teoria e começar a programar de verdade: você escreve circuitos quânticos em Python, testa em simuladores no seu próprio notebook e, quando estiver pronto, roda em hardware quântico real da IBM direto pela nuvem. Além disso, é completamente gratuito.",
  },
  {
    image: `${BASE}/assets/illustrations/qiskit/qiskit-05-wide.webp`,
    title: "Comunidade",
    body: "O Fall Fest reúne estudantes e entusiastas de vários lugares interessados no mundo quântico, desde quem já mexeu com Qiskit a quem nunca ouviu falar de qubit. Acontece de 24 a 26 de novembro, presencial na FIAP em São Paulo, para estudantes da FIAP, e online para qualquer lugar do país. Para participar online, não é preciso ser de faculdade parceira nem já saber o assunto: basta curiosidade.",
  },
];

function AboutPanels() {
  return (
    <div className="flex flex-col gap-6">
      {aboutPanels.map((p, i) => (
        <div
          key={p.title}
          className="bg-[#121619] border border-[#343a3f] hover:border-[#0f62fe] transition-colors"
        >
          {/* Even panels (0, 2): image left, text right. Odd (1): text left, image right. */}
          <div
            className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
          >
            <div className="w-full md:w-1/2">
              <Image
                src={p.image}
                alt={p.title}
                width={1456}
                height={819}
                className="w-full h-52 md:h-full object-cover"
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center gap-4 p-6 md:p-10">
              <h3 className="text-xl font-normal text-[#f4f4f4]">{p.title}</h3>
              <p className="text-[#a8a8a8] leading-relaxed text-sm">{p.body}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function About() {
  return (
    <section id="sobre" className="bg-[#21272a] py-14 md:py-20 scroll-mt-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-3 mb-10 max-w-xl">
          <span className="text-xs font-medium tracking-widest uppercase text-[#be95ff]">
            O que é
          </span>
          <h2 className="text-3xl md:text-4xl font-light text-[#f4f4f4]">
            Qiskit Fall Fest
          </h2>
          <p className="text-[#a8a8a8] text-lg leading-relaxed">
            Uma coletânea global de eventos de computação quântica, organizada
            por estudantes para estudantes.
          </p>
        </div>

        <AboutPanels />
      </div>
    </section>
  );
}

// Schedule
const days = [
  {
    day: "Dia 1",
    date: "24 Nov",
    title: "Introdução",
    items: [
      "Abertura e lançamento do Challenge",
      "Casos de uso e Quantum Safe",
      "101 de computação quântica",
    ],
    schedule: [
      {
        time: "18:00 - 18:30",
        label: "Abertura",
        note: "Lançamento do Challenge",
      },
      {
        time: "18:30 - 19:45",
        label: "Computação Quântica: Casos de Uso e Quantum Safe",
        note: "Parte 1: caso de uso. Parte 2: Quantum Safe",
      },
      { time: "19:45 - 20:30", label: "Quantum 101: Visual e Intuitivo" },
    ],
  },
  {
    day: "Dia 2",
    date: "25 Nov",
    title: "Workshop & Challenge",
    items: ["Workshop com Qiskit", "Challenge", "AMA e networking"],
    schedule: [
      { time: "15:00 - 18:00", label: "Workshop: Primeiros Passos com Qiskit" },
      {
        time: "18:00 - 20:00",
        label: "Challenge: Quantum Pitch",
      },
      {
        time: "18:00 - 20:00",
        label: "AMA com Pessoas da Área",
        note: "Simultâneo ao Challenge",
      },
    ],
  },
  {
    day: "Dia 3",
    date: "26 Nov",
    title: "Grupos de Pesquisa & Encerramento",
    items: [
      "Apresentações de grupos de pesquisa e estudo",
      "Dinâmica",
      "Anúncio dos vencedores",
      "Próximos passos",
    ],
    schedule: [
      {
        time: "18:00 - 19:00",
        label: "Apresentações de Grupos de Pesquisa e Estudo",
        note: "Projetos e mentoria para quem está começando",
      },
      {
        time: "19:00 - 19:30",
        label: "Dinâmica",
        note: "Valendo prêmios da IBM Quantum (somente para o público presencial)",
      },
      { time: "19:30 - 19:50", label: "Anúncio dos Vencedores do Challenge" },
      {
        time: "19:50 - 20:30",
        label: "Encerramento: Oportunidades, Mercado e Certificações",
      },
    ],
  },
];

// Modal com a agenda detalhada de um dia
function DayModal({
  day,
  onClose,
}: {
  day: (typeof days)[0];
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121619]/90"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#21272a] border border-[#343a3f] p-8 flex flex-col gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium uppercase tracking-widest text-[#be95ff]">
              {day.day} · {day.date}
            </span>
            <h3 className="text-xl font-light text-[#f4f4f4]">{day.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#697077] hover:text-[#f4f4f4] transition-colors shrink-0 text-lg leading-none"
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>

        {/* Lista de itens com horários */}
        <ul className="flex flex-col divide-y divide-[#343a3f]">
          {day.schedule.map((item) => (
            <li
              key={item.time + item.label}
              className="flex flex-col gap-1 py-4 first:pt-0 last:pb-0"
            >
              <span className="text-xs font-medium tabular-nums text-[#be95ff]">
                {item.time}
              </span>
              <span className="text-sm text-[#f4f4f4]">{item.label}</span>
              {item.note && (
                <span className="text-xs text-[#697077]">{item.note}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Schedule() {
  const [activeDay, setActiveDay] = useState<number | null>(null);

  return (
    <section
      id="programacao"
      className="bg-[#121619] py-14 md:py-20 px-6 scroll-mt-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-3 mb-14 max-w-xl">
          <span className="text-xs font-medium tracking-widest uppercase text-[#be95ff]">
            24 - 26 de Novembro de 2026
          </span>
          <h2 className="text-3xl md:text-4xl font-light text-[#f4f4f4]">
            Programação
          </h2>
          <p className="text-[#a8a8a8] text-lg">
            Três dias de palestras, workshop e desafio. Presencial para estudantes
            da FIAP, online para todo o Brasil e gratuito.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {days.map((d, i) => (
            <button
              key={d.day}
              onClick={() => setActiveDay(i)}
              className="bg-[#21272a] border border-[#343a3f] hover:border-[#be95ff] p-6 flex flex-col gap-4 transition-colors text-left cursor-pointer"
            >
              <div className="h-1 w-12 bg-[#be95ff]" />
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-medium uppercase tracking-widest text-[#be95ff]">
                  {d.day}
                </span>
                <span className="text-xs text-[#697077] font-normal">
                  {d.date}
                </span>
              </div>
              <h3 className="text-base font-normal text-[#f4f4f4] leading-snug">
                {d.title}
              </h3>
              <ul className="flex flex-col gap-2 mt-1">
                {d.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-[#a8a8a8]"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[#be95ff]" />
                    {item}
                  </li>
                ))}
              </ul>
              <span className="mt-auto text-xs text-[#be95ff] pt-2">
                Ver agenda →
              </span>
            </button>
          ))}
        </div>
      </div>

      {activeDay !== null && (
        <DayModal day={days[activeDay]} onClose={() => setActiveDay(null)} />
      )}
    </section>
  );
}

// Speakers
type Speaker = {
  name: string;
  photo: string;
  linkedin: string;
  talk?: string; // sem talk e sem tags = "Tema a definir"
  tags?: string[]; // papéis na programação, ex.: "Workshop", "AMA" (caixinha roxa)
  orgs?: string[]; // faculdades (caixinha rosa)
};

// Palestrantes lado a lado no desktop quando há mais de um no bloco.
type SpeakerBlock = { label?: string; speakers: Speaker[] };

const hosts: Speaker[] = [
  {
    name: "Bruno Otávio Carvalho",
    photo: "bruno-otavio-carvalho.webp",
    linkedin: "https://www.linkedin.com/in/bruno-otavio-carvalho/",
  },
  {
    name: "Alexandre Russi",
    photo: "alexandre-russi.webp",
    linkedin: "https://www.linkedin.com/in/alexandrerussi/",
  },
];

const marcelo: Speaker = {
  name: "Marcelo Morales",
  photo: "marcelo-morales.webp",
  linkedin: "https://www.linkedin.com/in/professor-mecchi/",
};
const pfeifer: Speaker = {
  name: "Alexandre Pfeifer",
  photo: "alexandre-pfeifer.webp",
  linkedin: "https://www.linkedin.com/in/alexandre-pfeifer-a4a47/",
};

// Mesma ordem de `days`. Cada dia tem blocos com título opcional.
const speakersByDay: SpeakerBlock[][] = [
  [
    {
      speakers: [
        {
          name: "Diogo Novo",
          photo: "diogo-novo.webp",
          linkedin: "https://www.linkedin.com/in/diogonascimentonovo/",
          talk: "Abertura",
        },
      ],
    },
    {
      speakers: [
        {
          ...marcelo,
          talk: "Computação Quântica no Mundo Real dos Negócios",
        },
        {
          name: "Carlos Rischioto",
          photo: "carlos-rischioto.webp",
          linkedin: "https://www.linkedin.com/in/rischioto/",
          talk: "Quantum Safe",
        },
      ],
    },
    {
      speakers: [
        {
          name: "Ana Paula Appel",
          photo: "ana-paula-appel.webp",
          linkedin: "https://www.linkedin.com/in/paulinhaappel/",
          talk: "Quantum 101: Visual e Intuitivo",
        },
      ],
    },
  ],
  [
    {
      speakers: [
        {
          name: "Glauco Reis",
          photo: "glauco-reis.webp",
          linkedin: "https://www.linkedin.com/in/glaucoreis/",
          talk: "Primeiros passos com Qiskit",
          tags: ["Workshop", "AMA"],
        },
        { ...marcelo, tags: ["AMA"] },
        { ...pfeifer, tags: ["AMA"] },
      ],
    },
  ],
  [
    {
      label: "Apresentação dos grupos de pesquisa",
      speakers: [
        {
          name: "Wildisley Filho",
          photo: "wildisley-filho.webp",
          linkedin: "https://www.linkedin.com/in/wildis-filho/",
          talk: "Segurança de Sistemas Quânticos",
          orgs: ["Inteli"],
        },
        {
          name: "Jaime Guedes",
          photo: "jaime-guedes.webp",
          linkedin:
            "https://www.linkedin.com/in/jaime-cavalcanti-guedes-7b55b2278/",
          talk: "Computação Quântica como Você Nunca Viu",
          orgs: ["USP"],
        },
        {
          name: "Júlia Santos",
          photo: "julia-santos.webp",
          linkedin: "https://www.linkedin.com/in/julia-vic-santos/",
          talk: "Escala de Dados na Computação Quântica aplicada a Saúde",
          orgs: ["FIAP", "UNESP"],
        },
        {
          name: "Pedro Merino",
          photo: "pedro-merino.webp",
          linkedin: "https://www.linkedin.com/in/pedrommerino/",
          talk: "O Grupo de Estudos de Computação Quântica do ITA",
          orgs: ["ITA", "USP"],
        },
      ],
    },
    {
      label: "Encerramento",
      speakers: [
        { ...pfeifer, talk: "Oportunidades, Mercado e Certificações" },
      ],
    },
  ],
];

function LinkedInLink({ href, name }: { href: string; name: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`LinkedIn de ${name}`}
      className="mt-1 text-[#78a9ff] hover:text-[#be95ff] transition-colors"
    >
      {/* lucide-react não tem mais ícones de marca; path do Simple Icons */}
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    </a>
  );
}

// side = lado da foto. Alterna por dia para dar ritmo à lista.
function SpeakerRow({
  speaker,
  side,
}: {
  speaker: Speaker;
  side: "left" | "right";
}) {
  // Faculdades em rosa, papéis em roxo
  const chips = [
    ...(speaker.orgs ?? []).map((label) => ({ label, color: "#ff7eb6" })),
    ...(speaker.tags ?? []).map((label) => ({ label, color: "#be95ff" })),
  ];
  return (
    <li
      className={`flex items-center gap-5 border border-[#343a3f] bg-[#21272a] p-5 ${
        side === "right" ? "flex-row-reverse text-right" : ""
      }`}
    >
      <Image
        src={`${BASE}/fotos/${speaker.photo}`}
        alt={speaker.name}
        width={160}
        height={160}
        className="h-20 w-20 sm:h-28 sm:w-28 shrink-0 object-cover"
      />
      <div
        className={`flex flex-col gap-1 ${
          side === "right" ? "items-end" : "items-start"
        }`}
      >
        <h4 className="text-lg font-normal text-[#f4f4f4]">{speaker.name}</h4>
        {chips.length > 0 && (
          <span className="flex flex-wrap gap-2">
            {chips.map((c) => (
              <span
                key={c.label}
                style={{ borderColor: c.color, color: c.color }}
                className="border px-2 py-0.5 text-xs font-medium uppercase tracking-widest"
              >
                {c.label}
              </span>
            ))}
          </span>
        )}
        {(speaker.talk || !speaker.tags) && (
          <p className="text-sm text-[#a8a8a8]">
            {speaker.talk ?? "Tema a definir"}
          </p>
        )}
        <LinkedInLink href={speaker.linkedin} name={speaker.name} />
      </div>
    </li>
  );
}

function Speakers() {
  return (
    <section
      id="palestrantes"
      className="bg-[#21272a] py-14 md:py-20 px-6 scroll-mt-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-3 mb-12 max-w-xl">
          <span className="text-xs font-medium tracking-widest uppercase text-[#be95ff]">
            Quem vai falar
          </span>
          <h2 className="text-3xl md:text-4xl font-light text-[#f4f4f4]">
            Palestrantes
          </h2>
        </div>

        {/* Hosts */}
        <h3 className="text-xs font-medium uppercase tracking-widest text-[#697077] mb-4">
          Hosts
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {hosts.map((h) => (
            <div
              key={h.name}
              className="bg-[#121619] border border-[#343a3f] p-5 flex items-center gap-5"
            >
              <Image
                src={`${BASE}/fotos/${h.photo}`}
                alt={h.name}
                width={160}
                height={160}
                className="h-20 w-20 sm:h-24 sm:w-24 shrink-0 object-cover"
              />
              <div className="flex flex-col gap-1">
                <span className="text-lg font-normal text-[#f4f4f4]">
                  {h.name}
                </span>
                <LinkedInLink href={h.linkedin} name={h.name} />
              </div>
            </div>
          ))}
        </div>

        {/* Um item expansível por dia; só um aberto por vez, Dia 1 abre por padrão */}
        <Accordion defaultValue={["dia-1"]} className="gap-4">
          {days.map((d, i) => (
            <AccordionItem
              key={d.day}
              value={`dia-${i + 1}`}
              className="bg-[#121619] border border-[#343a3f]"
            >
              <AccordionTrigger className="items-center rounded-none px-6 py-5 hover:no-underline">
                <span className="flex flex-col gap-1">
                  <span className="text-xs font-medium uppercase tracking-widest text-[#be95ff]">
                    {d.day} · {d.date}
                  </span>
                  <span className="text-base font-normal text-[#f4f4f4]">
                    {d.title}
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6">
                <div className="flex flex-col gap-6 pt-2 pb-4">
                  {speakersByDay[i].map((block, b) => (
                    <div key={b} className="flex flex-col gap-3">
                      {block.label && (
                        <h4 className="text-xs font-medium uppercase tracking-widest text-[#697077]">
                          {block.label}
                        </h4>
                      )}
                      {/* Desktop: a sessão ocupa a largura toda, dividida entre quem fala nela */}
                      <ul
                        className={`grid grid-cols-1 gap-4 ${
                          block.speakers.length === 2
                            ? "md:grid-cols-2"
                            : block.speakers.length === 3
                              ? "md:grid-cols-2 lg:grid-cols-3"
                              : block.speakers.length >= 4
                                ? "md:grid-cols-2"
                                : ""
                        }`}
                      >
                        {block.speakers.map((s) => (
                          <SpeakerRow
                            key={s.name}
                            speaker={s}
                            side={i % 2 === 0 ? "left" : "right"}
                          />
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

// Registration
// Location
// One calendar event per day, using the first and last times in `days`
const CALENDAR_DETAILS =
  "Evento híbrido de Computação Quântica. Transmissão online aberta a todos.";
const CALENDAR_LOCATION = "FIAP Paulista, Av. Paulista, 1106, São Paulo";

// "24 Nov" + "18:00" -> "20261124T210000Z" (São Paulo is UTC-3, no DST)
function toUtcStamp(date: string, time: string) {
  const iso = `2026-11-${date.slice(0, 2)}T${time}:00-03:00`;
  return new Date(iso).toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z";
}

const calendarEvents = days.map((d) => ({
  label: d.date.slice(0, 2) + "/11",
  title: `Qiskit Fall Fest 2026 · ${d.day}: ${d.title}`,
  start: toUtcStamp(d.date, d.schedule[0].time.split(" - ")[0]),
  end: toUtcStamp(d.date, d.schedule[d.schedule.length - 1].time.split(" - ")[1]),
}));

function googleCalendarUrl(e: (typeof calendarEvents)[0]) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: e.title,
    dates: `${e.start}/${e.end}`,
    details: CALENDAR_DETAILS,
    location: CALENDAR_LOCATION,
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

// ICS escapes commas with a backslash
const icsEscape = (s: string) => s.replace(/,/g, "\\,");

function Location() {
  // ICS download with all three days (works for Apple Calendar, Outlook, etc.)
  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Qiskit Fall Fest Brasil//PT-BR",
    ...calendarEvents.flatMap((e, i) => [
      "BEGIN:VEVENT",
      `UID:qff2026-dia${i + 1}@qiskitbrasil.com.br`,
      "DTSTAMP:20261020T000000Z",
      `DTSTART:${e.start}`,
      `DTEND:${e.end}`,
      `SUMMARY:${icsEscape(e.title)}`,
      `DESCRIPTION:${icsEscape(CALENDAR_DETAILS)}`,
      `LOCATION:${icsEscape(CALENDAR_LOCATION)}`,
      "END:VEVENT",
    ]),
    "END:VCALENDAR",
  ].join("\r\n");

  const icsUrl =
    "data:text/calendar;charset=utf-8," + encodeURIComponent(icsContent);

  return (
    <section id="local" className="bg-[#121619] py-16 md:py-24 px-6 scroll-mt-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-light text-[#f4f4f4] mb-12">
          Local
        </h2>

        <div className="flex flex-col gap-6">
          {/* In-person — text left, map right */}
          <div className="bg-[#21272a] flex flex-col md:flex-row overflow-hidden">
            <div className="p-8 flex flex-col gap-4 md:w-1/2">
              <div className="flex items-center gap-3">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: "#be95ff" }}
                />
                <span className="text-[#be95ff] text-sm font-medium uppercase tracking-widest">
                  Presencial
                </span>
              </div>
              <div>
                <p className="text-[#f4f4f4] text-xl font-light">
                  FIAP Paulista
                </p>
                <p className="text-[#a8a8a8] text-sm mt-1">
                  Av. Paulista, 1106 — Edifício Paulista, 1100
                </p>
                <p className="text-[#a8a8a8] text-sm">São Paulo, SP</p>
              </div>
              <p className="text-[#697077] text-sm">
                Vagas presenciais reservadas a estudantes FIAP.
              </p>
            </div>
            <div className="md:w-1/2 min-h-[220px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.12136423712!2d-46.65496142432668!3d-23.56408427879798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c7dbf9ff57%3A0x4ca8eb5c4f7ecca9!2sFIAP%20-%20Paulista!5e0!3m2!1spt-BR!2sbr!4v1789130579285!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0, display: "block", minHeight: "220px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="FIAP Paulista no Google Maps"
              />
            </div>
          </div>

          {/* Online — horizontal compact card */}
          <div className="bg-[#21272a] p-8 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-3 sm:w-32 flex-shrink-0">
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: "#ff7eb6" }}
              />
              <span className="text-[#ff7eb6] text-sm font-medium uppercase tracking-widest">
                Online
              </span>
            </div>
            <div>
              <p className="text-[#f4f4f4] text-xl font-light">
                Transmissão ao vivo
              </p>
              <p className="text-[#a8a8a8] text-sm mt-1">Aberto a todos.</p>
            </div>
          </div>
        </div>

        {/* Calendar CTAs — below both cards, for everyone */}
        <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3">
          <span className="text-[#697077] text-sm">
            Adicionar ao calendário:
          </span>
          <div className="flex flex-wrap gap-3">
            {calendarEvents.map((e) => (
              <a
                key={e.label}
                href={googleCalendarUrl(e)}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#343a3f] px-4 py-2 text-sm text-[#a8a8a8] hover:border-[#78a9ff] hover:text-[#78a9ff] transition-colors"
              >
                + Google: {e.label}
              </a>
            ))}
            <a
              href={icsUrl}
              download="qiskit-fall-fest-2026.ics"
              className="border border-[#343a3f] px-4 py-2 text-sm text-[#a8a8a8] hover:border-[#78a9ff] hover:text-[#78a9ff] transition-colors"
            >
              + Outlook / Apple
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// FAQ
const faqs: { question: string; answer: React.ReactNode }[] = [
  {
    question: "Preciso saber física, matemática ou programar?",
    answer:
      "Não. Toda a programação foi pensada para quem está começando do zero.",
  },
  {
    question: "Quanto custa?",
    answer: "Nada. O evento é gratuito.",
  },
  {
    question: "Quem pode participar presencialmente?",
    answer:
      "O presencial, na FIAP Paulista, é para estudantes da FIAP. Online, qualquer pessoa pode participar.",
  },
  {
    question: "Tem certificado?",
    answer:
      "Sim. Todo mundo que participar, presencial ou online, recebe um certificado de participação. Os vencedores do Challenge também recebem um certificado especial.",
  },
  {
    question: "As palestras ficam gravadas?",
    answer:
      "Sim. As palestras são transmitidas ao vivo pelo YouTube e ficam gravadas.",
  },
  {
    question: "Preciso levar notebook para o workshop?",
    answer:
      "No presencial, não: os laboratórios da FIAP já têm computadores. Mas você pode levar o seu, se preferir.",
  },
  {
    question: "Ainda tenho dúvidas. Com quem falo?",
    answer: (
      <>
        Mande um e-mail para{" "}
        <a href="mailto:bruno.otavio@ibm.com">bruno.otavio@ibm.com</a>.
      </>
    ),
  },
];

function Faq() {
  return (
    <section
      id="faq"
      className="bg-[#21272a] py-16 md:py-24 px-6 scroll-mt-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-3 mb-12 max-w-xl">
          <span className="text-xs font-medium tracking-widest uppercase text-[#be95ff]">
            Dúvidas
          </span>
          <h2 className="text-3xl md:text-4xl font-light text-[#f4f4f4]">
            Perguntas frequentes
          </h2>
        </div>

        <Accordion multiple className="gap-4">
          {faqs.map((f) => (
            <AccordionItem
              key={f.question}
              value={f.question}
              className="bg-[#121619] border border-[#343a3f]"
            >
              <AccordionTrigger className="items-center rounded-none px-6 py-5 text-base font-normal text-[#f4f4f4] hover:no-underline">
                {f.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-5 text-[#a8a8a8] leading-relaxed [&_a]:text-[#78a9ff] [&_a]:hover:text-[#be95ff]">
                {f.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function Registration() {
  return (
    <section id="inscricao" className="bg-[#121619] py-16 md:py-24 px-6 scroll-mt-16">
      <div
        className="h-1 max-w-6xl mx-auto mb-16"
        style={{
          background: "linear-gradient(to right, #0f62fe, #be95ff, #ff7eb6)",
        }}
      />

      <div className="mx-auto max-w-2xl flex flex-col items-center text-center gap-6">
        {/* sticker-01 (flamingo, faces right) · badge · sticker-03 (flipped to face left) */}
        <div className="flex items-center justify-center gap-4 sm:gap-10">
          <Image
            src={`${BASE}/assets/stickers/svg/sticker-01.svg`}
            alt=""
            width={96}
            height={96}
            className="w-16 sm:w-24"
          />
          <Image
            src={`${BASE}/assets/badges/badge-pink.svg`}
            alt="Qiskit Fall Fest 2026"
            width={150}
            height={150}
            className="w-24 sm:w-[150px]"
          />
          <Image
            src={`${BASE}/assets/stickers/svg/sticker-03.svg`}
            alt=""
            width={96}
            height={96}
            className="w-16 sm:w-24"
          />
        </div>
        <h2 className="text-3xl md:text-4xl font-light text-[#f4f4f4]">
          Garanta sua vaga
        </h2>
        <p className="text-[#a8a8a8] text-lg leading-relaxed max-w-md">
          Aberto para todos.
        </p>
        {/* Magenta 40 CTA */}
        <a
          href="https://forms.cloud.microsoft/r/YuW1uLvY6m"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#ff7eb6] px-8 py-4 text-[#121619] font-medium text-lg hover:bg-[#ee5396] transition-colors"
        >
          Inscrever-se agora →
        </a>
        <p className="text-[#697077] text-xs leading-relaxed max-w-sm">
          Ao se inscrever, você concorda com o uso e divulgação pública da sua
          imagem.
        </p>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-[#21272a] border-t border-[#343a3f] py-10 md:py-12 px-6 text-[#697077] text-sm">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="flex items-center gap-3">
          <Image
            src={`${BASE}/assets/badges/badge-pink.svg`}
            alt="Qiskit Fall Fest 2026"
            width={40}
            height={40}
          />
          <div>
            <p className="font-normal text-[#f4f4f4] text-sm">
              Qiskit Fall Fest 2026
            </p>
            <p className="text-xs text-[#697077]">Brasil</p>
          </div>
        </div>

        <nav className="flex flex-wrap gap-6 text-sm">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hover:text-[#be95ff] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="mt-8 border-t border-[#343a3f] pt-6 text-center text-xs text-[#697077]">
        © 2026 Qiskit Fall Fest Brasil
      </div>
    </footer>
  );
}

// Page
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Schedule />
        <Speakers />
        <Location />
        <Faq />
        <Registration />
      </main>
      <Footer />
    </>
  );
}
