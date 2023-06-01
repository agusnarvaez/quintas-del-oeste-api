import express from "express"
const router = express.Router()

import mercadoPagoController from "../controllers/mercadoPagoController.js"

router.get('/feedback',mercadoPagoController.feedback)

router.post('/proccess',mercadoPagoController.proccess)

export default router