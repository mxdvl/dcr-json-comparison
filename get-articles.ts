import { array, literal, number, object, string } from "./zod/zod.ts";

const key = "test";

type DateString = `${number}-${number}-${number}`;
type Options = { date: DateString; size?: number };
const capiSearchUrl = ({ date, size = 10 }: Options) => {
  const search = new URLSearchParams({
    "page-size": String(size),
    // page: String(page),
    "from-date": date,
    "to-date": date,
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
  capiSearchUrl({ date: "2022-08-01", size: 1 })
).then((r) => r.json());
const {
  response: { total },
} = totalSchema.parse(json);

async function* getArticleUrls(n: number) {
  let count = 0;
  const webUrls: string[] = [];

  while (count < n) {
    if (webUrls.length === 0) {
      const year = Math.floor(2016 + Math.random() * 7);
      const month = Math.ceil(Math.random() * 12);
      const date: DateString = `${year}-${month}-15`;
      const url = capiSearchUrl({ date, size: 200 });
      console.log(url);

      const json: unknown = await fetch(url).then((r) => r.json());
      const {
        response: { results },
      } = resultsSchema.parse(json);

      webUrls.push(
        ...results
          .map(({ webUrl }) => webUrl)
          .filter((url) => !url.includes("/crosswords/"))
      );
    }

    count++;
    const next = webUrls.shift();
    if (typeof next !== "string") return;
    yield next;
  }
}

const getContent = (webUrl: string): Promise<string> =>
  fetch(`${webUrl}.json?dcr`).then((r) => r.json());

export { total, getContent, getArticleUrls };
