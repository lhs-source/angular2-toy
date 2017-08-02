import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import * as path from 'path';

import * as http from "http";
import * as socketio from "socket.io";

import setRoutes from './routes/routes';

class Server{
  public static readonly PORT = 3000;
  public app : any;
  private server : any;
  private io : any;
  private port : number;
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
    this.app = express();
    dotenv.load({ path: '.env' });
    this.app.set('port', (process.env.PORT || 3000));

    this.app.use('/', express.static(path.join(__dirname, '../public')));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(morgan('dev'));
  }
  private step11(){
    this.server = http.createServer(this.app);
    this.io = socketio().listen(this.server);
  }
  private step2(){
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

      setRoutes(this.app);

      this.app.get('/*', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
      });

      this.app.listen(this.app.get('port'), () => {
        console.log('Angular Full Stack listening on port ' + this.app.get('port'));
        this.io.on('connect', (socket : any) => {
          console.log('connected client on port %s.', this.port);
          socket.on('disconnect', () => {
            console.log('client disconnected');
          })
        });
      });

    });
  }
}

let server = Server.bootstrap();
export default server.app;




