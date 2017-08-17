import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import * as path from 'path';

import * as http from "http";
import * as socketio from "socket.io";

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
    this.app.set('port', (process.env.PORT || 8080));

    // /로 시작되는 경로에서 모두 실행
    this.app.use('/', express.static(path.join(__dirname, '../public')));
    // 항상
    // json 파싱하는듯
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(morgan('dev'));
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
  }
  private step3(){
    (<any>mongoose).Promise = global.Promise;

    this.db.on('error', console.error.bind(console, 'connection error:'));
    this.db.once('open', () => {
      console.log('Connected to MongoDB');

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




