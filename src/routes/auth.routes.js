import express from "express"
const router = express.Router()

//* Middlewares
import {validateRegister,authRequired} from "../middlewares/authValidations.js"

//* Controllers
import authController from "../controllers/authController.js"

//************************************************************************
//* Rutas
router.post('/register',validateRegister,authController.register) //* Ruta para registar un usuario

router.post('/login',authController.login) //* Ruta para loguear un usuario

router.post('/logout',authRequired,authController.logout) //* Ruta para desloguear un usuario

router.get('/profile',authRequired,authController.profile) //* Ruta para obtener el perfil de un usuario

export default router