import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import logger from "../logger/logger";

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  logger.error(`Error Ocurred - ${err.message}`);

  res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  res.json({
    error: "Internal server error",
    details: err.message,
  });
};

export { errorHandler };
