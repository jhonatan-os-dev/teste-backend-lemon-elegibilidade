import { parseErrors } from "@error/error";
import { validateOutput } from "@schema/output.schema";
import { OutputType } from "@usecase/type/output.type";
import { NextFunction, Response } from "express";

export const outputValidator = async (
  output: OutputType,
  res: Response,
  next: NextFunction
) => {
  const isValid = validateOutput(output);
  if (!isValid && validateOutput.errors) {
    const errors = await parseErrors(validateOutput.errors);
    return res
      .status(400)
      .json({ status: "InvalidResponse", code: 400, errors: errors });
  }
  next();
};
