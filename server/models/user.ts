import * as bcrypt from 'bcryptjs';
import * as mongoose from 'mongoose';

// User 스키마
const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true, lowercase: true, trim: true },
  password: String,
  role: String
});

// Before saving the user, hash the password
// 저장하기 전에 해시.
userSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  // 솔트 만들고
  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }
    // 솔트 추가해서 해시 돌리고
    bcrypt.hash(user.password, salt, function(error, hash) {
      if (error) { return next(error); }
      // 비번은 해시값으로
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  // 해시로 비교하는듯.
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }  // 뭔가 에러
    callback(null, isMatch);  // 성공 or 안맞음 인듯
  });
};

// Omit the password when returning a user
userSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    delete ret.password;
    return ret;
  }
});

const User = mongoose.model('User', userSchema);

export default User;
