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
  update_date : Number,
  deleted : Boolean,
});

const threadSchema = new mongoose.Schema({  
  //_id : Number,
  category : String,
  userid : String, 
  username : String, 
  title : String, 
  content : String,
  create_date : Number,
  update_date : Number,
  deleted : Boolean,
  // 댓글입니다 embedded로 바꿨어용
  comments : [commentSchema
    /*
    {
        //_id : Number,
    _discussion_id : mongoose.Schema.Types.ObjectId,
    //_parent_id : mongoose.Schema.Types.ObjectId,
    _parent_id : String,
    userid : mongoose.Schema.Types.ObjectId, 
    username : String, 
    content : String,
    create_date : Number,
    update_date : Number
  }*/
  ],
});

const thread = mongoose.model('Thread', threadSchema);

export default thread;