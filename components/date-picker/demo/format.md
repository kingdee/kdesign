---
title: 格式化
order: 12
---

可使用`format`属性进行输出格式化，配置参考 [date-fns.js](https://date-fns.org/)

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import { RangePicker } from '@kdcloudjs/kdesign'
import type { IRangePickerProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const format: IRangePickerProps['format'] = 'YYYY_MM_DD'
  return (
    <div>
      <div className="demo-range-picker">
        <RangePicker format={format} />
      </div>
      <div className="demo-range-picker">
        <div className="demo-range-picker">
          <RangePicker
            locale={{ month: '期' }}
            format={'YYYY年MM期'}
            placeholder={['开始期数', '结束期数']}
            picker="month"
          />
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
