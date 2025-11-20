---

category: Components

type: 开发指南

order: 3

title: KWC 开发流程介绍

---

## 背景

前端 kwc 组件开发处于内网环境中，由于 kwc 开发涉及到的开发同事比较多，每次需要发版到 npm 上的话，都要进行打包编译发送到外网后再上传到 npm 上，整体流程上较为繁琐。因此考虑，kwc 项目共创的业务同事在开发前期，在内网进行开发时，通过平台提供的工程包 & 文档包先进行开发。平台按一定时间周期更新资源给到业务侧。

开发流程如下：

<img src="https://gitee.com/kingdee/kdesign/raw/main/kwcdocs/image/devolop.png" referrerpolicy="no-referrer"  width="600px" />

## 环境搭建

在内网进行 KWC 开发时，请首先确保内网系统环境在 win 10及以上，windows 7系统由于版本太低，无法安装高版本的node。

### nodejs 安装

开发 KWC 需要先安装 nodejs，nodejs 推荐版本为 v18 以上。低于该版本会出现编译报错等问题，建议是v18.20.8，可在 [nodejs官网](https://nodejs.org/en/download) 找到对应的版本进行安装。

以 v18.20.8 版本为例，安装完成后，点击菜单栏，找到命令行工具，如 powershell 或者是 git bash，以管理员身份运行：

<img src="https://gitee.com/kingdee/kdesign/raw/main/kwcdocs/image/powershell.PNG" referrerpolicy="no-referrer" />


在命令行窗口中键入`node -v` ，出现结果版本号为`v18.20.8` 的话，则表明安装成功。

<img src="https://gitee.com/kingdee/kdesign/raw/main/kwcdocs/image/image5.png" referrerpolicy="no-referrer" />


###  IDE 安装

前端开发工具可以使用 VSCode，Sublime Text，WebStorm等工具，甚至可以使用 IntelliJ IDEA，Eclipse 等工具。没有好坏之分，哪个 IDE 用的顺手就使用哪个。通过官网下载安装即可。

## 模板工程拉取

在本地找个文件夹存放项目，新建个文件夹用于开发 kwc 项目，如：`D:/project/kwc`

找前端同事要一份 kd-custom-control-template-for-kwc.zip 文件到该路径下，解压（根据所需修改成对应的project 名）

假设使用的是 VSCode，则打开 VSCode ，左上角选择 File，选择 Open Folder 打开该项目

<img src="https://gitee.com/kingdee/kdesign/raw/main/kwcdocs/image/image.png" referrerpolicy="no-referrer" width="500px"/>
<img src="https://gitee.com/kingdee/kdesign/raw/main/kwcdocs/image/image2.png" referrerpolicy="no-referrer"  />


打开成功后，通过快捷键 `ctrl+``打开终端，输入 `npm run dev`运行项目，看到如下内容则表明已经启动成功

<img src="https://gitee.com/kingdee/kdesign/raw/main/kwcdocs/image/image3.png" referrerpolicy="no-referrer" width="800px"/>


使用浏览器访问 localhost:8000，看到如下页面，则项目成功启动，可以进行下一步的开发工作：

<img src="https://gitee.com/kingdee/kdesign/raw/main/kwcdocs/image/image4.png" referrerpolicy="no-referrer" width="800px"/>


注：项目运行可能会出现失败，失败时请截图反馈至群里协助解决

### 工程目录介绍

```
|- kd-custom-control-template-for-kwc -- 根目录
  ｜- build -- webpack配置
    |- webpack.common.js -- webpack 通用配置文件
    |- webpack.dev.js -- webpack 开发环境配置文件
    |- webpack.prod.js -- webpack 生产环境配置文件 
  |- dist -- 编译产物
  |- node_modules  -- 依赖库
  |- server -- 本地调试服务器配置
  |- src -- 项目目录
    |- modules -- 组件模块
      |- x -- 模块名称，建议根据自身需求进行调整修改
        |- app -- 组件，具体组件一般包含css/html/js三个文件
          |- app.css -- 组件样式
          |- app.html -- 组件 DOM
          |- app.js -- 组件逻辑
        |- utils
           |- kwc-shadow-injector.js 
    |- devIndex.js -- 开发环境入口
    |- index.js -- 生产环境入口
  |- static -- 静态资源
    |- lang -- 词条
      |- zh_CN.json -- 中文词条
  |- .gitignore
  |- eslint.config.js -- 语法检测配置
  |- jsconfig.json -- js配置
  |- kwc.config.json -- kwc 配置
  |- package-lock.json
  |- package.json
```

###  开发规范

1. 建议是通过组件模块化的方式进行开发，即将页面中的元素分割成多个组件，每个组件完成开发后在组件 app 中进行组装
2. 前端组件一般包含 js/html/css 三个文件
3. 如需引入多语言或 kwc 框架提供的工具库，请参考对应的工具库文档进行调用。

## 其他问题

1. 环境配置，工程运行问题请联系在云之家中反馈解决
2. 组件属性，事件绑定请云之家群聊里或找对应的前端同事反馈，我们会提供对应的文档协助
3. 代码编写可根据开发提供的文档事先咨询各个 AI，如 deepseek/豆包/千问等模型，可在外网编写完成后粘贴到内网运行测试。如遇难题无法解决可群里反馈