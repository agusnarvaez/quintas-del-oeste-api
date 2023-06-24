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


export {getAllUsers, getUserById}
