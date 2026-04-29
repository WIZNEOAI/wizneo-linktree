# Project

## Mission

Provide a branded Matrix-style link hub for WIZNEO with customizable profile content, social links, and animated frontend presentation.

## Current Stage

Static frontend repo onboarded into WiZNEO with build validation completed.

## Primary Repo

`/root/wizneo-linktree`

## Owners

- Ulises Arellano
- WIZNEOAI

## Active Constraints

- Repo currently carries both `package-lock.json` and `bun.lockb`, which leaves package-manager intent ambiguous.
- `npm install` surfaced 16 vulnerabilities in the dependency graph.
- Vite build emits a stale `baseline-browser-mapping` warning during production build.
