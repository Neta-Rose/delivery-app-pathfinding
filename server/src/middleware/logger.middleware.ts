import { Request, Response, NextFunction } from "express";
import logger from "../logger/logger";

const loggerMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  logger.info(`request: ${req.method} ${req.url} recieved`);
  next();
};

export { loggerMiddleware };
