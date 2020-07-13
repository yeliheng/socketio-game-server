let config = require("../config/config.json");
let fs = require('fs');
let type = config.map.type;
let rawData = [];
class Generator{
    constructor(){
        switch(type){
            case "FLAT":
               fs.exists(__dirname + '/level.json',function (exists){
                    if(exists){
                        console.log('[INFO] 地图加载成功');
                    }else{
                        console.log('[INFO] 正在创建地图...'); 
                        for(let x = 1; x < 50; x ++){
                            for(let y = 1 ; y <= x; y ++){
                                rawData.push({
                                    "x": x,
                                    "y": y,
                                    "block": 1
                                });
                            }
                        }
                    let data = JSON.stringify(rawData);
                    fs.writeFile(__dirname + '/level.json',data,function(error){
                        if (error) {
                            console.log('[ERROR] 地图创建失败: ' + error.message);
                          } else {
                            console.log('[INFO] 地图创建成功');
                          }
                    });
                    }
               });
            break;
        }
    }
}
module.exports=Generator;