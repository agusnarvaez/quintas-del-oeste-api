import  User  from '../models/user.model.js'

//* Obtener todos los usuarios
const getAllUsers = async () => {
    try {
      const users = await User.find().exec()
      return users
    } catch (e) {
      //* Si hay errores los devuelvo
      console.error(e)
    }
}

//* Obtener un usuario por ID
const getUserById = async (req,res,next) => {
    try {
      //* Busco el usuario en la base de datos
      const user = await User.findById(req.params.id)
      return user

    } catch (e) {
      //* Si hay errores los devuelvo
      return res.status(400).json({message:"Usuario no encontrado!"})
    }
}

//* Obtener un usuario por email
const getUserByEmail = async (email) => {
  try {
    //* Busco el usuario en la base de datos
    const user = await User.find({email: email})
    return user
  }catch(e){
    //* Si hay errores los devuelvo
    console.error(e)
  }
}

//* Exporto las funciones
export {getAllUsers, getUserById,getUserByEmail}
