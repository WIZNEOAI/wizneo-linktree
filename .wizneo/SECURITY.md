# Security

## Trusted Integrations

- None required for the current static build path

## Open Risks

- `npm install` reported 16 vulnerabilities: 8 moderate and 8 high.
- Dependency ownership is ambiguous because both `package-lock.json` and `bun.lockb` are committed.
- Build output warns that `baseline-browser-mapping` data is stale.

## Recent Reviews

- 2026-04-29: WiZNEO onboarding and build validation
