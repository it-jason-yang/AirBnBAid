const request = require('supertest');
const { boolean } = require('yargs');
const { response } = require('../app.js');
const app = require('../app.js');

describe('legalCheck API', () => {
    it('POST /legalCheck --> array results', () => {
        return request(app)
            .post('/legalCheck')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(expect.arrayContaining([
                    expect.objectContaining({
                        title: expect.any(String),
                        description: expect.any(String)
                    })
                ]))
            })
    })
    it('POST /legalCheck --> validate request body', () => {
        return request(app)
            .post('legalCheck').send({}).expect(422)
    })
});

describe('contect API', () => {
    it('POST /contect --> boolean resistered or not', () => {
        return request(app)
            .post('/contect')
            .expect('Content-Type', /boolean/)
            .expect(200)
    })
});