---
order: 5
title: 自定义主题
---

KDesign 设计规范和技术上支持灵活的样式定制，以满足业务和品牌上多样化的视觉需求，包括但不限于全局样式（主色、圆角、边框）和指定组件的视觉定制。

## kdesign 的样式变量
kdesign 的样式使用了 [Less](http://lesscss.org/) 作为开发语言，并定义了一系列全局/组件的样式变量，你可以根据需求进行相应调整。

### 全局样式
```less
@theme-color: #5582f3;  // 主题色
@theme-color-level1: rgb(242, 248, 255);
@theme-color-level2: rgb(242, 248, 255);
@theme-color-level3: rgb(227, 238, 255);
@theme-color-level4: rgb(181, 207, 255);
@theme-color-level5: rgb(135, 173, 255);
@theme-color-level6: rgb(85, 130, 243);
@theme-color-level7: rgb(55, 92, 202);
@theme-color-level8: rgb(31, 59, 161);
@theme-color-level9: rgb(13, 33, 121);

@theme-color-disabled: @theme-color-level3; // 失效色
@theme-color-hover: @theme-color-level5; // 悬浮色
@theme-color-click: @theme-color-level7;// 点击色
@theme-color-active-light: @theme-color-level1; // 浅色选中
@theme-color-active-dark: @theme-color; // 深色选中
@hover-color: #f5f5f5; // 中性的悬停色
@disabled-contain-bg: #f5f5f5; // 容器失效背景色
@success-color: #1ba854; // 成功色(深)
@success-bg-color: #f2fff5; // 成功反馈浮层的底色
@success-border-color: #6dd18e; // 成功反馈浮层的容器边框色
@warning-color: #ff991c; // 警示色(深)
@warning-bg-color: #fffbf2; // 警示反馈浮层的底色
@warning-border-color: #ffcb78; // 警示反馈浮层的容器边框色
@error-color: #fb2323; // 失败色(深)
@error-bg-color: #fff2f4; // 失败反馈浮层的底色
@error-border-color: #ff8088; // 失败反馈浮层的容器边框色
@ongoing-color: #276ff5; // 进行中(深)
@ongoing-bg-color: #f2f9ff; // 进行中反馈浮层的底色
@ongoing-border-color: #85b8ff; // 进行中反馈浮层的容器边框色
@disabled-color: #b2b2b2; // 失效色
@disabled-border-color: #ccc; // 失效边框色
@end-color: #666; // 暂停或者终止等状态标签色
@link-color: #0e5fd8; // 链接色
@link-color-hover: #3987ed; // 链接色或辅助色(悬浮)
@link-color-active: #0041b0; // 链接色或辅助色(点击)
@primary-text-color: #212121; // 一级文本
@primary-text-color2: rgba(255, 255, 255, 1); // 一级文本
@secondary-text-color: #666; // 二级文本
@secondary-text-color2: rgba(255, 255, 255, 0.65); // 二级文本
@third-text-color: #999; // 三级文本
@third-text-color2: rgba(255, 255, 255, 0.4); // 三级文本
@placeholder-text-color: #ccc; // 占位符文本
@placeholder-text-color2: rgba(255, 255, 255, 0.3); // 占位符文本
@bg: #fff; // 底色白背景
@bg2: #f2f2f2; // 底色灰背景
@contain-bg: #fafafa; // 容器内的灰背景
@radius-size: 2px; // 圆角值
@input-color: #999; // 线型录入的默认态
@strong-border-color: #d9d9d9; // 强线条 --带操作
@strong-border-color-1: #d9d9d9; // 强线条 --分割内容/容器包裹线
@weak-border-color: #e5e5e5; // 弱线条 -- 需要多层级时
```

### 组件样式

我们以 `button` 组件为例，下面展示了 `button` 组件所有定义的样式变量，包括边框、字体、背景色、宽高、内外边距等。

```less
@btn-border-width: 1px;
@btn-border-style: solid;
@btn-primary-font-color: @white; // 基础文字颜色
@btn-primary-background-color: @theme-color; // 基础背景颜色
@btn-primary-border-color: @theme-color; // 基础边框颜色

@btn-ghost-font-color: @secondary-text-color; // 幽灵按钮文字颜色
@btn-ghost-background-color: transparent; // 幽灵背景颜色
@btn-ghost-border-color: @strong-border-color; //幽灵边框颜色

@btn-second-font-color: rgba(@secondary-text-color, 65%); // 次要文字颜色
@btn-second-background-color: rgba(@white, 65%); // 次要背景颜色
@btn-second-border-color: rgba(@strong-border-color, 65%); // 次要边框颜色

@btn-link-font-color: @link-color; // 链接文字颜色

@btn-disabled-font-color: @white; // 禁用状态 文字颜色
@btn-disabled-background-color: @disabled-contain-bg; // 禁用状态 背景颜色
@btn-disabled-border-color: @strong-border-color; // 禁用状态 边框颜色

@btn-danger-font-color: @white; // 危险状态 文字颜色
@btn-danger-background-color: @error-color; // 危险状态 背景颜色
@btn-danger-border-color: @error-color; // 危险状态 边框颜色

@btn-small-font-size: @small-font-size; // 小号 文字大小
@btn-small-height: 24px; // 小号 高度
@btn-small-min-width: 60px; // 小号 最小宽度
@btn-small-padding-vertical: 3px; // 小号 内间距 纵向
@btn-small-padding-horizontal: 8px; // 小号 内间距 横向

@btn-middle-font-size: @small-font-size; // 中号 文字大小
@btn-middle-height: 28px; // 中号 高度
@btn-middle-min-width: 60px; // 中号 最小宽度
@btn-middle-padding-vertical: 5px; // 中号 内间距 纵向
@btn-middle-padding-horizontal: 8px; // 中号 内间距 纵向

@btn-large-font-size: @large-font-size; // 大号 文字大小
@btn-large-height: 32px; // 大号 高度
@btn-large-min-width: 80px; // 大号 最小宽度
@btn-large-padding-vertical: 6px; // 大号 内间距 纵向
@btn-large-padding-horizontal: 8px; // 大号 内间距 横向
@btn-transition-fn: cubic-bezier(0.075, 0.82, 0.165, 1);
```

我们定义的所有样式变量你可以在 [这里](https://github.com/kingdee/kdesign/blob/master/components/style/themes/default.less) 找到
## 定制方式
原理上是使用 less 提供的 [modifyVars](http://lesscss.org/usage/#using-less-in-the-browser-modify-variables) 的方式进行覆盖变量。下面将针对不同的场景提供一些常用的定制方式。

```diff
// webpack.config.js
module.exports = {
  rules: [{
    test: /\.less$/,
    use: [{
      loader: 'style-loader',
    }, {
      loader: 'css-loader',
    }, {
      loader: 'less-loader',
+     options: {
+       lessOptions: {
+         modifyVars: {
+           'theme-color': '#CDDC39',
+           'success-color': '#42A942',
+           'radius-size': '3px',
+         },
+         javascriptEnabled: true,
+       },
+     },
    }],
    // ...other rules
  }],
  // ...other config
}
```

注意：

1. less-loader 的处理范围不要过滤掉 `node_modules` 下的 kdesign 包。
2. `lessOptions` 的配置写法在 [less-loader@6.0.0](https://github.com/webpack-contrib/less-loader/releases/tag/v6.0.0) 里支持。

### 在 create-react-app 中定制主题

参考 [在 create-react-app 中使用](/docs/guide/create-react-app) 进行配置即可。

### 配置less变量文件

另外一种方式是建立一个单独的 `less` 变量文件，引入这个文件覆盖 `kdesign.less` 里的变量。

```less
@import '~@kdcloudjs/kdesign/lib/style/themes/default.less';
@import 'your-theme-file.less'; // 用于覆盖上面定义的变量
```
