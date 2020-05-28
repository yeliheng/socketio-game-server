let config = require("../config/config.json");
let schedule = require("node-schedule");
function onScheduleBroadcaster(socketIO){
    let message = config.broadcast.message;
    let opened = config.broadcast.opened;
    let timer = config.broadcast.timer;
    let scheduleStr = timer + ' * * * * *';
    if(opened){
        schedule.scheduleJob(scheduleStr,function(){
            console.log(message);
            socketIO.emit('ServerMessageReceiver',{msg: message});
        });
    }
}
module.exports = {
    onScheduleBroadcaster
}