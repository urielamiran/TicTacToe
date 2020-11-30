let io;

module.exports = {
    init: (server) =>{
        io = require('socket.io')(server);
        return io;
    },
    getIO: () =>{
        if(!io){
            throw new Error('not found socket.io!!!');
        }
        return io;
    },
    setSocket: (io)=>{
        var sockets = [];
        io.on('connection', (socket)=>{
 
            socket.on('startGame', (userName)=>{
     
              let found = false
              for (let index = 0; index < sockets.length; index++) {
                if(sockets[index].socketId == socket.id){
                  found = true
                  break;
                }
                
              }
              if(!found) {
                sockets.push({socketId: socket.id, username: userName})
              }
              
              if(sockets.length == 2){
                io.to(sockets[0].socketId).emit('startGame', {
                  start: true,
                  opponentName:  sockets[1].username
                })
                io.to(sockets[1].socketId).emit('startGame', {
                  start: false,
                  opponentName: sockets[0].username
                })
              }
            })
        
            socket.on('turn', (index)=> {
              socket.broadcast.emit('turn', index )
            })
            
            socket.on('endGame', (zone)=> {
              socket.broadcast.emit('endGame', zone)
            })
        
            socket.on('leaveGame', ()=> {
              for (let index = 0; index < sockets.length; index++) {
                if(sockets[index].socketId == socket.id){
                  sockets.splice(index, 1);
                  break;
                }
              }
            })
        
        
            socket.on("disconnect", function() {
             
              for (let index = 0; index < sockets.length; index++) {
                if(sockets[index].socketId == socket.id){
                  sockets.splice(index, 1);
                  break;
                }
              } 
            });
          })
        
    }
}