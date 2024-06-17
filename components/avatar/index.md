---
category: Components
type: 展示
subtitle: 头像
title: Avatar
order: 0
---

头像是一种代表人或物的组件。

## 使用场景

需要代表某个人或物时使用，例如：用户、商家、店铺和企业等。

## API

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| alt | 图像无法显示时的替代文本 | string | - | 1.0.0 |
| draggable | 图片是否允许拖动 | boolean \| `'true'` \| `'false'` | - | 1.0.0 |
| gap | 字符类型距离左右两侧边界单位像素 | number | 4 | 1.0.0 |
| icon | 设置头像的自定义图标 | ReactNode | - | 1.0.0 |
| onError | 图片加载失败的事件，返回 false 会关闭组件默认的 fallback 行为 | () => boolean | - | 1.0.0 |
| shape | 指定头像的形状 | `circle` \| `square` | `circle` | 1.0.0 |
| size | 设置头像的大小 | number \| `large` \| `middle` \| `small` \| `extra-small` | `middle` | 1.0.0 |
| src | 图片类头像的资源地址或者图片元素 | string \| ReactNode | - | 1.0.0 |
| srcSet | 设置图片类头像响应式资源地址 | string | - | 1.0.0 |

## Design Token

| 分类 | 组件token | 全局token | 默认值 |
| --- | --- | --- | --- |
| color | --kd-c-avatar-color-background | - | #B2B2B2 |
| font | --kd-c-avatar-font-size-x-small | - | 14px |
|  | --kd-c-avatar-font-size-small | - | 18px |
|  | --kd-c-avatar-font-size-base | - | 22px |
|  | --kd-c-avatar-font-size-large | - | 36px |
| radius | --kd-c-avatar-border-radius | - | 2px |
| sizing | --kd-c-avatar-size-x-small | - | 24px |
|  | --kd-c-avatar-size-small | - | 32px |
|  | --kd-c-avatar-size-base | - | 40px |
|  | --kd-c-avatar-size-large | - | 60px |
