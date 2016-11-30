/**
 * @file This is the server-side model for the Move
 */

/** @module Move Model */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const moveSchema = new Schema ({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  phone: {
    type: String
  },
  company: {
    type: String,
    required: true,
    default: 'MoveKick'
  },
  currentAddress: {
    type: String
  },
  futureAddress: {
    type: String
  },
  surveyTime: {
    type: Date,
    required: true
  },
  surveyComplete: {
    type: Boolean,
    required: true,
    default: false
  },
  moveTime: {
    type: Date
  },
  moveComplete: {
    type: Boolean,
    required: true,
    default: false
  }
},
{
  timestamps: true
});

const Move = mongoose.model('Move', moveSchema);
module.exports = Move;