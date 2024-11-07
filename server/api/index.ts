import express, { Request, Response } from 'express';
import { myDataSource } from '../src/connection/data-source';
import { errorHandler } from '../src/middleware/errorHandler.middleware';
import logger from '../src/logger/logger';
import restaurantRouter from '../src/routes/restaurant.router';
import orderRouter from '../src/routes/order.router';
import deliveryManRouter from '../src/routes/deliveryMan.router';
import customerRouter from '../src/routes/customer.router';
import menuRouter from '../src/routes/menu.router';
import { loggerMiddleware } from '../src/middleware/logger.middleware';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3030;

app.use(express.json());
app.use(cors());
app.use(loggerMiddleware);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});

app.use('/restaurants', restaurantRouter);
app.use('/order', orderRouter);
app.use('/delivery-mans', deliveryManRouter);
app.use('/customers', customerRouter);
app.use('/menus', menuRouter);

app.use(errorHandler);

const initializeDb = async () => {
  if (!myDataSource.isInitialized) {
    try {
      await myDataSource.initialize();
      logger.info('Database connection established.');
    } catch (error) {
      logger.error('Error during Data Source initialization', error);
      throw error;
    }
  }
};

const startServer = async () => {
    await initializeDb();

    if(process.env.NODE_ENV === 'production') {
        app.listen(port, () => {
            logger.info(`Server started locally on port: ${port}`);
        });
    } else {
        app.listen(port, () => {
            logger.info(`Server started in production on port: ${port}`);
        })
    }
}

export default async (req: Request, res: Response) => {
  try {
    if(process.env.NODE_ENV === 'production') {
        await initializeDb();
    }
    app(req, res);
  } catch (error) {
    logger.error('Error in handler', error);
    res.status(500).send('Couldnt start default vercel function');
  }
};
