//* 1- Importar mercadopago
import mercadopago from "mercadopago"
//* 2- Importar credenciales
import credentials from "../../credentials.js"

//* 3- Obtener el server desde las variables de entorno
let server = process.env.SERVER || 'http://localhost:3000'

//* 4- Obtener la url de feedback
const feedback = `${server}/pago-realizado`

//* 5- Crear la función mp que recibe un item, cuotas y shipping
const mp = async (item,cuotes,shipping) => {
    try {
        //* 6- Configurar mercadopago con el access_token
        mercadopago.configure({
            access_token: credentials.mercadoPagoTest.acessToken
        })
        //* 7- Crear la configuración de la preferencia
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
            statement_descriptor: "Reserva Quintas",
            /* notification_url:'https://a4ce-181-228-107-242.sa.ngrok.io/api/mercadoPago/webhook' */
        }

        //* 8- Crear la preferencia para obtener el link de pago
        let preference = await mercadopago.preferences.create(config)
        /* .then(response => {
            console.log(response)
            return response.body.id}) */
        return preference
    }catch(error) {
        console.log(error)
    }
}
export default mp