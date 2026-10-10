---
title: "How to open your Obsidian vault in nuza"
description: "A step by step guide to opening an existing Obsidian vault in nuza: what works straight away, what does not carry over, and how to use both apps on one folder."
pubDate: 2026-10-03
author: puang
mentionsObsidian: true
---

One of the best things about keeping notes as plain markdown files is that trying a different app costs nothing. There is no export, no import and no conversion. You point the new app at the same folder.

If you have an Obsidian vault and you are curious about nuza, this guide walks through exactly that. It covers how to open the vault, what works immediately, what will not carry over, and how to run both apps on the same notes while you decide.

## First, is nuza right for you?

It saves time to be direct about this. nuza is a smaller app than Obsidian, on purpose. It has no plugins, no graph view, no mobile apps and no sync service of its own.

nuza is a good fit if what you mostly do is write and link markdown notes, and you want that in an app that is quick to open, simple to understand, open source, and comfortable to drive from the keyboard, with Vim keybindings built in.

It is not a good fit if your workflow depends on community plugins, if you use the graph view to navigate, or if you need the same app on your phone. Those are real strengths of Obsidian, and nuza does not try to match them. Our [side by side comparison](/obsidian-alternative/) lays out the differences in a table.

Still interested? It takes about a minute to find out for yourself.

## Step 1: back up the vault

Opening a vault in nuza does not convert or restructure anything. Still, any time you point a new program at files you care about, make a copy first. Duplicate the folder, or make sure your usual backup has run. If the vault is in git, commit before you start.

## Step 2: install nuza

[Download nuza](https://github.com/puang59/nuza/releases/latest) for macOS, Windows or Linux and install it. There is no account to create and nothing to sign in to.

## Step 3: open the vault folder

Launch nuza and choose to open a folder, or press Cmd+O on macOS, Ctrl+O on Windows and Linux. Select your vault's top-level folder, the same one Obsidian opens.

That is the whole migration. Your notes appear in the sidebar, in the same folders, with the same names.

If you have installed nuza's command line tool from settings, you can also do this from a terminal:

```sh
nuza ~/Documents/my-vault
```

## What works straight away

Because both apps read standard markdown with the same linking convention, most of a typical vault simply works.

| In your vault | In nuza |
| --- | --- |
| Folders and notes | Shown in the sidebar as they are on disk |
| `[[Wiki-links]]` | Followed to the note they name |
| `[[Note#Heading]]` links | Jump to that heading |
| `[[Note\|label]]` links | Show the label and link to the note |
| Backlinks | Listed in the sidebar for the open note |
| `#tags` | Drawn as chips, and listed in the sidebar |
| Frontmatter properties | Shown as editable properties at the top of the note |
| Tables | Rendered, with cells you can edit in place |
| Task lists | Rendered as checkboxes you can tick |
| Code blocks | Highlighted in their own language |
| Math with `$...$` and `$$...$$` | Rendered |
| `![[image.png]]` embeds | The image is shown |
| Standard markdown images and links | Work as usual |

Headings, bold, italic, lists, blockquotes and the rest of ordinary markdown behave as you expect, rendering as you type.

## What does not carry over

Here is where the two apps part ways.

### Anything that depends on a plugin

nuza has no plugin system, so syntax that a community plugin adds is not interpreted. Queries, custom code block types, and plugin-specific blocks will appear as the plain text or code block they are written as. Nothing is lost or altered. The text is simply shown rather than run.

Before deciding, it is worth listing the plugins you actually rely on, as opposed to the ones you installed once. If the honest list is short and cosmetic, you will probably not miss them. If a plugin is central to how you work, that is a good reason to stay where you are.

### The graph view

nuza does not have one. Backlinks, the outline and tags live in the sidebar instead.

### Canvas and other non-markdown files

nuza is a markdown editor. Files in other formats are not opened as visual boards.

### Embedding one note inside another

In nuza, `![[...]]` shows images. A note is not rendered inline inside another note.

### App settings, themes and hotkeys

Your vault contains a hidden `.obsidian` folder holding Obsidian's settings, themes and plugin data. nuza does not read it and does not change it. Appearance and shortcuts in nuza are set in nuza's own settings, where you can choose a light or dark theme, an accent colour, fonts, text width and line height, and rebind any shortcut.

## Using both apps on the same vault

You do not have to choose on day one. Since nuza leaves the `.obsidian` folder alone and both apps work on the same plain files, you can use them side by side for as long as you like. Many people settle into a split: one app for some tasks, the other for the rest.

A few things make this smooth.

**Let each app notice the other's changes.** nuza watches the folder. If a note changes on disk while you have unsaved edits to it in nuza, it asks which version you want to keep instead of overwriting either one.

**Mind where attachments go.** When you paste or drop an image into a note, nuza saves it under a `media` folder in the vault. If your vault already uses a different attachments folder, your existing images keep working where they are. You will just have new ones arriving in `media`.

**Keep link style consistent.** Stick with wiki-links in both apps so links stay readable everywhere.

## Settings worth changing first

A short list of things to look at in nuza's settings after opening your vault:

1. **Vim mode.** It is off by default. If you use Vim keybindings in Obsidian, switch it on. Our [guide to Vim keybindings for note taking](/blog/vim-keybindings-for-note-taking/) has more.
2. **Theme and accent.** Light, dark, or follow the system.
3. **Font, text width and line height.** A comfortable measure makes long notes much nicer to read.
4. **Shortcuts.** Every action can be rebound, so you can match the keys your hands already know.
5. **The command line tool.** Install it from settings to open notes and folders with `nuza <path>` from a terminal.

## A few things you may not expect

Some parts of nuza will be new even to a long-time user of other tools:

- **Quick open and search** find notes by name or by their text, with regular expressions if you want them.
- **Split view** puts a second note beside the one you are writing.
- **Several windows**, each on its own vault, or one note moved out into a window of its own.
- **Zen mode** hides everything but the note and dims all but the paragraph you are in.
- **An outline** of the open note's headings in the sidebar, and folding by heading.
- **Print or save as PDF** straight from a note.

## If it is not for you

Then close it and open your vault in Obsidian as before. Nothing in your notes will have changed format, and the `.obsidian` folder is exactly as you left it. That is the quiet benefit of plain files: trying a tool is never a commitment. We wrote more about that in [why your notes should be plain markdown files](/blog/plain-markdown-files-for-notes/).

And if it is for you, welcome. nuza is free and open source, and the project lives on [GitHub](https://github.com/puang59/nuza), where bug reports and suggestions from people moving over are especially useful.
