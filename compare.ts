import { checkAjv } from "./ajv/article-fe.ts";
import { articles, issues, saveArticles, saveIssues } from "./dedupe.ts";
import { getArticleUrls, getContent, TooManyRequests } from "./get-articles.ts";
import { getDiff } from "./read.ts";

import { checkZod } from "./zod/article-fe.ts";

const wait = (n: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, n);
  });

getDiff();

for await (const webUrl of getArticleUrls(100_000)) {
  try {
    if (articles.has(webUrl)) continue;

    const data = await getContent(webUrl);

    const zod = checkZod(data);
    const ajv = checkAjv(data);

    if (!zod) console.warn("Parsing failed:", webUrl);

    articles.set(webUrl, { zod, ajv });
    if (articles.size % 100 === 0) saveArticles();
  } catch (error) {
    if (error instanceof TooManyRequests) {
      const delay = 1200 + Math.random() * 6_000;
      console.warn(
        `Too many request. Waiting for ${(delay / 1000).toFixed(
          1
        )}s before checking the next item`
      );
      await wait(delay);
      continue;
    }

    if (
      error instanceof SyntaxError &&
      error.message.includes("is not valid JSON")
    ) {
      console.warn("Invalid JSON returned at", webUrl);
    } else {
      console.warn("An unknown error happened with", webUrl);
    }

    issues.add(webUrl);
    saveIssues();
  }
}

Deno.exit(0);
