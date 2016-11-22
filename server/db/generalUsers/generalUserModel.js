/**
 * @file This is the server-side model for the Users
 */

/** @module User Model */

const mongoose = require('mongoose');
const extend = require('mongoose-schema-extend');
const bcrypt = require('bcrypt-nodejs');
const Q = require('q');

const SALT_WORK_FACTOR = 10;
const Schema = mongoose.Schema;



//for mongoose inhereitence
const options = {
  timestamps: true
};


const generalUserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String
  },
  email: {
    type: String
  },
  salt: {
    type: String
  }
},
  options
);


// A case not to use arrow functions: since arrow functions have
// anonymous 'this' so they can carry the 'this' from outside their
// scope - we don't be able to access the user if we use it.

  /**
  * This function is used to compare provided password at signin and cross-check with password stored in database.
  * @method comparePasswords
  * @param {string} candidatePassword request object
  * @returns {boolean}
  */
generalUserSchema.methods.comparePasswords = function(candidatePassword) {
  const savedPassword = this.password;

  return new Q.Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, savedPassword, (err, isMatch) => {
      if (err) {
        reject(err);
      } else {
        resolve(isMatch);
      }
    });
  });
};


// A case not to use arrow functions: since arrow functions have
// anonymous 'this' so they can carry the 'this' from outside their
// scope - we don't be able to access the user if we use it.

/*** Before saving the user to the database */
generalUserSchema.pre('save', function (next) {
  const user = this;

  /*** Only hash the password if it has been modified (or is new) */
  if (!user.isModified('password')) {
    next();
    return;
  }

  /*** Generate a salt */
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) {
      next(err);
      return;
    }

    /*** Hash the password along with our new salt */
    bcrypt.hash(user.password, salt, null, (error, hash) => {
      if (error) {
        next(error);
        return;
      }

      /*** Override the cleartext password with the hashed one */
      user.password = hash;
      user.salt = salt;
      next();
    });
  });
});


const GeneralUser = mongoose.model('GeneralUser', generalUserSchema);

module.exports = GeneralUser;
//exports.schema = generalUserSchema;
//exports.model = GeneralUser;
