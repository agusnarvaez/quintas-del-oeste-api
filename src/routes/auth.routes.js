import express from "express"
const router = express.Router()

//* Middlewares
import {validateRegister,authRequired} from "../middlewares/authValidations.js"

//* Controllers
import authController from "../controllers/authController.js"

//************************************************************************

router.post('/register',validateRegister,authController.register)

router.post('/login',authController.login)

router.post('/logout',authController.logout)

router.get('/profile',authRequired,authController.profile)

export default router