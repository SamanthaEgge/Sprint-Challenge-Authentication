const request = require('supertest')
const server = require('../api/server.js')

describe('Routes', () => {
  describe('GET /api/jokes', () => {
    it('should return good status', () => {
      return request(server)
        .get('/api/jokes')
        .auth('sam', '1234abcde')
        .then(response => {
          expect(response).toHaveProperty('status', 200)
        })
    })
    it('should return json object', () => {
      return request(server)
        .get('/api/jokes')
        .auth('sam', '1234abcde')
        .then(response => {
          expect(response).toHaveProperty('type', 'application/json')
        })
    })
  })
})