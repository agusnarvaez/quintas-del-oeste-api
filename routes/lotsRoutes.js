import express from "express"
const router = express.Router()

import lotsController from "../controllers/lotsController.js"


router.get('/',lotsController.index)

router.get('/:id',lotsController.read)

router.post('/add',lotsController.create)

router.put('/update/:id',lotsController.update)

router.delete("/delete/:id",lotsController.delete)

export default router