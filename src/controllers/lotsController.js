import  Lot  from '../models/lots.model.js'
import { getAllLots } from '../utils/lotsUtils.js'
const controller = {
    index: async (req, res) => {
        //* Obtiene todos los lotes
        try{
            const lots = await getAllLots()
            res.status(200).json({lots})
        }catch(error){
            res.status(404).json({status:"Lotes no encontrados"})
        }
    },
    create: async (req, res) => {
        //* Crea un lote nuevo en la base de datos
        const { number, area, price, reservationPercentage, financiation, coordinates,perimeter } = req.body
        const lot = new Lot({ number, area, price, reservationPercentage, financiation, coordinates,perimeter })
        try{
            const lotSaved = await lot.save()
            res.status(200).json({status:"Lote guaradado", lot:lotSaved})
        }catch(error){
            res.status(400).json({
                status:"Lote no guaradado!",
                error:error
            })
        }
    },
    read: async (req, res) => {
        //* Obtiene un lote por ID
        try{
            const lot = await Lot.findById(req.params.id)
            res.status(200).json({
                status:"Lote encontrado",
                lot:lot
            })
        }catch(error){
            res.status(404).json({status:"Lote no encontrado"})
        }
    },
    update: async (req, res) => {
        //* Actualiza un lote por ID
        const { number, area, price, reservationPercentage, financiation, coordinates, perimeter } = req.body
        const newLot = { number, area, price, reservationPercentage, financiation, coordinates,perimeter }
        try{
            await Lot.findByIdAndUpdate(req.params.id, newLot)
            res.status(200).json({
                status:"Lote actualizado",
                lot:newLot
            })
        }catch(error){
            res.status(400).json({status:"Lote no actualizado"})
        }
    },
    delete: async (req, res) => {
        try{
            await Lot.findByIdAndDelete(req.params.id)
            res.status(200).json({status:"Lote eliminado"})
        }catch(error){
            res.status(400).json({status:"Lote no eliminado"})
        }
    }
}

export default controller