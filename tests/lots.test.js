import request from 'supertest'
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
    it('respond with json containing errors',(done)=>{
        request(app)
            .get('/api/lots/nonExistingUser')
            .set('Accept','application/json')
            .expect('Content-Type',/json/)
            .expect({
                "errors":
                    [{
                        "type": "field",
                        "value": "nonExistingUser",
                        "msg": "El número de lote no existe!",
                        "path": "id",
                        "location": "params"
                    }]
                })
            .expect(400, done)
    })
})

//* Testeo la creación de un lote
describe('POST /api/lots/create', ()=>{
    /* it('respond with json containing a single lot',(done)=>{
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
            .end(err=>{
                if(err) return done(err)
                done()
            })
    }) */

    it('respond with code 400 on bad request',(done)=>{
        request(app)
            .post('/api/lots/create')
            .send({})
            .set('Accept', 'application/json')
            .expect('Content-Type',/json/)
            .expect({"errors":[{"type":"field","msg":"El campo no existe!","path":"number","location":"body"},{"type":"field","msg":"El campo no existe!","path":"area","location":"body"},{"type":"field","msg":"El campo no existe!","path":"price","location":"body"},{"type":"field","msg":"El campo no existe!","path":"reservationPercentage","location":"body"},{"type":"field","msg":"El campo no existe!","path":"financiation","location":"body"},{"type":"field","msg":"La latitud del lote debe ser un valor numérico","path":"lat","location":"body"},{"type":"field","msg":"La longitud del lote debe ser un valor numérico","path":"lng","location":"body"},{"type":"field","msg":"La coordenada x1 del lote debe ser un valor numérico","path":"x1","location":"body"},{"type":"field","msg":"La coordenada x2 del lote debe ser un valor numérico","path":"x2","location":"body"},{"type":"field","msg":"La coordenada y1 del lote debe ser un valor numérico","path":"y1","location":"body"},{"type":"field","msg":"La coordenada y2 del lote debe ser un valor numérico","path":"y2","location":"body"}]})
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


        //let lots = response.body.lots
        var lastLot = response.body.lots[response.body.lots.length-1]
        var initialArea = lastLot.area
        var newArea = initialArea + 200
        var lastLotId = lastLot._id

        //* Actualizo el área del lote
        request(app)
            .put('/api/lots/update/'+lastLotId)
            .send({area: newArea})
            .set('Accept', 'application/json')
            .expect(200)
            .expect({status:"Lot updated"})

        //* Verifico que el área se haya actualizado
        request(app)
            .get('/api/lots')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(response.body.lots[response.body.lots.length-1].area==newArea&&response.body.lots[response.body.lots.length-1].area!=initialArea)
    })


})