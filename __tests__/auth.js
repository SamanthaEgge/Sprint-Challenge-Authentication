const request = require('supertest')
const server = require('../api/server.js')

describe('Routes', () => {
  describe('POST /api/auth/register', () => {
    it('should return creation', () => {
      return request(server)
        .post('/api/auth/register')
        .send({
          username: 'notsam3',
          password: '1234abcde'
        })
        .then(response => {
          expect(response).toHaveProperty('status', 201)
        })
    })
    it('should return json object', () => {
      return request(server)
        .post('/api/auth/register')
        .send({
          username: 'notsam4',
          password: '1234abcde'
        })
        .then(response => {
          expect(response).toHaveProperty('type', 'application/json')
        })
    })
  })
  describe('POST /api/auth/login', () => {
    it('should return confirmation', () => {
      return request(server)
        .post('/api/auth/login')
        .send({
          username: 'sam',
          password: '1234abcde'
        })
        .then(response => {
          expect(response).toHaveProperty('status', 200)
        })
    })
    it('should return json object', () => {
      return request(server)
        .post('/api/auth/login')
        .then(response => {
          expect(response).toHaveProperty('type', 'application/json')
        })
    })
  })
})