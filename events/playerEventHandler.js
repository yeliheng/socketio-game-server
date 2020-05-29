let onlinePlayerObj = {};
//玩家加入
function onPlayerJoin(socketIO,socket){
    let clientId = socket.id;
    let clientIp = socket.conn.remoteAddress;
    socket.on('PlayerJoin',(data,callback) => {
        username = data['name'];
        onlinePlayerObj[clientId] = username;
      //  onlinePlayerArr[clientId] = username;
        console.log('Player ' + username + ' connected from '+ clientIp);
            //广播给所有人
        socketIO.emit("PlayerJoinBroadcast",{
            msg: "<color=yellow>Welcome " + username + " joined YNetwork!</color>",
            playerName: username
        });
        console.log(onlinePlayerObj);
    });
    //socketIO.emit('ServerBroadcast',)
       
}
//玩家离开
function onPlayerLeft(socketIO,socket){
    let clientId = socket.id;
    let clientIp = socket.conn.remoteAddress;
    socket.on('disconnect', function () {
        username = onlinePlayerObj[clientId];
        console.log('[客户端断开] '+ username + ' left the game.');
        //广播给所有人
        socketIO.emit("PlayerLeftBroadcast",{
            msg: "<color=yellow>" + username + " left YNetwork!</color>",
            playerName: username
        });
        delete onlinePlayerObj[clientId];
        console.log(onlinePlayerObj);
    }); 
}
//获取所有在线玩家
function getOnlinePlayers(socket){
    socket.emit("OnlinePlayers",{
        list: onlinePlayerObj
    });
}

module.exports = {
    onPlayerJoin,
    onPlayerLeft,
    getOnlinePlayers
   };