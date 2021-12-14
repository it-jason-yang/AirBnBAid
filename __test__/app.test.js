const request = require('supertest');
const app = require('../app.js');
//const config = require('../config/config')['test'];
// const sequelize = new Sequelize(
//     config.database, config.username, config.password, config
// );
const { sequelize } = require('../models');

describe('legalCheck API', () => {
    beforeAll(async () => {
        await sequelize
            .sync({ force: false })
            .then(() => {
                console.log('------ TEST SQL Restructure Complete ------');
            })
            .catch((error) => {
                console.log(error);
            });
    });
    afterAll(async () => {
        await sequelize
            .close()
            .then(() => {
                console.log('------ TEST SQL Destructure Complete ------');
            })
    });
    it('POST /legalCheck --> results', async () => {
        return await request(app)
            .post('/legalCheck')
            .send({ "checkVal": "1101" })
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.body).toEqual(expect.arrayContaining([
                    expect.objectContaining({
                        title: expect.any(String),
                        resultType: expect.any(String),
                        law: expect.any(String),
                        host: expect.any(String),
                        guest: expect.any(String),
                        info: expect.any(String),
                        houseLocation: expect.any(String),
                        houseType: expect.any(String),
                    })
                ]))
            })
    });
    it('POST /legalCheck --> request body 가 없는 경우 상태코드 200을 응답하고 resultType = "0" 데이터를 응답한다.', async () => {
        return await request(app)
            .post('/legalCheck')
            .send({})
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.body).toEqual(expect.arrayContaining([
                    expect.objectContaining({
                        resultType: "0",
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