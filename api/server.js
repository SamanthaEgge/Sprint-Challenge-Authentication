const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session)

const knexConnection = require('../database/dbConfig.js')
const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

const sessionOptions = {
  name: 'dadjokes',
  secret: process.env.COOKIE_SECRET || 'A secret cookie',
  cookie: {
    secure: process.env.COOKIE_SECURE || false,
    maxAge: 1000 * 60 * 60 * 24, // Cookie lasts 1 day
    httpOnly: true
  },
  resave: false,
  saveUninitialized: true,
  store: new KnexSessionStore({
    knex: knexConnection,
    createtable: true,
    clearInterval: 1000 * 60 * 60 * 8 // 8 hours
  })
}

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(sessions(sessionOptions))

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

module.exports = server;
