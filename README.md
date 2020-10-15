# yg-cli

前端工程自动化构建工具
该构建模版可选择 react.js 或 vue.js 的 PC 端模版, react.js 相关的移动端模版

- 安装

### `npm install yg-cli -g`

- 配置文件 .ygclirc

当前环境指定的配置文件，dev 与 build 会更新文件
例子:examples

```
module.exports = { envfile: {path: 'examples/defaultSetting.json',key:'channelName'} };

```

egg 环境

```
module.exports = { envfile: {path: 'app/web/utils/defaultSetting.json',key:'channelName'} };

```

- 用法

### `yg dev`

直接输入

`yg dev -- -x ygego:alpha`

交互式

`yg dev`

手工输入 [saas 门户渠道:环境]

```
$ ygego:alpha
```

不输入，直接回车，默认按选择交互方式

```
选择 ygego
选择 alpha
```

### `yg build`

直接输入

`yg build -- -x ygego:alpha`

交互式

`yg build`

手工输入 [saas 门户渠道:环境]

```
$ ygego:alpha
```

不输入，直接回车，默认按选择交互方式

```
选择 ygego
选择 alpha
```

### yg urls 生成 httpUrls

```
apiprefix: {
    url:'http://{channelName}.ygego.{channelServer}',
    envs:[
        'alpha1','alpha2','alpha3','alpha4','alpha5','alpha5',
        'test1','test2','test3','test4','test5','test5','test6',
    ],
},
```

由 apiprefix 的 envs 指定

生成至指定的 defaultSetting.json 中

### TODO:`yg init`

**前端自动化构建流程：**

    1. 获取远程模板信息
    2. 选择所需远程模板
    3. 判断本地模板仓库是否有该模板？
    若没有进入第 4 步；
    若有，则进入确认是否覆盖？
    若确认覆盖则进入第 4 步，
    反之跳到第 6 步
    4. 输入模板远程仓库中你所需的分支，默认是 master
    5. 下载模板至本地模板库
    6. 回答四个问题：
    A)项目名称；
    B)项目版本；
    C)项目描述；
    D)项目路径
    7. 进入构建过程
    8. 构建完毕，进入开发阶段
