console.time("Done");
console.log("-----简易游戏后端服务器Demo-----");
let port = 19132;
let socketIO = require('socket.io')(port);
console.log('Server is running on 127.0.0.1:' + port);
console.timeEnd("Done");
//连接
socketIO.on('connection',function(socket){
    let clientId = socket.id;
    let clientIp = socket.conn.remoteAddress;
    console.log('[连接建立]IP Address' + clientIp + ' Client ID: ' + clientId);
    //断开连接
    socket.on('disconnect', function () {
        console.log('[客户端断开] ID: ' + clientId);
    });
});
