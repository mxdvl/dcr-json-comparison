// Generated by ts-to-zod
import { z } from "./zod.ts";
import { brandingSchema } from "./branding.ts";
import { capiFormatSchema, legacyPillarSchema } from "./capi.ts";

const articleFormatSchema = z.literal("---ArticleFormat");

const dCRSupportingContentSchema = z.object({
  headline: z.string(),
  url: z.string().optional(),
  kickerText: z.string().optional(),
  format: articleFormatSchema,
});

const dCRSnapTypeSchema = z.object({
  embedHtml: z.string().optional(),
  embedCss: z.string().optional(),
});

const mediaTypeSchema = z.union([
  z.literal("Video"),
  z.literal("Audio"),
  z.literal("Gallery"),
]);

const baseTrailTypeSchema = z.object({
  url: z.string(),
  headline: z.string(),
  webPublicationDate: z.string().optional(),
  image: z.string().optional(),
  avatarUrl: z.string().optional(),
  mediaType: mediaTypeSchema.optional(),
  mediaDuration: z.number().optional(),
  ageWarning: z.string().optional(),
  byline: z.string().optional(),
  showByline: z.boolean().optional(),
  kickerText: z.string().optional(),
  shortUrl: z.string().optional(),
  commentCount: z.number().optional(),
  starRating: z.number().optional(),
  linkText: z.string().optional(),
  branding: brandingSchema.optional(),
  isSnap: z.boolean().optional(),
  snapData: dCRSnapTypeSchema.optional(),
});

export const trailTypeSchema = baseTrailTypeSchema.extend({
  palette: z.never().optional(),
  format: articleFormatSchema,
  supportingContent: z.array(dCRSupportingContentSchema).optional(),
  trailText: z.string().optional(),
  dataLinkName: z.string(),
  discussionId: z.string().optional(),
  isBoosted: z.boolean().optional(),
});

export const feTrailTypeSchema = baseTrailTypeSchema.extend({
  format: capiFormatSchema,
  designType: z.string(),
  pillar: legacyPillarSchema,
  carouselImages: z.record(z.string()).optional(),
  isLiveBlog: z.boolean().optional(),
});
