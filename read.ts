import { articles } from "./dedupe.ts";

const failed_parsing = new Set<string>();
const differences = new Set<string>();

const getDiff = () => {
  for (const [webUrl, { zod, ajv }] of articles.entries()) {
    if (typeof ajv === "boolean" && zod !== ajv) {
      differences.add(webUrl);
    }
    if (!zod) failed_parsing.add(webUrl);
  }

  console.log("Difference:", differences.size, "/", articles.size);
  console.log("Failures:", failed_parsing.size, "/", articles.size);
};

if (import.meta.main) {
  getDiff();
  Deno.exit(0);
}

export { getDiff };
