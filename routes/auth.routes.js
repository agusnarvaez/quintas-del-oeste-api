import express from "express"
const router = express.Router()

//* Middlewares
import {validateRegister} from "../middlewares/authValidations.js"

//* Controllers
import authController from "../controllers/authController.js"

//************************************************************************

router.post('/register',validateRegister,authController.register)

router.post('/login',authController.login)

export default router