---
name: ramble
description: Search, analyze, and trace ideas across your Ramble On voice notes
allowed-tools: Read, Grep, Glob
---

Search, analyze, and trace ideas across the user's Ramble On voice notes.

The voice notes folder is in additionalDirectories — look for the folder containing a CLAUDE.md with "Ramble On" in it. Files are named `{context}/{YYYY-MM-DD}-{slug}.md` with YAML frontmatter fields: `date`, `context` (brain-dump, journal, medical, work, legal, school), `speakers`, `duration`.

## Modes

Parse the first word of the user's argument to determine the mode:

### `ideas` — Cross-domain pattern finding

Triggered by: `/ramble ideas`

1. Read recent notes across all context folders (brain-dump, journal, work, medical, legal, school)
2. Identify recurring themes, people, topics, or concerns
3. Find connections between different domains (e.g., a work frustration that echoes a journal entry)
4. Surface ideas the user has been circling but hasn't explicitly named

Present:
- **Patterns found**: Recurring themes with evidence from specific notes
- **Connections**: Links between notes in different contexts
- **Unnamed ideas**: Things the user keeps coming back to but hasn't crystallized
- **Suggested next steps**: Based on where their thinking seems to be heading

Keep it concise. Lead with the most interesting or surprising finding.

### `trace <topic>` — Chronological idea evolution

Triggered by: `/ramble trace <topic>` (e.g., `/ramble trace pricing strategy`)

1. Search all voice notes for the topic — grep content, titles, and frontmatter
2. Order matches chronologically by the `date` field in YAML frontmatter
3. Read each matching note to understand the user's position at that point

Present a timeline narrative showing:
- **First mention**: When and where the idea first appeared
- **Evolution**: How the thinking changed over time
- **Perspective shifts**: Moments where the user changed their mind or gained new insight
- **Current state**: Where the thinking stands as of the most recent note
- **Confidence trajectory**: Did they become more or less certain?

Present as a readable narrative, not a list. Quote key phrases from the notes. If no topic provided, ask what to trace.

### Default — Recall / search (anything else, or no args)

Triggered by: `/ramble <query>` or `/ramble` with no args

Search voice notes for information matching the query.

1. **By content**: Grep for keywords across all .md files in the vault
2. **By frontmatter**: Search YAML fields — `date`, `context`, `speakers`, `duration`
3. **By filename**: Files are named `{context}/{YYYY-MM-DD}-{slug}.md`

Return:
- Relevant excerpts with source file references
- The AI-generated summary sections (## headings) are more useful than raw transcripts
- Include the date and context for each match
- If multiple notes match, summarize across them

If no query provided, ask what the user is looking for.
