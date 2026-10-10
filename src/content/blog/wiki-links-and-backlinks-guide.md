---
title: "Wiki-links and backlinks: how to link your notes so you can find them again"
description: "A practical guide to wiki-links and backlinks in markdown notes. Learn the syntax, when to link, how backlinks surface forgotten ideas, and habits that scale."
pubDate: 2026-09-26
author: puang
---

Folders are how most of us first organise notes, and they work until a note belongs in two places. Is the summary of a book about negotiation a book note, a work note, or part of the project where you plan to use it? A folder makes you pick one. A link does not.

Linking notes together is the single habit that makes a collection of notes more useful as it grows instead of less. This guide covers how wiki-links and backlinks work, the syntax, and the habits that keep a linked set of notes healthy for years.

## What is a wiki-link?

A wiki-link is a link to another note, written by putting the note's name in double square brackets:

```markdown
We agreed to follow the plan in [[Q4 roadmap]].
```

That is the whole syntax. There is no path to type and no address to copy. The name of the note is the link. The idea comes from wikis, where every page name is a potential link, and it has become the common convention in markdown note taking apps.

Compare it with a standard markdown link:

```markdown
We agreed to follow the plan in [Q4 roadmap](../planning/Q4%20roadmap.md).
```

Both work, but only one of them is something you will type in the middle of a thought. Wiki-links matter because they make linking cheap enough to do all the time.

## What is a backlink?

A link goes one way: from the note you are writing to the note you mention. A backlink is the same connection seen from the other end. If your meeting note links to `[[Q4 roadmap]]`, then the roadmap note has a backlink from the meeting.

You never write backlinks. The app works them out by looking at every link in your notes. In nuza they appear in the sidebar: open a note and you can see every other note that links to it.

This sounds like a small convenience and turns out to be the main event. Backlinks answer a question that folders and search cannot: **where have I mentioned this before?** Open the note for a person and you see every meeting they were in. Open the note for a concept and you see every place you have used it, including the ones you had forgotten.

## The syntax, in full

Here is what nuza understands.

| You write | What it does |
| --- | --- |
| `[[Note name]]` | Links to the note with that name |
| `[[folder/Note name]]` | Links to a note by its path from the top of the vault |
| `[[Note name\|label]]` | Links to the note, and shows the label in its place |
| `[[Note name#Heading]]` | Links to a heading inside that note |
| `[[#Heading]]` | Links to a heading in the note you are in |
| `[text](#heading)` | A standard markdown link to a heading in this note |
| `![[image.png]]` | Shows an image from your vault in the note |

Linking to a heading is worth learning early. Long notes are fine when you can point at the exact part you mean.

Because the link is just text inside a plain markdown file, it is not locked to one app. Several markdown note apps use the same double bracket convention, so a folder of linked notes stays linked if you open it somewhere else. That portability is a large part of [why we think notes should be plain markdown files](/blog/plain-markdown-files-for-notes/).

## When to make a link

People who are new to linking tend to either link nothing or link everything. A few simple rules get you to a useful middle.

### Link when you mention something that has, or deserves, its own note

People, projects, books, recurring meetings, concepts you keep coming back to. If you write a name that you would want to look up later, bracket it.

### Link at the moment of writing

Do not plan a session to "connect your notes" later. It will not happen, and links added in bulk are worse than links made in context. The right time is when the thought occurs: you are writing about a problem and you remember a note about a similar one. Link it then.

### Prefer a link in a sentence to a bare list

A list of related notes at the bottom tells you that notes are related. A sentence tells you why:

```markdown
This is the same trade-off we hit in [[Billing migration]], where we chose
the slower option because rollback was easier.
```

Future you, arriving through a backlink, will read that sentence and immediately know whether the connection matters.

### Do not worry about links to notes that do not exist yet

Writing `[[Some idea]]` before the note exists is a useful way to mark something worth writing up later.

## Three patterns that work

### The hub note

A hub note, sometimes called a map of content, is a note whose job is to link to other notes on a topic. A note called `Home network` might link to notes on the router setup, the backup schedule and the list of devices. It is a hand-made table of contents.

Hub notes give you most of what a folder gives you, with one difference that matters: a note can appear in as many hubs as make sense.

### The person note

Make a short note for each person you work with regularly, and link to it from meeting notes. The person's note can stay nearly empty. Its backlinks become a complete record of every conversation you wrote down, in one place, with no filing.

### The daily note that points outward

If you keep a daily log, link from it to the project and topic notes you touched that day. The daily note stays short, the lasting material lives in topic notes, and backlinks let each project note show its own history day by day.

## Links, tags and folders: which to use

They solve different problems, and they work best together.

- **Folders** are for broad, stable separation. Work and personal. Archive and active. A note lives in exactly one.
- **Tags** are for kinds and states. `#idea`, `#draft`, `#book`. A tag says what sort of thing a note is. nuza shows tags as small chips in the text and lists every tag in your vault in the sidebar.
- **Links** are for specific relationships between this note and that one.

A reasonable setup is a handful of folders, a small set of tags, and as many links as come naturally.

## Keeping links healthy

A few habits prevent the usual problems.

**Give notes clear, specific names.** The name is what you will type inside the brackets. `Onboarding checklist for new engineers` is easier to link to, and to recognise in a list of backlinks, than `Checklist`.

**Avoid two notes with the same name.** A wiki-link identifies a note by name, so duplicates make links ambiguous.

**Think before renaming a much-linked note.** Check the note's backlinks first so you know which notes mention it.

**Use the outline for long notes.** nuza's sidebar shows the headings of the open note, and you can jump between headings from the keyboard. Combined with heading links, a long note stays easy to move around in.

## How linking works in nuza

nuza is a free, open-source markdown note taking app, and linking is part of the core rather than an add-on.

- Type `[[` and the name of a note to link it. Follow the link to open that note.
- The sidebar has a view for the notes that link to the one you have open, a view for the outline of its headings, and a view for the tags in your vault.
- You can link to another note from the editor's right-click menu if you prefer not to type the brackets.
- Links to headings work across notes and within one.
- Quick open and full-text search cover the cases where you do not remember what links where.

There is no graph view. We have found that backlinks in the sidebar, right beside the note you are reading, answer the questions a graph is supposed to answer, and they do it while you are working rather than in a separate screen.

## Start small

You do not need a method with a name to get the benefit. Tomorrow, when you write a note and mention a project, a person or an idea you have written about before, put it in double brackets. Do that for a month. Then open one of those notes and look at its backlinks. That list, built without any extra effort, is the argument for linking.

If you want an app that makes this pleasant, [download nuza](https://github.com/puang59/nuza/releases/latest) and open your notes folder in it. If you are arriving with an existing vault, see [how to open your Obsidian vault in nuza](/blog/open-obsidian-vault-in-nuza/).
