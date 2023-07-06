import express from "express"
const router = express.Router()

//* Controllers
import mercadoPagoController from "../controllers/mercadoPagoController.js"

//************************************************************************
//* Rutas
router.post('/create-order',mercadoPagoController.createOrder) //* Procesa el pago y devuelve el link de mercado pago

export default router