import React from 'react'
import { mount, render } from 'enzyme'
import Card from '..'
import mountTest from '../../../tests/shared/mountTest'
import ConfigProvider from '../../config-provider/index'
import Checkbox from '../../checkbox'
import Tag from '../../tag'

describe('Card', () => {
  // 1.mount test
  mountTest(Card)

  // 2.render test
  it('renders correctly', () => {
    expect(render(<Card>Card Text</Card>)).toMatchSnapshot()
  })

  // 3.render no child without errors
  it('render no child without errors', () => {
    expect(mount(<Card></Card>)).toMatchSnapshot()
  })

  // 4.render null or undefined without errors
  it('render null or undefined without errors', () => {
    expect(
      mount(
        <Card>
          {null}
          {undefined}
        </Card>,
      ),
    ).toMatchSnapshot()
  })

  // 5.displayName
  it('should have displayName static property', () => {
    const wrapper = mount(<Card>Text</Card>)
    expect((wrapper.type() as any).displayName).toBe('Card')
  })

  // #region 6.API

  // className
  it('should show correct class name when set "className" of props', () => {
    expect(mount(<Card className="my-card"></Card>)).toHaveClassName('my-card')
  })

  // style
  it("should show correct style when set 'style' of props", () => {
    expect(mount(<Card style={{ backgroundColor: 'red' }}></Card>)).toHaveStyle('backgroundColor', 'red')
  })

  // actions
  it('show actions correctly', () => {
    const actions = [
      <a key="setting" href="true" onClick={(e) => e.preventDefault()}>
        配置
      </a>,
      <a key="edit" href="true" onClick={(e) => e.preventDefault()}>
        编辑
      </a>,
      <a key="disabled" href="true" onClick={(e) => e.preventDefault()}>
        禁用
      </a>,
    ]
    const wrapper = mount(
      <Card actions={actions} title="title">
        Text
      </Card>,
    )
    expect(wrapper.find('.kd-card-actions')).toExist()
    expect(wrapper.find('.kd-card-actions').find('a')).toHaveLength(3)
  })

  // extra
  it('show extra correctly', () => {
    const extra = [
      <div className="child" key="refresh">
        刷新
      </div>,
      <div className="child" key="setting">
        设置
      </div>,
    ]
    const wrapper = mount(<Card extra={extra}>Text</Card>)
    expect(wrapper.find('.kd-card-extra')).toExist()
    expect(wrapper.find('.child')).toHaveLength(2)
    expect(wrapper.find('.child').first()).toHaveText('刷新')
    expect(wrapper.find('.child').last()).toHaveText('设置')
  })

  // avatar
  it('show avatar correctly', () => {
    const avatar = {
      src: 'https://kui.kingdee.com/assets/image/avatar_m.png',
      title: '王可可',
      description: '视觉设计',
    }
    const wrapper = mount(
      <Card avatar={avatar} title="title">
        Text
      </Card>,
    )
    expect(wrapper.find('.kd-card-avatar')).toExist()
    expect(wrapper.find('.kd-card-header')).not.toExist()
    expect(wrapper.find('.kd-card-avatar').find('.kd-card-avatar-img')).toExist()
    expect(wrapper.find('.kd-card-avatar').find('.kd-card-avatar-title')).toExist()
    expect(wrapper.find('.kd-card-avatar').find('.kd-card-avatar-desc')).toExist()
  })

  // bodyStyle
  it('show bodyStyle correctly', () => {
    const bodyStyle = {
      backgroundColor: 'red',
    }
    const wrapper = mount(<Card bodyStyle={bodyStyle}>Text</Card>)
    expect(wrapper.find('.kd-card-body').props().style).toHaveProperty('backgroundColor', 'red')
  })

  // checkboxProps && checkboxProps
  it('should select and transfer the correct props when click the check box', () => {
    let bool = false
    const onChange = jest.fn((e) => {
      bool = e.target.checked
    })
    const wrapper = mount(
      <Card title="title" selectable checkboxProps={{ onChange }}>
        Text
      </Card>,
    )
    expect(wrapper.find(Checkbox)).toExist()
    ;(wrapper.find(Checkbox).props() as any).onChange({ target: { checked: true } })
    expect(onChange).toHaveBeenCalled()
    expect(bool).toBeTruthy()
  })

  // headStyle
  it('show headStyle correctly', () => {
    const headStyle = {
      backgroundColor: 'red',
    }
    const wrapper = mount(
      <Card title="标题文本" headStyle={headStyle}>
        Text
      </Card>,
    )
    expect(wrapper.find('.kd-card-header').props().style).toHaveProperty('backgroundColor', 'red')
  })

  // hoverable
  it('should show shadow correctly when mouse enter', () => {
    const wrapper = mount(<Card hoverable>Text</Card>)
    expect(wrapper.find('.kd-card.hoverable')).toExist()
  })

  // tags
  it('show tags correctly', () => {
    const tags = [
      <Tag key="age" type="attribute" color="process">
        司龄8年
      </Tag>,
      <Tag key="constellation" type="attribute" color="success">
        狮子座
      </Tag>,
      <Tag key="city" type="attribute" color="warning">
        深圳
      </Tag>,
    ]
    const wrapper = mount(
      <Card tags={tags} title="title">
        Text
      </Card>,
    )
    expect(wrapper.find('.kd-card-tags')).toExist()
    expect(wrapper.find('.kd-card-tags').find('.kd-tag')).toHaveLength(3)
  })

  // title
  it('show title correctly', () => {
    const wrapper = mount(<Card title="title">Text</Card>)
    expect(wrapper.find('.kd-card-header')).toExist()
    expect(wrapper.find('.kd-card-header')).toHaveText('title')
  })
  // #endregion

  // 7.class state
  // data-test向下传递
  it('should ensure native API or custom API can pass', () => {
    expect(mount(<Card data-index="1"></Card>)).toHaveProp('data-index', '1')
  })

  // 8.config provider
  it('should provide the correct configuration by using configuration provider', () => {
    const cardConfig = {
      compDefaultProps: {
        Card: {
          hoverable: true,
          selectable: true,
        },
      },
    }
    const wrapper = mount(
      <ConfigProvider value={cardConfig}>
        <Card>Demo Text</Card>
      </ConfigProvider>,
    )
    expect(wrapper.find('.hoverable')).toExist()
    expect(wrapper.find('.kd-checkbox')).toExist()
  })

  //! api暂未开发，antd提供ref
  // 9.ref test
  it('should get correct dom from ref of props', () => {
    const ref = React.createRef<HTMLDivElement>()
    mount(<Card ref={ref}></Card>)
    expect(ref.current instanceof HTMLDivElement).toBeTruthy()
  })
})
