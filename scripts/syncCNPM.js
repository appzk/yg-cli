const execa = require('execa');
const chalk = require('chalk');
const { join } = require('path');

process.setMaxListeners(Infinity);

function logStep(name) {
  console.log(`${chalk.gray('>> Release:')} ${chalk.magenta.bold(name)}`);
}
// function printErrorAndExit(message) {
//   console.error(chalk.red(message));
//   process.exit(1);
// }
module.exports = function(publishPkgs) {
  const pkg = require(join(__dirname, '../package.json')).name;
  console.log(pkg, 'pkg');
  // Sync version to root package.json

  logStep('sync packages to cnpm');
  // syncTNPM(pkgs);
  const pkgs = [pkg];
  console.log(pkgs);

  const commands = pkgs.map(pkg => {
    const subprocess = execa('cnpm', ['sync', pkg]);
    subprocess.stdout.pipe(process.stdout);
    return subprocess;
  });
  Promise.all(commands);
  logStep('done');
};
