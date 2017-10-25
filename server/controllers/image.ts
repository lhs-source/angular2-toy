
import * as mongoose from 'mongoose';
import * as fs from 'fs';
import image from '../models/image';

export default class ImageCtrl {

    upload = (req, res) => {
        // var dirname = require('path').dirname(__dirname);
        // var filename = req.files.file.name;
        // var path = req.files.file.path;
        // var type = req.files.file.mimetype;
        
        // var read_stream =  fs.createReadStream(dirname + '/' + path);

        // var conn = req.conn;
        // var Grid = require('gridfs-stream');
        // Grid.mongo = mongoose.mongo;

        // var gfs = Grid(conn.db);
        
        // var writestream = gfs.createWriteStream({
        //     filename: filename
        // });
        // read_stream.pipe(writestream);
        
        var newItem = image;
        newItem.img.data = fs.readFileSync(req.files.userPhoto.path)
        newItem.img.contentType = 'image/png';
        newItem.save();
    };
}