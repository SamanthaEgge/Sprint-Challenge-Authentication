const router = require('express').Router();
const bcrypt = require('bcyptjs')

const Users = require('../users/users-model.js')

router.post('/register', (request, response) => {
  let user = request.body

  const hash = bcrypt.hashSync(user.password)
  user.password = hash


});

router.post('/login', (request, response) => {
  // implement login
});

module.exports = router;
