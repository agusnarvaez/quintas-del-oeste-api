import { check,validationResult } from "express-validator"
import { getAllUsers } from "../utils/userUtils.js"

const validateRegister = [
    check('email')
        .custom(async (value,{req}) => {
            const users = await getAllUsers()
            if(users.some(user => user.email === value)){
                throw new Error("El email ya se encuentra registrado!")
            }
            return true
        }),
    (req,res,next) => validateResult(req, res, next)
]

const validateResult = (req,res,next) => {
    try{
        validationResult(req).throw()
        next()
    }catch(err){
        res.status(400).json({errors: err.array()})
    }
}

export {validateRegister}