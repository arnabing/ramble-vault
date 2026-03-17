#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const os = require("os");

const ICLOUD_BASE = path.join(
  os.homedir(),
  "Library/Mobile Documents/com~apple~CloudDocs"
);
const CLAUDE_DIR = path.join(os.homedir(), ".claude");
const SETTINGS_PATH = path.join(CLAUDE_DIR, "settings.json");
const SKILLS_DIR = path.join(CLAUDE_DIR, "skills");

function log(msg) {
  console.log(`  ${msg}`);
}

function success(msg) {
  console.log(`  \x1b[32m✓\x1b[0m ${msg}`);
}

function error(msg) {
  console.error(`  \x1b[31m✗\x1b[0m ${msg}`);
}

// Find the Ramble On vault in iCloud Drive
function findVault() {
  if (!fs.existsSync(ICLOUD_BASE)) {
    return null;
  }

  // Recursively search for a CLAUDE.md containing "Ramble On"
  function search(dir, depth) {
    if (depth > 3) return null;

    const claudeMd = path.join(dir, "CLAUDE.md");
    if (fs.existsSync(claudeMd)) {
      try {
        const content = fs.readFileSync(claudeMd, "utf-8");
        if (content.includes("Ramble On")) {
          return dir;
        }
      } catch {}
    }

    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (!entry.isDirectory()) continue;
        if (entry.name.startsWith(".")) continue;
        const result = search(path.join(dir, entry.name), depth + 1);
        if (result) return result;
      }
    } catch {}

    return null;
  }

  // Check common name first
  const defaultPath = path.join(ICLOUD_BASE, "RambleOnNotes");
  if (fs.existsSync(defaultPath)) {
    const claudeMd = path.join(defaultPath, "CLAUDE.md");
    if (fs.existsSync(claudeMd)) {
      return defaultPath;
    }
  }

  return search(ICLOUD_BASE, 0);
}

// Add vault path to Claude Code settings
function addToSettings(vaultPath) {
  fs.mkdirSync(CLAUDE_DIR, { recursive: true });

  let settings = {};
  if (fs.existsSync(SETTINGS_PATH)) {
    try {
      settings = JSON.parse(fs.readFileSync(SETTINGS_PATH, "utf-8"));
    } catch {
      settings = {};
    }
  }

  if (!Array.isArray(settings.additionalDirectories)) {
    settings.additionalDirectories = [];
  }

  if (!settings.additionalDirectories.includes(vaultPath)) {
    settings.additionalDirectories.push(vaultPath);
    fs.writeFileSync(SETTINGS_PATH, JSON.stringify(settings, null, 2) + "\n");
    return true;
  }

  return false; // already present
}

// Install skills to ~/.claude/skills/
function installSkills() {
  fs.mkdirSync(SKILLS_DIR, { recursive: true });

  const skillsSource = path.join(__dirname, "..", "skills");
  const files = fs.readdirSync(skillsSource).filter((f) => f.endsWith(".md"));
  const installed = [];

  for (const file of files) {
    const src = path.join(skillsSource, file);
    const dest = path.join(SKILLS_DIR, file);
    fs.copyFileSync(src, dest);
    installed.push(file.replace(".md", ""));
  }

  return installed;
}

// Main
function main() {
  console.log();
  console.log("  \x1b[1mRamble On → Claude Code\x1b[0m");
  console.log();

  // Step 1: Find vault
  log("Looking for voice notes in iCloud Drive...");
  const vaultPath = findVault();

  if (!vaultPath) {
    error("Could not find Ramble On notes in iCloud Drive.");
    console.log();
    log("Make sure you've:");
    log("  1. Enabled Markdown Sync in Ramble On settings");
    log("  2. Picked an iCloud Drive folder");
    log("  3. Exported at least one recording");
    console.log();
    log("Then run this command again.");
    console.log();
    process.exit(1);
  }

  success(`Found vault: ${vaultPath}`);

  // Step 2: Add to Claude Code settings
  const added = addToSettings(vaultPath);
  if (added) {
    success("Added to Claude Code settings");
  } else {
    success("Already in Claude Code settings");
  }

  // Step 3: Install skills
  const skills = installSkills();
  success(`Installed skills: ${skills.map((s) => `/${s}`).join(", ")}`);

  // Done
  console.log();
  console.log("  \x1b[1m\x1b[32mDone!\x1b[0m Open Claude Code and try:");
  console.log();
  console.log("    \x1b[36m/recall\x1b[0m what did I talk about this week?");
  console.log("    \x1b[36m/ideas\x1b[0m");
  console.log("    \x1b[36m/trace\x1b[0m pricing strategy");
  console.log();
}

main();
