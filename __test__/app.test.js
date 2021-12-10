const request = require('supertest');
const app = require('../app.js');
//const config = require('../config/config')['test'];
// const sequelize = new Sequelize(
//     config.database, config.username, config.password, config
// );
const { sequelize } = require('../models');

describe('legalCheck API', () => {
    beforeAll( () => {
        sequelize
        .sync({ force: false })
        .then(() => {
          console.log('------ TEST SQL Restructure Complete ------');
        })
        .catch((error) => {
          console.log(error);
        });
    });
    afterAll( () => {
        sequelize
        .close()
        .then(() => {
            console.log('------ TEST SQL Destructure Complete ------');
          })
    });
    it('POST /legalCheck --> results', async () => {
        return await request(app)
            .post('/legalCheck')
            .send({"resultType" : "1"})
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.body).toEqual(expect.arrayContaining([
                    expect.objectContaining({
                        title: expect.any(String),
                        description: expect.any(String)
                    })
                ]))
            })
    });
    it('POST /legalCheck --> request body 가 없다면 상태코드 422를 응답한다.', async () => {
        return await request(app)
            .post('/legalCheck').send({}).expect(422)
    });
    it('POST /legalCheck --> request body 가 있지만 DB 내 해당 레코드가 없다면 resultType : "0" 데이터를 응답한다.', async () => {
        return await request(app)
            .post('/legalCheck')
            .send({"resultType" : ""})
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.body).toEqual(expect.arrayContaining([
                    expect.objectContaining({
                        title: expect.any(String),
                        description: expect.any(String),
                        resultType: "0"
                    })
                ]))
            })
    });
});

// describe('contect API', () => {
//     it('POST /contect --> boolean registered or not', async () => {
//         return await request(app)
//             .post('/contect')
//             .expect('Content-Type', /boolean/)
//             .expect(200)
//     });
// });