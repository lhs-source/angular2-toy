import * as mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  img : {
      data : Buffer,
      contentType : String
  }
});

const image = mongoose.model('Chat', imageSchema);

export default image;