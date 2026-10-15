---
title: "Research notes with AI: ask questions across your whole vault"
seoTitle: "AI research notes with backlinks and citations"
description: "How researchers and knowledge workers can use an AI agent to search, connect and summarise a vault of markdown notes, with citations back to the paragraph and new notes linked both ways."
pubDate: 2026-10-15
author: puang
mentionsObsidian: true
---

A research vault has a particular kind of problem. The information you need is in there, spread over reading notes, meeting notes and half-finished drafts written months apart. Finding it means remembering it exists, then remembering what you called it.

Search helps when you know the words. Links help when you made them at the time. An AI agent that can read your notes helps with the rest: "what have I written about sampling bias?", "which papers did I say disagreed with this?", "summarise my notes on this topic before I start writing".

This post is about doing that in nuza, a free and open-source markdown notes app with an AI panel that can search your vault, answer with citations, and draft new notes linked back to their sources. The panel is off until you turn it on, and it uses an AI agent you already have on your own account.

## The vault

Nothing here needs a special structure. A research vault in nuza is a folder of markdown files, often something like:

```text
Research/
  Papers/
    Smith 2021 - Sampling in field studies.md
    Okafor 2023 - Replication.md
  Topics/
    Sampling bias.md
  Meetings/
    2026-10-02 Supervisor.md
  Drafts/
    Chapter 2.md
```

Two habits make everything below work better. First, give reading notes some frontmatter, the block of properties at the top of a note:

```yaml
---
title: Sampling in field studies
authors: [Smith, Lee]
year: 2021
tags: [methods, sampling]
status: read
---
```

Second, link generously with `[[wiki links]]`. When a paper note mentions a topic, link it: `[[Sampling bias]]`. Each note then lists what links to it in its backlinks, and the vault starts to show its own structure. Our [guide to wiki links and backlinks](/blog/wiki-links-and-backlinks-guide/) covers this in detail.

## Asking across the vault

Open the AI panel with ⌘L (Ctrl+L on Windows and Linux) and ask a question that needs more than the note in front of you:

- "Which of my paper notes discuss sampling bias, and what do they each say about it?"
- "What did my supervisor and I decide about the survey design?"
- "Is anything in this draft contradicted by my reading notes?"

With **Let the agent search this vault** on in Settings, the agent can search, list and read your notes through nuza's own read-only tools. It can follow tags, read outlines and look at backlinks, and it cannot write anything or see outside the vault.

It is told to leave your other notes alone unless the question needs them, so asking about the note in front of you stays about that note. When you ask something that does need them, it looks, and its answer cites the notes it used. A citation is a link: it opens the note at the paragraph the claim came from.

That is the habit worth building. **Treat the answer as a pointer, and the citation as the source.** Agents summarise well and occasionally confidently wrong. A cited paragraph takes a second to check.

## Synthesis notes, linked both ways

The step after finding is connecting. Ask for a new note:

> "Create a note in Topics called Sampling bias in field studies that summarises what my paper notes say about it, with a table of each paper's approach and a link to each."

You get a card in the panel with the path the note would go to and a preview of what it would say. Nothing is written until you press **Create**, and it never overwrites a note that already exists. The agent writes proper frontmatter and a markdown table, and links each paper with a `[[wiki link]]`. It can also suggest adding a link back from the notes it drew on, as a normal suggestion you accept or reject. Either way, every source shows the new note in its backlinks.

This is a good way to start a literature review. The synthesis note is a map of what you have read, with every claim one click from the note that made it. Write the review itself from there, in your own words.

## Working on a draft

When you move from notes to writing, the panel's writing actions help with the draft itself:

- **Explain this**, on a dense paragraph you wrote at 2am, to see whether it says what you meant.
- **Improve writing** or **Rephrase**, on a selection, for clarity. Each change is a suggestion in the note that you accept or reject one at a time.
- **Proofread**, at the end, for spelling, grammar and punctuation only.
- Plain questions, like "Is this paragraph consistent with what I wrote in [[Okafor 2023 - Replication]]?"

For a fuller workflow, see [how writers can use AI without losing their voice](/blog/how-writers-use-ai-without-losing-their-voice/).

## Tables, maths and frontmatter

The agent knows how nuza's markdown works, so what it writes fits your vault:

- **Frontmatter** in the properties block at the top, and edits to existing properties rather than duplicates.
- **Tables** as proper markdown tables, which nuza renders as tables.
- **Maths** in LaTeX, `$...$` inline and `$$` blocks, which nuza renders in your notes.
- **Links and embeds** in the vault's own `[[wiki link]]` and `![[embed]]` forms, and `#tags`.

## Keeping it private

Research notes are often confidential: unpublished findings, interview transcripts, a supervisor's comments. It is worth knowing exactly what happens.

The agent is sent the note you are asking about and your question. When it searches the vault, it is sent the notes it looks up. All of that goes to the agent's provider, on your account and under its terms, just as if you had pasted it in yourself. nuza has no server and keeps nothing of its own outside your computer.

You can turn vault search off for a folder in Settings, so the agent only ever sees the note you are asking about. You can turn off **Send the whole note**, so only your selection goes. And on macOS and Linux, the agent runs inside an operating-system sandbox that stops it reading anything nuza does not hand it. The [privacy post](/blog/private-ai-note-taking-with-local-markdown/) covers this in full.

## Getting started

1. [Download nuza](https://github.com/puang59/nuza/releases/latest) and open your research folder. If it is an existing Obsidian vault, [here is how that works](/blog/open-obsidian-vault-in-nuza/).
2. Install an agent: Claude Code, Codex or OpenCode. The [setup guide](/blog/claude-code-codex-opencode-for-writing/) walks through each.
3. Turn AI on in **Settings → AI**, and leave vault search on for this folder.
4. Press ⌘L and ask something you have been meaning to look up in your own notes.
