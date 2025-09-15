const request = require('supertest');
const { app, server } = require('../server');
const mongoose = require('mongoose');
describe('GET /transactions', () => {
    it('should return all transactions', async () => {
        const res = await request(app).get('/transactions');
        expect(res.statusCode).toBe(200);
       
    })
    it('should return object and tasks property o', async () => {
        const res = await request(app).get('/transactions');
        expect(typeof res.body).toBe('object');
        expect(res.body).toHaveProperty('transactions');
        console.log(res.body.transactions,'data seeded');
})
})
afterAll(() => {
    mongoose.connection.close();
    server.close();
}); 