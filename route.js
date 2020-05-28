//"伪路由 不是真正意义上的路由"
let playerEvents = require("./events/playerEventHandler");
let chatEvents = require("./events/chatEventHandler");
class Route{
    constructor(socketIO){
        socketIO.on('connection',function(socket){
            let clientId = socket.id;
            let clientIp = socket.conn.remoteAddress;
            console.log('[连接建立] Client ID: ' + clientId);
            //事件组
            playerEvents.onPlayerJoin(socketIO,socket);
            playerEvents.onPlayerLeft(socketIO,socket);
            chatEvents.onChat(socket);
        }); 
        console.log("[系统] 路由引导完成");
    }
}
module.exports=Route;