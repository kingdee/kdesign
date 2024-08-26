---
title: 自定义配置
order: 3
---

通过给设置一些其他自定义参数修改水印的展示效果。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Watermark, Form, Slider, Input, ColorPicker } from '@kdcloudjs/kdesign'
import type { IWatermarkProps } from '@kdcloudjs/kdesign'

function Demo() {
  const [options, setOptions] = React.useState<IWatermarkProps>({
    content: 'KDesign',
    zIndex: 0,
    gap: [100, 100],
    rotate: 20,
    fontStyle: {
      color: '#99ccff',
      fontSize: 16,
    },
  }) 

  const process = (value) => {
    const { content, rotate, fontSize, color, zIndex, gap0, gap1 } = value
    setOptions({
      content,
      rotate,
      zIndex,
      gap: [gap0, gap1],
      fontStyle: {
        fontSize,
        color,
      },
    })
  }

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '70%', overflow: 'hidden' }}>
        <Watermark {...options}>
          <p style={{ height: 500, padding: 20, lineHeight: 3 }}>
            金蝶是一家领先的云计算和企业管理软件及服务提供商。公司成立于1993年，总部位于中国深圳。金蝶提供包括ERP（企业资源规划）、财务管理、供应链管理、客户关系管理（CRM）、人力资源管理和业务智能等在内的多种解决方案。金蝶的产品和服务覆盖了不同规模的企业，从中小企业到大型集团都有相应的解决方案。随着云计算技术的发展，金蝶也在积极布局云服务市场，推出了金蝶云等一系列云端产品，帮助企业实现数字化转型和提升管理效率。金蝶不仅在中国市场有着广泛的影响力，在海外市场也有一定的市场份额和技术输出。通过持续的技术创新和服务优化，金蝶已经成为众多企业信赖的合作伙伴。
            金蝶是一家领先的云计算和企业管理软件及服务提供商。公司成立于1993年，总部位于中国深圳。金蝶提供包括ERP（企业资源规划）、财务管理、供应链管理、客户关系管理（CRM）、人力资源管理和业务智能等在内的多种解决方案。金蝶的产品和服务覆盖了不同规模的企业，从中小企业到大型集团都有相应的解决方案。随着云计算技术的发展，金蝶也在积极布局云服务市场，推出了金蝶云等一系列云端产品，帮助企业实现数字化转型和提升管理效率。金蝶不仅在中国市场有着广泛的影响力，在海外市场也有一定的市场份额和技术输出。通过持续的技术创新和服务优化，金蝶已经成为众多企业信赖的合作伙伴。
          </p>
        </Watermark>
      </div>
      <Form
        style={{ padding: 20, width: '30%' }}
        layout="vertical"
        onValuesChange={(changedValue, values) => {
          process({...values})
        }}>
        <Form.Item label="文字" name="content">
          <Input style={{ width: 260 }} defaultValue={'KDesign'} />
        </Form.Item>
        <Form.Item label="文字大小" name="fontSize">
          <Slider style={{ width: 260 }} defaultValue={16} />
        </Form.Item>
        <Form.Item label="文字旋转角度" name="rotate">
          <Slider style={{ width: 260 }} defaultValue={20} max={180} min={-180}/>
        </Form.Item>
        <Form.Item label="层级" name="zIndex">
          <Slider style={{ width: 20 }} defaultValue={0} max={0} min={-1}/>
        </Form.Item>
        <Form.Item label="文字颜色" name="color">
          <ColorPicker defaultValue={'#99ccff'}/>
        </Form.Item>
        <Form.Item label="水印之间的水平距离" name="gap0">
          <Slider style={{ width: 260 }} defaultValue={100} max={100} min={0}/>
        </Form.Item>
        <Form.Item label="水印之间的垂直距离" name="gap1">
          <Slider style={{ width: 260 }} defaultValue={100} max={100} min={0}/>
        </Form.Item>
      </Form>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
