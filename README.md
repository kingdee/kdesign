# KDesign of React

KDesign of React 是基于金蝶的企业级设计系统KDesign 实现的一套React UI组件库，主要用于企业级系统的构建。


## 特性
- 提供开箱即用的 丰富的企业级 React UI 组件。
- 使用 TypeScript 开发，提供完整的类型定义文件。
- 组件全键盘的支持
- 国际化支持
- 全面的主题化定制

## 安装

### 使用 npm 或 yarn 安装

```bash
$ npm install @kdcloudjs/kdesign --save
# 或者
$ yarn add @kdcloudjs/kdesign
```

### 示例
```js
import React from 'react'
import reactDom from 'react-dom'
import { Button } from '@kdcloudjs/kdesign'
import '@kdcloudjs/kdesign/dist/kdesign.css'

reactDom.render((
  <div>
    <Button>kdesign 按钮</Button>
  </div>
), document.getElementById('root'))
```

### 浏览器引入

在浏览器中使用 `script` 和 `link` 标签直接引入文件，并使用全局变量 `kdesign`。
目前尚未将文件上传至 `cdn` 需要手动将 `dist` 目录下的 `kdesign.min.js` 和 `kdesign.min.css` 文件拷贝至项目。

使用：
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>kdesign</title>
  <script src="https://cdn.staticfile.org/react/16.14.0/umd/react.development.js"></script>
  <script src="https://cdn.staticfile.org/react-dom/16.14.0/umd/react-dom.development.js"></script>
  <script src="https://cdn.staticfile.org/babel-standalone/6.26.0/babel.min.js"></script>

  <script src="https://unpkg.com/@kdcloudjs/kdesign@latest/dist/kdesign.min.js"></script>
  <link rel="stylesheet" href="https://unpkg.com/@kdcloudjs/kdesign@latest/dist/kdesign.min.css">
</head>
<body>
<div id="root"></div>
<script type="text/babel">
  ReactDOM.render((
      <div>
        <kdesign.Button>kdesign 按钮</kdesign.Button>
      </div>
    ),
    document.getElementById('root')
  )
</script>
</body>
</html>
```

## 相关链接
- [首页](https://react.kingdee.design/)
- [介绍](https://react.kingdee.design/docs/guide/introduce)
- [在 create-react-app 中使用](https://react.kingdee.design/docs/guide/create-react-app)
- [在 TypeScript 中使用](https://react.kingdee.design/docs/guide/typescript)
- [ConfigProvider 全局化配置](https://react.kingdee.design/docs/guide/config)
- [自定义主题](https://react.kingdee.design/docs/guide/customtopic)
- [国际化](https://react.kingdee.design/docs/guide/locale)
- [更新日志](https://react.kingdee.design/docs/guide/changelog)

## 浏览器兼容性

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>iOS Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_48x48.png" alt="Samsung" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Samsung | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Opera |
| --------- | --------- | --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions| last 2 versions| last 2 versions

## 参与贡献
参与贡献前请先阅读 [贡献指南](./CONTRIBUTING.md)

## License
kdesign 使用了 Apache License, Version 2.0. 详细license 请查看 [LICENSE](./LICENSE)