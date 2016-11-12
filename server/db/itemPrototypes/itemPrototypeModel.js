/**
 * @file This is the server-side model for the ItemPrototypes
 */

/** @module ItemPrototype Model */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;





const itemProtoypeSchema = new Schema(
  name: {
    type: String,
    unique: true,
    required: true
  },
  ctf : {
    type: Number,
    required: true
  }
);


const ItemPrototype = mongoose.model('ItemPrototype', ItemPrototypeSchema);
module.exports = ItemPrototype;