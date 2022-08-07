import { z } from "./zod.ts";
import { capiFormatSchema } from "./capi.ts";
import { feTrailTypeSchema } from "./trails.ts";

const onwardsTypeSchema = z.enum([
  "series",
  "more-on-this-story",
  "related-stories",
  "related-content",
  "more-media-in-section",
  "more-galleries",
  "curated-content",
  "default-onwards",
]);

export const feOnwardsTypeSchema = z.object({
  heading: z.string(),
  trails: z.array(feTrailTypeSchema),
  description: z.string().optional(),
  url: z.string().optional(),
  onwardsType: onwardsTypeSchema,
  format: capiFormatSchema,
  isCuratedContent: z.boolean().optional(),
});
