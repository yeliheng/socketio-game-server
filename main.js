console.time("Done");
console.log("-----简易游戏后端服务器Demo-----");
let port = 19132;
let socketIO = require('socket.io')(port);
let onlinePlayerArr = [];
console.log('Server is running on 127.0.0.1:' + port);
console.timeEnd("Done");
//连接
socketIO.on('connection',function(socket){
    let clientId = socket.id;
    let clientIp = socket.conn.remoteAddress;
    console.log('[连接建立] Client ID: ' + clientId);
    socket.on('PlayerJoin',(data,callback) => {

        username = data['name'];
        onlinePlayerArr[clientId] = username;
        console.log('Player ' + username + ' connected from '+ clientIp);
         //广播给所有人
        socketIO.emit("PlayerJoinBroadcast",{msg: "<color=yellow>Welcome " + username + " joined YNetwork!</color>"});
    });
    socket.on('ClientSendMessage',(data,callback) => {
        console.log("数据: "+ data['msg']);
         socket.broadcast.emit('ServerMessageReceiver',{msg: data['msg']});
    });
    //断开连接
    socket.on('disconnect', function () {
        username = onlinePlayerArr[clientId];
        console.log('[客户端断开] '+ username + ' left the game.');
        //广播给所有人
        socketIO.emit("PlayerJoinBroadcast",{msg: "<color=yellow>" + username + " left YNetwork!</color>"});
        //console.log(onlinePlayerArr.indexOf(clientId));
       // onlinePlayerArr.splice(clientId,1);
        //console.log(onlinePlayerArr);
    }); 
});
   
