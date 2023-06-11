import  User  from '../models/users.js'
import { getAllUsers } from '../utils/usersUtils.js'
const controller = {
    index: async (req, res) => {
        const users = await getAllUsers()
        res.json({users})
    },
    create: async (req, res) => {
        const { name,lastName,email,password } = req.body
        const user = new User({ name,lastName,email,password })

        await user.save()

        res.json({status:"User saved"})
    },
    read: async (req, res) => {
        const user = await User.findById(req.params.id)

        res.json({
            status:"User read",
            user:user
        })
    },
    update: async (req, res) => {
        const { name,lastName,email,password } = req.body
        const userUpdated = { name,lastName,email,password }

        await User.findByIdAndUpdate(req.params.id, userUpdated)

        res.json({status:"User updated"})
    },
    delete: async (req, res) => {
        await User.findByIdAndDelete(req.params.id)

        res.json({status:"User deleted"})
    }
}

export default controller