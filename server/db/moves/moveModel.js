/**
 * @file This is the server-side model for the Move
 */

/** @module Move Model */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const moveSchema = new Schema(
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  items: [{
    item_id: Schema.Types.ObjectId,
    ref: 'Item'
  }]

);
