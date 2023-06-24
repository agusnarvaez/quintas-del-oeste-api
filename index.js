import app from "./app.js"
import {connectDB} from "./database.js"
// Sarting the server

connectDB()
app.listen(app.get('port'),()=>{
    console.log("Server on port http://localhost:"+app.get('port'))
})

export {app}