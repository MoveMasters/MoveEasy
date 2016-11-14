/**
 * @file This is the server-side model for the ItemPrototypes
 */

/** @module ItemPrototype Model */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const ItemPrototypeSchema = new Schema( {
  name: {
    type: String,
    unique: true,
    required: true
  },
  ctf : {
    type: Number,
    required: true
  },
  count : {
    type: Number,
    required: true,
    default: 1
  }
});


const ItemPrototype = mongoose.model('ItemPrototype', ItemPrototypeSchema);
module.exports = ItemPrototype;