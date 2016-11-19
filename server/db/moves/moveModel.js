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
  name: {
    type: String
  },
  phone: {
    type: String
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
  surveyCompleteTime: {
    type: Date
  },
  moveTime: {
    type: Date
  }
},
{
  timestamps: true
});

const Move = mongoose.model('Move', moveSchema);
module.exports = Move;