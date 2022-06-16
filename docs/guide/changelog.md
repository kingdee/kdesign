---
order: 8
title: 更新日志
hiddenAnchor: true
---

## [1.3.3](https://github.com/kdcloudone/kdesign/compare/v1.3.2...v1.3.3)
`2022-06-16`
* button
  * 调整集合按钮圆角以及下拉面板空隙
  * 集合按钮颜色调整
* checkbox
  * 修复外层包裹添加点击事件,执行操作时触发两次的bug
* menu
  * 菜单受控问题处理
  * 菜单组件问题修复
  * 受控问题处理
* search
  * 解决多选情况下showSearch为false时不生效
* select
  * 解决多选情况下showSearch为false时不生效
* 基础资料选择demo调整

## [1.3.2](https://github.com/kdcloudone/kdesign/compare/v1.3.1...v1.3.2)
`2022-06-09`
* form
  * 识别组件库组件设置默认属性名
* menu
  * 删除菜单hover改userpopper修复commitId:1332189
  * 菜单组件问题修复
* table
  * 更新引用@kdcloudjs/table版本
* icon
  * 添加仪表板图标
* 修复fixfox下组件页面左侧sidebar无法滚动

## [1.3.1](https://github.com/kdcloudone/kdesign/compare/v1.3.0...v1.3.1)
`2022-05-27`
* select
  * 更新半选禁用状态下样式
  * 修复多选模式下删除选项展开下拉框的问题

## [1.3.0](https://github.com/kdcloudone/kdesign/compare/v1.2.3...v1.3.0)
`2022-05-19`
* badge
  * status属性对应颜色调整
  * status显示问题
* carousel
  * 走马灯样式问题修复
* checkbox
  * 修复group的name传值问题
* form
  * 新增valuePropName属性
* select
  * 修复ts类型报错
* tag
  * 分类由 导航 => 数据展示

## [1.2.3](https://github.com/kdcloudone/kdesign/compare/v1.2.2...v1.2.3)
`2022-05-12`
* button
  * 更新主要按钮禁用色
  * 修复幽灵按钮的文字颜色
* carousel
  * 解决走马灯自适应问题
* form
  * fix error message
  * reset errormessage
* message
  * fix error message
  * reset errormessage
* menu
  * del title
  * fix hover
* select
  * 修复禁用状态下的样式
* stepper
  * 修复stepper的demo点击递增显示错误
* tooltip
  * 修复视觉走查问题点
* 更新gio的请求id

## [1.2.2](https://github.com/kdcloudone/kdesign/compare/v1.2.1...v1.2.2)
`2022-04-28`
* carousel
  * 调整样式类名
* city-picker
  * 去除demo的部分内容
* collapse
  * 修复单测报错问题
* radio
  * 修复阴影动画丢失的问题
* tabs
  * 解决Tabs组件effect的值为fade和scrollx的时候没有动画效果

## [1.2.1](https://github.com/kdcloudone/kdesign/compare/v1.2.0...v1.2.1)
`2022-04-21`
* collapse
  * 修复视觉走查问题点
* drawer
  * 抽屉顶部关闭会出现闪烁
* radio
  * 修复视觉走查问题点
* select
  * 修复视觉走查问题点
* steps
  * fix token
* tag
  * 修复标签视觉走查问题点
* tree
  * 修复点击整行的触发意图混淆的问题
* 修复了usePopper没有把borderWidth加入计算的bug

## [1.2.0](https://github.com/kdcloudone/kdesign/compare/v1.1.3...v1.2.0)
`2022-04-14`
* anchor
  * 解决锚点组件锁住后重新打开，锚点浮层不能自动关闭问题
  * 修复视觉走查问题点
* button
  * 样式优化
  * 新增集合按钮
* carousel
  * 解决走马灯自动播放时内存泄漏问题
* empty
  * 去除demo中多余的name属性
  * 修复当页面中出现多个空组件时隐藏第一个组件导致渐变色不渲染的视觉问题
* image
  * 样式优化
* stepper
  * 样式优化
* switch
  * 样式优化
* icon
  * 新增sigma图标
* rate
  * 更新样式

## [1.1.3](https://github.com/kdcloudone/kdesign/compare/v1.1.2...v1.1.3)
`2022-04-07`
* checkbox
  * 修复视觉走查问题点
* layout
  * 修改siderTrigger的line-height为46px,防止出现滚动条
* input
  * 修复点击label中有input元素时的双击事件
* radio
  * 修复点击label中有input元素时的双击事件
* pagination
  * 更新样式
* 修复引用kdesign.less文件提示字体包缺失问题
* 去除了使用usePopper的时候useResizeObserver检测元素没有的警告

## [1.1.2](https://github.com/kdcloudone/kdesign/compare/v1.1.1...v1.1.2)
`2022-04-02`
* date-picker
  * 修复日期区间选择的选择块不跟随主题色的问题
* icon
  * 新增多个图标

## [1.1.1](https://github.com/kdcloudone/kdesign/compare/v1.1.0...v1.1.1)
`2022-04-01`
* base-data
  * 更正开放token属性及选中项颜色值
* form
  * 检验require未正确添加
  * fix token
* icon
  * 优化图标名称
  * 新增图标：xingzhuangjiehe
* collapse
  * 1：删除子菜单title；2：收起class根据collapsed属性添加；3：添加默认宽度，删除demo中的宽度；4：token相关修改 ([#29](https://github.com/kdcloudone/kdesign/issues/29))
* menu
  * 1：删除子菜单title；2：收起class根据collapsed属性添加；3：添加默认宽度，删除demo中的宽度；4：token相关修改 ([#29](https://github.com/kdcloudone/kdesign/issues/29))
* message
  * 更新消息提示视觉稿
* select
  * 修复选中时字体颜色值
* tree
  * 更新选中时图标与字体颜色
* carousel
  * 更新样式
* 格式修改

## [1.1.0](https://github.com/kdcloudone/kdesign/compare/v1.0.4...v1.1.0)
`2022-03-24`
* anchor
  * 修复锚点鼠标悬浮上去的样式
* card
  * 新增配置项extra
* link
  * 修复链接组件文档错误
* notification
  * 提示内容部分类名修改
  * 自定义样式例子优化
* split-panel
  * 更新分隔容器视觉稿
* transfer
  * 样式问题修复
* pagination
  * 修复pagination不能通过pageSize更改分页下拉选中选型的bug
* drawer
  * 抽屉组件样式更新
* kdesign组件库文档 底部样式修改 ，内容更新
* del memu title

## [1.0.4](https://github.com/kdcloudone/kdesign/compare/e94657f8a428cba3bce8f8747dbc7314c8fd736b...v1.0.4)
`2022-03-02`
* 修复官网IE11兼容问题
* 更新生成日志脚本
* 增加Design Token功能
* init
