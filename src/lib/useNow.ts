"use client";

import { useSyncExternalStore } from "react";

// Relógio que avisa o React a cada segundo
function subscribe(onTick: () => void) {
  const interval = setInterval(onTick, 1000);
  return () => clearInterval(interval);
}

// Só em dev: ?agora=2026-11-25T19:00 (horário de Brasília) simula outro momento
let offset: number | undefined;
function getOffset() {
  if (offset === undefined) {
    const fake =
      process.env.NODE_ENV === "development" &&
      new URLSearchParams(window.location.search).get("agora");
    offset = fake ? new Date(`${fake}:00-03:00`).getTime() - Date.now() : 0;
  }
  return offset;
}

const getNow = () => Math.floor((Date.now() + getOffset()) / 1000) * 1000;
// No HTML estático (e na hidratação) ainda não sabemos a hora do visitante
const getServerNow = () => null;

export function useNow() {
  return useSyncExternalStore(subscribe, getNow, getServerNow);
}
