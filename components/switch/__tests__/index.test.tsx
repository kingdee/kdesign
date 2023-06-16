import React from 'react'
import { render, mount } from 'enzyme'
import mountTest from '../../../tests/shared/mountTest'
import Switch from '../index'
import { SwitchSizes } from '../switch'

describe('Switch', () => {
  // 1.mount test
  mountTest(Switch)

  // 2.render test
  it('renders correctly', () => {
    expect(render(<Switch />)).toMatchSnapshot()
    SwitchSizes.forEach((size) => {
      expect(render(<Switch size={size} />)).toMatchSnapshot()
    })
  })

  // 3.render no child without errors
  it('render no child without errors', () => {
    expect(mount(<Switch></Switch>)).toMatchSnapshot()
  })

  // 4.render null or undefined without errors
  it('render null or undefined without errors', () => {
    expect(
      mount(
        <Switch>
          {null}
          {undefined}
        </Switch>,
      ),
    ).toMatchSnapshot()
  })
  // 5.displayName
  it('should have displayName static property', () => {
    const wrapper = mount(<Switch />)
    expect((wrapper.type() as any).displayName).toBe('Switch')
  })
  // 6.className
  it('should class use right', () => {
    const DefaultSwitch = mount(<Switch />)
    expect(DefaultSwitch.find('.kd-switch')).toHaveClassName('.kd-switch-size-small')

    const DefaultCheckedSwitch = mount(<Switch defaultChecked />)
    expect(DefaultCheckedSwitch.find('.kd-switch')).toHaveClassName('.kd-switch-checked')

    const CheckedSwitch = mount(<Switch checked={true} />)
    expect(CheckedSwitch.find('.kd-switch')).toHaveClassName('.kd-switch-checked')

    const LoadingSwitch = mount(<Switch loading defaultChecked />)
    expect(LoadingSwitch.find('.kd-switch')).toHaveClassName('.kd-switch-loading')
    expect(LoadingSwitch.find('.kd-switch')).toHaveClassName('.kd-switch-disabled')

    const DisabledSwitch = mount(<Switch disabled />)
    expect(DisabledSwitch.find('.kd-switch')).toHaveClassName('.kd-switch-disabled')
  })
  // can not be clicked when disabled or loading
  it('should not clickable when switch is loading', () => {
    const onClick = jest.fn()
    const wrapper = mount(<Switch loading onClick={onClick} />)
    wrapper.simulate('click')
    expect(onClick).not.toHaveBeenCalledWith()
  })

  it('should not clickable when switch is disabled', () => {
    const onClick = jest.fn()
    const wrapper = mount(<Switch disabled onClick={onClick} />)
    wrapper.simulate('click')
    expect(onClick).not.toHaveBeenCalledWith()
  })

  const defaultSwitchProps = {
    unCheckedChildren: '关闭',
    checkedChildren: '开启',
    onClick: jest.fn(),
    onChange: jest.fn(),
  }
  // api
  it('api test', () => {
    const wrapper = mount(<Switch {...defaultSwitchProps}></Switch>)

    // unCheckedChildren and checkedChildren
    expect(wrapper.find('.kd-switch-inner')).toHaveText('关闭')
    wrapper.simulate('click')
    expect(wrapper.find('.kd-switch-inner')).toHaveText('开启')
    // onClick
    expect(defaultSwitchProps.onClick).toHaveBeenCalled()
    // onChange
    expect(defaultSwitchProps.onChange).toHaveBeenCalled()
  })
})
