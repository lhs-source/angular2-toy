import Comment from '../models/comment';
import BaseCtrl from './base';

export default class CommentCtrl extends BaseCtrl {
    model = Comment;

    getAllSortd = (req, res) => {
        /* sort({'key' : 1 - inc / -1 - dec }) */
        console.log(req.params.id);
        this.model.find({_discussion_id : req.params.id}, (err, docs) => {
            if (err) { return console.error(err); }
            res.json(docs);
        });
    };
}