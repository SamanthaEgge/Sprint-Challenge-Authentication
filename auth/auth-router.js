const router = require('express').Router();
const bcrypt = require('bcryptjs')

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
      console.log(error)
      response.status(500).response.json({ message: 'Issue with creating user on server' })
    })
});

router.post('/login', (request, response) => {
  // implement login
  let { username, password } = request.body

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        response.status(200).json({ message: `Howdy, ${user.username}!`})
      } else {
        response.status(401).response.json({ message: 'These are incorrect credentials. Check your username and password, then try again' })
      }
    })
    .catch(error => {
      console.log(error)
      response.status(500).json(error);
    })
});


//// for self testing only
router.get('/users', (request, response) => {
  Users.find()
    .then(users => {
      response.json(users)
    })
    .catch(error => {
      console.log(error)
      response.status(500).response.json({ message: 'error retrieving users' })
    })
})

module.exports = router;
