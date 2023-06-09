import  User  from '../models/user.model.js'

//* Getters
const getAllUsers = async () => {
    try {
      const lots = await User.find().exec()
      return lots
    } catch (e) {
      console.error(e)
    }
}
const getUserById = async (req,res,next) => {
    try {

      const user = await User.findById(req.params.id)

      return user
    } catch (e) {
      //console.error(e)
      return res.status(400).json({message:"Usuario no encontrado!"})
    }
}

const getUserByEmail = async (email) => {
  try {
    const user = await User.find({email: email})
    return user
  }catch(e){
    console.error(e)
  }
}

export {getAllUsers, getUserById,getUserByEmail}
