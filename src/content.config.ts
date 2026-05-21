import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const games = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/games' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    level: z.enum(['A1', 'A2', 'B1', 'B2', 'C1']),
    type: z.enum([
      'Hangman',
      'Jeopardy',
      'Blockbusters',
      'Taboo',
      'Codenames',
      'Typhoon',
      'Gap-fills',
      'Quizzes',
    ]),
    topic: z.string(),
    duration: z.number(), // minutes
    ageGroup: z.enum(['Young learners', 'Teens', 'Adults', 'All ages']).default('All ages'),
    gameFile: z.string(), // path under /games/, e.g. "hotel-vocabulary-hangman.html"
    featured: z.boolean().default(false),
    publishDate: z.date(),
    instructions: z.string().optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updateDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
  }),
});

export const collections = { games, blog };

