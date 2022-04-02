module.exports.config = {
  name: "upt",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "Mirai Team",
  description: "Xem thông tin thời gian sử dụng gấu",
  commandCategory: "system",
  cooldowns: 1,
  dependencies: {
    "systeminformation": "",
    "pidusage": ""
  }
};

function byte2mb(bytes) {
  const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let l = 0, n = parseInt(bytes, 10) || 0;
  while (n >= 1024 && ++l) n = n / 1024;
  return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)}${units[l]}`;
}

module.exports.run = async function ({ api, event, Threads }) {
  const { time, cpu } = global.nodemodule["systeminformation"];
  const timeStart = Date.now();
 

  try {
    const pidusage = await global.nodemodule["pidusage"](process.pid);
    var { uptime } = await time();
    var hours = Math.floor(uptime / (60 * 60));
    var minutes = Math.floor((uptime % (60 * 60)) / 60);
    var seconds = Math.floor(uptime % 60);
    const threadSetting = (await Threads.getData(String(event.threadID))).data || {};
    const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;

    const fs = require("fs");
    const axios = require("axios");
    const request = require("request");
    const res = await axios.get('https://RandomLinkAPI.do-giagia1.repl.co/emiliaimage');
    const image = res.data.url

    let callback = function(){
        api.sendMessage({
			body: "●─●Emilia●─●"+
      "\n» Bot name : " + global.config.BOTNAME +
      "\n» Prefix bot : " + global.config.PREFIX + 
      "\n» Prefix box : " + prefix +
      "\n» Thời gian hoạt động: " + hours + ":" + minutes + ":" + seconds +
      "\n» Tổng người dùng: " + global.data.allUserID.length +
      "\n» Tổng nhóm: "+ global.data.allThreadID.length +
      "\n» Ram sử dụng: " + byte2mb(pidusage.memory) +
      "\n» Ping: " + (Date.now() - timeStart) + "ms" + 
      "\n●──●End●──●",
			attachment: fs.createReadStream(__dirname + `/cache/emilia.jpg`)
		  }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/emilia.jpg`), event.messageID);
    }

    request(image).pipe(fs.createWriteStream(__dirname + `/cache/emilia.jpg`)).on("close", callback);
}
    
catch (e) {
    console.log(e)
  }
}


