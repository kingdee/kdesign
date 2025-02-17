import React, { ReactNode } from 'react'
import { mount, render } from 'enzyme'
import ColorPicker from '../index'
import ColorPickerPanel from '../color-picker-panel'
import ConfigProvider from '../../config-provider/index'
import { BorderTypes, IColorPickerInputRef, IColorPickerProps } from '../interface'
import mountTest from '../../../tests/shared/mountTest'
import { act } from 'react-dom/test-utils'
import { sleep } from '../../../tests/utils'

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
      const wrapper = render(<ColorPicker borderType={type} defaultOpen={false} placeholder="#" showSwitch={false} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
  // #region 3.warns in component
  it('should warns when set wrong "functionalColor" of prop', () => {
    const mockWarn = jest.fn()
    jest.spyOn(console, 'warn').mockImplementation(mockWarn)
    const props = {
      defaultOpen: true,
      functionalColor: '234',
      showSwitch: true,
    }
    const wrapper = mount(<ColorPicker {...props} />)
    wrapper.find('.kd-switch').simulate('click')
    expect(mockWarn).toHaveBeenCalledTimes(1)
    expect(mockWarn.mock.calls[0][0]).toMatch(
      "Warning: [kdesign]-color-picker: 'themeColor' must be hexadecimal, RGB, HSB, HSL or English color name",
    )
  })
  it('should warns when set wrong "presetColor" of prop', () => {
    const mockWarn = jest.fn()
    jest.spyOn(console, 'warn').mockImplementation(mockWarn)
    const props = {
      defaultOpen: true,
      presetColor: ['123'],
    }
    mount(<ColorPicker {...props} />)
    expect(mockWarn).toHaveBeenCalledTimes(1)
    expect(mockWarn.mock.calls[0][0]).toMatch(
      "Warning: [kdesign]-color-picker: 'presetColor' must be an array of hexadecimal, HEXA, RGB, RGBA, HSB, HSBA, HSL, HSLA or English color name string type",
    )
  })
  it('should warns when set first wrong of "panelFormatConfig" of prop', () => {
    const mockWarn = jest.fn()
    jest.spyOn(console, 'warn').mockImplementation(mockWarn)
    const config: any = {
      show: ['HEX', 'RGB', 'HSB'],
      default: 'test',
    }
    const props = {
      defaultOpen: true,
      panelFormatConfig: config,
    }

    mount(<ColorPicker {...props} />)
    expect(mockWarn).toHaveBeenCalledTimes(2)
    expect(mockWarn.mock.calls[0][0]).toMatch(
      "Warning: [kdesign]-color-picker: 'default' property of 'panelFormatConfig' must be one of HEX, RGB, HSB, or HSL",
    )
    expect(mockWarn.mock.calls[1][0]).toMatch(
      "Warning: [kdesign]-color-picker: 'default' property of 'panelFormatConfig' must be one of 'show'",
    )
  })
  // #endregion

  // 4.render no child without errors
  it('renders correctly with no child', () => {
    expect(mount(<ColorPicker></ColorPicker>)).toMatchSnapshot()
  })
  // 5.render null or undefined without errors
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
  // 6.displayName
  it('should have displayName static property', () => {
    const wrapper = mount(<ColorPicker></ColorPicker>)
    expect((wrapper.type() as any).displayName).toBe('ColorPicker')
    expect(ColorPickerPanel.displayName).toBe('ColorPickerPanel')
  })

  // #region 7.api test
  it('should show the correct API function', () => {
    const underlineWrapper = mount(<ColorPicker {...defaultColorPickerProps} borderType="underline"></ColorPicker>)
    const borderedWrapper = mount(<ColorPicker {...defaultColorPickerProps} borderType="bordered"></ColorPicker>)

    // borderType
    expect(
      underlineWrapper
        .find('.kd-color-picker-container .kd-color-picker-input')
        .at(2)
        .hasClass('kd-input-wrapper-underline'),
    ).toBeTruthy()
    expect(
      borderedWrapper
        .find('.kd-color-picker-container .kd-color-picker-input')
        .at(2)
        .hasClass('kd-input-wrapper-underline'),
    ).toBeFalsy()

    // className
    expect(underlineWrapper.find('.kd-color-picker-container').hasClass('my-color-picker')).toBeTruthy()
    expect(borderedWrapper.find('.kd-color-picker-container').hasClass('my-color-picker')).toBeTruthy()

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
    expect(underlineWrapper.find('.kd-input-wrapper-underline').prop('style')).toBeFalsy()
    underlineWrapper.setProps({ style: { height: '40px' } })
    underlineWrapper.update()
    expect(underlineWrapper.find('.kd-color-picker-container').prop('style')).toEqual({ height: '40px' })
    expect(underlineWrapper.find('.kd-color-picker-container')).toHaveStyle('height', '40px')

    // default prefixIcon
    expect(underlineWrapper.find('.kd-input-prefix').find('.kd-color-picker-icon')).toHaveClassName(
      'kd-color-picker-icon-underline',
    )
    expect(
      underlineWrapper
        .find('.kd-input-prefix')
        .find('.kd-color-picker-icon')
        .find('.kd-color-picker-icon-no-color-line'),
    ).toExist()
    expect(borderedWrapper.find('.kd-input-prefix').find('.kd-color-picker-icon')).toHaveClassName(
      'kd-color-picker-icon-bordered',
    )
    expect(
      borderedWrapper
        .find('.kd-input-prefix')
        .find('.kd-color-picker-icon')
        .find('.kd-color-picker-icon-no-color-line'),
    ).toExist()

    // default suffixIcon
    underlineWrapper.setProps({ prefixIcon: () => null, suffixIcon: (_: string, dom: ReactNode) => dom })
    borderedWrapper.setProps({ prefixIcon: () => null, suffixIcon: (_: string, dom: ReactNode) => dom })
    underlineWrapper.update()
    borderedWrapper.update()
    expect(underlineWrapper.find('.kd-input-suffix').find('.kd-color-picker-icon')).toHaveClassName(
      'kd-color-picker-icon-underline',
    )
    expect(
      underlineWrapper
        .find('.kd-input-suffix')
        .find('.kd-color-picker-icon')
        .find('.kd-color-picker-icon-no-color-line'),
    ).toExist()
    expect(borderedWrapper.find('.kd-input-suffix').find('.kd-color-picker-icon')).toHaveClassName(
      'kd-color-picker-icon-bordered',
    )
    expect(
      borderedWrapper
        .find('.kd-input-suffix')
        .find('.kd-color-picker-icon')
        .find('.kd-color-picker-icon-no-color-line'),
    ).toExist()

    // custom prefixIcon
    const prefix = (rgbColor: string) => {
      return (
        <div className="prefix-icon" style={{ color: rgbColor }}>
          点击
        </div>
      )
    }
    const customPrefixWrapper = mount(<ColorPicker prefixIcon={prefix} />)
    expect(customPrefixWrapper.find('.kd-input-prefix').find('.prefix-icon')).toBeTruthy()
    expect(customPrefixWrapper.find('.kd-input-prefix').find('.prefix-icon')).toHaveStyle(
      'color',
      'RGBA(255, 255, 255, 0)',
    )
    customPrefixWrapper.setProps({ value: 'red' })
    customPrefixWrapper.update()
    expect(customPrefixWrapper.find('.kd-input-prefix').find('.prefix-icon')).toHaveStyle('color', 'RGB(255, 0, 0)')
    expect(customPrefixWrapper.find('.kd-input-prefix').find('.prefix-icon').text()).toEqual('点击')

    // custom suffixIcon
    const suffix = (rgbColor: string) => {
      return (
        <div className="suffix-icon" style={{ color: rgbColor }}>
          点击
        </div>
      )
    }
    const customSuffixWrapper = mount(<ColorPicker prefixIcon={() => null} suffixIcon={suffix} />)
    expect(customSuffixWrapper.find('.kd-input-suffix').find('.suffix-icon')).toBeTruthy()
    expect(customSuffixWrapper.find('.kd-input-suffix').find('.suffix-icon')).toHaveStyle(
      'color',
      'RGBA(255, 255, 255, 0)',
    )
    customSuffixWrapper.setProps({ value: 'red' })
    customSuffixWrapper.update()
    expect(customSuffixWrapper.find('.kd-input-suffix').find('.suffix-icon')).toHaveStyle('color', 'RGB(255, 0, 0)')
    expect(customSuffixWrapper.find('.kd-input-suffix').find('.suffix-icon').text()).toEqual('点击')

    // defaultValue
    const underlineDefValueWrapper = mount(
      <ColorPicker borderType="underline" defaultValue="#fff" defaultOpen={true} />,
    )
    const borderedDefValueWrapper = mount(<ColorPicker defaultValue="#666" defaultOpen={true} />)
    expect(underlineDefValueWrapper.find('.kd-input-underline').prop('value')).toEqual('#fff')
    expect(underlineDefValueWrapper.find('.kd-color-picker-panel-container-input').at(0).prop('value')).toEqual(
      '#FFFFFF',
    )
    expect(underlineDefValueWrapper.find('.kd-color-picker-panel-container-transparent').at(0).prop('value')).toEqual(
      '100%',
    )
    expect(borderedDefValueWrapper.find('.kd-color-picker-input').at(0).prop('value')).toEqual('#666')
    expect(borderedDefValueWrapper.find('.kd-color-picker-panel-container-input').at(0).prop('value')).toEqual(
      '#666666',
    )
    expect(borderedDefValueWrapper.find('.kd-color-picker-panel-container-transparent').at(0).prop('value')).toEqual(
      '100%',
    )

    // disabled
    underlineDefValueWrapper.setProps({ disabled: true })
    borderedDefValueWrapper.setProps({ disabled: true })
    underlineDefValueWrapper.update()
    borderedDefValueWrapper.update()
    expect(underlineDefValueWrapper.find('.kd-input-wrapper-disabled')).toExist()
    expect(borderedDefValueWrapper.find('.kd-input-wrapper-disabled')).toExist()
    underlineDefValueWrapper.setProps({ disabled: false })
    borderedDefValueWrapper.setProps({ disabled: false })
    underlineDefValueWrapper.update()
    borderedDefValueWrapper.update()

    // value
    underlineDefValueWrapper.setProps({ value: 'red' })
    borderedDefValueWrapper.setProps({ value: 'blue' })
    underlineDefValueWrapper.update()
    borderedDefValueWrapper.update()
    expect(underlineDefValueWrapper.find('.kd-input-underline').prop('value')).toEqual('red')
    expect(underlineDefValueWrapper.find('.kd-color-picker-panel-container-input').at(0).prop('value')).toEqual(
      '#FF0000',
    )
    expect(underlineDefValueWrapper.find('.kd-color-picker-panel-container-transparent').at(0).prop('value')).toEqual(
      '100%',
    )
    expect(borderedDefValueWrapper.find('.kd-color-picker-input').at(0).prop('value')).toEqual('blue')
    expect(borderedDefValueWrapper.find('.kd-color-picker-panel-container-input').at(0).prop('value')).toEqual(
      '#0000FF',
    )
    expect(borderedDefValueWrapper.find('.kd-color-picker-panel-container-transparent').at(0).prop('value')).toEqual(
      '100%',
    )
    // defaultOpen
    let colorValue = ''
    const onChange = jest.fn((color) => {
      colorValue = color
    })
    const defaultOpenWrapper = mount(<ColorPicker defaultOpen={true} onChange={onChange}></ColorPicker>)
    expect(defaultOpenWrapper.exists('.kd-color-picker-pop')).toBeTruthy()
    expect(defaultOpenWrapper.find('.kd-select-selection-item').text()).toEqual('HEX')
    expect(defaultOpenWrapper.find('.kd-color-picker-panel-container-input').at(0).prop('value')).toEqual('#FFFFFF')
    expect(defaultOpenWrapper.find('.kd-color-picker-panel-container-transparent').at(0).prop('value')).toEqual('0%')
    defaultOpenWrapper.setProps({ defaultValue: 'blue' })
    defaultOpenWrapper.update()
    expect(borderedDefValueWrapper.find('.kd-color-picker-input').at(0).prop('value')).toEqual('blue')
    expect(defaultOpenWrapper.find('.kd-select-selection-item').text()).toEqual('HEX')
    expect(defaultOpenWrapper.find('.kd-color-picker-panel-container-input').at(0).prop('value')).toEqual('#0000FF')
    expect(defaultOpenWrapper.find('.kd-color-picker-panel-container-transparent').at(0).prop('value')).toEqual('100%')

    // functionalColor、functionalColorName、switchName、showSwitch
    defaultOpenWrapper.setProps({ showSwitch: true })
    defaultOpenWrapper.update()
    expect(defaultOpenWrapper.exists('.kd-color-picker-panel-switch')).toBeFalsy()
    defaultOpenWrapper.setProps({ functionalColor: '#333333' })
    defaultOpenWrapper.update()
    expect(defaultOpenWrapper.exists('.kd-color-picker-panel-switch')).toBeTruthy()
    expect(defaultOpenWrapper.find('.kd-color-picker-panel-switch').find('span').at(0).text()).toEqual('跟随功能色')
    expect(
      defaultOpenWrapper.find('.kd-color-picker-panel-switch').find('span').at(1).hasClass('kd-switch-checked'),
    ).toBeFalsy()
    defaultOpenWrapper.find('.kd-switch').simulate('click')
    expect(onChange).toHaveBeenCalled()
    expect(colorValue).toEqual('#themeColor')
    expect(defaultOpenWrapper.find('.kd-switch').hasClass('kd-switch-checked')).toBeTruthy()
    expect(defaultOpenWrapper.find('.kd-select-selection-item').text()).toEqual('HEX')
    expect(defaultOpenWrapper.find('.kd-color-picker-panel-container-input').at(0).prop('value')).toEqual('#333333')
    expect(defaultOpenWrapper.find('.kd-color-picker-input').at(0).prop('value')).toEqual('#themeColor')
    expect(defaultOpenWrapper.find('.kd-color-picker-panel-container-transparent').at(0).prop('value')).toEqual('100%')
    expect(
      (defaultOpenWrapper.find('.kd-select-selection-search-input').getDOMNode() as HTMLInputElement).readOnly,
    ).toBeTruthy()
    expect(
      (defaultOpenWrapper.find('.kd-color-picker-panel-container-transparent').at(0).getDOMNode() as HTMLInputElement)
        .disabled,
    ).toBeTruthy()
    defaultOpenWrapper.find('.kd-switch').simulate('click')
    defaultOpenWrapper.setProps({ functionalColorName: '#coolStyle', switchName: { name: '酷玩风格' } })
    defaultOpenWrapper.find('.kd-switch').simulate('click')
    expect(onChange).toHaveBeenCalled()
    expect(colorValue).toEqual('#coolStyle')
    expect(defaultOpenWrapper.find('.kd-color-picker-input').at(0).prop('value')).toEqual('#coolStyle')
    expect(defaultOpenWrapper.find('.kd-color-picker-panel-switch').find('span').at(0).text()).toEqual('酷玩风格')

    // presetColor、showPresetColor
    expect(defaultOpenWrapper.find('.kd-color-picker-panel-color-box-container').children('li').length).toEqual(36)
    const colorArr = ['blue', '#0000ff', 'rgb(0,0,255)', 'hsl(240,100%,50%)', 'hsb(240,100%,100%)']
    defaultOpenWrapper.setProps({ presetColor: colorArr })
    defaultOpenWrapper.update()
    expect(defaultOpenWrapper.find('.kd-color-picker-panel-color-box-title')).not.toExist()
    expect(defaultOpenWrapper.find('.kd-color-picker-panel-color-box-container').children('li').length).toEqual(5)
    defaultOpenWrapper.setProps({ showPresetColor: false })
    defaultOpenWrapper.update()
    expect(defaultOpenWrapper.find('.kd-color-picker-panel-color-box-title')).not.toExist()
    expect(defaultOpenWrapper.exists('.kd-color-picker-panel-color-box-container')).toBeFalsy()
    defaultOpenWrapper.setProps({ showPresetColor: true })
    defaultOpenWrapper.update()
    expect(defaultOpenWrapper.find('.kd-color-picker-panel-color-box-title')).not.toExist()
    expect(defaultOpenWrapper.exists('.kd-color-picker-panel-color-box-container')).toBeTruthy()
    defaultOpenWrapper.setProps({ presetColor: [] })
    defaultOpenWrapper.update()
    expect(defaultOpenWrapper.exists('.kd-color-picker-panel-color-box-container')).toBeFalsy()

    // historicalColor
    defaultOpenWrapper.setProps({ historicalColor: colorArr, presetColor: colorArr })
    defaultOpenWrapper.update()
    expect(defaultOpenWrapper.find('.kd-color-picker-panel-color-box-title')).toExist()
    expect(defaultOpenWrapper.find('.kd-color-picker-panel-historical-color-box-title')).toExist()
    expect(
      defaultOpenWrapper.find('.kd-color-picker-panel-historical-color-box-container').children('li').length,
    ).toEqual(5)
    defaultOpenWrapper.setProps({ historicalColor: [] })
    defaultOpenWrapper.update()
    expect(defaultOpenWrapper.find('.kd-color-picker-panel-historical-color-box')).not.toExist()
    expect(defaultOpenWrapper.find('.kd-color-picker-panel-color-box-title')).not.toExist()

    // popperClassName
    defaultOpenWrapper.setProps({ popperClassName: 'color-picker-test' })
    defaultOpenWrapper.update()
    expect(defaultOpenWrapper.find('.color-picker-test')).toExist()

    // showColorTransfer
    defaultOpenWrapper.setProps({ showColorTransfer: false })
    defaultOpenWrapper.update()
    expect(defaultOpenWrapper.exists('.kd-color-picker-panel-container-input')).toBeFalsy()
    expect(defaultOpenWrapper.exists('.kd-color-picker-panel-container-transparent')).toBeFalsy()
    defaultOpenWrapper.setProps({ showColorTransfer: true })
    defaultOpenWrapper.update()
    expect(defaultOpenWrapper.exists('.kd-color-picker-panel-container-input')).toBeTruthy()
    expect(defaultOpenWrapper.exists('.kd-color-picker-panel-container-transparent')).toBeTruthy()

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

    // showAlpha
    expect(defaultOpenWrapper.find('.kd-color-picker-panel-container-transparent')).toExist()
    defaultOpenWrapper.setProps({ showAlphaInput: false })
    defaultOpenWrapper.update()
    expect(defaultOpenWrapper.exists('.kd-color-picker-panel-container-transparent')).toBeFalsy()

    // format
    const formatWrapper = mount(<ColorPicker defaultOpen={true} />)
    formatWrapper.find('.kd-color-picker-panel-color-box-container').find('li').at(0).simulate('click')
    expect(
      (formatWrapper.find('.kd-color-picker-input').find('.kd-input').getDOMNode() as HTMLInputElement).value,
    ).toEqual('#A1ECFF')
    formatWrapper.setProps({ format: 'RGB' })
    formatWrapper.update()
    formatWrapper.find('.kd-color-picker-panel-color-box-container').find('li').at(0).simulate('click')
    expect(
      (formatWrapper.find('.kd-color-picker-input').find('.kd-input').getDOMNode() as HTMLInputElement).value,
    ).toEqual('RGB(161, 236, 255)')
    formatWrapper.setProps({ format: 'HSB' })
    formatWrapper.update()
    formatWrapper.find('.kd-color-picker-panel-color-box-container').find('li').at(0).simulate('click')
    expect(
      (formatWrapper.find('.kd-color-picker-input').find('.kd-input').getDOMNode() as HTMLInputElement).value,
    ).toEqual('HSB(192, 37%, 100%)')
    formatWrapper.setProps({ format: 'HSL' })
    formatWrapper.update()
    formatWrapper.find('.kd-color-picker-panel-color-box-container').find('li').at(0).simulate('click')
    expect(
      (formatWrapper.find('.kd-color-picker-input').find('.kd-input').getDOMNode() as HTMLInputElement).value,
    ).toEqual('HSL(192, 100%, 82%)')

    // panelFormatConfig
    const panelFormatConfigWrapper = mount(
      <ColorPicker defaultOpen={true} panelFormatConfig={{ show: ['HEX', 'HSB', 'RGB', 'HSL'], default: 'RGB' }} />,
    )
    expect((panelFormatConfigWrapper.find('.kd-select-bordered').getDOMNode() as HTMLInputElement).title).toEqual('RGB')

    // showClear
    const showClearWrapper = mount(<ColorPicker defaultValue="#EEEEEE" defaultOpen={true} />)
    expect(showClearWrapper.find('.kd-color-picker-panel-clear')).toExist()
    expect(
      (showClearWrapper.find('.kd-color-picker-input').find('.kd-input').getDOMNode() as HTMLInputElement).value,
    ).toEqual('#EEEEEE')
    expect(
      (
        showClearWrapper
          .find('.kd-color-picker-panel-container-input')
          .find('.kd-input')
          .getDOMNode() as HTMLInputElement
      ).value,
    ).toEqual('#EEEEEE')
    showClearWrapper.find('.kd-color-picker-panel-clear-box').simulate('click')
    expect(
      (showClearWrapper.find('.kd-color-picker-input').find('.kd-input').getDOMNode() as HTMLInputElement).value,
    ).toEqual('')
    expect(
      (
        showClearWrapper
          .find('.kd-color-picker-panel-container-input')
          .find('.kd-input')
          .getDOMNode() as HTMLInputElement
      ).value,
    ).toEqual('#FFFFFF')
    showClearWrapper.setProps({ showClear: false })
    showClearWrapper.update()
    expect(showClearWrapper.find('.kd-color-picker-panel-clear')).not.toExist()

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

    // visible
    const TestVisible = () => {
      const [visible, setVisible] = React.useState(true)
      return (
        <>
          <button
            onClick={() => {
              setVisible(!visible)
            }}
          ></button>
          <ColorPicker visible={visible}></ColorPicker>
        </>
      )
    }
    const wrapper = mount(<TestVisible></TestVisible>)
    expect(wrapper.exists('.kd-color-picker-pop')).toBeTruthy()
    expect(wrapper.find('.kd-color-picker-pop').hasClass('hidden')).toBeFalsy()
    wrapper.find('.kd-color-picker-input').at(0).simulate('click')
    expect(wrapper.find('.kd-color-picker-pop').hasClass('hidden')).toBeFalsy()
    wrapper.find('button').simulate('click')
    expect(wrapper.find('.kd-color-picker-pop').hasClass('hidden')).toBeTruthy()

    wrapper.unmount()
    underlineWrapper.unmount()
    borderedWrapper.unmount()
    customSuffixWrapper.unmount()
    underlineDefValueWrapper.unmount()
    borderedDefValueWrapper.unmount()
    defaultOpenWrapper.unmount()
  })

  // #region controlled & uncontrolled
  // value
  it('should display value when both value and defaultValue exist', () => {
    const wrapper = mount(<ColorPicker value="red" defaultValue="blue" defaultOpen />)
    expect(wrapper.find('.kd-color-picker-input').at(0).props().value).toBe('red')
    expect(
      (wrapper.find('.kd-color-picker-panel-container-input').find('.kd-input').getDOMNode() as HTMLInputElement).value,
    ).toEqual('#FF0000')
  })
  it('should display defaultValue when only defaultValue exists', () => {
    const wrapper = mount(<ColorPicker defaultValue="blue" defaultOpen />)
    expect(wrapper.find('.kd-color-picker-input').at(0).props().value).toBe('blue')
    expect(
      (wrapper.find('.kd-color-picker-panel-container-input').find('.kd-input').getDOMNode() as HTMLInputElement).value,
    ).toEqual('#0000FF')
  })
  it('should not change value when selected in the component', () => {
    const wrapper = mount(<ColorPicker defaultOpen value="blue" />)
    wrapper.find('.kd-color-picker-panel-color-box-container').childAt(0).simulate('click')
    expect(wrapper.find('.kd-color-picker-input').at(0).props().value).toBe('blue')
    expect(
      (wrapper.find('.kd-color-picker-panel-container-input').find('.kd-input').getDOMNode() as HTMLInputElement).value,
    ).toEqual('#0000FF')
  })
  it('should change value when use onChange event', async () => {
    const changeValue = 'blue'
    const handleChangeValue = jest.fn(async (colorValue) => {
      expect(colorValue).toEqual('#A1ECFF')
      await sleep(1000)
      expect(wrapper.find('.kd-color-picker-input').first().props().value).toEqual('#A1ECFF')
      expect(
        (wrapper.find('.kd-color-picker-panel-container-input').find('.kd-input').getDOMNode() as HTMLInputElement)
          .value,
      ).toEqual('#A1ECFF')
    })
    const wrapper = mount(<ColorPicker defaultOpen value={changeValue} onChange={handleChangeValue} />)
    expect(wrapper.find('.kd-color-picker-input').first().props().value).toEqual('blue')
    expect(
      (wrapper.find('.kd-color-picker-panel-container-input').find('.kd-input').getDOMNode() as HTMLInputElement).value,
    ).toEqual('#0000FF')
    act(() => {
      wrapper.find('.kd-color-picker-panel-color-box-container').childAt(0).simulate('click')
    })
  })
  // visible
  it('panel should follow visible when both visible and defaultOpen exist', () => {
    const wrapper = mount(<ColorPicker visible={true} defaultOpen={false} />)
    expect(wrapper.exists('.kd-color-picker-pop')).toBeTruthy()
  })
  it('should display defaultOpen when only defaultOpen exists', () => {
    const wrapper = mount(<ColorPicker defaultOpen={true} />)
    expect(wrapper.exists('.kd-color-picker-pop')).toBeTruthy()
  })
  it('should not change panel state when the "visible" prop is used but not set in the component', () => {
    const wrapper = mount(<ColorPicker visible={true} />)
    wrapper.find('.kd-color-picker-input').at(0).simulate('click')
    expect(wrapper.exists('.kd-color-picker-pop')).toBeTruthy()
  })
  it('should change panel state when use onVisibleChange event', async () => {
    const handleVisibleChange = jest.fn(async (bol) => {
      expect(bol).toEqual(true)
    })
    const wrapper = mount(<ColorPicker visible={true} onVisibleChange={handleVisibleChange} />)
    act(() => {
      wrapper.find('.kd-color-picker-input').at(0).simulate('click')
    })
  })
  // #endregion
  // #endregion

  // #region 8.component interaction(event)
  const testCommonState = (format: string, wrapper: any, colorValue: string, noAlphaValue: string, opacity: string) => {
    expect(wrapper.find('.kd-color-picker-input').at(0).prop('value')).toEqual(colorValue)
    expect(wrapper.find('.kd-select-wrapper').props().title).toEqual(format)
    expect(wrapper.find('.kd-select-selection-item').text()).toEqual(format)
    expect(wrapper.find('.kd-color-picker-panel-container-input').at(0).prop('value')).toEqual(noAlphaValue)
    expect(wrapper.find('.kd-color-picker-panel-container-transparent').at(0).prop('value')).toEqual(opacity)
    expect(wrapper.find('.kd-select').hasClass('kd-select-visible')).toBeFalsy()
  }

  it('should display the correct color values and corrent opacity when setting different alpha values', () => {
    const wrapper = mount(<ColorPicker {...defaultColorPickerProps} defaultOpen={true}></ColorPicker>)
    expect(wrapper.find('.kd-color-picker-panel-container-transparent').at(0).prop('value')).toEqual('0%')
    wrapper
      .find('.kd-color-picker-panel-container-transparent')
      .at(0)
      .simulate('blur', { target: { value: '10%' } })
    expect(wrapper.find('.kd-color-picker-panel-container-transparent').at(0).prop('value')).toEqual('10%')
    testCommonState('HEX', wrapper, '#FFFFFF1A', '#FFFFFF', '10%')
    wrapper.unmount()
  })

  it('should display the correct color values and corrent opacity when clicking on different preset colors', () => {
    const wrapper = mount(<ColorPicker {...defaultColorPickerProps} defaultOpen={true}></ColorPicker>)
    wrapper.find('.kd-color-picker-panel-color-box-container').children('li').at(0).simulate('click')
    testCommonState('HEX', wrapper, '#A1ECFF', '#A1ECFF', '100%')
    wrapper.unmount()
  })

  it('select search input should always be readonly', () => {
    const wrapper = mount(<ColorPicker {...defaultColorPickerProps} defaultOpen={true}></ColorPicker>)
    expect((wrapper.find('.kd-select-selection-search-input').getDOMNode() as HTMLInputElement).readOnly).toBeTruthy()
  })

  it('should not render color picker panel when all configuration is closed', () => {
    const wrapper = mount(<ColorPicker defaultOpen={true}></ColorPicker>)
    expect(wrapper.find('.kd-color-picker-panel')).toExist()
    expect(wrapper.find('.kdicon-arrow-down')).toExist()
    wrapper.setProps({ showColorTransfer: false, showPresetColor: false, showClear: false })
    wrapper.update()
    expect(wrapper.find('.kd-color-picker-panel')).not.toExist()
    expect(wrapper.find('.kdicon-arrow-down')).not.toExist()
  })

  //! react-color无法模拟内部点击事件
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
  // })w
  // #endregion

  // 9.class state
  // data-test向下传递
  it('should ensure native API or custom API can pass', () => {
    expect(mount(<ColorPicker data-index="1"></ColorPicker>)).toHaveProp('data-index', '1')
  })

  // 10.config provider
  it('should provide the correct configuration by using configuration provider', () => {
    const colorPickerConfig = {
      compDefaultProps: {
        ColorPicker: {
          borderType: 'underline',
          defaultOpen: true,
          functionalColorName: '#themeColor',
          switchName: { name: '跟随主题色', internationalName: 'followFunctionalColor' },
          placeholder: '??',
          showColorTransfer: true,
          showPresetColor: true,
          showClear: false,
          showColorPickerBox: { showBox: false, showHue: false, showOpacity: false },
        },
      },
    }
    const wrapper = mount(
      <ConfigProvider value={colorPickerConfig}>
        <ColorPicker></ColorPicker>
      </ConfigProvider>,
    )
    expect(wrapper.find('.kd-input-underline')).toExist()
    expect(wrapper.find('.kd-color-picker-panel')).toExist()
    expect(wrapper.find('.kd-color-picker-panel-switch')).not.toExist()
    expect(wrapper.find('.kd-color-picker-input').at(0).prop('placeholder')).toEqual('??')
    expect(wrapper.find('.kd-color-picker-panel-container-input')).toExist()
    expect(wrapper.find('.kd-color-picker-panel-container-transparent')).toExist()
    expect(wrapper.find('.kd-color-picker-panel-color-box-container')).toExist()
    expect(wrapper.find('.kd-color-picker-panel-clear')).not.toExist()
    expect(
      wrapper.find(
        '.kd-color-picker-panel-chrome-no-box.kd-color-picker-panel-chrome-no-hue.kd-color-picker-panel-chrome-no-opacity',
      ),
    ).toExist()
  })

  it('should provide the correct local Configuration by using local configuration provider', () => {
    const localeData = {
      'ColorPicker.followFunctionalColor': 'followFunctionalColor',
    }
    const colorPickerConfig = {
      compDefaultProps: {},
      localeConfig: { localeData, locale: 'zh-EN' },
    }

    const config = {
      functionalColor: '#ffffff',
      showSwitch: true,
      defaultOpen: true,
      switchName: { name: '跟随功能色', internationalName: 'followFunctionalColor' },
    }
    const wrapper = mount(
      <ConfigProvider value={colorPickerConfig}>
        <ColorPicker {...config}></ColorPicker>
      </ConfigProvider>,
    )
    expect(wrapper.find('.kd-color-picker-panel-switch').children().at(0).text()).toEqual('followFunctionalColor')
  })

  // 11.ref test
  it('should get correct dom from ref of props', () => {
    const ref = React.createRef<IColorPickerInputRef>()
    mount(<ColorPicker ref={ref}></ColorPicker>)
    expect(ref?.current?.dom instanceof HTMLDivElement).toBe(true)
  })
})
