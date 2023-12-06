//* Importaciones de paquetes
import express from "express"
const router = express.Router()

//* Middlewares
import {validateCreate,validateUpdate,validateDelete,validateGetById} from "../middlewares/userValidations.js"

//* Controllers
import userController from "../controllers/userController.js"

//************************************************************************
//* Rutas

router.get('/',userController.index) //* Ruta para obtener todos los usuarios

router.get('/:id',validateGetById,userController.read) //* Ruta para obtener un usuario por ID

router.post('/get',userController.getByEmail) //* Ruta para obtener un usuario por email

router.post('/',validateCreate,userController.create) //* Ruta para crear un usuario

router.put('/:id',validateUpdate,userController.update) //* Ruta para actualizar un usuario

router.delete("/:id",validateDelete,userController.delete) //* Ruta para eliminar un usuario

export default router