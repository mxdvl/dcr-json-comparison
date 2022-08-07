import type { infer as Infer } from "./zod/zod.ts";
import { map, object, string, boolean } from "./zod/zod.ts";

const articlesSchema = map(
  string(),
  object({
    zod: boolean(),
    ajv: boolean().optional(),
  })
);

type ArticlesMap = Infer<typeof articlesSchema>;

const filepath = new URL(import.meta.resolve("./map.json"));

const getArticles = async (): Promise<ArticlesMap> => {
  const input = await Deno.readTextFile(filepath);
  const entries = Object.entries(JSON.parse(input));
  return articlesSchema.parse(new Map(entries));
};

export const articles = await getArticles();
console.log(articles.size, "articles checked (from disk)")

let lastSize = articles.size;
setInterval(async () => {
  if (articles.size === lastSize) return;
  lastSize = articles.size;

  const output = Object.fromEntries(articles.entries());
  await Deno.writeTextFile(filepath, JSON.stringify(output));
  console.log(articles.size, "articles checked");
}, 1200);
