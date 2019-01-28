// mysql
import * as mysql from 'mysql';


export default class MerchantCtrl {
  private connection = mysql.createConnection({
    host : 'card2.cjsltldd26aa.ap-northeast-2.rds.amazonaws.com',
    user : 'card',
    password : 'cardcard',
    database : 'card',
    // port : '23066'
  });
  // Get all
  getAll = (req, res) => {
    console.log("getAll");
    this.connection.query('select * from tbcd_merchant', function(err, rows){
      if(err) throw err;
      console.log('The solution is : ' + rows);
      res.send(rows);
    });
    // this.model.find({}, (err, docs) => {
    // if (err) { return console.error(err); }
    // res.json(docs);
    // });  
  };
  insert = (req, res) => {
    console.log("insert");
    console.log(req.body);
    // this.connection.query('insert into tbcd_merchant (cmid, bin, corp_no, corp_name, corp_cls, biz_kind, email, post_no, reg_dt, bank, acnt_name, acnt_no) values ?', 
    // req.body,
    // function(err, result){
    //   if(err) throw err;
    //   console.log('The solution is : ' + result);
    //   res.send(result);
    // });
  };
}

