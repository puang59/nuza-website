---
title: "Tauri vs Electron: why nuza is built with Tauri and Rust"
description: "Why we chose Tauri and Rust over Electron for a lightweight markdown notes app, what the system webview buys you, and the trade-offs we accepted."
pubDate: 2026-09-30
author: puang
---

When people ask why nuza feels light, the answer starts with a decision we made before writing a single feature: what the app would be built on. Most desktop apps made with web technology use Electron. nuza uses Tauri, with a backend written in Rust. This post explains what that means, why it matters for a notes app in particular, and what it cost us.

It is written for curious users as much as for developers. You do not need to know either framework to follow it.

## Two ways to put a web interface on a desktop

Modern desktop apps are very often web pages in a window. That is a reasonable way to build software. Web technology is the most widely known interface toolkit there is, it looks the same on every operating system, and editors built for the browser are superb. nuza's editor is built on CodeMirror, a browser-based editor, and its interface is written in React.

The question is what the web page runs inside.

### The Electron approach

Electron packages a complete copy of the Chromium browser engine and the Node.js runtime inside every app. When you download an Electron app, you are downloading a browser. When you run three Electron apps, you are running three browsers.

The benefit is real: the developer knows exactly which browser engine their code runs on, on every platform, for every user. Nothing varies. That predictability is why so many well-known apps are built this way.

The cost is equally real. Every app carries the engine's weight on disk and in memory, before it has done anything of its own.

### The Tauri approach

Tauri does not ship a browser. It uses the webview that the operating system already provides: WebView2 on Windows, WKWebView on macOS, and WebKitGTK on Linux. The app's own code is the interface plus a small native program written in Rust that handles everything the interface is not allowed to do, such as reading files.

So a Tauri app is, roughly, your interface, a compact Rust binary, and a request to the system: please show this in the webview you already have.

## Why this matters for a notes app

For some software, the size of the runtime is a rounding error. A video editor or a game is large because of what it does. A notes app is different, for three reasons.

**It is opened constantly.** A notes app is the tool you reach for when a thought arrives. You open it dozens of times a day, often for ten seconds. The time between clicking the icon and typing is the most important number the app has.

**It stays open all day.** Notes live in the background next to your real work: an editor, a browser with too many tabs, a call. An app that sits there all day should take as little memory as it can, because that memory belongs to the work you are actually doing.

**Its job is small.** Showing text files and letting you edit them is not heavy work. When the runtime weighs far more than the task, something is out of proportion.

By leaning on the system's webview, nuza has a small download and little to load at startup. We are deliberately not quoting numbers here, because they change with every release and every machine. The fair way to judge is to [download it](https://github.com/puang59/nuza/releases/latest) and see how it feels on your own computer.

## What the Rust side does

In nuza, the interface does not touch your disk. Everything that involves files goes through the Rust backend, and that split is good for both speed and safety.

### Fast file work

The backend reads and writes notes, lists folders, watches for changes made by other programs, and searches the text of your vault. Rust compiles to native code with no garbage collector pausing it, which suits this kind of work well.

A few specifics from nuza:

- **An in-memory index of the vault.** nuza keeps an index of your notes, so quick open and search answer from memory instead of walking the disk each time.
- **Folders are read as you open them.** The sidebar does not load the whole tree up front. A vault with a huge folder you never expand costs you nothing.
- **Search runs in the backend.** Finding a phrase across every note happens in Rust, off the thread that draws the interface, so typing stays smooth while results arrive.
- **A file watcher.** When a sync tool, a git checkout or another editor changes a note, nuza notices and tells you, rather than quietly overwriting one copy with the other.

### A narrow doorway

Because the interface can only ask the backend for specific things, the backend gets to decide what is allowed. In nuza, a window can only read and write inside the folder it has open. A window with no folder open can touch no files at all. The webview is locked down with a strict content security policy, and rendered note content is sanitised.

This matters for a markdown app more than it might seem. Markdown can contain HTML, and notes sometimes come from elsewhere: a shared vault, a cloned repository, a pasted page. The less a rendered note is able to do, the better.

### Careful deletes

One small example of the kind of thing the backend handles: deleting a note in nuza sends it to your system's Trash rather than removing it for good. A misclick should never be the end of a note.

## The trade-offs we accepted

Tauri is not free of costs, and it would be dishonest to pretend otherwise.

**Three webviews instead of one.** Electron's great strength is one engine everywhere. With Tauri, nuza runs on WebKit on macOS and Linux and on a Chromium-based webview on Windows. They do not always behave identically, so some things need testing and fixing per platform. This is real, ongoing work, and it is the main price of the approach.

**The webview is the system's, not ours.** We cannot pin a specific engine version. On an older operating system, the webview may be older too.

**Two languages.** The interface is TypeScript and the backend is Rust. Rust has a learning curve, and contributors need to be comfortable in whichever half they are touching.

**A younger ecosystem.** Electron has many more years of libraries, guides and answered questions behind it. With Tauri we sometimes build a piece ourselves that would be an install away elsewhere.

We think these costs fall in the right place. They are paid by us, the people building the app, in testing and effort. The costs of a bundled browser are paid by everyone who uses the app, every day, in disk space, memory and startup time. For a notes app, we would rather take the work on ourselves.

## Lightweight is also about what you leave out

The framework is only half the story. An app built on the leanest foundation can still be slow if it loads enough on top.

nuza has no plugin system, and that is partly a performance decision. With plugins, startup time depends on what each user has installed, and no two installations are alike. Without them, the app we test is the app you run, and its startup cost is something we can measure and keep low.

The same thinking applies to features. Each one has to justify its weight. We wrote about that philosophy in [why we built nuza](/blog/why-we-built-nuza/).

## Should you care what your notes app is built with?

Mostly, no. You should care how it feels: whether it opens fast, stays out of the way, and respects your machine. The technology underneath is only interesting because it is the reason those things are true or not.

There is one more thing worth caring about, and it has nothing to do with frameworks. Whatever the app is built with, your notes should not depend on it. nuza stores notes as plain markdown files in a folder you choose, so the app could be rewritten from scratch, or replaced by something else entirely, and your notes would be untouched. More on that in [why your notes should be plain markdown files](/blog/plain-markdown-files-for-notes/).

## Look at the code

nuza is open source under the MIT license, so none of this has to be taken on trust. The Rust backend and the React interface are both on [GitHub](https://github.com/puang59/nuza). If you are thinking about building your own desktop app with Tauri, a real project is often more useful than a tutorial, and you are welcome to read ours.
