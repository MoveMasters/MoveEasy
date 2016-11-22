/**
 * @file This is the server-side model for the Users
 */

/** @module User Model */

const mongoose = require('mongoose');
const GeneralUser = require('./../generalUsers/generalUserModel');
const Schema = mongoose.Schema;




const moverSchema = new Schema({
  company: {
    type: String,
    required: true
  }
});


const Mover = GeneralUser.discriminator('Mover', moverSchema);


module.exports = Mover;