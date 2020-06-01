const chalk = require('chalk');
const Metalsmith = require('metalsmith'); // 通过某些参数进行编译，得到不同的目标文件时，通过metalsmith来对文件进行操作。
const inquirer = require('inquirer');
const path = require('path');
const ora = require('ora');
const convertToAbsolutePath = require('./local-path').convertToAbsolutePath; //用于路径的转换
const renderTemplateFiles = require('./render-template-files');

module.exports = tmpPath => {
  const metalsmith = Metalsmith(tmpPath);

  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'The project name',
        default: 'explorer-project',
      },
      {
        type: 'input',
        name: 'destination',
        message: 'The project path',
        default: process.cwd(),
      },
    ])
    .then(answer => {
      //项目生成路径
      const destination = path.join(
        convertToAbsolutePath(answer.destination),
        answer.name
      );
      const spinner = ora('generating...').start();

      metalsmith
        // .use(askQuestions(opts.prompts))  //询问问题
        // .use(filterFiles(opts.filters))  //过滤文件
        //.use(renderTemplateFiles(opts.skipInterpolation))
        .use(renderTemplateFiles()); //渲染模板文件

      //加入新的全局变量
      Object.assign(metalsmith.metadata(), answer);

      spinner.start();
      metalsmith
        .source('.') // start from template root instead of `./src` which is Metalsmith's default for `source`
        .destination(destination)
        .clean(false)
        .build(function(err) {
          spinner.stop();
          if (err) throw err;
          console.log();
          console.log(chalk.green('Build Successfully'));
          console.log();
          console.log(
            `${chalk.green('Please cd')} ${destination} ${chalk.green(
              'to start working'
            )}`
          );
          console.log();
        });
    });
};
