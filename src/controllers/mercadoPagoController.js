//* Importo mp para procesar el pago
import mp from "../utils/mercadoPago.js"
import cache from 'memory-cache'
import {createAccessToken} from '../utils/jwt.js'
const controller = {
    feedback: async (req, res) => {
        try{
            //* Envía la respuesta de mercado pago a la vista
            const response = {
                payment: {
                    status:req.payment_status,
                    payment_id:req.payment_id,
                },
                reservation: req.reservationData
            }

            //* Devuelve los datos de la respuesta
            return res.status(200).json({ response })

        }catch(error){
            console.log(error)
            res.status(500).json({error})
        }
    },
    proccess: async (req, res) => {
        try{
            //* Procesa el pago y devuelve el link de mercado pago
            let item = req.body.lot
            //* Agrega los datos necesarios para procesar el pago
            Object({...item,currency_id:"ARS",unit_price:item.unit_price,quantity:1})

            //* Procesa el pago
            let link = await(mp([item]))

            //* Devuelve el link de mercado pago
            link = link.response.init_point

            return res.json(link)

        }catch(error){
            return res.send(error)
        }
    },
    createOrder: async (req, res) => {
        try{
            const reservation = req.body
            await cache.put('reservation', reservation, 300000)



            const result = await mp([
                {
                    title: `Reserva de lote ${reservation.lot.number} Manzana ${reservation.lot.block}`,
                    unit_price: 10000,
                    currency_id: 'ARS',
                    quantity: 1,
                }
            ])
            //* Crea el token del ID de las preferencias y lo guarda en una cookie
            const preferenceIdToken = await createAccessToken({preference_id:result.response.id})
            res.cookie('preferenceIdToken',preferenceIdToken)

            const init_point = result.response.init_point
            res.status(200).json({status:"Pago Creado",/* id:result, */ initPoint: init_point})
        }catch(error){
            console.log(error)
        }
    }
}

export default controller