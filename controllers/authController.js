import axios from 'axios'

import bcrypt from 'bcryptjs'

import User from '../models/user.model.js'
import {createAccessToken} from '../utils/jwt.js'

const controller = {

    register: async (req, res) => {
      const { name,lastName,email,password,admin } = req.body

        try {
          const response = await axios.post('http://localhost:3030/api/user/create', req.body)

          const token = await createAccessToken({id:response.data.user.id})

          res.cookie('token',token)

          res.json(response.data)
        } catch (error) {
          console.log(error)
          res.status(500).send('Error al crear el usuario')
        }
    },
    login: async (req, res) => {

      const { email,password } = req.body

      try {
        const userFound = await (await axios.post('http://localhost:3030/api/user/get', {email:email})).data

        const isMatch = await bcrypt.compare(password,userFound.password)

        if(!isMatch) return res.status(400).json({message:"Usuario o contraseña incorrectos!"})

        const token = await createAccessToken({_id:userFound._id})

        res.cookie('token',token)

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
        console.log(error)
        res.status(400).json({message:"Usuario o contraseña incorrectos!"})
      }
    },
    logout: async (req, res) => {
      res.cookie('token','',{expires:new Date(0)})
      return res.status(200).json({message:"Logged out"})
    },
    profile: async (req, res) => {
      console.log(req.user)
      const userFound = await User.findById(req.user._id)

      if(!userFound) return res.status(400).json({message:"Usuario no encontrado!"})

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