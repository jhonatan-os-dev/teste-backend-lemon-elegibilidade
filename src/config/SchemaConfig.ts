import Ajv from "ajv";

export const AjvConfig = new Ajv({
  allErrors: true,
  verbose: true,
});
