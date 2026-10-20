"use client";

import { useSyncExternalStore } from "react";

const EVENT_DATE = new Date("2026-11-24T18:00:00-03:00");

function getTimeLeft(now: number) {
  const diff = EVENT_DATE.getTime() - now;
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

// Relógio que avisa o React a cada segundo
function subscribe(onTick: () => void) {
  const interval = setInterval(onTick, 1000);
  return () => clearInterval(interval);
}
const getNow = () => Math.floor(Date.now() / 1000) * 1000;
// No HTML estático (e na hidratação) ainda não sabemos a hora do visitante
const getServerNow = () => null;

export default function Countdown() {
  const now = useSyncExternalStore(subscribe, getNow, getServerNow);
  const timeLeft = now === null ? undefined : getTimeLeft(now);

  if (timeLeft === null) {
    return (
      // Purple 40, o mesmo roxo dos rótulos do site, legível no fundo escuro
      <p className="text-[#be95ff] font-semibold text-lg">
        O evento começou!
      </p>
    );
  }

  // Antes de carregar, mostra "--" em vez de "O evento começou!"
  const units = [
    { label: "Dias", value: timeLeft?.days },
    { label: "Horas", value: timeLeft?.hours },
    { label: "Min", value: timeLeft?.minutes },
    { label: "Seg", value: timeLeft?.seconds },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {units.map(({ label, value }, i) => (
        <div key={label} className="flex items-center gap-2">
          <div className="flex flex-col items-center bg-white/70 backdrop-blur border border-[#BE95FF]/40 rounded-xl px-3 py-2 min-w-[52px]">
            <span className="text-xl sm:text-2xl font-semibold text-[#31135E] tabular-nums leading-none">
              {value === undefined ? "--" : String(value).padStart(2, "0")}
            </span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-[#8B3FFC] mt-1">
              {label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span className="text-base sm:text-xl font-normal text-[#31135E]/40 -mt-3">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
