const which = require('which');
const childProcess = require('child_process');
const exists = require('fs').existsSync; // node自带的fs模块下的existsSync方法，用于检测路径是否存在。（会阻塞）
const chalk = require('chalk'); // 用于高亮终端打印出的信息(命令行字体颜色)

exports.Install = function() {
  var npm = findNpm();
  this.runCmd(which.sync(npm), ['install'], function() {
    console.log(npm + ' install end');
  });
};
// 查找系统中用于安装依赖包的命令
exports.findNpm = function() {
  var npms = ['cnpm', 'npm'];
  for (var i = 0; i < npms.length; i++) {
    try {
      // 查找环境变量下指定的可执行文件的第一个实例
      which.sync(npms[i]);
      console.log('use npm: ' + npms[i]);
      return npms[i];
    } catch (e) {
      console.warn(e);
    }
  }
  throw new Error(chalk.red('please install npm'));
};

exports.runUmi = function(channelName, channelServer) {
  process.env.YG_CHANNEL = channelName;
  process.env.YG_ENV = channelServer;
  // process.env.env=channelName;
  // process.env.PORT = 8701;
  process.env.NODE_ENV = 'development';
  this.runCmd(
    which.sync('./node_modules/.bin/egg-bin'),
    ['dev', '--port=8701', `--YG_ENV=${channelServer}`, '--env=ygego'],
    function() {
      console.log('umi:%j dev end', channelName);
    }
  );
  // PORT=8701 NODE_ENV=development egg-bin dev --sticky
  //  --YG_ENV=alpha --env=ygego --port=8701
};

exports.runStart = function() {
  process.env.NODE_ENV = 'production';
  //     "start": "cross-env egg-scripts start --daemon --title=portal-saas-ssr",
  //     "debug": "cross-env RM_TMPDIR=none COMPRESS=none egg-bin debug",

  this.runCmd(
    which.sync('./node_modules/.bin/egg-scripts'),
    ['start', '--daemon', '--title=portal-saas-ssr', '--port=8701'],
    function() {
      console.log('yg egg start:%j dev end', process.env.NODE_ENV);
    }
  );
};

// 开启子进程来执行npm install命令
exports.runCmd = function(cmd, args, fn) {
  args = args || [];
  var runner = childProcess.spawn(cmd, args, {
    stdio: 'inherit',
    env: process.env,
  });

  runner.on('close', function(code) {
    if (fn) {
      fn(code);
    }
  });
};

exports.parseArg = function(opt) {
  const { channel, server, channelserver } = opt;
  const f = channel !== undefined;
  const arr_channel =
    !!channelserver && channelserver.indexOf(':') !== -1
      ? channelserver.split(':')
      : [];
  const channelName = f ? channel : arr_channel[0];
  const channelServer = f ? server : arr_channel[1];
  console.log(chalk.green('当前正在准备编译环境...'), arr_channel);

  if (channelName !== undefined && channelServer !== undefined) {
    return { channelName, channelServer };
  }
  return undefined;
};
