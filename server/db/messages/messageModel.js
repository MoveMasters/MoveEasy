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
  mover_id: {
    type: Schema.Types.ObjectId,
    ref: 'Mover'
  },
  company: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  //only used as placeholders for the join table
  customerName: {
    type: String
  },
  moverName: {
    type: String
  }
},
{
  timestamps: true
});

//remove entries from the join table
messageSchema.pre('save', function (next) {
  const message = this;
  delete message.customerName;
  delete message.moverName;
  next();
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;