import { readFileSync, readdirSync } from "fs";
import path from "path";
import matter from "gray-matter";

// Markdown collections live in /content/<collection>/<slug>.md. Files starting with "_" are templates.
const CONTENT_ROOT = path.join(process.cwd(), "content");

type Entry<T> = T & { slug: string; body: string };

function readCollection<T>(collection: string): Entry<T>[] {
  const directory = path.join(CONTENT_ROOT, collection);
  return readdirSync(directory)
    .filter((file) => file.endsWith(".md") && !file.startsWith("_"))
    .map((file) => {
      const { data, content } = matter(readFileSync(path.join(directory, file), "utf8"));
      // YAML turns bare dates into Date objects; keep them as YYYY-MM-DD so they sort and render predictably.
      for (const [key, value] of Object.entries(data)) {
        if (value instanceof Date) data[key] = value.toISOString().slice(0, 10);
      }
      return { ...(data as T), slug: file.replace(/\.md$/, ""), body: content.trim() };
    })
    .filter((entry) => !(entry as { draft?: boolean }).draft);
}

export type Role = Entry<{
  title: string;
  team: string;
  summary: string;
  headline: string;
  type: string;
  workStyle: string;
  location: string;
  availability: string;
  reportsTo?: string;
  compensation?: string;
  hiring?: boolean;
  order?: number;
  applyUrl?: string;
}>;

export type Article = Entry<{
  title: string;
  category: string;
  summary: string;
  image: string;
  date?: string;
  authors: { name: string; initials: string }[];
  authorRole: string;
  hiringCallout?: boolean;
}>;

export function getRoles(): Role[] {
  return readCollection<Role>("careers").sort((a, b) => (a.order ?? 99) - (b.order ?? 99) || a.title.localeCompare(b.title));
}

export function getRole(slug: string) {
  return getRoles().find((role) => role.slug === slug);
}

// Newest first; undated drafts-in-progress sort to the end.
export function getArticles(): Article[] {
  return readCollection<Article>("news").sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

export function getArticle(slug: string) {
  return getArticles().find((article) => article.slug === slug);
}

export function formatDate(date: string | undefined) {
  if (!date) return undefined;
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}

export function readingMinutes(body: string) {
  return Math.max(1, Math.ceil(body.split(/\s+/).length / 220));
}

export const rolePath = (slug: string) => `/careers/${slug}`;
export const articlePath = (slug: string) => `/news/${slug}`;
