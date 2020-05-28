function onChat(socket){
    socket.on('ClientSendMessage',(data,callback) => {
        console.log("[聊天] "+ data['msg']);
            socket.broadcast.emit('ServerMessageReceiver',{msg: data['msg']});
    });
}
module.exports = {
    onChat
   };