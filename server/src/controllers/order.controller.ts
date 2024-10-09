import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { placeOrder, getAllOrders } from "../services/order.service";
import { AlgorithmName } from "../entities/algorithms";

const getAllOrdersHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    res.status(StatusCodes.OK).send(await getAllOrders());
  } catch (error: unknown) {
    next(error);
  }
};

const placeOrderHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const [
      deliveryManPath, 
      deliveryManVisitedNodes, 
      deliveryMan, 
      userPath, 
      userVisitedNodes
    ] = await placeOrder(
      req.body.grid, 
      req.body.startRestaurant,
      <AlgorithmName><unknown>req.params.algorithm,
      req.body.orderItems,
    );

    res.status(deliveryManPath.length > 0 ? StatusCodes.OK : StatusCodes.ACCEPTED).send({
      deliveryPath: deliveryManPath, 
      deliveryVisited: deliveryManVisitedNodes,
      deliveryMan: deliveryMan,
      userPath: userPath,
      userVisited: userVisitedNodes,
    });
  } catch (error: unknown) {
    next(error);
  }
};

export { 
  placeOrderHandler,
  getAllOrdersHandler
};
