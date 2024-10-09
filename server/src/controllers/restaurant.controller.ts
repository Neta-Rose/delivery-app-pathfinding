import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { getAllRestaurant } from "../services/restaurant.service";

const getAllRestaurantsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    res.status(StatusCodes.OK).send(await getAllRestaurant());
  } catch (error: unknown) {
    next(error);
  }
};

export { 
    getAllRestaurantsHandler 
};
