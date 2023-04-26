import React from 'react'
import { mount, render } from 'enzyme'
import ColorPicker from '../index'
import { BorderTypes, IColorPickerProps } from '../interface'
import mountTest from '../../../tests/shared/mountTest'

const defaultColorPickerProps: Partial<IColorPickerProps> = {
  className: 'my-color-picker',
  onChange: jest.fn(),
}

describe('ColorPicker', () => {
  // 1.mount test
  mountTest(ColorPicker)
  // 2.render test
  it('renders correctly', () => {
    BorderTypes.forEach((type) => {
      const wrapper = render(<ColorPicker borderType={type}></ColorPicker>)
      expect(wrapper).toMatchSnapshot()
    })
  })
  // 3. render no child without errors
  it('renders correctly with no child', () => {
    expect(mount(<ColorPicker></ColorPicker>)).toMatchSnapshot()
  })
  // 4. render null or undefined without errors
  it('renders correctly with null or undefined', () => {
    expect(
      mount(
        <ColorPicker>
          {null}
          {undefined}
        </ColorPicker>,
      ),
    ).toMatchSnapshot()
  })
  // 5.displayName
  it('should have displayName static property', () => {
    const wrapper = mount(<ColorPicker></ColorPicker>)
    expect((wrapper.type() as any).displayName).toBe('ColorPicker')
  })
  // 6.api
  it('should show the correct API function', () => {
    const underlineWrapper = mount(<ColorPicker {...defaultColorPickerProps} borderType="underline"></ColorPicker>)
    const borderedWrapper = mount(<ColorPicker {...defaultColorPickerProps} borderType="bordered"></ColorPicker>)

    // borderType
    expect(
      underlineWrapper.find('.kd-color-picker-container .kd-color-picker-input').at(2).hasClass('kd-input-underline'),
    ).toBeTruthy()
    expect(
      borderedWrapper.find('.kd-color-picker-container .kd-color-picker-input').at(2).hasClass('kd-input-underline'),
    ).toBeFalsy()

    // className
    expect(
      underlineWrapper.find('.kd-color-picker-container .kd-color-picker-input').at(2).hasClass('my-color-picker'),
    ).toBeTruthy()
    expect(
      borderedWrapper.find('.kd-color-picker-container .kd-color-picker-input').at(2).hasClass('my-color-picker'),
    ).toBeTruthy()

    // placeholder
    expect(underlineWrapper.find('.kd-input-underline').prop('placeholder')).toEqual('#')
    underlineWrapper.setProps({ placeholder: '请输入颜色' })
    underlineWrapper.update()
    expect(underlineWrapper.find('.kd-input-underline').prop('placeholder')).toEqual('请输入颜色')
    expect(borderedWrapper.find('.kd-color-picker-input').at(0).prop('placeholder')).toEqual('#')
    borderedWrapper.setProps({ placeholder: '请输入色值' })
    borderedWrapper.update()
    expect(borderedWrapper.find('.kd-color-picker-input').at(0).prop('placeholder')).toEqual('请输入色值')

    // style
    expect(underlineWrapper.find('.kd-input-underline').prop('style')).toBeFalsy()
    underlineWrapper.setProps({ style: { height: '40px' } })
    underlineWrapper.update()
    expect(underlineWrapper.find('.kd-input-underline').prop('style')).toEqual({ height: '40px' })
    expect(underlineWrapper.find('.kd-input-underline')).toHaveStyle('height', '40px')

    // default suffixIcon
    expect(underlineWrapper.find('.kd-color-picker-icon')).toHaveClassName('kd-color-picker-icon-down')
    underlineWrapper.find('.kd-color-picker-input').at(0).simulate('click')
    expect(underlineWrapper.find('.kd-color-picker-icon')).toHaveClassName('kd-color-picker-icon-up')
    underlineWrapper.find('.kd-color-picker-icon-container').simulate('click')
    expect(underlineWrapper.find('.kd-color-picker-icon')).toHaveClassName('kd-color-picker-icon-down')
    expect(borderedWrapper.find('.kd-color-picker-icon')).toHaveClassName('kd-color-picker-icon-down')
    borderedWrapper.find('.kd-color-picker-input').at(0).simulate('click')
    expect(borderedWrapper.find('.kd-color-picker-icon')).toHaveClassName('kd-color-picker-icon-up')
    borderedWrapper.find('.kd-color-picker-icon-container').simulate('click')
    expect(borderedWrapper.find('.kd-color-picker-icon')).toHaveClassName('kd-color-picker-icon-down')

    // custom suffixIcon
    const suffix = (rgbColor: string) => {
      return (
        <div className="suffix-icon" style={{ color: rgbColor }}>
          点击
        </div>
      )
    }
    const customSuffixWrapper = mount(<ColorPicker suffixIcon={suffix} />)
    expect(customSuffixWrapper.find('.suffix-icon')).toBeTruthy()
    expect(customSuffixWrapper.find('.suffix-icon')).toHaveStyle('color', 'rgb(178, 178, 178)')
    customSuffixWrapper.setProps({ value: 'red' })
    customSuffixWrapper.update()
    expect(customSuffixWrapper.find('.suffix-icon')).toHaveStyle('color', 'rgb(255, 0, 0)')
    expect(customSuffixWrapper.find('.suffix-icon').text()).toEqual('点击')

    // defaultValue
    const underlineDefValueWrapper = mount(<ColorPicker borderType="underline" defaultValue="#fff"></ColorPicker>)
    const borderedDefValueWrapper = mount(<ColorPicker defaultValue="#666"></ColorPicker>)
    expect(underlineDefValueWrapper.find('.kd-input-underline').prop('value')).toEqual('#fff')
    expect(borderedDefValueWrapper.find('.kd-color-picker-input').at(0).prop('value')).toEqual('#666')

    // value
    underlineDefValueWrapper.setProps({ value: 'red' })
    borderedDefValueWrapper.setProps({ value: 'blue' })
    underlineDefValueWrapper.update()
    borderedDefValueWrapper.update()
    expect(underlineDefValueWrapper.find('.kd-input-underline').prop('value')).toEqual('red')
    expect(borderedDefValueWrapper.find('.kd-color-picker-input').at(0).prop('value')).toEqual('blue')

    // defaultOpen
    let colorValue = ''
    const onChange = jest.fn((color) => {
      colorValue = color
    })
    const defaultOpenWrapper = mount(<ColorPicker defaultOpen={true} onChange={onChange}></ColorPicker>)
    expect(defaultOpenWrapper.exists('.kd-color-picker-pop')).toBeTruthy()
    expect(defaultOpenWrapper.find('.kd-select-selection-item').text()).toEqual('#b2b2b2')
    expect(defaultOpenWrapper.find('.kd-color-picker-panel-transparent').at(0).prop('value')).toEqual('100%')
    defaultOpenWrapper.setProps({ defaultValue: 'blue' })
    defaultOpenWrapper.update()
    expect(borderedDefValueWrapper.find('.kd-color-picker-input').at(0).prop('value')).toEqual('blue')
    expect(defaultOpenWrapper.find('.kd-select-selection-item').text()).toEqual('#0000ff')
    expect(defaultOpenWrapper.find('.kd-color-picker-panel-transparent').at(0).prop('value')).toEqual('100%')

    // functionalColor、functionalColorName、switchName、showSwitch
    defaultOpenWrapper.setProps({ showSwitch: true })
    defaultOpenWrapper.update()
    expect(defaultOpenWrapper.exists('.kd-color-picker-panel-switch')).toBeFalsy()
    defaultOpenWrapper.setProps({ functionalColor: '#333333' })
    defaultOpenWrapper.update()
    expect(defaultOpenWrapper.exists('.kd-color-picker-panel-switch')).toBeTruthy()
    expect(defaultOpenWrapper.find('.kd-color-picker-panel-switch').find('span').at(0).text()).toEqual('跟随主题色')
    expect(
      defaultOpenWrapper.find('.kd-color-picker-panel-switch').find('span').at(1).hasClass('kd-switch-checked'),
    ).toBeFalsy()
    defaultOpenWrapper.find('.kd-switch').simulate('click')
    expect(onChange).toHaveBeenCalled()
    expect(colorValue).toEqual('#themeColor')
    expect(defaultOpenWrapper.find('.kd-switch').hasClass('kd-switch-checked')).toBeTruthy()
    expect(defaultOpenWrapper.find('.kd-select-selection-item').text()).toEqual('#333333')
    expect(defaultOpenWrapper.find('.kd-color-picker-input').at(0).prop('value')).toEqual('#themeColor')
    expect(defaultOpenWrapper.find('.kd-color-picker-panel-transparent').at(0).prop('value')).toEqual('100%')
    expect(
      (defaultOpenWrapper.find('.kd-select-selection-search-input').getDOMNode() as HTMLInputElement).readOnly,
    ).toBeTruthy()
    expect(
      (defaultOpenWrapper.find('.kd-color-picker-panel-transparent').at(0).getDOMNode() as HTMLInputElement).disabled,
    ).toBeTruthy()
    defaultOpenWrapper.find('.kd-switch').simulate('click')
    defaultOpenWrapper.setProps({ functionalColorName: '#coolStyle', switchName: { name: '酷玩风格' } })
    defaultOpenWrapper.find('.kd-switch').simulate('click')
    expect(onChange).toHaveBeenCalled()
    expect(colorValue).toEqual('#coolStyle')
    expect(defaultOpenWrapper.find('.kd-color-picker-input').at(0).prop('value')).toEqual('#coolStyle')
    expect(defaultOpenWrapper.find('.kd-color-picker-panel-switch').find('span').at(0).text()).toEqual('酷玩风格')

    // presetColor、showPresetColor
    expect(defaultOpenWrapper.find('.kd-color-picker-panel-colorDivContainer').children('li').length).toEqual(36)
    const colorArr = ['blue', '#0000ff', 'rgb(0,0,255)', 'hsl(240,100%,50%)', 'hsb(240,100%,100%)']
    defaultOpenWrapper.setProps({ presetColor: colorArr })
    defaultOpenWrapper.update()
    expect(defaultOpenWrapper.find('.kd-color-picker-panel-colorDivContainer').children('li').length).toEqual(5)
    defaultOpenWrapper.setProps({ showPresetColor: false })
    defaultOpenWrapper.update()
    expect(defaultOpenWrapper.exists('.kd-color-picker-panel-colorDivContainer')).toBeFalsy()
    defaultOpenWrapper.setProps({ showPresetColor: true })
    defaultOpenWrapper.update()
    expect(defaultOpenWrapper.exists('.kd-color-picker-panel-colorDivContainer')).toBeTruthy()

    // showColorTransfer
    defaultOpenWrapper.setProps({ showColorTransfer: false })
    defaultOpenWrapper.update()
    expect(defaultOpenWrapper.exists('.kd-color-picker-panel-input')).toBeFalsy()
    expect(defaultOpenWrapper.exists('.kd-color-picker-panel-transparent')).toBeFalsy()
    defaultOpenWrapper.setProps({ showColorTransfer: true })
    defaultOpenWrapper.update()
    expect(defaultOpenWrapper.exists('.kd-color-picker-panel-input')).toBeTruthy()
    expect(defaultOpenWrapper.exists('.kd-color-picker-panel-transparent')).toBeTruthy()

    // showColorPickerBox
    expect(
      defaultOpenWrapper.exists(
        '.kd-color-picker-panel-chrome-no-box.kd-color-picker-panel-chrome-no-hue.kd-color-picker-panel-chrome-no-opacity',
      ),
    ).toBeTruthy()
    defaultOpenWrapper.setProps({ showColorPickerBox: { showBox: true, showHue: true, showOpacity: true } })
    defaultOpenWrapper.update()
    expect(
      defaultOpenWrapper.exists(
        '.kd-color-picker-panel-chrome-no-box.kd-color-picker-panel-chrome-no-hue.kd-color-picker-panel-chrome-no-opacity',
      ),
    ).toBeFalsy()

    // getPopupContainer
    const wrapperRef = React.createRef() as any
    const popuContainer = mount(
      <div ref={wrapperRef}>
        <ColorPicker
          defaultOpen
          {...defaultColorPickerProps}
          getPopupContainer={() => wrapperRef.current}
        ></ColorPicker>
      </div>,
    )
    expect(popuContainer.find('.kd-color-picker-pop').length).toBe(1)

    // // visible
    // const TestVisible = () => {
    //   const [visible, setVisible] = React.useState(true)
    //   return (
    //     <>
    //       <button
    //         onClick={() => {
    //           setVisible(!visible)
    //         }}
    //       ></button>
    //       <ColorPicker visible={visible}></ColorPicker>
    //     </>
    //   )
    // }
    // const wrapper = mount(<TestVisible></TestVisible>)
    // expect(wrapper.exists('.kd-color-picker-pop')).toBeTruthy()
    // expect(wrapper.find('.kd-color-picker-pop').hasClass('hidden')).toBeFalsy()
    // wrapper.find('.kd-color-picker-input').at(0).simulate('click')
    // expect(wrapper.find('.kd-color-picker-pop').hasClass('hidden')).toBeFalsy()
    // wrapper.find('button').simulate('click')
    // expect(wrapper.find('.kd-color-picker-pop').hasClass('hidden')).toBeTruthy()

    // wrapper.unmount()
    underlineWrapper.unmount()
    borderedWrapper.unmount()
    customSuffixWrapper.unmount()
    underlineDefValueWrapper.unmount()
    borderedDefValueWrapper.unmount()
    defaultOpenWrapper.unmount()
  })

  // 7.click
  const testCommonState = (wrapper: any, colorValue: string, opacity: string) => {
    expect(wrapper.find('.kd-color-picker-input').at(0).prop('value')).toEqual(colorValue)
    expect((wrapper.find('.kd-select-wrapper').getDOMNode() as HTMLDivElement).title).toEqual(colorValue)
    expect(wrapper.find('.kd-select-selection-item').text()).toEqual(colorValue)
    expect(wrapper.find('.kd-color-picker-panel-transparent').at(0).prop('value')).toEqual(opacity)
    expect(wrapper.find('.kd-select').hasClass('kd-select-visible')).toBeFalsy()
  }
  it('should display the correct color values and corrent opacity for the corresponding type when clicking on different types of buttons', () => {
    const wrapper = mount(<ColorPicker {...defaultColorPickerProps} defaultOpen={true}></ColorPicker>)
    wrapper.setProps({ value: '#34343409' })
    wrapper.update()
    testCommonState(wrapper, '#34343409', '4%')
    wrapper.find('.kd-color-picker-panel-input').simulate('click')
    // !Select组件的defaultOpen有问题
    // expect(wrapper.find('.kd-select').hasClass('kd-select-visible')).toBeTruthy()
    // expect(wrapper.find('.kd-select-item-option').length).toEqual(4)
    // expect(wrapper.find('.kd-select-item-option').at(0).text()).toEqual('HEX')
    // expect(wrapper.find('.kd-select-item-option').at(1).text()).toEqual('HSB')
    // expect(wrapper.find('.kd-select-item-option').at(2).text()).toEqual('RGB')
    // expect(wrapper.find('.kd-select-item-option').at(3).text()).toEqual('HSL')
    // click HEX
    // wrapper.find('.kd-select-item-option').at(0).simulate('click')
    // expect(defaultColorPickerProps.onChange).toHaveBeenCalled()
    // testCommonState('#34343409', '4%')
    // wrapper.find('.kd-color-picker-panel-input').simulate('click')
    // click HSB
    // wrapper.find('.kd-select-item-option').at(1).simulate('click')
    // expect(defaultColorPickerProps.onChange).toHaveBeenCalled()
    // testCommonState('hsba(0, 0%, 20%, 0.04)', '4%')
    // wrapper.find('.kd-color-picker-panel-input').simulate('click')
    // click RGB
    // wrapper.find('.kd-select-item-option').at(2).simulate('click')
    // expect(defaultColorPickerProps.onChange).toHaveBeenCalled()
    // testCommonState('rgba(52, 52, 52, 0.04)', '4%')
    // wrapper.find('.kd-color-picker-panel-input').simulate('click')
    // click HSL
    // wrapper.find('.kd-select-item-option').at(3).simulate('click')
    // expect(defaultColorPickerProps.onChange).toHaveBeenCalled()
    // testCommonState('hsla(0, 0%, 20%, 0.04)', '4%')
    wrapper.unmount()
  })

  it('should display the correct color values and corrent opacity when setting different alpha values', () => {
    const wrapper = mount(<ColorPicker {...defaultColorPickerProps} defaultOpen={true}></ColorPicker>)
    expect(wrapper.find('.kd-color-picker-panel-transparent').at(0).prop('value')).toEqual('100%')
    wrapper
      .find('.kd-color-picker-panel-transparent')
      .at(0)
      .simulate('change', { target: { value: '10%' } })
    expect(wrapper.find('.kd-color-picker-panel-transparent').at(0).prop('value')).toEqual('10%')
    testCommonState(wrapper, '#b2b2b21a', '10%')
    wrapper.unmount()
  })

  it('should display the correct color values and corrent opacity when clicking on different preset colors', () => {
    const wrapper = mount(<ColorPicker {...defaultColorPickerProps} defaultOpen={true}></ColorPicker>)
    wrapper.find('.kd-color-picker-panel-colorDivContainer').children('li').at(0).simulate('click')
    testCommonState(wrapper, '#a1ecff', '100%')
    wrapper.unmount()
  })

  // !color-picker-box
  // it('should display the correct color values and corrent opacity when clicking on different positions of color picker box', () => {
  //   const wrapper = mount(
  //     <ColorPicker {...defaultColorPickerProps} defaultOpen showColorPickerBox></ColorPicker>,
  //   )
  //   wrapper
  //     .find('.kd-color-picker-panel-chrome')
  //     .at(0)
  //     .simulate('mousedown', {
  //       rgb: { r: 125, g: 74, b: 74, a: 0.81 },
  //     })
  //   testCommonState(wrapper, '#7d4a4acf', '81%')
  // })

  // 8.controlled & uncontrolled
  it('should display value when both value and defaultValue exist', () => {
    const wrapper = mount(<ColorPicker value="red" defaultValue="blue" />)
    expect(wrapper.find('.kd-color-picker-input').at(0).props().value).toBe('red')
  })
  it('should display defaultValue when only defaultValue exists', () => {
    const wrapper = mount(<ColorPicker defaultValue="blue" />)
    expect(wrapper.find('.kd-color-picker-input').at(0).props().value).toBe('blue')
  })
  it('should not change value when selected in the component', () => {
    const wrapper = mount(<ColorPicker defaultOpen value="blue" />)
    wrapper.find('.kd-color-picker-panel-colorDivContainer').childAt(0).simulate('click')
    expect(wrapper.find('.kd-color-picker-input').at(0).props().value).toBe('blue')
  })
  it('should change value when use onChange event', () => {
    let changeValue = 'blue'
    const handleChangeValue = jest.fn((colorValue) => {
      expect(colorValue).toEqual('#a1ecff')
      changeValue = colorValue
    })
    const wrapper = mount(<ColorPicker defaultOpen value={changeValue} onChange={handleChangeValue} />)
    wrapper.find('.kd-color-picker-panel-colorDivContainer').childAt(0).simulate('click')
  })
})
