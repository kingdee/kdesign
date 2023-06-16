---
order: 8
title: 更新日志
hiddenAnchor: true
---

## [1.7.13](https://github.com/kdcloudone/kdesign/compare/v1.7.12...v1.7.13)
`2023-06-02`
* anchor
  * 纵向锚点增加背景色 fix [#360](https://github.com/kdcloudone/kdesign/issues/360)
* modal
  * 修复maskClassName不生效 fix [#413](https://github.com/kdcloudone/kdesign/issues/413)
* stepper
  * 修复大数字时自增或自减操作丢失精度 fix [#385](https://github.com/kdcloudone/kdesign/issues/385)
* select
  * 多选时onChange第二个参数返回nodes数组 fix [#388](https://github.com/kdcloudone/kdesign/issues/388)
  * 修复单选初始化时设置value无行选中效果问题 fix [#387](https://github.com/kdcloudone/kdesign/issues/387)
* tree
  * 多选时onChange第二个参数返回nodes数组 fix [#388](https://github.com/kdcloudone/kdesign/issues/388)
  * 修复单选初始化时设置value无行选中效果问题 fix [#387](https://github.com/kdcloudone/kdesign/issues/387)
  * 去除多选时行选中效果 fix [#401](https://github.com/kdcloudone/kdesign/issues/401)
* tree-select
  * 多选时onChange第二个参数返回nodes数组 fix [#388](https://github.com/kdcloudone/kdesign/issues/388)
  * 修复单选初始化时设置value无行选中效果问题 fix [#387](https://github.com/kdcloudone/kdesign/issues/387)
* color-picker
  * 新增颜色类型下拉面板选项背景色的design token [#386](https://github.com/kdcloudone/kdesign/issues/386)
* 修复在窗口尺寸变化时首页退出登录的问题 [#399](https://github.com/kdcloudone/kdesign/issues/399)

## [1.7.12](https://github.com/kdcloudone/kdesign/compare/v1.7.11...v1.7.12)
`2023-05-26`
* select
  * 修复面板高度超出时无法滚动的bug
* tree
  * 修复面板高度超出时无法滚动的bug
* tree-select
  * 修复面板高度超出时无法滚动的bug

## [1.7.11](https://github.com/kdcloudone/kdesign/compare/v1.7.10...v1.7.11)
`2023-05-26`
* search
  * 修复 MDocsSearch 搜索结果显示异常的问题 fixed kdcloudone[#378](https://github.com/kdcloudone/kdesign/issues/378)
* pagination
  * 修复页目数视觉问题

## [1.7.10](https://github.com/kdcloudone/kdesign/compare/v1.7.9...v1.7.10)
`2023-05-19`
* drawer
  * 更新抽屉组件单测
* input
  * 修复清空按钮触发失焦问题 fix [#371](https://github.com/kdcloudone/kdesign/issues/371)
* menu
  * 更新menu组件单测
* progress
  * 更新进度条组件单测
* split-panel
  * 更新分割容器组件单测
* switch
  * 更新开关组件单测
* collapse
  * 新增受控模式 fix [#341](https://github.com/kdcloudone/kdesign/issues/341)

## [1.7.9](https://github.com/kdcloudone/kdesign/compare/v1.7.8...v1.7.9)
`2023-05-12`
* input
  * allowClear占位问题 fix [#348](https://github.com/kdcloudone/kdesign/issues/348)
* dropdown
  * 新增dropdownRender属性 fix [#343](https://github.com/kdcloudone/kdesign/issues/343)
* select
  * 新增dropdownRender属性 fix [#343](https://github.com/kdcloudone/kdesign/issues/343)
* tree
  * 新增dropdownRender属性 fix [#343](https://github.com/kdcloudone/kdesign/issues/343)
* tree-select
  * 新增dropdownRender属性 fix [#343](https://github.com/kdcloudone/kdesign/issues/343)
* 修改从组件库登录成功后停留在首页的bug
* 修改组件库登录功能

## [1.7.8](https://github.com/kdcloudone/kdesign/compare/v1.7.7...v1.7.8)
`2023-05-08`
* table
  * 修复新增自适应宽度特性导致的报错

## [1.7.7](https://github.com/kdcloudone/kdesign/compare/v1.7.6...v1.7.7)
`2023-05-06`
* table
  * 新增列宽自适应功能 fix [#249](https://github.com/kdcloudone/kdesign/issues/249)

## [1.7.6](https://github.com/kdcloudone/kdesign/compare/v1.7.5...v1.7.6)
`2023-04-28`
* input
  * 修复校验状态样式
  * 添加校验状态
* form
  * 传递校验属性 fix [#330](https://github.com/kdcloudone/kdesign/issues/330)
* 修改登录功能cookie中的domin

## [1.7.5](https://github.com/kdcloudone/kdesign/compare/v1.7.4...v1.7.5)
`2023-04-27`
* card
  * 更新卡片单测
* carousel
  * 更新走马灯单测
* color-picker
  * 更新颜色选择器单测
  * 透明度可配置隐藏 [#329](https://github.com/kdcloudone/kdesign/issues/329)
* dropdown
  * Dropdown defaultKey 不生效[#326](https://github.com/kdcloudone/kdesign/issues/326)
* tree
  * 更新树组件单测
  * 修复单测报错
  * 修复重新设置scrollToKey父节点不展开问题 fix [#334](https://github.com/kdcloudone/kdesign/issues/334)
* 新增登录登出功能

## [1.7.4](https://github.com/kdcloudone/kdesign/compare/v1.7.3...v1.7.4)
`2023-04-21`
* table
  * 修复筛选条件等于\&不等于不生效的问题 fix [#310](https://github.com/kdcloudone/kdesign/issues/310)
* 修复由于postcss升级导致的ts报错

## [1.7.3](https://github.com/kdcloudone/kdesign/compare/v1.7.2...v1.7.3)
`2023-04-13`
* select
  * 修复defaultOpen默认打开下拉面板不生效 fix [#313](https://github.com/kdcloudone/kdesign/issues/313)
  * 修复下拉面板树样式与视觉稿不一致问题 fix [#323](https://github.com/kdcloudone/kdesign/issues/323)
  * 修复token命名重复问题 fix [#321](https://github.com/kdcloudone/kdesign/issues/321)
  * 修复defaultSelectedKeys不生效 fix [#322](https://github.com/kdcloudone/kdesign/issues/322)
* tree
  * 修复下拉面板树样式与视觉稿不一致问题 fix [#323](https://github.com/kdcloudone/kdesign/issues/323)
  * 修复token命名重复问题 fix [#321](https://github.com/kdcloudone/kdesign/issues/321)
  * 修复defaultSelectedKeys不生效 fix [#322](https://github.com/kdcloudone/kdesign/issues/322)
* tree-select
  * 修复下拉面板树样式与视觉稿不一致问题 fix [#323](https://github.com/kdcloudone/kdesign/issues/323)
  * 修复token命名重复问题 fix [#321](https://github.com/kdcloudone/kdesign/issues/321)

## [1.7.2](https://github.com/kdcloudone/kdesign/compare/v1.7.1...v1.7.2)
`2023-04-07`
* color-picker
  * 修复单测问题点
  * 修复ColorPicker中第三方包color不被babel编译的问题
  * 颜色面板下拉框中的option未固定位置 [#307](https://github.com/kdcloudone/kdesign/issues/307)
* modal
  * 修复多层弹窗拖拽会同时移动问题 fix [#312](https://github.com/kdcloudone/kdesign/issues/312)
  * 修复modal传入style不生效问题 fix [#317](https://github.com/kdcloudone/kdesign/issues/317)
  * 修复modal拖拽不能控制拖拽边界 fix [#318](https://github.com/kdcloudone/kdesign/issues/318)
* select
  * 更新选择器单测
* dropdown
  * 当子元素只有一个时，Dropdown.menu设置的属性不生效 (https://github.com/kdcloudone/kdesign/issues/308)
* menu
  * 当子元素只有一个时，Dropdown.menu设置的属性不生效 (https://github.com/kdcloudone/kdesign/issues/308)

## [1.7.1](https://github.com/kdcloudone/kdesign/compare/v1.7.0...v1.7.1)
`2023-03-24`
* pagination
  * 修复样式问题 fix [#288](https://github.com/kdcloudone/kdesign/issues/288)
* color-picker
  * add color-picker component
* 添加组件概览缩略图默认值
* 修复国际化配置需全量传入参数问题 fix [#297](https://github.com/kdcloudone/kdesign/issues/297)

## [1.7.0](https://github.com/kdcloudone/kdesign/compare/v1.6.40...v1.7.0)
`2023-03-23`
* cascader
  * 选择后反选对应的显示内容错误 fix [#289](https://github.com/kdcloudone/kdesign/issues/289)
  * 选择两个label相同的选项报错 fix [#290](https://github.com/kdcloudone/kdesign/issues/290)
* input
  * 修复mouseDown失焦问题 fix [#295](https://github.com/kdcloudone/kdesign/issues/295)
* select
  * 新增树选择器
* tree
  * 新增树选择器
* tree-select
  * 新增树选择器

## [1.6.40](https://github.com/kdcloudone/kdesign/compare/v1.6.39...v1.6.40)
`2023-03-16`
* button
  * 修复文字按钮禁用状态下触发click事件 fix [#281](https://github.com/kdcloudone/kdesign/issues/281)
* input
  * 修复suffix问题
* select
  * 修复传入options时optionLabelProp无效问题
  * 修复autoFocus不生效问题
  * 修复clearIcon不生效问题
* icon
  * 修复clearIcon不生效问题
* filter
  * 修复当父节点key值为0时filterTreeNode失效 fix [#280](https://github.com/kdcloudone/kdesign/issues/280)
* tree
  * 修复当父节点key值为0时filterTreeNode失效 fix [#280](https://github.com/kdcloudone/kdesign/issues/280)
  * 修复节点过滤时部分节点不展开问题 fix [#278](https://github.com/kdcloudone/kdesign/issues/278)
* upload
  * 修复children渲染问题

## [1.6.39](https://github.com/kdcloudone/kdesign/compare/v1.6.38...v1.6.39)
`2023-03-09`
* date-picker
  * 修复面板箭头问题
  * 修复内存泄露问题
  * 修复时间范围快速选择年月问题

## [1.6.38](https://github.com/kdcloudone/kdesign/compare/v1.6.37...v1.6.38)
`2023-03-02`
* image
  * 支持设置裁剪区域百分比 fix [#270](https://github.com/kdcloudone/kdesign/issues/270)
* image-cropper
  * 支持设置裁剪区域百分比 fix [#270](https://github.com/kdcloudone/kdesign/issues/270)
* radio
  * onChange 控制被选中项的bug [#273](https://github.com/kdcloudone/kdesign/issues/273)
* 修复prettier版本更新导致的格式校验报错

## [1.6.37](https://github.com/kdcloudone/kdesign/compare/v1.6.36...v1.6.37)
`2023-02-28`
* table
  * 修复分组列收起后,拖拽列宽鼠标位置不正确 bug

## [1.6.36](https://github.com/kdcloudone/kdesign/compare/v1.6.35...v1.6.36)
`2023-02-23`
* date-picker
  * 修复切换年月异常 fix [#256](https://github.com/kdcloudone/kdesign/issues/256)
* dropdown
  * menu 包含framgement 的时候不能传递class
* menu
  * menu 包含framgement 的时候不能传递class
* image
  * 图片裁剪重新上传按钮和其他按钮没有对启 fix [#238](https://github.com/kdcloudone/kdesign/issues/238)
* image-cropper
  * 图片裁剪重新上传按钮和其他按钮没有对启 fix [#238](https://github.com/kdcloudone/kdesign/issues/238)
* select
  * 修复可搜索选择器无法点击自身关闭下拉框问题

## [1.6.35](https://github.com/kdcloudone/kdesign/compare/v1.6.34...v1.6.35)
`2023-02-22`
* date-picker
  * 修复disabled时清除图标异常 fix [#256](https://github.com/kdcloudone/kdesign/issues/256)
* select
  * 当选项字符数较多时，多选框大小会被压缩 fix [#258](https://github.com/kdcloudone/kdesign/issues/258)
  * 修复视觉bug fix [#247](https://github.com/kdcloudone/kdesign/issues/247)
* tree
  * 自定义展开收起图标鼠标可点击范围太小 fix [#236](https://github.com/kdcloudone/kdesign/issues/236)
* 修复ts报错

## [1.6.34](https://github.com/kdcloudone/kdesign/compare/v1.6.33...v1.6.34)
`2023-02-20`
* rate
  * 修复自定义样式不生效的问题
* 更新单测配置文件

## [1.6.33](https://github.com/kdcloudone/kdesign/compare/v1.6.32...v1.6.33)
`2023-02-16`
* date-picker
  * 修复onChange多次触发问题
* table
  * 添加表格分组列展开收缩特性

## [1.6.32](https://github.com/kdcloudone/kdesign/compare/v1.6.31...v1.6.32)
`2023-02-13`
* stepper
  * 大数值下显示与操作bug fixs [#229](https://github.com/kdcloudone/kdesign/issues/229)
* tooltip
  * 消失时间太久的问题
* select
  * 新增虚拟滚动 fix [#174](https://github.com/kdcloudone/kdesign/issues/174)

## [1.6.31](https://github.com/kdcloudone/kdesign/compare/v1.6.30...v1.6.31)
`2023-02-09`
* form
  * 修复label布局问题 fix [#224](https://github.com/kdcloudone/kdesign/issues/224)
* grid
  * 栅格容器在搜狗浏览器下存在兼容性问题，没有上下间隔 fix [#227](https://github.com/kdcloudone/kdesign/issues/227)
* select
  * 下拉选择中点击全选触发的 onChange 回调没有返回值 fix [#234](https://github.com/kdcloudone/kdesign/issues/234)
  * 修复占位提示和下拉箭头重合问题 fix [#221](https://github.com/kdcloudone/kdesign/issues/221)
* tree
  * 修复树控件treeData更新展开节点不更新问题 fix [#235](https://github.com/kdcloudone/kdesign/issues/235)

## [1.6.30](https://github.com/kdcloudone/kdesign/compare/v1.6.29...v1.6.30)
`2023-02-07`
* cascader
  * 修复级联选择未固定下拉面板高度问题
* date-picker
  * 修复失焦触发onChange及样式问题
* input
  * 修复设置为负数最大长度显示问题 fixed [#220](https://github.com/kdcloudone/kdesign/issues/220)
  * digitLength和decimalLength同时配置，导致录入不了文本问题 fix [#222](https://github.com/kdcloudone/kdesign/issues/222)
  * 修复count下聚集问题
* input-number
  * 修复设置为负数最大长度显示问题 fixed [#220](https://github.com/kdcloudone/kdesign/issues/220)
  * digitLength和decimalLength同时配置，导致录入不了文本问题 fix [#222](https://github.com/kdcloudone/kdesign/issues/222)
* tooltip
  * trigger添加mouseleave事件控制显隐
* select
  * 修复传入selectedKeys无选中效果问题 fix [#215](https://github.com/kdcloudone/kdesign/issues/215)
* tree
  * 修复传入selectedKeys无选中效果问题 fix [#215](https://github.com/kdcloudone/kdesign/issues/215)
  * 修复tree组件展开收起问题 fix [#216](https://github.com/kdcloudone/kdesign/issues/216)

## [1.6.29](https://github.com/kdcloudone/kdesign/compare/v1.6.28...v1.6.29)
`2023-01-17`
* date-picker
  * 修复面板重置问题
* form
  * 修复form受控值onChange触发问题
* upload
  * 修复图片禁用问题

## [1.6.28](https://github.com/kdcloudone/kdesign/compare/v1.6.27...v1.6.28)
`2023-01-12`
* date-picker
  * 修复面板不更新及清除图标问题
* dropdown
  * children特殊值处理bug [#202](https://github.com/kdcloudone/kdesign/issues/202)
* form
  * 修复radio取值问题
* radio
  * 修复radio取值问题
* image
  * previewGroup的children为空时报错 [#201](https://github.com/kdcloudone/kdesign/issues/201)
  * 特定浏览器下预览图片时点击放大缩小按钮报错 [#193](https://github.com/kdcloudone/kdesign/issues/193)
* input
  * 修复数值输入框小数位不对问题
  * value传入数字报错 [#208](https://github.com/kdcloudone/kdesign/issues/208)
  * 实现input计数展示
  * 修复计数器显隐问题
* input-number
  * 修复数值输入框小数位不对问题
  * value传入数字报错 [#208](https://github.com/kdcloudone/kdesign/issues/208)
* select
  * 修复选择器清空问题 [#182](https://github.com/kdcloudone/kdesign/issues/182)
  * 修复选择器全选受控问题
* upload
  * 修复禁用下可删除问题
  * 修复origin属性问题

## [1.6.27](https://github.com/kdcloudone/kdesign/compare/v1.6.26...v1.6.27)
`2023-01-06`
* date-picker
  * 修复快速选择年月样式
* pagination
  * 新增图标替换功能
* select
  * 新增tagRender功能
* tag
  * 新增tagRender功能
* ref重复渲染问题

## [1.6.26](https://github.com/kdcloudone/kdesign/compare/v1.6.25...v1.6.26)
`2023-01-05`
* checkbox
  * checkboxgroup onchangeAPI 破坏性修改,参数checkedValue与 e:Event互换位置
* filter
  * 修复单测问题点
* select
  * 修复单选模式下选中后title显示问题
  * 修复多选时删除所选项问题
* stepper
  * 修复嵌入式步进器递增按钮点击区域不灵敏问题
* tree
  * 修复可勾选受控状态时半选按钮显示问题

## [1.6.25](https://github.com/kdcloudone/kdesign/compare/v1.6.24...v1.6.25)
`2023-01-03`
* 修复快速选择时间
* 修复面板ref赋值

## [1.6.24](https://github.com/kdcloudone/kdesign/compare/v1.6.23...v1.6.24)
`2022-12-29`
* select
  * 修复下拉项title设置不生效问题
  * 修改select组件全边框状态时光标的位置
* tooltip
  * 不论使用哪种触发方式移出poper的时候都出发隐藏
  * 修复第二次点击不触发onVisibleChange [#183](https://github.com/kdcloudone/kdesign/issues/183)
* tree
  * 修复禁用节点勾选bug

## [1.6.23](https://github.com/kdcloudone/kdesign/compare/v1.6.22...v1.6.23)
`2022-12-20`
* stepper
  * 调整步进器token
* cascader
  * 新增级联多选功能

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
