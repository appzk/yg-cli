const path = require('path');
module.exports = {
  //转换成绝对路径
  convertToAbsolutePath: function(localPath) {
    if (typeof localPath === 'string') {
      return path.isAbsolute(localPath)
        ? localPath
        : path.join(process.cwd(), localPath);
    }
    return localPath;
  },
};
