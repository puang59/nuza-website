// The blog: one markdown file per post under src/content/blog, named for the
// address it is served at. And the docs, the same way.

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    /**
     * The <title> for search, when the headline above is too long for one.
     * Google shows about 60 characters, and the headline is written for a
     * reader already on the page. Falls back to the title.
     */
    seoTitle: z.string().optional(),
    /** What a search result shows under the title. */
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().default('puang'),
    /** Says the post is about Obsidian, which is not ours to speak for. */
    mentionsObsidian: z.boolean().default(false),
  }),
});

// The docs: one markdown file per page under src/content/docs, served at
// /docs/<name>/.
const docs = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    /** The <title> for search, when the title alone says too little. */
    seoTitle: z.string().optional(),
    description: z.string(),
    /** When the page last changed, as the reader should know it. */
    updated: z.coerce.date(),
  }),
});

export const collections = { blog, docs };
