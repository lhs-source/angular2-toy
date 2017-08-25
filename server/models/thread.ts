import * as mongoose from 'mongoose';

const threadSchema = new mongoose.Schema({  
  //_id : Number,
  category : String,
  userid : String, 
  username : String, 
  title : String, 
  content : String,
  create_date : Number,
  update_date : Number
});

const thread = mongoose.model('Thread', threadSchema);

export default thread;