// Importing necessary modules and creating a new router object
import { Router } from "express";
// Importing the cart controller functions
import * as cartController from './controller/cart.controller.js'
const router = Router();

// Defining various routes and their respective controller functions
router.post('/',cartController.createCart)
router.get('/:userId',cartController.getCart)
router.delete('/delete/:id',cartController.deleteCart)
// Exporting the router object for use in other modules
export default router