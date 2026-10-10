// The blog as a feed, written by hand: it is a few lines of XML, which is
// less to carry than a package for it.

import type { APIRoute } from 'astro';
import { fetchPosts, postPath } from '../../lib/blog';

function escaped(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export const GET: APIRoute = async ({ site }) => {
  const base = site?.toString().replace(/\/$/, '') ?? 'https://nuza.puang.in';
  const posts = await fetchPosts();

  const items = posts
    .map((post) => {
      const url = `${base}${postPath(post)}`;
      return [
        '    <item>',
        `      <title>${escaped(post.data.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid>${url}</guid>`,
        `      <description>${escaped(post.data.description)}</description>`,
        `      <dc:creator>${escaped(post.data.author)}</dc:creator>`,
        `      <pubDate>${post.data.pubDate.toUTCString()}</pubDate>`,
        '    </item>',
      ].join('\n');
    })
    .join('\n');

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>nuza blog</title>
    <link>${base}/blog/</link>
    <description>Guides and notes on markdown note taking, Vim keybindings and local-first writing.</description>
    <language>en</language>
${items}
  </channel>
</rss>
`;

  return new Response(feed, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
