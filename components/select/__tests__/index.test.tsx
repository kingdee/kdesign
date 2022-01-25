import React from 'react'
import { render, mount } from 'enzyme'
import Select from '../index'
import { SelectSizes, BorderTypes, Modes } from '../interface'
import mountTest from '../../../tests/shared/mountTest'

describe('Select', () => {
  // 1.mount test
  mountTest(Select)

  // 2.render test
  it('renders correctly', () => {
    Modes.forEach((type) => {
      const wrapper = render(
        <Select mode={type}>
          <Select.Option value="apple">苹果</Select.Option>
        </Select>,
      )
      expect(wrapper).toMatchSnapshot()
    })

    BorderTypes.forEach((type) => {
      const wrapper = render(
        <Select borderType={type}>
          <Select.Option value="apple">苹果</Select.Option>
        </Select>,
      )
      expect(wrapper).toMatchSnapshot()
    })

    SelectSizes.forEach((type) => {
      const wrapper = render(
        <Select size={type}>
          <Select.Option value="apple">苹果</Select.Option>
        </Select>,
      )
      expect(wrapper).toMatchSnapshot()
    })
  })

  // 3. render no child without errors
  it('render no child without errors', () => {
    expect(mount(<Select></Select>)).toMatchSnapshot()
  })

  // 4. render null or undefined without errors
  it('render null or undefined without errors', () => {
    expect(
      mount(
        <Select>
          {null}
          {undefined}
        </Select>,
      ),
    ).toMatchSnapshot()
  })

  // 5. displayName
  it('should have displayName static property', () => {
    const wrapper = mount(<Select></Select>)
    expect((wrapper.type() as any).displayName).toBe('Select')
  })

  // 6. class state
  it('should class use right', () => {
    Modes.forEach((type) => {
      const wrapper = mount(
        <Select mode={type} disabled>
          <Select.Option value="apple">苹果</Select.Option>
        </Select>,
      )
      expect(wrapper.find(`.kd-select-${type}`).length).toBeGreaterThanOrEqual(1)
      expect(wrapper.find(`.kd-select-${type}-disabled`).length).toBeGreaterThanOrEqual(1)
    })

    // borderTypes
    BorderTypes.forEach((type) => {
      const wrapper = render(
        <Select borderType={type} mode="multiple">
          <Select.Option value="apple">苹果</Select.Option>
        </Select>,
      )
      expect(wrapper.find(`.kd-select-${type === 'none' ? 'borderless' : type}`).length).toBeGreaterThanOrEqual(1)
    })

    // SelectSizes
    SelectSizes.forEach((size) => {
      const wrapper = render(
        <Select size={size}>
          <Select.Option value="apple">苹果</Select.Option>
        </Select>,
      )
      expect(wrapper.find(`.kd-select-size-${size}`).length).toBeGreaterThanOrEqual(1)
    })
  })

  // 7.should visible
  it('should visible', () => {
    const onDropdownVisibleChange = jest.fn()
    const onChange = jest.fn()
    const wrapper = mount(
      <Select onDropdownVisibleChange={onDropdownVisibleChange} onChange={onChange}>
        <Select.Option value="orange">橘子</Select.Option>
      </Select>,
    )
    wrapper.find('.kd-select-selector').simulate('click')
    expect(onDropdownVisibleChange).toHaveBeenCalled()
    expect(onChange).not.toHaveBeenCalled()
  })

  // 8. should not clickable when select is disabled
  it('should not clickable when select is disabled', () => {
    const onChange = jest.fn()
    const options = [
      { label: '橘子', value: 'orange' },
      { label: '苹果', value: 'apple' },
    ]
    const wrapper = mount(<Select onChange={onChange} options={options} disabled></Select>)
    wrapper.find('.kd-select-selector').simulate('click')
    expect(onChange).not.toHaveBeenCalledWith()
  })

  // 9. component interaction(event)
  it('onChange', () => {
    let value = ''
    const onChange = jest.fn((val) => {
      value = val
    })
    const wrapper = mount(
      <Select onChange={onChange} defaultOpen={true} defaultValue="lemon">
        <Select.Option value="apple">苹果</Select.Option>
        <Select.Option value="lemon">柠檬</Select.Option>
      </Select>,
    )
    wrapper.find('.kd-select-item').at(0).simulate('click')
    expect(onChange).toHaveBeenCalled()
    expect(value).toBe('apple')
  })

  // 10. value changes when children option change
  it('value changes when children option change', () => {
    const onChange = jest.fn()
    const { Option } = Select
    const wrapper = mount(
      <Select placeholder="请输入名称" onChange={onChange} defaultOpen={true}>
        <Option value="apple">苹果</Option>
        <Option value="lemon">柠檬</Option>
        <Option value="watermelon">西瓜</Option>
      </Select>,
    )
    // console.log(wrapper.html())
    wrapper.find('.kd-select-dropdown').first().find('.kd-select-item').first().simulate('click')
    expect(onChange).toHaveBeenCalled()
  })

  // 11. changes when multiple Select
  it('changes when multiple Select', () => {
    const onChange = jest.fn()
    const { Option } = Select
    const wrapper = mount(
      <Select
        placeholder="请输入名称"
        onChange={onChange}
        defaultOpen={true}
        mode="multiple"
        defaultValue={['watermelon']}
      >
        <Option value="apple">
          <span style={{ color: '#f00' }}>苹果</span>
        </Option>
        <Option value="lemon">柠檬</Option>
        <Option value="watermelon">西瓜</Option>
      </Select>,
    )
    wrapper.find('.kd-select-item').at(0).simulate('click')
    expect(onChange).toHaveBeenCalled()
    wrapper.find('.kd-checkbox-input').at(1).simulate('change')
    expect(onChange).toHaveBeenCalled()
  })

  // 12. changes when Options
  it('changes when Options', () => {
    const onChange = jest.fn()
    const options = [{ value: 'apple', label: '苹果' }, { label: '橘子' }]
    const wrapper = mount(
      <Select placeholder="请输入名称" defaultValue="apple" onChange={onChange} defaultOpen={true} options={options} />,
    )
    wrapper.find('.kd-select-item').at(0).simulate('click')
    expect(onChange).toHaveBeenCalled()
    const content = mount(
      <Select
        placeholder="请输入名称"
        mode="multiple"
        defaultValue={['apple']}
        onChange={onChange}
        defaultOpen={true}
        options={options}
      />,
    )
    content.find('.kd-select-item').at(0).simulate('click')
    expect(onChange).toHaveBeenCalled()
  })
  // 13. select all or unselect all when multiple Select
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
        defaultValue={['apple', 'lemon', 'watermelon']}
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
  // 14. allow clear and remove some options
  it('allow clear and remove some options', () => {
    const onChange = jest.fn()
    const { Option } = Select
    const wrapper = mount(
      <Select
        placeholder="请输入名称"
        onChange={onChange}
        defaultOpen={true}
        defaultValue={['apple', 'lemon']}
        mode="multiple"
        allowClear
      >
        <Option value="apple">苹果</Option>
        <Option value="lemon">柠檬</Option>
        <Option value="watermelon">西瓜</Option>
      </Select>,
    )
    wrapper.find('.kd-tag-closeWrapper').at(0).simulate('click')
    expect(onChange).toHaveBeenCalled()
    wrapper.find('.kd-select-icon-clear').simulate('click')
    expect(onChange).toHaveBeenCalled()

    const content = mount(
      <Select onChange={onChange} defaultOpen={true} allowClear defaultValue="apple">
        <Option value="apple">苹果</Option>
      </Select>,
    )
    content.find('.kd-select-icon-clear').simulate('click')
    expect(onChange).toHaveBeenCalled()
  })
  // 15. Focus
  it('Focus', () => {
    const onFocus = jest.fn()
    const wrapper = mount(<Select onFocus={onFocus}></Select>)
    wrapper.find('.kd-select-selector').simulate('focus')
    expect(onFocus).toHaveBeenCalled()
  })
  // 16. Blur
  it('Blur', () => {
    const onBlur = jest.fn()
    const wrapper = mount(<Select onBlur={onBlur}></Select>)
    wrapper.find('.kd-select-selector').simulate('blur')
    expect(onBlur).toHaveBeenCalled()
  })

  // 17. set maxTagHolder
  it('set maxTagHolder', () => {
    const onChange = jest.fn()
    const { Option } = Select
    const wrapper = mount(
      <Select
        onChange={onChange}
        defaultOpen={true}
        defaultValue={['lemon', 'watermelon']}
        mode="multiple"
        maxTagPlaceholder="等"
        maxTagCount={2}
      >
        <Option value="apple">苹果</Option>
        <Option value="lemon">柠檬</Option>
        <Option value="watermelon">西瓜</Option>
      </Select>,
    )
    wrapper.find('.kd-select-item').at(0).simulate('click')
    expect(onChange).toHaveBeenCalled()
  })

  // 18. filter options
  // it('filter options', () => {
  //   const { Option } = Select
  //   const handleSearch = jest.fn()
  //   const wrapper = mount(
  //     <Select showSearch onSearch={handleSearch} defaultOpen={true}>
  //       <Option value="apple">苹果</Option>
  //       <Option value="lemon">柠檬</Option>
  //       <Option value="watermelon">西瓜</Option>
  //     </Select>
  //   )
  // })
})
