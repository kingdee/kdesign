import React from 'react'
import { mount } from 'enzyme'
import moment from 'moment'
import MockDate from 'mockdate'
import DatePicker from '../index'
import locale from '../locale/zh_CN'
import { Locale, InnerLocale } from '../interface'
import { formatDate, parseDate } from '../utils/date-fns'
import { sleep } from '../../../tests/utils'
import { format, startOfYear } from 'date-fns'

const TEST_DAY = '2000-01-01 00:00:00'

const SIZE_LIST = ['large', 'middle', 'small']

const BORDER_LIST = ['underline', 'bordered', 'none']

const TYPE_LIST = [
  { picker: 'date', placeholder: 'DatePicker.placeholder' },
  { picker: 'year', placeholder: 'DatePicker.yearPlaceholder' },
  { picker: 'quarter', placeholder: 'DatePicker.quarterPlaceholder' },
  { picker: 'month', placeholder: 'DatePicker.monthPlaceholder' },
  { picker: 'week', placeholder: 'DatePicker.weekPlaceholder' },
  { picker: 'time', placeholder: 'DatePicker.timePlaceholder' },
]

const defaultProps = {
  value: new Date(TEST_DAY),
  open: true,
}

describe('date-picker', () => {
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
    const wrapper = mount(<DatePicker {...defaultProps} />)
    expect(() => {
      wrapper.setProps({})
      wrapper.unmount()
    }).not.toThrow()
  })

  // 2.render test
  it('render api', () => {
    // size
    SIZE_LIST.forEach((size) => {
      const wrapper = mount(<DatePicker {...defaultProps} size={size as any} />)
      expect(wrapper).toMatchSnapshot()
    })

    // borderType
    BORDER_LIST.forEach((borderType) => {
      const wrapper = mount(<DatePicker {...defaultProps} borderType={borderType as any} />)
      expect(wrapper).toMatchSnapshot()
    })

    // picker
    TYPE_LIST.forEach(({ picker }) => {
      const wrapper = mount(<DatePicker {...defaultProps} picker={picker as any} />)
      expect(wrapper).toMatchSnapshot()
    })

    // showTime
    const wrapper1 = mount(<DatePicker {...defaultProps} showTime />)
    expect(wrapper1).toMatchSnapshot()

    // format
    const wrapper2 = mount(<DatePicker {...defaultProps} format={'YYYYMMDD'} />)
    expect(wrapper2).toMatchSnapshot()

    // suffixIcon
    const wrapper3 = mount(<DatePicker {...defaultProps} suffixIcon={<div>suffixIcon</div>} />)
    expect(wrapper3).toMatchSnapshot()

    // disabledDate
    const disabledDate = (current: any) => current && current < moment().endOf('day')
    const wrapper4 = mount(<DatePicker disabledDate={disabledDate} open />)
    expect(wrapper4.render()).toMatchSnapshot()

    // showToday
    const wrapper5 = mount(<DatePicker {...defaultProps} showToday />)
    expect(wrapper5).toMatchSnapshot()

    // showNow
    const wrapper6 = mount(<DatePicker {...defaultProps} showNow />)
    expect(wrapper6).toMatchSnapshot()

    // showWeeksTitle
    const wrapper7 = mount(<DatePicker {...defaultProps} showWeeksTitle />)
    expect(wrapper7).toMatchSnapshot()

    // showWeekNumber
    const wrapper8 = mount(<DatePicker {...defaultProps} showWeekNumber />)
    expect(wrapper8).toMatchSnapshot()
  })

  // 3. displayName
  it('should have displayName static property', () => {
    const wrapper = mount(<DatePicker />)
    expect((wrapper.type() as any).displayName).toBe('DatePicker')
  })

  // 4. placeholder
  it('placeholder', () => {
    TYPE_LIST.forEach(({ picker, placeholder }) => {
      const wrapper = mount(<DatePicker {...defaultProps} picker={picker as any} />)
      expect(wrapper.find('input').props().placeholder).toBe((locale as any)[placeholder as keyof Locale])
      wrapper.setProps({ placeholder: 'placeholder' })
      wrapper.update()
      expect(wrapper.find('input').props().placeholder).toBe('placeholder')
    })
  })

  // 5. className
  it('className', () => {
    const wrapper1 = mount(<DatePicker {...defaultProps} className={'my-class'} />)
    expect(wrapper1.find('.kd-date-picker').at(0).hasClass('my-class')).toBeTruthy()

    const wrapper2 = mount(<DatePicker {...defaultProps} dropdownClassName={'my-class'} />)
    expect(wrapper2.find('.kd-date-picker-panel').at(0).hasClass('my-class')).toBeTruthy()
  })

  // 6. style
  it('style & popupStyle', () => {
    const wrapper = mount(<DatePicker {...defaultProps} />)
    expect(wrapper.find('.kd-date-picker').at(0).prop('style')).toEqual({})
    wrapper.setProps({ style: { height: '50px' } })
    wrapper.update()
    expect(wrapper.find('.kd-date-picker').at(0).prop('style')).toEqual({ height: '50px' })
    expect(wrapper.find('.kd-date-picker')).toHaveStyle('height', '50px')

    const wrapper2 = mount(<DatePicker {...defaultProps} popupStyle={{ height: '50px' }} />)
    expect(wrapper2.find('.kd-date-picker-panel')).toHaveStyle('height', '50px')
  })

  // 7. ref test
  it('should get element from ref', () => {
    const ref = React.createRef()
    const refPopup = React.createRef()
    mount(<DatePicker {...defaultProps} ref={ref} popupRef={refPopup} />)
    expect((ref.current as HTMLElement).classList.contains('kd-date-picker')).toBe(true)
    expect((refPopup.current as HTMLElement).classList.contains('kd-date-picker-panel')).toBe(true)
  })

  // 8. value & defaultValue
  it('value & defaultValue', () => {
    const DEFAULT_VALUE = '2000-05-01 00:00:00'
    let value: any = formatDate(new Date(DEFAULT_VALUE), 'YYYY-MM-DD')
    const wrapperDefault = mount(<DatePicker format={'YYYY-MM-DD'} defaultValue={new Date(DEFAULT_VALUE)} />)
    expect(wrapperDefault.find('input').props().value).toBe(value)

    const TEST_LIST: any[] = [
      {
        picker: 'date',
        format: 'YYYY-MM-DD',
        selector: [{ name: '.kd-date-picker-calendar-text', index: 0 }],
        ret: '2000-04-30',
      },
      {
        picker: 'year',
        format: 'YYYY',
        selector: [{ name: '.kd-date-picker-year-text', index: 0 }],
        ret: '1996',
      },
      {
        picker: 'quarter',
        format: 'YYYY-Q',
        selector: [{ name: '.kd-date-picker-quarter-text', index: 0 }],
        ret: '2000-1',
      },
      {
        picker: 'month',
        format: 'YYYY-MM',
        selector: [{ name: '.kd-date-picker-month-text', index: 0 }],
        ret: '2000-01',
      },
      {
        picker: 'week',
        format: 'YYYY-Wo',
        selector: [{ name: '.kd-date-picker-calendar-week-text', index: 0 }],
        ret: '2000-19th',
      },
      {
        picker: 'time',
        format: 'HH:mm:ss',
        selector: [{ name: '.kd-date-picker-time-cell-inner', index: 1 }],
        ret: '01:00:00',
      },
    ]

    TEST_LIST.forEach(({ picker, format, selector, ret }) => {
      value = formatDate(new Date(DEFAULT_VALUE), format)
      const onChange = jest.fn((e) => {
        value = formatDate(e, format)
      })
      const wrapper = mount(
        <DatePicker
          picker={picker === 'data-time' ? 'date' : picker}
          open
          value={new Date(DEFAULT_VALUE)}
          format={format}
          onChange={onChange}
          showToday
          showTime={picker === 'data-time'}
        />,
      )
      expect(wrapper.find('input').props().value).toBe(value)

      selector.forEach((s: any) => {
        wrapper
          .find(s.name)
          .at(s.index)
          .simulate(s?.simulate || 'click')
      })

      expect(onChange).toHaveBeenCalled()
      expect(value).toBe(ret)
    })

    // date time
    let value2 = '2000-01-01 01:01:01'
    const onChange2 = jest.fn((e) => {
      value2 = moment(e).format('YYYY-MM-DD HH:mm:ss')
    })
    const wrapper2 = mount(<DatePicker showTime open value={new Date(value2)} onChange={onChange2} showToday />)
    expect(wrapper2.find('input').props().value).toBe(value2)
    wrapper2.find('.kd-date-picker-calendar-text').at(0).simulate('click')
    wrapper2.find('.kd-date-picker-ok-btn').at(0).simulate('click')
    expect(onChange2).toHaveBeenCalled()
    expect(value2).toBe('1999-12-26 01:01:01')
  })

  // 9. event
  it('event', () => {
    const DEFAULT_VALUE = '2001-01-01'

    const onChange = jest.fn()
    const onFocus = jest.fn()
    const onBlur = jest.fn()
    const onOk = jest.fn()

    const wrapper = mount(
      <DatePicker
        defaultValue={new Date(DEFAULT_VALUE)}
        showTime
        open
        onChange={onChange}
        onOk={onOk}
        onBlur={onBlur}
        onFocus={onFocus}
      />,
    )

    // onFocus
    wrapper.find('input').simulate('focus')
    expect(onFocus).toHaveBeenCalled()

    // onBlur
    wrapper.find('input').simulate('blur')
    expect(onBlur).toHaveBeenCalled()

    // onOK & onChange
    wrapper.find('.kd-date-picker-calendar-text').at(0).simulate('click')
    wrapper.find('.kd-date-picker-ok-btn').at(0).simulate('click')
    expect(onOk).toHaveBeenCalled()
    expect(onChange).toHaveBeenCalled()
  })

  // 10. clear & clearIcon
  it('clear & clearIcon', () => {
    const onChange = jest.fn()
    const wrapper = mount(<DatePicker open defaultValue={new Date(TEST_DAY)} onChange={onChange} />)

    // element
    wrapper.find('.kd-date-picker').simulate('mouseEnter')
    expect(wrapper.find('.kd-date-picker-clear')).toHaveLength(1)
    wrapper.setProps({ clearIcon: <div className={'my-clear'}>clear</div> })
    wrapper.update()
    wrapper.find('.kd-date-picker').simulate('mouseEnter')
    expect(wrapper.find('.my-clear')).toHaveLength(1)

    // event
    TYPE_LIST.forEach(({ picker }) => {
      const wrapper = mount(
        <DatePicker open defaultValue={new Date(TEST_DAY)} onChange={onChange} picker={picker as any} />,
      )
      wrapper.find('.kd-date-picker').simulate('mouseEnter')
      wrapper.find('.kd-date-picker-clear').simulate('click')
      expect(onChange).toHaveBeenCalled()
      expect(wrapper.find('input').props().value).toBe('')
    })
  })

  // 11. getPopupContainer
  it('getPopupContainer', () => {
    const wrapperRef = React.createRef() as any
    const popupContainer = mount(
      <div ref={wrapperRef}>
        <DatePicker {...defaultProps} getPopupContainer={() => wrapperRef.current} />
      </div>,
    )
    expect(popupContainer.find('.kd-date-picker-panel').length).toBe(1)
  })

  // 12. Next & Prev
  it('onNext & onPrev & onSuperPrev & onSuperNext', () => {
    const wrapper = mount(<DatePicker open defaultValue={new Date(TEST_DAY)} />)

    // onSuperPrev
    wrapper.find('.kd-date-picker-header-icon').at(0).simulate('click')
    expect(wrapper.find('.kd-date-picker-header-text-inner').at(0).text()).toBe('1999年')

    // onPrev
    wrapper.find('.kd-date-picker-header-icon').at(1).simulate('click')
    expect(wrapper.find('.kd-date-picker-header-text-inner').at(1).text()).toBe('12月')

    // onNext
    wrapper.find('.kd-date-picker-header-icon').at(2).simulate('click')
    expect(wrapper.find('.kd-date-picker-header-text-inner').at(1).text()).toBe('1月')

    // onSuperNext
    wrapper.find('.kd-date-picker-header-icon').at(3).simulate('click')
    expect(wrapper.find('.kd-date-picker-header-text-inner').at(0).text()).toBe('2000年')
  })

  // 13. time-picker
  it('time picker api', async () => {
    const wrapper = mount(
      <DatePicker
        picker="time"
        defaultValue={new Date('2000-01-01 02:00:00')}
        open
        hourStep={2}
        minuteStep={2}
        secondStep={2}
        disabledHours={() => [3, 5, 6, 7, 8, 9, 10]}
        disabledMinutes={() => [3, 4]}
        disabledSeconds={() => [4, 6, 18, 19, 20]}
      />,
    )

    // defaultValue
    // expect(wrapper).toMatchSnapshot()

    // use12Hours
    wrapper.setProps({ use12Hours: true })
    wrapper.update()
    // expect(wrapper).toMatchSnapshot()

    // disabledHours
    expect(wrapper.find('input').at(0).props().value).toBe('02:00:00 AM')
    expect(wrapper.find('.kd-date-picker-time-cell-inner').at(1).text()).toBe('02')
    wrapper.find('.kd-date-picker-time-cell-inner').at(1).simulate('click')
    expect(wrapper.find('input').at(0).props().value).toBe('02:00:00 AM')

    // change hours
    expect(wrapper.find('.kd-date-picker-time-cell-inner').at(2).text()).toBe('04')
    wrapper.find('.kd-date-picker-time-cell-inner').at(2).simulate('click')
    expect(wrapper.find('input').at(0).props().value).toBe('04:00:00 AM')

    // disabledMinutes
    const minutes = wrapper.find('.kd-date-picker-time-column').at(1).find('.kd-date-picker-time-cell-inner')
    expect(wrapper.find('input').at(0).props().value).toBe('04:00:00 AM')
    expect(minutes.at(1).text()).toBe('02')
    minutes.at(1).simulate('click')
    expect(wrapper.find('input').at(0).props().value).toBe('04:02:00 AM')

    // change minutes
    expect(minutes.at(3).text()).toBe('06')
    minutes.at(3).simulate('click')
    expect(wrapper.find('input').at(0).props().value).toBe('04:06:00 AM')

    // disabledSeconds
    const seconds = wrapper.find('.kd-date-picker-time-column').at(2).find('.kd-date-picker-time-cell-inner')
    expect(wrapper.find('input').at(0).props().value).toBe('04:06:00 AM')
    expect(seconds.at(1).text()).toBe('02')
    seconds.at(1).simulate('click')
    expect(wrapper.find('input').at(0).props().value).toBe('04:06:02 AM')

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
    const wrapper = mount(<DatePicker defaultValue={new Date('2000-01-01 00:00:00')} open />)

    // year
    wrapper.find('.kd-date-picker-header-text-inner').at(0).simulate('click')
    wrapper.find('.kd-date-picker-year-text').at(0).simulate('click')
    wrapper.find('.kd-date-picker-calendar-text').at(1).simulate('click')
    expect(wrapper.find('input').props().value).toBe('1996-01-01')

    // month
    wrapper.find('.kd-date-picker-header-text-inner').at(1).simulate('click')
    wrapper.find('.kd-date-picker-month-text').at(1).simulate('click')
    wrapper.find('.kd-date-picker-calendar-text').at(4).simulate('click')
    expect(wrapper.find('input').props().value).toBe('1996-02-01')
  })

  // 15. local
  it('local', function () {
    const userConfig: any = {
      now: 'now',
      confrim: 'confrim',
      month: 'month',
      year: 'year',
      weekTitle: ['7', '6', '5', '4', '3', '2', '1'],
    }

    const wrapper = mount(<DatePicker {...defaultProps} showNow showTime locale={userConfig} />)
    expect(wrapper.find('.kd-date-picker-now-btn').text()).toBe(userConfig.now)
    expect(wrapper.find('.kd-date-picker-ok-btn').text()).toBe(userConfig.confrim)
    expect(wrapper.find('.kd-date-picker-header-text-inner.kd-date-picker-header-text-inner-hover').at(0).text()).toBe(
      `2000${userConfig.year}`,
    )
    expect(wrapper.find('.kd-date-picker-header-text-inner.kd-date-picker-header-text-inner-hover').at(1).text()).toBe(
      `1${userConfig.month}`,
    )
    userConfig.weekTitle.forEach((d: string, i: number) => {
      expect(wrapper.find('.kd-date-picker-weektitle-item').at(i).text()).toBe(d)
    })

    const userPlaceholder: any = {
      placeholder: '请选择日期1',
      yearPlaceholder: '请选择年份2',
      quarterPlaceholder: '请选择季度3',
      monthPlaceholder: '请选择月份4',
      weekPlaceholder: '请选择周5',
      timePlaceholder: '请选择时间6',
    }

    TYPE_LIST.forEach(({ picker, placeholder }) => {
      const p = placeholder.split('.')[1]
      const wrapper = mount(<DatePicker {...defaultProps} picker={picker as any} locale={userPlaceholder} />)
      expect(wrapper.find('input').props().placeholder).toBe(userPlaceholder[p as any])
    })
  })

  // 16. popupContainer & popup
  it('popupContainer & popup', async () => {
    const ref: any = React.createRef()
    const onOpenChange = jest.fn()
    const wrapper = mount(
      <div ref={ref}>
        <DatePicker
          defaultValue={new Date(TEST_DAY)}
          onOpenChange={onOpenChange}
          getPopupContainer={() => ref.current}
        />
      </div>,
    )

    // init
    expect(wrapper.find('.kd-date-picker-panel').length).toEqual(0)

    // open
    wrapper.find('.kd-date-picker').at(0).simulate('mouseup')
    await sleep(100)
    expect(onOpenChange).toHaveBeenCalled()
    expect(onOpenChange).toHaveBeenCalledTimes(1)
    expect(ref.current.querySelectorAll('.kd-date-picker-panel').length).toEqual(1)
    expect(ref.current.querySelectorAll('.kd-date-picker-panel')[0].classList.contains('hidden')).toBeFalsy()
    // or
    expect(wrapper.find('.kd-date-picker-panel').length).toEqual(1)
    expect(wrapper.find('.kd-date-picker-panel').hasClass('hidden')).toBeFalsy()

    // select & close
    wrapper.find('.kd-date-picker-calendar-text').at(0).simulate('click')
    await sleep(100)
    expect(wrapper.find('.kd-date-picker-panel').hasClass('hidden')).toBeTruthy()
    expect(wrapper.find('input').props().value).toEqual('1999-12-26')
    expect(onOpenChange).toHaveBeenCalledTimes(2)
  })

  // 17. cellRender
  it('cellRender', () => {
    const cellRender = (current: any, { originNode, panelType, subType, date }: any) => {
      let flag = false

      switch (panelType) {
        case 'year':
          flag = current === 1996
          break
        case 'quarter':
          flag = format(date, 'yyyy-qqq') === format(startOfYear(new Date(TEST_DAY)), 'yyyy-qqq')
          break
        case 'month':
          flag = format(date, 'yyyy-MM') === format(startOfYear(new Date(TEST_DAY)), 'yyyy-MM')
          break
        case 'week':
          flag = current === 2
          break
        case 'date':
          flag = format(date, 'yyyy-MM-dd') === format(new Date(TEST_DAY), 'yyyy-MM-dd')
          break
        case 'time':
          flag = subType === 'hour' && current === 2
          break
      }

      const style = { background: 'red' }
      return flag ? React.cloneElement(originNode, { style }) : originNode
    }

    const TEST_LIST: any[] = [
      {
        picker: 'date',
        selector: '.kd-date-picker-calendar-text',
        index: 6,
      },
      {
        picker: 'year',
        selector: '.kd-date-picker-year-text',
        index: 0,
      },
      {
        picker: 'quarter',
        selector: '.kd-date-picker-quarter-text',
        index: 0,
      },
      {
        picker: 'month',
        selector: '.kd-date-picker-month-text',
        index: 0,
      },
      {
        picker: 'week',
        selector: '.kd-date-picker-calendar-week-line',
        index: 1,
      },
      {
        picker: 'time',
        selector: '.kd-date-picker-time-cell-inner',
        index: 2,
      },
    ]

    TEST_LIST.forEach(({ picker, selector, index }) => {
      const wrapper = mount(
        <DatePicker
          picker={picker === 'data-time' ? 'date' : picker}
          cellRender={cellRender}
          {...defaultProps}
          showTime={picker === 'data-time'}
        />,
      )

      expect(wrapper.find(selector).at(index).prop('style')).toEqual({ background: 'red' })
    })
  })

  // 18. null with popup
  it('null with popup', async () => {
    const ref: any = React.createRef()
    const onChange = jest.fn()
    const wrapper = mount(
      <div ref={ref}>
        <DatePicker value={null} defaultOpen onChange={onChange} getPopupContainer={() => ref.current} />
      </div>,
    )

    wrapper.find('input').at(0).simulate('focus')
    wrapper.find('.kd-date-picker-calendar-text').at(0).simulate('click')
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  // 19. value error
  it('value error', async () => {
    expect(() => {
      const wrapper = mount(<DatePicker value={new Date('2020-21-17')} open />)
      wrapper.unmount()
    }).not.toThrow()

    const wrapper = mount(<DatePicker value={new Date('2020-21-17')} open />)
    expect(wrapper.find('input').at(0).props().value).toBe('')
    expect(wrapper.find('.kd-date-picker-calendar-text').at(0).text()).not.toBe('NaN')
  })

  // 20. disabledData select
  it('disabledData select', () => {
    const disabledDate = (date: any, info: any) => {
      const disDate = new Date('2020-12-28')
      if (info && info?.panelType === 'year') {
        return date && date.getFullYear() < disDate.getFullYear()
      }
      if (info && info?.panelType === 'month') {
        return date && date.getMonth() < disDate.getMonth()
      }
      return date && date < disDate
    }
    const wrapper = mount(<DatePicker open disabledDate={disabledDate} defaultValue={new Date('2021-01-29')} />)

    // year
    wrapper.find('.kd-date-picker-header-text-inner').at(0).simulate('click')
    const item = wrapper.find('.kd-date-picker-year-item').at(9)
    expect(item.props().className).toEqual('kd-date-picker-year-item')
    wrapper.find('.kd-date-picker-year-text').at(9).simulate('click')
    // month
    wrapper.find('.kd-date-picker-header-text-inner').at(1).simulate('click')
    wrapper.find('.kd-date-picker-month-text').at(11).simulate('click')
    wrapper.find('.kd-date-picker-calendar-text').at(30).simulate('click')
    expect(wrapper.find('input').props().value).toBe('2020-12-29')
  })
})

describe('date-picker locale format', () => {
  beforeEach(() => {
    MockDate.set(moment('2026-07-13 00:00:00').valueOf())
  })

  afterEach(() => {
    MockDate.reset()
  })

  const zhLocale: Partial<InnerLocale> = {
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    monthsShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  }

  const enLocale: Partial<InnerLocale> = {
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  }

  // 21. formatDate with MMMM and locale.months
  it('formatDate with MMMM uses locale.months', () => {
    const date = new Date('2026-07-13')

    // 中文全名
    expect(formatDate(date, 'YYYY年MMMMd日', zhLocale as InnerLocale)).toBe('2026年七月13日')
    // 英文全名
    expect(formatDate(date, 'MMMM DD, YYYY', enLocale as InnerLocale)).toBe('July 13, 2026')
    // 一月
    expect(formatDate(new Date('2026-01-05'), 'YYYY年MMMMd日', zhLocale as InnerLocale)).toBe('2026年一月5日')
    // 十二月
    expect(formatDate(new Date('2026-12-25'), 'MMMM DD', zhLocale as InnerLocale)).toBe('十二月 25')
  })

  // 22. formatDate with MMM and locale.monthsShort
  it('formatDate with MMM uses locale.monthsShort', () => {
    const date = new Date('2026-07-13')

    // 中文缩写
    expect(formatDate(date, 'YYYY年MMMd日', zhLocale as InnerLocale)).toBe('2026年7月13日')
    // 英文缩写
    expect(formatDate(date, 'MMM DD, YYYY', enLocale as InnerLocale)).toBe('Jul 13, 2026')
    // 三月
    expect(formatDate(new Date('2026-03-01'), 'MMMd日', zhLocale as InnerLocale)).toBe('3月1日')
  })

  // 23. formatDate without locale should not affect MMM/MMMM
  it('formatDate without locale uses date-fns default', () => {
    const date = new Date('2026-07-13')

    // 不传 locale 时 MMM 输出 date-fns 默认值 (英文)
    const result = formatDate(date, 'MMM DD, YYYY')
    expect(result).toBe('Jul 13, 2026')
  })

  // 24. formatDate with locale but no months field falls through
  it('formatDate with locale but without months/monthsShort fields', () => {
    const date = new Date('2026-07-13')
    const noMonthLocale: Partial<InnerLocale> = { locale: 'zh-CN' } as any

    // 没有 months 字段，MMMM 应该用 date-fns 默认输出
    const result = formatDate(date, 'MMMM DD, YYYY', noMonthLocale as InnerLocale)
    expect(result).toBe('July 13, 2026')
  })

  // 25. parseDate with MMMM and locale.months
  it('parseDate with MMMM uses locale.months', () => {
    const result = parseDate('2026年七月13日', 'YYYY年MMMMd日', zhLocale as InnerLocale)
    expect(result).not.toBeNull()
    expect(result!.getFullYear()).toBe(2026)
    expect(result!.getMonth()).toBe(6) // July = index 6
    expect(result!.getDate()).toBe(13)
  })

  // 26. parseDate with MMM and locale.monthsShort
  it('parseDate with MMM uses locale.monthsShort', () => {
    const result = parseDate('2026年7月13日', 'YYYY年MMMd日', zhLocale as InnerLocale)
    expect(result).not.toBeNull()
    expect(result!.getFullYear()).toBe(2026)
    expect(result!.getMonth()).toBe(6)
    expect(result!.getDate()).toBe(13)
  })

  // 27. parseDate with English months
  it('parseDate with English MMMM', () => {
    const result = parseDate('July 13, 2026', 'MMMM DD, YYYY', enLocale as InnerLocale)
    expect(result).not.toBeNull()
    expect(result!.getFullYear()).toBe(2026)
    expect(result!.getMonth()).toBe(6)
    expect(result!.getDate()).toBe(13)
  })

  // 28. DatePicker component with MMMM format and locale
  it('DatePicker renders MMMM format with locale.months', () => {
    const wrapper = mount(
      <DatePicker value={new Date('2026-07-13')} format="YYYY年MMMMd日" locale={zhLocale as any} open />,
    )
    expect(wrapper.find('input').props().value).toBe('2026年七月13日')
  })

  // 29. DatePicker component with MMM format and locale
  it('DatePicker renders MMM format with locale.monthsShort', () => {
    const wrapper = mount(
      <DatePicker value={new Date('2026-03-05')} format="YYYY年MMMd日" locale={zhLocale as any} open />,
    )
    expect(wrapper.find('input').props().value).toBe('2026年3月5日')
  })

  // 30. onChange callback outputs formatted string with locale
  it('onChange outputs locale formatted string', () => {
    const onChange = jest.fn()
    const wrapper = mount(
      <DatePicker
        value={new Date('2026-07-13')}
        format="YYYY年MMMMd日"
        locale={zhLocale as any}
        open
        onChange={onChange}
      />,
    )

    // 点击日期触发 onChange
    wrapper.find('.kd-date-picker-calendar-text').at(0).simulate('click')
    expect(onChange).toHaveBeenCalled()
    const [, dateString] = onChange.mock.calls[0]
    // 验证 onChange 第二个参数（格式化字符串）包含中文月份
    expect(dateString).toMatch(/\d{4}年.+月\d+日/)
  })

  // 31. format without MMM/MMMM is unaffected by locale
  it('standard format is unaffected by locale months fields', () => {
    const wrapper = mount(
      <DatePicker value={new Date('2026-07-13')} format="YYYY-MM-DD" locale={zhLocale as any} open />,
    )
    expect(wrapper.find('input').props().value).toBe('2026-07-13')
  })

  // 32. all 12 months format correctly
  it('all 12 months format correctly with MMMM', () => {
    const expectedMonths = [
      '一月',
      '二月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月',
    ]
    expectedMonths.forEach((expected, index) => {
      const date = new Date(2026, index, 15)
      const result = formatDate(date, 'MMMM', zhLocale as InnerLocale)
      expect(result).toBe(expected)
    })
  })

  // 33. all 12 months parse correctly
  it('all 12 months parse correctly with MMMM', () => {
    const monthNames = [
      '一月',
      '二月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月',
    ]
    monthNames.forEach((name, index) => {
      const result = parseDate(`2026年${name}15日`, 'YYYY年MMMMd日', zhLocale as InnerLocale)
      expect(result).not.toBeNull()
      expect(result!.getMonth()).toBe(index)
    })
  })

  // 34. hover value uses locale format (not English fallback)
  it('hover value uses locale months', () => {
    const wrapper = mount(
      <DatePicker value={new Date('2026-07-13')} format="YYYY年MMMMd日" locale={zhLocale as any} open />,
    )

    // 模拟鼠标悬浮到日期格子
    const dateCell = wrapper.find('.kd-date-picker-calendar-text').at(0)
    dateCell.simulate('mouseEnter')
    wrapper.update()

    // 悬浮后输入框显示的值不应该包含英文月份名
    const inputValue = wrapper.find('input').props().value as string
    expect(inputValue).not.toMatch(
      /January|February|March|April|May|June|July|August|September|October|November|December/,
    )

    // 如果有值显示，应该使用中文月份
    if (inputValue && inputValue !== '') {
      expect(inputValue).toMatch(/[一二三四五六七八九十]+月/)
    }
  })

  // 35. parseDate handles ambiguous month names (十一月 vs 一月)
  it('parseDate correctly matches longer month names first', () => {
    // "十一月" should not be confused with "一月"
    const result11 = parseDate('2026年十一月15日', 'YYYY年MMMMd日', zhLocale as InnerLocale)
    expect(result11).not.toBeNull()
    expect(result11!.getMonth()).toBe(10) // November = index 10

    // "十二月" should not be confused with "二月"
    const result12 = parseDate('2026年十二月25日', 'YYYY年MMMMd日', zhLocale as InnerLocale)
    expect(result12).not.toBeNull()
    expect(result12!.getMonth()).toBe(11) // December = index 11

    // "一月" should still work correctly
    const result1 = parseDate('2026年一月1日', 'YYYY年MMMMd日', zhLocale as InnerLocale)
    expect(result1).not.toBeNull()
    expect(result1!.getMonth()).toBe(0) // January = index 0
  })

  // 36. formatDate escapes single quotes in month names
  it('formatDate handles month names with special characters', () => {
    const specialLocale: Partial<InnerLocale> = {
      months: [
        "Jan'uary",
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
    }
    const date = new Date('2026-01-15')
    // Should not throw
    const result = formatDate(date, 'MMMM DD, YYYY', specialLocale as InnerLocale)
    expect(result).not.toBeNull()
    expect(result).toContain("Jan'uary")
  })

  // 37. mergeDateLocale discards incomplete months array
  it('incomplete months array from merge does not cause issues', () => {
    // If only partial months provided and global has none, should not break
    const wrapper = mount(
      <DatePicker
        value={new Date('2026-07-13')}
        format="YYYY年MMMMd日"
        locale={{ months: ['一月', '二月', '三月'] } as any}
        open
      />,
    )
    // Should not crash, input should show something (either date-fns default or fallback)
    expect(wrapper.find('input').props().value).toBeTruthy()
  })
})
