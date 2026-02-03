import { defineCollection, z } from 'astro:content';

const lang = z.enum(['ja', 'en']);

const news = defineCollection({
  type: 'content',
  schema: z.object({
    lang,
    title: z.string(),
    date: z.date(),
    summary: z.string().optional(),
    cover: z.string().optional(),
    tags: z.array(z.string()).optional()
  })
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    lang,
    title: z.string(),
    summary: z.string(),
    year: z.string().optional(),
    status: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    gallery: z.array(z.string()).optional()
  })
});

const members = defineCollection({
  type: 'content',
  schema: z.object({
    lang,
    name: z.string(),
    role: z.string(),
    affiliation: z.string().optional(),
    email: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    photo: z.string().optional(),
    links: z.array(z.object({ label: z.string(), url: z.string() })).optional()
  })
});

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    lang,
    title: z.string(),
    lead: z.string().optional(),
    hero_image: z.string().optional()
  })
});

const teaching = defineCollection({
  type: 'content',
  schema: z.object({
    lang,
    title: z.string(),
    course: z.string().optional(),
    year: z.string().optional(),
    link: z.string(),
    type: z.string().optional()
  })
});

export const collections = {
  news,
  projects,
  members,
  pages,
  teaching
};
