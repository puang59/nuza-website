---
title: "AI for technical writing: READMEs, design docs and runbooks in markdown"
seoTitle: "AI for READMEs, design docs and runbooks"
description: "How developers can use the same coding agent they already have, Claude Code, Codex or OpenCode, to write and review READMEs, design docs, ADRs and runbooks in plain markdown with nuza."
pubDate: 2026-10-15
author: puang
trademarks: ["Claude Code", "Codex", "OpenCode", "Cursor"]
---

Developers have got used to an AI agent beside their code. It knows the file you are in, it suggests changes as diffs, and you accept the ones you want. Then you open the design doc, or the README, or the incident write-up, and you are back to copying text into a chat window.

nuza brings the same pattern to the prose half of engineering work. It is a markdown notes app with an AI panel that uses the coding agent you already have, Claude Code, Codex or OpenCode, and turns its changes into inline suggestions you review one at a time. We call it [Cursor for writers](/cursor-for-writers/), and developers are writers more often than they think.

This post covers how to use it for the documents engineers actually write. If you are new to keeping work notes in markdown, our [markdown note taking workflow for developers](/blog/markdown-notes-for-developers/) covers the basics.

## Point it at your docs folder

nuza opens any folder of markdown files. That can be a notes vault, or the `docs/` folder of a repository:

```text
my-service/
  README.md
  docs/
    adr/
      0007-move-queue-to-postgres.md
    runbooks/
      payment-retries.md
    design/
      rate-limiting.md
```

Your files stay exactly where they are, with no import and no conversion. Edits are ordinary file writes, so `git diff` shows exactly what changed, and you review and commit documentation the same way you do code.

## READMEs that answer the first questions

A README is for the person who has never seen the project. Open it, press ⌘L (Ctrl+L on Windows and Linux) and ask:

- "What would someone new to this project not understand from this README?"
- "Is there a missing setup step between installing and running the tests?"
- "Turn the configuration paragraph into a table of variable, default and meaning."

The first two are questions, so the answers stay in the panel. The third is a change, so it comes back as a suggestion in the file: the paragraph struck through, the table in its place. You accept it, reject it, or accept it and fix one cell. nuza renders markdown tables as tables, so you see the result as it will read.

## Design docs and ADRs

Design documents benefit most from a critical reader. Useful prompts:

- "What are the strongest objections to this design that the doc does not answer?"
- "Which assumptions here would change the decision if they were wrong?"
- "Write an Alternatives considered section from the options mentioned in the discussion section." This one is a change, which you review.

For architecture decision records, ask for a new note: "Create an ADR in docs/adr for the decision in this design doc, in the same format as the others." The agent can read your other ADRs to match their format, if you let it search the vault. You get a card showing the path and the content, and the file is only written when you press **Create**. It never overwrites an existing file, and it links back to the design doc so each points to the other.

## Runbooks people can follow at 3am

Runbooks fail when they assume knowledge the reader does not have at the worst possible moment. Select a procedure and run **Explain this**: if the explanation is not what you meant, neither will the on-call engineer's be.

Then ask: "Rewrite this as numbered steps, each with the exact command and what to check before going on." Code stays in fenced code blocks, which nuza highlights. Review each suggested change. In a runbook, every word is worth checking.

## Changelogs and release notes

Release notes are a translation job: from what changed in the code to what changed for the user. Paste the merged PR titles into a note and ask: "Turn these into release notes for users: group them under Added, Changed and Fixed, plain language, no PR numbers." Then **Proofread** the result. It only fixes spelling, grammar and punctuation, so it will not rewrite what you just approved.

## Make it write like your team

Two settings keep the output consistent:

- **How it replies** (Settings → AI) holds standing instructions for every question, such as "American spelling. Imperative mood in steps. Use `code` formatting for commands, paths and flags. No marketing language."
- **Memory** holds facts about one folder. Type `/remember` followed by "the service is called Ledger, never 'the ledger service'" or "we deploy with Argo CD", and it goes along with every question in that folder.

## The same agent, kept out of your code

You may be wondering whether pointing a coding agent at your repository's docs folder lets it loose on the repository. In nuza it does not.

nuza offers the agent no file access and no terminal, and refuses every request to run a command or write a file. Its only reach into your folder is nuza's read-only search, and only if you turn it on. On macOS and Linux the operating system adds a sandbox around it, so it cannot read anything nuza does not send it and can only write to its own cache. On Windows that sandbox does not exist, which nuza tells you. [How the AI works](/docs/ai/) has the full detail, including the two risks that remain.

It also costs nothing extra. The agent runs on the plan you already pay for, and nuza picks that agent's cheapest model by default, which is plenty for documentation work. The [setup guide](/blog/claude-code-codex-opencode-for-writing/) covers each agent.

## Keyboard first

nuza is built to be driven from the keyboard, with Vim keybindings if you want them. Some shortcuts for the panel:

| Shortcut | What it does |
| --- | --- |
| ⌘L | Open the AI panel about the note, or close it |
| ⌘⇧L | Ask for an edit to the selection |
| `/` | Pick a writing action in the panel |
| ⌘Enter | Accept every waiting suggestion |
| ⌘Backspace | Reject every waiting suggestion |
| ⌘. | Stop the answer |

⌘L and ⌘⇧L can be rebound under **Settings → Keymaps**. On Windows and Linux, ⌘ is Ctrl.

## Try it on one document

[Download nuza](https://github.com/puang59/nuza/releases/latest), open a repository's `docs/` folder, turn AI on in **Settings → AI**, and ask your agent the question you would least like a reviewer to ask about your current design doc.
