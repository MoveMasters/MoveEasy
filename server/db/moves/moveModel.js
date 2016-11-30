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
  //username and name are not saved
  //only as placeholders when the join in peformed
  username: {
    type: String
  },
  name: {
    type: String
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

//remove entries from the join table
moveSchema.pre('save', function (next) {
  const move = this;
  //delete the username and name so we don't have a potential conflict with the user table
  delete move.name;
  delete move.username;
  next();
});

const Move = mongoose.model('Move', moveSchema);
module.exports = Move;