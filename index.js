import express  from "express"
import path,{dirname} from "path"
import { fileURLToPath } from "url"
import morgan from "morgan"

//Importing models
import {mongoose} from './database.js'

// Importing routes
import lotsRoutes from "./routes/lotsRoutes.js"

const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))
// Settings
app.set('port',process.env.PORT || 3000)

// Middlewares
app.use(morgan('dev')) // Mensaje formateado como dev
app.use(express.json()) // Para que el servidor entienda json

// Routes
app.use('/api/lots',lotsRoutes)

// Static files
app.use(express.static(path.join(__dirname,'public')))
// Sarting the server
app.listen(app.get('port'),()=>{
    console.log("Server on port http://localhost:"+app.get('port'))
})