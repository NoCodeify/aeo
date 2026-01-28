# AEO Audit MCP Server

MCP server for running AEO (Answer Engine Optimization) audits across ChatGPT and Gemini with their native search capabilities enabled.

## Tools

| Tool | Description |
|------|-------------|
| `query_chatgpt` | Query ChatGPT (GPT-5.2) with Bing web search |
| `query_gemini` | Query Gemini (gemini-3-flash) with Google Search grounding |
| `query_google` | Query Google Search via ScrapingBee (organic + AI Overview) |
| `compare_llms` | Run same query across ChatGPT, Gemini, and Google |
| `run_brand_audit` | Full AEO audit for a brand (8 standard queries) |
| `run_consistency_test` | Run a query 10x in parallel to test brand mention consistency |
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

Compare across all engines:
```
compare_llms("Best hair transplant clinic in Europe")
```

Run full brand audit:
```
run_brand_audit(brand="Fuegenix", category="hair transplant clinic", competitor="Bisanga")
```

Run consistency test (10x parallel):
```
run_consistency_test(query="Best hair transplant in Europe", brand="Fuegenix")
run_consistency_test(query="Best hair transplant worldwide", brand="Fuegenix", engines="chatgpt", runs=15)
```

### Consistency Test Output

The `run_consistency_test` tool returns a structured JSON report:

```json
{
  "query": "Best hair transplant in Europe",
  "brand": "Fuegenix",
  "results": [
    {
      "engine": "ChatGPT (GPT-5.2)",
      "totalRuns": 10,
      "mentions": 3,
      "mentionRate": "3/10 (30%)",
      "consistency": "WEAK",
      "runs": [
        { "run": 1, "mentioned": true, "position": "top-tier", "context": "..." },
        { "run": 2, "mentioned": false }
      ]
    }
  ],
  "overall": {
    "totalRuns": 20,
    "totalMentions": 5,
    "overallRate": "5/20 (25%)",
    "overallConsistency": "WEAK"
  }
}
```

**Consistency ratings:**
| Score | Rating | Meaning |
|-------|--------|---------|
| 7-10/10 | STRONG | Brand is locked in |
| 4-6/10 | MODERATE | Inconsistent, needs work |
| 1-3/10 | WEAK | Rarely mentioned |
| 0/10 | INVISIBLE | Not in training data |

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `query` | string | required | The discovery query to test |
| `brand` | string | required | Brand name to check for |
| `engines` | "both" / "chatgpt" / "gemini" | "both" | Which engines to test |
| `runs` | number (1-20) | 10 | Number of runs per engine |
