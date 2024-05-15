import type { output } from "./zod.ts";
import { enum as union, object, string } from "./zod.ts";

export const editionId = union(["UK", "US", "INT", "AU"]);

export const edition = object({
  id: editionId,
  displayName: string(),
  locale: string(),
});

type ZEditionId = output<typeof editionId>;
type ZEdition = output<typeof edition>;

export type { ZEdition, ZEditionId };
