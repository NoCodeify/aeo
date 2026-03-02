# AEO Auditor Agent Memory

## Key Patterns

### ChatGPT vs Gemini Divergence
- ChatGPT uses Bing for web search; Gemini uses Google Grounding
- A brand can be 10/10 on Gemini but 0/10 on ChatGPT for the same query
- Bing indexing lag is a common root cause for ChatGPT invisibility
- Force-fetching pages via ChatGPT updates the OAI-SearchBot cache
- Always test BOTH engines separately -- combined scores hide critical gaps

### Consistency Testing Patterns
- 10-run tests are essential: single queries are unreliable
- Brand audit (8-query) gives overview; consistency tests give precision
- Dutch/local queries stabilize first; international queries take longer
- "Luxury" and "exclusive" terminology performs well on Gemini but not ChatGPT
- Intent-match queries (using exact website language) perform better than generic queries

### Brand Audit Results File
- Results save to large JSON files (42K+ tokens) that can't be read in one chunk
- Use `python3 -c` with JSON parsing to extract key data
- Extract summary data from the `analysis` key at the end of the JSON

## Client: FueGenix
- Ultra-premium hair transplant, Bergen op Zoom, Netherlands
- Lead surgeon: Dr. Munib Ahmad, IAHRS member
- Price: EUR50,000 clinic, EUR500,000 fly-out
- Key competitor: Dr. Zarev (Bulgaria)
- Audit history: Initial Jan 2026 (5/10), Re-audit Jan 15 (8/10), Re-audit Mar 1 (8.5/10)
- Netherlands locked at 10/10 on both engines
- Critical gap: ChatGPT international queries (0/10 for 6 of 13 queries)
- Gemini is the stronger channel (62% vs 36% overall mention rate)
- 22 geographic/intent pages created but may not be Bing-indexed
- Hallucination: Gemini inflates fly-out to EUR1M (correct: EUR500K)
- ChatGPT language anomaly: returns Spanish responses for English queries

## Audit Workflow
1. Read protocol SOP (lines 850-900 for first 50 words, 2700-2770 for intake, 3348-3550 for consistency)
2. Read existing client files (previous audits, playbook)
3. Run brand audit + get audit queries
4. Run 10-run consistency tests on 5+ standard + custom dream queries
5. Run compare_llms on key discovery queries for detailed analysis
6. Write audit report with consistency tables
7. Update playbook with new scores, actions, phase
