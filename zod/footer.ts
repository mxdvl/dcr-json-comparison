import { z } from "./zod.ts";

const footerLinkSchema = z.object({
  text: z.string(),
  url: z.string(),
  dataLinkName: z.string(),
  extraClasses: z.string().optional(),
});

export const footerTypeSchema = z.object({
  footerLinks: z.array(z.array(footerLinkSchema)),
});
