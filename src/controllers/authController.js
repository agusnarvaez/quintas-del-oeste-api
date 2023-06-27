//* Importo axios para hacer las peticiones a la API de usuarios
import axios from 'axios'

//* Importo bcrypt para encriptar la contraseña
import bcrypt from 'bcryptjs'

//* Importo el modelo de usuario
import User from '../models/user.model.js'

//* Importo la funcion para crear el token de acceso
import {createAccessToken} from '../utils/jwt.js'

const controller = {

    register: async (req, res) => {
      //* Obtengo los datos del body
      const { name,lastName,email,password,admin } = req.body

      try {
        //* Creo el usuario en la base de datos
        const response = await axios.post('http://localhost:3030/api/user/create', req.body)

        //* Creo el token de acceso (JWT) y lo guardo en una cookie
        const token = await createAccessToken({id:response.data.user.id})
        res.cookie('token',token)

        //* Devuelvo el usuario creado
        res.json(response.data)
      } catch (error) {
        //* Si hay errores los devuelvo
        res.status(500).json({errors:error.response.data.errors})
      }
    },
    login: async (req, res) => {
      //* Obtengo los datos del body
      const { email,password } = req.body

      try {
        //* Busco el usuario en la base de datos
        const userFound = await (await axios.post('http://localhost:3030/api/user/get', {email:email})).data

        //* Si no existe el usuario devuelvo un error
        const isMatch = await bcrypt.compare(password,userFound.password)
        if(!isMatch) return res.status(400).json({message:"Usuario o contraseña incorrectos!"})

        //* Creo el token de acceso (JWT) y lo guardo en una cookie
        const token = await createAccessToken({_id:userFound._id})
        res.cookie('token',token)

        //* Devuelvo el usuario logueado
        res.json({
          status:"User logged",
          user:{
            id: userFound._id,
            name: userFound.name,
            lastName: userFound.lastName,
            email: userFound.email,
            admin: userFound.admin,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
          }
        })
      } catch (error) {
        //* Si hay errores los devuelvo
        res.status(400).json({message:"Usuario o contraseña incorrectos!"})
      }
    },
    logout: async (req, res) => {
      //* Borro la cookie del token
      res.cookie('token','',{expires:new Date(0)})

      //* Devuelvo un mensaje de que se deslogueo correctamente
      return res.status(200).json({message:"Logged out"})
    },
    profile: async (req, res) => {

      console.log(req.user)
      //* Busco el usuario en la base de datos
      const userFound = await User.findById(req.user._id)
      //* Si no existe el usuario devuelvo un error
      if(!userFound) return res.status(400).json({message:"Usuario no encontrado!"})

      //* Devuelvo el usuario logueado
      return res.status(200).json({
        id: userFound._id,
        name: userFound.name,
        lastName: userFound.lastName,
        email: userFound.email,
        admin: userFound.admin,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
      })
    }
}

export default controller