import React from 'react'
import { mount } from 'enzyme'
import moment from 'moment'
import MockDate from 'mockdate'
import { RangePicker } from '../index'
import { RangeValue } from '../interface'

describe('RangePicker', () => {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {
    console.log('start')
  })
  const range: RangeValue = [new Date('2000-01-01'), new Date('2000-02-01')]

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
    let wrapper = mount(<RangePicker open value={range} />)
    expect(wrapper.render()).toMatchSnapshot()
    wrapper = mount(<RangePicker size="small" open value={range} />)
    expect(wrapper.render()).toMatchSnapshot()
    wrapper = mount(<RangePicker size="middle" open value={range} />)
    expect(wrapper.render()).toMatchSnapshot()
    wrapper = mount(<RangePicker size="large" open value={range} />)
    expect(wrapper.render()).toMatchSnapshot()
    wrapper = mount(<RangePicker picker="week" open value={range} />)
    expect(wrapper.render()).toMatchSnapshot()
    wrapper = mount(<RangePicker picker="month" open value={range} />)
    expect(wrapper.render()).toMatchSnapshot()
    wrapper = mount(<RangePicker picker="quarter" open value={range} />)
    expect(wrapper.render()).toMatchSnapshot()
    wrapper = mount(<RangePicker picker="year" open value={range} />)
    expect(wrapper.render()).toMatchSnapshot()
    wrapper = mount(<RangePicker picker="time" open value={range} />)
    expect(wrapper.render()).toMatchSnapshot()
  })

  it('showTime&borderType', () => {
    const wrapper = mount(<RangePicker size="large" borderType="bordered" defaultValue={range} showTime />)
    expect(wrapper.render()).toMatchSnapshot()
  })

  it('disabled date', () => {
    function disabledDate(current: any) {
      return current && current < moment().endOf('day')
    }

    const wrapper = mount(<RangePicker disabledDate={disabledDate} open />)

    expect(wrapper.render()).toMatchSnapshot()
  })

  it('placeholder', () => {
    const wrapper = mount(<RangePicker placeholder={undefined} />)
    expect(wrapper.find('input').at(0).props().placeholder).toEqual('开始日期')
    expect(wrapper.find('input').at(1).props().placeholder).toEqual('结束日期')
  })
})
