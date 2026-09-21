// Reads the latest release and its commits from GitHub's Atom feeds
// (avoids the unauthenticated REST API's rate limits).

export interface ReleaseInfo {
  tag: string;
  title: string;
  date: string;
  url: string;
  body: string;
}

export interface CommitInfo {
  title: string;
  date: string;
  url: string;
  author: string;
}

export type CommitCategory =
  | 'feat'
  | 'fix'
  | 'refactor'
  | 'chore'
  | 'ui'
  | 'docs'
  | 'other';

export const CATEGORY_COLORS: Record<CommitCategory, string> = {
  feat: 'text-[#96FF96]',
  fix: 'text-[#FF9696]',
  refactor: 'text-[#9696FF]',
  chore: 'text-zinc-500',
  ui: 'text-[#FFFF96]',
  docs: 'text-zinc-500',
  other: 'text-zinc-500',
};

const REPO = 'puang59/nuza';
const FEED_HEADERS = { 'User-Agent': 'nuza-website/1.0' };

function extractTag(xml: string, tag: string): string {
  const open = `<${tag}`;
  const close = `</${tag}>`;
  const start = xml.indexOf(open);
  if (start === -1) return '';
  const gtPos = xml.indexOf('>', start + open.length);
  if (gtPos === -1) return '';
  const end = xml.indexOf(close, gtPos);
  if (end === -1) return '';
  return xml.slice(gtPos + 1, end).trim();
}

function extractAttr(xml: string, tag: string, attr: string): string {
  const open = `<${tag}`;
  const start = xml.indexOf(open);
  if (start === -1) return '';
  const end = xml.indexOf('>', start);
  const chunk = xml.slice(start, end + 1);
  const match = chunk.match(new RegExp(`${attr}="([^"]*)"`));
  return match ? match[1] : '';
}

function splitEntries(xml: string): string[] {
  const entries: string[] = [];
  let cursor = 0;
  while (true) {
    const start = xml.indexOf('<entry>', cursor);
    if (start === -1) break;
    const end = xml.indexOf('</entry>', start);
    if (end === -1) break;
    entries.push(xml.slice(start, end + '</entry>'.length));
    cursor = end + '</entry>'.length;
  }
  return entries;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function categorizeCommit(title: string): CommitCategory {
  if (title.startsWith('feat')) return 'feat';
  if (title.startsWith('fix')) return 'fix';
  if (title.startsWith('refactor')) return 'refactor';
  if (title.startsWith('chore')) return 'chore';
  if (title.startsWith('ui')) return 'ui';
  if (title.startsWith('docs')) return 'docs';
  return 'other';
}

function parseRelease(entryXml: string): ReleaseInfo {
  return {
    tag: extractTag(entryXml, 'id').split('/').pop() || '',
    title: extractTag(entryXml, 'title'),
    date: extractTag(entryXml, 'updated'),
    url: extractAttr(entryXml, 'link', 'href'),
    body: extractTag(entryXml, 'content'),
  };
}

function parseCommit(entryXml: string): CommitInfo {
  return {
    title: extractTag(entryXml, 'title'),
    date: extractTag(entryXml, 'updated'),
    url: extractAttr(entryXml, 'link', 'href'),
    author: extractTag(entryXml, 'name'),
  };
}

async function fetchLatestRelease(): Promise<ReleaseInfo | null> {
  const res = await fetch(`https://github.com/${REPO}/releases.atom`, {
    headers: FEED_HEADERS,
  });
  if (!res.ok) return null;

  const [entry] = splitEntries(await res.text());
  return entry ? parseRelease(entry) : null;
}

async function fetchCommitsForTag(tag: string): Promise<CommitInfo[]> {
  const res = await fetch(`https://github.com/${REPO}/commits/${tag}.atom`, {
    headers: FEED_HEADERS,
  });
  if (!res.ok) return [];

  return splitEntries(await res.text()).map(parseCommit);
}

export async function fetchChangelog(): Promise<{
  release: ReleaseInfo | null;
  commits: CommitInfo[];
}> {
  try {
    const release = await fetchLatestRelease();
    if (!release) return { release: null, commits: [] };

    const commits = await fetchCommitsForTag(release.tag);
    return { release, commits };
  } catch {
    return { release: null, commits: [] };
  }
}
