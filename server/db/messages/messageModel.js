/**
 * @file This is the server-side model for the Message
 */

/** @module Message Model */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const messageSchema = new Schema ({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  company: {
    type: String,
    default: 'MoveKick',
    required: true
  },
  text: {
    type: String,
    required: true
  }
},
{
  timestamps: true
});


const Message = mongoose.model('Message', messageSchema);
module.exports = Message;