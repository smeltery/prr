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

## Useful command combinations

```sh
# Review for actionable issues, keeping verification enabled.
prr 123 --focus security,testing --min-severity suggestion

# Review a local feature branch with a different agent.
prr --base main --head feature/auth --agent codex-cli

# Inspect a specific result before posting it.
prr post /path/to/review --dry-run
prr post /path/to/review --event comment
```

Keep the PR number and local branch forms separate. A number resolves in the current GitHub repository; a full PR URL identifies another repository explicitly. `--base` or `--repo` selects a local comparison.

## Output and maintenance flags

| Command and flag | Behavior |
| --- | --- |
| `prr --no-praise` | Excludes positive comments from review output |
| `prr --min-severity suggestion` | Keeps critical findings and suggestions |
| `prr serve --port 9000` | Uses a different review-browser port |
| `prr serve --open` | Opens the review browser automatically |
| `prr clean --days 30 --dry-run` | Lists old review directories without deleting them |
| `prr clean --days 30` | Deletes matching old review directories |
| `prr config init --force` | Replaces the existing user configuration with defaults |

`--output-dir` also applies to commands that read stored reviews, such as `history`, `serve`, and `post`. Use the same location across a workflow or supply an explicit review directory where supported.

## Commands that write remotely

Running a review saves local files. `prr post` submits the saved review to GitHub; `prr describe --update` updates the PR description. Preview or read generated content before invoking either publishing action. A successful command means the operation completed, not that the AI's conclusions have been independently proven.
