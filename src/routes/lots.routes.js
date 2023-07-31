import express from "express"
const router = express.Router()

//* Middlewares
import { validateCreate,validateUpdate,validateDelete,validateGetById} from "../middlewares/lotsValidations.js"
import { authRequired } from "../middlewares/authValidations.js"

//* Controllers
import lotsController from "../controllers/lotsController.js"

//************************************************************************
//* Rutas
router.get('/',lotsController.index) //* Ruta para obtener todos los lotes

router.get('/reservations',lotsController.reservations) //* Ruta para obtener un lote reservado por ID

router.get('/reservations/:id',lotsController.reservation) //* Ruta para obtener un lote reservado por ID

router.get('/:id',validateGetById,lotsController.read) //* Ruta para obtener un lote por ID


router.post('/create',authRequired,validateCreate,lotsController.create) //* Ruta para crear un lote

router.put('/update/:id',authRequired,validateUpdate,lotsController.update) //* Ruta para actualizar un lote

router.delete("/delete/:id",authRequired,validateDelete,lotsController.delete) //* Ruta para eliminar un lote

router.post('/reserve',lotsController.reserve) //* Ruta para reservar un lote


export default router