const request = require('supertest');
const { app, server } = require('../server');
const mongoose = require('mongoose');
describe('GET /transactions', () => {
    it('should return all transactions', async () => {
        const res = await request(app).get('/transactions');
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});
afterAll(() => {
    mongoose.connection.close();
    server.close();
}); 