import * as express from "express";
import { getAllCustomersHandler, getCustomerByIdHandler } from "../controllers/customer.controller";

const router: express.Router = express.Router();

router.route("").get(getAllCustomersHandler);
router.route("/:customerId").get(getCustomerByIdHandler);

export default router;