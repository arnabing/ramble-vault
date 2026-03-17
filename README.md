# ramble-vault

Connect [Ramble On](https://apps.apple.com/app/ramble-on) voice notes to Claude Code.

## Setup

1. In Ramble On → Settings → enable **Markdown Sync** and pick an iCloud Drive folder
2. Run:

```bash
npx ramble-vault
```

3. Open Claude Code and ask about your recordings

## What it does

- Finds your Ramble On notes in iCloud Drive
- Adds the folder to Claude Code's `additionalDirectories`
- Installs 3 skills:

| Skill | What it does |
|-------|-------------|
| `/recall <query>` | Search voice notes by content, date, context, or speakers |
| `/ideas` | Find cross-domain patterns and connections across all notes |
| `/trace <topic>` | Track how an idea evolved over time |

## Requirements

- macOS (iCloud Drive must be enabled)
- [Claude Code](https://claude.ai/code) installed
- Ramble On with Markdown Sync enabled

## License

MIT
