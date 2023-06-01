import express from "express"
const router = express.Router()

//* Middlewares
import {validateCreate,validateUpdate,validateDelete,validateGetById} from "../middlewares/lotsValidations.js"

//* Controllers
import lotsController from "../controllers/lotsController.js"

//************************************************************************

router.get('/',lotsController.index)

router.get('/:id',validateGetById,lotsController.read)

router.post('/create',validateCreate,lotsController.create)

router.put('/update/:id',validateUpdate,lotsController.update)

router.delete("/delete/:id",validateDelete,lotsController.delete)

export default router