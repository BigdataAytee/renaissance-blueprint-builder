# Claude Code configuration

## Plugins

`settings.json` registers Anthropic's [`anthropics/skills`](https://github.com/anthropics/skills)
marketplace (catalog name `anthropic-agent-skills`) and enables its
`example-skills` plugin for everyone who opens this repository.

This is the settings-file equivalent of:

```
/plugin marketplace add anthropics/skills
/plugin install example-skills@anthropic-agent-skills
```

The `/plugin` command is unavailable in some environments — Claude Code on the
web, for instance — which is why the configuration is declared here instead.

### Activating it

Registering a marketplace does not install plugins that come from an external
source. Claude Code adds the marketplace once you accept the workspace-trust
prompt for this folder, then reports `example-skills` as not installed until
each person installs it once:

```
claude plugin install example-skills@anthropic-agent-skills
```

After that, `/reload-plugins` (or the next session) picks it up. Skills from the
plugin are namespaced, e.g. `/example-skills:frontend-design`.

### What it adds, and what is worth using here

`example-skills` ships twelve skills. The ones that earn their place on this
project:

| Skill | Why it is useful here |
| --- | --- |
| `frontend-design` | Aesthetic direction for new UI, so additions do not drift from the premium corporate look. |
| `webapp-testing` | Drives the running app with Playwright — verifying forms, the apply dialog and admin flows end to end. |
| `theme-factory` | Consistent colour and type systems when building new sections. |
| `web-artifacts-builder` | Scaffolding for richer React/Tailwind/shadcn components. |
| `skill-creator` | For writing project-specific skills, e.g. a repeatable "add a CMS collection" workflow. |

The rest (`algorithmic-art`, `brand-guidelines`, `canvas-design`,
`doc-coauthoring`, `internal-comms`, `mcp-builder`, `slack-gif-creator`) are not
relevant to this codebase. Skills only load their full instructions when
triggered, but each one's description sits in context every turn — if that cost
matters, install the marketplace and enable only the skills above rather than
the whole plugin.
