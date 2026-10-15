---
title: "How writers can use AI without losing their voice"
seoTitle: "How writers can use AI without losing their voice"
description: "A practical workflow for writers who want AI help with revising, word choice and proofreading, while keeping every sentence their own. With examples from nuza's AI panel."
pubDate: 2026-10-15
author: puang
trademarks: ["Claude Code", "Codex", "OpenCode"]
---

There is a real worry under most writers' hesitation about AI. It is not that the tools are bad at writing. It is that they are confident at it, in a voice that is nobody's in particular, and a draft that passes through one too many times starts to sound like everyone else's.

The fix is not to avoid the tools. It is to use them for the parts of writing where a second opinion helps, and to keep them away from the parts that make the writing yours. This post is a workflow for doing that, stage by stage. The examples use the AI panel in nuza, the notes app we build, because it was designed around exactly this idea: the agent suggests, and you decide. But the approach works with any tool that lets you review changes before they land.

## Write the first draft yourself

The first draft is where your voice comes from. It is where you decide what you think, in what order, and how you sound saying it. An AI can produce a first draft in seconds, but then you are editing its ideas in its voice, and that is much harder to undo than it looks.

So write the draft. Make it messy. Leave notes to yourself in brackets. In nuza that draft is just a markdown file in a folder, so it is yours in the most literal sense, and nothing about it is sent anywhere until you ask a question about it.

If you are stuck, ask the agent a question rather than for prose. "What is the weakest point in this argument?" or "What would a sceptical reader ask after this paragraph?" gets you unstuck without putting someone else's sentences on the page.

## Revise with suggestions you can see

Revision is where AI help is most useful, as long as you can see exactly what it changed.

In nuza, select a paragraph and run **Improve writing**, or **Rephrase** if you want the same thing said another way. The changes come back drawn over the note: what was there struck through, the suggestion beside it. Each change has its own card in the panel, so you can accept the one that tightened a clumsy sentence and reject the one that sanded off a phrase you liked.

That one-at-a-time review is the whole point. A tool that returns a rewritten paragraph asks you to accept or reject the lot. A tool that returns edits lets you keep your rhythm and take only the fixes.

A few habits help:

- **Work on a paragraph, not the whole piece.** Smaller selections get more careful suggestions, and you review them more carefully too.
- **Reject freely.** If a suggestion is technically better but does not sound like you, it is not better.
- **Undo is there.** Accepting a suggestion is an ordinary edit, so ⌘Z takes it back.

## Find the right word

Sometimes the problem is one word. Put the caret on it and run **Synonym**. The agent suggests three to five alternatives that fit the sentence, best first, each with a few words on how it differs: more formal, more physical, slightly negative. The best one appears as a suggestion in place; the rest are in the panel for you to choose from.

This is closer to how a good thesaurus should work. It knows the sentence the word is in, and it tells you what each option would do to it.

## Proofread last, and only proofread

When the writing is done, run **Proofread**. In nuza this asks for spelling, grammar and punctuation fixes only, each as a small separate edit, and for the agent to say so if the text is already clean. It is deliberately narrow, so that a final check does not turn into one more round of rewriting.

Read each fix. Proofreading tools are wrong more often than people expect about house style, dialect spelling and deliberate fragments.

## Tell it how you write

Two settings in nuza make the agent's suggestions sound more like you over time.

**How it replies** (Settings → AI) is up to a thousand characters of standing instructions sent with every question. Use it for the rules of your voice. For example:

```text
British spelling. Short sentences. No semicolons.
Never use the words "delve", "tapestry" or "unlock".
Keep my contractions. Do not add headings I did not write.
```

**Memory** is for facts about this particular folder of notes. Type `/remember` in the panel followed by something worth knowing, such as "this is a newsletter for small bakery owners" or "the protagonist is called Ada, never Adeline", and it goes along with every question in that vault.

## Use it to understand, not just to change

Some of the most useful questions do not produce edits at all.

- **Explain this**, on a passage, tells you how it reads in the context of the whole note. That is a quick way to find out whether a paragraph says what you think it says.
- **Explain the note** gives you a summary of the piece and how it is laid out. If the summary surprises you, the structure needs work.
- Plain questions work too: "Does the ending follow from the opening?" "Where do I repeat myself?"

These answers stay in the panel. Your note does not change unless you ask it to.

## Let it look at your other notes, when you ask

If you keep your writing in one vault, the agent can search and read your other notes through nuza's read-only tools. It is told to leave them alone unless you ask, so a normal question only involves the note you are in. But you can ask for things like "rephrase this intro in the style of my last three posts" or "is this consistent with what I wrote about pricing in the launch note?", and it will look, and cite the notes it used. A citation opens the note at the paragraph.

## What the panel will not do

It will not change your note without showing you. It will not quietly edit text outside the selection you ran an action on. It will not create a note you did not approve. And it is there for your notes and your writing, so it turns down requests that have nothing to do with them.

It also costs you nothing extra. nuza uses the agent you already have, such as Claude Code, Codex or OpenCode, on your own plan. There is a [setup guide for each](/blog/claude-code-codex-opencode-for-writing/).

## A workflow in one list

1. Write the draft yourself, in a plain markdown note.
2. Ask questions when you are stuck, not for prose.
3. Revise paragraph by paragraph with Improve writing or Rephrase, accepting edits one at a time.
4. Fix single words with Synonym.
5. Proofread last.
6. Put your rules in How it replies, and your project's facts in memory.

That keeps the AI on the parts of writing that are about polish and judgement, and keeps you on the part that is about having something to say. If that sounds like the tool you want, [here is what the panel does](/cursor-for-writers/), and [here is how to get it](https://github.com/puang59/nuza/releases/latest).
