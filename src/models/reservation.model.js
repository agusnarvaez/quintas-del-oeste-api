//* Importo mongoose y el Schema para crear el modelo de datos
import mongoose, { Schema } from "mongoose"
import User from "./user.model.js"
import Lot from "./lots.model.js"

//* Creo el modelo de datos de reserva
const reservationSchema = new Schema({
    dni: {type: String, required: true, trim:true},
    phone: {type: String, required: true},
    documentFile: {type: String, required: true,unique:true},
    idConfirmationFile: {type: String, required: true},
    paymentConfirmation: {type: String},
    lotId: {type: Schema.Types.ObjectId, ref: 'Lot', required: true},
    userId: {type: Schema.Types.ObjectId, ref: User, required: true}
},{
    timestamps: true //* Crea la fecha de creación y actualización
})

export default mongoose.model('Reservation',reservationSchema)
