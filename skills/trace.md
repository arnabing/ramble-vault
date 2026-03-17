---
name: trace
description: Track how an idea evolved across voice notes over time
user_invocable: true
---

Search Ramble On voice notes for a given topic and show how the user's thinking evolved over time.

The voice notes folder is in additionalDirectories — look for the folder containing a CLAUDE.md with "Ramble On" in it.

## Arguments

The user provides a topic after `/trace` (e.g., `/trace pricing strategy`). If no topic, ask what to trace.

## What to do

1. Search all voice notes for the topic — grep content, titles, and frontmatter
2. Order matches chronologically by the `date` field in YAML frontmatter
3. Read each matching note to understand the user's position at that point

## What to present

A timeline narrative showing:
- **First mention**: When and where the idea first appeared
- **Evolution**: How the thinking changed over time
- **Perspective shifts**: Moments where the user changed their mind or gained new insight
- **Current state**: Where the thinking stands as of the most recent note
- **Confidence trajectory**: Did they become more or less certain?

Present as a readable narrative, not a list. Quote key phrases from the notes.
