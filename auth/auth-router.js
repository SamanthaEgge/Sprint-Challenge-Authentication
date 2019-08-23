const router = require('express').Router();
const bcrypt = require('bcyptjs')

const Users = require('../users/users-model.js')

router.post('/register', (request, response) => {
  let user = request.body

  const hash = bcrypt.hashSync(user.password)
  user.password = hash

  Users.add(user)
    .then(user => {
      response.status(201).json(user)
    })
    .catch(error => {
      response.status(500).response.json(error)
    })
});

router.post('/login', (request, response) => {
  // implement login
});

module.exports = router;
