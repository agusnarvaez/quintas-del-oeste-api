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

describe('GET /api/lots/:id', ()=>{
    it('respond with json containing a single lot',(done)=>{
        request(app)
            .get('/api/lots/64507b0bf9fe3309c14630d8')
            .set('Accept','application/json')
            .expect('Content-Type',/json/)
            .expect(200, done)
    })
})