import React from 'react'
import { render, mount } from 'enzyme'
import mountTest from '../../../tests/shared/mountTest'
import TabPane from '../tab-pane'
import Icon from '../../icon'

describe('Tabs Active Line', () => {
  mountTest(TabPane)

  it('renders correctly', () => {
    const wrapper = render(<TabPane key="TabPane1" tab="TabPane1" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should have displayName static property', () => {
    const wrapper = mount(<TabPane />)
    expect((wrapper.type() as any).displayName).toBe('TabPane')
  })

  it('should not clickable when pane is disabled', () => {
    const onChange = jest.fn()
    const wrapper = mount(<TabPane disabled onChange={onChange} />)
    wrapper.find('.kd-tab-pane-text').simulate('click')
    expect(onChange).not.toHaveBeenCalledWith()
  })

  it('should clickable', () => {
    const onChange = jest.fn()
    const wrapper = mount(<TabPane onChange={onChange} />)
    wrapper.find('.kd-tab-pane-text').simulate('click')
    expect(onChange).toHaveBeenCalled()
  })

  it("dynamic tabPane's icons should not clickable when it not active", () => {
    const onClick = jest.fn()
    const wrapper = mount(
      <TabPane
        type="dynamic"
        key="TabPane1"
        tab="TabPane1"
        operations={[<Icon key="1" type="close" onClick={onClick} />]}
      />,
    )
    wrapper.find('.kd-tab-pane-operations span').simulate('click')
    expect(onClick).not.toHaveBeenCalledWith()
  })
})
