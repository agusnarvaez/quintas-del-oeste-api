import  Lot  from '../models/lots.model.js'
import  User  from '../models/user.model.js'
import Reservation from '../models/reservation.model.js'
import {createUser} from '../utils/userUtils.js'
import { getAllLots,getLotById } from '../utils/lotsUtils.js'
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
        const { number, block, area, price, reservationPercentage, financiation, coordinates,perimeter } = req.body
        const lot = new Lot({ number, block, area, price, reservationPercentage, financiation, coordinates })
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
        const { area, price, reservationPercentage, financiation, coordinates, perimeter } = req.body
        const newLot = { area, price, reservationPercentage, financiation, coordinates,perimeter }
        try{
            const updatedLot = await Lot.findByIdAndUpdate(req.params.id, newLot,{new:true})
            console.log(updatedLot)
            res.status(200).json({
                status:"Lote actualizado",
                lot:updatedLot
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
    },
    reserve: async (req, res) => {
        try{
            //* Guardo el usuario
            const userSaved = await createUser({
                name: req.body.reservation.user.name,
                lastName: req.body.reservation.user.lastName,
                email: req.body.reservation.user.email,
                admin: false,
                password: `Reserva-1234-${req.body.reservation.user.email}`
            })

            //* Creo la reserva
            const reservation = new Reservation({
                dni: req.body.reservation.dni,
                phone: req.body.reservation.phone,
                documentFile: req.body.reservation.documentFile,
                idConfirmationFile: req.body.reservation.idConfirmationFile,
                paymentId: req.body.payment.payment_id,
                lotId: req.body.reservation.lot._id,
                userId: userSaved._id
            })
            await reservation.save()

            //* Actualizo el lote
            await Lot.updateOne({_id:reservation.lotId},{reservation:reservation._id})
            const lot = await Lot.findById(reservation.lotId)

            res.status(200).json({
                status:"Lote Reservado",
                reservation_id:reservation._id,
                userEmail:userSaved.email,
                userName:userSaved.name,
                lot:lot,
                payment_status: req.body.payment.status
            })
        }catch(error){
            console.log(error)
        }
    },
    reservations: async (req, res) => {
        try{
            const reservations = await Reservation.find().exec()
            res.status(200).json({reservations})
        }catch(error){
            console.log(error)
            res.status(404).json({status:"Reservas no encontradas"})
        }
    },
    reservation: async (req, res) => {
        try{
            const reservation = await Reservation.findById(req.params.id).populate('userId', 'name lastName email').exec()
            res.status(200).json({reservation})
        }catch(error){
            res.status(404).json({status:"Reserva no encontrada"})
        }
    }
}

export default controller