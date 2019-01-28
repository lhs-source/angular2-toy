// request body parse
import * as bodyParser from 'body-parser';
// .env file
import * as dotenv from 'dotenv';
// server
import * as express from 'express';
import * as morgan from 'morgan';
// db
import * as mongoose from 'mongoose';
import * as path from 'path';

// http
import * as http from "http";
// socket
import * as socketio from "socket.io";

//file
import * as multer from 'multer';
import * as cors from 'cors';
import * as fs from 'fs';
import * as Loki from 'lokijs';

// mysql
import * as mysql from 'mysql';

import setRoutes from './routes/routes';
import runsocket from './socket';

class Server{
  public static readonly PORT = 3000;
  // express
  public app : any;
  // httpserver
  private server : any;
  // socket io
  private io : any;
  // port
  private port : number;
  // mongodb
  private db : any;
  // mysql
  private connection : any;

  private DB_NAME = 'db.json';
  private COLLECTION_NAME = 'images';
  private UPLOAD_PATH = 'uploads';
  //private upload = multer({dest : `${this.UPLOAD_PATH}/`});
  private upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'uploads/');
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      }
    }),
  });
  

  public static bootstrap(): Server {
      return new Server();
  }
  constructor(){
    this.step1();
    this.step11();
    this.step2();
    this.step3();
  }
  private step1(){
    // express 
    this.app = express();

    // process.env로 .env파일의 속성 가져다 쓴다.
    dotenv.load({ path: '.env' });

    // 포트는 8080 - socket
    this.app.set('port', (process.env.PORT || 9999));

    // /로 시작되는 경로에서 모두 실행
    this.app.use('/', express.static(path.join(__dirname, '../public')));
    // 항상
    // json 파싱하는듯
    this.app.use(bodyParser.json({limit: '50mb'}));
    this.app.use(bodyParser.urlencoded({limit: '16mb', extended: false }));
    //this.app.use(express.bodyParser({limit: '16mb'}));
    this.app.use(morgan('dev'));

    // file
    this.app.use(cors());
    this.app.post('/upload', this.upload.single('file'), async(req, res) =>{
      console.log(req.file);
      //res.json({error_code:0,err_desc:null});
      res.send(req.file);
    });
    this.app.use('/uploads', express.static('uploads'));
  }
  private step11(){
    // 서버 만들고
    this.server = http.createServer(this.app);
    // 소켓 만들고 listen
    this.io = socketio().listen(this.server);
    if(this.io){
      console.log("get io maybe..");
    }
    // 서버는 8080으로 listen중
    this.server.listen(this.app.get('port'));

    // 포트 다시 3000으로 설정
    this.app.set('port', (process.env.PORT || 3000));
  }
  private step2(){
    // 디비 연결
    mongoose.connect("mongodb://127.0.0.1:27017/calendar_events", function(err){
        if(err){ 
          console.error("Error! " + err);
        }
        console.error("Success! ");
      }
    );
    this.db = mongoose.connection;

    // mysql
    this.connection = mysql.createConnection({
      host : 'tmxkorea.iptime.org',
      user : 'payment',
      password : 'rjfoqkftod',
      database : 'pg',
      port : '23066'
    });
    this.connection.connect(); 
    this.connection.query('select 1 + 1 AS solution', function(err, rows, fields){
      console.log('The solution is: ', rows[0].solution);
    });
    this.connection.end();
  }
  private step3(){
    (<any>mongoose).Promise = global.Promise;

    this.db.on('error', console.error.bind(console, 'connection error:'));
    this.db.once('open', () => {
      console.log('Connected to MongoDB');

      this.app.use(
        function(req, res, next) {
          res.header('Acess-Control-Allow-Origin', '*');
          res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
          res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
          (req.method === 'OPTIONS') ?
            res.send(200) :
            next();
        }
      );
      
      // api route 설정
      setRoutes(this.app);

      
      // localhost:3000으로 접속하면 클라이언트로 index.html을 전송
      this.app.get('/*', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
      });

      // listen
      this.app.listen(this.app.get('port'), () => {
        console.log('Angular Full Stack listening on port ' + this.app.get('port'));
        
      });

    });
    runsocket(this.io);
  }
}

let server = Server.bootstrap();
export default server.app;




