---
title: "A markdown note taking workflow for developers"
description: "How developers can keep useful notes in plain markdown: what to write down, how to structure it, and a keyboard driven workflow with nuza, the terminal and git."
pubDate: 2026-10-08
author: puang
---

Developers write notes whether they mean to or not. They end up in scratch files, in unsent chat messages, in a `TODO.md` at the root of a repository, in the comments of a pull request, and in a terminal's scrollback that is gone by Friday. The information exists. It is just not anywhere you can find it again.

This post is a practical workflow for fixing that with plain markdown files. It covers what is worth writing down, how to lay it out, and how to make note taking fast enough that you actually do it in the middle of real work. The examples use nuza, the open-source notes app we build, but the structure works with any editor.

## Why markdown fits the way developers work

You already write markdown. READMEs, pull request descriptions, issue comments and documentation all use it. Keeping notes in the same format means there is nothing new to learn and nothing to convert when a note becomes a document.

Plain files also slot into tools you already have. You can search them with `ripgrep`, version them with git, edit them in your code editor when that is what is open, and pipe them through scripts. We made the longer case in [why your notes should be plain markdown files](/blog/plain-markdown-files-for-notes/).

## What is worth writing down

Not everything deserves a note. These five kinds repay the effort many times over.

### 1. A work log

One note per day, written as you go. What you worked on, what you tried, what you found. It takes thirty seconds at a time and answers questions like "what did I do on Tuesday?" and "when did we change that setting?" for years.

```markdown
# 2026-10-08

## Payment retries

- Reproduced the duplicate charge locally with two workers
- Root cause: the idempotency key is built before the retry count is read
- Fix is in [[Payment retry design]], PR up for review

## To do

- [ ] Add a test for the two worker case
- [x] Reply to the incident thread
```

### 2. Debugging notes

When you are deep in a hard bug, write down each hypothesis and what disproved it. This feels slow and is not. It stops you testing the same idea twice, and it turns into a ready-made explanation for the pull request and for whoever meets the same bug next.

### 3. Commands and snippets

The command with six flags that you look up every three months. The query that finds stuck jobs. The steps to renew a certificate. Put each in a note with a sentence saying what it does and when you last used it.

````markdown
## Find the largest tables

```sql
SELECT relname, pg_size_pretty(pg_total_relation_size(relid))
FROM pg_catalog.pg_statio_user_tables
ORDER BY pg_total_relation_size(relid) DESC
LIMIT 20;
```
````

In nuza, fenced code blocks are highlighted in their own language, and long lines scroll sideways instead of wrapping, so a command stays readable as one line.

### 4. Decisions and the reasons for them

Code shows what was decided. It rarely shows why, or what else was considered. A short note per decision, with the options and the reason one was chosen, is one of the most valuable things a team member can keep.

### 5. How systems work

Whenever you finally understand how a confusing part of the system fits together, write it down while it is fresh. A page of plain language and a list of the relevant files will save you, and your colleagues, hours.

## A structure that stays out of your way

Keep the layout shallow. Something like this is enough:

```
notes/
  daily/
  projects/
  reference/
  people/
  media/
```

Daily logs go in `daily`. Each project gets a note or a small folder. Commands, how-tos and explanations live in `reference`. Use links, not deeper folders, to connect them. A daily log that mentions `[[Payment retry design]]` gives that design note a backlink, and over time the design note collects its own history. Our [guide to wiki-links and backlinks](/blog/wiki-links-and-backlinks-guide/) covers this pattern in detail.

Use frontmatter where a bit of structure helps:

```markdown
---
status: accepted
date: 2026-10-08
owners: [maya, tom]
---
```

nuza shows that block as editable properties at the top of the note, and it remains ordinary text that scripts can parse.

Tags are useful for kinds of note that cut across folders, such as `#decision`, `#howto` or `#incident`. nuza lists every tag in the vault in the sidebar.

## Making it fast enough to actually use

Notes only get written if writing them costs almost nothing. This is where the tool matters.

### Open notes from the terminal

You are usually in a terminal when something worth noting happens. nuza can install a `nuza` command from its settings, and then:

```sh
nuza ~/notes                  # open the whole vault
nuza ~/notes/reference/db.md  # open one note
nuza .                        # open the folder you are in
```

If nuza is already running, the path is handed to the existing app instead of starting a second copy, and it goes to the window that already has that vault open. The command returns immediately, so your terminal is not held up.

This also makes nuza a pleasant viewer for the markdown in any repository. Run `nuza .` in a project to read its docs folder rendered properly.

### Stay on the keyboard

Everything you do often has a shortcut. On macOS use Cmd where this table says Ctrl.

| Action | Shortcut |
| --- | --- |
| Quick open a note by name | Ctrl+Shift+F |
| Find a file in the sidebar | Ctrl+P |
| New note | Ctrl+N |
| Open a folder | Ctrl+O |
| Toggle the sidebar | Ctrl+\ |
| New window | Ctrl+Shift+N |
| Zen mode | Ctrl+. |
| Toggle Vim mode | Ctrl+Shift+V |
| Settings | Ctrl+, |

All of them can be rebound in settings. Quick open also lists the notes you opened recently, so getting back to today's log is two keystrokes.

### Use Vim keys if you have them

If you edit code with Vim motions, switching to an editor without them for notes is jarring. nuza has Vim mode built in. It is off by default and one toggle away, and the current mode is shown in the status bar. See [Vim keybindings for note taking](/blog/vim-keybindings-for-note-taking/) for the motions that matter most for prose.

### Keep reference material beside your work

Split view puts a second note next to the one you are writing, which suits writing a design while reading the requirements, or keeping a checklist visible during a deploy. You can also move a note into a window of its own and park it on another screen.

### Search like you search code

Full-text search covers the text of every note in the vault and supports regular expressions. Combined with a consistent habit, such as starting decision notes with the same heading, a regex search becomes a quick query over your own history.

## Things developers tend to like

A few details that matter more to this audience than most:

- **Math.** Inline `$...$` and block `$$...$$` are rendered with KaTeX, which is handy for complexity notes and anything statistical.
- **Tables you can edit.** Cells are edited in place, and rows and columns can be added or removed from the table itself, without counting pipes.
- **Tasks.** `- [ ]` renders as a checkbox you can tick.
- **Folding and an outline.** Long documents fold by heading, and the sidebar shows the outline of the open note.
- **Print or save as PDF.** Useful when a note needs to go to someone who does not want a markdown file.
- **A scratch note.** nuza opens on an empty scratchpad, so there is always somewhere to paste a stack trace or type a thought before deciding where it belongs.

## Version your notes with git

Since the vault is a folder of text, `git init` in it gives you history, diffs and an off-site copy for free. A commit at the end of the day is enough. If someone or something changes a note while you have it open, for instance after a `git pull`, nuza notices the change on disk rather than silently overwriting it.

For getting the vault onto several machines, including options that avoid any server, see [how to sync markdown notes without an account](/blog/sync-markdown-notes-without-an-account/).

## Work notes and private notes

One practical caution. Notes about your employer's systems are your employer's information, and belong wherever your company's rules say, which is usually on a work machine and not in a personal cloud folder. Because nuza keeps vaults as separate folders and can open each in its own window, keeping a work vault and a personal vault apart is straightforward. nuza itself uploads nothing, so where your notes go is decided entirely by where you put the folder.

## Start with the daily log

If this all seems like a lot, do one thing: tomorrow morning, create a note named with the date and write down what you do as you do it. Link anything that deserves its own note. After two weeks you will have a searchable record of your own work, and the rest of the structure will suggest itself.

nuza is free and open source under the MIT license, for macOS, Windows and Linux. [Download it](https://github.com/puang59/nuza/releases/latest), or read the source on [GitHub](https://github.com/puang59/nuza).
