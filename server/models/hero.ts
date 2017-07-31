import * as mongoose from 'mongoose';

const heroSchema = new mongoose.Schema({
  num : Number,
  name : String
});

const Hero = mongoose.model('heros', heroSchema);

export default Hero;
