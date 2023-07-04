//* Importo mongoose y el Schema para crear el modelo de datos
import mongoose, { Schema } from "mongoose"
import User from "./user.model.js"
//* Schema de los lotes
const lotSchema = new Schema({
    number: {type: Number, required: true},
    block: {type: Number, required: true},
    area: {type: Number, required: true},
    price: {type: Number, required: true,min:10000},
    reservationPercentage: {type: Number, required: true, min:0,max:100},
    financiation: {type: Boolean, required: true, default: false},
    coordinates: {
        lat: {type: Number, default:0},
        lng: {type: Number, default:0}
    },
    perimeter:{
        x1:{lat: {type: Number, default:0}, lng: {type: Number, default:0}},
        x2:{lat: {type: Number, default:0}, lng: {type: Number, default:0}},
        y1:{lat: {type: Number, default:0}, lng: {type: Number, default:0}},
        y2:{lat: {type: Number, default:0}, lng: {type: Number, default:0}}
    },
    reservationUser: {type: String, default: null}
},{
    timestamps: true //* Crea la fecha de creación y actualización
})
export default mongoose.model('Lot',lotSchema)
