import mongoose, { mongo } from "mongoose"
import credentials from "./credentials.js"
const URI = credentials.mongoURI

const connectDB = async () => {
    try{
        await mongoose.connect(URI)
        console.log('MongoDB is connected')
    }catch(e){
        console.error(e)
    }
}

/* mongoose.connect(URI)
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err)) */

export{ connectDB }