import mp from "../utils/mercadoPago.js"
const controller = {
    feedback: (req, res) => {
        res.send(req.query)
    },
    proccess: async (req, res) => {
        try{
            let item = req.body.lot
            Object({...item,currency_id:"ARS",unit_price:item.unit_price,quantity:1})

            let link = await(mp([item]))
            link = link.response.init_point
            return res.json(link)

        }catch(error){
            return res.send(error)
        }
    }
}

export default controller