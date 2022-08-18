---
order: 8
title: 更新日志
hiddenAnchor: true
---

## [1.5.9](https://github.com/kdcloudone/kdesign/compare/v1.5.8...v1.5.9)
`2022-08-18`
* dropdown
  * 选项传入自定义类名点击事件失效的问题
* progress
  * 修复视觉走查问题点
* tabs
  * 修复页签组件视觉走查问题
* tree
  * 修复树控件视觉走查问题
  * 修复异步加载时loading按钮显示不全问题
* modal
  * 修复视觉走查问题点
* upload
  * 修复视觉走查问题点
* 修复组件token变量
* 修复浮层贴右侧边缘时导致的问题

## [1.5.8](https://github.com/kdcloudone/kdesign/compare/v1.5.7...v1.5.8)
`2022-08-12`
* 修复贴左侧边缘时导致的报错问题



## [1.5.6](https://github.com/kdcloudone/kdesign/compare/v1.5.5...v1.5.6)
`2022-08-11`
* tooltip
  * 修复当触发元素在右上角，trigger=top时，浮层超出显示边界的问题

## [1.5.5](https://github.com/kdcloudone/kdesign/compare/v1.5.4...v1.5.5)
`2022-08-11`
* dropdown
  * 修复设置defaultVisible后下拉菜单无法关闭的问题
  * 修复视觉走查问题点
* radio
  * BT-00876996 修复disabled状态下的鼠标悬浮手势
* spin
  * 修复视觉走查问题点
* timeline
  * 修复视觉走查问题点
* alert
  * 修复视觉走查问题点
* tree
  * 新增缩进模式配置
  * 增加异步加载功能

## [1.5.4](https://github.com/kdcloudone/kdesign/compare/v1.5.3...v1.5.4)
`2022-08-04`
* drawer
  * 修复纵向抽屉无法设置高度问题
* dropdown
  * dropdown组件item里面包含标签时点击无响应的bug
  * 子元素的ref获取不到的bug
* filter
  * 修复Filter组件demo展示问题
* radio
  * 修复单选组合禁用状态样式问题
* select
  * 解决allowClear模式下 value为0时清空按钮被渲染为0的问题
* stepper
  * 修复步进器禁用状态无效问题
* tabs
  * 修复页签border宽度问题
* tooltip
  * 组件-子组件的ref获取不到bug
* tree
  * 调整demo展开收起图标
  * 增加节点过滤功能api
* icon
  * 新增展开收起图标
* 更改统一导航菜单
* 更新footer的图片

## [1.5.3](https://github.com/kdcloudone/kdesign/compare/v1.5.2...v1.5.3)
`2022-07-29`
* input
  * 修复禁用状态下样式问题

## [1.5.2](https://github.com/kdcloudone/kdesign/compare/v1.5.1...v1.5.2)
`2022-07-28`
* anchor
  * 调整锚点组件定位偏移的逻辑
* avatar
  * 修复srcSet不生效问题
* input
  * 修复禁用状态下样式问题
* select
  * 修复禁用态出现清空按钮,并能继续触发清空操作的bug
  * 修复禁用态下的视觉
* tree
  * 调整拖拽时dropPosition计算

## [1.5.1](https://github.com/kdcloudone/kdesign/compare/v1.3.8...v1.5.1)
`2022-07-27`
* table
  * 增加滚动加载和滚动条宽度参数

## [1.5.0](https://github.com/kdcloudone/kdesign/compare/v1.4.1...v1.5.0)
`2022-07-21`
* carousel
  * 解决走马灯children为空时报错
* date-picker
  * 修复范围选择自定义后缀及颜色问题
* dropdown
  * 新增下拉菜单hover字体颜色token
* input
  * 修复清除图标颜色问题
* radio
  * 修复单选defaultChecked不生效问题
* tree
  * 调整拖拽时关系线样式
  * 树组件节点拖拽功能调整(允许拖入节点子级)
  * 新增节点过滤功能
* menu
  * 新增手风琴模式
* 官网改造

## [1.4.1](https://github.com/kdcloudone/kdesign/compare/v1.4.0...v1.4.1)
`2022-07-15`
* menu
  * :修复组件受控时赋值问题

## [1.4.0](https://github.com/kdcloudone/kdesign/compare/v1.3.9...v1.4.0)
`2022-07-15`
* menu
  * 受控组件路径问题
  * 样式修改

## [1.3.9](https://github.com/kdcloudone/kdesign/compare/v1.3.7...v1.3.9)
`2022-07-14`
* anchor
  * 锚点组件类名调整
  * 锚点组件取消监听事件调整
* form
  * onChange及disabled值处理
* menu
  * 菜单切换问题处理
  * 修改高亮样式
  * 样式修改
* select
  * 在启用listHeight属性的时候，拓展内容未固定
  * select下拉面板需要z-index设置
* switch
  * 解决开关文字垂直没对齐问题
* tree
  * 解决api estimatedItemSize设置树节点高度不生效问题
* 更正cra跳转链接

## [1.3.7](https://github.com/kdcloudone/kdesign/compare/v1.3.6...v1.3.7)
`2022-06-30`
* button
  * 修复loading按钮以及单个图标按钮默认居中的视觉问题
* checkbox
  * 修复ref取值为null的bug

## [1.3.6](https://github.com/kdcloudone/kdesign/compare/v1.3.5...v1.3.6)
`2022-06-27`
* table
  * 更新table版本

## [1.3.5](https://github.com/kdcloudone/kdesign/compare/v1.3.4...v1.3.5)
`2022-06-23`
* anchor
  * 锚点组件跟随页面滚动问题
* form
  * onChange及disabled值处理
* menu
  * 菜单切换问题处理
  * 样式修改
* select
  * 多选下 全选与取消全选onChange返回值问题
  * 解决select onChange回调第二个参数缺失问题
* table
  * 增加范围选中功能
  * 增加外部可配置表格复选框和单选框参数
* 下拉面板鼠标样式
* 调整滚动条样式
* 修复[@popperjs](https://github.com/popperjs)版本更新导致的单测报错
* 更新组件token文档

## [1.3.4](https://github.com/kdcloudone/kdesign/compare/v1.3.3...v1.3.4)
`2022-06-17`
* table
  * 修复@kdcloudjs/table更新导致的错误

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
