import CalendarEvent from '../models/calendar-events';
import BaseCtrl from './base';

export default class CalendarEventCtrl extends BaseCtrl {
    model = CalendarEvent;

    getAllSortd = (req, res) => {
        /* sort({'key' : 1 - inc / -1 - dec }) */
        // let perPage = 8;
        const obj = new this.model(req.body);
        let condition = {
            "date": {
                "$gte": new Date(2019, 5), 
                "$lt": new Date(2019, 8)
            }
        }
        this.model.find(condition)
                    .sort({'date' : 1})
                    .exec((err, docs) => {
            if (err) { return console.error(err); }
            res.json(docs);
        });
    };

}