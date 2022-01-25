---
category: Components
type: 布局
subtitle: 间距
title: Space
order: 3
---

可以设置组件之间的间距的容器。

## 使用场景

当一组组件之间需要有统一的间距时

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| align | 垂直对齐方式 | `start` \| `end` \|`center` \|`baseline` | `center` | 1.0.0 |
| direction | 组件之间的排列方向 | `vertical` \| `horizontal` | `horizontal` | 1.0.0 |
| size | 间距大小 | [Size](#Size) \| [Size\[\]](#Size) | `small` | 1.0.0 |
| split | 拆分符号 | ReactNode | - | 1.0.0 |
| wrap | 是否自动换行，当 `direction` 的值为 `horizontal` 时有效 | boolean | false | 1.0.0 |

### Size

`'small' | 'middle' | 'large' | number`
