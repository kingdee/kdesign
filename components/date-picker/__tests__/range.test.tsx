import React from 'react'
import { mount } from 'enzyme'
import moment from 'moment'
import MockDate from 'mockdate'
import { RangePicker } from '../index'
import { Locale } from '../interface'
import locale from '../locale/zh_CN'
import { sleep } from '../../../tests/utils'

const START_DAY = '2000-10-01 00:00:00'
const END_DAY = '2000-10-31 01:00:00'
const TEST_DAY: any = [new Date(START_DAY), new Date(END_DAY)]

const SIZE_LIST = ['large', 'middle', 'small']

const BORDER_LIST = ['underline', 'bordered', 'none']

const TYPE_LIST = [
  { picker: 'date', placeholder: 'DatePicker.rangePlaceholder' },
  { picker: 'year', placeholder: 'DatePicker.rangeYearPlaceholder' },
  { picker: 'quarter', placeholder: 'DatePicker.rangeQuarterPlaceholder' },
  { picker: 'month', placeholder: 'DatePicker.rangeMonthPlaceholder' },
  { picker: 'week', placeholder: 'DatePicker.rangeWeekPlaceholder' },
  { picker: 'time', placeholder: 'DatePicker.rangeTimePlaceholder' },
]

const defaultProps = {
  value: TEST_DAY,
  open: true,
}

describe('RangePicker', () => {
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

  // 1.mount test
  it('mount test', () => {
    const wrapper = mount(<RangePicker />)
    expect(() => {
      wrapper.setProps({})
      wrapper.unmount()
    }).not.toThrow()
  })

  // 2.render test
  it('render api', () => {
    // size
    SIZE_LIST.forEach((size) => {
      const wrapper = mount(<RangePicker {...defaultProps} size={size as any} />)
      expect(wrapper).toMatchSnapshot()
    })

    // borderType
    BORDER_LIST.forEach((borderType) => {
      const wrapper = mount(<RangePicker {...defaultProps} borderType={borderType as any} />)
      expect(wrapper).toMatchSnapshot()
    })

    // picker
    TYPE_LIST.forEach(({ picker }) => {
      const wrapper = mount(<RangePicker {...defaultProps} picker={picker as any} />)
      expect(wrapper).toMatchSnapshot()
    })

    // showTime
    const wrapper1 = mount(<RangePicker {...defaultProps} showTime />)
    expect(wrapper1).toMatchSnapshot()

    // format
    const wrapper2 = mount(<RangePicker {...defaultProps} format={'YYYYMMDD'} />)
    expect(wrapper2).toMatchSnapshot()

    // suffixIcon
    const wrapper3 = mount(<RangePicker {...defaultProps} suffixIcon={<div>suffixIcon</div>} />)
    expect(wrapper3).toMatchSnapshot()

    // disabledDate
    const disabledDate = (current: any) => current && current < moment().endOf('day')
    const wrapper4 = mount(<RangePicker disabledDate={disabledDate} open />)
    expect(wrapper4.render()).toMatchSnapshot()

    // showNow
    const wrapper6 = mount(<RangePicker {...defaultProps} showNow />)
    expect(wrapper6).toMatchSnapshot()

    // showWeeksTitle
    const wrapper7 = mount(<RangePicker {...defaultProps} showWeeksTitle />)
    expect(wrapper7).toMatchSnapshot()

    // showWeekNumber
    const wrapper8 = mount(<RangePicker {...defaultProps} showWeekNumber />)
    expect(wrapper8).toMatchSnapshot()
  })

  // 3. displayName
  it('should have displayName static property', () => {
    const wrapper = mount(<RangePicker />)
    expect((wrapper.type() as any).displayName).toBe('RangePicker')
  })

  // 4. placeholder
  it('placeholder', () => {
    TYPE_LIST.forEach(({ picker, placeholder }) => {
      const wrapper = mount(<RangePicker {...defaultProps} picker={picker as any} />)
      expect(wrapper.find('input').at(0).props().placeholder).toEqual(locale[placeholder as keyof Locale][0])
      expect(wrapper.find('input').at(1).props().placeholder).toEqual(locale[placeholder as keyof Locale][1])
      wrapper.setProps({ placeholder: ['start', 'end'] })
      wrapper.update()
      expect(wrapper.find('input').at(0).props().placeholder).toEqual('start')
      expect(wrapper.find('input').at(1).props().placeholder).toEqual('end')
    })
  })

  // 5. className
  it('className', () => {
    const wrapper1 = mount(<RangePicker {...defaultProps} className={'my-class'} />)
    expect(wrapper1.find('.kd-date-picker').at(0).hasClass('my-class')).toBeTruthy()

    const wrapper2 = mount(<RangePicker {...defaultProps} dropdownClassName={'my-class'} />)
    expect(wrapper2.find('.kd-date-picker-panel').at(0).hasClass('my-class')).toBeTruthy()
  })

  // 6. style
  it('style & popupStyle', () => {
    const wrapper = mount(<RangePicker {...defaultProps} />)
    expect(wrapper.find('.kd-date-picker').at(0).prop('style')).toBeFalsy()
    wrapper.setProps({ style: { height: '50px' } })
    wrapper.update()
    expect(wrapper.find('.kd-date-picker').at(0).prop('style')).toEqual({ height: '50px' })
    expect(wrapper.find('.kd-date-picker')).toHaveStyle('height', '50px')

    const wrapper2 = mount(<RangePicker {...defaultProps} popupStyle={{ height: '50px' }} />)
    expect(wrapper2.find('.kd-date-picker-panel')).toHaveStyle('height', '50px')
  })

  // 7. ref test
  it('should get element from ref', () => {
    const ref = React.createRef()
    const refPopup = React.createRef()
    mount(<RangePicker {...defaultProps} ref={ref} popupRef={refPopup} />)
    expect((ref.current as HTMLElement).classList.contains('kd-date-picker')).toBe(true)
    expect((refPopup.current as HTMLElement).classList.contains('kd-date-picker-panel')).toBe(true)
  })

  // 8. value & defaultValue
  it('value & defaultValue', () => {
    let s = ''
    let e = ''
    let format = 'YYYY-MM-DD'
    let start = moment(TEST_DAY[0]).format(format)
    let end = moment(TEST_DAY[1]).format(format)
    const wrapperDefault = mount(<RangePicker {...defaultProps} />)
    expect(wrapperDefault.find('input').at(0).props().value).toBe(start)
    expect(wrapperDefault.find('input').at(1).props().value).toBe(end)

    // date
    const LIST = [
      {
        picker: 'date',
        format: 'YYYY-MM-DD',
        selector: '.kd-date-picker-calendar-text',
        item: [0, 10],
        ret: ['2000-10-01', '2000-10-11'],
        rec: ['2000-10-01', '2000-10-11'],
      },
      {
        picker: 'year',
        format: 'YYYY',
        selector: '.kd-date-picker-year-text',
        item: [0, 1],
        ret: ['1993', '1994'],
        rec: ['1993', '1994'],
      },
      {
        picker: 'quarter',
        format: 'YYYY-Q',
        selector: '.kd-date-picker-quarter-text',
        item: [0, 1],
        ret: ['2000-1', '2000-2'],
        rec: ['2000-Q4', '2000-Q4'],
      },
      {
        picker: 'month',
        format: 'YYYY-MM',
        selector: '.kd-date-picker-month-text',
        item: [0, 1],
        ret: ['2000-01', '2000-02'],
        rec: ['2000-01', '2000-02'],
      },
      {
        picker: 'week',
        format: 'YYYY-WW',
        selector: '.kd-date-picker-calendar-week-text',
        item: [0, 1],
        ret: ['2000-39', '2000-40'],
        rec: ['2000-41st', '2000-45th'],
      },
    ]

    const OP: any = ['quarter', 'week']

    LIST.forEach(({ picker, format, item, selector, ret, rec }) => {
      start = moment(TEST_DAY[0]).format(format)
      end = moment(TEST_DAY[1]).format(format)
      const onChange = jest.fn((v) => {
        s = moment(v[0]).format(format)
        e = moment(v[1]).format(format)
      })
      const wrapper = mount(<RangePicker {...defaultProps} onChange={onChange} picker={picker as any} />)
      expect(wrapper.find('input').at(0).props().value).toBe(OP.includes(picker) ? rec[0] : start)
      expect(wrapper.find('input').at(1).props().value).toBe(OP.includes(picker) ? rec[1] : end)
      wrapper.find('input').at(0).simulate('focus')
      wrapper.find(selector).at(item[0]).simulate('click')
      wrapper.find(selector).at(item[1]).simulate('click')
      expect(onChange).toHaveBeenCalled()
      expect(s).toBe(ret[0])
      expect(e).toBe(ret[1])
    })

    // time
    format = 'HH:mm:ss'
    start = moment(TEST_DAY[0]).format(format)
    end = moment(TEST_DAY[1]).format(format)
    let onChange = jest.fn((v) => {
      s = moment(v[0]).format(format)
      e = moment(v[1]).format(format)
    })
    const wrapper3 = mount(<RangePicker {...defaultProps} onChange={onChange} picker={'time'} />)
    expect(wrapper3.find('input').at(0).props().value).toBe(start)
    expect(wrapper3.find('input').at(1).props().value).toBe(end)
    wrapper3.find('input').at(0).simulate('focus')
    wrapper3.find('.kd-date-picker-time-cell-inner').at(1).simulate('click')
    wrapper3.find('.kd-date-picker-ok-btn').at(0).simulate('click')

    wrapper3.find('.kd-date-picker-time-cell-inner').at(2).simulate('click')
    wrapper3.find('.kd-date-picker-ok-btn').at(0).simulate('click')
    expect(onChange).toHaveBeenCalled()
    expect(s).toBe('01:00:00')
    expect(e).toBe('02:00:00')

    // date time
    format = 'YYYY-MM-DD HH:mm:ss'
    start = moment(TEST_DAY[0]).format(format)
    end = moment(TEST_DAY[1]).format(format)
    onChange = jest.fn((v) => {
      s = moment(v[0]).format(format)
      e = moment(v[1]).format(format)
    })
    const wrapper2 = mount(<RangePicker {...defaultProps} onChange={onChange} picker={'date'} showTime />)
    expect(wrapper2.find('input').at(0).props().value).toBe(start)
    expect(wrapper2.find('input').at(1).props().value).toBe(end)
    wrapper2.find('input').at(0).simulate('focus')
    wrapper2.find('.kd-date-picker-calendar-text').at(1).simulate('click')
    wrapper2.find('.kd-date-picker-ok-btn').at(0).simulate('click')

    wrapper2.find('.kd-date-picker-calendar-text').at(2).simulate('click')
    wrapper2.find('.kd-date-picker-ok-btn').at(0).simulate('click')
    expect(onChange).toHaveBeenCalled()
    expect(s).toBe('2000-10-02 00:00:00')
    expect(e).toBe('2000-10-03 01:00:00')
  })

  // 9. event
  it('event', () => {
    const onChange = jest.fn()
    const onOk = jest.fn()

    const wrapper = mount(
      <RangePicker defaultValue={defaultProps.value} showTime open onChange={onChange} onOk={onOk} />,
    )

    // onOK
    wrapper.find('input').at(0).simulate('focus')
    wrapper.find('.kd-date-picker-calendar-text').at(0).simulate('click')
    wrapper.find('.kd-date-picker-ok-btn').at(0).simulate('click')
    expect(onOk).toHaveBeenCalled()
  })

  // 10. clear & clearIcon
  it('clear & clearIcon', () => {
    const onChange = jest.fn()
    const wrapper = mount(<RangePicker open defaultValue={defaultProps.value} onChange={onChange} />)

    // element
    wrapper.find('.kd-date-picker').simulate('mouseEnter')
    expect(wrapper.find('.kd-date-picker-range-clear')).toHaveLength(1)
    wrapper.setProps({ clearIcon: <div className={'my-clear'}>clear</div> })
    wrapper.update()
    wrapper.find('.kd-date-picker').simulate('mouseEnter')
    expect(wrapper.find('.my-clear')).toHaveLength(1)

    // event
    TYPE_LIST.forEach(({ picker }) => {
      const wrapper = mount(
        <RangePicker open defaultValue={defaultProps.value} onChange={onChange} picker={picker as any} />,
      )
      wrapper.find('.kd-date-picker').simulate('mouseEnter')
      wrapper.find('.kd-date-picker-range-clear').simulate('click')
      expect(onChange).toHaveBeenCalled()
      expect(wrapper.find('input').at(0).props().value).toBe('')
      expect(wrapper.find('input').at(1).props().value).toBe('')
    })
  })

  // 11. getPopupContainer
  it('getPopupContainer', () => {
    const wrapperRef = React.createRef() as any
    const popupContainer = mount(
      <div ref={wrapperRef}>
        <RangePicker {...defaultProps} getPopupContainer={() => wrapperRef.current} />
      </div>,
    )
    expect(popupContainer.find('.kd-date-picker-panel').length).toBe(1)
  })

  // 12. Next & Prev
  it('onNext & onPrev & onSuperPrev & onSuperNext', () => {
    const wrapper = mount(<RangePicker {...defaultProps} />)

    // onSuperPrev
    wrapper.find('.kd-date-picker-header-icon').at(0).simulate('click')
    expect(wrapper.find('.kd-date-picker-header-text-inner').at(0).text()).toBe('1999年')

    // onPrev
    wrapper.find('.kd-date-picker-header-icon').at(1).simulate('click')
    expect(wrapper.find('.kd-date-picker-header-text-inner').at(1).text()).toBe('9月')

    // onNext
    wrapper.find('.kd-date-picker-header-icon').at(2).simulate('click')
    expect(wrapper.find('.kd-date-picker-header-text-inner').at(1).text()).toBe('9月')

    // onSuperNext
    wrapper.find('.kd-date-picker-header-icon').at(3).simulate('click')
    expect(wrapper.find('.kd-date-picker-header-text-inner').at(0).text()).toBe('1999年')
  })

  // 13. time-picker
  it('time picker api', () => {
    const wrapper = mount(
      <RangePicker
        picker="time"
        defaultValue={[new Date('2000-01-01 00:00:00'), new Date('2000-01-01 02:00:00')]}
        open
        use12Hours
        hourStep={2}
        minuteStep={2}
        secondStep={2}
        disabledHours={() => [3, 5, 6, 7, 8, 9, 10]}
        disabledMinutes={() => [3, 4]}
        disabledSeconds={() => [4, 6, 18, 19, 20]}
      />,
    )

    // disabledHours
    expect(wrapper.find('input').at(0).props().value).toBe('12:00:00 AM')
    expect(wrapper.find('.kd-date-picker-time-cell-inner').at(3).text()).toBe('06')
    wrapper.find('.kd-date-picker-time-cell-inner').at(3).simulate('click')
    expect(wrapper.find('input').at(0).props().value).toBe('12:00:00 AM')

    // change hours
    expect(wrapper.find('.kd-date-picker-time-cell-inner').at(2).text()).toBe('04')
    wrapper.find('.kd-date-picker-time-cell-inner').at(2).simulate('click')
    expect(wrapper.find('input').at(0).props().value).toBe('04:00:00 AM')

    // disabledMinutes
    const minutes = wrapper.find('.kd-date-picker-time-column').at(1).find('.kd-date-picker-time-cell-inner')
    expect(wrapper.find('input').at(0).props().value).toBe('04:00:00 AM')
    expect(minutes.at(2).text()).toBe('04')
    minutes.at(2).simulate('click')
    expect(wrapper.find('input').at(0).props().value).toBe('04:00:00 AM')

    // change minutes
    expect(minutes.at(3).text()).toBe('06')
    minutes.at(3).simulate('click')
    expect(wrapper.find('input').at(0).props().value).toBe('04:06:00 AM')

    // disabledSeconds
    const seconds = wrapper.find('.kd-date-picker-time-column').at(2).find('.kd-date-picker-time-cell-inner')
    expect(wrapper.find('input').at(0).props().value).toBe('04:06:00 AM')
    expect(seconds.at(2).text()).toBe('04')
    seconds.at(2).simulate('click')
    expect(wrapper.find('input').at(0).props().value).toBe('04:06:00 AM')

    // change seconds
    expect(seconds.at(4).text()).toBe('08')
    seconds.at(4).simulate('click')
    expect(wrapper.find('input').at(0).props().value).toBe('04:06:08 AM')

    // change AM
    const am = wrapper.find('.kd-date-picker-time-column').at(3).find('.kd-date-picker-time-cell-inner')
    expect(am.at(1).text()).toBe('PM')
    am.at(1).simulate('click')
    expect(wrapper.find('input').at(0).props().value).toBe('04:06:08 PM')
  })

  // 14. quick select
  it('quick select', () => {
    const wrapper = mount(
      <RangePicker defaultValue={[new Date('2000-01-01 00:00:00'), new Date('2000-01-01 02:00:00')]} open />,
    )

    // year
    wrapper.find('input').at(0).simulate('focus')
    wrapper.find('.kd-date-picker-header-text-inner').at(0).simulate('click')
    wrapper.find('.kd-date-picker-year-text').at(0).simulate('click')
    wrapper.find('.kd-date-picker-calendar-text').at(1).simulate('click')
    expect(wrapper.find('input').at(0).props().value).toBe('1993-11-29')

    // month
    wrapper.find('.kd-date-picker-header-text-inner').at(1).simulate('click')
    wrapper.find('.kd-date-picker-month-text').at(1).simulate('click')
    wrapper.find('.kd-date-picker-calendar-text').at(4).simulate('click')
    expect(wrapper.find('input').at(0).props().value).toBe('1993-11-29')
  })

  // 15. local
  it('local', function () {
    const userPlaceholder: any = {
      rangePlaceholder: ['开始日期1', '结束日期1'],
      rangeYearPlaceholder: ['开始年份1', '结束年份1'],
      rangeMonthPlaceholder: ['开始月份1', '结束月份1'],
      rangeWeekPlaceholder: ['开始周1', '结束周1'],
      rangeQuarterPlaceholder: ['开始季度1', '结束季度1'],
      rangeTimePlaceholder: ['开始时间1', '结束时间1'],
    }

    TYPE_LIST.forEach(({ picker, placeholder }) => {
      const p = placeholder.split('.')[1]
      const wrapper = mount(<RangePicker {...defaultProps} picker={picker as any} locale={userPlaceholder} />)

      expect(wrapper.find('input').at(0).props().placeholder).toEqual(userPlaceholder[p as any][0])
      expect(wrapper.find('input').at(1).props().placeholder).toEqual(userPlaceholder[p as any][1])
    })
  })

  // 16. popupContainer & popup
  it('popupContainer & popup', async () => {
    const ref: any = React.createRef()
    const onOpenChange = jest.fn()
    const wrapper = mount(
      <div ref={ref}>
        <RangePicker defaultValue={TEST_DAY} onOpenChange={onOpenChange} getPopupContainer={() => ref.current} />
      </div>,
    )

    // init
    expect(wrapper.find('.kd-date-picker-panel').length).toEqual(0)

    // open
    wrapper.find('input').at(0).simulate('mousedown')
    await sleep(100)
    expect(onOpenChange).toHaveBeenCalled()
    expect(onOpenChange).toHaveBeenCalledTimes(1)
    expect(ref.current.querySelectorAll('.kd-date-picker-panel').length).toEqual(1)
    expect(ref.current.querySelectorAll('.kd-date-picker-panel')[0].classList.contains('hidden')).toBeFalsy()
    // or
    expect(wrapper.find('.kd-date-picker-panel').length).toEqual(1)
    expect(wrapper.find('.kd-date-picker-panel').hasClass('hidden')).toBeFalsy()

    // select & close
    wrapper.find('input').at(0).simulate('focus')
    wrapper.find('.kd-date-picker-calendar-text').at(0).simulate('click')
    wrapper.find('.kd-date-picker-calendar-text').at(1).simulate('click')
    await sleep(100)
    expect(wrapper.find('.kd-date-picker-panel').hasClass('hidden')).toBeTruthy()
    expect(onOpenChange).toHaveBeenCalledTimes(2)
  })
})
