//* Importo el modelo de datos de usuario
import  User  from '../models/user.model.js'
//* Importo bcrypt para encriptar la contraseña
import bcrypt from 'bcryptjs'

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

const createUser = async (user)=>{
  //* Encripto la contraseña
  try{
    const passHashed = await bcrypt.hash(user.password,10)

  //* Creo el usuario
  const newUser = new User({
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      password:passHashed,
      admin: user.admin
  })

  //* Guardo el usuario
    const userSaved = await newUser.save()

    return userSaved
  }catch(e){
    //* Si hay errores los dev
    console.error(e)
    return e
  }

}
//* Exporto las funciones
export {getAllUsers, getUserById,getUserByEmail,createUser}
