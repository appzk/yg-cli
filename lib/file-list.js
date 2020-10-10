var fs = require('fs');

//path模块，可以生产相对和绝对路径
var path = require('path');

//配置远程路径

var fs = require('fs');

//遍历文件夹，获取所有文件夹里面的文件信息
/*
 * @param path 路径
 *
 */

exports.getFiles = function(path) {
  var filesList = [];
  var targetObj = {};
  readFile(path, filesList, targetObj);

  //  var filesList = geFileList("D:/Program Files/Egret/EgretEngine/win/egret/src");
  var str = JSON.stringify(filesList);
  str = "{name:'ygcli',children:#1}".replace('#1', str);
  writeFile('tree.json', str);
  return filesList;
};

//遍历读取文件
function readFile(path, filesList, targetObj) {
  files = fs.readdirSync(path); //需要用到同步读取
  files.forEach(walk);
  function walk(file) {
    states = fs.statSync(path + '/' + file);
    if (states.isDirectory() && (file !== 'node_modules' && file !== '.git')) {
      var item;
      if (targetObj['children']) {
        item = { name: file, children: [] };
        targetObj['children'].push(item);
      } else {
        item = { name: file, children: [] };
        filesList.push(item);
      }

      readFile(path + '/' + file, filesList, item);
    } else {
      //创建一个对象保存信息
      var obj = new Object();
      obj.size = states.size; //文件大小，以字节为单位
      obj.name = file; //文件名
      obj.path = path + '/' + file; //文件绝对路径

      if (targetObj['children']) {
        var item = { name: file, value: obj.path };
        targetObj['children'].push(item);
      } else {
        var item = { name: file, value: obj.path };
        filesList.push(item);
      }
    }
  }
}

//写入文件utf-8格式
function writeFile(fileName, data) {
  fs.writeFile(fileName, data, 'utf-8', complete);
  function complete() {
    console.log('文件生成成功');
  }
}
