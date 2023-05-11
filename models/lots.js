import mongoose, { Schema } from "mongoose"


const lotsSchema = new Schema({
    number: {type: Number, required: true, unique: true},
    area: {type: Number, required: true},
    price: {type: Number, required: true,min:100},
    reservationPercentage: {type: Number, required: true, min:0,max:100},
    financiation: {type: Boolean, required: true, default: false},
    coordinates: {lat:Number, lng: Number},
    perimeter:{x1:Number,x2:Number,y1:Number,y2:Number}
})
export default mongoose.model('Lot',lotsSchema)
