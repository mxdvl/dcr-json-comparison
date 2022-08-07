import { checkAjv } from "./ajv/article-fe.ts";
import { articles, issues } from "./dedupe.ts";
import { getArticleUrls, getContent } from "./get-articles.ts";
import { checkZod } from "./zod/article-fe.ts";

const wait = (n: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, n);
  });

const failed_parsing = new Set<string>();
const differences = new Set<string>();
for (const [article, { zod, ajv }] of articles.entries()) {
  if (typeof ajv === "boolean" && zod !== ajv) {
    differences.add(article);
  }
  if (!zod) failed_parsing.add(article);
}

console.log("Difference:", differences.size, "/", articles.size);
console.log("Failures:", failed_parsing.size, "/", articles.size);

for await (const webUrl of getArticleUrls(100_000)) {
  try {
    if (articles.has(webUrl)) continue;

    const data = await getContent(webUrl);
    const zod = checkZod(data);
    const ajv = checkAjv(data);

    if (!zod) console.warn("Failed to parse:", webUrl);

    articles.set(webUrl, { zod, ajv });
  } catch (error) {
    console.warn("Something went wrong with", webUrl);
    if (error instanceof SyntaxError) console.warn(error.message);

    issues.add(webUrl);

    const delay = 1200 + Math.random() * 6_000;
    console.warn(
      `Waiting for ${(delay / 1000).toFixed(1)}s before checking the next item`
    );

    await wait(delay);
  }
}

Deno.exit(0);
