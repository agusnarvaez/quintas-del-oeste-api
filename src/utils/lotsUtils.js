import  Lot  from '../models/lots.model.js'

//* Obtiene todos los lotes
const getAllLots = async () => {
    try {
      const lots = await Lot.find().exec()
      return lots
    } catch (e) {
      console.error(e)
    }
}

//* Obtiene un lote por ID
const getLotById = async (req,res,next) => {
    try {
      const lot = await Lot.findById(req.params.id)
      return lot
    } catch (e) {
      return false
    }
}

//* Obtiene un lote por numero
const getLotByNumber = async(number) => {
    try {
        const lot = await Lot.findOne({number})
        return lot
    } catch (e) {
        console.error(e)
    }
}


export {getAllLots, getLotById, getLotByNumber}
