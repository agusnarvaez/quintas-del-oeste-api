import { check,validationResult,param } from "express-validator"
import { getLotByNumber,getLotById } from "../utils/lotsUtils.js"

const validateCreate = [
    check("number")
        .exists().bail().withMessage("El campo no existe!")
        .not().isEmpty().bail().withMessage("El número de lote es requerido")
        .isNumeric().bail().withMessage("El número de lote debe ser un valor numérico")
        .custom((value,{req}) => {
            if(value < 1){
                //* Si el número de lote es menor a 1, devuelve un error
                throw new Error("El número de lote debe ser mayor a 0")
            }
            return true
        })
        .custom(async (value,{req}) => {
            //* Verifica que el número de lote no esté registrado
            const result = await getLotByNumber(value)
            if(result){
                throw new Error("El número de lote ya existe!")
            }
            return true
        }),
    check('area')
        .exists().bail().withMessage("El campo no existe!")
        .not().isEmpty().bail().withMessage("El área del lote es requerido")
        .isNumeric().bail().withMessage("El área del lote debe ser un valor numérico")
        .custom((value,{req}) => {
            if(value < 100){
                //* Si el área es menor a 100, devuelve un error
                throw new Error("El área debe ser mayor a 100 m2")
            }
            return true
        }),
    check('price')
        .exists().bail().withMessage("El campo no existe!")
        .not().isEmpty().bail().withMessage("El precio del lote es requerido")
        .isNumeric().bail().withMessage("El precio del lote debe ser un valor numérico")
        .custom((value,{req}) => {
            if(value < 100){
                //* Si el precio es menor a 100, devuelve un error
                throw new Error("El precio debe ser mayor a 100")
            }
            return true
        }),
    check('reservationPercentage')
        .exists().bail().withMessage("El campo no existe!")
        .not().isEmpty().bail().withMessage("El porcentaje de reserva es requerido")
        .isNumeric().bail().withMessage("El porcentaje de reserva del lote debe ser un valor numérico")
        .custom((value,{req}) => {
            if(value < 5 ||value >=100){
                //* Si el porcentaje de reserva es menor a 5 o mayor o igual a 100, devuelve un error
                throw new Error("El porcentaje de reserva debe ser mayor a 5% y menor a 100%")
            }
            return true
        }),
    check('financiation')
        .exists().bail().withMessage("El campo no existe!")
        .not().isEmpty().bail().withMessage("El financiamiento es requerido!"),
    check('lat').optional(true).bail().isNumeric().withMessage("La latitud del lote debe ser un valor numérico"),
    check('lng').optional(true).isNumeric().bail().withMessage("La longitud del lote debe ser un valor numérico"),
    check('x1').optional(true).isNumeric().bail().withMessage("La coordenada x1 del lote debe ser un valor numérico"),
    check('x2').optional(true).isNumeric().bail().withMessage("La coordenada x2 del lote debe ser un valor numérico"),
    check('y1').optional(true).isNumeric().bail().withMessage("La coordenada y1 del lote debe ser un valor numérico"),
    check('y2').optional(true).isNumeric().bail().withMessage("La coordenada y2 del lote debe ser un valor numérico"),
    (req,res,next) => validateResult(req, res, next)
]

const validateGetById = [
    param('id')
        .custom(async (value,{req}) => {
            //* Verifica que el número de lote esté registrado
            const result = await getLotById(req)
            if(!result){
                throw new Error("El número de lote no existe!")
            }
            return true
        }),
    (req,res,next) => validateResult(req, res, next)
]
const validateDelete = validateGetById

const validateUpdate = [
    param('id')
        .custom(async (value,{req}) => {
            //* Verifica que el número de lote esté registrado
            const result = await getLotById(req)
            if(!result){
                throw new Error("El número de lote no existe!")
            }
            return true
        }),
    check('area')
        .optional(true)
        .isNumeric().bail().withMessage("El área del lote debe ser un valor numérico")
        .custom((value) => {
            //* Si el área es menor a 100, devuelve un error
            if(value < 100){
                throw new Error("El área debe ser mayor a 100 m2")
            }
            return true
        }).bail(),
    check('price')
        .optional(true)
        .isNumeric().bail().withMessage("El precio del lote debe ser un valor numérico")
        .custom((value,{req}) => {
            if(value < 100){
                //* Si el precio es menor a 100, devuelve un error
                throw new Error("El precio debe ser mayor a 100")
            }
            return true
        }).bail(),
    check('reservationPercentage')
        .optional(true)
        .isNumeric().bail().withMessage("El porcentaje de reserva del lote debe ser un valor numérico")
        .custom((value,{req}) => {
            if(value < 5 ||value >=100){
                throw new Error("El porcentaje de reserva debe ser mayor a 5% y menor a 100%")
            }
            return true
        }),
    check('lat').optional(true).isNumeric().bail().withMessage("La latitud del lote debe ser un valor numérico"),
    check('lng').optional(true).isNumeric().bail().withMessage("La longitud del lote debe ser un valor numérico"),
    check('x1').optional(true).isNumeric().bail().withMessage("La coordenada x1 del lote debe ser un valor numérico"),
    check('x2').optional(true).isNumeric().bail().withMessage("La coordenada x2 del lote debe ser un valor numérico"),
    check('y1').optional(true).isNumeric().bail().withMessage("La coordenada y1 del lote debe ser un valor numérico"),
    check('y2').optional(true).isNumeric().bail().withMessage("La coordenada y2 del lote debe ser un valor numérico"),
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