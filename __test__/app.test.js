const request = require('supertest');
// const { boolean } = require('yargs');
// const { response } = require('../app.js');
const Sequelize = require('sequelize');
const app = require('../app.js');
const config = require('../config/config')['test'];
const sequelize = new Sequelize(
    config.database, config.username, config.password, config
);


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
    it('POST /legalCheck --> array results', async () => {
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
    // it('POST /legalCheck --> validate request body', async () => {
    //     return await request(app)
    //         .post('legalCheck').send({}).expect(422)
    // });
});

// describe('contect API', () => {
//     it('POST /contect --> boolean resistered or not', async () => {
//         return await request(app)
//             .post('/contect')
//             .expect('Content-Type', /boolean/)
//             .expect(200)
//     });
// });