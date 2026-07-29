# Codex Security scanning

This repository uses `@openai/codex-security` as a review-only security layer.
Start with a diff scan; do not run `bulk-scan` without explicit approval.

## Requirements

- Node.js 22 or newer.
- Python 3.10 or newer. Install `tomli` only when Python is exactly 3.10.
- Authenticate interactively on a headless VPS with:

  ```bash
  npx codex-security login --device-auth
  ```

- In non-interactive environments, use `OPENAI_API_KEY` or `CODEX_API_KEY`.
  An environment variable takes precedence over stored login credentials.

## Artifact boundary

Scan artifacts can contain source excerpts and reproduction steps. They must
never be committed. Create the output directory outside this repository and
outside every Git worktree that contains it:

```bash
SCAN_ROOT="$(mktemp -d /tmp/codex-security-wizneo-linktree.XXXXXX)"
chmod 700 "$SCAN_ROOT"
```

Keep `findings.json`, SARIF, CSV, and the `results/` directory under
`$SCAN_ROOT`. Confirm permissions with `stat -c '%a %n' "$SCAN_ROOT"`.

## Diff scan

Validate inputs without spending model tokens:

```bash
npx codex-security scan . --dry-run
```

Run only against the changes relative to `origin/main`:

```bash
npx codex-security scan . \
  --diff origin/main \
  --output-dir "$SCAN_ROOT/results" \
  --json \
  --fail-on-severity high > "$SCAN_ROOT/findings.json"
SCAN_EXIT=$?
```

Exit codes:

- `0`: completed with no policy-blocking finding.
- `1`: finding at or above the configured severity threshold.
- `2`: invalid input or incomplete coverage; never treat this as a pass.
- `130`: interrupted.
- `143`: terminated.

Review findings before changing code. For the most severe candidate:

```bash
npx codex-security validate \
  "$SCAN_ROOT/findings.json" "<finding description>"
```

If validation confirms it, create or remain on a dedicated review branch and
generate the patch for human review:

```bash
npx codex-security patch \
  "$SCAN_ROOT/findings.json" "<finding description>"
```

Never patch directly on `main`. Review and test the resulting diff before any
commit or merge.

## SARIF export

```bash
npx codex-security export "$SCAN_ROOT/results" \
  --export-format sarif \
  --output "$SCAN_ROOT/results.sarif" \
  --source-root .
```

The SARIF file remains outside the repository. Upload it manually only through
an approved code-scanning lane.

## Track scans between runs

```bash
npx codex-security scans list . --scan-root "$SCAN_ROOT"
npx codex-security scans show <SCAN_ID>
npx codex-security scans match <BEFORE_ID> <AFTER_ID>
npx codex-security scans compare <BEFORE_ID> <AFTER_ID>
```

`scans match` establishes semantic root-cause links; run `scans compare` after
matching to review finding and coverage changes.

## Optional pre-commit hook (not installed)

`npx codex-security install-hook` can install a pre-commit scan that checks
staged and unstaged changes and blocks high-severity findings. It requires
explicit approval before installation.

No GitHub Actions workflow is used for this repository.
