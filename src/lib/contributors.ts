// The people who have committed to nuza, read from GitHub at build time.
//
// Like the star count (see stars.ts), the REST API is asked first, and when
// it refuses an unauthenticated build the list is read from the data behind
// the repository's contributors graph instead. If both fail the list is
// empty and the section shows only its invite.
//
// Bots (dependabot, github-actions and the like) are left out. The API marks
// them with type "Bot", and both sources give them a "[bot]" login suffix.

const REPO = 'puang59/nuza';
const HEADERS = { 'User-Agent': 'nuza-website/1.0' };

export interface Contributor {
  login: string;
  avatar: string;
  url: string;
  contributions: number;
}

const isBot = (login: string) => /\[bot\]$/i.test(login);

async function contributorsFromApi(): Promise<Contributor[] | null> {
  const res = await fetch(`https://api.github.com/repos/${REPO}/contributors?per_page=100`, {
    headers: HEADERS,
  });
  if (!res.ok) return null;
  const list = await res.json();
  if (!Array.isArray(list)) return null;
  return list
    .filter((c) => c?.login && c.type === 'User' && !isBot(c.login))
    .map((c) => ({
      login: c.login,
      avatar: c.avatar_url,
      url: c.html_url,
      contributions: c.contributions,
    }));
}

// Answers 202 with no body while GitHub is still computing the graph, which
// counts as a failure here.
async function contributorsFromGraph(): Promise<Contributor[] | null> {
  const res = await fetch(`https://github.com/${REPO}/graphs/contributors-data`, {
    headers: { ...HEADERS, Accept: 'application/json' },
  });
  if (res.status !== 200) return null;
  const list = await res.json();
  if (!Array.isArray(list)) return null;
  return list
    .filter((c) => c?.author?.login && !isBot(c.author.login))
    .map((c) => ({
      login: c.author.login,
      avatar: c.author.avatar,
      url: `https://github.com/${c.author.login}`,
      contributions: c.total,
    }))
    .sort((a, b) => b.contributions - a.contributions);
}

export async function fetchContributors(): Promise<Contributor[]> {
  for (const source of [contributorsFromApi, contributorsFromGraph]) {
    try {
      const list = await source();
      if (list && list.length > 0) return list;
    } catch {
      // try the next source
    }
  }
  return [];
}
