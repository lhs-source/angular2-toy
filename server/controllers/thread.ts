import Thread from '../models/thread';
import BaseCtrl from './base';

export default class ThreadCtrl extends BaseCtrl {
    model = Thread;

    getAllSortd = (req, res) => {
        /* sort({'key' : 1 - inc / -1 - dec }) */
        this.model.find({}).sort({'create_date' : -1}).exec((err, docs) => {
        if (err) { return console.error(err); }
        res.json(docs);
        });
    };
}