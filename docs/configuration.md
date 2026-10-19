# Configuration

prr reads `~/.config/prr/config.yaml`. If the file is missing, built-in defaults apply.

## Initialize configuration

```sh
prr config init
```

Edit the generated file to customize your agents, review scope, verification and output location.

## Review defaults

```yaml
default_agent: claude-cli
review:
  max_diff_lines: 10000
  codebase_context: true
  max_context_lines: 2000
  verify: true
  verify_action: drop
  ignore_patterns:
    - "*.lock"
    - "go.sum"
    - "vendor/**"
    - "node_modules/**"
  severity_levels:
    - critical
    - suggestion
    - nit
    - praise
output:
  severities:
    - critical
    - suggestion
```

The ignore list above is an example subset; the generated defaults also omit common generated and minified files. CLI flags can override review behavior for a single run.

## Output location

The default is `$XDG_DATA_HOME/prr/reviews` when `XDG_DATA_HOME` is set, otherwise `~/.local/share/prr/reviews`. Set `output.dir` in configuration or pass `--output-dir` to change it.

## Project-specific rules

Add `.prr.yaml` to the repository to provide additional review instructions:

```yaml
rules:
  - "Check error handling at API boundaries."
  - "Prefer existing repository helpers over new abstractions."
```

The supported project schema is a `rules` list of strings. Keep rules focused on conventions that a reviewer cannot infer from the changed code.

## Credentials

Use environment variables for API keys. CLI agents manage authentication themselves. A configuration file names the environment variable, not its secret value. See [agents](agents.md) for provider setup.
