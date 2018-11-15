const request = require('supertest');
const app = require('../app');

describe('Test api', () => {
    it('returns match history', async () => {
        const response = await request(app).get('/match/history/m1chaelchen');
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
    })
})