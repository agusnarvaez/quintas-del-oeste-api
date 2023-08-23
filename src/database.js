//* Importo mongoose que es el ORM que voy a utilizar para conectarme a la base de datos MongoDB
import mongoose from "mongoose"
//* Importo las credenciales de la base de datos
import credentials from "./credentials.js"

//* Obtengo la URI de la base de datos
const URI = credentials.mongoURI

//* Función para conectarme a la base de datos
const connectDB = async () => {
    try{
        //* Conecto la base de datos
        await mongoose.connect(URI)
        console.log('MongoDB is connected')
    }catch(e){
        //* Si hay errores los devuelvo
        console.error(e)
    }
}

//* Exporto la función para conectarme a la base de datos para utilizarla en index.js
export{ connectDB }