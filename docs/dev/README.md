# Onéra development plan

[Documentation root](../README.md) | [BETA-0.0.1 stage](BETA-0.0.1/stage-BETA-0.0.1.md)

## One application

The prior Next.js source was lost when its ChatGPT account was deactivated. On November 8, 2026, the user chose to rebuild from scratch. The new canonical Next.js application is in this repository's `website/` directory; the planning documents and original brand artifacts remain at the repository root.

`Z:\onera\web-app-onera` is the former static sharing copy. Its files remain available as historical material; it has no active development backlog, required migration, synchronization step, or acceptance gate. Use a useful existing asset or design reference when appropriate without treating the old app as a prerequisite.

Build application behavior once. Hosting and sharing must support the resulting requirements. Do not force static output, remove features, or maintain a second frontend to fit the previous sharing setup.

## Active stage

**[BETA-0.0.1 — Luxury UI transformation](BETA-0.0.1/stage-BETA-0.0.1.md)** is the active implementation plan. The replacement application and first dark visual foundation are underway.

The sequence is application baseline → visual foundation → garment and motion work → demo hospitality → integrated verification.

## Local preview

On Windows, run `Start Preview.cmd` from the repository root. It starts the Next.js development server from `website/`; the first run installs dependencies with `npm ci` if they are missing. Keep the command window open and use the local URL printed by Next.js. Node.js and npm must be installed.

On macOS or Linux, run `npm --prefix website run dev` from the repository root.

| Plan | Purpose |
| --- | --- |
| [Stage index](BETA-0.0.1/README.md) | Prerequisite, five phases, and supporting contracts. |
| [Application baseline](BETA-0.0.1/phase-00-consolidation.md) | Source ownership, recoverable baseline, route/data inventory, and local runtime. |
| [Decisions and inputs](BETA-0.0.1/decisions-and-inputs.md) | Confirmed user direction, missing content, and ownership. |
| [Content and assets](BETA-0.0.1/content-and-assets.md) | Fact-level sources, omission policy, media dependencies, and fallbacks. |
| [Verification](BETA-0.0.1/verification.md) | Application checks, browser matrix, runtime acceptance, and evidence. |

## Working rules

1. Read the application's instructions and relevant installed framework guides before changing version-sensitive code. Check proposed filenames before creating duplicate components.
2. Preserve the existing wordmark and olive; implement the confirmed dark-only theme and full atmospheric motion.
3. Build accessible semantics first. Manage focus, scroll locks, reduced motion, pointer capabilities, and cleanup.
4. Omit unconfirmed facts. An example, fixture, or inherited demo value is not evidence of a real product or service.
5. Keep forms complete local demos with an explicit “nothing sent” result. Live commerce and service activation are separate releases.
6. Verify the application and its actual built runtime. Report real results, deferrals, baseline failures, and device limitations.
7. Evaluate hosting compatibility when preparing a release. ChatGPT Sites is an option, subject to its then-current supported runtime; it is not a static-only architecture requirement.

The prior application is unavailable; the rebuilt website is intentionally isolated under `website/`. No external services have been connected and the site has not been published.
