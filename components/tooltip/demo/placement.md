---
order: 1
title: 位置
---

有12个位置可供选择。

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Tooltip, Button } from '@kdcloudjs/kdesign'
import type { ITooltipProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const text: ITooltipProps['tip'] = <span>一行最多显示20个字符，超过的字符可折行显示，建议最多不要超过40个字符</span>
  const buttonWidth = 70
  const buttonStyle = {
    width: 70,
    marginRight: 8,
    marginBottom: 8,
  }
  return (
    <div className="demo">
      <div style={{ marginLeft: buttonWidth + 4, whiteSpace: 'nowrap' }}>
        <Tooltip placement="topLeft" tip={text}>
          <Button style={buttonStyle}>TL</Button>
        </Tooltip>
        <Tooltip placement="top" tip={text}>
          <Button style={buttonStyle}>Top</Button>
        </Tooltip>
        <Tooltip placement="topRight" tip={text}>
          <Button style={buttonStyle}>TR</Button>
        </Tooltip>
      </div>
      <div style={{ width: buttonWidth, float: 'left' }}>
        <Tooltip placement="leftTop" tip={text}>
          <Button style={buttonStyle}>LT</Button>
        </Tooltip>
        <Tooltip placement="left" tip={text}>
          <Button style={buttonStyle}>Left</Button>
        </Tooltip>
        <Tooltip placement="leftBottom" tip={text}>
          <Button style={buttonStyle}>LB</Button>
        </Tooltip>
      </div>
      <div style={{ width: buttonWidth, marginLeft: buttonWidth * 4 + 24 }}>
        <Tooltip placement="rightTop" tip={text}>
          <Button style={buttonStyle}>RT</Button>
        </Tooltip>
        <Tooltip placement="right" tip={text}>
          <Button style={buttonStyle}>Right</Button>
        </Tooltip>
        <Tooltip placement="rightBottom" tip={text}>
          <Button style={buttonStyle}>RB</Button>
        </Tooltip>
      </div>
      <div style={{ marginLeft: buttonWidth + 4, clear: 'both', whiteSpace: 'nowrap' }}>
        <Tooltip placement="bottomLeft" tip={text}>
          <Button style={buttonStyle}>BL</Button>
        </Tooltip>
        <Tooltip placement="bottom" tip={text}>
          <Button style={buttonStyle}>Bottom</Button>
        </Tooltip>
        <Tooltip placement="bottomRight" tip={text}>
          <Button style={buttonStyle}>BR</Button>
        </Tooltip>
      </div>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
