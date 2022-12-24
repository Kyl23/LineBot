// 引用linebot SDK
import linebot from 'linebot';
import fs from 'fs';
import MessageParse from './MessageParser/index.js'

// 用於辨識Line Channel的資訊
const bot = linebot(JSON.parse(fs.readFileSync("./botconfig.json", 'utf-8')));

let config = JSON.parse(fs.readFileSync("./config.json", 'utf-8'));

const state_config = {
    "config": config,
    "state": {},
    "reserve": {}
}

let freeStateInterval = 7200000;
setInterval(() => {
    for (let key in state_config.state) {
        if (Date.now() - state_config.state[key].time >= freeStateInterval) {
            delete state_config.state[key]
        }
    }
}, freeStateInterval)  // 2 hours 

// 當有人傳送訊息給Bot時
bot.on('message', function (event) {
    MessageParse(event, bot.push, state_config);
});

// bot.push("U5ccc12af9b134bf3488ef6ad89bcb3b7",["不知道line要做什麼好嘞怎麼辦"])
// bot.push("Ue2688708cb13e1188681634a5509878f",["看得到嗎"])

// Bot所監聽的webhook路徑與port
bot.listen('/webhook/line', 3000, function () {
    console.log('[BOT已準備就緒]');
});