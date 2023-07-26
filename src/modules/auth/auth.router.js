// Importing necessary modules and creating a new router object
import { Router } from "express";
const router = Router()
// Importing the registration controller functions
import * as registerController from './controller/registration.js'
// Defining various routes and their respective controller functions
router.post('/signup',registerController.signUp)
router.post("/signin", registerController.signIn);
router.get("/confirmEmail/:token", registerController.confirmEmail);
router.get("/refreshToken/:token", registerController.refreshToken)
router.post("/sendCode", registerController.sendCode)
router.post("/forgetPassword", registerController.forgetPassword);


// Exporting the router object for use in other modules
export default router