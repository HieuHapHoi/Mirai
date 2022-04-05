const bonus = 1000
const timeUnsend = 5 
const axios = global.nodemodule["axios"];
module.exports.config = {
    name: "dhbc",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "HieuHapHoi",
    description: "dhbc",
    commandCategory: "Game",
    usages: "[name]",
    cooldowns: 0
};


module.exports.handleReply = async function({event, api, handleReply,Currencies}) {
    var { tukhoa, suggestions, author } = handleReply;
  if(event.senderID != author) {
    api.sendMessage("» Bạn không có quyền trả lời câu hỏi này", event.threadID, event.messageID);
  }
    switch (handleReply.type) {
        case "reply": {
            const dapan1 = event.body
            if (dapan1.toLowerCase() == "gợi ý") { 
                api.sendMessage(`Gợi ý : ${suggestions}`, event.threadID, event.messageID) 
            }   else {
                
            if (dapan1.toLowerCase() == tukhoa) {
                await Currencies.increaseMoney(event.senderID, parseInt(bonus));
                setTimeout(function () {
                    api.unsendMessage(handleReply.messageID);
                }, timeUnsend*1000);
                return api.sendMessage(`» Chúc mừng bạn đã trả lời chính xác và được cộng thêm ${bonus}$!\n» Đáp án: ${tukhoa}`, event.threadID, event.messageID)
            } else
                return api.sendMessage(`» Sai rồi hãy thử lại nào!`, event.threadID, event.messageID)
    }
    }
    default: break;
        
    }
    
            const res = await axios.get(`https://api.nguyenmanh.name.vn/game/dhbcv2`)
            const dataGame = res.data
            const tukhoadung = dataGame.tukhoa;
            const goiy = dataGame.suggestions
            const fs = global.nodemodule["fs-extra"];
            const sokitu = dataGame.sokitu;
            const anh1 = dataGame.link1
            const anh2 = dataGame.link2


            let Avatar = (await axios.get(anh1, {
                responseType: "arraybuffer"
            })).data;
            fs.writeFileSync(__dirname + "/cache/anh1.png", Buffer.from(Avatar, "utf-8"));
            let Avatar2 = (await axios.get(anh2, {
                responseType: "arraybuffer"
            })).data;
            fs.writeFileSync(__dirname + "/cache/anh2.png", Buffer.from(Avatar2, "utf-8"));
            var imglove = [];
            imglove.push(fs.createReadStream(__dirname + "/cache/anh1.png"));
            imglove.push(fs.createReadStream(__dirname + "/cache/anh2.png"));

            var msg = {
                body: `» Reply tin nhắn này để trả lời câu hỏi. \n» Reply "Gợi ý" để xem gợi ý\n${sokitu}`,
                attachment: imglove
            }
            return api.sendMessage(msg, event.threadID, (error, info) => {
                global.client.handleReply.push({
                    type: "reply",
                    name: this.config.name,
                    author: event.senderID,
                    messageID: info.messageID,
                    tukhoa: tukhoadung,
                    suggestions: goiy
                })
            })
            
        }
        



module.exports.run = async function ({ api, event }) {
   
            const res = await axios.get(`https://api.nguyenmanh.name.vn/game/dhbcv2`);
            
            const dataGame = res.data
            const tukhoadung = dataGame.tukhoa;
            const goiy = dataGame.suggestions
            const fs = global.nodemodule["fs-extra"];
            const sokitu = dataGame.sokitu;
            const anh1 = dataGame.link1
            const anh2 = dataGame.link2


            let Avatar = (await axios.get(anh1, {
                responseType: "arraybuffer"
            })).data;
            fs.writeFileSync(__dirname + "/cache/anh1.png", Buffer.from(Avatar, "utf-8"));
            let Avatar2 = (await axios.get(anh2, {
                responseType: "arraybuffer"
            })).data;
            fs.writeFileSync(__dirname + "/cache/anh2.png", Buffer.from(Avatar2, "utf-8"));
            var imglove = [];
            imglove.push(fs.createReadStream(__dirname + "/cache/anh1.png"));
            imglove.push(fs.createReadStream(__dirname + "/cache/anh2.png"));

            var msg = {
                body: `» Reply tin nhắn này để trả lời câu hỏi. \n» Reply "Gợi ý" để xem gợi ý\n${sokitu}`,
                attachment: imglove
            }
            return api.sendMessage(msg, event.threadID, (error, info) => {
                global.client.handleReply.push({
                    type: "reply",
                    name: this.config.name,
                    author: event.senderID,
                    messageID: info.messageID,
                    tukhoa: tukhoadung,
                    suggestions: goiy
                })
            })    
    }
