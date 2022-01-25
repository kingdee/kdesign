import React from 'react'
import { render, mount } from 'enzyme'
import mountTest from '../../../tests/shared/mountTest'
import Switch from '../index'
import { SwitchSizes } from '../switch'

describe('Switch', () => {
  mountTest(Switch)

  it('renders correctly', () => {
    expect(render(<Switch />)).toMatchSnapshot()
    SwitchSizes.forEach((size) => {
      expect(render(<Switch size={size} />)).toMatchSnapshot()
    })
  })

  it('should have displayName static property', () => {
    const wrapper = mount(<Switch />)
    expect((wrapper.type() as any).displayName).toBe('Switch')
  })

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

  it('should clickable', () => {
    const onClick = jest.fn()
    const wrapper = mount(<Switch onClick={onClick} />)
    wrapper.simulate('click')
    expect(onClick).toHaveBeenCalled()
  })

  it('should onChange been emit when click', () => {
    const onChange = jest.fn()
    const wrapper = mount(<Switch onChange={onChange} />)
    wrapper.simulate('click')
    expect(onChange).toHaveBeenCalled()
  })
})
