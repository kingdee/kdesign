---
category: Components
order: 4
type: 数据展示
title: Carousel
subtitle: 走马灯
---

轮播容器是一种可以切换显示一组内容的容器。

## 使用场景

需要按顺序展示页面核心被关注的内容时。例如：运营广告等。

## API

| 属性 | 说明 | 类型 | 默认值 | 可选值 | 版本 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| autoplay | 自动切换下一张 | boolean | false | true \| false | 1.0.0 |
| dotPosition | 面板指示点位置 | string | `bottom` | `top` \| `right` \| `bottom` \| `right` | 1.0.0 |
| dots | 控制是否显示面板指示点，当值为 object 时可指定面板指示点样式 | boolean \| {dotsClassName:string, activeDotsClassName:string} | true | - | 1.0.0 |
| easing | 滑动时动画效果 | string | `linear` | - | 1.0.0 |
| effect | 切换效果，滑动、渐显、无动画 | string | `scrollx` | `scrollx` \| `fade` \| `none` | 1.0.0 |
| intervalTime | 间隔时间， 单位 ms | number | 4000 | - | 1.0.0 |
| afterChange | 切换面板后的回调 | (currentIndex:number) => void | - | - | 1.0.0 |
| beforeChange | 切换前的回调 | (form:number, to:number) => void | - | - | 1.0.0 |
| jumpNode | 切换按钮 | boolean \| `[ReactNode, ReactNode] ` | false | - | 1.6.15 |

## 方法

| 名称                               | 描述                                                  |
| ---------------------------------- | ----------------------------------------------------- |
| getRef()                           | 获取对应 dom 元素                                     |
| jumpTo(slideNumber, needAnimation) | 切换到指定面板，needAnimation 为 false 时关闭动画效果 |
| next()                             | 切换到下一个面板                                      |
| prev()                             | 切换到上一个面板                                      |

## Design Token

| 分类 | 组件token | 全局token | 默认值 |
| --- | --- | --- | --- |
| color | --kd-c-carousel-dots-color-background | - | #D8D8D8 |
|  | --kd-c-carousel-dots-color-hover | - | #666666 |
|  | --kd-c-carousel-jump-icon-color | - | #D9D9D9 |
|  | --kd-c-carousel-jump-icon-color-hover | - | #666666 |
| radius | --kd-c-carousel-dots-border-radius | - | 2px |
|  | --kd-c-carousel-border-radius | - | 0px |
| sizing | --kd-c-carousel-dots-sizing-width | - | 12px |
|  | --kd-c-carousel-dots-sizing-height | - | 4px |
| spacing | --kd-c-carousel-spacing-margin-top | - | 12px |
|  | --kd-c-carousel-spacing-margin-bottom | - | 12px |
|  | --kd-c-carousel-spacing-margin-left | - | 12px |
|  | --kd-c-carousel-spacing-margin-right | - | 12px |
|  | --kd-c-carousel-dots-spacing-margin | - | 4px |
