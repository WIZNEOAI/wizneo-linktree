# Task Contract

## ID

WZN-WLT-0001

## Status

done

## Branch

`task/wzn-wlt-0001-baseline-onboarding`

## Worktree

`../wzn-wlt-0001-baseline-onboarding`

## Objective

Onboard wizneo-linktree into WiZNEO with baseline memory, recovery artifacts, and repo-specific next-step planning.

## Agent

Engineering Lead Agent

## Context Files

- `README.md`
- `package.json`
- `.gitignore`
- `.wizneo/reports/PROJECT_AUDIT.md`
- `src/hooks/useAnalytics.ts`
- `src/components/ErrorBoundary.tsx`

## Allowed Files

- `.gitignore`
- `.env.example`
- `.wizneo/**`
- `docs/contracts/WZN-WLT-0001-baseline-onboarding.md`
- `docs/handoffs/WZN-WLT-0001-baseline-onboarding-handoff.md`
- `docs/reviews/WZN-WLT-0001-baseline-onboarding-review.md`

## Forbidden Files

- `src/**`
- `public/**`
- visual styles and landing copy
- production behavior changes

## Tools Allowed

- WiZNEO CLI `doctor`
- WiZNEO CLI `init`
- WiZNEO CLI `recover`
- WiZNEO CLI `contract new`
- `npm install`
- `npm run build`
- metadata and documentation edits

## Tools Forbidden

- frontend behavior changes
- visual redesign
- secret-printing commands

## Inputs

- existing wizneo-linktree repo
- WiZNEO CLI from `/root/wizneo`

## Outputs

- repo-local WiZNEO memory
- recovery reports
- validated build baseline
- first follow-up planning signals

## Done Criteria

- target repo has `.wizneo` initialized
- target repo has explicit environment expectations
- install and build complete successfully
- onboarding records repo-specific risks without changing the landing itself

## Tests / Validation

- `node /root/wizneo/apps/cli/dist/index.js doctor`
- `node /root/wizneo/apps/cli/dist/index.js init`
- `node /root/wizneo/apps/cli/dist/index.js recover`
- `node /root/wizneo/apps/cli/dist/index.js contract new WZN-WLT-0001 baseline-onboarding ...`
- `npm install`
- `npm run build`

## Risks

- dual lockfiles obscure the intended package manager
- dependency vulnerabilities may require broader remediation later
- onboarding could be mistaken for permission to modify public landing behavior if not scoped tightly

## Escalation Rules

- stop if onboarding requires changing `src/` behavior
- stop if validation requires secrets or third-party account access
- stop if dependency remediation becomes broader than baseline capture

## Handoff Required

yes

## Review Artifact

`docs/reviews/WZN-WLT-0001-baseline-onboarding-review.md`
