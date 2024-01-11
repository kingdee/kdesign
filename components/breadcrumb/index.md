---
category: Components
type: 导航
title: Breadcrumb
subtitle: 面包屑
---

## 介绍

面包屑是一种导航组件，用于显示当前页面在系统层级结构中的位置，并能按层级返回。

## 使用场景

在以下情况下使用面包屑

- 当系统内功能模块层级较多，且需要告知用户当前位置时，应当使用面包屑辅助用户进行页面之间的导航。

在以下情况下请勿使用面包屑

- 当系统内的不同功能模块，需要进行并行任务的操作与查看，建议使用页签。

## API

### Breadcrumb

| 属性 | 说明 | 类型 | 默认值 | 可选值 | 版本 |
| --- | --- | --- | --- | --- | --- |
| className | 面包屑样式类名 | string | - | - | 2.0.0 |
| colorModel | 面包屑的模式 | string | `emphasize` | `emphasize` \| `weaken` | 2.0.0 |
| items | 面包屑节点配置数组 | [BreadcrumbItem](/components/breadcrumb#BreadcrumbItem)[] | - | - | 2.0.0 |
| onItemClick | 面包屑节点点击事件 | (item: [BreadcrumbItem](/components/breadcrumb#BreadcrumbItem), index: number) => void | - | - | 2.0.0 |
| separator | 分隔符自定义 | ReactNode | `/` | - | 2.0.0 |
| style | 面包屑样式对象 | CSSProperties | - | - | 2.0.0 |

### BreadcrumbItem

| 属性 | 说明 | 类型 | 默认值 | 可选值 | 版本 |
| --- | --- | --- | --- | --- | --- |
| className | 面包屑节点样式类名 | string | - | - | 2.0.0 |
| dropdownProps | 面包屑节点下拉框配置 | [DropDownProps](/components/dropdown/#API) | - | - | 2.0.0 |
| href | 面包屑节点跳转链接，不能和 `path` 共用 | string | - | - | 2.0.0 |
| icon | 面包屑节点图标 | ReactNode | - | - | 2.0.0 |
| path | 面包屑节点拼接路径，不能和 `href` 共用 | string | - | - | 2.0.0 |
| title | 面包屑节点文本 | ReactNode | - | - | 2.0.0 |

## Design Token

| 分类 | 组件token | 全局token | 默认值 |
| --- | --- | --- | --- |
| color | --kd-c-breadcrumb-color-text | - | #737373 |
|  | --kd-c-breadcrumb-active-color-text | - | #111111 |
|  | --kd-c-breadcrumb-separator-color-text | - | #b2b2b2 |
| font | --kd-c-breadcrumb-font-size | --kd-g-font-size-middle | 14px |
|  | --kd-c-breadcrumb-font-weight | --kd-g-font-weight | 400 |
| spacing | --kd-c-breadcrumb-separator-spacing-padding-horizontal | - | 8px |
