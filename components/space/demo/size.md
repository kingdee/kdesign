---
order: 2
title: 间距大小
---

间距预设`small`, `middle`, `large`三种大小或者自定义数值，默认值为`small`。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Space, Button, Radio, Slider } from '@kdcloudjs/kdesign'
import type { ISpaceProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const [size, setSize] = React.useState<ISpaceProps['size']>('small');
  type reverseSize = 8 | 16 | 24;
  type Size = 'small' | 'middle' | 'large';

  const reverseSize = {
    8: 'small',
    16: 'middle',
    24: 'large',
  } as const;
  const mapSize = {
    small: 8,
    middle: 16,
    large: 24,
  } as const;
  const isSize = (value: unknown): value is Size => {
    return value === 'small' || value === 'middle' || value === 'large';
  };

  const getSize = (size: ISpaceProps['size']): number | undefined => {
    if (size !== undefined && isSize(size)) {
      return mapSize[size];
    }
    return undefined;
  };

  const isReverseSize = (value: unknown): value is reverseSize => {
    return value === 8 || value === 16 || value === 24;
  };

  const getReverseSize = (size: ISpaceProps['size']) => {
    if (size !== undefined && isReverseSize(size)) {
      return reverseSize[size];
    }
    return undefined;
  };

  return (
    <div style={{ width: '500px' }}>
      <Radio.Group
        value={getReverseSize(size) || size}
        onChange={(e) => setSize(e.target.value as ISpaceProps['size'])}
      >
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
      <Slider
        className="slider-container"
        value={getSize(size)}
        onChange={(value) => setSize(value as ISpaceProps['size'])}
      />
    </div>
  );
};

ReactDOM.render(<Demo />, mountNode)
```