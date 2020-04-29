const router = require('express').Router();
const passport = require('passport');

router.get('/', (req, res) => {
  res.send('<h1>Auth Route</h1>');
});

router.get('/login-failure', (req, res) => {
  res.send('<h1>Login Failed</h1>');
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/auth/login-failure', successRedirect: '/auth/' }));

router.post('/logout', (req, res) => {
  req.logOut();
  res.json({ message: 'logged out successfully 👌' });
});

module.exports = router;