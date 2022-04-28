import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

const logRequests = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.url}`);
  next();
};

const logResponses = (req: Request, res: Response, next: NextFunction) => {
  res.on("finish", () => {
    logger.info(`${res.statusCode} ${res.statusMessage}`);
  });
  next();
};

export { logRequests, logResponses };
