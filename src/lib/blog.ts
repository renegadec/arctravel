import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  author: string;
  tags: string[];
  content: string;
  readingTime: number;
}

const postsDirectory = path.join(process.cwd(), "src", "content", "blog");

function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function parsePost(fileName: string): BlogPost {
  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug: fileName.replace(/\.md$/, ""),
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    image: data.image,
    author: data.author ?? "ArcTravel",
    tags: data.tags ?? [],
    content,
    readingTime: readingTime(content),
  };
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) return [];
  const files = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));
  return files
    .map(parsePost)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(filePath)) return undefined;
  return parsePost(`${slug}.md`);
}
