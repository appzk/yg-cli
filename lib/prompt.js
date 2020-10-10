const inquirer = require('inquirer'); // 常用的交互式命令行用户界面的集合。表现是控制台输出提问
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
    choices: ['ygego', 'aode', 'changsha', 'zyzt', 'slgf', 'czyg', 'xdhb'],
    default: 'ygego',
    when: res => !Boolean(blnExistChannelServer(res.channelserver)),
  },
  {
    type: 'list',
    message: '测试环境',
    name: 'server',
    choices: [
      'alpha',
      'alpha1',
      'alpha2',
      'alpha3',
      'alpha4',
      'test1',
      'test2',
      'test3',
      'test4',
      'test5',
      'beta',
      'beta1',
      'beta2',
      'beta3',
    ],
    default: 'alpha',
    when: res => !Boolean(blnExistChannelServer(res.channelserver)),
  },
];

module.exports = prompList;
