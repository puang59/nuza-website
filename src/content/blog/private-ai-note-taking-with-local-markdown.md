---
title: "Private AI note taking: what an AI notes app should and should not see"
seoTitle: "Private AI note taking with local markdown files"
description: "What to ask of any AI notes app before trusting it with your notes, and exactly how nuza handles it: local markdown files, no account, AI off by default, a sandboxed agent, and the risks that remain."
pubDate: 2026-10-15
author: puang
trademarks: ["Claude Code", "Codex", "OpenCode"]
---

Notes are some of the most private things people write. Journal entries, health notes, half-formed business plans, things about other people. Adding AI to a notes app changes what happens to all of that, and most apps are not very specific about how.

This post is about the questions worth asking of any AI notes app, and how nuza, the open-source notes app we build, answers each of them. The short version is that we tried to make the answers boring: your notes stay files on your disk, AI is off until you turn it on, and when it is on, it sees what you send it and nothing else. The long version has a few caveats, and we would rather you heard them from us.

## Question 1: where do the notes live?

In a lot of AI note apps, your notes live on the company's servers, because that is where the AI runs. That can be fine, but it means the notes are only as private as the company's security, policies and future owners.

In nuza, notes are plain markdown files in a folder you choose. There is no nuza account and no nuza server. Nothing is uploaded by nuza, with or without AI. If you want your notes on more than one device, you use whatever sync you already trust; our post on [syncing markdown notes without an account](/blog/sync-markdown-notes-without-an-account/) covers the options.

## Question 2: is the AI on by default?

It should not be. Plenty of people want nothing to do with AI in their notes, and an app that turns it on by default has already made the choice for them.

nuza's AI is off by default. Until you turn it on in **Settings → AI**, there is no AI panel, the shortcut does nothing, and nuza never even looks for an AI agent on your computer. Turning it on is two steps: the switch, then choosing an agent and agreeing to a one-time notice that says exactly what that agent will be sent.

## Question 3: who runs the model, and on whose account?

nuza does not run a model, hold an API key, or have a server for AI. The panel talks to an AI agent already installed on your computer and signed in with your own account: Claude Code, Codex, OpenCode, or another program that speaks the Agent Client Protocol.

So the provider that sees your questions is one you already chose, under terms you already agreed to. If you would rather use a particular provider for privacy reasons, OpenCode can use many of them.

## Question 4: what exactly is sent?

This is the most important question, and the answer should be a list, not a promise. In nuza, only when you ask something, and only to the agent you turned on:

- **Your question**, or the request a writing action makes, such as Rephrase or Proofread.
- **The note you are asking about**: its title and text, with your selection marked. A long note is trimmed to the part around your selection. With **Send the whole note** off, only the selected text goes.
- **Your instructions** and **your memory for this folder**, if you have set any.
- **The conversation so far**, when the agent starts a new session.
- **Notes it searches**, if you let it search the vault. It can search, list and read notes through nuza's read-only tools, and nothing outside the vault. You can turn this off per folder.

The agent passes all of that to its provider, on your account. nuza keeps your chats on your computer only, deletes any chat left untouched for a week, and lets you clear them all from Settings at any time.

## Question 5: what can the AI do on your computer?

An AI agent is a program that can, in general, run commands and edit files. That is the reason to be careful about giving one access to your notes.

nuza uses two layers, and the second does not depend on the agent behaving.

**Permissions.** nuza offers the agent no file access and no terminal. Every time it asks to run a command, write or delete a file, or look something up on the web, nuza says no, and shows that it did in the panel. Web lookups can be allowed per folder, and are off by default. Changes to your notes are never made by the agent. They come back as suggestions that you accept or reject in the note.

**The sandbox.** On macOS and Linux, the operating system runs the agent in a fence. It cannot read your home folder, so not your notes, not your SSH keys, and not your other folders. It can only write to its own sign-in and cache folders. On macOS this is Seatbelt; on Linux it is Landlock, on kernels from 5.13.

On **Windows** there is no such fence. nuza says so in the notice before the agent starts, and in Settings: the agent runs with your own permissions there, and only the first layer applies.

When you turn AI off, the agent is stopped. No process is left running and nothing is listening.

## Question 6: what are the risks that remain?

Any honest answer includes some. In nuza there are two worth knowing.

**Persuasion.** A note can contain text written to steer an AI: a web page you pasted in, or a document someone sent you. The agent cannot act on it beyond what is described above, but it could give you a misleading answer, or suggest an edit that does something you did not intend. Read suggestions before you accept them.

**Web lookups.** If you allow web lookups for a folder, the agent can fetch web addresses. A steered agent could put text from your note into one. Leave web lookups off for folders that hold anything private. They are off unless you turn them on.

The [full technical write-up](/docs/ai/) has more detail on each of these.

## A checklist for any AI notes app

Whatever app you use, these are worth asking:

1. Where are my notes stored, and can I get them out as plain files?
2. Is AI off until I turn it on?
3. Whose model is it, and whose account pays for it?
4. What exactly is sent, and when?
5. Can the AI change my notes without me approving it?
6. Can the AI reach anything other than what I send it?
7. Does the app tell me what it cannot protect against?

If an app cannot answer these clearly, that is an answer too.

## Trying it

[Download nuza](https://github.com/puang59/nuza/releases/latest). It is free, open source and needs no account. Use it without AI for as long as you like, and turn the panel on when you have a reason to. When you do, [here is what it is like to use](/blog/ai-writing-assistant-for-markdown-notes/).
