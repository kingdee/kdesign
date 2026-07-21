---
title: 国际化
order: 11
---

可使用`locale`属性进行国际化配置，仅作用于单个组件。

`locale` 支持以下字段：
- `monthTitle` — 面板中月份展示文字
- `months` — format 中 `MMMM` 输出的月份全名
- `monthsShort` — format 中 `MMM` 输出的月份缩写
- `weekTitle` — 面板中星期标题
- `month` / `year` — 面板头部月份/年份后缀

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import { DatePicker, RangePicker } from '@kdcloudjs/kdesign'
import type { IRangePickerProps } from '@kdcloudjs/kdesign'

const Demo = () => {
  const baseLocale: IRangePickerProps['locale'] = {
    placeholder: '请选择日期',
    yearPlaceholder: '请选择年份',
    quarterPlaceholder: '请选择季度',
    monthPlaceholder: '请选择月份',
    weekPlaceholder: '请选择周',
    timePlaceholder: '请选择时间',
    now: '此刻',
    confrim: '确定',
    today: '今天',
    month: '月',
    year: '年',
    weekTitle: ['日', '一', '二', '三', '四', '五', '六'],
    monthTitle: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    monthsShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    rangePlaceholder: ['开始日期', '结束日期'],
    rangeYearPlaceholder: ['开始年份', '结束年份'],
    rangeMonthPlaceholder: ['开始月份', '结束月份'],
    rangeWeekPlaceholder: ['开始周', '结束周'],
    rangeQuarterPlaceholder: ['开始季度', '结束季度'],
    rangeTimePlaceholder: ['开始时间', '结束时间'],
    monthBeforeYear: false,
  }

  return (
    <div>
      {/* 完整中文 locale */}
      <div className="demo-range-picker">
        <h4>完整中文配置</h4>
        <RangePicker locale={baseLocale} />
      </div>

      {/* 英文 locale */}
      <div className="demo-range-picker">
        <h4>英文配置</h4>
        <RangePicker
          locale={{
            monthTitle: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            weekTitle: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            year: '',
          }}
          placeholder={['Begin Date', 'End Date']}
        />
      </div>

      {/* 自定义期数 */}
      <div className="demo-range-picker">
        <h4>自定义期数后缀</h4>
        <RangePicker locale={{ month: '期' }} placeholder={['开始期数', '结束期数']} picker="month" />
      </div>

      {/* months 影响 MMMM 格式化 */}
      <div className="demo-range-picker">
        <h4>months 影响 MMMM 输出</h4>
        <DatePicker
          format="YYYY年MMMMd日"
          defaultValue={new Date('2026-07-13')}
          locale={{
            months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          }}
        />
      </div>

      {/* monthsShort 影响 MMM 格式化 */}
      <div className="demo-range-picker">
        <h4>monthsShort 影响 MMM 输出</h4>
        <DatePicker
          format="MMMd日 YYYY年"
          defaultValue={new Date('2026-07-13')}
          locale={{
            monthsShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          }}
        />
      </div>

      {/* monthTitle 独立于格式化 */}
      <div className="demo-range-picker">
        <h4>monthTitle 仅影响面板（不影响 format 输出）</h4>
        <DatePicker
          format="YYYY-MM-DD"
          defaultValue={new Date('2026-07-13')}
          locale={{
            monthTitle: ['壹月', '贰月', '叁月', '肆月', '伍月', '陆月', '柒月', '捌月', '玖月', '拾月', '拾壹月', '拾贰月'],
          }}
        />
      </div>

      {/* 日文示例 */}
      <div className="demo-range-picker">
        <h4>日文 locale 示例</h4>
        <DatePicker
          format="YYYY年MMMd日"
          defaultValue={new Date('2026-07-13')}
          locale={{
            monthsShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            weekTitle: ['日', '月', '火', '水', '木', '金', '土'],
            year: '年',
            month: '月',
          }}
        />
      </div>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```

```css
.demo-range-picker {
  width: 300px;
  margin: 10px 0;
}
.demo-range-picker h4 {
  margin: 4px 0;
  font-size: 12px;
  color: #666;
}
```
