---
title: "Studying with AI: better notes, not someone else's homework"
seoTitle: "AI study notes for students in markdown"
description: "How students can use an AI assistant in their markdown notes to understand hard passages, tidy lecture notes, build summary tables and practice questions, and write maths, without handing over their work."
pubDate: 2026-10-15
author: puang
---

Every student now has access to an AI that will write an essay on demand. That is mostly a trap. You learn by doing the thinking, and an essay you did not think through teaches you nothing, whatever it scores.

There is a better use for the same tools: making your own notes clearer, and making the hard parts of a course easier to understand. This post walks through that, using nuza, a free and open-source notes app for plain markdown files with an AI panel built in. The panel is off until you turn it on, it works with an AI agent you already have, and every change it makes to a note is a suggestion you approve.

## Why markdown notes suit studying

Markdown is plain text with a few symbols for structure: `#` for headings, `-` for lists, `**bold**`, tables, and `$x^2$` for maths. Notes written this way are just files in a folder. They open in any editor, they work offline, they cannot get locked in an app that shuts down, and they are easy to keep in sync or back up. Our post on [plain markdown files for notes](/blog/plain-markdown-files-for-notes/) goes into why that matters.

A simple layout for a course:

```text
Biology 101/
  Lectures/
    01 Cells.md
    02 Membranes.md
  Readings/
    Alberts ch 2.md
  Summaries/
    Cell transport.md
  Exam prep.md
```

Link notes to each other with `[[wiki links]]`, like `[[02 Membranes]]`, and each note shows what links back to it. That turns a pile of notes into something closer to the course's actual structure. The [wiki links and backlinks guide](/blog/wiki-links-and-backlinks-guide/) explains how.

## Understand a hard passage

This is where the AI panel earns its place. Paste in the paragraph from the textbook you have read four times, or point at the line in your lecture notes that made no sense, select it, and run **Explain this**.

The explanation is about the selection in the context of the whole note, so it fits what came before and after. It appears in the panel and does not touch your note. Then ask follow-ups in plain language:

- "Explain it again with a concrete example."
- "What is the difference between this and facilitated diffusion?"
- "What would a common exam mistake about this be?"

When you understand it, write the explanation into your notes **in your own words**. That step is the learning. The AI helped you get there, but the sentence in your note should be yours.

## Tidy lecture notes after class

Notes taken live are messy: half sentences, abbreviations, things in the wrong order. Select a section and ask the panel to "turn this into clean bullet points under the right headings, without adding anything I did not write."

The changes come back as suggestions in the note. Review them. Reject anything that adds information you did not have, because that is where errors creep in, and accept the restructuring. Accepting is an ordinary edit, so ⌘Z undoes it.

**Proofread** is useful here too. It fixes spelling and grammar only, so a quick pass makes notes readable without rewriting them.

## Build summary tables and practice questions

Some material is easier to revise as a table. Ask: "Make a table comparing passive transport, facilitated diffusion and active transport: energy, direction, examples." The agent writes a proper markdown table, and nuza renders it as a table in the note.

For revision, ask for a new note: "Create a note in Summaries with ten practice questions on this lecture, answers at the bottom." You get a card in the panel showing where the note would go and what it would say. It is only made when you press **Create**, and it links back to the lecture note with a `[[wiki link]]`, so the lecture shows it in its backlinks.

Then answer the questions without looking. Questions you wrote yourself, or at least answered yourself, are worth more than a summary you only read.

## Write maths properly

nuza renders LaTeX maths in notes: `$E = mc^2$` inline, and blocks between `$$` lines. The AI knows this, so asking it to "write the derivation of the quadratic formula as LaTeX" gives you something that renders in your note. In the panel itself, maths is shown as its TeX source, so you can read exactly what it wrote before you accept it.

This is useful for checking your own work, too. Select a step of a derivation and ask whether it follows from the line before.

## Ask across your notes

If you let it, the agent can search and read the other notes in your course folder through nuza's read-only search. It is told to leave other notes alone unless you ask, so normal questions only involve the note you are in. But near an exam you can ask, for example:

- "Which of my lecture notes cover membrane potential?"
- "Using my notes from weeks 3 to 5, what are the main themes?"
- "Is anything in this summary contradicted by my lecture notes?"

The agent cites the notes it used, and a citation opens the note at the paragraph, so you can check the source rather than trust the summary.

## Set it up for your subject

Two settings make the help fit your course:

- **How it replies** (Settings → AI) holds standing instructions, such as "I'm a first-year biology student; explain at that level and define jargon the first time."
- **Memory** keeps facts about one folder. Type `/remember` in the panel followed by something like "this course uses the Alberts textbook, 7th edition", and it goes along with every question in that folder.

## What it costs, and what it sends

nuza is free. The AI comes from an agent on your own account: Claude Code, Codex or OpenCode. OpenCode has free models, which are enough for most study questions. The [setup guide](/blog/claude-code-codex-opencode-for-writing/) covers each one.

The agent is sent the note you are asking about and your question, and only when you ask. It cannot change your files directly, and on macOS and Linux the operating system stops it from reading anything outside what nuza sends it. The [privacy post](/blog/private-ai-note-taking-with-local-markdown/) has the detail.

## A note on honesty

Check what your course allows. Many courses are fine with AI for understanding material and not for writing assessed work. nuza's design leans the right way, since it is built to help with notes you write, not to write them for you. But the rule that matters is your institution's.

Used like this, AI does not do your studying for you. It makes the parts that used to be stuck, like the paragraph you could not parse or the notes you could not read back, quicker to get past, so more of your time goes into the actual learning.

[Download nuza](https://github.com/puang59/nuza/releases/latest), or read [what the AI panel does](/cursor-for-writers/) first.
