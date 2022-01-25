import React from 'react'
import { mount } from 'enzyme'
import moment from 'moment'
import MockDate from 'mockdate'
import DatePicker from '../index'

describe('DatePicker', () => {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {
    console.log('start')
  })

  beforeEach(() => {
    MockDate.set(moment('2016-11-22 00:00:00').valueOf())
  })

  afterEach(() => {
    MockDate.reset()
    errorSpy.mockReset()
  })

  afterAll(() => {
    errorSpy.mockRestore()
  })

  it('base', () => {
    const birthday = new Date('2000-01-01')
    let wrapper = mount(<DatePicker open value={birthday} />)
    expect(wrapper.render()).toMatchSnapshot()
    wrapper = mount(<DatePicker size="large" open value={birthday} />)
    expect(wrapper.render()).toMatchSnapshot()
    wrapper = mount(<DatePicker size="middle" open value={birthday} />)
    expect(wrapper.render()).toMatchSnapshot()
    wrapper = mount(<DatePicker size="small" open value={birthday} />)
    expect(wrapper.render()).toMatchSnapshot()
    wrapper = mount(<DatePicker picker="week" open value={birthday} />)
    expect(wrapper.render()).toMatchSnapshot()
    wrapper = mount(<DatePicker picker="month" open value={birthday} />)
    expect(wrapper.render()).toMatchSnapshot()
    wrapper = mount(<DatePicker picker="quarter" open value={birthday} />)
    expect(wrapper.render()).toMatchSnapshot()
    wrapper = mount(<DatePicker picker="year" open value={birthday} />)
    expect(wrapper.render()).toMatchSnapshot()
    wrapper = mount(<DatePicker picker="time" open value={birthday} />)
    expect(wrapper.render()).toMatchSnapshot()
  })

  it('disabled date', () => {
    function disabledDate(current: any) {
      return current && current < moment().endOf('day')
    }

    const wrapper = mount(<DatePicker disabledDate={disabledDate} open />)

    expect(wrapper.render()).toMatchSnapshot()
  })

  it('placeholder', () => {
    const wrapper = mount(<DatePicker placeholder={undefined} />)
    expect(wrapper.find('input').props().placeholder).toEqual('请选择日期')
  })
})
