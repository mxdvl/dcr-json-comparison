import Ajv from "https://esm.sh/ajv@8";
import addFormats from "https://esm.sh/ajv-formats";

import feArticleSchema from "./article-schema.json" assert { type: "json" };

const ajv = new Ajv({
  verbose: false,
  allErrors: false,
  logger: false,
  useDefaults: "empty",
});
addFormats(ajv);

export const feArticleValidator = ajv.compile(feArticleSchema);
