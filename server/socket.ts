
import * as socketio from "socket.io";

export default function runsocket(io) {
    console.log('runsocket');
    io.on('connection', (socket : any) => {
      console.log('connected client on port %s.', this.port);
      socket.on('disconnect', () => {
        console.log('client disconnected');
      });
      socket.on('login', (data) =>{
            console.log('client : ' + data.name);
            socket.name = data.name;
            socket.userid = data.userid;

            io.emit('login', data.name);
      });
      socket.on('chat', (data) =>{
            console.log('client : ' + data.from);
            
            io.emit('chat', {from : data.from, msg : data.msg, when : data.date});
      });
    });
}
