//* Importo mp para procesar el pago
import mp from "../utils/mercadoPago.js"

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
    }
}

export default controller