/**
 * @file This is the server-side model for the Users
 */

/** @module User Model */

const mongoose = require('mongoose');
const GeneralUser = require('./../generalUsers/generalUserModel');
const Schema = mongoose.Schema;





const userSchema = new Schema({});
const User = GeneralUser.discriminator('User', userSchema);

//const userSchema = GeneralUser.schema();
//const User = GeneralUser.model.discriminator('User', {});

module.exports = User;
