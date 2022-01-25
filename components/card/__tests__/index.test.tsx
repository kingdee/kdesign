import React from 'react'
import { mount, render } from 'enzyme'
import Card from '..'
import mountTest from '../../../tests/shared/mountTest'
import Checkbox from '../../checkbox'
import Tag from '../../tag'

describe('Card', () => {
  mountTest(Card)

  it('renders correctly', () => {
    expect(render(<Card>Card Text</Card>)).toMatchSnapshot()
  })

  it('should have displayName static property', () => {
    const wrapper = mount(<Card>Text</Card>)
    expect((wrapper.type() as any).displayName).toBe('Card')
  })

  it('show title correctly', () => {
    const wrapper = mount(<Card title="title">Text</Card>)
    expect(wrapper.find('.kd-card-header')).toExist()
    expect(wrapper.find('.kd-card-header')).toHaveText('title')
  })

  it('should card can select', () => {
    const wrapper = mount(
      <Card title="title" selectable>
        Text
      </Card>,
    )
    expect(wrapper.find(Checkbox)).toExist()
  })

  it('show avatar correctly', () => {
    const avatar = {
      src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      title: '王可可',
      description: '视觉设计',
    }
    const wrapper = mount(
      <Card avatar={avatar} title="title">
        Text
      </Card>,
    )
    expect(wrapper.find('.kd-card-avatar')).toExist()
    expect(wrapper.find('.kd-card-avatar').find('.kd-card-avatar-img')).toExist()
    expect(wrapper.find('.kd-card-avatar').find('.kd-card-avatar-title')).toExist()
    expect(wrapper.find('.kd-card-avatar').find('.kd-card-avatar-desc')).toExist()
  })

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
})
