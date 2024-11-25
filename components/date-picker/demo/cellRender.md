---
title: 自定义单元格的内容
order: 14
---

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import { DatePicker, RangePicker } from '@kdcloudjs/kdesign'
import type { IDatePickerProps, IRangePickerProps } from '@kdcloudjs/kdesign'
import { isWeekend } from 'date-fns'

function Demo() {
  const TEST_DAY: IDatePickerProps['defaultValue'] = new Date('2023-01-02 00:00:00')
  const TEST_RANGE_DAY: IRangePickerProps['defaultValue'] = [TEST_DAY, TEST_DAY]

  const cellRender = (current, { originNode, panelType, subType, range, date }) => {
    let flag = false
    if (panelType === 'date') {
      flag = isWeekend(date)
    } else {
      flag = subType === 'hour' && current < 2 && range === 'start'
    }

    return flag ? React.cloneElement(originNode, { className: `${originNode.props.className} flag` }) : originNode
  }

  return (
    <div>
      <div className="demo-range-picker">
        <DatePicker defaultValue={TEST_DAY} cellRender={cellRender} />
      </div>
      <div className="demo-range-picker">
        <RangePicker defaultValue={TEST_RANGE_DAY} picker="time" cellRender={cellRender} />
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
.flag {
  position: relative;
}
.flag::after {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 6px;
  background: orange;
  content: '';
  bottom: 0;
  left: calc(50% - 3px);
}
```
