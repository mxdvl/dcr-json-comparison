import { enum as union, number, object, string } from "./zod.ts";

const topicTypeSchema = union([
  "ORG",
  "PRODUCT",
  "PERSON",
  "GPE",
  "WORK_OF_ART",
  "LOC",
]);

export const topicSchema = object({
  type: topicTypeSchema,
  value: string(),
  count: number().optional(),
});
