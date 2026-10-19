# Installation

Install the CLI, authenticate your tools, and run a review from a Git repository.

## Install with Go

Use the Go version declared in [go.mod](../go.mod) or newer.

```sh
go install github.com/smeltery/prr@latest
```

Ensure `$(go env GOPATH)/bin` is on your `PATH`. Alternatively, download the matching macOS or Linux archive from [GitHub releases](https://github.com/smeltery/prr/releases), verify it against `checksums.txt`, and place the binary in a directory on your `PATH`.

## Authenticate your tools

For GitHub pull requests, install [GitHub CLI](https://cli.github.com/) and sign in:

```sh
gh auth login
gh auth status
```

The default agent is `claude-cli`. Install and authenticate the Claude CLI separately, or configure another [agent](agents.md). CLI providers use their own authentication; API providers read credentials from environment variables.

## Run your first review

```sh
prr config init
prr agents
prr
```

Run `prr` inside a repository with a PR on the current branch, or supply a PR URL:

```sh
prr https://github.com/owner/repo/pull/123
```

Read the output directory printed by the command. Use `prr serve --open` to browse results. Nothing is posted automatically.

## Build from source with Flox

```sh
git clone https://github.com/smeltery/prr.git
cd prr
flox activate
make install
```

See [development](development.md) for the shared toolchain and checks.
