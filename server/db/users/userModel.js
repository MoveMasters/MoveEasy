/**
 * @file This is the server-side model for the Users
 */

/** @module User Model */

const mongoose = require('mongoose');
const GeneralUser = require('./../generalUsers/generalUserModel');
const Schema = mongoose.Schema;



//for mongoose inhereitence


const userSchema = new Schema({});



const User = GeneralUser.discriminator('User', userSchema);

module.exports = User;
