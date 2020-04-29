const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');

require('dotenv').config();
require('./config/passport.setup');

const authRouter = require('./routes/auth.router');
const userRouter = require('./routes/user.router');

const mongoObj = require('./db/mongoose');
const MongoStore = require('connect-mongo')(session);

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionStore = new MongoStore({ mongooseConnection: mongoObj.connection, collection: 'sessions' });

const sessionOptions = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
};

app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);
app.use('/users', userRouter);



const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port} 👌`));