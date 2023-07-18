---
title: 锚点区域边界
order: 3
---

定义锚点区域边界。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Anchor, Row, Col } from '@kdcloudjs/kdesign'

function Demo() {
  const warpRef = React.useRef(null);
  return (
    <div style={{ height: '300px', width:'100%', position:'relative'}}>
      <Row>
        <Col span={18}>
        <div ref={warpRef}  style={{ height: '300px', overflow: 'scroll'}}>
          <div
            id="part-1"
            style={{ height: '200px', background: 'rgba(255,0,0,0.02)', marginTop: '30px' }}
          >
            Part 1
          </div>
          <div id="part-2" style={{ height: '400px', background: 'rgba(0,255,0,0.02)' }}>
            Part 2
          </div>
          <div id="part-3" style={{ height: '400px', background: 'rgba(0,0,255,0.02)' }}>
            Part 3
          </div>
        </div>
        </Col>
        <Col span={6}>
          <Anchor
            affix={false}
            bounds={30}
            getContainer={() => warpRef.current}
          >
            <Anchor.Link href="#part-1" title="Part 1" />
            <Anchor.Link href="#part-2" title="part-2" />
            <Anchor.Link href="#part-3" title="part-3" />
          </Anchor>
        </Col>
      </Row>

      <div
        style={{
          height: '30px',
          background: 'rgba(0,0,0,0.85)',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '75%',
          color: '#FFF',
        }}
      >
        <div>30px height Block</div>
      </div>
    </div>
  );
}

ReactDOM.render(<Demo />, mountNode)
```
