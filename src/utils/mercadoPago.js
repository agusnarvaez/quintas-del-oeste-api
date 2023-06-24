import mercadopago from "mercadopago"
import credentials from "../../credentials.js"

let server = process.env.SERVER || 'http://localhost:3030'

const feedback = `${server}/api/mercadoPago/feedback`

const mp = async (item,cuotes,shipping) => {
    try {
        mercadopago.configure({
            access_token: credentials.mercadoPago
        })
        let config = {
            items: item,
            back_urls: {
                success:feedback,
                failure:feedback,
                pending:feedback
            },
            /* payment_methods:{
                installment: cuotes
            }, */
            auto_return: "approved",
            /* shipments:{
                cost: shipping,
                mode: "not_specified"
            }, */
            statement_descriptor: "Reserva Quintas"
        }
        let preference = await mercadopago.preferences.create(config)
        return preference

    }catch(error) {
        console.log(error)
    }
}
export default mp