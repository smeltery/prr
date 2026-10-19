<p align="center"><img src="assets/logo.svg" width="64" alt="prr logo"></p>

# prr

**A second look. A better change.** AI code reviews for GitHub pull requests and local branches, right in your terminal.

![prr — Good code deserves a second look](assets/og.png)

[![CI](https://github.com/smeltery/prr/actions/workflows/ci.yml/badge.svg)](https://github.com/smeltery/prr/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/smeltery/prr)](https://github.com/smeltery/prr/releases)
[![License](https://img.shields.io/badge/license-PolyForm_Shield-f59e0b)](LICENSE)
[![Go](https://img.shields.io/badge/Go-00ADD8?logo=go&logoColor=white)](go.mod)
[![Bun](https://img.shields.io/badge/Bun-14151A?logo=bun&logoColor=white)](package.json)
[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white)](website/)
[![Flox](https://img.shields.io/badge/dev_env-Flox-8b5cf6)](.flox/env/manifest.toml)
[![macOS · Linux](https://img.shields.io/badge/macOS_·_Linux-475569)](docs/installation.md)

prr gathers the diff and surrounding code, asks your chosen agent for a review, verifies the findings, and writes readable Markdown organized by severity. Use Claude or Codex CLI sessions, or connect Anthropic and OpenAI APIs. Browse results locally and post to GitHub when you're ready.

## Get started

```sh
go install github.com/smeltery/prr@latest
prr agents
prr                                      # Current branch's PR
prr https://github.com/owner/repo/pull/123
prr --base main                          # Local branch review
prr serve --open                         # Browse saved reviews
```

PR reviews require an authenticated [GitHub CLI](https://cli.github.com/). Configure an [agent](docs/agents.md) first; `claude-cli` is the default. Review data is sent to the selected provider. Nothing is posted automatically.

## Documentation

Start with [docs/](docs/README.md): [installation](docs/installation.md), [reviewing changes](docs/reviews.md), [configuration](docs/configuration.md), [output](docs/output.md), and the [command reference](docs/commands.md). The website renders these same Markdown files.

## Develop

```sh
flox activate
make setup          # Locked Bun dependencies and Git hooks
make ci             # Shared checks, race tests and builds
```

Run `flox activate --start-services` for the website at `http://localhost:3004`. See [development](docs/development.md) for CI, release automation, Mermaid validation and LOC budgets.

[PolyForm Shield License 1.0.0](LICENSE) · [Credits](THIRD_PARTY_LICENSES.md)
