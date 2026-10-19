# Command reference

Use `prr --help` and `prr <command> --help` for the complete flags available in your installed version.

## Commands

| Command | Purpose |
| --- | --- |
| `prr [PR_NUMBER or PR_URL]` | Review a GitHub pull request |
| `prr --base main` | Review local branch changes |
| `prr agents` | List agents and availability |
| `prr config init` | Write a default configuration |
| `prr post [review-dir]` | Post stored findings to GitHub |
| `prr describe [PR_NUMBER]` | Generate a PR description |
| `prr ask <question>` | Ask a follow-up about a review |
| `prr diff <dir1> <dir2>` | Compare review output |
| `prr history` | List earlier reviews |
| `prr clean` | Remove old review directories |
| `prr serve` | Start the embedded review browser |

## Review flags

| Flag | Purpose |
| --- | --- |
| `--agent <name>` | Use a configured agent |
| `--all` | Run all configured agents |
| `--repo <path>` | Choose a local repository |
| `--base <branch>` | Compare against this base |
| `--head <branch>` | Choose a head branch |
| `--focus security,performance` | Focus the review |
| `--since` | Reserved; currently has no effect on review scope |
| `--no-context` | Omit nearby codebase context |
| `--no-verify` | Skip verification |
| `--verify-agent <name>` | Select a verification agent |
| `--verify-action drop` | Drop inaccurate findings (default) |
| `--verify-action annotate` | Keep disputed findings with notes |
| `--output-dir <path>` | Change the output directory |

## Publishing descriptions

```sh
prr describe 123
prr describe 123 --update
```

The first generates a description. `--update` writes it to GitHub. This is a separate action from posting a review.
