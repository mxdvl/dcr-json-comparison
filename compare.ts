import { checkAjv } from "./ajv/article-fe.ts";
import { articles } from "./dedupe.ts";
import { getArticleUrls, getContent } from "./get-articles.ts";
import { checkZod } from "./zod/article-fe.ts";

const wait = (n: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, n);
  });

for await (const webUrl of getArticleUrls(10_000)) {
  if (articles.has(webUrl)) continue;

  const data = await getContent(webUrl);
  const zod = checkZod(data);
  const ajv = checkAjv(data);

  articles.set(webUrl, { zod, ajv });

  await wait(12 + Math.random() * 240);
}

Deno.exit(0);
