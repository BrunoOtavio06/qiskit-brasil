# Qiskit Fall Fest 2026

Website for the Qiskit Fall Fest 2026 edition hosted in FIAP (São Paulo, Brazil). Built with [Next.js](https://nextjs.org).

## About the event

Qiskit Fall Fest is a Qiskit community event held at universities across the world. This edition runs **November 24–26** in a hybrid format — in-person at FIAP (Faculdade de Informática e Administração Paulista) and virtually open to students from any university.

The program includes talks, a workshop, and the Challenge: Quantum Pitch (teams pitch a project idea that uses quantum computing, no coding required), all aimed at beginners with no prior background in math, physics, or programming.

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Planned after the event

- Upgrade `next` and `eslint-config-next` from 16.3.1 to 16.3.8 or later. `npm audit` flags 16.3.1 as critical, but the advisories are about Next's server, which the static GitHub Pages export doesn't run, so it was left for after the event.
