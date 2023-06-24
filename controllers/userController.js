import  User  from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { getAllUsers } from '../utils/userUtils.js'
const controller = {
    index: async (req, res) => {
        const users = await getAllUsers()
        res.json({users})
    },
    create: async (req, res) => {
        //
        const { name,lastName,email,password,admin } = req.body

        try{
            // Encripto la contraseña
            const passHashed = await bcrypt.hash(password,10)

            // Creo el usuario
            const newUser = new User({
                name,
                lastName,
                email,
                password:passHashed,
                admin
            })

            // Guardo el usuario
            const userSaved = await newUser.save()

            // Devuelvo el usuario guardado
            res.json({
                status:"User saved",
                user:{
                    id: userSaved._id,
                    name: userSaved.name,
                    lastName: userSaved.lastName,
                    email: userSaved.email,
                    admin: userSaved.admin,
                    createdAt: userSaved.createdAt,
                    updatedAt: userSaved.updatedAt
            }})

        }catch(err){
            console.log(err)
        }

    },
    read: async (req, res) => {
        const user = await User.findById(req.params.id)

        res.json({
            status:"User read",
            user:user
        })
    },
    getByEmail: async (req, res) => {
        console.log(req.body)
        const userFound = await User.findOne({email:req.body.email})
        if(!userFound) return res.status(400).json({message:"Usuario o contraseña inválidos!"})

        res.send(userFound)
        /* res.json({
            status:"User read",
            user:user
        }) */
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