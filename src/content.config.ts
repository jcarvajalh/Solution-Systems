import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";

const team = defineCollection({
  loader: glob({
    base: "./src/content/team",
    pattern: "**/*.{md,mdx,json,yaml}",
  }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    photo: z.string(),
    order: z.number(),
  }),
});

const testimonials = defineCollection({
  loader: glob({
    base: "./src/content/testimonials",
    pattern: "**/*.{md,mdx,json,yaml}",
  }),
  schema: z.object({
    author: z.string(),
    role: z.string(),
    company: z.string(),
    logo: z.string(),
    quote: z.string(),
    date: z.coerce.date(),
  }),
});

const faqs = defineCollection({
  loader: glob({
    base: "./src/content/faqs",
    pattern: "**/*.{md,mdx,json,yaml}",
  }),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    order: z.number(),
  }),
});

const products = defineCollection({
  loader: glob({
    base: "./src/content/products",
    pattern: "**/*.{md,mdx,json,yaml}",
  }),
  schema: z.object({
    slug: z.string(),
    name: z.string(),
    description: z.string(),
    features: z.array(z.string()),
  }),
});

const clients = defineCollection({
  loader: glob({
    base: "./src/content/clients",
    pattern: "**/*.{md,mdx,json,yaml}",
  }),
  schema: z.object({
    name: z.string(),
    logo: z.string(),
  }),
});

const timeline = defineCollection({
  loader: glob({
    base: "./src/content/timeline",
    pattern: "**/*.{md,mdx,json,yaml}",
  }),
  schema: z.object({
    year: z.number(),
    title: z.string(),
    description: z.string(),
    order: z.number(),
  }),
});

export const collections = {
  team,
  testimonials,
  faqs,
  products,
  clients,
  timeline,
};
