import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const experience = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/experience' }),
  schema: z.object({
    title: z.string(),
    company: z.string(),
    location: z.string(),
    dates: z.string(),
    teaser: z.string(),
    bullets: z.array(z.string()),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    thumbnail: z.string().optional(),
    tags: z.array(z.string()),
    demoUrl: z.string().optional(),
    githubUrl: z.string().optional(),
    teaser: z.string(),
    problem: z.string(),
    solution: z.string(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    category: z.string(),
    readTime: z.string().default('5 min'),
    heroImage: z.string().optional(),
    excerpt: z.string(),
  }),
});

export const collections = { experience, projects, blog };
