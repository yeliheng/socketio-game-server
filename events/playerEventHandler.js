let onlinePlayerArr = [];
function onPlayerJoin(socketIO,socket){
    let clientId = socket.id;
    let clientIp = socket.conn.remoteAddress;
    socket.on('PlayerJoin',(data,callback) => {
        username = data['name'];
        onlinePlayerArr[clientId] = username;
        console.log('Player ' + username + ' connected from '+ clientIp);
            //广播给所有人
        socketIO.emit("PlayerJoinBroadcast",{msg: "<color=yellow>Welcome " + username + " joined YNetwork!</color>"});
    });
    //socketIO.emit('ServerBroadcast',)
        
}
function onPlayerLeft(socketIO,socket){
    let clientId = socket.id;
    let clientIp = socket.conn.remoteAddress;
    socket.on('disconnect', function () {
        username = onlinePlayerArr[clientId];
        console.log('[客户端断开] '+ username + ' left the game.');
        //广播给所有人
        socketIO.emit("PlayerJoinBroadcast",{msg: "<color=yellow>" + username + " left YNetwork!</color>"});
        //console.log(onlinePlayerArr.indexOf(clientId));
        // onlinePlayerArr.splice(clientId,1);
        //console.log(onlinePlayerArr);
    }); 
}

module.exports = {
    onPlayerJoin,
    onPlayerLeft
   };