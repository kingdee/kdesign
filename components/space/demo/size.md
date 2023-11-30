---
order: 2
title: 间距大小
---

间距预设`small`, `middle`, `large`三种大小或者自定义数值，默认值为`small`。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Space, Button, Radio, Slider } from '@kdcloudjs/kdesign'
import type { Size } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const [size, setSize] = React.useState<Size | 'small'>('small');

  const mapSize = {
    'small': 8,
    'middle': 16,
    'large': 24,
  }
  const reverseSize = {
    8: 'small',
    16: 'middle',
    24: 'large'
  }

  return (
    <div style={{ width: '300px' }}>
      <Radio.Group value={reverseSize[size] || size } onChange={e => setSize(e.target.value)}>
        <Radio value="small">Small</Radio>
        <Radio value="middle">Middle</Radio>
        <Radio value="large">Large</Radio>
      </Radio.Group>
      <br />
      <Space size={size}>
        <Button type="primary">Primary</Button>
        <Button>Default</Button>
        <Button type="ghost">Ghost</Button>
        <Button type="text">Link</Button>
      </Space>
      <br />
      <Slider className="slider-container" value={mapSize[size] || size} onChange={size => setSize(size)}/>
    </div>
  );
}

ReactDOM.render(<Demo />, mountNode)
```