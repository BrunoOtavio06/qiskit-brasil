"use client";

import { useEffect, useState } from "react";

const EVENT_DATE = new Date("2026-11-24T00:00:00");

function getTimeLeft() {
  const diff = EVENT_DATE.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (timeLeft === null) {
    return (
      <p className="text-[#31135E] font-semibold text-lg">
        O evento começou!
      </p>
    );
  }

  const units = [
    { label: "Dias", value: timeLeft.days },
    { label: "Horas", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Seg", value: timeLeft.seconds },
  ];

  return (
    <div className="flex items-center gap-3">
      {units.map(({ label, value }, i) => (
        <div key={label} className="flex items-center gap-3">
          <div className="flex flex-col items-center bg-white/70 backdrop-blur border border-[#BE95FF]/40 rounded-xl px-4 py-2 min-w-[60px]">
            <span className="text-2xl font-bold text-[#31135E] tabular-nums leading-none">
              {String(value).padStart(2, "0")}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#8B3FFC] mt-1">
              {label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span className="text-xl font-bold text-[#31135E]/40 -mt-3">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
