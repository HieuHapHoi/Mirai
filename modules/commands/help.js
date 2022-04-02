module.exports.config = {
  name: "help",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Mirai Team Mod By Kadeer", // fix DuyVuong
  description: "Hướng dẫn cho người mới",
  commandCategory: "Danh sách lệnh",
  usages: "[Tên module]",
  cooldowns: 5,
  envConfig: {
    autoUnsend: true,
    delayUnsend: 120,
  }
};

module.exports.handleEvent = function ({ api, event }) {
    const axios = require('axios');
    const request = require('request');
    const fs = require("fs");
    const { commands } = global.client;
    const { threadID, messageID, body } = event;
    if (!body || typeof body == "undefined" || body.indexOf("help") != 0) return;
    const splitBody = body.slice(body.indexOf("help")).trim().split(/\s+/);
    if (splitBody.length == 1 || !commands.has(splitBody[1].toLowerCase())) return;
    const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
    const command = commands.get(splitBody[1].toLowerCase());
    const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
        return axios.get('https://RandomLinkAPI.do-giagia1.repl.co/emiliaimage').then(res => {
    let callback = function () {
   
          api.sendMessage({body:` » Lệnh: ${command.config.name}
» Thực thi: ${command.config.description}
» Cách sử dụng: ${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : "Chưa có hướng dẫn cụ thể"}
» Thời gian chờ: ${command.config.cooldowns}
» Quyền hạn: ${((command.config.hasPermssion == 0) ? `Người dùng` : (command.config.hasPermssion == 1) ? `Quản trị viên nhóm` : `Quản trị viên BOT`)}
» Credit: ${command.config.credits}`,
            attachment: fs.createReadStream(__dirname + `/cache/emilia.jpg`)
        }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/emilia.jpg`), event.messageID);
        }; request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/emilia.jpg`)).on("close", callback);
     });
}

module.exports.run = function({ api, event, args }) {
    const axios = require('axios');
    const request = require('request');
    const fs = require("fs-extra");
    const { commands } = global.client;
    const { threadID, messageID } = event;
    const command = commands.get((args[0] || "").toLowerCase());
    const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
    const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
    const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
  if (args[0] == "all") {
    const command = commands.values();
    var group = [], msg = "";
    for (const commandConfig of command) {
      if (!group.some(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase())) group.push({ group: commandConfig.config.commandCategory.toLowerCase(), cmds: [commandConfig.config.name] });
      else group.find(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase()).cmds.push(commandConfig.config.name);
    }
    group.forEach(commandGroup => msg += `» ${commandGroup.group.charAt(0).toUpperCase() + commandGroup.group.slice(1)}\n${commandGroup.cmds.join(', ')}\n\n`);
    return axios.get('https://RandomLinkAPI.do-giagia1.repl.co/emiliaimage').then(res => {
    let callback = function () {
        api.sendMessage({ body:` >> DANH SÁCH CÁC LỆNH <<\n` + msg + `» Số lệnh hiện có: ${commands.size}\n » ADMIN: ${global.config.ADMINBOT} `,
            attachment: fs.createReadStream(__dirname + `/cache/emilia2.jpg`)
        }, event.threadID, (err, info) => {
        fs.unlinkSync(__dirname + `/cache/emilia2.jpg`);
        if (autoUnsend == true) {
            setTimeout(() => {
                return api.unsendMessage(info.messageID);
            }, delayUnsend * 2000);
        }
        else return;
    }, event.messageID);
        }
         request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/472.${ext}`)).on("close", callback);
     })
};
if (!command) {
    const commandsPush = [];
    const page = parseInt(args[0]) || 1;
    const pageView = 20;
    let i = 0;
    let msg = ">> DANH SACHS CÁC LỆNH <<\n";
    for (var [name, value] of (commands)) {
        name += `
» ${value.config.description}
» Thời gian chờ: ${value.config.cooldowns}s
» Quyền hạn: ${((value.config.hasPermssion == 0) ? `Người dùng` : (value.config.hasPermssion == 1) ? `Quản trị viên nhóm` : `Quản trị viên BOT`)}\n`;
        commandsPush.push(name);
    }

    commandsPush.sort((a, b) => a.data - b.data);

    const first = pageView * page - pageView;
    i = first;
    const helpView = commandsPush.slice(first, first + pageView);

    for (let cmds of helpView)
        msg += `👻${++i}👾 - ${cmds}\n`;
    const cmdsView = `
» Trang ${page}/${Math.ceil(commandsPush.length/pageView)}
» Hiện tại có ${commandsPush.length} lệnh có thể sử dụng
» HDSD: ${prefix}help <Số trang/all>`;
    return axios.get('https://RandomLinkAPI.do-giagia1.repl.co/emiliaimage').then(res => {
    let ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
    let callback = function () {
        api.sendMessage({body: msg + cmdsView, attachment: fs.createReadStream(__dirname + `/cache/emilia3.jpg`)
        }, event.threadID, (err, info) => {
        fs.unlinkSync(__dirname + `/cache/emilia3.jpg`);
        if (autoUnsend == true) {
            setTimeout(() => {
                return api.unsendMessage(info.messageID);
            }, delayUnsend * 2000);
        }
        else return;
        }, event.messageID);
    }
        request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/emilia3.jpg`)).on("close", callback);
     })
};
return axios.get('https://RandomLinkAPI.do-giagia1.repl.co/emiliaimage').then(res => {
    let ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
    let callback = function () {
        api.sendMessage({body:`
» Lệnh: ${command.config.name}
» Miêu tả: ${command.config.description}
» Cách sử dụng: ${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : "Chưa có hướng dẫn cụ thể"}
» Thời gian chờ: ${command.config.cooldowns}
» Quyền hạn: ${((command.config.hasPermssion == 0) ? `Người dùng` : (command.config.hasPermssion == 1) ? `Quản trị viên nhóm` : `Quản trị viên BOT`)}
» Credit: ${command.config.credits}`,
        attachment: fs.createReadStream(__dirname + `/cache/emilia4.jpg`)
        }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/emilia4.jpg`), event.messageID);
        }; request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/emilia4.jpg`)).on("close", callback);
     })
}; 