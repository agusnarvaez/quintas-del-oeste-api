//* Aquí se validan los datos de los usuarios y se verifica que estén autorizados para acceder a ciertas rutas
import { check,validationResult } from "express-validator"
import { getUserByEmail } from "../utils/userUtils.js"
import jwt from "jsonwebtoken"
import credentials from "../../credentials.js"
const validateRegister = [
    check('email')
        .custom(async (value,{req}) => {
            //* Verifica que el email no esté registrado
            const user = await getUserByEmail(value)
            if(user.length > 0){
                throw new Error("El email ya se encuentra registrado!")
            }
            return true
        }),
    (req,res,next) => validateResult(req, res, next)
]

//* Verifica que el usuario esté autenticado
const authRequired = (req,res,next) => {
    //* Obtiene el token de la cookie
    const token = req.cookies.token
    //* Si no hay token, no está autorizado y se envía un error
    if(!token) return res.status(401).json({message:"Autorización denegada!"})

    //* Si hay token, se verifica que sea válido
    jwt.verify(token,credentials.jwtSecret , (err,user) => {
        //* Si no es válido, no está autorizado y se envía un error
        if(err) return res.status(403).json({message:"Token inválido!"})

        //* Si es válido, se guarda el usuario en req.user y se pasa al siguiente middleware
        req.user = user
        next()
    })
}

//* Verifica que se envíe una API Key válida
const validateApiKey = (req,res,next) => {

    next()
}

//* Verifica que los datos enviados en el body sean válidos
const validateResult = (req,res,next) => {
    try{
        validationResult(req).throw()
        next()
    }catch(err){
        res.status(400).json({errors: err.array()})
    }
}

export {validateRegister,authRequired}