// The blog: one markdown file per post under src/content/blog, named for the
// address it is served at.

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    /** What a search result shows under the title. */
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().default('puang'),
    /** Says the post is about Obsidian, which is not ours to speak for. */
    mentionsObsidian: z.boolean().default(false),
  }),
});

export const collections = { blog };
