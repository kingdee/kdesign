---
order: 0
title: 介绍
---
KDesign of React 是金蝶生态设计系统，将设计赋能给产品、设计、开发各个环节，以保障金蝶系产品的统一体验。


## 特性
- 提炼自企业级中后台产品的交互语言和视觉风格。
- 提供开箱即用的 React 组件。
- 使用 TypeScript 开发，提供完整的类型定义文件。


## 兼容环境
- 现代浏览器和 IE11

## 快速上手
#### 安装
**使用 npm 或 yarn 安装**
推荐使用 npm 或 yarn 的方式进行开发，不仅可在开发环境轻松调试，也可放心地在生产环境打包部署使用。
```bash
$ npm install @kdcloudjs/kdesign --save
# 或者
$ yarn add @kdcloudjs/kdesign
```

使用：
```js
import React from 'react'
import reactDom from 'react-dom'
import { Button } from '@kdcloudjs/kdesign'
import '@kdcloudjs/kdesign/dist/kdesign.css'

reactDom.render((
  <div>
    <Button>kdesign 按钮aa</Button>
  </div>
), document.getElementById('root'))
```

**浏览器引入**

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

  <script src="https://unpkg.com/@kdcloudjs/kdesign@latest/dist/kdesign.min.js 目录地址"></script>
  <link rel="stylesheet" href="https://unpkg.com/@kdcloudjs/kdesign@latest/dist/kdesign.min.css 目录地址">
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
