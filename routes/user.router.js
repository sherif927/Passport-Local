const router = require('express').Router();
const _ = require('lodash');
const Authenticate = require('../middleware/auth.middleware');
const UserService = require('../services/user.service');

router.get('/', (req, res) => {
  res.send('<h1>User Route</h1>');
});

router.post('/register', (req, res) => {
  let userBody = _.pick(req.body, ['name', 'age', 'email', 'password', 'gender', 'country', 'phoneNumber']);
  UserService.registerNewUser(userBody)
    .then(user => res.json(user))
    .catch(e => res.status(500).send(e));
});

router.get('/me', Authenticate, (req, res) => {
  res.json(req.user);
});

module.exports = router;