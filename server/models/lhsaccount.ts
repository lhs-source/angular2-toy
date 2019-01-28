import * as mongoose from 'mongoose';

const lhsaccountsSchema = new mongoose.Schema({
    where : String,
    ID : String,
    PW : String,
    Content : String
  });
  
  const lhsAccount = mongoose.model('LhsAccounts', lhsaccountsSchema);
  
  export default lhsAccount;