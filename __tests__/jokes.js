const request = require('supertest')
const server = require('../api/server.js')

describe('Routes', async () => {
  describe('GET /api/jokes', () => {
    it('should return good status', () => {
      return request(server)
        .get('/api/jokes')
        .then(response => {
          expect(response).toHaveProperty('status', 200)
        })
    })
    it('should return json object', () => {
      return request(server)
        .get('/api/jokes')
        .then(response => {
          expect(response).toHaveProperty('type', 'application/json')
        })
    })
  })
})