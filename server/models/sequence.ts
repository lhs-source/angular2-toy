import * as mongoose from 'mongoose';

const SeqSchema = new mongoose.Schema({
  name : {type : String, required : true},
  seq : {type : Number, default : 1},
});

const sequence = mongoose.model('Sequence', SeqSchema);

export default sequence;