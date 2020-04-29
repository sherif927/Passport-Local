const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 1,
    trim: true,
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    trim: true
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    default: 'male'
  },
  country: {
    type: String,
    trim: true
  },
  phoneNumber: {
    type: String,
    trim: true
  }
});

UserSchema.pre('save', async function (next) {
  //'this' refers to the current document about to be saved
  const user = this;
  //Hash the password with a salt round of 10, the higher the rounds the more secure, but the slower
  //your application becomes.
  const hash = await bcrypt.hash(this.password, 10).catch(e => console.log(e));
  //Replace the plain text password with the hash and then store it
  this.password = hash;
  //Indicates we're done and moves on to the next middleware
  next();
});

//We'll use this later on to make sure that the user trying to log in has the correct credentials
UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  //Hashes the password sent by the user for login and checks if the hashed password stored in the
  //database matches the one sent. Returns true if it does else false.
  const compare = await bcrypt.compare(password, user.password);
  return compare;
}

let User = mongoose.model('User', UserSchema);

module.exports = { User };