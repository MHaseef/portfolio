import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const skills = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/skills' }),
  schema: z.object({
    order: z.number().optional().default(999),
    name: z.string(),
    category: z.string().optional().default('Languages & Frameworks'),
    proficiency: z.string().optional().default('Advanced'),
    icon: z.string().optional().default(''),
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/experience' }),
  schema: z.object({
    order: z.number().optional().default(999),
    title: z.string(),
    company: z.string().optional().default(''),
    type: z.string().optional().default('Full-time'),
    logo: z.string().optional().default(''),
    location: z.string().optional().default(''),
    startDate: z.string().optional().default(''),
    endDate: z.string().optional().default(''),
    current: z.boolean().optional().default(false),
    dates: z.string().optional().default(''),
    teaser: z.string().optional().default(''),
    description: z.string().optional().default(''),
    bullets: z.array(z.string()).optional().default([]),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/projects' }),
  schema: z.object({
    order: z.number().optional().default(999),
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
    order: z.number().optional().default(999),
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

export const collections = { profile, skills, experience, projects, blog };



