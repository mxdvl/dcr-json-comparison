import { z } from "./zod.ts";

export const matchTypeSchema = z.enum([
  "CricketMatchType",
  "FootballMatchType",
]);
