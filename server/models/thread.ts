import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import SeqSchema from './sequence';

const commentSchema = new mongoose.Schema({  
    //_id : Number,
    seq_id : String,
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
    seq_id : Number,
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
    ],
});

threadSchema.pre('save', function(next) {
    const thread = this;
    console.log("threadSchema save pre");

    SeqSchema.findOneAndUpdate({name : "thread_seq"}, { $inc: { seq: 1 } },{"upsert": true,"new": true  }, function (err, getsequence) {
        console.log(getsequence);
        if (err) next(err);
        thread.seq_id = getsequence.seq - 1; // substract 1 because I need the 'current' sequence number, not the next
        next();
    });
});

threadSchema.pre('findOneAndUpdate', function(next) {
    const thread = this;
    console.log("threadSchema findOneAndUpdate pre");

    next();
});


const thread = mongoose.model('Thread', threadSchema);

export default thread;

