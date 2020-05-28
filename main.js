console.time("Done");
console.log("-----简易游戏后端服务器Demo-----");
let port = 19132;
let socketIO = require('socket.io')(port);
//let playerEvent = require("./events/playerEvent");
let route = require('./route.js');
new route(socketIO);
console.log('Server is running on 127.0.0.1:' + port);
console.timeEnd("Done");