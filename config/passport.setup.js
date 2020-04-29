const { User } = require('../models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const customFields = {
  usernameField: 'email',
  passwordField: 'password'
};

/**
 * method called when the
 *  user login in
 *
 * @param {*} email
 * @param {*} password
 * @param {*} done
 * @returns
 */
const verifyCallback = async (email, password, done) => {
  let existingUser = await User.findOne({ email }).catch(e => done(e));
  if (!existingUser) return done(null, false);
  const validity = await existingUser.isValidPassword(password);
  return (validity) ? done(null, existingUser) : done(null, false);
};

const strategy = new LocalStrategy(customFields, verifyCallback);


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  let existingUser = await User.findById(userId).catch(e => done(e));
  if (existingUser) done(null, existingUser);
  else done(null, false);
});

passport.use(strategy);
