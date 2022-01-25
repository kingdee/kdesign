---
category: Components
type: 反馈
title: Spin
order: 3
subtitle: 加载中
---
## 使用场景
页面局部处于等待异步数据或正在渲染过程时，合适的加载动效会有效缓解用户的焦虑。
未知进度加载 / 加载时间少于2s
## API

| 属性 | 说明 | 类型 | 默认值 | 可选值 | 版本 |
| --- | --- | --- | --- | --- | --- |
| indicator | 加载指示符 | ReactNode | --- | --- | 1.0.0 |
| spinning | 是否为加载中状态 | boolean | true | --- | 1.0.0 |
| tip | 当作为包裹元素时，可以自定义描述文案 | string | --- | --- | 1.0.0 |
| type | 加载中类型 | string | `page` | `page` `container` `component` | 1.0.0 |
