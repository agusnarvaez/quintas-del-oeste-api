import { check,validationResult } from "express-validator"
import { getUserByEmail } from "../utils/userUtils.js"
import jwt from "jsonwebtoken"
import credentials from "../../credentials.js"
const validateRegister = [
    check('email')
        .custom(async (value,{req}) => {
            const user = await getUserByEmail(value)
            if(user.length > 0){
                throw new Error("El email ya se encuentra registrado!")
            }
            return true
        }),
    (req,res,next) => validateResult(req, res, next)
]

const authRequired = (req,res,next) => {
    const token = req.cookies.token

    if(!token) return res.status(401).json({message:"Autorización denegada!"})

    jwt.verify(token,credentials.jwtSecret , (err,user) => {
        if(err) return res.status(403).json({message:"Token inválido!"})

        req.user = user

        next()
    })
}

const validateApiKey = (req,res,next) => {

    next()
}

const validateResult = (req,res,next) => {
    try{
        validationResult(req).throw()
        next()
    }catch(err){
        res.status(400).json({errors: err.array()})
    }
}

export {validateRegister,authRequired}