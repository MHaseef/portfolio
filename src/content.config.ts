import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const experience = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/experience' }),
  schema: z.object({
    title: z.string(),
    company: z.string().optional().default(''),
    logo: z.string().optional().default(''),
    location: z.string().optional().default(''),
    dates: z.string().optional().default(''),
    teaser: z.string().optional().default(''),
    description: z.string().optional().default(''),
    bullets: z.array(z.string()).optional().default([]),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    category: z.string().optional().default('WebGIS'),
    thumbnail: z.string().optional().default(''),
    tags: z.array(z.string()).optional().default([]),
    demoUrl: z.string().optional().default(''),
    githubUrl: z.string().optional().default(''),
    teaser: z.string().optional().default(''),
    problem: z.string().optional().default(''),
    solution: z.string().optional().default(''),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.string().optional().default(''),
    category: z.string().optional().default('MAPPING'),
    readTime: z.string().optional().default('5 min'),
    heroImage: z.string().optional().default(''),
    excerpt: z.string().optional().default(''),
  }),
});

const profile = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/profile' }),
  schema: z.any(),
});

export const collections = { profile, experience, projects, blog };

