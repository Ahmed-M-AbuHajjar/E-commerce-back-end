// Importing necessary modules and creating a new router object
import { Router } from "express";
const router = Router();
// Importing the car controller functions
import * as carController from './controller/carController.js'
import {HME, myMulter, validationTypes} from '../../services/multer.js'

// Defining various routes and their respective controller functions
router.post('/add', myMulter(validationTypes.image).single('image'), HME,carController.addCar);
router.get('/',carController.getHomePageCars);
router.get('/search',carController.searchCars)
router.get("/:id", carController.getCar);
router.patch('/images/:id', myMulter(validationTypes.image).array('image',10), HME, carController.addCarPics);
router.patch('/update/:id',carController.updateCar);
router.delete('/delete/:carId',carController.deleteCar);
// Exporting the router object for use in other modules
export default router