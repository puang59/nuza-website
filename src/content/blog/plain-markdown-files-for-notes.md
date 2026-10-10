---
title: "Why your notes should be plain markdown files"
description: "Plain markdown files outlive apps, sync with anything and work with every tool you own. Here is why local-first markdown is the safest home for your notes."
pubDate: 2026-09-18
author: puang
---

Most people choose a note taking app by looking at the app. The editor, the sidebar, the theme, the features. It is the natural thing to do, and it is looking at the wrong thing.

The app is temporary. You will probably use several over your life. What lasts is the notes themselves, and the most important decision you make is what form they are stored in. Our argument in this post is that the best form is the most boring one available: plain markdown files, in a folder, on your own disk.

## Notes are a long-term asset

Think about how long you expect your notes to be useful. A meeting note might matter for a month. A recipe, a journal, research for a book, the documentation of how your home network is wired, the reasons behind a decision you made at work: these are things you may want in ten or twenty years.

Now think about software over the same span. Apps that felt permanent get acquired, change their pricing, drop a platform, or simply close. When your notes live inside an app's own database or on its servers, their lifespan is tied to the lifespan of that product and that company.

A plain text file has no such dependency. A text file written decades ago opens today on any computer, in any editor, with no conversion. Nothing else in computing has that record. If you want notes that outlive the app that wrote them, plain text is the only format with a track record long enough to trust.

## Why markdown in particular

Plain text alone is a little too plain. You want headings, lists, links, emphasis, maybe a table. Markdown gives you those with a handful of characters that are readable even when nothing renders them:

```markdown
# Project kickoff

Attendees: Maya, Tom, Priya

## Decisions

- Ship the beta in **March**
- Use the existing login flow

## To do

- [ ] Draft the announcement
- [x] Book the room
```

Open that in the dumbest editor you can find and it still makes perfect sense. That is the property that matters. The formatting is a convention on top of text, not a binary format that needs a specific program to decode.

Markdown is also everywhere. Code hosting sites render it, documentation tools are built on it, and chat apps borrow its syntax. Learning it once pays off in many places, and a huge range of tools can read, convert and publish it.

## What you can do with files that you cannot do with a database

When notes are ordinary files, every tool on your computer becomes a notes tool.

**Search them your own way.** Your system's file search indexes them. Command line tools like `grep` and `ripgrep` search thousands of notes in a blink.

**Back them up like anything else.** Whatever already backs up your documents backs up your notes. There is no separate export to remember.

**Put them under version control.** A folder of markdown is a perfect fit for git. You get the full history of every note, the ability to undo any change, and a free off-site copy if you push to a remote.

**Sync them with anything.** iCloud Drive, Dropbox, Syncthing, a USB stick. Files are the one thing every sync tool understands. We cover the options in [how to sync markdown notes without an account](/blog/sync-markdown-notes-without-an-account/).

**Process them with scripts.** Want a list of every unchecked task across all notes? A count of words written this month? A static website generated from a folder? These are a few lines of scripting when notes are files, and somewhere between hard and impossible when they are rows in an app's private database.

**Use more than one app.** This one is underrated. You can keep a folder open in a notes app for writing, open the same folder in a code editor for a big find and replace, and read it on your phone with a third app. Nobody has to give permission, because nobody owns the format.

## Local-first means private by default

When your notes are files on your own disk, privacy is not a setting. It is the starting state. Nothing is uploaded unless you set that up yourself, and there is no account that can be breached, locked or closed.

It also means your notes work offline, always. On a plane, during an outage, or on a machine that has never been connected to anything, the folder is still there and still opens.

This is the approach nuza takes. It opens a folder you choose and reads and writes the markdown files inside it. There is no account, no telemetry on what you write, and no server that ever sees your notes.

## The honest trade-offs

Plain files are not magic, and it is worth knowing where they are weaker.

**Sync is your job.** An app with its own cloud can make sync invisible. With files you choose a sync tool and occasionally deal with a conflicted copy. For most people a synced folder works without thought, but it is one more decision.

**Structure lives in conventions.** There is no database to enforce that every book note has an author field. Frontmatter helps a lot here, which we will come to, but the discipline is yours.

**Rich embeds are limited.** Markdown handles text, images, links, tables, code and math well. It is not a spreadsheet or a kanban board. If you want those inside your notes, a database-style app does them better.

**Real-time collaboration is not built in.** Two people editing the same file at once is a problem plain files do not solve.

For personal notes, we think these trades are overwhelmingly worth it. But they are real, and you should make the choice knowing them.

## How to set up a markdown notes folder that lasts

A few habits make a plain-file system pleasant to live in for years.

### Start flat, add folders slowly

It is tempting to design a deep folder tree on day one. Resist it. Start with a handful of top-level folders, or none at all, and let search and links do the work of finding things. Add a folder when you notice you actually need it.

### Name files the way you would search for them

The file name is the title. `Meeting with design team 2026-09-12.md` is easier to find than `notes3.md`. Dates written as year, month, day sort correctly on their own.

### Link notes instead of nesting them

A note can only live in one folder, but it can link to as many notes as you like. Wiki-links such as `[[Project kickoff]]` connect ideas across the whole folder, and backlinks show you everything that points at the note you are reading. Our [guide to wiki-links and backlinks](/blog/wiki-links-and-backlinks-guide/) goes deeper.

### Use frontmatter for the facts

A small block at the top of a note holds structured details without leaving plain text:

```markdown
---
author: Ursula K. Le Guin
finished: 2026-08-30
rating: 5
---
```

It stays readable as text, and apps that understand it, nuza included, show it as tidy editable properties.

### Keep attachments beside the notes

Images and other files should live inside the same folder as the notes that use them, so the whole thing moves as one unit. nuza files pasted and dropped images under a `media` folder in your vault for this reason.

## Choose the format first, then the app

If you take one thing from this post, let it be the order of the decision. Pick the format that will still be readable in twenty years, and only then pick the app you like best for working with it today. With plain markdown, changing your mind about the app later costs you nothing. You close one program and open the same folder in another.

nuza is our attempt at a small, fast window onto a folder like that. It is free and open source, and if you ever stop using it, your notes will not notice. [Download nuza](https://github.com/puang59/nuza/releases/latest) and point it at a folder to try it.
