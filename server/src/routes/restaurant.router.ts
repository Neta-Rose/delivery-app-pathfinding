import * as express from "express";
import { getAllRestaurantsHandler } from "../controllers/restaurant.controller";

const router: express.Router = express.Router();

router.route("").get(getAllRestaurantsHandler);

export default router;