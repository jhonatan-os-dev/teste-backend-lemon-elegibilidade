
import { NextFunction, Request, Response } from "express";
import { validateInput } from "../schema/input.schema";
import { parseErrors } from "src/error/error";

export const inputValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isValid = validateInput(req.body);
  if (!isValid && validateInput.errors) {
    const errors = await parseErrors(validateInput.errors);
    return res
      .status(400)
      .json({ status: "InvalidRequest", code: 400, errors: errors });
  }
  next();
};
