---
order: 9
title: direction 配置
---

组件库适用于从右到左书写的语言(rtl)（如希伯来语或阿拉伯语）以及从左到右书写的语言(ltr)（如英语和大多数其他语言）

## 使用

在 ConfigProvider 中配置 direction 属性，默认为 ltr

```js
import { ConfigProvider } from '@kdcloudjs/kdesign';

// ...

const myConfig = {
  direction: 'rtl'
}

export default () => (
  <ConfigProvider value={myConfig}>
    <App />
  </ConfigProvider>
);
```