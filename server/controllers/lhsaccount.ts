import lhsAccount from '../models/lhsaccount';
import BaseCtrl from './base';

export default class LhsAccountsCtrl extends BaseCtrl {
    // where : string
    // id : string
    // pw : string
    // content : string
    model = lhsAccount;

    // req 
    // where : string
    getByWhere = (req, res) => {
      /* sort({'key' : 1 - inc / -1 - dec }) */
      let perPage = 8;
      this.model.find({where : req.param.where}).sort({'seq_id' : -1}).limit(perPage).skip((req.params.page - 1) * perPage).exec((err, docs) => {
        if (err) { return console.error(err); }
        res.json(docs);
      });
  };
}