import React from 'react'
import { mount, render } from 'enzyme'
import CityPicker, { CityPickerProps } from '../index'
import { commons, groups, cityList } from './data'
import mountTest from '../../../tests/shared/mountTest'

const defaultProps: Partial<CityPickerProps> = {
  commons,
  groups,
  cityList,
  title: 'title',
  showTitle: true,
}

describe('CityPicker', () => {
  // 1. mount test
  mountTest(CityPicker)

  // 2. render test
  it('renders correctly', () => {
    const wrapper = render(<CityPicker title={'test'} />)
    expect(wrapper).toMatchSnapshot()
  })

  // 3. render no child without errors
  it('renders correctly with no child', () => {
    expect(mount(<CityPicker />)).toMatchSnapshot()
  })

  // 4. render null or undefined without errors
  it('renders correctly with null or undefined', () => {
    expect(
      mount(
        <CityPicker>
          {null}
          {undefined}
        </CityPicker>,
      ),
    ).toMatchSnapshot()
  })

  // 5. displayName
  it('should have displayName static property', () => {
    const wrapper = mount(<CityPicker></CityPicker>)
    expect((wrapper.type() as any).displayName).toBe('CityPicker')
  })

  // 6. className
  it('className', function () {
    const wrapper = mount(<CityPicker {...defaultProps} className={'my-class'} inputClassName={'my-input-class'} />)

    // className
    expect(wrapper.find('.kd-city-picker-container').at(0).hasClass('my-class')).toBeTruthy()

    // inputClassName
    expect(wrapper.find('input').hasClass('my-input-class')).toBeTruthy()
  })

  // 7. style
  it('style', function () {
    const wrapper = mount(<CityPicker {...defaultProps} />)

    // style
    expect(wrapper.find('.kd-city-picker-container').prop('style')).toBeFalsy()
    wrapper.setProps({ style: { height: '50px' } })
    wrapper.update()
    expect(wrapper.find('.kd-city-picker-container').prop('style')).toEqual({ height: '50px' })
    expect(wrapper.find('.kd-city-picker-container')).toHaveStyle('height', '50px')

    // input style
    expect(wrapper.find('input').prop('style')).toBeFalsy()
    wrapper.setProps({ inputStyle: { height: '20px' } })
    wrapper.update()
    expect(wrapper.find('input').prop('style')).toEqual({ height: '20px' })
    expect(wrapper.find('input')).toHaveStyle('height', '20px')
  })

  // 8. other api
  it('other api', () => {
    const wrapper = mount(<CityPicker {...defaultProps} />)

    // title
    expect(wrapper.find('.kd-city-picker-title').text()).toBe('title')

    // placeholder
    expect(wrapper.find('input').prop('placeholder')).toBeFalsy()
    wrapper.setProps({ placeholder: 'placeholder' })
    wrapper.update()
    expect(wrapper.find('input').props().placeholder).toBe('placeholder')

    // disabled
    expect(wrapper.find('input').prop('readOnly')).toBeFalsy()
    wrapper.setProps({ disabled: true })
    wrapper.update()
    expect(wrapper.find('input').prop('readOnly')).toBeTruthy()
  })
})
