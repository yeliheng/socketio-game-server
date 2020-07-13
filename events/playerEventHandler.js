let onlinePlayerObj = {};
let mapObj = require('../map/level.json');
//玩家加入
function onPlayerJoin(socketIO,socket){
    let clientId = socket.id;
    let clientIp = socket.conn.remoteAddress;
    socket.on('PlayerJoin',(data,callback) => {
        username = data['name'];
        onlinePlayerObj[clientId] = username;
      //  onlinePlayerArr[clientId] = username;
        console.log('[INFO] Player ' + username + ' connected from '+ clientIp);
            //广播给所有人
        socketIO.emit("PlayerJoinBroadcast",{
            msg: "<color=yellow>Welcome " + username + " joined YNetwork!</color>",
            playerName: username
        });
        //console.log(onlinePlayerObj);
    });
    //socketIO.emit('ServerBroadcast',)
       
}
//玩家离开
function onPlayerLeft(socketIO,socket){
    let clientId = socket.id;
    let clientIp = socket.conn.remoteAddress;
    socket.on('disconnect', function () {
        username = onlinePlayerObj[clientId];
        console.log('[INFO] '+ username + ' left the game.');
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
//玩家移动事件
function onPlayerMove(socket){
    //将玩家的移动广播给所有玩家
    //客户端实现同步
    let username;
    let x,y;
    socket.on("MoveSync",(data,callback) => {
        username = data['username'];
        x = data['x'];
        y = data['y'];
        //console.log("[调试] username:" + username + "x: " + x + " y: " + y);
        //将数据广播给除sender外的所有玩家
        socket.broadcast.emit("MovementReceiver",{
            username: username,
            x: x,
            y: y
        });
    });
}
//发送地图给玩家
function getMaps(socket){
    socket.on('getMaps',(callback) =>{
        console.log("客户端请求地图");
        callback(mapObj);
       // console.log(callback);
    });
}
module.exports = {
    onPlayerJoin,
    onPlayerLeft,
    getOnlinePlayers,
    onPlayerMove,
    getMaps
   };