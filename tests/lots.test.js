import request from 'supertest'
import assert from 'assert'
import {app} from '../index.js'

//* Testeo que entregue todos los lotes
describe('GET /api/lots',()=>{
    it('respond with json containing a list of all lots',(done)=>{
        request(app)
            .get('/api/lots')
            .set('Accept','application/json')
            .expect('Content-Type',/json/)
            .expect(200, done)
    })
})

//* Testeo la obtención de un lote
describe('GET /api/lots/:id', ()=>{
    it('respond with json containing a single lot',(done)=>{
        request(app)
            .get('/api/lots/64507b0bf9fe3309c14630d8')
            .set('Accept','application/json')
            .expect('Content-Type',/json/)
            .expect(200, done)
    })
    it('respond with json containing errors',()=>{
        request(app)
            .get('/api/lots/nonExistingLot')
            .set('Accept','application/json')
            .expect('Content-Type',/json/)
            .expect({
                "errors":
                    [{
                        "type": "field",
                        "value": "nonExistingLot",
                        "msg": "El número de lote no existe!",
                        "path": "id",
                        "location": "params"
                    }]
                })
    })
})

//* Testeo la creación de un lote
describe('POST /api/lots/create', ()=>{
    it('respond with message of success',(done)=>{
        request(app)
            .post('/api/lots/create')
            .send({
                "number":999999,
                "area": 100,
                "price": 100,
                "reservationPercentage": 5,
                "financiation": false
            })
            .expect('Content-Type',/json/)
            .expect({status:"Lot saved"})
            .expect(200, done)
    })

    it('respond with code 400 on bad request',(done)=>{
        request(app)
            .post('/api/lots/create')
            .send({})
            .set('Accept', 'application/json')
            .expect('Content-Type',/json/)
            .expect({"errors":[{"type":"field","msg":"El campo no existe!","path":"number","location":"body"},{"type":"field","msg":"El campo no existe!","path":"area","location":"body"},{"type":"field","msg":"El campo no existe!","path":"price","location":"body"},{"type":"field","msg":"El campo no existe!","path":"reservationPercentage","location":"body"},{"type":"field","msg":"El campo no existe!","path":"financiation","location":"body"}]})
            .expect(400, done)
    })
})

//* Testeo la actualización de un lote
describe('PUT /api/lots/update/:id', ()=>{
    it('respond with json containing a single lot',async ()=>{
        //* Guardo el último lote
        const response = await request(app)
            .get('/api/lots')
            .set('Accept', 'application/json')
            .expect(200)

        var lastLot = response.body.lots[response.body.lots.length-1]
        var initialArea = lastLot.area
        var newArea = initialArea + 200
        var lastLotId = lastLot._id

        //* Actualizo el área del lote
        await request(app)
            .put('/api/lots/update/'+lastLotId)
            .send({area: newArea})
            .set('Accept', 'application/json')
            .expect(200)
            .expect({status:"Lot updated"})

        //* Verifico que el área se haya actualizado
        const updatedResponse = await request(app)
            .get('/api/lots')
            .set('Accept', 'application/json')
            .expect(200)

        var updatedLastLot = updatedResponse.body.lots[updatedResponse.body.lots.length - 1]
        assert.strictEqual(updatedLastLot.area,newArea)
        assert.notStrictEqual(updatedLastLot.area,initialArea)
    })

    //* Testeo que no se pueda actualizar un lote que no existe
    it('respond with json containing errors',async()=>{
        await request(app)
            .put('/api/lots/update/nonExistingLot')
            .send({area: 100})
            .set('Accept', 'application/json')
            .expect({
                "errors": [
                    {
                    "type": "field",
                    "value": "nonExistingLot",
                    "msg": "El número de lote no existe!",
                    "path": "id",
                    "location": "params"
                    }
                ]
                })
            .expect(400)
    })
})

//* Testeo la eliminación de un lote
describe("DELETE /api/lots/delete/:id",()=>{
    it('should respond with a json',async ()=>{
        //* Guardo el último lote
        const response = await request(app)
            .get('/api/lots')
            .set('Accept', 'application/json')
            .expect(200)

        var lastLot = response.body.lots[response.body.lots.length-1]
        var lastLotId = lastLot._id

        //* Elimino el último Lote
        await request(app)
            .delete('/api/lots/delete/'+lastLotId)
            .set('Accept', 'application/json')
            .expect(200)
            .expect({status:"Lot deleted"})
    })
})