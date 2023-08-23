import express from "express"

//* Este código se utiliza para configurar una aplicación Express. Utiliza el
//* Node.js path y url módulos para obtener el nombre del directorio del archivo actual
import path,{dirname} from "path"

//* Archivo actual y convierte una URL de archivo en una ruta
import { fileURLToPath } from "url"
//* Utilizo el módulo de morgan para registrar solicitudes HTTP en la consola
import morgan from "morgan"

//* Utilizo el módulo de cookie-parser para manejar las cookies
import cookieParser from "cookie-parser"

//* Utilizo el módulo de cors para permitir solicitudes de otros dominios
import cors from "cors"

//* Importo rutas de la API
import lotsRoutes from "./routes/lots.routes.js"
import mercadoPagoRoutes from "./routes/mercadoPago.routes.js"
import userRoutes from "./routes/user.routes.js"
import authRoutes from "./routes/auth.routes.js"

//* Inicializo la aplicación
const app = express()

//* Obtengo el nombre del directorio del archivo actual
const __dirname = dirname(fileURLToPath(import.meta.url))

//* Configuro el puerto
app.set('port',process.env.PORT || 3000)

//* Inicializo middlewares
app.use(cors({
    origin: ['http://localhost:3000','http://localhost:45678','https://testing.barrioquintas.com.ar','testing.barrioquintas.com.ar'],
    credentials: true
})) // Para que el servidor entienda cors
app.use(morgan('dev')) // Mensaje formateado como dev
app.use(express.json()) // Para que el servidor entienda json
app.use(cookieParser()) // Para que el servidor entienda cookies

//* Rutas de la API
app.use('/api/lots',lotsRoutes)
app.use('/api/mercadoPago',mercadoPagoRoutes)
app.use('/api/user',userRoutes)
app.use('/api/auth',authRoutes)

//* Configuro la carpeta public para que sea accesible desde el navegador
app.use(express.static(path.join(__dirname,'public')))

//* Exporto la aplicación
export default app