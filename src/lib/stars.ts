// The repository's star count, read at build time.
//
// The REST API is asked first, but unauthenticated it allows 60 requests an
// hour per address, and a build server shares its address with many others.
// So when that is refused, the number is read off the repository's own page
// instead. If both fail the result is null and the page shows no count.

const REPO = 'puang59/nuza';
const HEADERS = { 'User-Agent': 'nuza-website/1.0' };

async function starsFromApi(): Promise<number | null> {
  const res = await fetch(`https://api.github.com/repos/${REPO}`, { headers: HEADERS });
  if (!res.ok) return null;
  const count = (await res.json())?.stargazers_count;
  return typeof count === 'number' ? count : null;
}

async function starsFromPage(): Promise<number | null> {
  const res = await fetch(`https://github.com/${REPO}`, { headers: HEADERS });
  if (!res.ok) return null;
  const match = (await res.text()).match(/id="repo-stars-counter-star"[^>]*\btitle="([\d,]+)"/);
  return match ? Number(match[1].replace(/,/g, '')) : null;
}

export async function fetchStarCount(): Promise<number | null> {
  for (const source of [starsFromApi, starsFromPage]) {
    try {
      const count = await source();
      if (count !== null) return count;
    } catch {
      // try the next source
    }
  }
  return null;
}

/** 18 stays "18", 1234 becomes "1.2k". */
export function formatStarCount(count: number): string {
  if (count < 1000) return String(count);
  return `${(count / 1000).toFixed(1).replace(/\.0$/, '')}k`;
}
