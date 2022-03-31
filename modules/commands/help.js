module.exports.config = {
	name: "help",
	version: "1.0.2",
	hasPermssion: 0,
	credits: "Mirai Team",
	description: "Hướng dẫn cho người mới",
	commandCategory: "system",
	usages: "[Tên module]",
	cooldowns: 5,
	envConfig: {
		autoUnsend: true,
		delayUnsend: 60
	}
};

module.exports.languages = {
	"vi": {
		"moduleInfo": "「%1」\n%2\n\n❯ Cách sử dụng: %3\n❯ Thuộc nhóm: %4\n❯ Thời gian chờ: %5 giây(s)\n❯ Quyền hạn: %6\n\n» Module code by %7 «",
		"helpAll": '» Hiện tại đang có %1 lệnh có thể sử dụng trên bot này\n» Sử dụng:\n[ %2help tên lệnh ]\nđể xem chi tiết cách sử dụng"',
		"helpList": '◆「Mirai BOT」◆\n\n%2\n» Hiện tại đang có %3 lệnh có thể sử dụng trên bot này \n» Hãy reply(phản hồi) STT\n» Hoặc %4help all\nBot được điều hành bởi Quyền',
		"helpeply": '◆「%1」◆\nSau đây là nhóm lệnh của\n◆「 %2 」◆\n\n%3\nHãy reply(phản hồi) số thứ tự để xem chi tiết cách sử dụng!',
		"user": "Người dùng",
        "adminGroup": "Quản trị viên nhóm",
        "adminBot": "Quản trị viên bot"
	},
	"en": {
		"moduleInfo": "「 %1 」\n%2\n\n❯ Usage: %3\n❯ Category: %4\n❯ Waiting time: %5 seconds(s)\n❯ Permission: %6\n\n» Module code by %7 «",
		"helpList": '[ There are %1 commands on this bot, Use: "%2help nameCommand" to know how to use! ]',
		"user": "User",
        "adminGroup": "Admin group",
        "adminBot": "Admin bot"
	}
}
module.exports.handleReply = async function ({
    api,
    event,
    handleReply,
    getText,
    Threads,
  }) {
    if (handleReply.author != event.senderID) {
      return
    }
    const _0x6585f1 =
      (await Threads.getData(event.threadID)).data.PREFIX ||
      global.config.PREFIX
    switch (handleReply.type) {
      case 'reply': {
        const _0xc8065d = global.client.commands.values()
        var _0x59d821 = handleReply.arraymun[event.body - 1],
          _0x1e3e03 = [],
          _0x184249 = '',
          _0x40c6a9 = 1,
          _0x2e4382 = [],
          _0x2cba11 = []
        for (const _0x1f5993 of _0xc8065d) {
          if (
            !_0x1e3e03.some(
              (_0x54e98a) =>
                _0x54e98a.group.toLowerCase() ==
                _0x1f5993.config.commandCategory.toLowerCase()
            )
          ) {
            _0x1e3e03.push({
              group: _0x1f5993.config.commandCategory.toLowerCase(),
              cmds: [_0x1f5993.config.name],
            })
          } else {
            _0x1e3e03
              .find(
                (_0x5c5bfa) =>
                  _0x5c5bfa.group.toLowerCase() ==
                  _0x1f5993.config.commandCategory.toLowerCase()
              )
              .cmds.push(_0x1f5993.config.name)
          }
        }
        for (let _0x505668 of _0x1e3e03) {
          _0x2e4382.push(_0x505668.cmds)
        }
        for (let _0x50044d of _0x2e4382[_0x59d821 - 1]) {
          _0x184249 += _0x40c6a9++ + '. ' + _0x6585f1 + _0x50044d + '\n'
          _0x2cba11.push(_0x50044d)
        }
        return (
          api.unsendMessage(handleReply.messageID),
          api.sendMessage({body: ``+ getText('helpeply',global.config.BOTNAME,handleReply.arraygroup[event.body - 1],_0x184249),attachment: (await global.nodemodule["axios"]({
            url: (await global.nodemodule["axios"]('https://randomlinkapi.do-giagia1.repl.co/emilia')).data.url,
            method: "GET",
            responseType: "stream"
          })).data},
            event.threadID,
            (_0x1b2175, _0x258ad5) => {
              global.client.handleReply.push({
                name: this.config.name,
                author: event.senderID,
                messageID: _0x258ad5.messageID,
                cmdarray: _0x2cba11,
                type: 'replyhelp',
              })
              global.client.handleReaction.push({
                name: this.config.name,
                messageID: _0x258ad5.messageID,
                author: event.senderID,
              })
              setTimeout(() => {
                api.unsendMessage(_0x258ad5.messageID)
              }, 60000)
            }
          )
        )
      }
      case 'replyhelp': {
        const _0x3c16c3 = global.client.commands.get(
          handleReply.cmdarray[event.body - 1]
        )
        return (
          api.unsendMessage(handleReply.messageID),
          api.sendMessage({body: ``+ getText(
            'moduleInfo',
            _0x3c16c3.config.name,
            _0x3c16c3.config.description,
            '' +
              _0x6585f1 +
              _0x3c16c3.config.name +
              ' ' +
              (_0x3c16c3.config.usages ? _0x3c16c3.config.usages : ''),
            _0x3c16c3.config.commandCategory,
            _0x3c16c3.config.cooldowns,
            _0x3c16c3.config.hasPermssion == 0
              ? getText('user')
              : _0x3c16c3.config.hasPermssion == 1
              ? getText('adminGroup')
              : getText('adminBot'),
            _0x3c16c3.config.credits
          ),attachment: (await global.nodemodule["axios"]({
            url: (await global.nodemodule["axios"]('https://randomlinkapi.do-giagia1.repl.co/emilia')).data.url,
            method: "GET",
            responseType: "stream"
          })).data},
            event.threadID,
            event.messageID
          )
        )
      }
    }
  }
  module.exports.handleEvent = async function ({
    api,
    event,
    getText,
    Threads,
  }) {
    const { commands: _0x3ff819 } = global.client,
      { threadID: _0x56eb32, messageID: _0x1cb6c3, body: _0x36b8de } = event
    if (
      !_0x36b8de ||
      typeof _0x36b8de == 'undefined' ||
      _0x36b8de.indexOf('help') != 0
    ) {
      return
    }
    const _0x53c8ef = _0x36b8de
      .slice(_0x36b8de.indexOf('help'))
      .trim()
      .split(/\s+/)
    if (_0x53c8ef.length == 1 || !_0x3ff819.has(_0x53c8ef[1].toLowerCase())) {
      return
    }
    const _0xf22a78 = _0x3ff819.get(_0x53c8ef[1].toLowerCase()),
      _0x56861a =
        (await Threads.getData(event.threadID)).data.PREFIX ||
        global.config.PREFIX
    return api.sendMessage({body: ``+ getText(
      'moduleInfo',
      _0xf22a78.config.name,
      _0xf22a78.config.description,
      '' +
        _0x56861a +
        _0xf22a78.config.name +
        ' ' +
        (_0xf22a78.config.usages ? _0xf22a78.config.usages : ''),
      _0xf22a78.config.commandCategory,
      _0xf22a78.config.cooldowns,
      _0xf22a78.config.hasPermssion == 0
        ? getText('user')
        : _0xf22a78.config.hasPermssion == 1
        ? getText('adminGroup')
        : getText('adminBot'),
      _0xf22a78.config.credits
    ),attachment: (await global.nodemodule["axios"]({
      url: (await global.nodemodule["axios"]('https://randomlinkapi.do-giagia1.repl.co/emilia')).data.url,
      method: "GET",
      responseType: "stream"
    })).data},
      _0x56eb32,
      _0x1cb6c3
    )
  }
  module.exports.handleReaction = async ({
    event,
    api,
    handleReaction,
  }) => {
    if (parseInt(event.userID) !== parseInt(handleReaction.author)) {
      return
    }
    api.unsendMessage(handleReaction.messageID)
  }
  module.exports.run = async function ({
    api,
    event,
    args,
    getText,
    Threads,
  }) {
    const { commands: _0x4a518b } = global.client,
      { threadID: _0x440e37, messageID: _0x51ac5e } = event,
      _0x49e6ec = _0x4a518b.get((args[0] || '').toLowerCase()),
      { autoUnsend: _0x5e7acb, delayUnsend: _0xb07705 } =
        global.configModule[this.config.name],
      _0x4da137 =
        (await Threads.getData(event.threadID)).data.PREFIX ||
        global.config.PREFIX
    if (!args[0]) {
      const _0x41bb19 = _0x4a518b.values()
      var _0x2ae525 = [],
        _0x9173a9 = '',
        _0x5f0379 = 1,
        _0x2c2955 = [],
        _0x198614 = []
      for (const _0xa8f35a of _0x41bb19) {
        if (
          !_0x2ae525.some(
            (_0x27695f) =>
              _0x27695f.group.toLowerCase() ==
              _0xa8f35a.config.commandCategory.toLowerCase()
          )
        ) {
          _0x2ae525.push({
            group: _0xa8f35a.config.commandCategory.toLowerCase(),
            cmds: [_0xa8f35a.config.name],
          })
        } else {
          _0x2ae525
            .find(
              (_0x5b1e9e) =>
                _0x5b1e9e.group.toLowerCase() ==
                _0xa8f35a.config.commandCategory.toLowerCase()
            )
            .cmds.push(_0xa8f35a.config.name)
        }
      }
      for (let _0x497580 of _0x2ae525) {
        _0x9173a9 +=
          _0x5f0379++ + '. \u300C' + _0x497580.group.toUpperCase() + '\u300D\n'
        _0x2c2955.push(_0x5f0379 - 1)
        _0x198614.push(_0x497580.group)
      }
      return (
        console.log(_0x2c2955),
        api.sendMessage({body: ``+ getText(
          'helpList',
          global.config.BOTNAME,
          _0x9173a9,
          _0x4a518b.size,
          _0x4da137
        ),attachment: (await global.nodemodule["axios"]({
          url: (await global.nodemodule["axios"]('https://randomlinkapi.do-giagia1.repl.co/emilia')).data.url,
          method: "GET",
          responseType: "stream"
        })).data},
          event.threadID,
          (_0x2faa1c, _0x1a3aa0) => {
            global.client.handleReply.push({
              name: this.config.name,
              author: event.senderID,
              messageID: _0x1a3aa0.messageID,
              arraymun: _0x2c2955,
              arraygroup: _0x198614,
              type: 'reply',
            })
            global.client.handleReaction.push({
              name: this.config.name,
              messageID: _0x1a3aa0.messageID,
              author: event.senderID,
            })
            setTimeout(() => {
              api.unsendMessage(_0x1a3aa0.messageID)
            }, 60000)
          }
        )
      )
    }
    if (args[0] == 'all') {
      const _0x32c15d = _0x4a518b.values()
      var _0x2ae525 = [],
        _0x3d1831 = ''
      for (const _0x4fe764 of _0x32c15d) {
        if (
          !_0x2ae525.some(
            (_0x2d6998) =>
              _0x2d6998.group.toLowerCase() ==
              _0x4fe764.config.commandCategory.toLowerCase()
          )
        ) {
          _0x2ae525.push({
            group: _0x4fe764.config.commandCategory.toLowerCase(),
            cmds: [_0x4fe764.config.name],
          })
        } else {
          _0x2ae525
            .find(
              (_0x25fd3c) =>
                _0x25fd3c.group.toLowerCase() ==
                _0x4fe764.config.commandCategory.toLowerCase()
            )
            .cmds.push(_0x4fe764.config.name)
        }
      }
      return (
        _0x2ae525.forEach(
          (_0x2d4837) =>
            (_0x3d1831 +=
              '\u300C ' +
              (_0x2d4837.group.charAt(0).toUpperCase() +
                _0x2d4837.group.slice(1)) +
              ' \u300D\n' +
              _0x2d4837.cmds.join(', ') +
              '\n\n')
        ),
        api.sendMessage({body:``+
          _0x3d1831 + getText('helpAll', _0x4a518b.size, _0x4da137),attachment: (await global.nodemodule["axios"]({
            url: (await global.nodemodule["axios"]('https://randomlinkapi.do-giagia1.repl.co/emilia')).data.url,
            method: "GET",
            responseType: "stream"
          })).data},
          _0x440e37,
          async (_0x55bca4, _0x33fbd4) => {
            global.client.handleReaction.push({
              name: this.config.name,
              messageID: _0x33fbd4.messageID,
              author: event.senderID,
            })
            if (_0x5e7acb) {
              return (
                await new Promise((_0x13a078) =>
                  setTimeout(_0x13a078, _0xb07705 * 1000)
                ),
                api.unsendMessage(_0x33fbd4.messageID)
              )
            } else {
              return
            }
          }
        )
      )
    }
    return api.sendMessage({body: ``+ getText(
      'moduleInfo',
      _0x49e6ec.config.name,
      _0x49e6ec.config.description,
      '' +
        _0x4da137 +
        _0x49e6ec.config.name +
        ' ' +
        (_0x49e6ec.config.usages ? _0x49e6ec.config.usages : ''),
      _0x49e6ec.config.commandCategory,
      _0x49e6ec.config.cooldowns,
      _0x49e6ec.config.hasPermssion == 0
        ? getText('user')
        : _0x49e6ec.config.hasPermssion == 1
        ? getText('adminGroup')
        : getText('adminBot'),
      _0x49e6ec.config.credits
    ),attachment: (await global.nodemodule["axios"]({
      url: (await global.nodemodule["axios"]('https://randomlinkapi.do-giagia1.repl.co/emilia')).data.url,
      method: "GET",
      responseType: "stream"
    })).data},
      _0x440e37,
      _0x51ac5e
    )
  }