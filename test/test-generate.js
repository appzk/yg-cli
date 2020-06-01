const path = require('path');
const userHome = require('user-home');
const generate = require('../../lib/generate-proj');
const tmpPath = path.join(
  userHome,
  '.explorer-templates',
  'webpack-cli-react-pc'
);
generate(tmpPath);
