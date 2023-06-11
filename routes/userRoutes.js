import express from "express"
const router = express.Router()

//* Middlewares
import {validateCreate,validateUpdate,validateDelete,validateGetById} from "../middlewares/userValidations.js"

//* Controllers
import userController from "../controllers/userController.js"

//************************************************************************

router.get('/',userController.index)

router.get('/:id',validateGetById,userController.read)

router.post('/create',validateCreate,userController.create)

router.put('/update/:id',validateUpdate,userController.update)

router.delete("/delete/:id",validateDelete,userController.delete)

export default router