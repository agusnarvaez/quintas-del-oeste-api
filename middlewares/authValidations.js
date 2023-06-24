import { check,validationResult } from "express-validator"
import { getUserByEmail } from "../utils/userUtils.js"

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

const validateResult = (req,res,next) => {
    try{
        validationResult(req).throw()
        next()
    }catch(err){
        res.status(400).json({errors: err.array()})
    }
}

export {validateRegister}