import { Request, Response } from "express";
import express from "express";
import { myDataSource } from "../src/connection/data-source";
import { errorHandler } from "../src/middleware/errorHandler.middleware";
import logger from "../src/logger/logger";
import restaurantRouter from "../src/routes/restaurant.router";
import orderRouter from "../src/routes/order.router";
import deliveryManRouter from "../src/routes/deliveryMan.router";
import customerRouter from "../src/routes/customer.router";
import menuRouter from "../src/routes/menu.router";
import { loggerMiddleware } from "../src/middleware/logger.middleware";
import cors from 'cors';
import dotenv from "dotenv";

const app = express();

export default async(req:Request, res:Response) => {
    startServer();
    app(req,res)
}


const startServer = ()=> {
    dotenv.config();
    
    myDataSource
    .initialize()
    logger.info(`DB initialized`);
    // app.get('/', (req, res) => {res.send('Hello World!')});

    app.use(express.json());
    app.use(cors());

    app.use(loggerMiddleware);
    app.use("/restaurants", restaurantRouter);
    app.use("/order", orderRouter);
    app.use("/delivery-mans", deliveryManRouter);
    app.use("/customers", customerRouter);
    app.use("/menus", menuRouter)

    app.use(errorHandler);
}