import { Router } from "express";
import CheckEligibility from "src/usecase/CheckEligibility";
import { inputValidator } from "../validator/input.validator";

const checkRouter = Router();

checkRouter.post("/v1/check/eligibility", inputValidator, CheckEligibility);

export default checkRouter;
