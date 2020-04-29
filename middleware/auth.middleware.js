const Authenticated = (req, res, next) => {
  if (req.isAuthenticated()) next();
  else res.status(401).json({ message: 'You are unauthorized' });
}

module.exports = Authenticated;