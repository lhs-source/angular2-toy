import Thread from '../models/thread';
import BaseCtrl from './base';

export default class ThreadCtrl extends BaseCtrl {
    model = Thread;

    getAllSortd = (req, res) => {
        /* sort({'key' : 1 - inc / -1 - dec }) */
        this.model.find({category : req.params.category}).sort({'create_date' : -1}).exec((err, docs) => {
        if (err) { return console.error(err); }
        res.json(docs);
        });
    };
    // comment
    // Get all
    getAllComment = (req, res) => {
        this.model.find({}, (err, docs) => {
        if (err) { return console.error(err); }
        res.json(docs);
        });
    };

    // Count all
    countComment = (req, res) => {
        this.model.count((err, count) => {
        if (err) { return console.error(err); }
        res.json(count);
        });
    };
    // Insert
    insertComment = (req, res) => {
        const obj = new this.model(req.body);
        console.log(obj);

        var condition ={
            _id: req.params.tid, 
        }
        var pipe = {
            $push : {
                comments : req.body.comments
            }
        }
        
        this.model.findOneAndUpdate(condition, pipe, { safe: true, upsert: true }, (err, item) => {
            if (err) { return console.error(err); }
            // 이러면 res가 obj로 감
            res.json(obj);
            // res.sendStatus(200);
        });
        
        /*
        // 다른 거 다 없어진다.
        this.model.findOne(condition, (error, doc_find) =>{
            if(error) {
                return console.error(error);
            }
            console.log("doc_find");
            console.log(doc_find);
            doc_find.comments = req.body.comments;
            doc_find.save( (error, doc_save) => {
                    console.log("doc_save");
                    console.log(doc_save);
                    if (error && error.code === 11000) {
                        res.sendStatus(400);
                    }
                    if (error) {
                        return console.error(error);
                    }
                    res.status(200).json(doc_save);
                }
            )
        });
        */
    };

    // Get by id
    getComment = (req, res) => {
        this.model.findOne({ _id: req.params.tid, 'comments._id' : req.params.cid }, {'comments.$' : 1}, (err, obj) => {
        if (err) { return console.error(err); }
        res.json(obj);
        });
        console.log("get");
    };

    // Update by id
    updateComment = (req, res) => {
        console.log("updateComment");
        console.log(req.body);
        var condition ={
            _id: req.params.tid, 
            'comments._id' : req.params.cid
        }
        /**
         * 
            'comments.$' : {
                content : req.body.comments.content,
                update_date : req.body.comments.update_date
            }
            이렇게 하면 set할 때 그 댓글 통째로 저것만 들어간다;
            {}를 하나의 오브젝트로 생각해서 그런듯...
         */
        var pipe = {
            $set : {
                'comments.$.update_date' : req.body.comments.update_date
            }
        }
        if(req.body.comments.content){
            pipe.$set['comments.$.content'] = req.body.comments.content;
        }
        if(req.body.comments.deleted){
            pipe.$set['comments.$.deleted'] = req.body.comments.deleted;
            pipe.$set['comments.$.old_content'] = req.body.comments.content;
            pipe.$set['comments.$.content'] = "삭제된 댓글입니다.";
        }
        console.log(pipe);
        /*
        this.model.findOne(condition, (error, doc_find) =>{
            if(error) {
                return console.error(error);
            }
            console.log("doc_find");
            console.log(doc_find);
            doc_find.comments.content = req.body.comments.content;
            doc_find.comments.update_date = req.body.comments.update_date;
            doc_find.save( (error, doc_save) => {
                    console.log("doc_save");
                    console.log(doc_save);
                    if (error && error.code === 11000) {
                        res.sendStatus(400);
                    }
                    if (error) {
                        return console.error(error);
                    }
                    res.status(200).json(doc_save);
                }
            )
        });
        */
        
        this.model.update(condition, pipe, (err) => {
        if (err) { return console.error(err); }
        res.sendStatus(200);
        });
        
    };

    // Delete by id
    deleteComment = (req, res) => {
        console.log("something");
        console.log(req);
        
        var condition ={
            _id: req.params.tid, 
            'comments._id' : req.params.cid
        };
        var pipe = {

        };
        this.model.where({ _id: req.params.tid }).update({ _id: req.params.tid }, {$pull : {comments : {_id : req.params.cid}}}, { 'new': true }, (err) => {
        if (err) { return console.error(err); }
        res.sendStatus(200);
        });
    };
}