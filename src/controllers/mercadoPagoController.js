//* Importo mp para procesar el pago
import mp from "../utils/mercadoPago.js"
import cache from 'memory-cache'
const controller = {
    feedback: (req, res) => {
        //* Envía la respuesta de mercado pago a la vista
        res.send(req.query)
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
            cache.put('reservation', reservation)

            const result = await mp([
                {
                    title: `Reserva de lote ${reservation.lot.number} Manzana ${reservation.lot.block}`,
                    unit_price: Number(reservation.lot.reservationPrice),
                    currency_id: 'ARS',
                    quantity: 1,
                }
            ])

            const init_point = result.response.init_point
            res.status(200).json({status:"Pago Creado",/* id:result, */ initPoint: init_point})
        }catch(error){
            console.log(error)
        }
    }
}

export default controller