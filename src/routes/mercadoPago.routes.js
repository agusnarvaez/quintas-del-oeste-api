import express from "express"
const router = express.Router()

//* Middlewares de validación
import {preferenceIdValidation,validatePayment} from "../middlewares/mercadoPagoValidations.js"

//* Controllers
import mercadoPagoController from "../controllers/mercadoPagoController.js"

//************************************************************************
//* Rutas
router.post('/create-order',mercadoPagoController.createOrder) //* Procesa el pago y devuelve el link de mercado pago

router.post('/feedback',preferenceIdValidation,validatePayment,mercadoPagoController.feedback) //* Chequea el estado del pago

export default router