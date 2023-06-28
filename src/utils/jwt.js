//* Importo la librería jsonwebtoken para crear el token de acceso
import jwt from 'jsonwebtoken'
//* Importo las credenciales
import credentials from '../../credentials.js'

//* Función para crear el token de acceso
const createAccessToken = (payload) => {
  //* Devuelvo una promesa con el token de acceso
  //* payload es el objeto que voy a guardar en el token
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      credentials.jwtSecret,
      {expiresIn: 60 * 60 * 24},
      //* Callback que se ejecuta cuando se crea el token
      (error, token) => {
        if(error) reject(error)
        resolve(token)
      }
    )

  })
}

const verifyAccessToken = (token,callback) => {
  jwt.verify(
    token,
    credentials.jwtSecret,
    callback)
}

export {createAccessToken,verifyAccessToken}
