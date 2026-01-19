# AEO Audit MCP Server

MCP server for running AEO (Answer Engine Optimization) audits across ChatGPT and Gemini with their native search capabilities enabled.

## Tools

| Tool | Description |
|------|-------------|
| `query_chatgpt` | Query ChatGPT (GPT-5.2) with Bing web search |
| `query_gemini` | Query Gemini with Google Search grounding |
| `compare_llms` | Run same query across both, compare results |
| `run_brand_audit` | Full AEO audit for a brand (8 standard queries) |
| `get_audit_queries` | Get suggested audit queries for a brand |

## Setup

1. Install dependencies:
```bash
npm install
```

2. Build:
```bash
npm run build
```

3. Add to Claude Code config (`~/.claude/claude_desktop_config.json`):
```json
{
  "mcpServers": {
    "aeo-audit": {
      "command": "node",
      "args": ["/Users/sohaib/Downloads/aeo/aeo-audit-mcp/dist/index.js"],
      "env": {
        "OPENAI_API_KEY": "your-openai-key",
        "GEMINI_API_KEY": "your-gemini-key"
      }
    }
  }
}
```

## Usage Examples

Query ChatGPT about a brand:
```
query_chatgpt("What is Fuegenix?")
```

Compare across both LLMs:
```
compare_llms("Best AI sales assistant tools 2025")
```

Run full brand audit:
```
run_brand_audit(brand="Fuegenix", category="AI sales", competitor="DM Champ")
```
