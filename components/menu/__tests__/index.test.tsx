import React from 'react'
import { mount, render } from 'enzyme'
import Menu from '../index'
import Icon from '../../icon'
import mountTest from '../../../tests/shared/mountTest'
import { isString, isNumber, getColumnWidthList, getWrapWidth, getItemWidth } from '../util'

const MenuModes = ['inline', 'vertical']

describe('Menu', () => {
  // 1.mount test
  mountTest(Menu)

  mountTest(() => <Menu mode={'inline'} />)
  mountTest(() => <Menu mode={'vertical'} />)

  // 2.render test
  it('renders correctly', () => {
    expect(
      render(
        <Menu>
          <Menu.Item key="1">222</Menu.Item>
        </Menu>,
      ),
    ).toMatchSnapshot()
  })

  // 4. render null or undefined without errors
  it('render null or undefined buttons without errors', () => {
    const wrapper = mount(
      <Menu>
        {null}
        {undefined}
      </Menu>,
    )
    expect(wrapper.find('li').length).toBe(0)
  })

  // 5. displayName
  it('should have displayName static property', () => {
    const wrapper = mount(<Menu></Menu>)
    expect((wrapper.type() as any).displayName).toBe('Menu')
  })

  // 6. class state
  it('should class use right', () => {
    // default
    const defaultMenu = mount(<Menu />)
    expect(defaultMenu.find('.kd-menu')).toHaveClassName('kd-menu-vertical')
  })

  // 7. mouseEvent
  it('should mouseEvent use right', () => {
    const props: any = {
      onMouseLeave: jest.fn(),
      onMouseEnter: jest.fn(),
      onClick: jest.fn(),
      triggerSubMenuAction: 'click',
    }

    const itemProps: any = {
      onMouseLeave: jest.fn(),
      onMouseEnter: jest.fn(),
    }

    // default
    const menuWrapper = mount(
      <Menu {...props}>
        <Menu.Item {...itemProps}>111</Menu.Item>
      </Menu>,
    )
    menuWrapper.simulate('mouseleave')
    menuWrapper.simulate('mouseenter')

    expect(props.onMouseLeave).toHaveBeenCalled()
    expect(props.onMouseEnter).toHaveBeenCalled()

    props.onMouseLeave = ''
    props.onMouseEnter = ''
    props.selectedKey = 1
    props.openKeys = ['sub1']
    menuWrapper.setProps(props)

    menuWrapper.find('li').simulate('click')

    expect(props.onClick).toHaveBeenCalled()

    menuWrapper.find('li').simulate('mouseleave')
    menuWrapper.find('li').simulate('mouseenter')

    expect(itemProps.onMouseLeave).toHaveBeenCalled()
    expect(itemProps.onMouseEnter).toHaveBeenCalled()

    props.triggerSubMenuAction = 'hover'

    const subMenuWrapper = mount(
      <Menu {...props}>
        <Menu.SubMenu title="sub1" icon={<Icon type="add" />} popupOffset={[20]}>
          <Menu.Item>1111</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu title="sub2" subMenuMode="horizontal" popupOffset={[]}>
          <Menu.Item>1111</Menu.Item>
        </Menu.SubMenu>
      </Menu>,
    )

    subMenuWrapper.find('.kd-menu-submenu').at(0).simulate('click')
    subMenuWrapper.find('.kd-menu-submenu').at(0).simulate('mouseenter')
    subMenuWrapper.find('.kd-menu-submenu').at(0).simulate('mouseleave')

    props.mode = 'vertical'
    props.triggerSubMenuAction = 'click'
    props.collapsed = true
    subMenuWrapper.update()

    props.mode = 'inline'
    props.triggerSubMenuAction = 'click'
    props.collapsed = false
    subMenuWrapper.update()

    MenuModes.forEach((mode) => {
      const testMenu = mount(
        <Menu mode={mode} {...props}>
          <Menu.SubMenu title="sub1">
            <Menu.Item>1111</Menu.Item>
            <Menu.Item>{1111}</Menu.Item>
          </Menu.SubMenu>
        </Menu>,
      )
      testMenu.find('.kd-menu-submenu').simulate('click')
    })
  })

  it('other status', () => {
    const props = {
      collapsed: true,
    }

    const wrapperItem = mount(
      <Menu {...props}>
        <Menu.Item disabled>1111</Menu.Item>
        <Menu.SubMenu title="sub1">
          <Menu.Item>1111</Menu.Item>
          <Menu.Item>{1111}</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item icon={<Icon type="add" />}>1111</Menu.Item>
      </Menu>,
    )
    wrapperItem.find('.kd-menu-item').at(0).simulate('click')
    wrapperItem.find('.kd-menu-item').at(0).simulate('mouseenter')
    wrapperItem.find('.kd-menu-item').at(0).simulate('mouseleave')

    // const wrapperItem = mount(
    //   <Menu {...props} triggerSubMenuAction="click">
    //     <Menu.SubMenu title="sub1" icon={<Icon type="add" />}>
    //       <Menu.Item>1111</Menu.Item>
    //       <Menu.SubMenu title="sub2">
    //         <Menu.Item>1111</Menu.Item>
    //       </Menu.SubMenu>
    //     </Menu.SubMenu>
    //   </Menu>,
    // )
  })

  it('util test', () => {
    expect(isString('222')).toBe(true)
    expect(isString(222)).toBe(false)

    expect(isNumber('222')).toBe(false)
    expect(isNumber(222)).toBe(true)

    expect(getColumnWidthList(<div />)).toEqual([160])
    expect(getColumnWidthList(<></>)).toEqual([160])

    expect(getWrapWidth(<div />)).toBe(210)

    expect(getItemWidth(<div />)).toBe(160)
  })
})
