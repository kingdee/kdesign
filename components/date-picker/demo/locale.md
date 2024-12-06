---
title: 国际化
order: 11
---

可使用`locale`属性进行国际化配置，仅作用于单个组件。

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import { RangePicker } from '@kdcloudjs/kdesign'
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
    rangePlaceholder: ['开始日期', '结束日期'],
    rangeYearPlaceholder: ['开始年份', '结束年份'],
    rangeMonthPlaceholder: ['开始月份', '结束月份'],
    rangeWeekPlaceholder: ['开始周', '结束周'],
    rangeQuarterPlaceholder: ['开始季度', '结束季度'],
    rangeTimePlaceholder: ['开始时间', '结束时间'],
  }

  return (
    <div>
      <div className="demo-range-picker">
        <RangePicker locale={baseLocale} />
      </div>
      <div className="demo-range-picker">
        <div className="demo-range-picker">
          <RangePicker
            locale={{
              monthTitle: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              weekTitle: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
              year: ''
            }}
            placeholder={['Begin Date','End Date']}
          />
        </div>
      </div>
      <div className="demo-range-picker">
        <div className="demo-range-picker">
          <RangePicker locale={{month: '期'}} placeholder={['开始期数','结束期数']} picker="month"/>
        </div>
      </div>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```

```css
.demo-range-picker {
  width: 150px;
  margin: 10px 0;
}
```
