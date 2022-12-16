---
order: 8
title: 更新日志
hiddenAnchor: true
---

## [1.6.22](https://github.com/kdcloudone/kdesign/compare/v1.6.21...v1.6.22)
`2022-12-16`
* radio
  * 禁用态依旧能选中 [#180](https://github.com/kdcloudone/kdesign/issues/180)
* 修复时间范围自定义render问题

## [1.6.21](https://github.com/kdcloudone/kdesign/compare/v1.6.20...v1.6.21)
`2022-12-08`
* checkbox
  * group onchange 事件添加返回值checkedValue
* menu
  * 修复点击失效问题 [#169](https://github.com/kdcloudone/kdesign/issues/169)
* radio
  * 修复radio value 无法识别number和字符串 [#171](https://github.com/kdcloudone/kdesign/issues/171)
* 修复ts版本升级导致的报错

## [1.6.20](https://github.com/kdcloudone/kdesign/compare/v1.6.19...v1.6.20)
`2022-12-06`
* button
  * 解决类型未定义导致ts报错问题
  * demo调整
* input
  * 修复数值输入框size设置不生效问题
* input-number
  * 修复数值输入框size设置不生效问题
* select
  * 修复多选搜索时全选问题

## [1.6.19](https://github.com/kdcloudone/kdesign/compare/v1.6.18...v1.6.19)
`2022-12-02`
* select
  * 修复多选模式下数据流问题

## [1.6.18](https://github.com/kdcloudone/kdesign/compare/v1.6.17...v1.6.18)
`2022-12-01`
* select
  * 去除多余的外边距
  * 修复超长文本溢出问题

## [1.6.17](https://github.com/kdcloudone/kdesign/compare/v1.6.16...v1.6.17)
`2022-11-28`
* checkbox
  * * stepper
  * * popperRef所在的区域mouseleave被禁止了后无法消失

## [1.6.16](https://github.com/kdcloudone/kdesign/compare/v1.6.15...v1.6.16)
`2022-11-24`
* date-picker
  * 修复allowClear显示错误
* modal
  * 修复弹窗内容过高时导致头部跟尾部高度被压缩问题
* select
  * 修复Option的value设置为number类型，删除tag异常的问题
  * demo调整
* tag
  * 修复Option的value设置为number类型，删除tag异常的问题
* 更新国际化文档

## [1.6.15](https://github.com/kdcloudone/kdesign/compare/v1.6.14...v1.6.15)
`2022-11-17`
* button
  * 添加文字按钮icon属性
* icon
  * 添加文字按钮icon属性
* carousel
  * 添加切换按钮
  * 修复空数据渲染问题
* dropdown
  * Dropdown 的定位元素为input的时候定位不准确的问题
  * 修复选择器onDropdownVisibleChange不触发问题
* input
  * Dropdown 的定位元素为input的时候定位不准确的问题
* form
  * 修复动态表单项问题
* image
  * 新增scalesAPI,控制图像预览缩放大小
* modal
  * 添加弹窗动画
* select
  * 修复选择器搜索模式下点击输入框导致搜索内容被清空问题
  * 修复选择器onDropdownVisibleChange不触发问题
  * 修复选择器onVisibleChange多次触发问题
* tree
  * 修复树组件可勾选模式下卡顿问题
  * 修复树组件虚拟模式卡顿问题
* table
  * 行选中增加高亮已选行属性及说明
* tooltip
  * 重复执行onVisibleChange
* 多次触发onVisibleChange 事件

## [1.6.14](https://github.com/kdcloudone/kdesign/compare/v1.6.13...v1.6.14)
`2022-11-11`
* date-picker
  * 修复className、placeholder及onChange问题
* form
  * 修复校验及监听事件失效问题
* icon
  * 修复props传值问题
* message
  * 更新api文档
* select
  * 调整选择器有边框时光标位置
  * 新增select token
* table
  * 修复表格demo拖拽列排序问题
* tooltip
  * 添加控制浮层箭头显示的属性arrow

## [1.6.13](https://github.com/kdcloudone/kdesign/compare/v1.6.12...v1.6.13)
`2022-11-04`
* button
  * 修复ts报错以及size不生效的问题
* 修复自动化构建报错问题

## [1.6.12](https://github.com/kdcloudone/kdesign/compare/v1.6.11...v1.6.12)
`2022-11-03`
* select
  * 解决多选时选中后输入框不聚焦问题
* slider
  * 添加getPopupContainer的api方法
* 修复ref问题

## [1.6.11](https://github.com/kdcloudone/kdesign/compare/v1.6.10...v1.6.11)
`2022-10-28`
* select
  * 修复选择器回填值显示问题

## [1.6.10](https://github.com/kdcloudone/kdesign/compare/v1.6.8...v1.6.10)
`2022-10-21`
* form
  * 修复rules不更新问题
* menu
  * 修复亮色模式悬浮色bug
* dropdown
  * kd-dropdown-link样式写入demo
* link
  * kd-dropdown-link样式写入demo
* upload
  * 添加itemRender 支持
  * 优化代码结构和处理警告
* 添加getPopupContainer属性

## [1.6.8](https://github.com/kdcloudone/kdesign/compare/v1.6.7...v1.6.8)
`2022-10-13`
* slider
  * 修复onAfterChange在移出到边界外不触发的问题

## [1.6.7](https://github.com/kdcloudone/kdesign/compare/v1.6.6...v1.6.7)
`2022-10-13`
* carousel
  * 去除列表元素的默认样式
* cascader
  * 更新清空按钮悬浮样式
* form
  * 更新文档
  * item为label添加htmlFor属性
* input
  * 修复清空按钮样式
* modal
  * 修复强控制提示弹窗demo的多次点击重复隐藏问题
* search
  * 增加搜索框圆角
* select
  * 调整选择器清除按钮样式
  * 去除选择器多余代码
  * 新增支持直接在输入框内输入内容搜索
* split-panel
  * 去掉分割容器拖动transition
* steps
  * 修复title多行情况下布局错乱问题
* 更新清空按钮颜色
* 修复bug及优化样式
* 添加融合行悬浮高亮

## [1.6.6](https://github.com/kdcloudone/kdesign/compare/v1.6.5...v1.6.6)
`2022-09-29`
* tooltip
  * 修复重复的token变量
* input
  * 开放countPosition属性用来摆放计数器位置
* table
  * 添加表格向外提供的api
* 文档内容更新

## [1.6.5](https://github.com/kdcloudone/kdesign/compare/v1.6.4...v1.6.5)
`2022-09-22`
* cascader
  * 更改清空按钮样式
  * 点击清空图标没有触发onChange的问题
* rate
  * 修复当value值为0时不触发视图更新的bug
* search
  * 修复basic模式下onFocus和onBlur不生效的问题
  * 添加清空搜索框的方法clearSearch
* transfer
  * 添加清空搜索框的方法clearSearch
* upload
  * 修复demo默认上传按钮的样式
  * 修复hover上传列表时操作按钮与文件列表背景色不同步的问题
* pagination
  * 添加配置总计的显示方式

## [1.6.4](https://github.com/kdcloudone/kdesign/compare/v1.6.3...v1.6.4)
`2022-09-15`
* date-picker
  * 修复z-index及禁用时的样式问题



## [1.6.2](https://github.com/kdcloudone/kdesign/compare/v1.6.1...v1.6.2)
`2022-09-08`
* icon
  * 去除demo中重复图标
* pagination
  * 修复api showSizeChanger设置不生效问题
* search
  * 修复api borderType设置bordered无效问题
  * 修复type为为quick-search时placeholder不生效问题
* transfer
  * 添加穿梭框的搜索框 placeholder 支持自定义功能
  * 修复分页时当前页数显示错误问题
  * 修复分页页数出现小数问题
  * 增加分页模式下可多选功能
* tree
  * 调整树控件拖拽展开逻辑
  * 解决拖拽时border导致节点内容收缩
  * 增加树控件垂直方向padding
  * 新增拖拽到节点上方功能
* date-picker
  * 更新token文档
* 调整在文档首页时翻页按钮位置

## [1.6.1](https://github.com/kdcloudone/kdesign/compare/v1.6.0...v1.6.1)
`2022-09-02`
* dropdown
  * 下拉菜单项点击不触发事件问题
* tree
  * 修复拖拽完成后存在多余样式问题

## [1.6.0](https://github.com/kdcloudone/kdesign/compare/v1.5.11...v1.6.0)
`2022-09-01`
* avatar
  * 修复头像组件图标位置偏下问题
* date-picker
  * 更新demo与文档描述内容
* form
  * 修复api tipFormatter配置无效问题
* slider
  * 修复api tipFormatter配置无效问题
* steps
  * 修复步骤条警告信息
* tree
  * 调整树控件外边距

## [1.5.11](https://github.com/kdcloudone/kdesign/compare/v1.5.10...v1.5.11)
`2022-08-25`
* alert
  * demo展示样式问题
* button
  * 新增按钮超出隐藏并出现省略号
  * 修复按钮文字换行问题
* cascader
  * demo点击跳转问题
* drawer
  * 调整demo
  * 修复抽屉显示时使页面抖动问题
* message
  * 修复手动点击关闭,不触发消息提示控件问题
* pagination
  * 颜色问题
* search
  * 修复demo图片不显示问题
* space
  * 修复demo显示问题
* transfer
  * 修复穿梭框方向键文字换行问题

## [1.5.10](https://github.com/kdcloudone/kdesign/compare/v1.5.9...v1.5.10)
`2022-08-22`
* table
  * 修复表格虚模式下表格从不可见到可见出现滚动条跳动问题

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
