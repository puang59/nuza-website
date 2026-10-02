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

// The feeds escape their text, and Astro escapes it again when it renders,
// so an apostrophe left as it came would be shown as "&#39;".
function decodeEntities(text: string): string {
  return text
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
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
    title: decodeEntities(extractTag(entryXml, 'title')),
    date: extractTag(entryXml, 'updated'),
    url: extractAttr(entryXml, 'link', 'href'),
    body: extractTag(entryXml, 'content'),
  };
}

function parseCommit(entryXml: string): CommitInfo {
  return {
    title: decodeEntities(extractTag(entryXml, 'title')),
    date: extractTag(entryXml, 'updated'),
    url: extractAttr(entryXml, 'link', 'href'),
    author: extractTag(entryXml, 'name'),
  };
}

async function fetchReleases(limit = 5): Promise<ReleaseInfo[]> {
  const res = await fetch(`https://github.com/${REPO}/releases.atom`, {
    headers: FEED_HEADERS,
  });
  if (!res.ok) return [];

  const entries = splitEntries(await res.text()).slice(0, limit);
  return entries.map(parseRelease);
}

async function fetchCommitsForTag(tag: string): Promise<CommitInfo[]> {
  const res = await fetch(`https://github.com/${REPO}/commits/${tag}.atom`, {
    headers: FEED_HEADERS,
  });
  if (!res.ok) return [];

  return splitEntries(await res.text()).map(parseCommit);
}

/** A release tag as a bare version number: `app-v0.2.0` becomes `0.2.0`. */
export function versionFromTag(tag: string): string {
  return tag.replace(/^(app-)?v/, '');
}

/**
 * The latest released version, for pages that need it to build download
 * links but have no use for the changelog itself. Empty when GitHub can't be
 * reached, which the download buttons take as "link to the releases page".
 */
export async function fetchLatestVersion(): Promise<string> {
  try {
    const [latest] = await fetchReleases(1);
    return latest?.tag ? versionFromTag(latest.tag) : '';
  } catch {
    return '';
  }
}

export interface ChangelogData {
  release: ReleaseInfo;
  commits: CommitInfo[];
}

export async function fetchChangelog(): Promise<ChangelogData[]> {
  try {
    const releases = await fetchReleases(5);
    if (releases.length === 0) return [];

    const data = await Promise.all(
      releases.map(async (release) => {
        const commits = await fetchCommitsForTag(release.tag);
        return { release, commits };
      })
    );
    return data;
  } catch {
    return [];
  }
}
