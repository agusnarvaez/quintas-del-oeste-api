import { check,validationResult,param } from "express-validator"
import { getLotByNumber,getLotById } from "../utils/lotsUtils.js"

const validateCreate = [
    check("number")
        .exists().bail().withMessage("El campo número no existe!")
        .not().isEmpty().bail().withMessage("El número de lote es requerido")
        .isNumeric().bail().withMessage("El número de lote debe ser un valor numérico")
        .custom((value,{req}) => {
            if(value < 1){
                //* Si el número de lote es menor a 1, devuelve un error
                throw new Error("El número de lote debe ser mayor a 0")
            }
            if(value > 54){
                //* Si el número de lote es menor a 1, devuelve un error
                throw new Error("El número de lote debe ser menor a 55")
            }
            return true
        }),
    check("block")
        .exists().bail().withMessage("El campo bloque no existe!")
        .not().isEmpty().bail().withMessage("El número de manzana es requerido")
        .isNumeric().bail().withMessage("El número de manzana debe ser un valor numérico")
        .custom((value,{req}) => {
            if(value < 1){
                //* Si el número de lote es menor a 1, devuelve un error
                throw new Error("El número de manzana debe ser mayor a 0")
            }
            if(value > 51){
                //* Si el número de lote es menor a 1, devuelve un error
                throw new Error("El número de manzana debe ser menor a 52")
            }
            return true
        })
        .custom(async (value, { req }) => {
            //* Verifica que el número de lote no esté registrado en esa manzana
            const lotNumber = req.body.number; // Obtén el número de lote del cuerpo de la solicitud
            const result = await getLotByNumber(lotNumber)
            if (result&&result.block==value) {
                throw new Error("El número de lote ya existe en esa manzana!");
            }
            return true;
        }),
    check('area')
        .exists().bail().withMessage("El campo área no existe!")
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
        .exists().bail().withMessage("El campo precio no existe!")
        .not().isEmpty().bail().withMessage("El precio del lote es requerido")
        .custom((value,{req}) => {
            if(value < 10000){
                //* Si el precio es menor a 10000, devuelve un error
                throw new Error("El precio debe ser mayor a 100")
            }
            return true
        }),
    check('reservationPercentage')
        .optional(true)
        .exists().bail().withMessage("El campo porcentaje de reserva no existe!")
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
        .optional(true)
        .exists().bail().withMessage("El campo financiación no existe!")
        .not().isEmpty().bail().withMessage("El financiamiento es requerido!"),
    check('lat').optional(true).bail().isNumeric().withMessage("La latitud del lote debe ser un valor numérico"),
    check('lng').optional(true).isNumeric().bail().withMessage("La longitud del lote debe ser un valor numérico"),
    check('perimeter.x1.lat').optional(true).isNumeric().bail().withMessage("La coordenada x1 del lote debe ser un valor numérico"),
    check('perimeter.x1.lng').optional(true).isNumeric().bail().withMessage("La coordenada x1 del lote debe ser un valor numérico"),
    check('perimeter.x2.lat').optional(true).isNumeric().bail().withMessage("La coordenada x2 del lote debe ser un valor numérico"),
    check('perimeter.x2.lng').optional(true).isNumeric().bail().withMessage("La coordenada x2 del lote debe ser un valor numérico"),
    check('perimeter.y1.lat').optional(true).isNumeric().bail().withMessage("La coordenada y1 del lote debe ser un valor numérico"),
    check('perimeter.y1.lng').optional(true).isNumeric().bail().withMessage("La coordenada y1 del lote debe ser un valor numérico"),
    check('perimeter.y2.lat').optional(true).isNumeric().bail().withMessage("La coordenada y2 del lote debe ser un valor numérico"),
    check('perimeter.y2.lng').optional(true).isNumeric().bail().withMessage("La coordenada y2 del lote debe ser un valor numérico"),
    (req,res,next) => validateResult(req, res, next)
]

const validateGetById = [
    param('id')
        .isAlphanumeric().bail().withMessage("El id del lote debe ser un valor alfanumérico")
        .custom(async (value,{req}) => {
            //* Verifica que el número de lote esté registrado
            const result = await getLotById(req.params.id)
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
            const result = await getLotById(req.params.id)
            if(!result) throw new Error("El número de lote no existe!")
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