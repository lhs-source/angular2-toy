import * as mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({  
  //_id : Number,
  _discussion_id : mongoose.Schema.Types.ObjectId,
  //_parent_id : mongoose.Schema.Types.ObjectId,
  _parent_id : String,
  userid : mongoose.Schema.Types.ObjectId, 
  username : String, 
  content : String,
  create_date : Number,
  update_date : Number
});

const comment = mongoose.model('Comment', commentSchema);

//export default comment;
export default commentSchema;