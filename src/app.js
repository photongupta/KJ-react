const express = require('express');
const logger = require('morgan');
const session = require('cookie-session');
const cookieParser = require('cookie-parser');
const handlers = require('./handlers');
const Database = require('./database');
const {getRedisClient} = require('./redisClient');
require('dotenv').config();
const app = express();
const redisClient = getRedisClient();
const db = new Database(redisClient);

app.locals = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  REDIRECT_URI: process.env.REDIRECT_URI,
  db,
  SCOPE: process.env.SCOPE,
};

app.use(handlers.attachDetails);

app.use(express.json());
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.set('sessionMiddleware', session({secret: 'key'}));
app.use((...args) => app.get('sessionMiddleware')(...args));

app.get('/login', handlers.login);
app.get('/callback', handlers.getUserData);
app.get('/api/getUser', handlers.getUser);
app.get('/api/Topics', handlers.getTopics);
app.post('/api/setContent', handlers.setContent);
app.post('/api/content', handlers.getContent);
app.post('/api/addTitle', handlers.addTitle);
app.post('/api/logout', handlers.logout);

module.exports = {app};
