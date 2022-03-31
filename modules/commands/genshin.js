module.exports.config = {
    name: "genshin",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Kaneki", //mod by teri
    description: "romdom ảnh về nhân vật game ghenshin",
    commandCategory: "IMAGE",
    usages: "genshin",
    cooldowns: 5,
    dependencies: {
      "request":"",
      "fs-extra":"",
      "axios":""
    }
  }
  
  module.exports.run = async({api,event,args,client,Users,Threads,__GLOBAL,Currencies,getText}) => {
     
     const axios = require('axios');
      const request = require('request');
      const fs = require('fs-extra');
  
       if (args.length == 0) return api.sendMessage(`🖼️Danh sách các ảnh hiện có\n👉 raidenshogun\n👉 yunjin\n👉 yae\n👉 mona\n👉 yoimiya\n👉 hutao\n👉 ganyu\nDùng prefix <dấu lệnh> + tên  < ảnh bạn cần xem >\n
  `, event.threadID, event.messageID);
  
       if (args[0] == "mona") {
    axios.get('https://mona.feedheavens.repl.co').then(res => {
    var image = res.data.data;
    let callback = function () {
            api.sendMessage({
              body: `Ảnh Mona đây:`,
              attachment: fs.createReadStream(__dirname + `/cache/boobs.png`)
            }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/boobs.png`), event.messageID);
          };
          request(image).pipe(fs.createWriteStream(__dirname + `/cache/boobs.png`)).on("close", callback);
        })
    }
      if (args[0] == "hutao") {
    axios.get('https://hutao.feedheavens.repl.co').then(res => {
    var image = res.data.data;
    let callback = function () {
            api.sendMessage({
              body: `Ảnh Hutao:`,
              attachment: fs.createReadStream(__dirname + `/cache/boobs.png`)
            }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/boobs.png`), event.messageID);
          };
          request(image).pipe(fs.createWriteStream(__dirname + `/cache/boobs.png`)).on("close", callback);
          Currencies.setData(event.senderID, options = {money: money - 100})
        })
    }
    if (args[0] == "ganyu") {
    axios.get('https://ganyu.feedheavens.repl.co').then(res => {
    var image = res.data.data;
    let callback = function () {
            api.sendMessage({
              body: `Ảnh Ganyu:`,
              attachment: fs.createReadStream(__dirname + `/cache/boobs.png`)
            }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/boobs.png`), event.messageID);
          };
          request(image).pipe(fs.createWriteStream(__dirname + `/cache/boobs.png`)).on("close", callback);
        })
    }
    if (args[0] == "yoimiya") {
    axios.get('https://yoimiya.feedheavens.repl.co').then(res => {
    var image = res.data.data;
    let callback = function () {
            api.sendMessage({
              body: `Ảnh Yoimiya đây:`,
              attachment: fs.createReadStream(__dirname + `/cache/boobs.png`)
            }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/boobs.png`), event.messageID);
          };
          request(image).pipe(fs.createWriteStream(__dirname + `/cache/boobs.png`)).on("close", callback);
        })
    }
    if (args[0] == "yae") {
    axios.get('https://Guuji-Yae.feedheavens.repl.co').then(res => {
    var image = res.data.data;
    let callback = function () {
            api.sendMessage({
              body: `Ảnh Yae đây:`,
              attachment: fs.createReadStream(__dirname + `/cache/boobs.png`)
            }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/boobs.png`), event.messageID);
          };
          request(image).pipe(fs.createWriteStream(__dirname + `/cache/boobs.png`)).on("close", callback);
        })
    }
    if (args[0] == "yunjin") {
    axios.get('https://Yunjin.feedheavens.repl.co').then(res => {
    var image = res.data.data;
    let callback = function () {
            api.sendMessage({
              body: `Ảnh Yunjin đây:`,
              attachment: fs.createReadStream(__dirname + `/cache/boobs.png`)
            }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/boobs.png`), event.messageID);
          };
          request(image).pipe(fs.createWriteStream(__dirname + `/cache/boobs.png`)).on("close", callback);
        })
    }
    if (args[0] == "raidenshogun") {
    axios.get('https://Raiden-Shogun.feedheavens.repl.co').then(res => {
    var image = res.data.data;
    let callback = function () {
            api.sendMessage({
              body: `Ảnh Raiden Shogun đây`,
              attachment: fs.createReadStream(__dirname + `/cache/boobs.png`)
            }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/boobs.png`), event.messageID);
          };
          request(image).pipe(fs.createWriteStream(__dirname + `/cache/boobs.png`)).on("close", callback);
        })
    }
}