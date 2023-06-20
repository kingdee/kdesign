---
order: 7
title: 国际化
---

`kdesign` 目前的默认文案是中文，如果需要使用其他语言，可以参考下面的方案。

## 本地语言包

kdesign 目前只提供了中文的语言包，后续将陆续提供其他语言包。kdesign 全局配置国际化文案使用 ConfigProvider 组件

```js
import zhCN from '@kdcloudjs/kdesign/lib/locale/zh-CN.tsx'

return (
  <ConfigProvider value={{ localeConfig: { localeData: zhCN } }}>
    <App />
  </ConfigProvider>
)
```

## 增加语言包

如果你找不到你需要的语言包，欢迎你在以下中文语言包的基础上创建一个新的语言包，并给我们发一个 Pull Request

```js
const locale = {
  locale: 'zh-CN',
  // 将下面中文替换为新的语言
  'DatePicker.placeholder': '请选择日期',
  'DatePicker.yearPlaceholder': '请选择年份',
  'DatePicker.quarterPlaceholder': '请选择季度',
  'DatePicker.monthPlaceholder': '请选择月份',
  'DatePicker.weekPlaceholder': '请选择周',
  'DatePicker.timePlaceholder': '请选择时间',
  'DatePicker.now': '此刻',
  'DatePicker.confrim': '确定',
  'DatePicker.today': '今天',
  'DatePicker.rangePlaceholder': ['开始日期', '结束日期'],
  'DatePicker.rangeYearPlaceholder': ['开始年份', '结束年份'],
  'DatePicker.rangeMonthPlaceholder': ['开始月份', '结束月份'],
  'DatePicker.rangeWeekPlaceholder': ['开始周', '结束周'],
  'DatePicker.rangeQuarterPlaceholder': ['开始季度', '结束季度'],
  'DatePicker.rangeTimePlaceholder': ['开始时间', '结束时间'],
  'global.selectholder': '请选择',
  'global.placeholder': '请输入...',
  'global.cancel': '取消',
  'global.confirm': '确定',
  'Button.text': '按钮',
  'Progress.circleLoadingDesc': '正在加载中',
  'Progress.loading': '正在加载中...',
  'Progress.fail': '加载失败',
  'Progress.success': '加载成功',
  'Pagination.prevPage': '上一页',
  'Pagination.nextPage': '下一页',
  'Pagination.total': '共{page}页{row}条',
  'Pagination.page': '共{page}页',
  'Pagination.row': '共{row}条',
  'Pagination.first': '第一页',
  'Pagination.last': '最后一页',
  'Pagination.perPage': '{size}条/页',
  'Pagination.order': '第{order}页',
  'Pagination.forward': '向前5页',
  'Pagination.backward': '向后5页',
  'Transfer.selectAll': '全选',
  'Transfer.searchPlaceholder': ['请输入需要搜索的内容', '请输入需要搜索的内容'],
  'Transfer.leftTitle': '可选列表',
  'Transfer.rightTitle': '已选列表',
  'Transfer.emptyTip': '暂无数据',
  'Modal.okText': '确定',
  'Modal.cancelText': '取消',
  'Modal.iknowText': '我知道了',
  'Empty.emptyText': '暂无数据',
  'Empty.searchEmptyText': '没有找到结果',
  'QuickSearch.placeholder': '请输入需要搜索的内容',
  'QuickSearch.desc': ['空格代表"或"，回车代表"且"'],
  'QuickSearch.nplDesc': '智能搜索',
  'QuickSearch.emptyTip': '暂无数据',
  'QuickSearch.or': '或',
  'CityPicker.domestic': '国内',
  'CityPicker.internation': '国际',
  'CityPicker.common': '常用',
  'CityPicker.noData': '暂无数据',
  'ColorPicker.followFunctionalColor': '跟随功能色',
  'Search.placeholder': '请输入需要搜索的内容',
  'Search.desc': ['空格代表"或"，回车代表"且"'],
  'Search.nplDesc': '智能搜索',
  'Search.emptyTip': '暂无数据',
  'Search.or': '或',
  'Filter.filterCondition': '筛选条件',
  'Filter.commonCondition': '常用条件',
  'Filter.schemeQuery': '方案查询',
  'Filter.spread': '展开',
  'Filter.packup': '收起',
  'Filter.filter': '过滤',
  'Filter.scheme': '方案',
  'Filter.unlimited': '不限',
  'Filter.commonScheme': '常用方案',
  'Filter.advancedQuery': '高级查询',
  'Filter.schemeName': '方案名称',
  'Filter.addCondition': '添加条件',
  'Filter.saveScheme': '保存方案',
  'Filter.query': '查询',
  'Filter.and': '并且',
  'Filter.settings': '设置',
  'Filter.schemeNamePlaceholder': '请输入方案名称',
}

export default locale
```

创建新的语言包后，使用 ConfigProvider 组件进行全局配置，参考 本地语言包 使用方法
