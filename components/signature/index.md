---
category: Components
type: 表单
title: Signature
subtitle: 手写签名
---

手写签名是一种用户可通过鼠标/触控设备完成签名的组件

## 使用场景

**在以下情况下使用手写签名组件**  
需要手写签署名字时。

**在以下情况下请勿使用手写签名**  
需要输入姓名时，请改用[输入框](https://react.kingdee.design/components/input)。

## API

| 属性 | 说明 | 类型 | 默认值 | 可选值 | 版本 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| backgroundColor | jpeg 格式下的背景色 | string | #FFFFFF | - | 1.7.60 |
| canFullScreen | 弹窗能否全屏,默认为 true | boolean | true | - | 1.7.60 |
| containerWidth | 宽度 | number | 460 | - | 1.7.60 |
| containerHeight | 高度 | number | 340 | - | 1.7.60 |
| dataUrlType | 生成图片的类型 | string | png | `png` `jpeg` `svg` | 1.7.60 |
| getContainer | 指定 Modal 挂载的 HTML 节点 | `() => HTMLElement | Selectors | null | document.body` | - | - | 1.7.60 |
| modal | 是否在裁切框的下方显示半透明的黑色遮罩 | boolean | true | - | 1.7.60 |
| penColor | 签字笔的颜色 | string | black | - | 1.7.60 |
| preview | 预览参数，为 false 时禁用 | boolean | true | - | 1.7.60 |
| title | 标题 | ReactNode | - | - | 1.7.60 |
| getSignatureData | 获取签名的 base64 格式数据 | (dataUrl) => void | - | - | 1.7.60 |
| onClose | 关闭弹窗回调 | () => void | - | - | 1.7.60 |
| onClear | 清除 | () => void | - | - | 1.7.60 |
| onEnd | 结束书写 | () => void | - | - | 1.7.60 |
| onStart | 开始书写 | () => void | - | - | 1.7.60 |
| redo | 恢复 | () => void | - | - | 1.7.60 |
| undo | 撤销 | () => void | - | - | 1.7.60 |

## Design Token

| 分类 | 组件token | 全局token | 默认值 |
| --- | --- | --- | --- |
| color | --kd-c-signature-color-text | - | #999999 |
|  | --kd-c-signature-bg-color | - | #fafafa |
|  | --kd-c-signature-border-color-hover | --kd-g-color-theme-5 | rgb(135, 173, 255) |
|  | --kd-c-signature-border-color-hover | --kd-g-color-theme-5 | rgb(135, 173, 255) |
|  | --kd-c-signature-border-color-disabled | --kd-g-color-border-disabled | #ccc |
|  | --kd-c-signature-bg-color-hover | --kd-g-color-theme-1 | rgb(242, 248, 255) |
|  | --kd-c-signature-drawing-board-bg-color | - | #fafafa |
|  | --kd-c-signature-board-tip-color | - | #b2b2b2 |
| font | --kd-c-signature-font-size | - | 12px |
| motion | --kd-c-signature-motion-duration | --kd-g-duration | 0.3s |
| radius | --kd-c-signature-border-radius | --kd-g-radius-border | 2px |
