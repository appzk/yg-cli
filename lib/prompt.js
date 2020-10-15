const inquirer = require('inquirer'); // 常用的交互式命令行用户界面的集合。表现是控制台输出提问
const utils = require('../lib/utils');
// 获得了参数，可以在这里做响应的业务处理
function blnExistChannelServer(x) {
  if (!!x && x.indexOf(':') != -1) {
    return true;
  }
  return false;
}

var prompList = [
  {
    type: 'input',
    message: '请输入<渠道:环境>,默认为空',
    name: 'channelserver',
  },
  {
    type: 'list',
    message: '请选择渠道名称',
    name: 'channel',
    choices: async function() {
      return await utils.getChannels();
    },
    //['www','ygego', 'aode', 'changsha', 'zyzt', 'slgf', 'czyg', 'xdhb'],
    default: 'www',
    when: res => !Boolean(blnExistChannelServer(res.channelserver)),
  },
  {
    type: 'list',
    message: '测试环境',
    name: 'server',
    choices: async function() {
      return await utils.getEnvs();
    },
    default: 'alpha',
    when: res => !Boolean(blnExistChannelServer(res.channelserver)),
  },
];

module.exports = prompList;
