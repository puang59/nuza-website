---
title: "Why we built nuza, a note taking app that does less on purpose"
description: "The story behind nuza: why we wanted a smaller, faster markdown note taking app, what we left out, and what we refused to compromise on."
pubDate: 2026-09-14
author: puang
mentionsObsidian: true
---

nuza started as a dare we made to ourselves. Could we replace the note taking apps we used every day with something much lighter, and not miss them? Not a prototype, not a weekend toy, but the actual place where our work notes, reading notes and half-finished ideas live.

This post is about why we tried, what we decided nuza would never be, and what we think a note taking app owes the person who uses it.

## The problem was never a missing feature

Every notes app we tried over the years could do more than we needed. That was the trouble. The apps were capable, and the capability had a cost that we paid every day in small amounts.

The cost showed up as a pause between clicking the icon and being able to type. It showed up as a settings panel with hundreds of options, a plugin list that needed updating, and a sidebar full of panels we had opened once. It showed up as a quiet feeling that the tool wanted to be configured more than it wanted to be written in.

None of this is a criticism of the people who build those apps. A big feature set is the right answer for a lot of people. It was just the wrong answer for us. What we wanted from a notes app turned out to be a short list:

- Open quickly, every time.
- Show a folder of markdown files and let us write in them.
- Link notes to each other.
- Find anything by name or by what is written in it.
- Stay out of the way.

When the list is that short, the interesting question is not what to add. It is what you can leave out and still have something you want to use for eight hours a day.

## What nuza is

nuza is a free, open-source markdown note taking app for macOS, Windows and Linux. You point it at a folder and it shows you the markdown files inside. You write, and the note renders as you type: headings, lists, tables, task checkboxes, images, code blocks with syntax highlighting, and frontmatter shown as editable properties.

Around the editor there is a small set of tools that we use constantly:

- **Wiki-links and backlinks**, so `[[another note]]` takes you there, and the sidebar shows which notes link to the one you have open.
- **Quick open and full-text search**, so any note is a few keystrokes away.
- **Tabs and a split view**, for when one note is the thing you are writing and another is the thing you are reading.
- **Vim keybindings**, built in and off until you switch them on.
- **Themes**, light and dark, with an accent colour you choose.
- **Autosave and session restore**, so the app comes back the way you left it.

That is most of it. You can read the whole feature list in a minute, and that is deliberate.

## What nuza is not

It is more useful to be clear about what we left out.

**There is no plugin system.** What is built in is what you get. This is the decision people push back on most, and we understand why. Plugins let an app be anything. They also mean that the app you run is a different app from the one anybody tested, that startup time depends on what you installed, and that a note can depend on a plugin that may not exist in three years. We would rather build fewer things and have every one of them work for everybody.

**There is no graph view.** It is a lovely picture. We never once used it to find anything.

**There is no mobile app.** nuza is a desktop app. Your notes are plain files, so any mobile markdown editor can read them, but we do not make one.

**There is no account and no sync service.** nuza never asks you to sign in and never uploads your notes. If you want them on two machines, put the folder somewhere that already syncs. We wrote more about that in [how to sync markdown notes without an account](/blog/sync-markdown-notes-without-an-account/).

If any of those are things you rely on, nuza is honestly not the right choice, and our [comparison with Obsidian](/obsidian-alternative/) says so plainly. We would rather you pick the tool that fits than be talked into ours.

## The three things we would not give up

Leaving features out is easy. The harder part was deciding what had to be excellent.

### Speed

A notes app is the tool you open when a thought arrives. If opening it takes long enough for the thought to fade, the app has failed at its one job. So nuza is built with Tauri and Rust instead of Electron. It uses the webview your operating system already ships, which means the download is small and the app starts quickly. We go into the details in [why nuza is built with Tauri and Rust](/blog/tauri-vs-electron-lightweight-notes-app/).

Speed is also about what happens after startup. The vault is indexed in memory, folders in the sidebar are read as you open them, and search works from that index. A vault with thousands of notes should feel the same as one with ten.

### Ownership

Your notes are markdown files in a folder you chose. There is no database, no proprietary format and no export step, because there is nothing to export from. You can open the same folder in any other editor today, and you will be able to in twenty years. We think this matters enough that we wrote a whole post on [why notes should be plain markdown files](/blog/plain-markdown-files-for-notes/).

The source code is open too, under the MIT license. If we stopped working on nuza tomorrow, both your notes and the app that reads them would still be yours.

### Keyboard first

We live in terminals and editors, and reaching for the mouse to rename a note or switch tabs feels like a small tax. Almost everything in nuza has a shortcut, and every shortcut can be changed in settings. Vim mode is there for those of us with the motions burned into our hands. It stays off by default so nobody who has never heard of Vim gets stuck in normal mode wondering why typing does nothing.

## Who we built it for

We built nuza for ourselves first, which means developers and people who write a lot. Along the way we found it also suits anyone who:

- Wants a clean place to write without a setup project attached.
- Already has a folder of markdown and wants a nicer window onto it.
- Cares that their notes stay private and stay on their own disk.
- Has tried the big tools and found they spend more time tuning them than writing.

## What comes next

nuza is young and it changes quickly. The [changelog on the home page](/#changelog) shows what shipped in the latest release, and the work happens in the open on [GitHub](https://github.com/puang59/nuza). Bug reports and ideas are welcome there.

The rule we hold ourselves to is simple. Every new feature has to earn its place by being something nearly everyone will use, and it must not make the app slower to open or harder to understand. If nuza ever starts to feel like the apps we were trying to get away from, we have gone wrong.

Until then, it is a small, quick place to write. [Download it](https://github.com/puang59/nuza/releases/latest), open a folder, and start typing.
