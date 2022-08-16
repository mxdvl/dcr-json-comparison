import { infer as Infer, set } from "./zod/zod.ts";
import { map, object, string, boolean } from "./zod/zod.ts";

const articlesSchema = map(
  string(),
  object({
    zod: boolean().optional(),
    ajv: boolean().optional(),
  })
);

const issues_schema = set(string());

type ArticlesMap = Infer<typeof articlesSchema>;

const filepath = new URL(import.meta.resolve("./map.json"));

const getArticles = async (): Promise<ArticlesMap> => {
  const input = await Deno.readTextFile(filepath);
  const entries = Object.entries(JSON.parse(input));
  return articlesSchema.parse(new Map(entries));
};

export const articles = await getArticles();
console.log(articles.size, "articles checked (from disk)");

const issues_file_path = new URL(import.meta.resolve("./issues.json"));
const getIssues = async () => {
  const input = await Deno.readTextFile(issues_file_path);
  const array = JSON.parse(input);
  return issues_schema.parse(new Set(array));
};

export const issues = await getIssues();
console.log(issues.size, "issues recorded (from disk)");

const saveArticles = async () => {
  const output = Object.fromEntries(articles.entries());
  await Deno.writeTextFile(filepath, JSON.stringify(output, null, 2));
  console.log(articles.size, "articles checked");
};

const saveIssues = async () => {
  const output = [...issues];
  await Deno.writeTextFile(issues_file_path, JSON.stringify(output, null, 2));
  console.log(issues.size, "issues recorded");
};

export { saveArticles, saveIssues };
