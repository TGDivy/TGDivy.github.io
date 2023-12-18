import { defineCollection, z } from "astro:content";

// Post collection schema
const postsCollection = defineCollection({
  schema: z.object({
    id: z.string().optional(),
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    date: z.date().optional(),
    image: z.string().optional(),
    categories: z.array(z.string()).default(["others"]),
    tags: z.array(z.string()).default(["others"]),
    draft: z.boolean().optional(),
  }),
});

const projectCollection = defineCollection({
  schema: z.object({
    id: z.string().optional(),
    image: z.string().optional(),

    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),

    created_at: z.date(),
    updated_at: z.date(),
    date: z.date(),

    categories: z.array(z.string()).default(["Software Development"]),

    html_url: z.string().optional(),

    forks_count: z.number().optional(),
    stargazers_count: z.number().optional(),
    size: z.number().optional(),
    watchers_count: z.number().optional(),

    draft: z.boolean().optional(),
  }),
});

// Pages collection schema
const pagesCollection = defineCollection({
  schema: z.object({
    id: z.string().optional(),
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    layout: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

const aboutCollection = defineCollection({
  schema: z.object({
    id: z.string().optional(),
    title: z.string(),
    meta_title: z.string().optional(),
    image: z.string().optional(),
    description: z.string().optional(),
    draft: z.boolean().optional(),

    professional_title: z.string().optional(),

    what_i_do: z
      .object({
        title: z.string().optional(),
        items: z.array(
          z.object({
            title: z.string().optional(),
            description: z.string().optional(),
          }),
        ),
      })
      .optional(),

    timeline: z
      .array(
        z.object({
          label: z.string().optional(),
          content: z.array(
            z.object({
              date: z.string().optional(),
              title: z.string().optional(),
              description: z.string().optional(),
            }),
          ),
        }),
      )
      .optional(),
  }),
});

// Export collections
export const collections = {
  posts: postsCollection,
  pages: pagesCollection,
  projects: projectCollection,
  about: aboutCollection,
};
