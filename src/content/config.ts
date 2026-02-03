import { defineCollection, z } from 'astro:content';

const news_ja = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    summary: z.string().optional(),
    cover: z.string().optional(),
    tags: z.array(z.string()).optional()
  })
});

const news_en = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    summary: z.string().optional(),
    cover: z.string().optional(),
    tags: z.array(z.string()).optional()
  })
});

const projects_ja = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    year: z.string().optional(),
    status: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    gallery: z.array(z.string()).optional()
  })
});

const projects_en = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    year: z.string().optional(),
    status: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    gallery: z.array(z.string()).optional()
  })
});

const members_ja = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    affiliation: z.string().optional(),
    email: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    photo: z.string().optional(),
    links: z.array(z.object({ label: z.string(), url: z.string() })).optional()
  })
});

const members_en = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    affiliation: z.string().optional(),
    email: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    photo: z.string().optional(),
    links: z.array(z.object({ label: z.string(), url: z.string() })).optional()
  })
});

const pages_ja = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    lead: z.string().optional(),
    hero_image: z.string().optional()
  })
});

const pages_en = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    lead: z.string().optional(),
    hero_image: z.string().optional()
  })
});

const teaching_ja = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    course: z.string().optional(),
    year: z.string().optional(),
    link: z.string(),
    type: z.string().optional()
  })
});

const teaching_en = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    course: z.string().optional(),
    year: z.string().optional(),
    link: z.string(),
    type: z.string().optional()
  })
});

export const collections = {
  news_ja,
  news_en,
  projects_ja,
  projects_en,
  members_ja,
  members_en,
  pages_ja,
  pages_en,
  teaching_ja,
  teaching_en
};
