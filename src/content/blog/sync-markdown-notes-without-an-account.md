---
title: "How to sync markdown notes between devices without an account"
description: "Four ways to sync a folder of markdown notes across computers: iCloud Drive, Dropbox, Syncthing and git. How each works, their trade-offs, and how to avoid conflicts."
pubDate: 2026-10-06
author: puang
---

nuza has no sync service. There is no account to create and no nuza server anywhere that could hold your notes. People sometimes read that as a missing feature, and we understand why. We see it the other way round: your notes are plain files in a folder, and syncing a folder is a problem that was solved well long before we arrived.

This guide covers four dependable ways to keep a folder of markdown notes in step across your computers, how to choose between them, and the habits that stop sync conflicts from happening.

## Why nuza does not sync for you

Building a sync service means running servers, storing your notes on them, and asking you to trust us with both. It means an account, a password, and usually a subscription to pay for it all. Every part of that runs against what nuza is for: a small app that reads and writes files on your own disk and never sends them anywhere.

There is also a practical point. The tools below are made by people whose whole job is syncing files, and you probably already use one of them for everything else you own. Your notes do not need their own separate system.

## What makes notes easy to sync

Markdown notes are close to the ideal thing to sync.

- **They are small.** A note is a few kilobytes of text. Thousands of them amount to less than a handful of photos.
- **They are separate files.** A change to one note touches one small file. Compare that with apps that keep everything in a single database file, where every edit changes the whole thing and two devices can easily corrupt it.
- **They are text.** If two versions of a note ever do collide, you can open both and see exactly what differs.

This is one of the quieter reasons we recommend [keeping notes as plain markdown files](/blog/plain-markdown-files-for-notes/).

## Option 1: iCloud Drive

**Best for:** people who only use Apple devices.

Put your notes folder inside iCloud Drive and it appears on every Mac signed in to the same Apple account. There is nothing to install.

**Good:** built in, automatic, and no setup beyond moving the folder.

**Watch for:** macOS can remove local copies of files it thinks you are not using, to save disk space, and download them again on demand. For a notes folder you want everything kept on disk, so that search covers every note and everything works offline. Check your iCloud Drive settings so that files are kept downloaded.

It is also Apple only in any comfortable sense. If a Windows or Linux machine is in the picture, look at the next options.

## Option 2: Dropbox, OneDrive or Google Drive

**Best for:** a mix of operating systems, with the least effort.

The mainstream cloud folder services all work the same way from a notes point of view. Install the desktop client, put your notes folder inside the synced folder, and open that folder in nuza on each machine.

**Good:** works across macOS, Windows and Linux to varying degrees, keeps a history of older versions of files, and you can reach your notes from a browser in a pinch.

**Watch for:** as with iCloud, many of these clients have an online-only mode that keeps files in the cloud until opened. Mark your notes folder as always available offline. Check Linux support for the service you choose before committing, since it varies.

Your notes do live on a company's servers with these services. For most notes that is an acceptable trade. For the ones where it is not, read on.

## Option 3: Syncthing

**Best for:** privacy, and people who do not want their notes on anyone's servers.

Syncthing is a free, open-source program that syncs folders directly between your own devices. There is no central server holding your files. Your laptop and your desktop talk to each other, encrypted, and that is all.

Setup takes a few more minutes than the cloud options. You install Syncthing on each machine, introduce the devices to each other, and choose the folder to share.

**Good:** no account, no storage limit beyond your own disks, no third party holding your notes, and it runs on macOS, Windows and Linux.

**Watch for:** devices sync when they can reach each other, so both generally need to be switched on at the same time for changes to pass across. If you close your laptop at work and open your desktop at home, the change has nowhere to wait in between. A machine that is always on, even a small one, solves this neatly by acting as the meeting point.

Syncthing can also keep old versions of changed files, which is worth turning on.

## Option 4: git

**Best for:** developers, and anyone who wants a complete history of every note.

A folder of markdown is a natural git repository. You commit changes, push to a remote, and pull on your other machines.

```sh
cd ~/notes
git init
git add .
git commit -m "Start tracking my notes"
```

After that, a sync is a commit and a push on one machine and a pull on the other.

**Good:** every version of every note, forever. You can see what changed and when, undo anything, and work on a branch if you are restructuring. Conflicts are handled by a tool designed for exactly that, and since notes are text, merges usually just work.

**Watch for:** it is manual unless you automate it. If you forget to push before leaving one machine, the change is not on the other. A private remote repository puts your notes on a hosting company's servers, so choose where you push with the same care as any cloud service. And git is a tool with a learning curve if you do not already use it.

A sensible addition is a `.gitignore` file for anything machine-specific you do not want tracked.

## Which should you choose?

| If you | Use |
| --- | --- |
| Only use Macs and want zero setup | iCloud Drive |
| Use a mix of systems and want it easy | Dropbox or a similar service |
| Do not want your notes on any server | Syncthing |
| Already live in git and want history | git |

You can also combine them. A common and very robust setup is Syncthing or a cloud folder for moment to moment syncing, plus a git commit now and then as a history and a second line of defence.

## How to avoid sync conflicts

A conflict happens when the same note is changed in two places before the changes have met. Every sync tool handles this by keeping both versions, usually as a second file with "conflict" in its name. It is rarely a disaster, but it is easy to avoid.

**Let sync finish before you switch machines.** Give the client a moment to upload before you close the lid, and a moment to download before you start writing on the other side. This one habit prevents nearly all conflicts.

**Do not leave unsaved edits sitting open.** nuza saves as you write, so there is no pile of unsaved changes waiting to clash with an incoming version.

**Do not use two sync tools on the same folder at once.** A folder inside both Dropbox and iCloud, for example, invites the two to fight. Putting a git repository inside a cloud-synced folder is a well-known source of trouble too, because the sync client and git both rewrite git's internal files. If you want both, sync with one and treat git as a manual snapshot from a single machine.

**Search for conflict files occasionally.** A quick search for "conflict" in your vault will show any that slipped through.

## What nuza does when a note changes underneath it

nuza watches the folder it has open. When a sync tool writes a new version of a note, nuza picks it up.

If that note is open and you have no unsaved edits, you simply see the new version. If you do have edits that have not been written yet, nuza does not guess. It tells you the note changed on disk and asks whether to take the version from disk or keep yours. Nothing is overwritten until you answer, so both versions remain until you choose.

If a note you have open is deleted or renamed by something else, nuza tells you that too, and offers to put it back or let it go.

## A word about backups

Sync is not backup. Sync faithfully copies your mistakes: delete a folder on one machine and it is promptly deleted on all of them. Version history in your sync tool helps, and git helps more, but you should also have a real backup of your notes folder, the same way you back up anything else you would be upset to lose. Because notes are just files, whatever backs up your documents already covers them.

## That is all there is to it

Pick one of the four, move your notes folder into it, and open that folder in nuza on each machine. There is no nuza account in the middle, and nothing to migrate if you change your mind about the sync tool later. You move the folder.

nuza is free and open source for macOS, Windows and Linux. [Download it](https://github.com/puang59/nuza/releases/latest), or read [why we built it](/blog/why-we-built-nuza/) to see what else we left out on purpose.
