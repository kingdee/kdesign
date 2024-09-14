---
title: 基本使用
order: 0
---

最基本使用方法。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Watermark } from '@kdcloudjs/kdesign'

function Demo() {
  return (
    <Watermark content="KDesign">
      <p style={{ height: 200, padding: 20, lineHeight: 3 }}>
        金蝶是一家领先的云计算和企业管理软件及服务提供商。公司成立于1993年，总部位于中国深圳。金蝶提供包括ERP（企业资源规划）、财务管理、供应链管理、客户关系管理（CRM）、人力资源管理和业务智能等在内的多种解决方案。金蝶的产品和服务覆盖了不同规模的企业，从中小企业到大型集团都有相应的解决方案。随着云计算技术的发展，金蝶也在积极布局云服务市场，推出了金蝶云等一系列云端产品，帮助企业实现数字化转型和提升管理效率。金蝶不仅在中国市场有着广泛的影响力，在海外市场也有一定的市场份额和技术输出。通过持续的技术创新和服务优化，金蝶已经成为众多企业信赖的合作伙伴。
      </p>
    </Watermark>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
