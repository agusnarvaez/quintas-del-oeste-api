import express from "express"

// This code is used to set an Express application. It uses the
// Node.js path and url modules to get the directory name of the
import path,{dirname} from "path"
// current file and convert a file URL to a path. It also uses the
import { fileURLToPath } from "url"

// Node.js morgan module to log HTTP requests to the console.
import morgan from "morgan"

//Importing models
import {mongoose} from './database.js'

// Importing routes
import lotsRoutes from "./routes/lotsRoutes.js"
import mercadoPagoRoutes from "./routes/mercadoPagoRoutes.js"
const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))
// Settings
app.set('port',process.env.PORT || 3030)

// Middlewares
app.use(morgan('dev')) // Mensaje formateado como dev
app.use(express.json()) // Para que el servidor entienda json

// Routes
app.use('/api/lots',lotsRoutes)
app.use('/api/mercadoPago',mercadoPagoRoutes)

// Static files
app.use(express.static(path.join(__dirname,'public')))
// Sarting the server
app.listen(app.get('port'),()=>{
    console.log("Server on port http://localhost:"+app.get('port'))
})

export {app}