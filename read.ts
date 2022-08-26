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

  const years: number[] = [];
  const YYYY = /(19|20)\d{2}/;
  for (const failed of failed_parsing) {
    const year = Number(failed.split("/").find((s) => s.match(YYYY)));
    if (Number.isInteger(year)) {
      const prev = years[year] ?? 0;
      years[year] = prev + 1;
    }
  }

  years.forEach((count, year) => {
    console.log(year, ": ", count);
  });
};

if (import.meta.main) {
  getDiff();
  Deno.exit(0);
}

export { getDiff };
