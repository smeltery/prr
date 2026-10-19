# Review output

Each review produces a local directory with a summary, metadata, and findings organized by severity and source file.

## Read findings

```text
~/.local/share/prr/reviews/
  pr-123-20261018-143000/
    summary.md
    critical/
      src-auth-handler-go.md
    suggestion/
      src-middleware-session-go.md
```

Severity levels are `critical`, `suggestion`, `nit`, and `praise`. Only directories with findings are created. Local reviews use a `review-<base>-vs-<head>-<timestamp>` directory name.

## Browse locally

```sh
prr serve --open
prr serve --port 9000
```

The embedded review browser provides search, severity filters, file navigation and Markdown copy controls. It is separate from this documentation website and requires no JavaScript runtime to serve.

## Ask and compare

```sh
prr ask "Is this race condition exploitable?"
prr diff /path/to/first-review /path/to/second-review
prr history
```

Use follow-up questions to inspect the review's reasoning and compare runs after changing the code.

## Post deliberately

```sh
prr post --dry-run
prr post
prr post /path/to/review --event comment
```

Without a directory, posting selects the latest PR review. Preview the payload first. Only reviews with GitHub PR metadata can be posted; the GitHub CLI needs write access. `--event request_changes` explicitly requests changes.

## Clean old reviews

```sh
prr clean --days 30 --dry-run
prr clean --days 30
```

The second command deletes matching local review directories. Review the dry-run output before removing results you want to keep.
