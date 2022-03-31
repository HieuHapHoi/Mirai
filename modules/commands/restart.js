module.exports.config = {
	name: "restart",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "manhIT",
	description: "Khởi động lại Bot",
	commandCategory: "SYSTEM",
	usages: "",
	cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
	
	return api.sendMessage(`Đã restart thành công. Vui lòng đợi 1 phút để tiếp tục sử dụng lệnh`, event.threadID, () => process.exit(1));
}