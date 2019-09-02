import CalendarEvent from '../models/calendar-events';
import BaseCtrl from './base';

export default class CalendarEventCtrl extends BaseCtrl {
    model = CalendarEvent;

    getAllSortd = (req, res) => {
        /* sort({'key' : 1 - inc / -1 - dec }) */
        // let perPage = 8;
        // const obj = new this.model(req.body);
        let body = req.body;
        let fromDate = new Date(body.year, body.month -1);
        let toDate = new Date(body.toyear, body.tomonth);
        console.log(fromDate);
        console.log(toDate);
        let condition = {
            "date": {
                "$gte": fromDate, 
                "$lt": toDate
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