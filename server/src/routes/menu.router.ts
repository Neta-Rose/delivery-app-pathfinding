import * as express from "express";
import { getMenuByRestaurantIdHandler } from "../controllers/menu.controller";

const router: express.Router = express.Router();

router.route("/:restaurantId").get(getMenuByRestaurantIdHandler);

export default router;