import express from "express"

// This code is used to set an Express application. It uses the
// Node.js path and url modules to get the directory name of the
import path,{dirname} from "path"
// current file and convert a file URL to a path. It also uses the
import { fileURLToPath } from "url"

// Node.js morgan module to log HTTP requests to the console.
import morgan from "morgan"
import cookieParser from "cookie-parser"
import cors from "cors"
// Importing routes
import lotsRoutes from "./routes/lots.routes.js"
import mercadoPagoRoutes from "./routes/mercadoPago.routes.js"
import userRoutes from "./routes/user.routes.js"
import authRoutes from "./routes/auth.routes.js"
const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))
// Settings
app.set('port',process.env.PORT || 3030)

// Middlewares
app.use(cors({
    origin: 'http://localhost:3000'
})) // Para que el servidor entienda cors
app.use(morgan('dev')) // Mensaje formateado como dev
app.use(express.json()) // Para que el servidor entienda json
app.use(cookieParser()) // Para que el servidor entienda cookies
// Routes
app.use('/api/lots',lotsRoutes)
app.use('/api/mercadoPago',mercadoPagoRoutes)
app.use('/api/user',userRoutes)
app.use('/api/auth',authRoutes)
// Static files
app.use(express.static(path.join(__dirname,'public')))

export default app