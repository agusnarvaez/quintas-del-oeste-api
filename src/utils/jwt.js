import jwt from 'jsonwebtoken'
import credentials from '../../credentials.js'

const createAccessToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      credentials.jwtSecret,
      {expiresIn: 60 * 60 * 24},
      (error, token) => {
        if(error) reject(error)
        resolve(token)

      }
    )

  })
}

export {createAccessToken}
