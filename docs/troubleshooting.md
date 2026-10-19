# Troubleshooting

Start by checking the command's error and the availability of the external tools it uses.

## Agent unavailable

Run `prr agents`. For CLI providers, check that the corresponding binary is on `PATH` and authenticated. For API providers, check the environment variable named in the agent configuration and confirm access to the selected model. Do not paste credentials into issue reports.

## Pull request cannot be resolved

Run `gh auth status`, verify repository access, and confirm that your current branch has a PR. Supply a full PR URL when you are outside a checkout or want to target another repository.

## Local comparison fails

Check the repository path and branch names with Git. Both base and head must resolve in the selected repository. Fetch the required branches before retrying.

## No findings or missing files

Inspect `summary.md` first. Check ignore patterns, severity filters, maximum diff size, and verification settings. A clean review can have no findings. To inspect disputed comments, rerun with `--verify-action annotate`.

## Posting fails

Use `prr post --dry-run` to inspect the payload. Check that the directory contains a PR review with metadata and that your GitHub account can submit a review. Local branch reviews cannot be posted directly.

## Website or hooks fail

Activate Flox, then run `make setup` again to install the locked dependencies. Check that port 3004 is available. Use `make check` to reproduce the CI checks and read the first failing command.

## Report a problem

Open a [GitHub issue](https://github.com/smeltery/prr/issues) with your prr version, operating system, command, and redacted error output. Exclude API keys, private source code and review contents unless you intend to share them.
