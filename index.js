//* Importo la aplicación
import app from "./src/app.js"
//* Importo la conexión a la base de datos
import {connectDB} from "./src/database.js"

//* Conecto la base de datos
connectDB()

//* Inicializo el servidor
app.listen(app.get('port'),'0.0.0.0',()=>{
    console.log("Server on port http://localhost:"+app.get('port'))
})

//* Exporto la aplicación
export {app}