console.time("[INFO] Done");
console.log("-----简易游戏后端服务器Demo-----");
let config = require("./config/config.json");
let port = config.port;
let socketIO = require('socket.io')(port);
//let playerEvent = require("./events/playerEvent");
let route = require('./route.js');
new route(socketIO);
let generator = new require('./map/generator.js');
new generator();
console.log('[INFO] Server is running on 127.0.0.1:' + port);
console.timeEnd("[INFO] Done");
//