module.exports.config = {
	name: "cosplay", 
	version: "1.0.0",
	hasPermssion: 0,
	credits: "HieuHapHoi", 
	description: "Cosplay Image",
	commandCategory: "IMAGE",
	usages: "cosplay",
	cooldowns: 5, 
};

module.exports.run = async function({ api, event }) {
	
	const axios = require("axios");
	const request = require("request");
	const res = await axios.get("https://jrt-api.j-jrt-official.repl.co/cosplay");
	const fs = require("fs-extra");

	let image = res.data.data
	
	let callback = function() {
		api.sendMessage({
			body: `───EMILIA───\n» Ảnh cosplay của bạn đây:`,
			attachment: fs.createReadStream(__dirname + `/cache/cosplay.jpg`)
		  }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/cosplay.jpg`), event.messageID);
	}

	request(image).pipe(fs.createWriteStream(__dirname + `/cache/cosplay.jpg`)).on("close", callback);

}