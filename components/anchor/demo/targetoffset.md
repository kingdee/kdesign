---
title: 锚点滚动触发偏移量
order: 5
---

锚点滚动触发偏移量, 不设置时，默认与 offsetTop 相同

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Anchor, Row, Col } from '@kdcloudjs/kdesign'
import type { IAnchorProps } from '@kdcloudjs/kdesign'

function Demo() {
  const topRef = React.useRef<HTMLDivElement>(null);
  const warpRef = React.useRef<HTMLDivElement>(null);
  const [targetOffset, setTargetOffset] = React.useState<IAnchorProps['targetOffset']>();
  React.useEffect(() => {
  setTargetOffset(topRef.current ? topRef.current.clientHeight : undefined);
  }, [])
  return (
    <div style={{ height: '300px', width:'100%', position:'relative'}}>
      <Row>
        <Col span={18}>
        <div ref={warpRef}  style={{ height: '300px', overflow: 'scroll'}}>
          <div
            id="part-111"
            style={{ height: '200px', background: 'rgba(255,0,0,0.02)', marginTop: '200px' }}
          >
            Part 1
          </div>
          <div id="part-211" style={{ height: '400px', background: 'rgba(0,255,0,0.02)' }}>
            Part 2
          </div>
          <div id="part-311" style={{ height: '400px', background: 'rgba(0,0,255,0.02)' }}>
            Part 3
          </div>
        </div>
        </Col>
        <Col span={6}>
          <Anchor
            affix={false}
            targetOffset={targetOffset}
            getContainer={() => warpRef.current}
          >
            <Anchor.Link href="#part-111" title="Part 1" />
            <Anchor.Link href="#part-211" title="part-2" />
            <Anchor.Link href="#part-311" title="part-3" />
          </Anchor>
        </Col>
      </Row>

      <div
        ref={topRef}
        style={{
          height: '100px',
          background: 'rgba(0,0,0,0.85)',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '75%',
          color: '#FFF',
        }}
      >
        <div>100px height Block</div>
      </div>
    </div>
  );
}

ReactDOM.render(<Demo />, mountNode)
```
