import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { getAllCustomers, getCustomerById } from "../services/customers.service";

const getAllCustomersHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    res.status(StatusCodes.OK).send(await getAllCustomers());
  } catch (error: unknown) {
    next(error);
  }
};

const getCustomerByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    res.status(StatusCodes.OK).send(await getCustomerById(parseInt(req.params.customerId)));
  } catch (error: unknown) {
    next(error);
  }
};

export { 
    getAllCustomersHandler,
    getCustomerByIdHandler
};
