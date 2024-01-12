---
order: 8
title: 更新日志
hiddenAnchor: true
---

## [1.7.46](https://github.com/kdcloudone/kdesign/compare/v1.7.45...v1.7.46)
`2024-01-12`
* city-picker
  * 修复国内版回填的提示内容显示问题 fix [#708](https://github.com/kdcloudone/kdesign/issues/708)
* select
  * 调整全选逻辑 fix [#687](https://github.com/kdcloudone/kdesign/issues/687)
* tree
  * 修复勾选时onCheck函数返回了错误的halfCheckedKeys fix [#710](https://github.com/kdcloudone/kdesign/issues/710)
  * 新增api expandOnFilterNode支持过滤时是否显示过滤节点的下级 fix [#707](https://github.com/kdcloudone/kdesign/issues/707)
* filter
  * 新增api expandOnFilterNode支持过滤时是否显示过滤节点的下级 fix [#707](https://github.com/kdcloudone/kdesign/issues/707)
* 修复下拉面板未对齐问题 fix [#712](https://github.com/kdcloudone/kdesign/issues/712)

## [1.7.45](https://github.com/kdcloudone/kdesign/compare/v1.7.44...v1.7.45)
`2024-01-04`
* city-picker
  * 修复国内版搜索国外城市不显示上级区划 fix [#700](https://github.com/kdcloudone/kdesign/issues/700)
* filter
  * 修复demo中Option的报错
* form
  * 修复必选图标由于字体设置导致的样式不一致问题
* image
  * 修复api文档书写错误 fix [#688](https://github.com/kdcloudone/kdesign/issues/688)
* image-cropper
  * 修复api文档书写错误 fix [#688](https://github.com/kdcloudone/kdesign/issues/688)
* select
  * 多选搜索时下面面板未空时不显示全选按钮 fix [#698](https://github.com/kdcloudone/kdesign/issues/698)
  * 修复从单选切换为多选时页面报错的问题 fix [#701](https://github.com/kdcloudone/kdesign/issues/701)
* table
  * 更新table版本修复react18严格模式报错及全选与拖拽标题共用是报错问题 fix [#641](https://github.com/kdcloudone/kdesign/issues/641), [#695](https://github.com/kdcloudone/kdesign/issues/695)
  * 修复表格默认加载输出异常警告日志
  * 修复格式导致的报错
* 添加埋点功能

## [1.7.44](https://github.com/kdcloudone/kdesign/compare/v1.7.43...v1.7.44)
`2023-12-14`
* checkbox
  * 修复传入的children为空时样式显示问题 fix [#672](https://github.com/kdcloudone/kdesign/issues/672)
* select
  * 修复多选搜索没有结果时会把全选勾上 fix [#668](https://github.com/kdcloudone/kdesign/issues/668)
* tree
  * 修复expandOnClickNode为true时，点击叶子节点会触发loadData事件的问题 fix [#679](https://github.com/kdcloudone/kdesign/issues/679)

## [1.7.43](https://github.com/kdcloudone/kdesign/compare/v1.7.42...v1.7.43)
`2023-12-13`
* 提升开发环境构建速度 [#676](https://github.com/kdcloudone/kdesign/issues/676)
* 官网新增社区精选组件 [#675](https://github.com/kdcloudone/kdesign/issues/675)
* 社区精选组件链接跳转not Found (https://github.com/kdcloudone/kdesign/issues/680)

## [1.7.42](https://github.com/kdcloudone/kdesign/compare/v1.7.41...v1.7.42)
`2023-12-07`
* pagination
  * 修复total过大时导致页面卡顿问题 fix [#666](https://github.com/kdcloudone/kdesign/issues/666)
* tree
  * 修复在类组件中使用时,搜索结果未展开的问题 fix [#667](https://github.com/kdcloudone/kdesign/issues/667)
  * 修复loadData函数ts类型校验报错问题 fix [#651](https://github.com/kdcloudone/kdesign/issues/651)

## [1.7.41](https://github.com/kdcloudone/kdesign/compare/v1.7.40...v1.7.41)
`2023-12-04`
* input
  * 添加textarea限制字数后超出提示 fix [#650](https://github.com/kdcloudone/kdesign/issues/650)
* notification
  * 修复success回调重复触发问题 fix [#649](https://github.com/kdcloudone/kdesign/issues/649)
* modal
  * 新增支持弹窗拖拽调整大小功能 fix [#158](https://github.com/kdcloudone/kdesign/issues/158)
* 更新单测快照
* demo添加typescript支持 fix [#282](https://github.com/kdcloudone/kdesign/issues/282)
* kdesign官网无法在ie11上显示 [#662](https://github.com/kdcloudone/kdesign/issues/662)

## [1.7.40](https://github.com/kdcloudone/kdesign/compare/v1.7.39...v1.7.40)
`2023-11-27`
* alert
  * 修复点击关闭按钮依旧占位的问题 fix [#652](https://github.com/kdcloudone/kdesign/issues/652)
* modal
  * 修复弹窗超出视口高度时无法滚动的问题 fix [#226](https://github.com/kdcloudone/kdesign/issues/226) fix [#581](https://github.com/kdcloudone/kdesign/issues/581)
* tree
  * 修复树组件搜索不生效问题 fix [#644](https://github.com/kdcloudone/kdesign/issues/644)
* date-picker
  * 新增自定义单元格API fix [#266](https://github.com/kdcloudone/kdesign/issues/266)
* 添加剪切板组件预览图
* 修复demo中多余的name属性
* 新增二维码组件 [#626](https://github.com/kdcloudone/kdesign/issues/626)

## [1.7.39](https://github.com/kdcloudone/kdesign/compare/v1.7.37...v1.7.39)
`2023-10-27`
* cascader
  * 修复多选选中项很多时,滚动内容清空按钮不垂直居中问题 fix [#332](https://github.com/kdcloudone/kdesign/issues/332)
* input
  * 修复配置digitLength和decimalLength时的交互问题 fix [#630](https://github.com/kdcloudone/kdesign/issues/630)
* input-number
  * 修复配置digitLength和decimalLength时的交互问题 fix [#630](https://github.com/kdcloudone/kdesign/issues/630)
* select
  * 修复单选设置placeholder不生效问题 fix [#631](https://github.com/kdcloudone/kdesign/issues/631)
* tree
  * 修复单选设置placeholder不生效问题 fix [#631](https://github.com/kdcloudone/kdesign/issues/631)
* tree-select
  * 修复单选设置placeholder不生效问题 fix [#631](https://github.com/kdcloudone/kdesign/issues/631)
* readme文件新增官网链接

## [1.7.37](https://github.com/kdcloudone/kdesign/compare/v1.7.35...v1.7.37)
`2023-10-19`
* city-picker
  * 修复空值输入搜索内容时显示清空按钮问题 fix [#623](https://github.com/kdcloudone/kdesign/issues/623)
* message
  * 修复设置content为reactNode时图标和关闭按钮不出现的问题 fix [#293](https://github.com/kdcloudone/kdesign/issues/293)
* select
  * 去除单选的backspace快捷键功能 fix [#632](https://github.com/kdcloudone/kdesign/issues/632)
  * 修复在表单中无法重置树选择下拉面板选中项问题 fix [#588](https://github.com/kdcloudone/kdesign/issues/588)
  * 新增错误状态  fix [#627](https://github.com/kdcloudone/kdesign/issues/627)
  * 新增错误状态  fix [#628](https://github.com/kdcloudone/kdesign/issues/628)
* space
  * 去除单选的backspace快捷键功能 fix [#632](https://github.com/kdcloudone/kdesign/issues/632)
* tree
  * 修复在表单中无法重置树选择下拉面板选中项问题 fix [#588](https://github.com/kdcloudone/kdesign/issues/588)
  * 修复树组件设置节点过滤后无法展开收起节点问题 fix [#509](https://github.com/kdcloudone/kdesign/issues/509)
  * 新增错误状态  fix [#628](https://github.com/kdcloudone/kdesign/issues/628)
  * 新增连接线 fix [#214](https://github.com/kdcloudone/kdesign/issues/214)
* tree-select
  * 修复在表单中无法重置树选择下拉面板选中项问题 fix [#588](https://github.com/kdcloudone/kdesign/issues/588)
  * 新增错误状态  fix [#628](https://github.com/kdcloudone/kdesign/issues/628)
* clipboard
  * 新增剪贴板组件 fix [#584](https://github.com/kdcloudone/kdesign/issues/584)

## [1.7.35](https://github.com/kdcloudone/kdesign/compare/v1.7.34...v1.7.35)
`2023-10-19`
* dropdown
  * 修复传入dropdownRender属性导致页面卡死问题 fix [#573](https://github.com/kdcloudone/kdesign/issues/573)
* select
  * 修复传入dropdownRender属性导致页面卡死问题 fix [#573](https://github.com/kdcloudone/kdesign/issues/573)
  * 修复select下拉面板浮层位置变动为bottomRight后导致面板无法关闭问题 fix [#622](https://github.com/kdcloudone/kdesign/issues/622)
  * 新增选择器国际化功能 fix [#592](https://github.com/kdcloudone/kdesign/issues/592)
* color-picker
  * 修改输入框和下拉框的样式
* 修改开发环境的地址
* 新增visible和onVisibleChange API close (https://github.com/kdcloudone/kdesign/issues/580)

## [1.7.34](https://github.com/kdcloudone/kdesign/compare/v1.7.33...v1.7.34)
`2023-10-11`
* date-picker
  * 表单校验问题 fix [#619](https://github.com/kdcloudone/kdesign/issues/619)
  * 修复safari组件异常问题 fix [#609](https://github.com/kdcloudone/kdesign/issues/609)
* upload
  * ie兼容性问题处理 fix [#620](https://github.com/kdcloudone/kdesign/issues/620)

## [1.7.33](https://github.com/kdcloudone/kdesign/compare/v1.7.32...v1.7.33)
`2023-10-07`
* select
  * 修复下拉面板出现多余滚动条问题 fix [#595](https://github.com/kdcloudone/kdesign/issues/595)

## [1.7.32](https://github.com/kdcloudone/kdesign/compare/v1.7.31...v1.7.32)
`2023-09-27`
* select
  * 样式 BUG

## [1.7.31](https://github.com/kdcloudone/kdesign/compare/v1.7.30...v1.7.31)
`2023-09-27`
* select
  * 修复多选选择器页面上不显示问题 fix [#615](https://github.com/kdcloudone/kdesign/issues/615)
* table
  * 新增国际化配置
  * 修改table版本到最新版

## [1.7.30](https://github.com/kdcloudone/kdesign/compare/v1.7.29...v1.7.30)
`2023-09-27`
* city-picker
  * 更新快捷键规范 fix [#610](https://github.com/kdcloudone/kdesign/issues/610)
  * 更新清除按钮视觉规范 fix [#608](https://github.com/kdcloudone/kdesign/issues/608)
  * 修复禁用状态下不显示空提示 fix [#603](https://github.com/kdcloudone/kdesign/issues/603)
* grid
  * 修复边距问题
* select
  * 修复在ie11多选打开下拉面板页面卡死问题 fix [#612](https://github.com/kdcloudone/kdesign/issues/612)

## [1.7.29](https://github.com/kdcloudone/kdesign/compare/v1.7.28...v1.7.29)
`2023-09-25`
* grid
  * 修复单测报错
  * 修复ie11下间距失效的问题 fix [#604](https://github.com/kdcloudone/kdesign/issues/604)
* select
  * 修复在ie浏览器上出现多余滚动条问题 fix [#598](https://github.com/kdcloudone/kdesign/issues/598)

## [1.7.28](https://github.com/kdcloudone/kdesign/compare/v1.7.27...v1.7.28)
`2023-09-21`
* city-picker
  *  修复在ie浏览器出现滚动条问题 fix [#593](https://github.com/kdcloudone/kdesign/issues/593)
  * 修复选中项后回填值显示异常问题 fix [#596](https://github.com/kdcloudone/kdesign/issues/596)
  * 新增支持受控时传入value为城市数据 fix [#594](https://github.com/kdcloudone/kdesign/issues/594)
* config-provider
  * 修复新建组件脚本生成 config-provider 默认参数的 BUG fix: [#586](https://github.com/kdcloudone/kdesign/issues/586)
* grid
  * 修复ie11竖向间距消失的问题
* select
  * 修复在ie浏览器中使用选择器组件浏览器直接崩溃问题 fix [#579](https://github.com/kdcloudone/kdesign/issues/579)
* 修复编译全局less变量后的显示问题

## [1.7.27](https://github.com/kdcloudone/kdesign/compare/v1.7.26...v1.7.27)
`2023-09-15`
* city-picker
  * 修复国内版常用面板无省份数据时显示国家名 fix [#576](https://github.com/kdcloudone/kdesign/issues/576)
  * 修复下拉面板不关闭问题 fix [#575](https://github.com/kdcloudone/kdesign/issues/575)
  * 新增快捷键功能 fix [#582](https://github.com/kdcloudone/kdesign/issues/582)
* 添加开发新组件说明文档
* 国际化专项token开放第二批组件

## [1.7.26](https://github.com/kdcloudone/kdesign/compare/v1.7.25...v1.7.26)
`2023-09-08`
* cascader
  * 修复清空时显示问题 fix [#528](https://github.com/kdcloudone/kdesign/issues/528)
  * 修复disabled问题 fix [#397](https://github.com/kdcloudone/kdesign/issues/397),fix [#398](https://github.com/kdcloudone/kdesign/issues/398)
  * 修复focus相关api及样式问题 fix [#338](https://github.com/kdcloudone/kdesign/issues/338), fix [#395](https://github.com/kdcloudone/kdesign/issues/395)
  * 修复hover样式问题 fix [#396](https://github.com/kdcloudone/kdesign/issues/396)
* city-picker
  * 更新下拉面板视觉规范 fix [#565](https://github.com/kdcloudone/kdesign/issues/565)
  * 修复国际版当数据无province时，下拉项无分隔符问题 fix [#567](https://github.com/kdcloudone/kdesign/issues/567)
  * 修复受控时将value设置为空字符串,城市选项没清空问题 fix [#569](https://github.com/kdcloudone/kdesign/issues/569)
  * 修复ie浏览器下容器宽度过长问题 fix [#568](https://github.com/kdcloudone/kdesign/issues/568)
* collapse
  * 添加header描述性语句api
  * 修复边框显示问题 fix [#564](https://github.com/kdcloudone/kdesign/issues/564)
* select
  * 新增tag标签的title属性 fix [#570](https://github.com/kdcloudone/kdesign/issues/570)
* tag
  * 新增tag标签的title属性 fix [#570](https://github.com/kdcloudone/kdesign/issues/570)
* tree
  * 新增tag标签的title属性 fix [#570](https://github.com/kdcloudone/kdesign/issues/570)
* tree-select
  * 新增tag标签的title属性 fix [#570](https://github.com/kdcloudone/kdesign/issues/570)
* form
  * 新增extra属性 fix [#223](https://github.com/kdcloudone/kdesign/issues/223)

## [1.7.25](https://github.com/kdcloudone/kdesign/compare/v1.7.24...v1.7.25)
`2023-08-31`
* city-picker
  * 新增城市选择Token fix [#555](https://github.com/kdcloudone/kdesign/issues/555)
  * 修复切换页签导致常用面板显示异常问题 fix [#558](https://github.com/kdcloudone/kdesign/issues/558)
  * 修复搜索后关闭下拉面板时会闪烁到常用面板问题 fix [#560](https://github.com/kdcloudone/kdesign/issues/560)
  * 修复下拉面板省略号显示问题 fix [#553](https://github.com/kdcloudone/kdesign/issues/553)
  * 修复选中项出现多余逗号问题 fix [#554](https://github.com/kdcloudone/kdesign/issues/554)
  * 修复页签文字超出问题 fix [#562](https://github.com/kdcloudone/kdesign/issues/562)
  * 新增国际化配置 fix [#557](https://github.com/kdcloudone/kdesign/issues/557)
* form
  * 修复传入format后中间位置输入内容后光标自动回到末尾的问题 fix [#508](https://github.com/kdcloudone/kdesign/issues/508)
* input
  * 修复传入format后中间位置输入内容后光标自动回到末尾的问题 fix [#508](https://github.com/kdcloudone/kdesign/issues/508)
  * 修复输入值超出范围时失焦不触发onChange事件 fix [#464](https://github.com/kdcloudone/kdesign/issues/464)
* input-number
  * 修复传入format后中间位置输入内容后光标自动回到末尾的问题 fix [#508](https://github.com/kdcloudone/kdesign/issues/508)
  * 修复输入值超出范围时失焦不触发onChange事件 fix [#464](https://github.com/kdcloudone/kdesign/issues/464)
* radio
  * 修复radio在表格中选中发生位置偏移的问题
* select
  * 修复快捷键展开收起下拉面板不触发onVisibleChange回调问题 fix [#546](https://github.com/kdcloudone/kdesign/issues/546)

## [1.7.24](https://github.com/kdcloudone/kdesign/compare/v1.7.23...v1.7.24)
`2023-08-25`
* city-picker
  * 修复国内版页签切换到国际/中国港澳台时下拉面板显示问题 fix [#539](https://github.com/kdcloudone/kdesign/issues/539)
  * 修复下拉面板动效与选择器不一致问题 fix [#548](https://github.com/kdcloudone/kdesign/issues/548)
  * 修复下拉面板最后一行显示不全 fix [#549](https://github.com/kdcloudone/kdesign/issues/549)
  * 新增切换页签时的回调 fix [#536](https://github.com/kdcloudone/kdesign/issues/536)
* input
  * 更新input ref导致的报错
  * 新增键盘事件回调 fix [#529](https://github.com/kdcloudone/kdesign/issues/529)
* select
  * 修复下拉面板样式与视觉稿差异 fix [#543](https://github.com/kdcloudone/kdesign/issues/543)
  * 修复showSearch为false时focus后直接enter键报错问题 fix [#547](https://github.com/kdcloudone/kdesign/issues/547)
* search
  * 修复showSearch为false时focus后直接enter键报错问题 fix [#547](https://github.com/kdcloudone/kdesign/issues/547)
* table
  * 更新版本
* radio
  * fix: 修复没有文本的时候radio消失的问题 fix [#544](https://github.com/kdcloudone/kdesign/issues/544)
* input-number
  * 新增键盘事件回调 fix [#529](https://github.com/kdcloudone/kdesign/issues/529)
* 修复由于ref返回值变化导致报错 fix [#538](https://github.com/kdcloudone/kdesign/issues/538)

## [1.7.23](https://github.com/kdcloudone/kdesign/compare/v1.7.22...v1.7.23)
`2023-08-18`
* checkbox
  * 国际化token开放 取消checkbox的label的display属性修改

## [1.7.22](https://github.com/kdcloudone/kdesign/compare/v1.7.21...v1.7.22)
`2023-08-18`
* base-data
  * 修复demo中历史记录会重复的问题 fix [#361](https://github.com/kdcloudone/kdesign/issues/361)
* checkbox
  * checbox.Group ConfigProver 配置不生效 [#418](https://github.com/kdcloudone/kdesign/issues/418)
* collapse
  * 修复边框问题 fix [#433](https://github.com/kdcloudone/kdesign/issues/433)
* dropdown
  * 子元素为空的时候，报错 [#421](https://github.com/kdcloudone/kdesign/issues/421)
* input
  * 修复文档描述与实际效果不符 fix [#420](https://github.com/kdcloudone/kdesign/issues/420)
  * 修复defaultValue不生效问题 fix [#407](https://github.com/kdcloudone/kdesign/issues/407)
  * 新增focus/blur实例方法 fix [#523](https://github.com/kdcloudone/kdesign/issues/523)
* input-number
  * 修复文档描述与实际效果不符 fix [#420](https://github.com/kdcloudone/kdesign/issues/420)
  * 修复defaultValue不生效问题 fix [#407](https://github.com/kdcloudone/kdesign/issues/407)
* menu
  * 修复二级菜单渲染问题 fix [#344](https://github.com/kdcloudone/kdesign/issues/344)
  * 修复defaultOpenKeys问题 fix [#353](https://github.com/kdcloudone/kdesign/issues/353)
* button
  * 修复button点击不失焦,按enter多次弹出modal问题 fix [#414](https://github.com/kdcloudone/kdesign/issues/414)
* modal
  * 修复button点击不失焦,按enter多次弹出modal问题 fix [#414](https://github.com/kdcloudone/kdesign/issues/414)
* timeline
  * 修复设置reverse后的视觉偏差 fix [#409](https://github.com/kdcloudone/kdesign/issues/409)
* tooltip
  * : Tooltip文字提示 没有子元素的时候报错 [#406](https://github.com/kdcloudone/kdesign/issues/406)
* tree
  * 修复虚拟滚动节点过长无滚动条问题 fix [#530](https://github.com/kdcloudone/kdesign/issues/530)
  * 修复虚拟滚动列表高度未撑满整个树组件 fix [#526](https://github.com/kdcloudone/kdesign/issues/526)
* select
  * 新增focus,blur实例方法 fix [#429](https://github.com/kdcloudone/kdesign/issues/429)
* 更新单测
* 添加页面的title显示 fix [#394](https://github.com/kdcloudone/kdesign/issues/394)

## [1.7.21](https://github.com/kdcloudone/kdesign/compare/v1.7.20...v1.7.21)
`2023-08-11`
* select
  * 修复传入的value在option中不存在时的显示问题 fix [#503](https://github.com/kdcloudone/kdesign/issues/503)
  * 修复传入的value值在treeData不存在时的显示问题 fix [#504](https://github.com/kdcloudone/kdesign/issues/504)
* tree
  * 修复传入的value值在treeData不存在时的显示问题 fix [#504](https://github.com/kdcloudone/kdesign/issues/504)
  * 优化树控件虚拟滚动 fix [#520](https://github.com/kdcloudone/kdesign/issues/520)
* tree-select
  * 修复传入的value值在treeData不存在时的显示问题 fix [#504](https://github.com/kdcloudone/kdesign/issues/504)

## [1.7.20](https://github.com/kdcloudone/kdesign/compare/v1.7.19...v1.7.20)
`2023-08-04`
* checkbox
  * 修复按住shift时无法点击问题 fix [#500](https://github.com/kdcloudone/kdesign/issues/500)
* city-picker
  * 更新城市选择组件交互与视觉 fix [#516](https://github.com/kdcloudone/kdesign/issues/516)
* 修复生成token脚本,兼容无默认值情况
* 修改移动端顶部搜索按钮点击会触发隔壁的登录按钮问题 fix [#444](https://github.com/kdcloudone/kdesign/issues/444)
* 修复右侧导航显示错误

## [1.7.19](https://github.com/kdcloudone/kdesign/compare/v1.7.18...v1.7.19)
`2023-07-28`
* carousel
  * 修复效果为fade时,点击的元素与获取的信息不匹配的问题 [#497](https://github.com/kdcloudone/kdesign/issues/497)
* cascader
  * 修复受控问题 fix [#403](https://github.com/kdcloudone/kdesign/issues/403)
* collapse
  * 修复单测报错
  * single test modifications
* upload
  * 修复删除文件状态错误问题 fix [#507](https://github.com/kdcloudone/kdesign/issues/507)
  * 支持返回实例 fix [#451](https://github.com/kdcloudone/kdesign/issues/451)
* grid
  * single test modifications
* icon
  * single test modifications
* layout
  * single test modifications
* space
  * single test modifications
* spin
  * 加载单测补充
  * single test modifications
* stepper
  * single test modifications
* dropdown
  * 新增动效配置 fix [#457](https://github.com/kdcloudone/kdesign/issues/457)

## [1.7.18](https://github.com/kdcloudone/kdesign/compare/v1.7.17...v1.7.18)
`2023-07-17`
* cascader
  * 修复边距及样式问题 fix [#472](https://github.com/kdcloudone/kdesign/issues/472)
  * 修复样式问题
* dropdown
  * 修复input元素聚集时触发问题 fix [#489](https://github.com/kdcloudone/kdesign/issues/489)
* input
  * 修复input元素聚集时触发问题 fix [#489](https://github.com/kdcloudone/kdesign/issues/489)
  * 点击fixNode聚集问题 fix [#476](https://github.com/kdcloudone/kdesign/issues/476)
* select
  * 调整下拉面板上下间距 fix [#479](https://github.com/kdcloudone/kdesign/issues/479)
  * 调整选择器鼠标上下键切换选项样式 fix [#477](https://github.com/kdcloudone/kdesign/issues/477)  fix [#478](https://github.com/kdcloudone/kdesign/issues/478) fix [#480](https://github.com/kdcloudone/kdesign/issues/480)
  * 调整展开下拉面板后下拉箭头的颜色 fix [#483](https://github.com/kdcloudone/kdesign/issues/483)
  * 修复单选不带搜索选中选项后,再次点击选择器,输入框文字置灰问题 fix [#484](https://github.com/kdcloudone/kdesign/issues/484)
  * 修复单选选择某一项后选择框聚焦问题 fix [#485](https://github.com/kdcloudone/kdesign/issues/485)
  * 修复点击清空按钮下拉面板自动打开问题 fix [#486](https://github.com/kdcloudone/kdesign/issues/486)
  * 修复下拉面板自适应问题 fix [#482](https://github.com/kdcloudone/kdesign/issues/482)
  * 修复选择器悬浮手势问题 fix [#481](https://github.com/kdcloudone/kdesign/issues/481)

## [1.7.17](https://github.com/kdcloudone/kdesign/compare/v1.7.16...v1.7.17)
`2023-07-07`
* card
  * 修复onClick事件不执行的问题 fix [#462](https://github.com/kdcloudone/kdesign/issues/462)
* carousel
  * 修复异步请求的数据在初始化时不能正确渲染的问题 fix [#461](https://github.com/kdcloudone/kdesign/issues/461)
* color-picker
  * 修改面板下边距和关闭所有配置产生的bug, closes [#470](https://github.com/kdcloudone/kdesign/issues/470) [#471](https://github.com/kdcloudone/kdesign/issues/471)
* dropdown
  * 修复input为触发元素时位置问题 fix [#468](https://github.com/kdcloudone/kdesign/issues/468)
* input
  * 修复input为触发元素时位置问题 fix [#468](https://github.com/kdcloudone/kdesign/issues/468)
  * 修复方案查询不能设置自定义组件为Input的问题
* filter
  * 修复方案查询不能设置自定义组件为Input的问题

## [1.7.16](https://github.com/kdcloudone/kdesign/compare/v1.7.15...v1.7.16)
`2023-06-30`
* card
  * 为组件添加ref [#422](https://github.com/kdcloudone/kdesign/issues/422)
* color-picker
  * 新增国际化单测
  * 修复下拉面板中select框可输入的问题 [#453](https://github.com/kdcloudone/kdesign/issues/453)
* select
  * 修复下拉面板中select框可输入的问题 [#453](https://github.com/kdcloudone/kdesign/issues/453)
  * 修复单选时选择先前的值onChange也会触发的问题 fix [#450](https://github.com/kdcloudone/kdesign/issues/450)
  * 修复当多选选择器没有数据时全选按钮没办法取消勾选问题 fix [#454](https://github.com/kdcloudone/kdesign/issues/454)
  * 修复配置showSearch属性时鼠标手势问题 fix [#455](https://github.com/kdcloudone/kdesign/issues/455)
  * 修复鼠标手势问题
  * 修复树选择器的class名存在重复的问题 fix [#445](https://github.com/kdcloudone/kdesign/issues/445)
  * 新增api onlyExpandOnClickIcon 支持点击整行展开树节点 fix [#459](https://github.com/kdcloudone/kdesign/issues/459)
* form
  * 修复清空子组件异常问题 fix [#449](https://github.com/kdcloudone/kdesign/issues/449)
* input
  * 修复传入的值为数字时报错 fix [#430](https://github.com/kdcloudone/kdesign/issues/430)
* input-number
  * 修复传入的值为数字时报错 fix [#430](https://github.com/kdcloudone/kdesign/issues/430)
* notification
  * 修复问题，完善单测
* pagination
  * 调整数字与文字间距 fix: [#456](https://github.com/kdcloudone/kdesign/issues/456)
* search
  * 修复配置showSearch属性时鼠标手势问题 fix [#455](https://github.com/kdcloudone/kdesign/issues/455)
* transfer
  * 新增国际化单测
* tree
  * 修复树选择器的class名存在重复的问题 fix [#445](https://github.com/kdcloudone/kdesign/issues/445)
  * 新增api onlyExpandOnClickIcon 支持点击整行展开树节点 fix [#459](https://github.com/kdcloudone/kdesign/issues/459)
* tree-select
  * 修复树选择器的class名存在重复的问题 fix [#445](https://github.com/kdcloudone/kdesign/issues/445)
  * 新增api onlyExpandOnClickIcon 支持点击整行展开树节点 fix [#459](https://github.com/kdcloudone/kdesign/issues/459)
* upload
  * 修复onPreview问题 fix [#408](https://github.com/kdcloudone/kdesign/issues/408)
* button
  * 新增Button.Dropdown的loading api fix [#431](https://github.com/kdcloudone/kdesign/issues/431)
* dropdown
  * 新增Button.Dropdown的loading api fix [#431](https://github.com/kdcloudone/kdesign/issues/431)
* icon
  * 新增api onlyExpandOnClickIcon 支持点击整行展开树节点 fix [#459](https://github.com/kdcloudone/kdesign/issues/459)

## [1.7.15](https://github.com/kdcloudone/kdesign/compare/v1.7.14...v1.7.15)
`2023-06-16`
* card
  * 更新card单测
* carousel
  * 更新carousel单测
  * 修改api文档排版 [#424](https://github.com/kdcloudone/kdesign/issues/424)
* city-picker
  * 修复弹出面板无法关闭问题 fix [#441](https://github.com/kdcloudone/kdesign/issues/441)
* color-picker
  * 更新color-picker单测
* form
  * 修复组件取值问题 fix [#440](https://github.com/kdcloudone/kdesign/issues/440)
* input
  * 更新数值输入框单测
  * 修复边距问题
  * 修复style属性缺失 fix [#437](https://github.com/kdcloudone/kdesign/issues/437)
* input-number
  * 更新数值输入框单测
* modal
  * 更新modal组件单测
  * 修复拖动modal时内部的下拉框不自动关闭问题 fix [#442](https://github.com/kdcloudone/kdesign/issues/442)
* search
  * 更新搜索组件单测
* select
  * 更新select单测
  * 更新树选择器单测
* transfer
  * 更新transfer单测
* tree
  * 更新树选择器单测
  * 更新树组件单测
* tree-select
  * 更新树选择器单测
* 更新页面文档版本号

## [1.7.14](https://github.com/kdcloudone/kdesign/compare/v1.7.13...v1.7.14)
`2023-06-09`
* search
  * 本地启动项目，docs-search 匹配结果url主站为 react.kingdee.design,不是localhost fixes:kdcloudone[#359](https://github.com/kdcloudone/kdesign/issues/359)
* empty
  * 修复imageStyle不生效的问题 fix [#393](https://github.com/kdcloudone/kdesign/issues/393)
* image
  * 修复imageStyle不生效的问题 fix [#393](https://github.com/kdcloudone/kdesign/issues/393)
* select
  * 新增select快捷键 fix [#405](https://github.com/kdcloudone/kdesign/issues/405)

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
