import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { getMenuByRestaurantId } from "../services/menu.service";
import { getAllDeliveryMans } from "../services/deliveryMan.service";

const getMenuByRestaurantIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    res.status(StatusCodes.OK).send(await getMenuByRestaurantId(parseInt(req.params.restaurantId)));
  } catch (error: unknown) {
    next(error);
  }
};

export { 
    getMenuByRestaurantIdHandler 
};
