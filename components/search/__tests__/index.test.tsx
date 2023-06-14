import React from 'react'
import { render, mount } from 'enzyme'
import Search from '../index'
import { SearchSizeTypes, BorderTypes } from '../interface'
import mountTest from '../../../tests/shared/mountTest'
import ConfigProvider from '../../config-provider/index'

describe('Search', () => {
  // 1.mount test
  mountTest(Search)

  // 2.render test
  it('renders correctly', () => {
    SearchSizeTypes.forEach((size) => {
      expect(render(<Search size={size} />)).toMatchSnapshot()
    })

    BorderTypes.forEach((type) => {
      expect(render(<Search borderType={type} />)).toMatchSnapshot()
    })

    const wrapper = render(
      <Search>
        <Search.Option value="all" tag="全部" />
      </Search>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  // 3. warns in component
  describe('3. warns in component', () => {
    it('warns if type is wrong', () => {
      const mockWarn = jest.fn()
      jest.spyOn(console, 'warn').mockImplementation(mockWarn)
      const size = 'size-test'
      render(<Search size={size as any} />)
      expect(mockWarn.mock.calls[0][0]).toMatch("Warning: [kdesign]-search: cannot found search size 'size-test'")
    })
  })

  // 4. render null or undefined without errors
  it('render null or undefined without errors', () => {
    expect(
      mount(
        <Search>
          {null}
          {undefined}
        </Search>,
      ),
    ).toMatchSnapshot()
  })

  // 5. displayName
  it('should have displayName static property', () => {
    const wrapper = mount(<Search></Search>)
    expect((wrapper.type() as any).displayName).toBe('Search')
  })

  // 6. class state
  it('should class use right', () => {
    const wrapper = mount(
      <Search type="quick-search" className="my-test" style={{ color: 'red' }} disabled data-test="test"></Search>,
    )
    expect(wrapper.prop('data-test')).toEqual('test')
    expect(wrapper.find('.kd-quick-search')).toHaveStyle('color', 'red')
    expect(wrapper.find('.kd-quick-search')).toHaveClassName('.my-test')
    expect(wrapper.find('.kd-quick-search-disabled')).toExist()
  })

  // 7. component interaction(event)
  // Focus
  it('Focus', () => {
    const onFocus = jest.fn()
    const wrapper = mount(<Search type="quick-search" onFocus={onFocus}></Search>)
    wrapper.find('.kd-quick-search-input').simulate('focus')
    expect(onFocus).toHaveBeenCalled()
    expect(wrapper.find('.kd-quick-search-focused').length).toBeGreaterThanOrEqual(1)
  })

  // Blur
  it('Blur', () => {
    const onBlur = jest.fn()
    const wrapper = mount(<Search type="quick-search" onBlur={onBlur}></Search>)
    wrapper.find('.kd-quick-search-input').simulate('blur')
    expect(onBlur).toHaveBeenCalled()
  })

  // dropDown desc
  it('should have default dropDown desc', () => {
    const wrapper = mount(<Search type="quick-search" />)
    wrapper.find('.kd-quick-search-input').simulate('focus')
    expect(wrapper.find('.kd-quick-search-focused').length).toBeGreaterThanOrEqual(1)
  })

  // placeholder
  it('should show placeholder', () => {
    const wrapper = mount(<Search type="quick-search" />)
    expect(wrapper.find('.kd-quick-search-selection-placeholder').length).toBeGreaterThanOrEqual(1)
    wrapper.find('.kd-quick-search-input').simulate('change', { target: { value: '12' } })
    expect(wrapper.find('.kd-quick-search-selection-placeholder').length).toBeGreaterThanOrEqual(0)
  })

  // notFoundContent
  it('should have default notFoundContent', () => {
    const wrapper = mount(<Search type="quick-search" />)
    wrapper.find('.kd-quick-search-input').simulate('change', { target: { value: '12' } })
    expect(wrapper.find('.kd-quick-search-dropdown-empty').length).toBeTruthy()
  })

  it('should support set notFoundContent to null', () => {
    const wrapper = mount(<Search type="quick-search" notFoundContent={null} />)
    wrapper.find('.kd-quick-search-input').simulate('change', { target: { value: '12' } })
    expect(wrapper.find('.kd-quick-search-dropdown-empty').length).toBeTruthy()
  })
  it('onChange', () => {
    let value = ''
    const onChange = jest.fn((val) => {
      value = val
    })
    const wrapper = mount(
      <Search type="quick-search" onChange={onChange}>
        <Search.Option value={1} tag="全部" />
      </Search>,
    )
    wrapper.find('.kd-quick-search-input').simulate('change', { target: { value: '12' } })
    wrapper.find('.kd-quick-search-option').at(0).simulate('click')
    expect(onChange).toHaveBeenCalled()
    expect(value).toStrictEqual([1])
  })

  it('onSelect', () => {
    let value = ''
    const onSelect = jest.fn((val) => {
      value = val
    })
    const wrapper = mount(
      <Search type="quick-search" onSelect={onSelect}>
        <Search.Option value={1} tag="全部" />
      </Search>,
    )
    wrapper.find('.kd-quick-search-input').simulate('change', { target: { value: '12' } })
    wrapper.find('.kd-quick-search-option').at(0).simulate('click')
    expect(onSelect).toHaveBeenCalled()
    expect(value).toBe(1)
  })

  // changes when multiple Select
  it('changes when multiple Select', () => {
    const onChange = jest.fn()
    const { Option } = Search
    const wrapper = mount(
      <Search type="quick-search" placeholder="请输入名称" onChange={onChange}>
        <Option value={1} tag="全部" />
        <Option value={2} tag="发现人" />
      </Search>,
    )
    wrapper.find('.kd-quick-search-input').simulate('change', { target: { value: '1' } })
    wrapper.find('.kd-quick-search-option').at(0).simulate('click')
    expect(onChange).toHaveBeenCalled()
    wrapper.find('.kd-quick-search-input').simulate('change', { target: { value: '12' } })
    wrapper.find('.kd-quick-search-option').at(1).simulate('click')
    expect(onChange).toHaveBeenCalled()
  })

  // enter up down backspace
  it('keydown', () => {
    let value = ''
    const onSelect = jest.fn((val) => {
      value = val
    })
    const { Option } = Search
    const wrapper = mount(
      <Search type="quick-search" placeholder="请输入名称" onSelect={onSelect}>
        <Option value={1} tag="全部" />
        <Option value={2} tag="发现人" />
        <Option value={3} tag="处理人" />
      </Search>,
    )
    wrapper.find('.kd-quick-search-input').simulate('change', { target: { value: '1' } })
    wrapper.find('.kd-quick-search-input').simulate('keydown', { keyCode: 40 })
    wrapper.find('.kd-quick-search-input').simulate('keydown', { keyCode: 13 })
    expect(value).toBe(2)
    wrapper.find('.kd-quick-search-input').simulate('change', { target: { value: '1' } })
    wrapper.find('.kd-quick-search-input').simulate('keydown', { keyCode: 38 })
    wrapper.find('.kd-quick-search-input').simulate('keydown', { keyCode: 13 })
    expect(value).toBe(3)
    wrapper.find('.kd-quick-search-input').simulate('keydown', { keyCode: 8 })
    expect(wrapper.find('.kd-quick-search-selection-overflow-item').length).toBe(1)
  })

  it('delete tag when selected', () => {
    let value = ''
    const onChange = jest.fn((val) => {
      value = val
    })
    const { Option } = Search
    const wrapper = mount(
      <Search type="quick-search" placeholder="请输入名称" onChange={onChange}>
        <Option value={1} tag="全部" />
        <Option value={2} tag="发现人" />
      </Search>,
    )
    wrapper.find('.kd-quick-search-input').simulate('change', { target: { value: '1' } })
    wrapper.find('.kd-quick-search-option').at(0).simulate('click')
    expect(onChange).toHaveBeenCalled()
    expect(wrapper.find('.kd-quick-search-selection-overflow-item').length).toBe(1)
    wrapper.find('.kd-quick-search-selection-overflow-item-del').at(0).simulate('click')
    expect(onChange).toHaveBeenCalled()
    expect(value).toStrictEqual([])
  })

  // nlpSearch
  it('changes when set nlpSearch', () => {
    const onChange = jest.fn()
    const { Option } = Search
    const nlpSearch = {
      isSupportNlpSearch: true,
      nlpSearchLoading: true,
    }
    const wrapper = mount(
      <Search type="quick-search" placeholder="请输入名称" onChange={onChange} nlpSearch={nlpSearch}>
        <Option value={1} tag="全部" />
        <Option value={2} tag="发现人" />
      </Search>,
    )
    wrapper.find('.kd-quick-search-input').simulate('change', { target: { value: '1' } })
    expect(wrapper.find('.kd-quick-search-npl').length).toBeTruthy()
  })

  it('prefix suffix', () => {
    const wrapper = mount(<Search prefix="prefix-test" suffix="suffix-test" />)
    expect(wrapper.find('.kd-input-prefix').text()).toBe('prefix-test')
    expect(wrapper.find('.kd-input-suffix').text()).toBe('suffix-test')
  })

  it('quick search api test', () => {
    const onSearch = jest.fn()
    const wrapper = mount(
      <Search
        type="quick-search"
        onSearch={onSearch}
        dropdownStyle={{ color: 'red' }}
        listHeight={100}
        desc={['1', '2']}
        tags={[
          { value: '1', tag: '全部' },
          { value: '2', tag: '发现人' },
        ]}
      />,
    )

    wrapper.find('.kd-quick-search-input').simulate('change', { target: { value: '12' } })
    expect(onSearch).toBeCalled()

    // dropdownStyle
    expect(wrapper.find('.kd-quick-search-dropdown')).toHaveStyle('color', 'red')

    // listHeight
    expect(wrapper.find('.kd-quick-search-dropdown-scroll')).toHaveStyle('maxHeight', 100)

    // tags
    expect(wrapper.find('.kd-quick-search-option').length).toBe(2)
  })

  // 8.config provider
  it('should config use config provider', () => {
    const localeData = {
      'Search.placeholder': 'Please enter what you want to search for',
    }
    const searchConfig = {
      compDefaultProps: {
        Search: {
          size: 'small',
        },
      },
      localeConfig: { localeData, locale: 'zh-EN' },
    }
    const wrapper = mount(
      <ConfigProvider value={searchConfig}>
        <Search />
      </ConfigProvider>,
    )
    expect(wrapper.find('.kd-search')).toHaveClassName('.kd-search-size-small')
    expect(wrapper.find('input').prop('placeholder')).toBe('Please enter what you want to search for')
  })

  // 9. ref test
  it('should get Demo element from ref', () => {
    const ref = React.createRef()
    mount(<Search ref={ref} type="quick-search" />)
    expect(ref.current instanceof HTMLElement).toBe(true)
    expect((ref.current as HTMLElement).classList.contains('kd-quick-search')).toBe(true)
  })
})
