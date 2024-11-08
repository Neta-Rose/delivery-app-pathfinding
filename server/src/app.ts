  import express from "express";
  import { myDataSource } from "./connection/data-source";
  import { errorHandler } from "./middleware/errorHandler.middleware";
  import logger from "./logger/logger";
  import restaurantRouter from "./routes/restaurant.router";
  import orderRouter from "./routes/order.router";
  import deliveryManRouter from "./routes/deliveryMan.router";
  import customerRouter from "./routes/customer.router";
  import menuRouter from "./routes/menu.router";
  import { loggerMiddleware } from "./middleware/logger.middleware";
  import cors from 'cors';

  myDataSource
    .initialize()
    .then(async () => {
      logger.info(`DB initialized`);
      const app: express.Express = express();

      app.use(express.json());
      app.use(cors());

      app.use(loggerMiddleware);
      app.use("/restaurants", restaurantRouter);
      app.use("/order", orderRouter);
      app.use("/delivery-mans", deliveryManRouter);
      app.use("/customers", customerRouter);
      app.use("/menus", menuRouter)

      app.use(errorHandler);

      const port = 3030;
      app.listen(port, () => {
        logger.info(`Server started on port: ${port}`);
      });
    })
    .catch((error) => {
      console.log(error);
      logger.error(error)
    });
