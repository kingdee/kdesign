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
| --- | --- | --- | --- | --- |
| className | color-picker 输入框类名 | string | - | 1.0.0 |
| defaultValue | 设置输入框的默认值，可以是十六进制、RGB 、HSB 、HSL 或者颜色英文名称 | string | - | 1.0.0 |
| borderType | color-picker 输入框类型 | `underline` \| `bordered` | `bordered` | 1.0.0 |
| suffixIcon | color-picker 输入框右侧图标(其中 color 同 onChange 中的 color) | (color: string) => React.ReactNode | - | 1.0.0 |
| onChange | 输入框颜色值发生变化时触发的回调函数 | (inputValue: string) => void | - | 1.0.0 |
| defaultOpen | 颜色面板展开配置 | boolean | false | 1.0.0 |
| style | color-picker 输入框样式 | React.CSSProperties | - | 1.0.0 |
| showFollowThemeSwitch | 是否展示跟随主题开关，**注意：设置了主题色才能控制显示跟随主题色开关** | boolean | false | 1.0.0 |
| showChangeColorTypeInput | 是否展示颜色格式转换下拉框 | boolean | true | 1.0.0 |
| showPresetColor | 是否展示预设颜色 | boolean | true | 1.0.0 |
| showColorPickerBox | 是否展示拾色容器 | boolean | false | 1.0.0 |
| themeColor | 设置主题色，可以是十六进制、RGB 、HSB 、HSL 或者颜色英文名称 | string | - | 1.0.0 |
| presetColor | 用户自定义的预设颜色，数组中支持十六进制、RGB 、HSB 、HSL 或者颜色英文名称，如:\['blue', '#0000ff', 'rgb(0,0,255)', 'hsl(240,100,50)', 'hsb(240,100,100)'\] | string[] | - | 1.0.0 |
| value | 设置输入框的值，可以是十六进制、RGB 、HSB 、HSL 或者颜色英文名称 | string | - | 1.0.0 |
