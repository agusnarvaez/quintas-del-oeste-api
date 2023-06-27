import express from "express"
const router = express.Router()

//* Controllers
import mercadoPagoController from "../controllers/mercadoPagoController.js"

//************************************************************************
//* Rutas

router.get('/feedback',mercadoPagoController.feedback) //* Envía la respuesta de mercado pago a la vista

router.post('/proccess',mercadoPagoController.proccess) //* Procesa el pago y devuelve el link de mercado pago

export default router