import * as express from "express";
import { getAllDeliveryManHandler } from "../controllers/deliveryMan.controller";

const router: express.Router = express.Router();

router.route("").get(getAllDeliveryManHandler);

export default router;