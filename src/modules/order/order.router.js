// Importing necessary modules and creating a new router object
import { Router } from "express";
// Importing the order controller functions
import * as orderController from './controller/order.controller.js'
const router = Router()

// Defining various routes and their respective controller functions
router.post('/', orderController.createOrder);
router.get('/', orderController.getOrders);
router.delete('/:id', orderController.deleteOrder)
// Exporting the router object for use in other modules
export default router