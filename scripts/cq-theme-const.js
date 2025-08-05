const lessVariableReplacements = {
  '@theme-color': 'var(--theme-color)',
  '@theme-color-level1': 'var(--theme-color-level1)',
  '@theme-color-level2': 'var(--theme-color-level2)',
  '@theme-color-level3': 'var(--theme-color-level3)',
  '@theme-color-level4': 'var(--theme-color-level4)',
  '@theme-color-level5': 'var(--theme-color-level5)',
  '@theme-color-level6': 'var(--theme-color)', // 6号色就是主题色
  '@theme-color-level7': 'var(--theme-color-level7)', // 点击色
  '@theme-color-level8': 'var(--theme-color-level8)',
  '@theme-color-level9': 'var(--theme-color-level9)',
  '@theme-color-disabled': 'var(--theme-color-disabled)', // 禁用色
  '@theme-color-hover': 'var(--theme-color-level5)', // 悬浮色
  '@theme-color-click': 'var(--theme-color-level7)', // 点击色
  '@theme-color-active-light': 'var(--theme-color-level1)', // 浅色选中
  '@theme-color-active-dark': 'var(--theme-color)', // 深色选中
  '@hover-color': 'var(--hover-color)', // 中性的悬停色
  '@disabled-contain-bg': 'var(--disabled-contain-bg)', // 容器失效背景色
  '@success-color': 'var(--success-color)', // 成功色(深)
  '@success-bg-color': 'var(--success-bg-color)', // 成功反馈浮层的底色
  '@success-border-color': 'var(--success-border-color)', // 成功反馈浮层的容器边框色
  '@warning-color': 'var(--warning-color)', // 警示色(深)
  '@warning-bg-color': 'var(--warning-bg-color)', // 警示反馈浮层的底色
  '@warning-border-color': 'var(--warning-border-color)', // 警示反馈浮层的容器边框色
  '@error-color': 'var(--error-color)', // 失败色(深)
  '@error-bg-color': 'var(--error-bg-color)', // 失败反馈浮层的底色
  '@error-border-color': 'var(--error-border-color)', // 失败反馈浮层的容器边框色
  '@ongoing-color': 'var(--ongoing-color)', // 进行中(深)
  '@ongoing-bg-color': 'var(--ongoing-bg-color)', // 进行中反馈浮层的底色
  '@ongoing-border-color': 'var(--ongoing-border-color)', // 进行中反馈浮层的容器边框色
  '@disabled-color': 'var(--disabled-color)', // 失效色
  '@disabled-border-color': 'var(--disabled-border-color)', // 失效边框色
  '@link-color': 'var(--link-color)', // 链接色
  '@link-color-hover': 'var(--link-color-hover)', // 链接色或辅助色(悬浮)
  '@link-color-active': 'var(--link-color-active)', // 链接色或辅助色(点击)
  '@primary-text-color': 'var(--primary-text-color)', // 一级文本
  '@primary-text-color2': 'var(--primary-text-color2)', // 一级文本
  '@secondary-text-color': 'var(--secondary-text-color)', // 二级文本
  '@secondary-text-color2': 'var(--secondary-text-color2)', // 二级文本
  '@third-text-color': 'var(--third-text-color)', // 三级文本
  '@third-text-color2': 'var(--third-text-color2)', // 三级文本
  '@placeholder-text-color': 'var(--placeholder-text-color)', // 占位符文本 ue 要求修改
  '@placeholder-text-color2': 'var(--placeholder-text-color2)', // 占位符文本
  '@bg': 'var(--bg)', // 底色白背景
  '@bg2': 'var(--bg2)', // 底色灰背景
  '@contain-bg': 'var(--contain-bg)', // 容器内的灰背景
  '@radius-size': 'var(--radius-size)', // 圆角值
  '@input-color': 'var(--input-color)', // 线型录入的默认态
  '@strong-border-color': 'var(--strong-border-color)', // 强线条 --带操作
  '@strong-border-color-1': 'var(--strong-border-color-1)', // 强线条 --分割内容/容器包裹线
  '@weak-border-color': 'var(--weak-border-color)', // 弱线条 -- 需要多层级时
  '@zebra-stripe-deep-bg-color': 'var(--zebra-stripe-deep-bg-color)', // 交替显示（斑马条纹）时深色的背景色
  '@btn-default-ghost-color': 'var(--btn-default-ghost-color)',
  '@btn-default-ghost-active-bg': 'var(--btn-default-ghost-active-bg)',
  '@btn-default-ghost-theme-color': 'var(--theme-color-level6)',
  '@btn-default-ghost-theme-hover-color': 'var(--theme-color-level5)',
  '@btn-default-ghost-theme-active-color': 'var(--theme-color-level7)',
  '@grid-hyper-link-text-decoration': 'var(--grid-hyper-link-text-decoration)', // 表格超链接文本修饰
  '@bill-list-grid-row-selected-bg-color': 'var(--bill-list-grid-row-selected-bg-color)',
  '@entry-entity-grid-row-selected-bg-color': 'var(--entry-entity-grid-row-selected-bg-color)',
  '@report-list-grid-row-selected-bg-color': 'var(--report-list-grid-row-selected-bg-color)',
  '@__bill-list-grid-row-selected-dark-bg-color': 'var(--bill-list-grid-row-selected-dark-bg-color)', // +2%
  '@__entry-entity-grid-row-selected-dark-bg-color': 'var(--entry-entity-grid-row-selected-dark-bg-color)', // +2%
  '@__report-list-grid-row-selected-dark-bg-color': 'var(--report-list-grid-row-selected-dark-bg-color)', // +2%
}

module.exports = lessVariableReplacements
