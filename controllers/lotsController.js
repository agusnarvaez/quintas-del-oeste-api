import  Lot  from '../models/lots.js'

const controller = {
    index: async (req, res) => {
        const lots = await Lot.find()
        //console.log(lots)
        res.json({lots})
    },
    create: async (req, res) => {
        const { number, area, price, reservationPercentage, financiation, coordinates } = req.body
        const lot = new Lot({ number, area, price, reservationPercentage, financiation, coordinates })
        
        await lot.save()
        
        res.json({status:"Lot saved"})
    },
    read: async (req, res) => {
        const lot = await Lot.findById(req.params.id)
        
        res.json({
            status:"Lot read",
            lot:lot
        })
    },
    update: async (req, res) => {
        const { number, area, price, reservationPercentage, financiation, coordinates } = req.body
        const newLot = { number, area, price, reservationPercentage, financiation, coordinates }
        
        await Lot.findByIdAndUpdate(req.params.id, newLot)
        
        res.json({status:"Lot updated"})
    },
    delete: async (req, res) => {
        await Lot.findByIdAndDelete(req.params.id)
        
        res.json({status:"Lot deleted"})
    }
}

export default controller