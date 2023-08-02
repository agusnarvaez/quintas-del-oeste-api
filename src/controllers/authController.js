//* Importo axios para hacer las peticiones a la API de usuarios
import axios from 'axios'

//* Importo bcrypt para encriptar la contraseña
import bcrypt from 'bcryptjs'

//* Importo el modelo de usuario
import User from '../models/user.model.js'

//* Importo la funcion para crear y de verificar el token de acceso
import {createAccessToken,verifyAccessToken} from '../utils/jwt.js'

const controller = {

    register: async (req, res) => {
      //* Obtengo los datos del body
      const { name,lastName,email,password,admin } = req.body

      try {
        //* Creo el usuario en la base de datos
        const response = await axios.post('http://localhost:3030/api/user/create', req.body)

        //* Creo el token de acceso (JWT) y lo guardo en una cookie
        const token = await createAccessToken({id:response.data.user._id})
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
        if(!isMatch) return res.status(400).json({errors:[{msg:"Usuario o contraseña inválidos!"}]})

        //* Creo el token de acceso (JWT) y lo guardo en una cookie
        const token = await createAccessToken({_id:userFound._id})
        res.cookie('token',token)

        //* Devuelvo el usuario logueado
        res.json({
          status:"User logged",
          user:{
            _id: userFound._id,
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
        console.log(error.response.data)
        res.status(500).json({errors:error.response.data.errors})
      }
    },
    logout: async (req, res) => {
      //* Borro la cookie del token
      res.cookie('token','',{expires:new Date(0)})

      //* Devuelvo un mensaje de que se deslogueo correctamente
      return res.status(200).json({message:"Logged out"})
    },
    profile: async (req, res) => {

      //* Busco el usuario en la base de datos
      const userFound = await User.findById(req.user._id)
      //* Si no existe el usuario devuelvo un error
      if(!userFound) return res.status(400).json({message:"Usuario no encontrado!"})

      //* Devuelvo el usuario logueado
      return res.status(200).json({
        _id: userFound._id,
        name: userFound.name,
        lastName: userFound.lastName,
        email: userFound.email,
        admin: userFound.admin,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
      })
    },
    verify: async (req, res) => {
      //* Obtengo el token de la cookie
      const {token}=req.cookies

      //* Si no hay token devuelvo un error
      if(!token) return res.status(401).json({message:"No autorizado!"})

      //* Verifico el token
      verifyAccessToken(
        token,
        async (err,user)=>{
          //* Si hay un error devuelvo un error
          if(err) return res.status(401).json({message:"No autorizado!"})

          //* Busco el usuario en la base de datos
          const userFound = await User.findById(user._id)

          //* Si no existe el usuario devuelvo un error
          if(!userFound) return res.status(401).json({message:"Usuario no encontrado!"})

          return res.status(200).json({
            _id: userFound._id,
            name: userFound.name,
            lastName:userFound.lastName,
            email: userFound.email
          })
        }
        )
    }
}

export default controller