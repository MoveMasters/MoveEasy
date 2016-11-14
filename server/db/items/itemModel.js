/**
 * @file This is the server-side model for the Items
 */

/** @module Item Model */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const itemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  },
  going: {
    type: Boolean,
    required: true,
    default: true
  },
  cft: {
    type: Number,
    required: true
  },
  comment: {
    type: String
  }
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
