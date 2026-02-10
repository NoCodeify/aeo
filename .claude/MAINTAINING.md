# Maintaining the Documentation Layer

How to update CLAUDE.md, rules, skills, agents, memory, and pipelines in this project.

## Architecture Overview

```
CLAUDE.md                          # Concise index (~100 lines). Loads EVERY session.
.claude/rules/                     # Modular rules. Path-scoped ones load on demand.
.claude/skills/                    # 23 skills. 8 auto-trigger, 15 manual-only.
.claude/agents/                    # 14 agents. Full system prompts, tool restrictions.
~/.claude/projects/.../memory/     # Auto memory. MEMORY.md loads every session (first 200 lines).
```

**Loading order:** CLAUDE.md + always-loaded rules + 8 skill descriptions + MEMORY.md (200 lines) = base context every session. Path-scoped rules and full skill content load on demand.

---

## When to Put What Where

| I need to... | Put it in... | Why |
|---|---|---|
| Add a project-wide rule (applies to everything) | `CLAUDE.md` or always-loaded rule | Loads every session |
| Add domain-specific rules (youtube, SaaS, clients) | `.claude/rules/[domain]/` with `paths:` | Only loads when working in that directory |
| Create a reusable workflow Claude triggers automatically | Inline skill (no `disable-model-invocation`) | Claude sees description, loads full content when relevant |
| Create a workflow only I trigger | Skill with `disable-model-invocation: true` | Hidden from Claude until I type `/name` |
| Create a heavy/isolated task | Skill with `context: fork` + `agent:` | Runs in separate context, returns summary |
| Store methodology/system prompt for a worker | Agent file in `.claude/agents/` | Skills delegate here via `context: fork` |
| Coordinate multiple workers with persistent context | Pipeline skill referencing agent teams | Each worker keeps context, can be messaged |
| Record a lesson learned or pattern | `MEMORY.md` | Persists across sessions, loads automatically |

---

## Updating CLAUDE.md

**Keep it under 120 lines.** It loads every session, so every line costs context.

**What belongs here:**
- Project overview (what this repo is)
- Build/run commands
- Environment variables
- Critical rules (max 3-5)
- Index tables pointing to rules, skills, agents

**What does NOT belong here:**
- Domain-specific methodology (goes in `.claude/rules/`)
- Workflow instructions (goes in skills)
- Agent system prompts (goes in `.claude/agents/`)
- SaaS decisions, keyword data, copy rules (goes in path-scoped rules)

**When to update:** Only when adding/removing top-level components (new MCP server, new skill category, new critical rule).

---

## Adding/Updating Rules (`.claude/rules/`)

Rules are markdown files with optional YAML frontmatter for path scoping.

### Always-loaded rules (no `paths:` frontmatter)

These load every session regardless of what you're working on:
- `aeo/methodology.md` - AEO protocol reference
- `aeo/mcp-servers.md` - MCP architecture
- `website/copywriting.md` - Copy rules

**Only add always-loaded rules if the content applies to EVERY type of work.** Most rules should be path-scoped.

### Path-scoped rules (with `paths:` frontmatter)

These load only when Claude works with files matching the glob pattern:

```yaml
---
paths:
  - "youtube/**"
---

# YouTube rules go here
```

Current path-scoped rules:
- `youtube/production.md` - loads for `youtube/**`
- `youtube/video-editing.md` - loads for `tools/video-editor-remotion/**`, `test-video/**`
- `saas/decisions.md` - loads for `systems/**`
- `clients/workflow.md` - loads for `clients/**`, `templates/**`

### Creating a new rule

1. Pick the right scope: always-loaded or path-scoped
2. Create `[domain]/[topic].md` in `.claude/rules/`
3. Add `paths:` frontmatter if path-scoped
4. Update the "Modular Rules" table in CLAUDE.md
5. Keep rules focused - one topic per file

### Glob patterns for `paths:`

```
"src/**/*.ts"          # All TS files under src/
"youtube/**"           # Everything in youtube/
"clients/**"           # Everything in clients/
"*.md"                 # Markdown files in root only
"{src,lib}/**/*.ts"    # Brace expansion
```

---

## Adding/Updating Skills (`.claude/skills/`)

Skills are the entry point for all workflows. There are three types:

### 1. Inline skills (auto-triggering)

Run in the main conversation context. Claude loads them automatically when relevant.

```yaml
---
name: my-skill
description: What it does and when to use it.
---

Instructions for Claude...
```

**Use for:** Reference material, methodology, guidance. Things like `premium-aeo`, `content-strategist`, `youtube-script-writer`.

### 2. Fork skills (manual, delegates to agent)

Run in isolated context via a dedicated agent. User must invoke with `/name`.

```yaml
---
name: my-skill
description: Brief description.
context: fork
agent: my-agent-name
disable-model-invocation: true
---

Task description for the agent.

Input: $ARGUMENTS
```

**Use for:** Heavy tasks with side effects. Things like `/broll-prompting`, `/auto-cutter`, `/thumbnail`.

### 3. Pipeline skills (agent teams)

Orchestrate multiple workers with persistent context.

```yaml
---
name: my-pipeline
description: Multi-step workflow using agent teams.
disable-model-invocation: true
---

# Pipeline instructions
Create an agent team with these workers...
```

**Use for:** Multi-step workflows where context loss is costly. Currently: `/video-timeline`, `/video-produce`, `/aeo-deliver`.

### Creating a new skill

1. Decide the type: inline, fork, or pipeline
2. Create `.claude/skills/[name]/SKILL.md`
3. Add proper frontmatter:
   - `name:` - lowercase with hyphens
   - `description:` - when Claude should use it (or what it does for manual skills)
   - `context: fork` + `agent: [name]` - if delegating to an agent
   - `disable-model-invocation: true` - if manual-only
4. Update the skills table in CLAUDE.md (auto-triggering or manual-only section)

### Key: `disable-model-invocation`

- **Without it:** Claude sees the skill description every session. Adds to context cost.
- **With it:** Invisible to Claude until you type `/name`. Zero context cost.

Rule of thumb: if the skill has side effects (writes files, runs commands, calls APIs), add `disable-model-invocation: true`.

---

## Adding/Updating Agents (`.claude/agents/`)

Agents hold the full system prompt for isolated workers. Skills delegate to them.

### Agent frontmatter

```yaml
---
name: my-agent
description: "What this agent does."
model: inherit
tools: Read, Grep, Glob, Write
mcpServers:
  - imagen
memory: project
---

# Agent system prompt goes here
Full methodology, rules, examples...
```

| Field | Required | Notes |
|---|---|---|
| `name` | Yes | Lowercase with hyphens |
| `description` | Yes | When Claude should use this agent |
| `model` | No | `inherit`, `sonnet`, `opus`, or `haiku`. Default: inherit |
| `tools` | No | Restrict to only needed tools. Omit = inherit all |
| `mcpServers` | No | Which MCP servers this agent needs |
| `memory` | No | `project`, `user`, or `local`. Enables persistent learning |

### Tool options

```
Read, Grep, Glob          # Read-only (research agents)
Read, Grep, Glob, Write   # Can create files (most agents)
Read, Grep, Glob, Write, Edit  # Can modify existing files
Read, Grep, Glob, Write, Bash  # Can run commands (needs MCP, ffmpeg, etc.)
```

### When to add `memory: project`

Only for agents that build knowledge over time:
- `aeo-auditor` - learns which queries work, common audit patterns
- `content-optimizer` - learns writing patterns per client

Most agents are stateless (every run starts fresh). Don't add memory unless the agent genuinely benefits from remembering past sessions.

### Creating a new agent

1. Create `.claude/agents/[name].md`
2. Add frontmatter with tools, mcpServers, memory as needed
3. Write the full system prompt in the markdown body
4. Create a matching skill wrapper in `.claude/skills/[name]/SKILL.md` with `context: fork` + `agent: [name]`
5. Update the agents reference in CLAUDE.md

### The skill-agent pattern

```
User types /broll-prompting →
  Skill (11 lines, thin wrapper) →
    context: fork → agent: broll-prompter →
      Agent (425 lines, full methodology, tool restrictions, MCP access)
```

The skill is the trigger. The agent is the brain. Never duplicate methodology in both.

---

## Updating Memory (MEMORY.md)

Auto memory lives at `~/.claude/projects/-Users-sohaib-Downloads-aeo/memory/MEMORY.md`.

**First 200 lines load every session.** Keep it concise.

### What belongs in MEMORY.md

- Product identity (3 lines)
- Key document pointers (5-6 lines)
- Patterns and lessons learned (the valuable part)

### What does NOT belong in MEMORY.md

- SaaS decisions (lives in `.claude/rules/saas/decisions.md`)
- Methodology (lives in rules and agents)
- Workflow instructions (lives in skills)

### Adding a new lesson

Add a single bullet point to `## Patterns/Lessons`:

```markdown
- [Concise description of what happened and what to do/avoid]
```

If the topic needs more detail, create a separate file in the memory directory and link from MEMORY.md.

### Accessing memory

- `/memory` command opens MEMORY.md in your editor
- Ask Claude to "remember that..." to add a lesson
- Ask Claude to "check your memory for..." to look up a pattern

---

## Quick Reference: Adding Something New

### New MCP server
1. Create `[name]-mcp/` with `src/index.ts`, `package.json`
2. Add to `.mcp.json`
3. Add env vars to CLAUDE.md
4. Add to `.claude/rules/aeo/mcp-servers.md`
5. Reference in any agents that need it via `mcpServers:` frontmatter

### New client project
1. Create `clients/[name]/` per the structure in `.claude/rules/clients/workflow.md`
2. No changes needed to CLAUDE.md or rules (the `clients/**` path scope handles it)

### New YouTube video
1. Follow `youtube/system/production-sop.md`
2. No changes needed to CLAUDE.md or rules (the `youtube/**` path scope handles it)

### New domain entirely
1. Create a path-scoped rule in `.claude/rules/[domain]/`
2. Create skills for workflows in `.claude/skills/`
3. Create agents if skills need isolated execution
4. Add a one-line reference in CLAUDE.md
5. Keep CLAUDE.md under 120 lines

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| Adding domain rules to CLAUDE.md | Move to `.claude/rules/` with `paths:` scope |
| Duplicating agent content in a skill | Make skill a thin wrapper with `context: fork` |
| Making every skill auto-triggering | Use `disable-model-invocation: true` for action skills |
| Putting SaaS decisions in MEMORY.md | They live in `.claude/rules/saas/decisions.md` |
| Adding `memory: project` to every agent | Only for agents that benefit from cross-session learning |
| Adding tools an agent doesn't need | Restrict to minimum required tools |
| Forgetting to update CLAUDE.md tables | After adding any skill, agent, or rule |
