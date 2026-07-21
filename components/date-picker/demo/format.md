---
title: 格式化
order: 12
---

可使用`format`属性进行输出格式化，配置参考 [date-fns.js](https://date-fns.org/)。

支持的格式化 token：
- `YYYY` 四位年份
- `MM` 两位月份数字
- `MMM` 月份缩写（受 locale.monthsShort 影响）
- `MMMM` 月份全名（受 locale.months 影响）
- `DD` / `dd` 两位日期
- `HH` 24小时制小时
- `mm` 分钟
- `ss` 秒

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import { DatePicker, RangePicker } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  return (
    <div>
      {/* 基础格式化 */}
      <div className="demo-range-picker">
        <h4>下划线分隔</h4>
        <RangePicker format="YYYY_MM_DD" />
      </div>

      {/* 中文日期格式 */}
      <div className="demo-range-picker">
        <h4>中文年月日</h4>
        <DatePicker format="YYYY年MM月DD日" defaultValue={new Date('2026-07-13')} />
      </div>

      {/* MMM 月份缩写 - 使用 locale.monthsShort */}
      <div className="demo-range-picker">
        <h4>MMM 月份缩写（中文）</h4>
        <DatePicker
          format="YYYY年MMMd日"
          defaultValue={new Date('2026-07-13')}
          locale={{
            monthsShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          }}
        />
      </div>

      {/* MMMM 月份全名 - 使用 locale.months */}
      <div className="demo-range-picker">
        <h4>MMMM 月份全名（中文）</h4>
        <DatePicker
          format="YYYY年MMMMd日"
          defaultValue={new Date('2026-07-13')}
          locale={{
            months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          }}
        />
      </div>

      {/* 英文月份格式 */}
      <div className="demo-range-picker">
        <h4>英文月份缩写</h4>
        <DatePicker
          format="MMM DD, YYYY"
          defaultValue={new Date('2026-07-13')}
          locale={{
            monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          }}
        />
      </div>

      {/* 英文月份全名 */}
      <div className="demo-range-picker">
        <h4>英文月份全名</h4>
        <DatePicker
          format="MMMM DD, YYYY"
          defaultValue={new Date('2026-07-13')}
          locale={{
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          }}
        />
      </div>

      {/* 自定义期数格式 */}
      <div className="demo-range-picker">
        <h4>月份 picker + 自定义后缀</h4>
        <RangePicker
          locale={{ month: '期' }}
          format="YYYY年MM期"
          placeholder={['开始期数', '结束期数']}
          picker="month"
        />
      </div>

      {/* RangePicker 使用月份名 */}
      <div className="demo-range-picker">
        <h4>RangePicker + MMMM</h4>
        <RangePicker
          format="YYYY年MMMMd日"
          locale={{
            months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          }}
        />
      </div>

      {/* 时间格式 */}
      <div className="demo-range-picker">
        <h4>日期+时间格式</h4>
        <DatePicker format="YYYY-MM-DD HH:mm:ss" showTime defaultValue={new Date('2026-07-13 14:30:00')} />
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
