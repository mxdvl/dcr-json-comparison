import Ajv from "https://esm.sh/ajv@8.11.0";
import addFormats from "https://esm.sh/ajv-formats@2.1.1";

import feArticleSchema from "./article-schema.json" assert { type: "json" };

const ajv = new Ajv({
  verbose: false,
  allErrors: false,
  logger: false,
  useDefaults: "empty",
});
addFormats(ajv);

const feArticleValidator = ajv.compile(feArticleSchema);

export const checkAjv = (data: unknown): boolean => feArticleValidator(data);
