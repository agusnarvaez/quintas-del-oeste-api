//* Importo el modelo de datos de usuario
import  User  from '../models/user.model.js'
//* Importo bcrypt para encriptar la contraseña
import bcrypt from 'bcryptjs'

//* Importo la función para obtener todos los usuarios
import { getAllUsers } from '../utils/userUtils.js'

const controller = {
    index: async (req, res) => {
        const users = await getAllUsers()
        res.json({users})
    },
    create: async (req, res) => {
        //* Obtengo los datos del body
        const { name,lastName,email,password,admin } = req.body

        try{
            //* Encripto la contraseña
            const passHashed = await bcrypt.hash(password,10)

            //* Creo el usuario
            const newUser = new User({
                name,
                lastName,
                email,
                password:passHashed,
                admin
            })

            //* Guardo el usuario
            const userSaved = await newUser.save()

            //* Devuelvo el usuario guardado
            res.status(200).json({
                status:"User saved",
                user:{
                    _id: userSaved._id,
                    name: userSaved.name,
                    lastName: userSaved.lastName,
                    email: userSaved.email,
                    admin: userSaved.admin,
                    createdAt: userSaved.createdAt,
                    updatedAt: userSaved.updatedAt
            }})

        }catch(err){
            //* Si hay errores los devuelvo
            console.log(err)
            res.status(400).json({message:"Error al crear el usuario!"})
        }

    },
    read: async (req, res) => {
        //* Busco el usuario en la base de datos por ID
        const user = await User.findById(req.params.id)

        res.json({
            status:"User read",
            user:user
        })
    },
    getByEmail: async (req, res) => {
        //* Busco el usuario en la base de datos por email
        const userFound = await User.findOne({email:req.body.email})

        //* Si no existe el usuario devuelvo un error
        if(!userFound) return res.status(400).json({errors:[{msg:"Usuario o contraseña inválidos!"}]})

        //* Si existe el usuario devuelvo el usuario
        res.send(userFound)

    },
    update: async (req, res) => {
        //* Obtengo los datos del body y creo un objeto con los datos a actualizar
        const { name,lastName,email,password,newPassword } = req.body
        //* Armo el modelo de datos del usuario
        const userToUpdate = { name,lastName,email}
        //* Si hay contraseña y nueva contraseña encripto la nueva contraseña
        if(password && newPassword){
            const passHashed = await bcrypt.hash(newPassword,10)
            //* Agrego la nueva contraseña al objeto a actualizar
            userToUpdate.password = passHashed
        }

        try{
            //* Actualizo el usuario
            const user = await User.findByIdAndUpdate(req.params.id, userToUpdate,{new:true})
            if(!user) return res.status(400).json({message:"El usuario no existe!"})
            const userUpdated ={
                _id: user._id,
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                admin: user.admin
            }
            //* Devuelvo el usuario actualizado
            res.status(200).json({status:"User updated",user:userUpdated})
        }catch(err){
            //* Si hay errores los devuelvo
            res.status(400).json({message:"Error al actualizar el usuario!"})
        }
    },
    delete: async (req, res) => {
        try{
            //* Elimino el usuario de la base de datos
            await User.findByIdAndDelete(req.params.id)
            res.json({status:"User deleted"})
        }catch(err){
            //* Si hay errores los devuelvo
            res.status(400).json({message:"Error al eliminar el usuario!"})
        }
    }
}

export default controller