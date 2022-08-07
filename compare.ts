import { checkAjv } from "./ajv/article-fe.ts";
import { articles, issues } from "./dedupe.ts";
import { getArticleUrls, getContent } from "./get-articles.ts";
import { checkZod } from "./zod/article-fe.ts";

const wait = (n: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, n);
  });

for await (const webUrl of getArticleUrls(100_000)) {
  try {
    if (articles.has(webUrl)) continue;

    const data = await getContent(webUrl);
    const zod = checkZod(data);
    const ajv = checkAjv(data);

    articles.set(webUrl, { zod, ajv });
  } catch (error) {
    console.warn("Something went wrong with", webUrl);
    console.warn(error);
    issues.add(webUrl);

    const delay = 1200 + Math.random() * 6_000;
    console.warn(
      `Waiting for ${(delay / 1000).toFixed(1)}s before checking the next item`
    );

    await wait(delay);
  }
}

Deno.exit(0);
