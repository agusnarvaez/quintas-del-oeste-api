import express from "express"
const router = express.Router()

import lotsController from "../controllers/lotsController.js"
import {validateCreate,validateUpdate,validateDelete,validateGetById} from "../middlewares/lotsValidations.js"

router.get('/',lotsController.index)

router.get('/:id',validateGetById,lotsController.read)

router.post('/create',validateCreate,lotsController.create)

router.put('/update/:id',validateUpdate,lotsController.update)

router.delete("/delete/:id",validateDelete,lotsController.delete)

export default router