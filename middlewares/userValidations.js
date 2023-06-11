import { check,validationResult,param } from "express-validator"
import { getUserById } from "../utils/lotsUtils.js"

const validateCreate = [
    check("name")
        .exists().bail().withMessage("El campo del nombre no existe")
        .isString().bail().withMessage("El nombre debe ser un valor alfanumérico")
        .not().isEmpty().bail().withMessage("El nombre es requerido"),
    check('lastName')
        .exists().bail().withMessage("El campo del apellido no existe")
        .isString().bail().withMessage("El apellido debe ser un valor alfanumérico")
        .not().isEmpty().bail().withMessage("El apellido es requerido"),
    check('email')
        .exists().bail().withMessage("El campo del email no existe")
        .isString().bail().withMessage("El email debe ser un valor alfanumérico")
        .not().isEmpty().bail().withMessage("El email es requerido")
        .isEmail().bail().withMessage("El email debe ser un email válido"),
    check('password')
        .exists().bail().withMessage("El campo del email no existe")
        .isString().bail().withMessage("La contraseña debe ser un valor alfanumérico")
        .not().isEmpty().bail().withMessage("La contraseña es requerida"),
    (req,res,next) => validateResult(req, res, next)
]

const validateGetById = [
    param('id')
        .custom(async (value,{req}) => {
            const result = await getUserById(req)
            if(!result){
                throw new Error("El usuario no existe!")
            }
            return true
        }),
    (req,res,next) => validateResult(req, res, next)
]
const validateDelete = validateGetById

const validateUpdate = [
    validateGetById,
    check("name")
        .optional(true)
        .exists().bail().withMessage("El campo del nombre no existe")
        .isString().bail().withMessage("El nombre debe ser un valor alfanumérico"),
    check('lastName')
        .optional(true)
        .exists().bail().withMessage("El campo del apellido no existe")
        .isString().bail().withMessage("El apellido debe ser un valor alfanumérico"),
    check('email')
        .optional(true)
        .exists().bail().withMessage("El campo del email no existe")
        .isString().bail().withMessage("El email debe ser un valor alfanumérico")
        .not().isEmpty().bail().withMessage("El email es requerido"),
    check('password')
        .optional(true)
        .exists().bail().withMessage("El campo del email no existe")
        .isString().bail().withMessage("La contraseña debe ser un valor alfanumérico"),
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

export {validateCreate,validateUpdate,validateDelete,validateGetById}