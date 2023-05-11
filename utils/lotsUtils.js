import  Lot  from '../models/lots.js'

//* Getters
const getAllLots = async () => {
    try {
      const lots = await Lot.find().exec()
      return lots
    } catch (e) {
      console.error(e)
    }
}
const getLotById = async (req,res,next) => {
    try {
      const lot = await Lot.findById(req.params.id)
      return lot
    } catch (e) {
      console.error(e)
    }
}

const getLotByNumber = async(number) => {
    try {
        const lot = await Lot.findOne({number})
        return lot
    } catch (e) {
        console.error(e)
    }
}


export {getAllLots, getLotById, getLotByNumber}
