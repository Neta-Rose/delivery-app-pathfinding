import * as express from "express";
import { placeOrderHandler, getAllOrdersHandler } from "../controllers/order.controller";

const router: express.Router = express.Router();

router.route("/:algorithm").post(placeOrderHandler);
router.route("/history").get(getAllOrdersHandler);

export default router;