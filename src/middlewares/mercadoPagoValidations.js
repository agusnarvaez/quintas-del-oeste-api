//* Aquí se validan los datos de los usuarios y se verifica que estén autorizados para acceder a ciertas rutas
import { validationResult } from "express-validator"

import {verifyAccessToken} from '../utils/jwt.js'
import cache from 'memory-cache'
import credentials from "../../credentials.js"
import mercadopago from "mercadopago"
import {checkDateOfPayment} from '../utils/dateUtils.js'


//* Verifica que el usuario esté autenticado
const preferenceIdValidation = async (req,res,next) => {
    //* Obtiene el token de la cookie
    const preferenceIdOnBody = req.body.preference_id

    //* Obtiene el token de la cookie
    const {preferenceIdToken}=req.cookies

    //* Verifico el token
    verifyAccessToken(
        preferenceIdToken,
        async (err,preference_id)=>{
          //* Si hay un error devuelvo un error
          if(err) return res.status(401).json({message:"Autorización denegada!"})

          //* Si no hay token o no coincide con el token de la cookie devuelvo un error
          if((!preference_id || !preferenceIdOnBody)
            && (preferenceIdOnBody !== preference_id))
                return res.status(401).json({message:"Autorización denegada!"})

        //* Si no hay errores borro el token de la cookie y continúo con la ejecución
        res.cookie('preferenceIdToken','',{expires:new Date(0)})

        }
    )
    next()
}

//* Verifica que se envíe una API Key válida
const validatePayment = async (req,res,next) => {
    try{
        const payment = await mercadopago.payment.findById(req.body.payment_id)
        const reservationData = await cache.get('reservation')

        //* Verifica que el pago exista
        if(!payment) return res.status(400).json({message:"Autorización denegada"})

        //* Verifica que el pago esté aprobado
        if(payment.body.status !== 'approved'&& payment.body.status !== 'pending' && payment.body.status!=='in_process') return res.status(400).json({
            message:"Pago no aprobado",
            payment: { status:payment.body.status}
        })

        //* Verificaciones del pago
        const checks =[
            payment.body.currency_id === 'ARS',
            payment.body.transaction_amount === 10000,
            payment.body.description === `Reserva de lote ${reservationData.lot.number} Manzana ${reservationData.lot.block}`,
            payment.body.order.id === req.body.merchant_order_id,
            checkDateOfPayment(payment.body.date_created)
        ]
        //* Verifica que los datos del pago sean correctos
        if(!checks.every(check => check)) return res.status(400).json({message:"Autorización denegada"})

        //* Agrega los datos del pago a la request
        req.payment_id = req.body.payment_id
        req.payment_status = payment.body.status
        req.reservationData = reservationData

        //* Limpia la cache de la reserva
        cache.clear()

        next()

    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }

}

//* Verifica que los datos enviados en el body sean válidos
const validateResult = (req,res,next) => {
    try{
        validationResult(req).throw()
        next()
    }catch(err){
        res.status(400).json({errors: err.array()})
    }
}

export {validatePayment,preferenceIdValidation}