import request from 'supertest'
import assert from 'assert'
import {app} from '../index.js'

//* Testeo que entregue todos los usuarios
describe('GET /api/user',()=>{
    it('respond with json containing a list of all user',(done)=>{
        request(app)
            .get('/api/user')
            .set('Accept','application/json')
            .expect('Content-Type',/json/)
            .expect(200, done)
    })
})

//* Testeo la obtención de un usuario
describe('GET /api/user/:id', ()=>{
    it('respond with json containing a single user',(done)=>{
        request(app)
            .get('/api/user/6486176fc105f03ae40e2b95')
            .set('Accept','application/json')
            .expect('Content-Type',/json/)
            .expect(200, done)
    })
    it('respond with json containing errors',()=>{
        request(app)
            .get('/api/user/nonExistingUser')
            .set('Accept','application/json')
            .expect('Content-Type',/json/)
            .expect({
                "errors":
                    [{
                        "type": "field",
                        "value": "nonExistingUser",
                        "msg": "El usuario no existe",
                        "path": "id",
                        "location": "params"
                    }]
                })
    })
})

//* Testeo la creación de un usuario
describe('POST /api/user/create', ()=>{
    it('respond with message of success',(done)=>{
        request(app)
            .post('/api/user/create')
            .send({
                "name":"NombreTest",
                "lastName":"ApellidoTest",
                "email":"email@test.com",
                "password": "testing"
            })
            .expect('Content-Type',/json/)
            .expect({status:"User saved"})
            .expect(200, done)
    })

    it('respond with code 400 on bad request',(done)=>{
        request(app)
            .post('/api/user/create')
            .send({})
            .set('Accept', 'application/json')
            .expect('Content-Type',/json/)
            .expect({
                "errors": [
                  {
                    "type": "field",
                    "msg": "El campo no existe",
                    "path": "name",
                    "location": "body"
                  },
                  {
                    "type": "field",
                    "msg": "El campo no existe",
                    "path": "lastName",
                    "location": "body"
                  },
                  {
                    "type": "field",
                    "msg": "El campo no existe",
                    "path": "email",
                    "location": "body"
                  },
                  {
                    "type": "field",
                    "msg": "El campo no existe",
                    "path": "password",
                    "location": "body"
                  }
                ]
              })
            .expect(400, done)
    })
})

//* Testeo la actualización de un usuario
describe('PUT /api/user/update/:id', ()=>{
    it('respond with json containing a single user',async ()=>{
        //* Guardo el último usuario
        const response = await request(app)
            .get('/api/user')
            .set('Accept', 'application/json')
            .expect(200)

        var lastUser = response.body.users[response.body.users.length-1]
        var initialName = lastUser.name
        var newName = "otroNombre"
        var id = lastUser._id

        //* Actualizo el área del usuario
        await request(app)
            .put('/api/user/update/'+id)
            .send({name: newName})
            .set('Accept', 'application/json')
            .expect(200)
            .expect({status:"User updated"})

        //* Verifico que el área se haya actualizado
        const updatedLastUser = await request(app)
            .get('/api/user/'+id)
            .set('Accept', 'application/json')
            .expect(200)

        assert.strictEqual(updatedLastUser.body.user.name,newName)
        assert.notStrictEqual(updatedLastUser.body.user.name,initialName)
    })

    //* Testeo que no se pueda actualizar un usuario que no existe
    it('respond with json containing errors',async()=>{
        await request(app)
            .put('/api/user/update/nonExistingUser')
            .send({area: 100})
            .set('Accept', 'application/json')
            .expect({
                "errors": [
                  {
                    "type": "field",
                    "value": "nonExistingUser",
                    "msg": "El usuario no existe!",
                    "path": "id",
                    "location": "params"
                  }
                ]
              })
            .expect(400)
    })
})

//* Testeo la eliminación de un usuario
describe("DELETE /api/user/delete/:id",()=>{
    it('should respond with a json',async ()=>{
        //* Guardo el último usuario
        const response = await request(app)
            .get('/api/user')
            .set('Accept', 'application/json')
            .expect(200)

        var lastUser = response.body.users[response.body.users.length-1]
        var lastUserId = lastUser._id

        //* Elimino el último usuario
        await request(app)
            .delete('/api/user/delete/'+lastUserId)
            .set('Accept', 'application/json')
            .expect(200)
            .expect({status:"User deleted"})
    })
})