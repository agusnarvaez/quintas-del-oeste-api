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
const getUserById = async (id) => {
    try {
      //* Busco el usuario en la base de datos
      const user = await User.findById(id)
      return user

    } catch (e) {
      //* Si hay errores los devuelvo
      return e
    }
}

//* Obtener un usuario por email
const getUserByEmail = async (email) => {
  try {
    //* Busco el usuario en la base de datos
    return await User.findOne({email: email})
  }catch(e){
    //* Si hay errores los devuelvo
    console.error(e)
  }
}
const createUser = async (user)=>{
  //* Encripto la contraseña
  try{
    const existentUser = await getUserByEmail(user.email)
    if(existentUser) return existentUser

      //* Si el usuario no existe, lo creo
      const passHashed = await bcrypt.hash(user.password,10) //* Encripto la contraseña

      const newUser = new User({
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        password:passHashed,
        admin: user.admin
      })
      const userSaved = await newUser.save() //* Guardo el usuario
      return userSaved  //* Retorno el usuario

  }catch(e){
    //* Si hay errores los devuelvo
    console.error(e)
    return e
  }

}
//* Exporto las funciones
export {getAllUsers, getUserById,getUserByEmail,createUser}
