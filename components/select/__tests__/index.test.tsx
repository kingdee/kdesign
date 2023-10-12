import React from 'react'
import { render, mount } from 'enzyme'
import Select from '../index'
import { SelectSizes, BorderTypes, Modes, ISelectProps, SelectValue } from '../interface'
import mountTest from '../../../tests/shared/mountTest'
import ConfigProvider from '../../config-provider/index'

interface compProps {
  value: any
  defaultValue: any
  [key: string]: any
}

const testValueAndDefaultValue = (Component: any, props: compProps, extra: any) => {
  const { result, className } = extra?.value || {}
  const { result: defResult, className: defClassName } = extra?.defaultValue || {}
  const { args = [], result: newValue = [], callback } = extra?.onChange || {}
  it('should display value when both value and defaultValue exist', () => {
    const wrapper = mount(<Component {...props} />)
    expect(wrapper.find(className).text()).toBe(result)
  })
  it('should display defaultValue when only defaultValue exists', () => {
    const wrapper = mount(<Component {...props} value={undefined} />)
    expect(wrapper.find(defClassName).text()).toBe(defResult)
  })
  it('should not change value when selected in the component', () => {
    const wrapper = mount(<Component {...props} />)
    callback(wrapper)
    expect(wrapper.find(className).text()).toBe(result)
  })

  it('should change value when selected outside the component', () => {
    let changeValue = props.value
    const handleChange = jest.fn((...rest) => {
      rest.map((item, index) => {
        switch (args[index]) {
          case 'value':
            expect(item).toEqual(newValue[index])
            changeValue = item
            break
          case 'event':
            expect(item?.target?.value).toEqual(newValue[index])
            break
          default:
            break
        }
      })
    })
    const wrapper = mount(<Component {...props} value={changeValue} onChange={handleChange} />)

    callback(wrapper)
  })
}

const optionsData = [
  {
    label: '苹果',
    value: 'apple',
  },
  {
    label: '橘子',
    value: 'orange',
  },
  {
    label: '葡萄',
    value: 'grape',
  },
]

const defaultselectProps: ISelectProps<SelectValue> = {
  options: optionsData,
  onChange: jest.fn(),
  onSearch: jest.fn(),
  onSelect: jest.fn(),
  onClear: jest.fn(),
  onDeselect: jest.fn(),
  onBlur: jest.fn(),
  onFocus: jest.fn(),
}

describe('Select', () => {
  // 1.mount test
  mountTest(Select)

  // 2.render test
  it('renders correctly', () => {
    Modes.forEach((type) => {
      const wrapper = render(<Select mode={type} options={optionsData} />)
      expect(wrapper).toMatchSnapshot()
    })

    BorderTypes.forEach((type) => {
      const wrapper = render(<Select borderType={type} options={optionsData} />)
      expect(wrapper).toMatchSnapshot()
    })

    SelectSizes.forEach((type) => {
      const wrapper = render(<Select size={type} options={optionsData} />)
      expect(wrapper).toMatchSnapshot()
    })
  })

  // 3. render no child without errors
  it('render no child without errors', () => {
    expect(mount(<Select></Select>)).toMatchSnapshot()
  })

  // 4. render null or undefined without errors
  // it('render null or undefined without errors', () => {
  //   expect(
  //     mount(
  //       <Select>
  //         {null}
  //         {undefined}
  //       </Select>,
  //     ),
  //   ).toMatchSnapshot()
  // })

  // 5. displayName
  it('should have displayName static property', () => {
    const wrapper = mount(<Select></Select>)
    expect((wrapper.type() as any).displayName).toBe('Select')
  })

  // 6. class state
  it('should className or style use right', () => {
    const wrapper = mount(<Select className="my-test" style={{ color: 'red' }} data-test="test"></Select>)
    expect(wrapper.find('.kd-select')).toHaveClassName('.my-test')
    expect(wrapper.find('.kd-select')).toHaveStyle('color', 'red')
    expect(wrapper.prop('data-test')).toEqual('test')
  })

  // 7.component interaction(event)
  it('select all or unselect all when multiple Select', () => {
    let value = []
    const onChange = jest.fn((val) => {
      value = val
    })
    const { Option } = Select
    const wrapper = mount(
      <Select placeholder="请输入名称" onChange={onChange} defaultOpen={true} mode="multiple">
        <Option value="apple">苹果</Option>
        <Option value="lemon">柠檬</Option>
        <Option value="watermelon">西瓜</Option>
      </Select>,
    )
    wrapper.find('.kd-select-multiple-footer').first().find('.kd-checkbox-input').simulate('change')
    expect(onChange).toHaveBeenCalled()
    expect(value.length).toBe(3)

    const content = mount(
      <Select
        placeholder="请输入名称"
        onChange={onChange}
        defaultOpen={true}
        mode="multiple"
        defaultValue={['apple', 'lemon']}
      >
        <Option value="apple">苹果</Option>
        <Option value="lemon">柠檬</Option>
        <Option value="watermelon">西瓜</Option>
      </Select>,
    )
    content.find('.kd-select-multiple-footer').first().find('.kd-checkbox-input').simulate('change')
    expect(onChange).toHaveBeenCalled()
    expect(value.length).toBe(3)
  })

  it('onChange is not triggered when the singlle selector selects the same value', () => {
    const onChange = jest.fn()
    const { Option } = Select
    const wrapper = mount(
      <Select placeholder="请输入名称" onChange={onChange} value="apple" defaultOpen={true}>
        <Option value="apple">苹果</Option>
        <Option value="lemon">柠檬</Option>
        <Option value="watermelon">西瓜</Option>
      </Select>,
    )
    wrapper.find('.kd-select-item').at(0).simulate('click')
    expect(onChange).not.toHaveBeenCalled()
  })

  it('When the drop-down item is 0, the Select All button is not displayed', () => {
    const wrapper = mount(<Select placeholder="请输入名称" mode="multiple" defaultOpen={true}></Select>)
    expect(wrapper.find('.kd-select-multiple-footer')).not.toHaveClassName('.kd-checkbox-input')
  })

  // 8.config provider
  describe('8.config provider', () => {
    it('should config use config provider', () => {
      const localeData = {
        'Select.selectAll': '全部选中',
        'Select.seleted': '{size}项',
      }
      const selectConfig = {
        compDefaultProps: {
          Select: {
            size: 'small',
          },
        },
        localeConfig: { localeData, locale: 'zh-EN' },
      }
      const wrapper = mount(
        <ConfigProvider value={selectConfig}>
          <Select {...defaultselectProps} mode="single" />
        </ConfigProvider>,
      )
      expect(wrapper.find('.kd-select-wrapper')).toHaveClassName('.kd-select-size-small')

      const mulWrapper = mount(
        <ConfigProvider value={selectConfig}>
          <Select {...defaultselectProps} defaultOpen={true} mode="multiple" />
        </ConfigProvider>,
      )
      expect(mulWrapper.find('.kd-select-wrapper')).toHaveClassName('.kd-select-size-small')
      expect(mulWrapper.find('.kd-select-multiple-footer').first().find('.kd-checkbox-children')).toHaveText('全部选中')
      expect(mulWrapper.find('.kd-select-multiple-footer').find('.kd-select-multiple-footer-hadSelected')).toHaveText(
        '0项',
      )
    })
  })

  // 9. ref test
  describe('9. ref test', () => {
    it('should get Demo element from ref', () => {
      const ref = React.createRef() as any
      const onFocus = jest.fn()
      const onBlur = jest.fn()
      mount(<Select ref={ref} onBlur={onBlur} onFocus={onFocus}></Select>)
      expect((ref.current?.select as HTMLElement).classList.contains('kd-select')).toBe(true)
      expect(ref.current?.select?.focus).toBeTruthy()
      expect(ref.current?.select?.blur).toBeTruthy()
    })
  })

  // 10. api test
  // value & defaultValue(single&multiple)
  testValueAndDefaultValue(
    Select,
    { options: optionsData, value: 'apple', defaultValue: 'orange', defaultOpen: true },
    {
      value: { result: '苹果', className: '.kd-select-selection-item' },
      defaultValue: { result: '橘子', className: '.kd-select-selection-item' },
      onChange: {
        result: [
          'orange',
          {
            label: '橘子',
            value: 'orange',
          },
        ],
        className: '.kd-select-item',
        args: ['value', 'value'],
        callback: (wrapper: any) => wrapper.find('.kd-select-item').at(1).simulate('click'),
      },
    },
  )

  testValueAndDefaultValue(
    Select,
    { options: optionsData, value: ['apple'], defaultValue: ['orange'], defaultOpen: true, mode: 'multiple' },
    {
      value: { result: '苹果', className: '.kd-tag-ellipsis' },
      defaultValue: { result: '橘子', className: '.kd-tag-ellipsis' },
      onChange: {
        result: [
          ['apple', 'orange'],
          [
            {
              label: '苹果',
              value: 'apple',
            },
            {
              label: '橘子',
              value: 'orange',
            },
          ],
        ],
        className: '.kd-select-item',
        args: ['value', 'value'],
        callback: (wrapper: any) => wrapper.find('.kd-select-item').at(1).simulate('click'),
      },
    },
  )
  it('api test', () => {
    const singlewrapper = mount(<Select {...defaultselectProps} mode="single"></Select>)
    const multiplewrapper = mount(<Select {...defaultselectProps} mode="multiple"></Select>)

    // placeholder
    singlewrapper.setProps({ placeholder: 'kd' })
    expect(singlewrapper.find('.kd-select-wrapper .kd-select-placeholder').text()).toBe('kd')
    multiplewrapper.setProps({ placeholder: 'kd' })
    expect(multiplewrapper.find('.kd-select-wrapper .kd-select-placeholder').text()).toBe('kd')

    // allowClear clearIcon onClear
    expect(singlewrapper.find('.kd-select-icon-clear').length).toBe(0)
    expect(multiplewrapper.find('.kd-select-icon-clear').length).toBe(0)

    singlewrapper.setProps({ allowClear: true, value: 'apple', clearIcon: 'kd' })
    singlewrapper.update()
    expect(singlewrapper.find('.kd-select-icon-clear')).toHaveText('kd')
    singlewrapper.find('.kd-select-icon-clear').simulate('click')
    expect(defaultselectProps.onChange).toHaveBeenCalled()
    expect(defaultselectProps.onClear).toHaveBeenCalled()

    multiplewrapper.setProps({ allowClear: true, value: ['apple'], clearIcon: 'kd' })
    multiplewrapper.update()
    expect(multiplewrapper.find('.kd-select-icon-clear')).toHaveText('kd')
    multiplewrapper.find('.kd-select-icon-clear').simulate('click')
    expect(defaultselectProps.onChange).toHaveBeenCalled()
    expect(defaultselectProps.onClear).toHaveBeenCalled()

    // borderType
    BorderTypes.forEach((type) => {
      const singlewrapper = mount(<Select {...defaultselectProps} borderType={type} mode="single"></Select>)
      const multiplewrapper = mount(<Select {...defaultselectProps} borderType={type} mode="multiple"></Select>)
      expect(singlewrapper.find(`.kd-select-${type === 'none' ? 'borderless' : type}`).length).toBe(1)
      expect(multiplewrapper.find(`.kd-select-${type === 'none' ? 'borderless' : type}`).length).toBe(1)
    })

    // tree disabled (TODO click)
    singlewrapper.setProps({ disabled: true })
    expect(singlewrapper.find('.kd-select-single-disabled').length).toBe(1)
    multiplewrapper.setProps({ disabled: true })
    expect(multiplewrapper.find('.kd-select-multiple-disabled').length).toBe(1)

    // defaultOpen
    const defaultOpenSingle = mount(
      <Select
        {...defaultselectProps}
        defaultOpen={true}
        dropdownClassName="kd-select-class"
        dropdownStyle={{ background: 'red' }}
        mode="single"
      ></Select>,
    )
    const defaultOpenMultiple = mount(
      <Select
        {...defaultselectProps}
        defaultOpen={true}
        dropdownStyle={{ background: 'red' }}
        dropdownClassName="kd-select-class"
        mode="multiple"
      ></Select>,
    )
    expect(defaultOpenSingle.find('.kd-select-dropdown').length).toBe(1)
    expect(defaultOpenMultiple.find('.kd-select-dropdown').length).toBe(1)

    // dropdownClassName
    expect(defaultOpenSingle.find('.kd-select-class').length).toBe(1)
    expect(defaultOpenMultiple.find('.kd-select-class').length).toBe(1)

    // dropdownStyle
    expect(defaultOpenSingle.find('.kd-select-dropdown')).toHaveStyle('background', 'red')
    expect(defaultOpenMultiple.find('.kd-select-dropdown')).toHaveStyle('background', 'red')

    // showSearch onSearch optionFilterProp（TODO）
    defaultOpenSingle.setProps({ showSearch: true })
    defaultOpenSingle.update()
    expect(defaultOpenSingle.find('.kd-select-selection-search-input').length).toBe(1)
    defaultOpenSingle.find('.kd-select-selection-search-input').simulate('change', { target: { value: '苹果' } })
    expect(defaultselectProps.onSearch).toHaveBeenCalled()
    // expect(defaultOpenSingle.find('.kd-select-item-option').length).toBe(1)

    expect(defaultOpenMultiple.find('.kd-select-selection-search-input').length).toBe(1)
    defaultOpenMultiple.find('.kd-select-selection-search-input').simulate('change', { target: { value: '苹果' } })
    expect(defaultselectProps.onSearch).toHaveBeenCalled()
    // expect(defaultOpenMultiple.find('.kd-select-item-option').length).toBe(1)

    // suffixIcon
    defaultOpenSingle.setProps({ suffixIcon: 'kd' })
    expect(defaultOpenSingle.find('.kd-select-icon-arrow')).toHaveText('kd')
    defaultOpenMultiple.setProps({ suffixIcon: 'kd' })
    expect(defaultOpenMultiple.find('.kd-select-icon-arrow')).toHaveText('kd')

    // showArrow
    expect(defaultOpenSingle.find('.kd-select-icon-arrow').length).toBe(1)
    defaultOpenSingle.setProps({ showArrow: false })
    expect(defaultOpenSingle.find('.kd-select-icon-arrow').length).toBe(0)

    expect(defaultOpenMultiple.find('.kd-select-icon-arrow').length).toBe(1)
    defaultOpenMultiple.setProps({ showArrow: false })
    expect(defaultOpenMultiple.find('.kd-select-icon-arrow').length).toBe(0)

    // onChange onSelect onDeselect
    let selectValue: any = ''
    const onChange = jest.fn((v) => {
      selectValue = v
    })

    defaultOpenSingle.setProps({ onChange, optionLabelProp: 'value' })
    defaultOpenSingle.find('.kd-select-item').at(0).simulate('click')
    expect(onChange).toHaveBeenCalled()
    expect(selectValue).toBe('apple')
    expect(defaultOpenSingle.find('.kd-select-selection-item')).toHaveText('apple')
    expect(defaultselectProps.onSelect).toHaveBeenCalled()

    defaultOpenMultiple.setProps({ onChange, optionLabelProp: 'value' })
    defaultOpenMultiple.find('.kd-select-item').at(0).simulate('click')
    expect(onChange).toHaveBeenCalled()
    expect(selectValue.toString()).toBe('apple')
    expect(defaultOpenMultiple.find('.kd-tag-ellipsis')).toHaveText('apple')
    expect(defaultselectProps.onSelect).toHaveBeenCalled()
    defaultOpenMultiple.find('.kd-select-item').at(1).simulate('click')
    expect(defaultselectProps.onDeselect).toHaveBeenCalled()

    // labelInValue
    defaultOpenSingle.setProps({ labelInValue: true })
    defaultOpenSingle.find('.kd-select-item').at(1).simulate('click')
    expect(selectValue.value).toBe('orange')

    defaultOpenMultiple.setProps({ labelInValue: true })
    defaultOpenMultiple.find('.kd-select-item').at(1).simulate('click')
    defaultOpenMultiple.update()
    expect(selectValue[0].value).toBe('apple')

    // maxTagCount maxTagPlaceholder
    expect(defaultOpenMultiple.find('.kd-select-selection-tag').length).toBe(1)
    defaultOpenMultiple.setProps({
      value: ['apple', 'orange'],
      maxTagCount: 1,
      maxTagPlaceholder: <span className="kd-maxTagPlaceholder">kd</span>,
    })
    defaultOpenMultiple.update()
    expect(defaultOpenMultiple.find('.kd-select-selection-tag').length).toBe(1)
    expect(defaultOpenMultiple.find('.kd-maxTagPlaceholder')).toHaveText('kd')

    // listHeight
    defaultOpenSingle.setProps({ listHeight: 50 })
    expect(defaultOpenSingle.find('.kd-select-dropdown>div').at(0)).toHaveStyle({ maxHeight: 50 })

    defaultOpenMultiple.setProps({ listHeight: 50 })
    expect(defaultOpenMultiple.find('.kd-select-dropdown>div').at(0)).toHaveStyle({ maxHeight: 50 })

    // treeNode disabled
    defaultOpenSingle.setProps({
      options: [
        ...optionsData,
        {
          children: '柠檬',
          value: 'lemon',
          disabled: true,
        },
      ],
    })
    defaultOpenSingle.find('.kd-select-item').at(3).simulate('click')
    expect(defaultOpenSingle.find('.kd-select-item').at(3)).toHaveClassName('kd-select-item-option-disabled')

    defaultOpenMultiple.setProps({
      options: [
        ...optionsData,
        {
          children: '柠檬',
          value: 'lemon',
          disabled: true,
        },
      ],
    })
    defaultOpenMultiple.find('.kd-select-item').at(3).simulate('click')
    expect(defaultOpenMultiple.find('.kd-select-item').at(3)).toHaveClassName('kd-select-item-option-disabled')

    // dropdownRender
    defaultOpenSingle.setProps({ dropdownRender: () => <span>kd</span> })
    expect(defaultOpenSingle.find('.kd-select-dropdown div span').text()).toBe('kd')

    defaultOpenMultiple.setProps({ dropdownRender: () => <span>kd</span> })
    expect(defaultOpenMultiple.find('.kd-select-dropdown div').first().find('span').text()).toBe('kd')

    // notFoundContent
    defaultOpenSingle.setProps({ options: [], notFoundContent: 'kd' })
    expect(defaultOpenSingle.find('.kd-select-dropdown-empty')).toHaveText('kd')
    defaultOpenMultiple.setProps({ options: [], notFoundContent: 'kd' })
    expect(defaultOpenMultiple.find('.kd-select-dropdown-empty')).toHaveText('kd')

    // defaultValue
    const singleDeafWrapper = mount(<Select {...defaultselectProps} defaultValue="apple" mode="single"></Select>)
    const multipleDeafWrapper = mount(
      <Select {...defaultselectProps} defaultValue={['apple', 'orange']} mode="multiple"></Select>,
    )
    expect(singleDeafWrapper.find('.kd-select-selection-item')).toHaveText('苹果')
    expect(multipleDeafWrapper.find('.kd-tag-ellipsis').length).toBe(2)
    expect(multipleDeafWrapper.find('.kd-tag-ellipsis').at(0)).toHaveText('苹果')
    expect(multipleDeafWrapper.find('.kd-tag-ellipsis').at(1)).toHaveText('橘子')

    // filterOption（TODO）
    // const filterOption = jest.fn((searchValue, option) => {
    //   if (option.title?.indexOf(searchValue)) {
    //     return true
    //   }
    //   return false
    // })
    // singlewrapper.setProps({ disabled: false, filterOption })
    // singlewrapper.find('.kd-select-selection-search-input').simulate('change', { target: { value: '苹果' } })

    // getPopupContainer
    const wrapperRef = React.createRef() as any
    const popupContainer = mount(
      <div ref={wrapperRef}>
        <Select defaultOpen {...defaultselectProps} showSearch getPopupContainer={() => wrapperRef.current} />
      </div>,
    )

    expect(popupContainer.childAt(0).children().at(1).find('.kd-select-dropdown').length).toBe(1)

    // onFocus onBlur
    popupContainer.find('.kd-select-selection-search-input').simulate('focus')
    expect(defaultselectProps.onFocus).toBeCalled()
    popupContainer.find('.kd-select-selection-search-input').simulate('blur')
    expect(defaultselectProps.onBlur).toBeCalled()
  })
})
