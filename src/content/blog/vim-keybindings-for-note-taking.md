---
title: "Vim keybindings for note taking: a practical guide"
description: "How to use Vim motions for writing notes, not just code. The commands that matter for prose, markdown tricks, and how Vim mode works in nuza."
pubDate: 2026-09-22
author: puang
---

Vim has a reputation as a programmer's tool, and most guides teach it with code. But the thing Vim is actually good at is editing text quickly without leaving the keyboard, and notes are text. Once the motions are in your hands, writing prose in an editor without them feels like typing with gloves on.

This guide is for two kinds of reader. If you already use Vim for code and wonder how much of it carries over to notes, the answer is nearly all of it, and we will point out the parts that shine. If you have never used Vim and are curious whether it is worth learning for writing, we will cover the small set of commands that give you most of the benefit.

## Why modal editing suits writing

Most editors have one mode: every key you press inserts a character, and anything else needs a modifier or the mouse. Vim splits the work in two. In **insert mode** you type. In **normal mode** every key is a command for moving around or changing text.

That sounds like extra ceremony until you notice how writing really goes. You draft a sentence, then you revise it. You swap two words, delete a clause, move a paragraph up, fix a typo three lines back. Revision is most of the work, and revision is exactly what normal mode makes cheap. You are not holding down modifier keys or reaching for the mouse. You are saying short sentences to the editor: delete this word, change inside these brackets, move this paragraph.

## The motions that matter for prose

You do not need the whole of Vim. For notes, a small vocabulary covers most of what you do.

### Moving

| Keys | What it does |
| --- | --- |
| `h` `j` `k` `l` | Left, down, up, right |
| `w` / `b` | Forward or back one word |
| `0` / `$` | Start or end of the line |
| `{` / `}` | Back or forward one paragraph |
| `gg` / `G` | Top or bottom of the note |
| `/text` | Search forward for text, then `n` for the next match |
| `f` then a character | Jump to that character on the line |

The paragraph motions `{` and `}` are the unsung heroes for prose. Notes are made of paragraphs and list blocks separated by blank lines, and these two keys hop between them.

### Changing

Vim commands combine an operator with a motion or a text object. Learn three operators and a few objects and you can express hundreds of edits.

| Keys | What it does |
| --- | --- |
| `dw` | Delete to the start of the next word |
| `ciw` | Change the word under the cursor |
| `dd` | Delete the whole line |
| `cc` | Replace the whole line |
| `dap` | Delete the paragraph, with its blank line |
| `ci"` | Change the text inside quotes |
| `ci(` or `ci[` | Change inside brackets |
| `yy` then `p` | Copy the line, paste it below |
| `u` / `ctrl+r` | Undo and redo |
| `.` | Repeat the last change |

`ciw` is the one you will use most when writing. Wrong word? Put the cursor anywhere on it, press `ciw`, type the right one. No selecting, no double-clicking.

### Selecting

Press `v` for visual mode and move to select by character, or `V` to select whole lines. `Vjj` selects three lines, and then `d` deletes them, `y` copies them, or `>` indents them. For rearranging a list this is as fast as editing gets.

## Vim tricks that are made for markdown

Some combinations line up perfectly with how markdown is written.

**Rewrite a link's text.** Markdown links look like `[text](url)`. With the cursor inside the square brackets, `ci[` clears the text and lets you retype it. Inside the round ones, `ci(` replaces the address.

**Reorder list items.** `dd` cuts the line you are on and `p` pastes it below the cursor's line. So `ddp` swaps an item with the one beneath it. Do it a few times and you have reordered a list without a single selection.

**Promote or demote a heading.** A heading's level is the number of `#` marks at the start. `0` jumps to the start of the line, then `x` removes a mark or `i#` followed by escape adds one.

**Tick a task.** In a task like `- [ ] Book flights`, jump to the gap with `f[` and `l`, then `rx` replaces the space with an x. With repetition it becomes one motion.

**Repeat anything.** The `.` key repeats your last change. Make an edit once, move to the next place it applies, and press `.`. Turning five lines into list items, or bolding the first word of several lines, takes seconds.

**Jump back to where you were.** After a search or a `gg` to check the top of the note, two backticks return you to where you came from.

## If you have never used Vim

Here is an honest route in that will not wreck your week.

1. **Learn to leave.** Escape returns you to normal mode. `i` enters insert mode. That is the whole modal idea.
2. **Move with `h` `j` `k` `l` and `w` `b`** for a day. Arrow keys still work if you get stuck.
3. **Add `dd`, `u`, and `ciw`.** You now have more editing power than most people ever use.
4. **Add `{` `}` and `/` search.** This is where it starts to feel faster than the mouse.
5. **Learn `.` last.** It is the command that makes everything else pay off.

Expect to be slower for a few days. Then one afternoon you will notice you have not touched the mouse in an hour.

## Vim mode in nuza

nuza has Vim keybindings built in. There is nothing to install and no plugin to keep updated.

**It is off until you ask for it.** A notes app is used by all sorts of people, and landing in normal mode without knowing what that is feels like the keyboard is broken. So Vim mode starts switched off. Turn it on in settings, or toggle it with the keyboard: Cmd+Shift+V on macOS, Ctrl+Shift+V on Windows and Linux.

**The status bar shows your mode.** Normal, insert or visual is always visible at the foot of the window, so you never have to guess why your typing is being read as commands.

**The usual grammar works.** Motions, operators, text objects, counts, visual mode, registers, search with `/`, and the repeat key behave the way your hands expect.

**It works with the live rendering.** nuza renders markdown as you type, and Vim mode works on the same text. Your motions move through the real characters of the note, so what you learned in a terminal carries straight over.

**The rest of the app is keyboard driven too.** Quick open finds any note by name, tabs switch from the keyboard, the file tree can be walked without the mouse, and you can jump between headings. Every shortcut can be rebound in settings, which is useful if one collides with a habit.

## Is it worth it for notes?

If you write more than a little, we think so. The gain is not raw typing speed. It is that editing stops interrupting thinking. Fixing a word or moving a paragraph becomes a reflex instead of a small task, and your attention stays on what you are trying to say.

And if you try it and decide it is not for you, that is a perfectly good outcome. In nuza it is one toggle, and the app works the same either way.

nuza is free and open source for macOS, Windows and Linux. [Download it](https://github.com/puang59/nuza/releases/latest), switch Vim mode on, and open a folder of notes. If you are still choosing a format for those notes, read [why your notes should be plain markdown files](/blog/plain-markdown-files-for-notes/) next.
