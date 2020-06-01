const request = require('request'); //request库进行文件下载，简化操作步骤。
const ora = require('ora'); //用于命令行上的加载效果loading
const chalk = require('chalk'); //用于高亮终端打印出的信息(命令行字体颜色)

module.exports = calltemp => {
  const spinner = ora('Fetching template list...');
  spinner.start();
  request(
    {
      uri: 'https://appzk.github.io/cli-configs/u-react-cli-template.json',
      timeout: 5000,
    },
    (err, response, body) => {
      if (err) {
        spinner.fail(chalk.red('Failed to fetch template list')); // + err.message.trim()
        console.log(err);
      }
      if (response && response.statusCode === 200) {
        spinner.succeed(chalk.green('Fetch template list successfully!'));

        calltemp(JSON.parse(body)); //回调uri返回的数据
      }
    }
  );
};
