---
name: ramble
description: Search, analyze, and trace ideas across your Ramble On voice notes
allowed-tools: Read, Grep, Glob
---

Search, analyze, and trace ideas across the user's Ramble On voice notes.

## Finding the vault

The voice notes folder is in additionalDirectories — look for the folder containing a CLAUDE.md with "Ramble On" in it. Typical path: `~/Library/Mobile Documents/iCloud~com~mididea/Documents/`.

## File structure

All notes are **flat** in the vault root: `YYYY-MM-DD-{title-slug}.md`. No subfolders (except possibly `uncategorized/`).

YAML frontmatter fields: `id`, `title`, `date` (ISO 8601), `duration` (M:SS), `status`, and optionally `context` (brain-dump, journal, medical, work, legal, school), `speakers`, `pinned`.

Each note has a `## Transcript` section (raw text) and may have AI-generated summary sections under other `##` headings.

The vault's `CLAUDE.md` has a **Recent Notes** table — read it first for a quick index before grepping.

## Modes

Parse the first word of the user's argument to determine the mode:

### `ideas` — Cross-domain pattern finding

Triggered by: `/ramble ideas`

1. Read the vault's CLAUDE.md for the recent notes index
2. Glob for all `*.md` files in the vault (excluding CLAUDE.md)
3. Read recent notes — scan titles, summaries, and transcripts
4. Identify recurring themes, people, topics, or concerns
5. Find connections between different notes (e.g., a work frustration that echoes a journal entry)
6. Surface ideas the user has been circling but hasn't explicitly named

Present:
- **Patterns found**: Recurring themes with evidence from specific notes
- **Connections**: Links between notes in different contexts
- **Unnamed ideas**: Things the user keeps coming back to but hasn't crystallized
- **Suggested next steps**: Based on where their thinking seems to be heading

Keep it concise. Lead with the most interesting or surprising finding.

### `trace <topic>` — Chronological idea evolution

Triggered by: `/ramble trace <topic>` (e.g., `/ramble trace pricing strategy`)

1. Grep all `.md` files in the vault for the topic (content, titles, frontmatter)
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

1. **By content**: Grep for keywords across all `.md` files in the vault
2. **By frontmatter**: Search YAML fields — `date`, `context`, `speakers`, `duration`
3. **By filename**: Files are named `YYYY-MM-DD-{title-slug}.md` — dates and slugs are searchable
4. **By index**: Read the vault's CLAUDE.md Recent Notes table for a quick scan

Return:
- Relevant excerpts with source file references
- The AI-generated summary sections (`##` headings) are more useful than raw transcripts
- Include the date and title for each match
- If multiple notes match, summarize across them

If no query provided, ask what the user is looking for.
