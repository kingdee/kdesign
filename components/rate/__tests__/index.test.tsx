import React from 'react'
import { render, mount } from 'enzyme'
import Icon from '../../icon'
// import ConfigProvider from '../../config-provider/index'
import Rate from '../index'
import { SizeTypes, size as SizeType } from '../rate'
import mountTest from '../../../tests/shared/mountTest'
const props = {
  onBlur: jest.fn(),
  onFocus: jest.fn(),
  onChange: jest.fn(),
  onHoverChange: jest.fn(),
}
describe('Rate', () => {
  // 1.mount test
  mountTest(Rate)
  SizeTypes.forEach((size) => {
    mountTest(() => <Rate size={size} />)
  })

  // 2.render test
  it('renders correctly', () => {
    expect(render(<Rate></Rate>)).toMatchSnapshot()
    SizeTypes.forEach((size) => {
      expect(render(<Rate size={size}></Rate>)).toMatchSnapshot()
    })
  })

  // 3.warns in component
  it('warns if size is wrong', () => {
    const mockWarn = jest.fn()
    jest.spyOn(console, 'warn').mockImplementation(mockWarn)
    const size = 'super' as any as SizeType
    render(<Rate size={size} />)
    expect(mockWarn).toHaveBeenCalledTimes(1)
    expect(mockWarn.mock.calls[0][0]).toMatch("Warning: [kdesign]-Rate: cannot found SizeType 'super'")
  })

  // 4. displayName
  it('should have displayName static property', () => {
    const wrapper = mount(<Rate></Rate>)
    expect((wrapper.type() as any).displayName).toBe('Rate')
  })

  it('default star count is five', () => {
    const wrapper = mount(<Rate></Rate>)
    expect(wrapper.find('.kd-rate-item').length).toBe(5)
  })

  it('default icon is star and allow half choose', () => {
    const wrapper = mount(<Rate></Rate>)
    expect(wrapper.find('.kdicon-star').length).toBe(10)
  })

  it('allow half choose', () => {
    const wrapper = mount(<Rate></Rate>)
    expect(wrapper.find('.kd-rate-icon-first').length).toBe(5)
  })

  it('not allow half choose', () => {
    const wrapper = mount(<Rate allowHalf={false}></Rate>)
    expect(wrapper.find('.kd-rate-icon-first').length).toBe(0)
  })

  it('set rate read only', () => {
    const wrapper = mount(<Rate disabled={true}></Rate>)
    expect(wrapper.find('.kd-rate-disabled').length).toBe(1)
  })

  it('set rate default value which type is int', () => {
    const wrapper = mount(<Rate defaultValue={3}></Rate>)
    expect(wrapper.find('.kd-rate-icon-selected').length).toBe(6)
  })

  it('set rate default value which type is decimal and between 3.0 and 3.5, should not count half of a star', () => {
    const wrapper = mount(<Rate value={3.0}></Rate>)
    expect(wrapper.find('.kd-rate-icon-selected').length).toBe(6)
    wrapper.setProps({ value: 3.001 })
    expect(wrapper.find('.kd-rate-icon-selected').length).toBe(6)
    wrapper.setProps({ value: 3.499 })
    expect(wrapper.find('.kd-rate-icon-selected').length).toBe(6)
  })

  it('set rate default value which type is decimal and between 3.5 and 3.9 or equal 3.5, should count half of a star', () => {
    const wrapper = mount(<Rate value={3.5}></Rate>)
    expect(wrapper.find('.kd-rate-icon-selected').length).toBe(7)
    wrapper.setProps({ value: 3.999 })
    expect(wrapper.find('.kd-rate-icon-selected').length).toBe(7)
  })

  it('set rate count', () => {
    const wrapper = mount(<Rate count={10}></Rate>)
    expect(wrapper.find('.kd-rate-item').length).toBe(10)
  })

  it('set rate choosed color', () => {
    const wrapper = mount(<Rate color="red" defaultValue={3}></Rate>)
    const dom = wrapper.find('.kd-rate-icon-selected').at(0).getDOMNode() as HTMLElement
    expect(dom.style.color).toBe('red')
  })

  it('render different size', () => {
    const wrapper = mount(<Rate size={'small'}></Rate>)
    expect(wrapper.find('.kd-rate-size-small').length).toBe(1)
    wrapper.setProps({ size: 'middle' })
    expect(wrapper.find('.kd-rate-size-middle').length).toBe(1)
    wrapper.setProps({ size: 'large' })
    expect(wrapper.find('.kd-rate-size-large').length).toBe(1)
  })

  it('set rate only active current star', () => {
    const wrapper = mount(<Rate onlyActiveCurrent={true} defaultValue={3}></Rate>)
    expect(wrapper.find('.kd-rate-icon-selected').length).toBe(2)
  })

  it('replace rate active icon', () => {
    const _activeIcon = [
      <Icon type="search" key={'search_0'} />,
      <Icon type="search" key={'search_1'} />,
      <Icon type="search" key={'search_2'} />,
      <Icon type="search" key={'search_3'} />,
      <Icon type="search" key={'search_4'} />,
    ]
    const wrapper = mount(
      <Rate
        activeIcon={(index: number) => {
          return _activeIcon[index - 1]
        }}
        defaultValue={0.5}
      ></Rate>,
    )
    expect(wrapper.find('.kdicon-search').length).toBe(1)
  })

  it('set rate custom icon that is character', () => {
    const _icon = ['A', 'B', 'C', 'D', 'E']
    const wrapper = mount(
      <Rate
        allowHalf={false}
        icon={(index) => {
          return _icon[index - 1]
        }}
      ></Rate>,
    )
    expect(wrapper.find('.kd-rate-icon-wrapper').at(0).text()).toBe('A')
    expect(wrapper.find('.kd-rate-icon-wrapper').at(1).text()).toBe('B')
    expect(wrapper.find('.kd-rate-icon-wrapper').at(2).text()).toBe('C')
    expect(wrapper.find('.kd-rate-icon-wrapper').at(3).text()).toBe('D')
    expect(wrapper.find('.kd-rate-icon-wrapper').at(4).text()).toBe('E')
  })

  it('set rate custom icon that is react component', () => {
    const wrapper = mount(<Rate icon={<Icon type="warning-solid" />}></Rate>)
    expect(wrapper.find('.kdicon-warning-solid').length).toBe(10)
  })

  it('set rate custom style', () => {
    const wrapper = mount(<Rate style={{ fontSize: 36, backgroundColor: 'gray' }} defaultValue={0.5}></Rate>)
    const dom = wrapper.find('.kd-rate').at(0).getDOMNode() as HTMLElement
    expect(dom.style.fontSize).toBe('36px')
    expect(dom.style.backgroundColor).toBe('gray')
  })

  it('set rate custom className', () => {
    const className = 'kd-custom-className'
    const wrapper = mount(<Rate className={className}></Rate>)
    expect(wrapper.find('.kd-custom-className').length).toBe(2)
  })

  it('rate onBlur onFocus callback', () => {
    const wrapper = mount(<Rate {...props}></Rate>)
    wrapper.find('span').at(0).simulate('mouseenter')
    wrapper.find('span').at(0).simulate('mouseleave')
    expect(props.onFocus).toHaveBeenCalledTimes(1)
    expect(props.onBlur).toHaveBeenCalledTimes(1)
  })

  it('second star onHoverChange callback', () => {
    const wrapper = mount(<Rate {...props}></Rate>)
    wrapper.find('.kd-rate-icon-second').at(0).simulate('mouseenter')
    wrapper.find('.kd-rate-icon-second').at(0).simulate('mouseleave')
    expect(props.onHoverChange).toHaveBeenCalledTimes(1)
    props.onHoverChange.mockRestore()
  })

  it('second star onChange callback', () => {
    const wrapper = mount(<Rate {...props}></Rate>)
    wrapper.find('.kd-rate-icon-second').at(0).simulate('click')
    expect(props.onChange).toHaveBeenCalledTimes(1)
    props.onChange.mockRestore()
  })

  it('first star onHoverChange callback', () => {
    const wrapper = mount(<Rate {...props}></Rate>)
    wrapper.find('.kd-rate-icon-first').at(0).simulate('mouseenter')
    wrapper.find('.kd-rate-icon-first').at(0).simulate('mouseleave')
    expect(props.onHoverChange).toHaveBeenCalledTimes(1)
    props.onHoverChange.mockRestore()
  })

  it('first star onChange callback', () => {
    const wrapper = mount(<Rate {...props}></Rate>)
    wrapper.find('.kd-rate-icon-first').at(0).simulate('click')
    expect(props.onChange).toHaveBeenCalledTimes(1)
    props.onChange.mockRestore()
  })

  it('mouse hover or click star , then will active all left icon', () => {
    const wrapper = mount(<Rate {...props} defaultValue={3}></Rate>)
    wrapper.find('.kd-rate-icon-first').at(4).simulate('mouseenter')
    expect(wrapper.find('.kd-rate-icon-selected').length).toBe(9)
    wrapper.find('.kd-rate-icon-first').at(4).simulate('click')
    expect(wrapper.find('.kd-rate-icon-selected').length).toBe(9)

    wrapper.find('.kd-rate-icon-second').at(2).simulate('mouseenter')
    expect(wrapper.find('.kd-rate-icon-selected').length).toBe(6)
    wrapper.find('.kd-rate-icon-second').at(2).simulate('click')
    expect(wrapper.find('.kd-rate-icon-selected').length).toBe(6)
  })

  it('mouse hover or click star ,but active only current icon when set onlyActiveCurrent attribution to be true', () => {
    const wrapper = mount(<Rate {...props} defaultValue={3} onlyActiveCurrent></Rate>)
    wrapper.find('.kd-rate-icon-first').at(3).simulate('click')
    expect(wrapper.find('.kd-rate-icon-selected').length).toBe(1)
    wrapper.find('.kd-rate-icon-second').at(4).simulate('click')
    expect(wrapper.find('.kd-rate-icon-selected').length).toBe(2)

    wrapper.find('.kd-rate-icon-first').at(3).simulate('mouseenter')
    expect(wrapper.find('.kd-rate-icon-selected').length).toBe(1)
    wrapper.find('.kd-rate-icon-second').at(4).simulate('mouseenter')
    expect(wrapper.find('.kd-rate-icon-selected').length).toBe(2)
  })
})
