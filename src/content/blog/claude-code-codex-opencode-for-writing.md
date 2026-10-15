---
title: "Use Claude Code, Codex or OpenCode as a writing assistant"
seoTitle: "Claude Code, Codex or OpenCode for writing notes"
description: "A setup guide for using Claude Code, Codex or OpenCode as a writing assistant in nuza: installing each agent, signing in, choosing a model, what it costs, and fixing the common problems."
pubDate: 2026-10-15
author: puang
trademarks: ["Claude Code", "Claude", "Codex", "ChatGPT", "OpenCode"]
---

If you already pay for Claude or ChatGPT, you have a capable writing assistant on your account. It just tends to live in a browser tab, far from where your writing is.

nuza's AI panel brings it into your notes. Rather than hold its own API key, nuza talks to a coding agent that is already installed on your computer and signed in with your account: Claude Code, Codex or OpenCode. The agent does the thinking, on your plan. nuza sends it the note you are asking about, shows its answer, and turns any changes into suggestions in the note for you to accept.

This guide covers setting up each agent, choosing a model, what it costs, and what to do when something does not work. For what the panel can do once it is running, start with [the overview](/blog/ai-writing-assistant-for-markdown-notes/).

## Before you start

You need:

- **nuza 1.0 or later.** [Download it here](https://github.com/puang59/nuza/releases/latest) for macOS, Windows or Linux.
- **Node.js 22 or newer** for Claude Code and Codex. nuza starts a small adapter for each with `npx`, which comes with Node. Check with `node --version` in a terminal.
- **An account** with the agent's provider. Details for each are below.

AI is off in nuza until you turn it on, so nothing below changes how nuza behaves until the last step.

## Option 1: Claude Code

Claude Code is Anthropic's agent. It uses your Claude subscription, or an Anthropic API account.

1. Install it: `npm install -g @anthropic-ai/claude-code`
2. Run `claude` once in a terminal and sign in when it asks.
3. In nuza, open **Settings → AI**, turn **AI** on, and press **Use** next to Claude Code.

The first time, nuza downloads the adapter Claude Code needs to talk to it, which can take a few minutes. After that it starts in seconds.

Claude's models are strong at prose. For everyday rephrasing and proofreading, the smaller, faster model is usually enough, and it is the one nuza picks by default.

## Option 2: Codex

Codex is OpenAI's agent. It uses your ChatGPT plan, or an OpenAI API key.

1. Install it: `npm install -g @openai/codex`
2. Sign in with `codex login`. If you skip this, nuza's panel has a **Sign in** button that runs it for you.
3. In nuza, open **Settings → AI**, turn **AI** on, and press **Use** next to Codex.

As with Claude Code, the first start fetches an adapter and is slower than the rest.

## Option 3: OpenCode

OpenCode is an open-source agent that works with many model providers, including some free models.

1. Install it with `curl -fsSL https://opencode.ai/install | bash`, or `npm install -g opencode-ai`.
2. Optionally sign in to a provider with `opencode auth login`.
3. In nuza, open **Settings → AI**, turn **AI** on, and press **Use** next to OpenCode.

OpenCode speaks nuza's protocol directly, so there is no adapter to download.

OpenCode is the cheapest way to try the panel, since its free models need no paid plan. They have limits, though. Some refuse to answer anywhere except inside OpenCode itself, and some are only available with a subscription to that provider. If a model turns you down, nuza moves on to another and tells you why. Signing in to a provider with `opencode auth login` opens up the rest.

## Option 4: anything else

Any program that speaks the Agent Client Protocol (ACP) over its standard input and output can be used. Under **Settings → AI**, open **Something else** and give the command that starts it, its arguments, and its data folders, one per line. The data folders are where it keeps its own sign-in and cache, and the sandbox lets it use them and nothing else.

## Choosing a model

Each agent offers several models. nuza starts with the cheapest one that agent offers, preferring free models first and then the small, fast ones, because most writing help does not need the largest model.

You can change it from the model name under the panel's text box, and the choice is remembered for each folder of notes. A larger model is worth it for "is this argument sound?" questions. For proofreading, it is usually not.

## What it costs

nuza is free and open source, and it adds no cost to the agent. What you use counts against your plan with the agent's provider, exactly as if you had asked in the agent's own app.

The panel keeps its requests small: the note you are asking about (trimmed around your selection if it is long), your question, your standing instructions and anything you have asked it to remember. If you want to send even less, turn off **Send the whole note** in Settings, and only the selected text goes.

## What the agent can and cannot do

The agent cannot change your files directly. Every change comes back as a suggestion you accept or reject in the note. nuza refuses every request to run commands, write files or look things up on the web, and says so in the panel. Web lookups can be allowed per folder, and are off by default.

On macOS and Linux the operating system also fences the agent in. It cannot read your home folder, so not your notes, not your SSH keys and not your other folders. It can only write to its own sign-in and cache folders. Windows has no such fence, and nuza says so before the agent starts. [How the AI works](/docs/ai/) has the details.

## When something goes wrong

**"Not installed" in Settings.** nuza looks for the agent on the same `PATH` your terminal uses. If you installed it in a terminal that was already open, open a new one and check that `claude`, `codex` or `opencode` runs there. Then press **Look again** in Settings.

**It takes a long time the first time.** That is the adapter download for Claude Code or Codex. It happens once.

**"Sign in" errors.** Run the sign-in command for the agent in a terminal (`claude`, `codex login`, or `opencode auth login`) and try again.

**A model refuses, or says it needs a subscription.** This is the provider's policy, usually on free models. Pick another model under the text box, or sign in to a provider.

**You want it off.** Turn **AI** off in Settings or Quick Settings. The agent is stopped and nothing is left running.

## Next

Once it is set up, open a note, select a paragraph and press ⌘L. For a workflow that keeps the help on the polish and the voice yours, read [how writers can use AI without losing their voice](/blog/how-writers-use-ai-without-losing-their-voice/).
