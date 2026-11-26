"use client";

import Image from "next/image";
import { useState, useSyncExternalStore } from "react";
import { MenuIcon, XIcon } from "lucide-react";
import Countdown from "@/components/Countdown";
import { useNow } from "@/lib/useNow";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";

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

const DISCORD_URL = "https://discord.gg/Hub5RrnXgF";
// Slides e materiais de todas as apresentações
const DRIVE_URL = "https://drive.google.com/drive/folders/17p2GqY2bfR1mcfBeH6d2vHymrjG_uKAQ?usp=sharing";
// Material complementar: Quantum Enigmas no IBM SkillsBuild
const ENIGMAS_URL = "https://skills.yourlearning.ibm.com/activity/PLAN-034A5530450D";
const IBM_LEARNING_URL = "https://quantum.cloud.ibm.com/learning/en/courses";

// Challenge: o formulário de entrega fica no ar da abertura (24/11 18h) até 25/11 23h45.
// Do início do tempo do Challenge (25/11 18h30) até o fechamento o aviso ganha o gradiente.
const CHALLENGE_FORM_URL = "https://forms.cloud.microsoft/r/LMDE4TscnR";
const CHALLENGE_OPENS = new Date("2026-11-24T18:00:00-03:00").getTime();
const CHALLENGE_HIGHLIGHT_STARTS = new Date("2026-11-25T18:30:00-03:00").getTime();
const CHALLENGE_CLOSES = new Date("2026-11-25T23:45:00-03:00").getTime();

// Discord logo (lucide-react não tem ícones de marca; path do Simple Icons)
function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.865-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.11 13.11 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

// Faixa fina no topo, só depois que a pessoa rola para além do painel do topo.
// Da hora do Challenge até o fechamento ganha o gradiente roxo→rosa. A faixa toda é o link.
function ChallengeBanner() {
  const now = useNow();
  const panelHidden = usePanelHidden();
  if (!panelHidden || now === null || now < CHALLENGE_OPENS || now >= CHALLENGE_CLOSES)
    return null;
  const live = now >= CHALLENGE_HIGHLIGHT_STARTS;
  return (
    <a
      href={CHALLENGE_FORM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`block border-t border-[#343a3f] text-sm transition-colors ${
        live ? "text-[#121619]" : "bg-[#21272a] text-[#a8a8a8] hover:bg-[#343a3f]"
      }`}
      style={live ? { backgroundImage: "linear-gradient(to right, #be95ff, #ff7eb6)" } : undefined}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-6 py-2.5">
        <span
          className={`shrink-0 text-xs font-semibold uppercase tracking-widest ${
            live ? "" : "text-[#be95ff]"
          }`}
        >
          Challenge
        </span>
        {/* No celular só "Challenge" e o link, para caber numa linha */}
        <span className="min-w-0 flex-1 truncate">
          <span className="hidden sm:inline">Entregas até 25/11, 23h45</span>
        </span>
        <span className={`shrink-0 font-medium ${live ? "" : "text-[#ff7eb6]"}`}>
          Enviar entrega →
        </span>
      </div>
    </a>
  );
}

// Section links shared by the navbar (desktop + mobile menu) and the footer
const navLinks = [
  { href: "#sobre", label: "Sobre" },
  { href: "#programacao", label: "Programação" },
  { href: "#local", label: "Local" },
  { href: "#faq", label: "Dúvidas" },
  { href: "#inscricao", label: "Inscrição" },
];

// Depois do evento: sem inscrição, e a agenda vira "Gravações"
const postEventLinks = navLinks
  .filter((l) => l.href !== "#inscricao")
  .map((l) => (l.href === "#programacao" ? { ...l, label: "Gravações" } : l));

// Navbar
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const phase = useEventPhase();
  const over = phase === "over";
  const links = over ? postEventLinks : navLinks;

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
          {links.map((l) => (
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
          {/* Durante o evento a inscrição fica só na seção do fim da página */}
          {(phase === null || phase === "before") && (
            <a
              href="https://forms.cloud.microsoft/r/YuW1uLvY6m"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0f62fe] px-4 py-2 text-white font-medium hover:bg-[#4589ff] transition-colors"
            >
              Inscreva-se
            </a>
          )}
        </div>
      </nav>

      <LiveBanner />
      <ChallengeBanner />

      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden absolute top-full inset-x-0 bg-[#121619] border-b border-[#343a3f]"
        >
          <ul className="flex flex-col px-6 py-2">
            {links.map((l) => (
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
  const phase = useEventPhase();
  const over = phase === "over";
  if (phase === "during") return <EventHero />;
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
        {/* sm→lg: a ilustração some, então o conteúdo fica centralizado em vez de colado à esquerda */}
        <div className="flex flex-col gap-6 pointer-events-auto sm:items-center sm:text-center lg:items-start lg:text-left">
          <span className="text-xs font-medium tracking-widest uppercase text-[#be95ff]">
            {over
              ? "24–26 de novembro · FIAP + online"
              : "24–26 de novembro · FIAP + online · Gratuito"}
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

          {over ? (
            <>
              <p className="text-[#a8a8a8] text-lg leading-relaxed max-w-sm">
                Obrigado a todo mundo que participou, na FIAP e online. Nos vemos
                no ano que vem!
              </p>
              <MaterialsBlock className="w-full max-w-sm gap-4 p-6 text-left" />
            </>
          ) : (
            <>
              <p className="text-[#a8a8a8] text-lg leading-relaxed max-w-sm">
                Três dias de computação quântica para estudantes e entusiastas de
                todo o Brasil.
              </p>

              <Countdown />

              <div className="flex flex-wrap gap-3 mt-2 sm:justify-center lg:justify-start">
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

              {/* Discord como link secundário em linha própria: um 3º botão não cabe ao lado da ilustração */}
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="self-start sm:self-center lg:self-start inline-flex items-center gap-2 text-[#78a9ff] font-medium hover:text-[#be95ff] transition-colors"
              >
                <DiscordIcon className="size-5" />
                Entre no Discord do evento →
              </a>
            </>
          )}
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
// Quem fala. `role` aparece entre parênteses depois do nome; `orgs` são as faculdades.
type Speaker = {
  name: string;
  photo: string; // public/fotos
  linkedin: string;
  role?: string;
  orgs?: string[];
};

const bruno: Speaker = {
  name: "Bruno Otávio Carvalho",
  photo: "bruno-otavio-carvalho.webp",
  linkedin: "https://www.linkedin.com/in/bruno-otavio-carvalho/",
  role: "host",
};
const russi: Speaker = {
  name: "Alexandre Russi",
  photo: "alexandre-russi.webp",
  linkedin: "https://www.linkedin.com/in/alexandrerussi/",
  role: "host",
};
const marcelo: Speaker = {
  name: "Marcelo Morales",
  photo: "marcelo-morales.webp",
  linkedin: "https://www.linkedin.com/in/professor-mecchi/",
};
const glauco: Speaker = {
  name: "Glauco Reis",
  photo: "glauco-reis.webp",
  linkedin: "https://www.linkedin.com/in/glaucoreis/",
};
const pfeifer: Speaker = {
  name: "Alexandre Pfeifer",
  photo: "alexandre-pfeifer.webp",
  linkedin: "https://www.linkedin.com/in/alexandre-pfeifer-a4a47/",
};

type Session = {
  time: string;
  label: string;
  note?: string;
  live?: string;
  notebook?: string;
  speakers?: Speaker[];
  talks?: { label: string; speakers: Speaker[] }[];
};

const days: { day: string; date: string; title: string; schedule: Session[] }[] = [
  {
    day: "Dia 1",
    date: "24 Nov",
    title: "Introdução",
    // `live`: link da transmissão no YouTube (uma por dia; no dia 2, uma para o workshop e outra para o AMA).
    // Durante a sessão vira o botão "ao vivo"; depois que ela termina, o mesmo link guarda a gravação.
    // `notebook`: link do notebook no Colab; aparece na manchete durante a sessão e fica sempre na agenda
    // `speakers`: quem fala na sessão; as fotos também aparecem no destaque do topo no desktop
    // `talks`: sessões com várias apresentações (grupos de pesquisa), cada uma com quem apresenta
    schedule: [
      {
        time: "18:00 - 18:30",
        label: "Abertura",
        note: "Lançamento do Challenge",
        live: "https://youtube.com/live/BNZor37SvbQ",
        speakers: [
          {
            name: "Diogo Novo",
            photo: "diogo-novo.webp",
            linkedin: "https://www.linkedin.com/in/diogonascimentonovo/",
          },
          bruno,
          russi,
        ],
      },
      {
        time: "18:30 - 19:00",
        label: "Computação Quântica no Mundo Real dos Negócios",
        live: "https://youtube.com/live/BNZor37SvbQ",
        speakers: [marcelo],
      },
      {
        time: "19:00 - 19:45",
        label: "Quantum Safe",
        live: "https://youtube.com/live/BNZor37SvbQ",
        speakers: [
          {
            name: "Carlos Rischioto",
            photo: "carlos-rischioto.webp",
            linkedin: "https://www.linkedin.com/in/rischioto/",
          },
        ],
      },
      {
        time: "19:45 - 20:30",
        label: "Quantum 101: Visual e Intuitivo",
        live: "https://youtube.com/live/BNZor37SvbQ",
        speakers: [glauco],
      },
    ],
  },
  {
    day: "Dia 2",
    date: "25 Nov",
    title: "Workshop & Challenge",
    schedule: [
      {
        time: "15:00 - 18:00",
        label: "Workshop: Primeiros Passos com Qiskit",
        live: "https://youtube.com/live/w9CU7NASuyI",
        notebook: "https://colab.research.google.com/drive/1Q9nsaA1-ukRqV4JtVREry0VcYedAyfru?usp=sharing",
        speakers: [glauco],
      },
      { time: "18:00 - 18:30", label: "Intervalo" },
      {
        time: "18:30 - 20:00",
        label: "Challenge: Quantum Pitch",
      },
      {
        time: "18:30 - 20:00",
        label: "AMA com Pessoas da Área",
        note: "Simultâneo ao Challenge",
        live: "https://youtube.com/live/yoDFFdhWdFA",
        speakers: [marcelo, glauco, pfeifer],
      },
    ],
  },
  {
    day: "Dia 3",
    date: "26 Nov",
    title: "Grupos de Pesquisa & Encerramento",
    schedule: [
      // Uma transmissão só para o dia todo
      {
        time: "18:00 - 19:10",
        label: "Apresentações de Grupos de Pesquisa e Estudo",
        note: "Projetos e mentoria para quem está começando",
        live: "https://youtube.com/live/YXCl8OG8z3w",
        talks: [
          {
            label: "Entanglion: Computação Quântica como Você Nunca Viu",
            speakers: [
              {
                name: "Jaime Guedes",
                photo: "jaime-guedes.webp",
                linkedin:
                  "https://www.linkedin.com/in/jaime-cavalcanti-guedes-7b55b2278/",
                orgs: ["USP"],
              },
              {
                name: "Vinicius Cunha",
                photo: "vinicius-cunha.webp",
                linkedin: "https://www.linkedin.com/in/vcunhadev/",
                orgs: ["USP"],
              },
              {
                name: "Estevon Bonai",
                photo: "estevon-bonai.webp",
                linkedin:
                  "https://www.linkedin.com/in/estevon-biazussi-bonai-b0188b302/",
                orgs: ["USP"],
              },
              {
                name: "Marcos Chaim",
                photo: "marcos-chaim.webp",
                linkedin:
                  "https://www.linkedin.com/in/marcos-lordello-chaim-ba5782382/",
                role: "orientador",
                orgs: ["USP"],
              },
            ],
          },
          {
            label: "O Grupo de Estudos de Computação Quântica do ITA",
            speakers: [
              {
                name: "Pedro Merino",
                photo: "pedro-merino.webp",
                linkedin: "https://www.linkedin.com/in/pedrommerino/",
                orgs: ["ITA"],
              },
            ],
          },
          {
            label: "Segurança de Sistemas Quânticos",
            speakers: [
              {
                name: "Wildisley Filho",
                photo: "wildisley-filho.webp",
                linkedin: "https://www.linkedin.com/in/wildis-filho/",
                orgs: ["Inteli"],
              },
            ],
          },
          {
            label: "Escala de Dados na Computação Quântica aplicada a Saúde",
            speakers: [
              {
                name: "Júlia Santos",
                photo: "julia-santos.webp",
                linkedin: "https://www.linkedin.com/in/julia-vic-santos/",
                orgs: ["FIAP", "UNESP"],
              },
            ],
          },
        ],
      },
      {
        time: "19:10 - 19:50",
        label: "Oportunidades, Mercado e Certificações",
        live: "https://youtube.com/live/YXCl8OG8z3w",
        speakers: [pfeifer],
      },
      {
        time: "19:50 - 20:10",
        label: "Dinâmica",
        note: "Valendo prêmios da IBM Quantum (somente para o público presencial)",
      },
      {
        time: "20:10 - 20:30",
        label: "Anúncio dos Vencedores do Challenge e Encerramento",
        live: "https://youtube.com/live/YXCl8OG8z3w",
        speakers: [bruno, russi],
      },
    ],
  },
];

// "24 Nov" + "18:00" -> timestamp (São Paulo é UTC-3, sem horário de verão)
function toMs(date: string, time: string) {
  return new Date(`2026-11-${date.slice(0, 2)}T${time}:00-03:00`).getTime();
}

// Fim do anúncio dos vencedores: a partir daqui o site vira a versão de agradecimento
const EVENT_ENDS = toMs("26 Nov", "20:30");

// Meia hora antes da abertura o topo do site troca a contagem regressiva pelo painel do evento
const EVENT_PANEL_STARTS = toMs("24 Nov", "17:30");

function useEventPhase() {
  const now = useNow();
  if (now === null) return null;
  if (now >= EVENT_ENDS) return "over";
  if (now >= EVENT_PANEL_STARTS) return "during";
  return "before";
}

function useEventOver() {
  return useEventPhase() === "over";
}

// O painel do topo (data-agora) já saiu da tela? As faixas fixas só aparecem a partir daí.
function subscribeScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange);
  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
  };
}
const getPanelHidden = () => {
  // Celular e desktop têm cada um o seu painel; vale o que está visível
  const panel = Array.from(document.querySelectorAll("[data-agora]")).find(
    (el) => el.getClientRects().length > 0,
  );
  return panel !== undefined && panel.getBoundingClientRect().bottom < 80;
};
function usePanelHidden() {
  return useSyncExternalStore(subscribeScroll, getPanelHidden, () => false);
}

// Todas as sessões com transmissão, em ordem
const streams = days.flatMap((d, dayIndex) =>
  d.schedule.flatMap((s) => {
    if (!s.live) return [];
    const [start, end] = s.time.split(" - ");
    return [
      {
        dayIndex,
        label: s.label,
        startTime: start,
        url: s.live,
        notebook: s.notebook,
        faces: (s.speakers ?? s.talks?.flatMap((t) => t.speakers) ?? []).map((p) => p.photo),
        start: toMs(d.date, start),
        end: toMs(d.date, end),
      },
    ];
  }),
);

// Sessão ao vivo agora, ou a próxima se começa em até 30 min
function useLiveStream() {
  const now = useNow();
  if (now === null) return {};
  const current = streams.find((s) => now >= s.start && now < s.end);
  const next = current
    ? undefined
    : streams.find((s) => s.start > now && s.start - now <= 30 * 60 * 1000);
  return { current, next };
}

// Bolinha pulsante de "ao vivo"
function LiveDot({ color }: { color: string }) {
  return (
    <span className="relative flex size-2.5 shrink-0">
      <span
        className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
        style={{ background: color }}
      />
      <span className="relative inline-flex size-2.5 rounded-full" style={{ background: color }} />
    </span>
  );
}

// YouTube logo (path do Simple Icons)
function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

// Faixa azul fina no topo, só depois que a pessoa rola para além do painel do topo.
// A faixa toda é o link.
function LiveBanner() {
  const { current } = useLiveStream();
  const panelHidden = usePanelHidden();
  if (!current || !panelHidden) return null;
  return (
    <a
      href={current.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-[#0f62fe] text-sm text-white hover:bg-[#0050e6] transition-colors"
    >
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-6 py-2.5">
        <LiveDot color="#ffffff" />
        <span className="shrink-0 text-xs font-semibold uppercase tracking-widest">
          Ao vivo
        </span>
        <span className="min-w-0 flex-1 truncate">{current.label}</span>
        <span className="shrink-0 inline-flex items-center gap-2 font-medium">
          <YouTubeIcon className="size-4" />
          Assistir →
        </span>
      </div>
    </a>
  );
}

// ---- Topo da página durante o evento ----

// O que está acontecendo agora: transmissão (ao vivo, começando em até 30 min, ou a próxima)
// e se o formulário do Challenge está aberto / em destaque
function useEventNow() {
  const now = useNow();
  const { current, next } = useLiveStream();
  const stream =
    now === null ? undefined : (current ?? next ?? streams.find((s) => s.start > now));
  return {
    current,
    next,
    stream,
    challengeOpen: now !== null && now >= CHALLENGE_OPENS && now < CHALLENGE_CLOSES,
    challengeHot: now !== null && now >= CHALLENGE_HIGHLIGHT_STARTS && now < CHALLENGE_CLOSES,
  };
}

function Year2026() {
  return (
    <span
      className="bg-clip-text text-transparent"
      style={{ backgroundImage: "linear-gradient(to right, #be95ff, #ff7eb6)" }}
    >
      2026
    </span>
  );
}

// Transmissão: azul quando está ao vivo, neutra quando é só aviso da próxima
function StreamBlock({
  className = "",
  titleClass = "text-lg",
  buttonClass = "",
  showFaces = false,
}: {
  className?: string;
  titleClass?: string;
  buttonClass?: string;
  showFaces?: boolean;
}) {
  const { current, next, stream } = useEventNow();
  if (!stream) return null;
  return (
    <div
      className={`flex flex-col gap-3 p-5 ${
        current ? "bg-[#0f62fe] text-white" : "bg-[#21272a] text-[#f4f4f4]"
      } ${className}`}
    >
      <span
        className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-widest ${
          current ? "" : "text-[#78a9ff]"
        }`}
      >
        {current ? (
          <>
            <LiveDot color="#ffffff" /> Ao vivo agora
          </>
        ) : next ? (
          `Começa às ${stream.startTime}`
        ) : (
          `Próxima transmissão · ${days[stream.dayIndex].date.slice(0, 2)}/11, ${stream.startTime}`
        )}
      </span>
      <p className={`font-light leading-snug ${titleClass}`}>{stream.label}</p>
      {/* Só os rostos de quem fala, sem nomes */}
      {showFaces && stream.faces.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {stream.faces.map((f) => (
            <Image
              key={f}
              src={`${BASE}/fotos/${f}`}
              alt=""
              width={160}
              height={160}
              className={`size-16 xl:size-20 object-cover border-2 ${
                current ? "border-white/40" : "border-[#343a3f]"
              }`}
            />
          ))}
        </div>
      )}
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {(current || next) && (
          <a
            href={stream.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center gap-2 px-5 py-3 font-medium transition-colors ${
              current
                ? "bg-white text-[#0f62fe] hover:bg-[#e0e0e0]"
                : "bg-[#0f62fe] text-white hover:bg-[#4589ff]"
            } ${buttonClass}`}
          >
            <YouTubeIcon className="size-5" />
            Assistir no YouTube
          </a>
        )}
        {current && stream.notebook && (
          <a
            href={stream.notebook}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center gap-2 border border-white px-5 py-3 font-medium text-white hover:bg-white/10 transition-colors ${buttonClass}`}
          >
            Abrir o notebook no Colab →
          </a>
        )}
      </div>
    </div>
  );
}

// Challenge: só enquanto o formulário está aberto; gradiente a partir do horário do Challenge
function ChallengeBlock({
  className = "",
  buttonClass = "",
}: {
  className?: string;
  buttonClass?: string;
}) {
  const { challengeOpen, challengeHot } = useEventNow();
  if (!challengeOpen) return null;
  return (
    <div
      className={`flex flex-col gap-3 p-5 ${
        challengeHot ? "text-[#121619]" : "bg-[#21272a] text-[#f4f4f4]"
      } ${className}`}
      style={
        challengeHot
          ? { backgroundImage: "linear-gradient(to right, #be95ff, #ff7eb6)" }
          : undefined
      }
    >
      <span
        className={`text-xs font-semibold uppercase tracking-widest ${
          challengeHot ? "" : "text-[#be95ff]"
        }`}
      >
        Challenge: Quantum Pitch
      </span>
      <p className={challengeHot ? "" : "text-sm text-[#a8a8a8]"}>
        Envie a entrega da sua equipe até 25/11, às 23h45.
      </p>
      <a
        href={CHALLENGE_FORM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`${
          challengeHot
            ? "inline-flex justify-center bg-[#121619] px-5 py-3 text-white font-medium hover:bg-[#343a3f]"
            : "self-start font-medium text-[#ff7eb6] hover:text-[#ee5396]"
        } transition-colors ${buttonClass}`}
      >
        Enviar entrega →
      </a>
    </div>
  );
}

// Materiais para continuar estudando: gradiente roxo→rosa na diagonal, na manchete
function MaterialsBlock({ className = "" }: { className?: string }) {
  const links = [
    { href: ENIGMAS_URL, label: "Quantum Enigmas" },
    { href: IBM_LEARNING_URL, label: "IBM Quantum Learning" },
  ];
  return (
    <div
      className={`flex flex-col gap-3 p-5 text-[#121619] ${className}`}
      style={{ backgroundImage: "linear-gradient(135deg, #be95ff, #ff7eb6)" }}
    >
      <span className="text-xs font-semibold uppercase tracking-widest">
        Continue aprendendo
      </span>
      <p>Cursos gratuitos da IBM para seguir estudando computação quântica.</p>
      <div className="flex flex-wrap gap-2">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex justify-center bg-[#121619] px-5 py-3 text-white font-medium hover:bg-[#343a3f] transition-colors"
          >
            {l.label} →
          </a>
        ))}
      </div>
    </div>
  );
}

function DiscordRow({ className = "" }: { className?: string }) {
  return (
    <a
      href={DISCORD_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-3 bg-[#21272a] p-5 text-sm text-[#a8a8a8] hover:text-[#be95ff] transition-colors ${className}`}
    >
      <DiscordIcon className="size-5 shrink-0 text-[#78a9ff]" />
      <span className="flex-1">Avisos e dúvidas no Discord</span>
      <span>→</span>
    </a>
  );
}

// Painel empilhado: transmissão, Challenge e Discord, nessa ordem
function EventPanel({ className = "" }: { className?: string }) {
  return (
    <div
      data-agora
      className={`flex w-full flex-col gap-px border border-[#343a3f] bg-[#343a3f] ${className}`}
    >
      <StreamBlock />
      <ChallengeBlock />
      <MaterialsBlock />
      <DiscordRow />
    </div>
  );
}

const eventLabel = "24–26 de novembro · FIAP + online";

// Desktop: a sessão ao vivo (ou a próxima) vira a manchete; Challenge e Discord numa coluna ao lado.
// Sem Challenge (dia 3), os materiais para continuar estudando ocupam o lugar dele.
function EventHeroDesktop() {
  const { challengeOpen } = useEventNow();
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16">
      {/* Badge e nome à esquerda, data e formato no canto direito */}
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Image
            src={`${BASE}/assets/badges/badge-dark.png`}
            alt="Qiskit Fall Fest 2026"
            width={56}
            height={56}
          />
          <h1 className="text-lg font-normal text-[#f4f4f4]">
            Qiskit Fall Fest <Year2026 />
          </h1>
        </div>
        <span className="text-xs font-medium tracking-widest uppercase text-[#be95ff]">
          {eventLabel}
        </span>
      </div>
      <div
        data-agora
        className="grid grid-cols-[1fr_22rem] xl:grid-cols-[1fr_26rem] gap-px border border-[#343a3f] bg-[#343a3f]"
      >
        <StreamBlock
          className="justify-center gap-6 p-10 xl:p-12 min-h-[24rem]"
          titleClass="text-4xl xl:text-5xl leading-tight"
          buttonClass="self-start px-8 py-4 text-lg"
          showFaces
        />
        {challengeOpen ? (
          <div className="flex flex-col gap-px">
            <ChallengeBlock className="flex-1 justify-center gap-4 p-10" />
            <DiscordRow className="px-10 py-6" />
          </div>
        ) : (
          <div className="flex flex-col gap-px">
            <MaterialsBlock className="flex-1 justify-center gap-4 p-10" />
            <DiscordRow className="px-10 py-6" />
          </div>
        )}
      </div>
    </div>
  );
}

function EventHero() {
  return (
    <section className="bg-[#121619]">
      {/* Celular e tablet: título e painel empilhados */}
      <div className="mx-auto flex max-w-xl flex-col gap-6 px-6 py-14 lg:hidden">
        <span className="text-xs font-medium tracking-widest uppercase text-[#be95ff]">
          {eventLabel}
        </span>
        <h1 className="text-[13vw] sm:text-5xl font-light text-[#e0e0e0] leading-tight">
          Qiskit Fall Fest <Year2026 />
        </h1>
        <EventPanel />
      </div>
      <div className="hidden lg:block">
        <EventHeroDesktop />
      </div>
    </section>
  );
}

// Fotos redondas de quem fala, todas do mesmo tamanho.
// Celular: uma embaixo da outra. Do tablet para cima: duas por linha.
function Faces({ speakers }: { speakers: Speaker[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {speakers.map((s) => (
        <Image
          key={s.name}
          src={`${BASE}/fotos/${s.photo}`}
          alt={s.name}
          width={160}
          height={160}
          className="size-16 rounded-full object-cover border-2 border-[#be95ff]"
        />
      ))}
    </div>
  );
}

// "Ana, Beto (host) e Caio · USP / FIAP". Cada nome leva ao LinkedIn.
function Byline({ speakers }: { speakers: Speaker[] }) {
  const orgs = [...new Set(speakers.flatMap((s) => s.orgs ?? []))];
  return (
    <p className="text-sm text-[#a8a8a8] leading-relaxed">
      {speakers.map((s, i) => (
        <span key={s.name}>
          {i > 0 && (i === speakers.length - 1 ? " e " : ", ")}
          <a
            href={s.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#c1c7cd] underline-offset-4 hover:text-[#be95ff] hover:underline transition-colors"
          >
            {s.name}
          </a>
          {s.role && ` (${s.role})`}
        </span>
      ))}
      {orgs.length > 0 && ` · ${orgs.join(" / ")}`}
    </p>
  );
}

// Uma linha da agenda: fotos à esquerda, horário, título e quem fala à direita
function SessionRow({
  item,
  isLive,
  ended,
  over,
}: {
  item: Session;
  isLive: boolean;
  ended: boolean;
  over: boolean;
}) {
  return (
    <li className="flex flex-col gap-5 py-6 first:pt-0 last:pb-0">
      <div className="flex gap-4 sm:gap-5">
        <div className="w-16 sm:w-[136px] shrink-0">
          {item.speakers && <Faces speakers={item.speakers} />}
        </div>
        <div className="flex min-w-0 flex-col gap-1">
          {!over && (
            <span className="text-xs font-medium tabular-nums text-[#be95ff]">
              {item.time}
            </span>
          )}
          <h4 className="text-base sm:text-lg font-normal text-[#f4f4f4] leading-snug">
            {item.label}
          </h4>
          {item.speakers && <Byline speakers={item.speakers} />}
          {item.note && <p className="text-xs text-[#697077]">{item.note}</p>}
          {item.live && isLive && (
            <a
              href={item.live}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 self-start inline-flex items-center gap-2 bg-[#0f62fe] px-4 py-2 text-sm text-white font-medium hover:bg-[#4589ff] transition-colors"
            >
              <LiveDot color="#ffffff" />
              Ao vivo agora · Assistir no YouTube
            </a>
          )}
          {item.live && ended && (
            <a
              href={item.live}
              target="_blank"
              rel="noopener noreferrer"
              className={
                over
                  ? "mt-2 self-start inline-flex items-center gap-2 bg-[#0f62fe] px-4 py-2 text-sm text-white font-medium hover:bg-[#4589ff] transition-colors"
                  : "mt-1 self-start inline-flex items-center gap-2 text-sm font-medium text-[#78a9ff] hover:text-[#be95ff] transition-colors"
              }
            >
              <YouTubeIcon className="size-4" />
              Assistir à gravação →
            </a>
          )}
          {item.notebook && (
            <a
              href={item.notebook}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 self-start text-sm font-medium text-[#78a9ff] hover:text-[#be95ff] transition-colors"
            >
              Abrir o notebook no Colab →
            </a>
          )}
        </div>
      </div>
      {/* Apresentações dentro da mesma sessão, uma por linha */}
      {item.talks?.map((t) => (
        <div key={t.label} className="flex gap-4 sm:gap-5">
          <div className="w-16 sm:w-[136px] shrink-0">
            <Faces speakers={t.speakers} />
          </div>
          <div className="flex min-w-0 flex-col gap-1">
            <h5 className="text-base font-normal text-[#f4f4f4] leading-snug">
              {t.label}
            </h5>
            <Byline speakers={t.speakers} />
          </div>
        </div>
      ))}
    </li>
  );
}

// Dia de hoje (0, 1 ou 2), ou -1 fora do evento
function useTodayIndex() {
  const now = useNow();
  if (now === null) return -1;
  return days.findIndex((d) => {
    const start = toMs(d.date, "00:00");
    return now >= start && now < start + 24 * 60 * 60 * 1000;
  });
}

// Agenda e palestrantes juntos: uma aba por dia, abre no dia de hoje
function Schedule() {
  const [picked, setPicked] = useState<number | null>(null);
  const today = useTodayIndex();
  const { current } = useLiveStream();
  const now = useNow();
  const over = useEventOver();
  const active = picked ?? Math.max(today, 0);

  return (
    <section
      id="programacao"
      className="bg-[#121619] py-14 md:py-20 px-6 scroll-mt-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-3 mb-10 max-w-xl">
          <span className="text-xs font-medium tracking-widest uppercase text-[#be95ff]">
            24 - 26 de Novembro de 2026
          </span>
          <h2 className="text-3xl md:text-4xl font-light text-[#f4f4f4]">
            {over ? "Gravações" : "Programação"}
          </h2>
          <p className="text-[#a8a8a8] text-lg">
            {over
              ? "Assista às palestras e ao workshop quando quiser."
              : "Três dias de palestras, workshop e desafio. Presencial para estudantes da FIAP, online para todo o Brasil e gratuito."}
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            <a
              href={DRIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[#78a9ff] px-5 py-3 font-medium text-[#78a9ff] hover:bg-[#78a9ff] hover:text-[#121619] transition-colors"
            >
              Slides e materiais no Drive →
            </a>
            <a
              href={ENIGMAS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[#78a9ff] px-5 py-3 font-medium text-[#78a9ff] hover:bg-[#78a9ff] hover:text-[#121619] transition-colors"
            >
              Quantum Enigmas (IBM SkillsBuild) →
            </a>
          </div>
        </div>

        <TabsPrimitive.Root
          value={active}
          onValueChange={(v) => setPicked(v as number)}
        >
          <TabsPrimitive.List className="grid grid-cols-3 border-b border-[#343a3f]">
            {days.map((d, i) => (
              <TabsPrimitive.Tab
                key={d.day}
                value={i}
                className="flex flex-col items-start gap-1 border-t-2 border-transparent px-3 py-3 sm:px-5 sm:py-4 text-left cursor-pointer transition-colors hover:bg-[#21272a] data-[active]:border-[#be95ff] data-[active]:bg-[#21272a] outline-none focus-visible:outline-2 focus-visible:outline-[#0f62fe]"
              >
                <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#be95ff]">
                  {d.day}
                  {current?.dayIndex === i && <LiveDot color="#78a9ff" />}
                </span>
                <span className="text-sm text-[#a8a8a8]">{d.date}</span>
              </TabsPrimitive.Tab>
            ))}
          </TabsPrimitive.List>

          {/* keepMounted deixa os outros dias no HTML (busca e Ctrl+F) */}
          {days.map((d, i) => (
            <TabsPrimitive.Panel
              key={d.day}
              value={i}
              keepMounted
              className="bg-[#21272a] p-6 sm:p-10 outline-none"
            >
              <h3 className="text-xl sm:text-2xl font-light text-[#f4f4f4] mb-8">
                {d.title}
              </h3>
              <ul className="flex flex-col divide-y divide-[#343a3f]">
                {/* Depois do evento, só as sessões que têm vídeo */}
                {d.schedule.filter((item) => !over || item.live).map((item) => (
                  <SessionRow
                    key={item.time + item.label}
                    item={item}
                    isLive={current?.label === item.label}
                    ended={now !== null && now >= toMs(d.date, item.time.split(" - ")[1])}
                    over={over}
                  />
                ))}
              </ul>
            </TabsPrimitive.Panel>
          ))}
        </TabsPrimitive.Root>
      </div>
    </section>
  );
}

// Registration
// Location
// One calendar event per day, using the first and last times in `days`
const CALENDAR_DETAILS =
  "Evento híbrido de Computação Quântica. Transmissão online aberta a todos.";
const CALENDAR_LOCATION = "FIAP Paulista, Av. Paulista, 1106, 6º andar, São Paulo";

// "24 Nov" + "18:00" -> "20261124T210000Z"
function toUtcStamp(date: string, time: string) {
  return new Date(toMs(date, time)).toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z";
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
  const over = useEventOver();
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
                  Av. Paulista, 1106 — Edifício Paulista, 1100, 6º andar
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

        {/* Calendar CTAs — below both cards, for everyone, until the event ends */}
        <div className={`${over ? "hidden" : "flex"} mt-8 flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3`}>
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

        <Accordion multiple hiddenUntilFound className="gap-4">
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
  const over = useEventOver();
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
        {over ? (
          <>
            <h2 className="text-3xl md:text-4xl font-light text-[#f4f4f4]">
              Obrigado por fazer parte
            </h2>
            <p className="text-[#a8a8a8] text-lg leading-relaxed max-w-md">
              Foram três dias de computação quântica com gente de todo o Brasil.
              Nos vemos no Qiskit Fall Fest do ano que vem!
            </p>
          </>
        ) : (
          <>
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
              Ao se inscrever, você concorda com o uso e divulgação pública da
              sua imagem.
            </p>
            {/* Secundário em Blue 40 (o azul do hover dos botões de calendário) */}
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 border border-[#78a9ff] px-4 py-2 text-sm text-[#78a9ff] font-medium hover:bg-[#78a9ff]/10 transition-colors"
            >
              <DiscordIcon className="size-4" />
              Fale com a gente
            </a>
          </>
        )}
      </div>
    </section>
  );
}

// Footer
function Footer() {
  const over = useEventOver();
  const links = over ? postEventLinks : navLinks;
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
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hover:text-[#be95ff] transition-colors"
            >
              {l.label}
            </a>
          ))}
          {!over && (
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-[#be95ff] transition-colors"
            >
              <DiscordIcon className="size-4" />
              Discord
            </a>
          )}
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
        <Location />
        <Faq />
        <Registration />
      </main>
      <Footer />
    </>
  );
}
