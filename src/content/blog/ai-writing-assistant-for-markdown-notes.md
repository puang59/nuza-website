---
title: "An AI writing assistant that edits your markdown notes in place"
seoTitle: "AI writing assistant for markdown notes"
description: "nuza's AI panel rephrases, proofreads and explains your markdown notes with the agent you already use, and every change comes back as a suggestion you accept or reject in the note."
pubDate: 2026-10-15
author: puang
trademarks: ["Claude Code", "Codex", "OpenCode", "Cursor"]
---

Most AI writing tools work the same way. You copy a paragraph out of your document, paste it into a chat window, ask for a better version, copy the answer back, and then fix the formatting the round trip broke. It works, but the tool never sees your document, you cannot tell at a glance what it changed, and the conversation lives somewhere other than your notes.

nuza 1.0 puts the assistant next to the note instead. You select some text, press ⌘L (Ctrl+L on Windows and Linux), and ask. When the answer is a change, it comes back as a suggestion drawn over the note itself, the way a code editor shows a diff. You accept or reject each one. Nothing is rewritten behind your back.

This post covers what the panel does, how it works, and who it is for. If you want the full technical detail of what is sent and how the agent is contained, that lives in [How the AI works](/docs/ai/).

## What it does

The panel knows the note you are in and what you have selected. It can answer a question about the note, or change it. There are six writing actions you can run from the chips above the text box, or by typing `/` in it:

- **Rephrase** the selected text, keeping its meaning.
- **Synonym** for the word at your caret: three to five options, each with a note on how it differs, and the best one suggested in place.
- **Explain this**, for a passage, in the context of the whole note.
- **Explain the note**, for a summary of what a note says and how it is put together.
- **Proofread** for spelling, grammar and punctuation, and nothing else.
- **Improve writing**, for clarity and flow, without changing what you meant.

You can also just type. "Make this paragraph shorter." "Turn these bullet points into a table." "Is the argument in the second section actually supported by the first?" A question gets an answer in the panel. A request for a change gets a suggestion in the note.

## Suggestions, not silent edits

This is the part that matters most for anyone who cares about their writing.

When the agent proposes a change, nuza shows it inline: the old text struck through, the new text beside it, and a card in the panel for each change. You can accept one and reject the next. Accepting is an ordinary edit, so ⌘Z undoes it. There are shortcuts for accepting or rejecting all of them at once (⌘Enter and ⌘Backspace) when you trust the batch.

When a writing action runs on a selection, its changes stay inside the selection, even where the same words appear elsewhere in the note. Asking for a synonym for one word does not quietly rewrite the paragraph next to it.

The same goes for new notes. Ask for "a note with the reading list from this one" and you get a card showing where the note would go and what it would say. It is only made when you press **Create**, and never on top of a note that already exists. The agent links the two notes both ways with `[[wiki links]]`, so each shows up in the other's backlinks. If backlinks are new to you, our [guide to wiki links and backlinks](/blog/wiki-links-and-backlinks-guide/) explains them.

## It uses the agent you already have

nuza does not run a model, hold an API key, or have a server. The panel hands your question to an AI agent that is already on your computer and signed in with your own account:

- **Claude Code**, on a Claude plan.
- **Codex**, on a ChatGPT plan.
- **OpenCode**, with any provider it supports, including some free models.
- Any other program that speaks the Agent Client Protocol.

That means no new subscription and no new account. If you already pay for one of these, the writing help is part of what you pay for. By default nuza picks the cheapest model the agent offers, and you can choose another from the panel. There is a [step by step setup guide](/blog/claude-code-codex-opencode-for-writing/) for each agent.

## What it sees, and what it can do

The agent is sent the note you are asking about, with your selection marked, along with your question, your own instructions and any notes you have asked it to remember. That is all, and only when you ask something.

It cannot run commands or change files. nuza refuses every request to act, apart from reading your vault through its own read-only search when you let it. On macOS and Linux, the operating system also fences the agent in, so it cannot read your home folder or write outside its own cache. On Windows there is no such fence, and nuza tells you so before anything starts. The [privacy post](/blog/private-ai-note-taking-with-local-markdown/) goes through this in more depth.

## It is off until you want it

A notes app should not push AI on anyone. In nuza the whole feature is off by default. Until you turn it on in **Settings → AI**, there is no panel, ⌘L does nothing, and nuza never looks for or starts an agent. Once it is on, you choose an agent and agree to a short notice that says exactly what it will be sent.

Everything else about nuza stays the same with AI on or off. Your notes are plain markdown files in a folder you choose. Wiki links, backlinks, search, tabs and Vim keybindings work exactly as they did.

## Who it is for

The panel was built for people who write in their notes and want help with the writing rather than a replacement for it:

- **Writers and bloggers** who want a second pair of eyes on a draft. See [how writers can use AI without losing their voice](/blog/how-writers-use-ai-without-losing-their-voice/).
- **Students** who want hard passages explained and lecture notes tidied. See [AI study notes for students](/blog/ai-study-notes-for-students/).
- **Researchers** who keep a vault of reading notes and want to ask questions across it. See [AI research notes with backlinks](/blog/ai-research-notes-with-backlinks/).
- **Developers** who write READMEs, design docs and runbooks. See [AI for technical writing in markdown](/blog/ai-for-developer-docs-in-markdown/).
- **Anyone who runs meetings** and wants the notes turned into decisions and action items. See [AI meeting notes in plain markdown](/blog/ai-meeting-notes-in-markdown/).

We call it [Cursor for writers](/cursor-for-writers/): an agent beside your work that knows what you are looking at, and suggests changes you approve, applied to prose instead of code.

## Trying it

1. [Download nuza](https://github.com/puang59/nuza/releases/latest) for macOS, Windows or Linux.
2. Install one of the agents above and sign in to it.
3. Open **Settings → AI**, turn AI on, and press **Use** next to your agent.
4. Open a note, select a paragraph, and press ⌘L.

If you only want to see what it does first, OpenCode's free models are the cheapest way in. Either way, nuza itself is free and open source, and the AI panel costs nothing beyond the plan you already have.
