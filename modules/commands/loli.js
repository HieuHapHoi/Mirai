module.exports.config = {
	name: "loli", 
	version: "1.0.0",
	hasPermssion: 0,
	credits: "HieuHapHoi", 
	description: "Loli Image",
	commandCategory: "IMAGE",
	usages: "loli",
	cooldowns: 5, 
};

module.exports.run = async function({ api, event }) {
	
	const axios = require("axios");
	const res = await axios.get("https://api-jrt.j-jrt-official.repl.co/loli.php");
	const request = require("request");
	const fs = require("fs");

    let image = res.data.data;

	let callback = function(){
        api.sendMessage({
			body: `───EMILIA───\n» Ảnh loli của bạn đây:`,
			attachment: fs.createReadStream(__dirname + `/cache/loli.jpg`)
		  }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/loli.jpg`), event.messageID);
    }

    request(image).pipe(fs.createWriteStream(__dirname + `/cache/loli.jpg`)).on("close", callback);

}