import  Lot  from '../models/lots.model.js'
import { getAllLots } from '../utils/lotsUtils.js'
const controller = {
    index: async (req, res) => {
        //* Obtiene todos los lotes
        const lots = await getAllLots()
        res.json({lots})
    },
    create: async (req, res) => {

        //* Crea un lote nuevo en la base de datos
        const { number, area, price, reservationPercentage, financiation, coordinates } = req.body
        const lot = new Lot({ number, area, price, reservationPercentage, financiation, coordinates })
        try{
            await lot.save()
            res.json({status:"Lote guaradado"})
        }catch(error){
            res.json({status:"Lote no guaradado!"})
        }

    },
    read: async (req, res) => {
        //* Obtiene un lote por ID
        try{
            const lot = await Lot.findById(req.params.id)
            res.json({
                status:"Lote encontrado",
                lot:lot
            })
        }catch(error){
            res.json({status:"Lote no encontrado"})
        }
    },
    update: async (req, res) => {
        //* Actualiza un lote por ID
        const { number, area, price, reservationPercentage, financiation, coordinates } = req.body
        const newLot = { number, area, price, reservationPercentage, financiation, coordinates }

        try{
            await Lot.findByIdAndUpdate(req.params.id, newLot)
            res.json({status:"Lote actualizado"})
        }catch(error){
            res.json({status:"Lote no actualizado"})
        }

    },
    delete: async (req, res) => {
        try{
            await Lot.findByIdAndDelete(req.params.id)
            res.json({status:"Lote eliminado"})
        }catch(error){
            res.json({status:"Lote no eliminado"})
        }
    }
}

export default controller