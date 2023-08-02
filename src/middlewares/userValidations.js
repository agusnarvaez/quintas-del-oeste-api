import { check,validationResult,param } from "express-validator"
import { getUserById,getUserByEmail } from "../utils/userUtils.js"
//* Importo bcrypt para encriptar la contraseña
import bcrypt from 'bcryptjs'

const validateCreate = [
    check("name")
        .exists().bail().withMessage("El campo no existe")
        .isString().bail().withMessage("El nombre debe ser un valor alfanumérico")
        .not().isEmpty().bail().withMessage("El nombre es requerido"),
    check('lastName')
        .exists().bail().withMessage("El campo no existe")
        .isString().bail().withMessage("El apellido debe ser un valor alfanumérico")
        .not().isEmpty().bail().withMessage("El apellido es requerido"),
    check('email')
        .exists().bail().withMessage("El campo no existe")
        .isString().bail().withMessage("El email debe ser un valor alfanumérico")
        .not().isEmpty().bail().withMessage("El email es requerido")
        .isEmail().bail().withMessage("El email debe ser un email válido")
        .custom(async (value,{req}) => {
            //* Verifica que el email no esté registrado
            const user = await getUserByEmail(value)
            if(user.length > 0){
                throw new Error("El email ya se encuentra registrado!")
            }
            return true
        })
        ,
    check('password')
        .exists().bail().withMessage("El campo no existe")
        .isString().bail().withMessage("La contraseña debe ser un valor alfanumérico")
        .not().isEmpty().bail().withMessage("La contraseña es requerida")
        .isLength({min:8}).bail().withMessage("La contraseña debe tener al menos 8 caracteres")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
            .bail()
            .withMessage("La contraseña debe tener al menos una mayúscula, una minúscula y un número"),
    check('admin')
        .optional(true)
        .isBoolean().bail().withMessage("El campo admin debe ser un valor booleano"),
    (req,res,next) => validateResult(req, res, next)
]

const validateGetById = [
    param('id')
        .custom(async (value,{req}) => {
            //* Verifica que el usuario exista
            const result = await getUserById(req.params.id)
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
        .exists().bail().withMessage("El campo password no existe")
        .isString().bail().withMessage("La contraseña debe ser un valor alfanumérico")
        .custom(async (value,{req}) => {
            //* Verifica que la contraseña exista
            const result = await getUserById(req.params.id)
            if(!result){
                throw new Error("El usuario no existe!")
            }
            if(!bcrypt.compareSync(value,result.password)){
                throw new Error("La contraseña no es correcta!")
            }
            return true
        }),
    check('newPassword')
        .optional(true)
        .exists().bail().withMessage("El campo password no existe")
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