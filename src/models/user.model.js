//* Importo mongoose y el Schema para crear el modelo de datos
import mongoose, { Schema } from "mongoose"

//* Creo el modelo de datos de usuario
const userSchema = new Schema({
    name: {type: String, required: true, trim:true},
    lastName: {type: String, required: true},
    email: {type: String, required: true,unique:true},
    password: {type: String, required: true},
    admin: {type: Boolean, default: false},
},{
    timestamps: true //* Crea la fecha de creación y actualización
})

export default mongoose.model('User',userSchema)
