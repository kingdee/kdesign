---
category: Components
type: 表单
title: ColorPicker
subtitle: 颜色选择器
---

颜色选择器是一种允许用户选择色块或输入颜色色值的文本区域

## 使用场景

• 当用户需要设置对象颜色时

## API

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- | --- |
| borderType | color-picker 输入框类型 | `underline` \| `bordered` | `bordered` | 1.7.0 |
| className | color-picker 输入框类名 | string | - | 1.7.0 |
| defaultOpen | 颜色面板展开配置 | boolean | false | 1.7.0 |
| defaultValue | 设置输入框的默认值，可以是十六进制、RGB 、HSB 、HSL 或者颜色英文名称 | string | - | 1.7.0 |
| functionalColor | 设置功能色色值，可以是十六进制、RGB 、HSB 、HSL 或者颜色英文名称 | string | - | 1.7.0 |
| functionalColorName | 设置功能色的名称 | string | #themeColor | 1.7.0 |
| placeholder | 输入框内容为空时的输入提示 | string | # | 1.7.0 |
| presetColor | 用户自定义的预设颜色，数组中支持十六进制、RGB 、HSB 、HSL 或者颜色英文名称，如:\['blue', '#0000ff', 'rgb(0,0,255)', 'hsl(240,100%,50%)', 'hsb(240,100%,100%)'\] | string[] | - | 1.7.0 |
| switchName | 设置功能色开关的名称，**注意：如自定义的名称需支持国际化需要提供 internationalName** | { name: string; internationalName?: string } | { name: '跟随主题色'; internationalName:'followFunctionalColor' } | 1.7.0 |
| style | color-picker 输入框样式 | React.CSSProperties | - | 1.7.0 |
| showSwitch | 是否展示跟随功能色开关，**注意：设置了功能色才能显示跟随功能色开关** | boolean | false | 1.7.0 |
| showColorTransfer | 是否展示颜色格式转换下拉框及透明度输入框 | boolean | true | 1.7.0 |  |
| showPresetColor | 是否展示预设颜色 | boolean | true | 1.7.0 |
| showColorPickerBox | 是否展示拾色容器 | { showBox?: boolean; showHue?: boolean; showOpacity?: boolean } | { showBox: false, showHue: false, showOpacity: false } | 1.7.0 |
| suffixIcon | color-picker 输入框右侧图标(其中 color 为 RGB 格式的字符串，可以同步颜色选择面板的透明度) | (rgbColor: string) => React.ReactNode | - | 1.7.0 |
| value | 设置输入框的值，可以是十六进制、RGB 、HSB 、HSL 或者颜色英文名称 | string | - | 1.7.0 |
| visible | 手动控制面板显隐 | boolean | - | 1.7.35 |
| onChange | 输入框颜色值发生变化时触发的回调函数 | (inputValue: string, colorObj:{type: `HEX` \| `HSB` \| `RGB` \| `HSL`, value: string}) => void | - | 1.7.0 |
| onVisibleChange | 面板显隐的回调 | (visible: boolean) => void | - | 1.7.35 |

## Design Token

| 分类    | 组件 token                                                 | 全局 token              | 默认值             |
| ------- | ---------------------------------------------------------- | ----------------------- | ------------------ |
| color   | --kd-c-color-picker-panel-option-color-background-selected | --kd-g-color-theme-3    | rgb(227, 238, 255) |
| font    | --kd-c-color-picker-input-font-size                        | --kd-g-font-size-middle | 14px               |
|         | --kd-c-color-picker-panel-select-font-size                 | --kd-g-font-size-middle | 14px               |
|         | --kd-c-color-picker-panel-alpha-font-size                  | --kd-g-font-size-middle | 14px               |
| sizing  | --kd-c-color-picker-input-sizing-width                     | -                       | 230px              |
|         | --kd-c-color-picker-input-sizing-height                    | -                       | 28px               |
|         | --kd-c-color-picker-input-suffix-sizing-width              | -                       | 20px               |
|         | --kd-c-color-picker-input-suffix-sizing-height             | -                       | 20px               |
|         | --kd-c-color-picker-panel-sizing-width                     | -                       | 304px              |
|         | --kd-c-color-picker-panel-select-sizing-width              | -                       | 212px              |
|         | --kd-c-color-picker-panel-select-sizing-height             | -                       | 28px               |
|         | --kd-c-color-picker-panel-preset-sizing-width              | -                       | 16px               |
|         | --kd-c-color-picker-panel-preset-sizing-height             | -                       | 16px               |
| z-index | --kd-c-color-picker-panel-z-index                          | --kd-g-z-index-popper   | 1050               |
