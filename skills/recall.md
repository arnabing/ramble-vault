---
name: recall
description: Search your Ramble On voice notes for information matching a query
user_invocable: true
---

Search the user's Ramble On voice notes for information matching their query.

The voice notes folder is in additionalDirectories — look for the folder containing a CLAUDE.md with "Ramble On" in it.

## How to search

1. **By content**: Grep for keywords across all .md files in the vault
2. **By frontmatter**: Search YAML fields — `date`, `context` (brain-dump, journal, medical, work, legal, school), `speakers`, `duration`
3. **By filename**: Files are named `{context}/{YYYY-MM-DD}-{slug}.md`

## What to return

- Relevant excerpts with source file references
- The AI-generated summary sections (## headings) are more useful than raw transcripts
- Include the date and context for each match
- If multiple notes match, summarize across them

## Arguments

If the user provides a query after `/recall`, search for that. If no query, ask what they're looking for.
