const async = require('async');
const Handlebars = require('handlebars');
const render = require('consolidate').handlebars.render;

//首字母小写
Handlebars.registerHelper('firstLettertoLowercase', function(name) {
  return name[0].toLocaleLowerCase() + name.substring(1);
});
//首字母大写
Handlebars.registerHelper('firstLettertoUpperCase', function(name) {
  return name[0].toLocaleUpperCase() + name.substring(1);
});

/*渲染模板文件*/
function renderTemplateFiles() {
  return (files, metalsmith, done) => {
    const keys = Object.keys(files); //获取files的所有key
    const metalsmithMetadata = metalsmith.metadata(); //获取metalsmith的所有变量
    async.each(
      keys,
      (fileName, next) => {
        //异步处理所有files
        //获取文件的文本内容
        const str = files[fileName].contents.toString();
        //跳过不符合handlebars语法的file
        if (!/{{([^{}]+)}}/g.test(str)) {
          return next();
        }
        //渲染文件
        render(str, metalsmithMetadata, (err, res) => {
          if (err) {
            err.message = `[${fileName}] ${err.message}`;
            return next(err);
          }
          files[fileName].contents = new Buffer(res);
          next();
        });
      },
      done
    );
  };
}

module.exports = renderTemplateFiles;
