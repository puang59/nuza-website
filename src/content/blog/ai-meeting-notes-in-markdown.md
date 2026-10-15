---
title: "From messy meeting notes to decisions and action items, with AI"
seoTitle: "AI meeting notes and action items in markdown"
description: "How product managers, founders and freelancers can use an AI assistant in plain markdown notes to clean up meeting notes, pull out decisions and tasks, write briefs and run a weekly review."
pubDate: 2026-10-15
author: puang
---

Meeting notes are written in the worst conditions for writing. You are listening, talking and typing at once, so what lands on the page is fragments, names, arrows and a few words in capitals that meant something at the time. The useful parts, what was decided and who is doing what, are in there. Getting them out is the job nobody gets round to.

This is a good job for AI, as long as it works on your notes rather than replacing them. This post shows how to do that in nuza, a free, open-source markdown notes app with an AI panel. The panel uses an AI agent you already have on your own account, it is off until you turn it on, and every change it suggests comes back into the note for you to approve.

## Take notes in a plain file

Nothing special is needed during the meeting. A note per meeting, named by date, in a folder:

```text
Work/
  Meetings/
    2026-10-14 Pricing review.md
    2026-10-15 Client kickoff - Northwind.md
  Projects/
    Pricing page.md
  Weekly/
    2026-W42.md
```

Write however you write. Links help later, so when a project or a person comes up, type `[[Pricing page]]` and keep going. nuza lists, on each note, every note that links to it, so the project note quietly collects every meeting where it came up.

## After the meeting: pull out what matters

Open the note, press ⌘L (Ctrl+L on Windows and Linux) and ask:

> "Add a Decisions section and an Action items section at the top, from what is in these notes. Action items as tasks with the owner's name. Do not add anything that is not in the notes."

The answer comes back as suggestions in the note: new sections at the top, written as markdown task lists like `- [ ] Send revised quote (Sam)`, which nuza shows as checkboxes. Review each one. The instruction not to add anything matters, because that is where a summary can drift from what was actually said. Reject anything you do not recognise.

Then, if the notes themselves need it, select the body and ask to "tidy this into short bullet points under topic headings, keeping every fact". Again, you see each change before it lands, and ⌘Z undoes any you accept.

## Ask questions instead of rereading

Sometimes you do not need the notes rewritten. You need an answer:

- "What did we agree about the trial length?"
- "Did anyone object to the new tier, and why?"
- "What is still open from this meeting?"

These answers stay in the panel and do not change the note.

With vault search on, you can ask across meetings: "What have we decided about pricing across all the meetings this month?" The agent searches your notes through nuza's read-only tools and cites the notes it used. Each citation opens the note at the paragraph, so you can check the exact words before you quote them to anyone.

## Turn decisions into documents

Meetings produce documents: a project brief, a proposal, a follow-up email. Ask for a new note:

> "Create a note in Projects called Northwind onboarding brief, from this kickoff: goals, scope, timeline as a table, open questions."

A card in the panel shows the path and a preview, and the note is only created when you press **Create**. It never replaces an existing note, and it links back to the meeting with a `[[wiki link]]`, so the meeting and the brief point at each other.

For a follow-up email, ask in the panel and copy the draft out of the answer. If you would rather start from your own words, write the email in a note and run **Improve writing** or **Rephrase** on it instead.

For client work, tone matters. Select a paragraph and ask: "Make this firmer about the deadline but still friendly." You see the suggested wording beside yours, and keep whichever reads right.

## A weekly review in ten minutes

At the end of the week, open a new note in `Weekly/` and ask:

> "Using my meeting notes from this week, list the decisions made, the action items still open with their owners, and anything that came up in more than one meeting."

The agent reads the week's notes, if you let it search, and cites each one. Edit the result into your review, then tick off what is done in the original notes. It makes a good Friday habit, because the sources are all one click away.

## Set it up once

- **How it replies** (Settings → AI) is for standing instructions: "British spelling. Action items as tasks with owner in brackets. Never invent dates."
- **Memory**, per folder: `/remember` followed by something like "Sam is the account manager for Northwind" or "our fiscal year starts in April". It goes along with every question in that folder.

## Privacy, briefly

Meeting notes are full of other people's information, so it is worth being precise. The agent is sent the note you are asking about and your question, plus the notes it looks up if vault search is on, and only when you ask. That goes to the agent's provider on your account. nuza has no server, your notes stay files on your disk, and on macOS and Linux the agent runs in an operating-system sandbox that stops it reading anything nuza does not send it. You can turn vault search off for a folder of sensitive meetings. The [privacy post](/blog/private-ai-note-taking-with-local-markdown/) covers it all.

## Getting started

1. [Download nuza](https://github.com/puang59/nuza/releases/latest) and open your work folder.
2. Install Claude Code, Codex or OpenCode, and sign in. The [setup guide](/blog/claude-code-codex-opencode-for-writing/) covers each.
3. Turn AI on in **Settings → AI**.
4. Open your last meeting note, press ⌘L, and ask what was decided.

For more on what the panel can do, start with [the overview](/blog/ai-writing-assistant-for-markdown-notes/), or see [why we call it Cursor for writers](/cursor-for-writers/).
