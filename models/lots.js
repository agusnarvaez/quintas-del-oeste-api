import mongoose, { Schema } from "mongoose"


const lotsSchema = new Schema({
    number: {type: Number, required: true},
    area: {type: Number, required: true},
    price: {type: Number, required: true},
    reservationPercentage: {type: Number, required: true},
    financiation: {type: Boolean, required: true},
    coordinates: {type: Object, required:false}
})
export default mongoose.model('Lot',lotsSchema)
