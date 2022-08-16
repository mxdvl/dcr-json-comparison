import { array, literal, number, object, string } from "./zod/zod.ts";

const key = "test";

type Options = { date: Date; size?: number };
const capiSearchUrl = ({ date, size = 10 }: Options) => {
  /** YYYY-MM-DD */
  const dateString = date.toISOString().slice(0, 10);
  const search = new URLSearchParams({
    "page-size": String(size),
    // page: String(page),
    "from-date": dateString,
    "to-date": dateString,
    "api-key": key,
  });
  const url = new URL(
    `search?${search.toString()}`,
    "https://content.guardianapis.com/"
  );

  return url.toString();
};

const status = literal("ok");

const totalSchema = object({
  response: object({
    status,
    total: number(),
  }),
});

const resultsSchema = object({
  response: object({
    status,
    // pageSize: number(),
    // currentPage: number(),
    results: array(
      object({
        webUrl: string(),
        // webPublicationDate: string(),
      })
    ),
  }),
});

const json: unknown = await fetch(
  capiSearchUrl({ date: new Date(), size: 1 })
).then((r) => r.json());
const {
  response: { total },
} = totalSchema.parse(json);

const rand = (from: number, to: number) =>
  Math.round(Math.random() * (to - from)) + from;

const randDate = (from: Date, to: Date) =>
  new Date(rand(from.getTime(), to.getTime()));

async function* getArticleUrls(n: number) {
  let count = 0;
  const webUrls: string[] = [];

  while (count < n) {
    if (webUrls.length === 0) {
      const date = randDate(new Date("2012-01-01"), new Date());
      console.log("Looking up articles from", date);

      const url = capiSearchUrl({ date, size: 200 });

      const json: unknown = await fetch(url).then((r) => r.json());
      const {
        response: { results },
      } = resultsSchema.parse(json);

      webUrls.push(
        ...results
          .map(({ webUrl }) => webUrl)
          .filter((url) => !url.includes("/crosswords/"))
          .filter((url) => !url.includes("/extra/quiz/"))
      );
    }

    count++;
    const next = webUrls.shift();
    if (typeof next !== "string") {
      console.info("That’s it, folks!", next);
      return;
    }
    yield next;
  }
}

class PageRemovedError extends SyntaxError {}
class TooManyRequests extends Error {}

const getContent = async (webUrl: string): Promise<unknown> => {
  const resp = await fetch(`${webUrl}.json?dcr`);
  const content = await resp.text();
  // console.log(content);
  try {
    return JSON.parse(content);
  } catch (error) {
    if (resp.status === 429) {
      throw new TooManyRequests();
    }

    if (
      content.includes(
        "<title>This page has been removed | The Guardian</title>"
      )
    ) {
      throw new PageRemovedError();
    }

    throw error;
  }
};

export { total, getContent, getArticleUrls, PageRemovedError, TooManyRequests };
