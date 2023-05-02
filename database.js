import mongoose, { mongo } from "mongoose"
import credentials from "./credentials.js"
const URI = credentials.mongoURI

mongoose.connect(URI)
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err))
    
export{ mongoose }