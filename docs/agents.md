# Agents

prr supports local CLI agents and direct API providers. Agent names are configuration keys, while providers identify the integration.

## Built-in agents

| Agent name | Provider | Authentication |
| --- | --- | --- |
| `claude-cli` | `claude-cli` | Installed and authenticated Claude CLI |
| `codex-cli` | `codex-cli` | Installed and authenticated Codex CLI |
| `claude-api` | `anthropic` | `ANTHROPIC_API_KEY` |
| `gpt-api` | `openai` | `OPENAI_API_KEY` |

The default is `claude-cli`. Run `prr agents` to see your configured agents and availability.

## Select an agent

```sh
prr 123 --agent claude-cli
prr 123 --agent codex-cli
prr 123 --agent claude-api
prr 123 --agent gpt-api
```

CLI integrations use existing CLI sessions. API integrations require the environment variable named in `api_key_env`. Never put API keys in committed configuration files.

## Customize a model

Edit `~/.config/prr/config.yaml`:

```yaml
default_agent: claude-cli
agents:
  claude-cli:
    provider: claude-cli
    model: opus
  my-api-agent:
    provider: openai
    model: your-available-model
    api_key_env: OPENAI_API_KEY
    max_tokens: 8192
```

Choose a model available to your provider account. Model access, capabilities and pricing are controlled by the provider.

## Separate review and verification

```sh
prr 123 --agent claude-cli --verify-agent codex-cli
```

Without an override, verification uses the review agent. Both integrations must be available when you choose different agents.
