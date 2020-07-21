const execa = require('execa');
const utils = require('./utils');
const { join } = require('path');

process.setMaxListeners(Infinity);

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
  utils.logStep('done');
};
