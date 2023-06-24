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
      const lot = await User.findById(req.params.id)
      return lot
    } catch (e) {
      //console.error(e)
      return false
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
