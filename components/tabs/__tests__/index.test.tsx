import React from 'react'
import { render, mount } from 'enzyme'
import mountTest from '../../../tests/shared/mountTest'
import Tabs from '../index'
import { TabsTypes, TabsPositions } from '../tabs'
import Icon from '../../icon'

describe('Tabs', () => {
  mountTest(Tabs)

  it('renders correctly', () => {
    TabsTypes.forEach((type) => {
      const wrapper = render(
        <Tabs type={type}>
          <Tabs.TabPane key="TabPane1" tab="TabPane1" />
        </Tabs>,
      )
      expect(wrapper).toMatchSnapshot()
    })

    TabsPositions.forEach((pos) => {
      const wrapper = render(
        <Tabs type="card" position={pos} defaultActiveKey="TabPane1">
          <Tabs.TabPane key="TabPane1" tab="TabPane1" disabled />
          <Tabs.TabPane key="TabPane2" tab="TabPane2" />
        </Tabs>,
      )
      expect(wrapper).toMatchSnapshot()
    })

    const specialWrapper = (
      <Tabs type="dynamic">
        <Tabs.TabPane specialPane="left">
          <Icon type="workbench" />
        </Tabs.TabPane>
        <Tabs.TabPane key="TabPane1" tab="TabPane1" />
        <Tabs.TabPane specialPane="right">
          <Icon type="expand" />
        </Tabs.TabPane>
        <Tabs.TabPane specialPane="contextMenu">
          <div>关闭当前</div>
          <div>关闭其他</div>
        </Tabs.TabPane>
      </Tabs>
    )
    expect(specialWrapper).toMatchSnapshot()

    const data = Array(20)
      .fill(0)
      .map((v, i) => {
        return {
          name: `TabPane${v}${i}`,
          value: i,
        }
      })
    const scrollWrapper = mount(
      <div style={{ width: '200px' }} key="snap">
        <Tabs type="card" showScrollArrow defaultActiveKey={0}>
          {data.map((v) => (
            <Tabs.TabPane key={v.value} tab={v.name} />
          ))}
        </Tabs>
      </div>,
    )
    expect(scrollWrapper).toMatchSnapshot()
  })

  it('should have displayName static property', () => {
    const wrapper = mount(<Tabs />)
    expect((wrapper.type() as any).displayName).toBe('Tabs')
  })

  it('should class use right', () => {
    TabsTypes.forEach((type) => {
      const wrapper = mount(
        <Tabs type={type}>
          <Tabs.TabPane key="TabPane1" tab="TabPane1" />
        </Tabs>,
      )
      expect(wrapper.find('.kd-tabs-navs')).toHaveClassName(`.kd-tabs-navs-${type}`)
      expect(wrapper.find('.kd-tab-pane')).toHaveClassName(`.kd-tab-pane-type-${type}`)
    })
  })

  it('should activeKey use right', () => {
    const wrapper = mount(
      <Tabs activeKey="TabPane2">
        <Tabs.TabPane key="TabPane1" tab="TabPane1" />
        <Tabs.TabPane key="TabPane2" tab="TabPane2" />
      </Tabs>,
    )

    expect(wrapper.find('.kd-tab-pane-text-active')).toHaveText('TabPane2')
  })

  it('should arrow render right when scroll', () => {
    const data = Array(50)
      .fill(0)
      .map((v, i) => {
        return {
          name: `TabPane${v}${i}`,
          value: i,
        }
      })
    const wrapper = mount(
      <div style={{ width: '200px' }} key="click">
        <Tabs type="card" showScrollArrow defaultActiveKey={0}>
          {data.map((v) => (
            <Tabs.TabPane key={v.value} tab={v.name} />
          ))}
        </Tabs>
      </div>,
    )

    expect(wrapper).toContainMatchingElement('.kd-arrow-button-left')
    expect(wrapper).toContainMatchingElement('.kd-arrow-button-right')
  })

  it('should operations been render when type is dynamic', () => {
    const wrapper = mount(
      <Tabs type="dynamic">
        <Tabs.TabPane specialPane="left">
          <Icon type="workbench" />
        </Tabs.TabPane>
        <Tabs.TabPane key="TabPane1" tab="TabPane1" />
        <Tabs.TabPane specialPane="right">
          <Icon type="expand" />
        </Tabs.TabPane>
        <Tabs.TabPane specialPane="contextMenu">
          <div>关闭当前</div>
          <div>关闭其他</div>
        </Tabs.TabPane>
      </Tabs>,
    )
    expect(wrapper).toContainReact(<Icon type="workbench" />)
    expect(wrapper).toContainReact(<Icon type="expand" />)
  })

  it('should operations clickable when type is dynamic', () => {
    const onClickLeft = jest.fn()
    const onClickRight = jest.fn()
    const wrapper = mount(
      <Tabs type="dynamic">
        <Tabs.TabPane specialPane="left">
          <Icon type="workbench" onClick={onClickLeft} />
        </Tabs.TabPane>
        <Tabs.TabPane key="TabPane1" tab="TabPane1" />
        <Tabs.TabPane specialPane="right">
          <Icon type="expand" onClick={onClickRight} />
        </Tabs.TabPane>
      </Tabs>,
    )
    wrapper.find('.kdicon-workbench').simulate('click')
    wrapper.find('.kdicon-expand').simulate('click')
    expect(onClickLeft).toHaveBeenCalled()
    expect(onClickRight).toHaveBeenCalled()
  })
})
