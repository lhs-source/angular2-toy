import * as mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  from : String,
  msg : String,
  date : Date
});

const chat = mongoose.model('Chat', chatSchema);

export default chat;