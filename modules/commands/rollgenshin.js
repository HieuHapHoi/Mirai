module.exports.config = {
	name: "rollgenshin", // Tên lệnh, được sử dụng trong việc gọi lệnh
	version: "1.0.0", // phiên bản của module này
	hasPermssion: 0, // Quyền hạn sử dụng, với 0 là toàn bộ thành viên, 1 là quản trị viên trở lên, 2 là admin/owner
	credits: "HieuHapHoi", // Công nhận module sở hữu là ai
	description: "Gacha is da bezt", // Thông tin chi tiết về lệnh
	commandCategory: "GAME", // Thuộc vào nhóm nào: system, other, game-sp, game-mp, random-img, edit-img, media, economy, ...
	usages: "rollgenshin", // Cách sử dụng lệnh
	cooldowns: 5, // Thời gian một người có thể lặp lại lệnh
};

module.exports.run = async function({ api, event }) {
	
	const axios = require('axios');
	const request = require('request');
	const fs = require("fs-extra")
	const res = await axios.get(`https://jrt-api.j-jrt-official.repl.co/genshin`);
	
	let image = res.data.data

	let callback = function() {

		api.sendMessage({
			body: `💕✦Chúc mừng bạn đã roll thành công✦💕\n» Đến lúc kiểm tra vận may rồi ♬ «`,
			attachment: fs.createReadStream(__dirname + `/cache/genshin.mp4`)
		}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/genshin.mp4`), event.messageID);

	}

	request(image).pipe(fs.createWriteStream(__dirname + `/cache/genshin.mp4`)).on('close', callback);

}