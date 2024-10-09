import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { getAllDeliveryMans } from "../services/deliveryMan.service";

const getAllDeliveryManHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    res.status(StatusCodes.OK).send(await getAllDeliveryMans());
  } catch (error: unknown) {
    next(error);
  }
};

export { 
    getAllDeliveryManHandler 
};
