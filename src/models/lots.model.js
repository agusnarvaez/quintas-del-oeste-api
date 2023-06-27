//* Importo mongoose y el Schema para crear el modelo de datos
import mongoose, { Schema } from "mongoose"

//* Schema de los lotes
const lotSchema = new Schema({
    number: {type: Number, required: true, unique: true},
    area: {type: Number, required: true},
    price: {type: Number, required: true,min:100},
    reservationPercentage: {type: Number, required: true, min:0,max:100},
    financiation: {type: Boolean, required: true, default: false},
    coordinates: {lat:{type:Number, default:0}, lng: {type:Number, default:0}},
    perimeter:{x1:{type:Number, default:0},x2:{type:Number, default:0},y1:{type:Number, default:0},y2:{type:Number, default:0}}
},{
    timestamps: true //* Crea la fecha de creación y actualización
})
export default mongoose.model('Lot',lotSchema)
