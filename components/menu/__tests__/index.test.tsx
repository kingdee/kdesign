import React from 'react'
import { mount, render } from 'enzyme'
import Menu, { MenuProps } from '../index'
import Icon from '../../icon'
import mountTest from '../../../tests/shared/mountTest'

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

  // 3. render no child without errors
  it('render no child without errors', () => {
    expect(mount(<Menu></Menu>)).toMatchSnapshot()
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
      triggerSubMenuAction: 'hover',
      inlineIndent: 24,
      forceSubMenuRender: true,
    }

    const subMenuWrapper = mount(
      <Menu {...props}>
        <Menu.Item key="1">标签一</Menu.Item>
        <Menu.SubMenu title="标签二" key="sub1">
          <Menu.Item key="2">标签二-1</Menu.Item>
          <Menu.Item key="3">标签二-2</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu title="标签三" key="sub2">
          <Menu.Item key="4">标签三-1</Menu.Item>
          <Menu.Item key="5">标签三-2</Menu.Item>
        </Menu.SubMenu>
      </Menu>,
    )
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
  // api test
  it('api test', () => {
    const props = {
      openKeys: ['sub1'],
      selectedKey: '2',
      mode: 'inline',
    } as MenuProps
    const onOpenChangeMock = jest.fn((data) => {
      props.openKeys = data
    })
    const menuWrapper = mount(
      <Menu {...props} onOpenChange={onOpenChangeMock}>
        <Menu.Item key="1">标签一</Menu.Item>
        <Menu.SubMenu title="标签二" key="sub1">
          <Menu.Item key="2">标签二-1</Menu.Item>
          <Menu.Item key="3">标签二-2</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu title="标签三" key="sub2">
          <Menu.Item key="4">标签三-1</Menu.Item>
          <Menu.Item key="5">标签三-2</Menu.Item>
        </Menu.SubMenu>
      </Menu>,
    )
    // openKeys
    expect(menuWrapper.find('.kd-menu-submenu').at(0)).toHaveClassName('kd-menu-submenu-active')

    // selectedKey
    menuWrapper.setProps({ selectedKey: '1' })
    menuWrapper.update()
    expect(menuWrapper.find('.kd-menu-item').at(0)).toHaveClassName('kd-menu-item-active')

    // theme
    expect(menuWrapper.find('.kd-menu')).toHaveClassName('kd-menu-dark')
    menuWrapper.setProps({ theme: 'light' })
    expect(menuWrapper.find('.kd-menu')).toHaveClassName('kd-menu-light')

    // accordion
    menuWrapper.setProps({ accordion: true })
    menuWrapper.update()
    menuWrapper.find('.kd-menu-submenu').at(1).simulate('click')
    // 根据子标签的height为0来判断subMenu是否折叠起来了
    expect((menuWrapper.find('.kd-menu-submenu').at(0).getDOMNode().lastElementChild as HTMLElement).style.height).toBe(
      '0px',
    )
    expect(onOpenChangeMock).toHaveBeenCalled()

    // inlineIndent
    expect((menuWrapper.find('.kd-menu-item-title').at(0).getDOMNode() as HTMLElement).style.paddingLeft).toBe('50px')
    menuWrapper.setProps({ inlineIndent: 24 })
    menuWrapper.update()
    expect((menuWrapper.find('.kd-menu-item-title').at(0).getDOMNode() as HTMLElement).style.paddingLeft).toBe('24px')

    // collapsed
    menuWrapper.setProps({ collapsed: true })
    menuWrapper.update()
    expect(menuWrapper.find('.kd-menu')).toHaveClassName('kd-menu-collapsed')
  })

  describe('other api', () => {
    it('defaultOpenKeys', function () {
      const menuWrapper = mount(
        <Menu defaultOpenKeys={['sub1']}>
          <Menu.Item key="1">标签一</Menu.Item>
          <Menu.SubMenu title="标签二" key="sub1">
            <Menu.Item key="2">标签二-1</Menu.Item>
            <Menu.Item key="3">标签二-2</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu title="标签三" key="sub2">
            <Menu.Item key="4">标签三-1</Menu.Item>
            <Menu.Item key="5">标签三-2</Menu.Item>
          </Menu.SubMenu>
        </Menu>,
      )

      expect(menuWrapper.find('.kd-menu-submenu').at(0)).toHaveClassName('kd-menu-submenu-hover')
    })
  })
})
