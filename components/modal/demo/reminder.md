---
title: 通知弹出框
order: 2
---

系统推送重要信息时。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Modal, Icon, Button, Typography } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const { Title, Paragraph, Text } = Typography

  const [visible, setVisible] = React.useState<boolean>(false)

  const modalRef = React.useRef()

  const bodyStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }

  const title = (
    <div className="reminder-header">
      <img src="http://ikd.kingdee.com/kdrive/user/file?file_id=208008461" />
      <Icon className="reminder-closable" type="close" onClick={() => setVisible(false)} />
    </div>
  )

  const footer = (
    <div className="customed-footer">
      <Button className="reminder-button" style={{ marginRight: 12 }} onClick={() => setVisible(false)}>
        查看详情
      </Button>
      <Button className="reminder-button" type="primary" onClick={() => setVisible(false)}>
        立即续费
      </Button>
    </div>
  )

  const body = (
    <Paragraph>
      <Title level={3} style={{ textAlign: 'center' }}>
        苍穹服务到期提醒
      </Title>
      <Text style={{ fontSize: '14px', color: '#666666' }}>
        尊敬的客户：
        <br /> 您好！感谢您一直以来对金蝶云苍穹的支持，贵公司购买的金蝶云苍穹距租赁截止日期 <Text type="warning">
          还剩7天
        </Text>，为了保证您公司日常业务的正常运行，请及时续费。
      </Text>
    </Paragraph>
  )
  return (
    <div className="reminder" ref={modalRef}>
      <Button onClick={() => setVisible(true)}>通知弹出框</Button>
      <Modal
        showline={false}
        title={title}
        body={body}
        footer={footer}
        closable={false}
        bodyStyle={bodyStyle}
        getContainer={() => modalRef.current}
        width={368}
        height={368}
        visible={visible}
      />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```

```css
.reminder .kd-modal-header {
  padding: 0;
  height: 98px;
}
.reminder .kd-modal-body {
  padding: 20px 24px 24px 24px;
}
.reminder-header {
  position: relative;
}
.reminder-closable {
  position: absolute;
  right: 18px;
  top: 13px;
  font-size: 16px;
  color: #fff;
}
.reminder-button {
  width: 90px;
  height: 32px;
}
.reminder .kd-modal-footer {
  min-height: unset;
  height: 56px;
  align-items: flex-start;
}
```
