import React from 'react'
import { mount } from 'enzyme'
import Dropdown from '../index'
import { Placements, Triggers } from '../../_utils/usePopper'
import { Menu, Item } from '../menu'
import mountTest from '../../../tests/shared/mountTest'

const menu = (
  <Menu>
    <Item key="1">
      <a target="_blank" rel="noopener noreferrer" href="https://www.kingdee.com/">
        菜单1
      </a>
    </Item>
    <Item key="2">
      <a target="_blank" rel="noopener noreferrer" href="https://www.kdcloud.com/">
        菜单2
      </a>
    </Item>
    <Item key="3">
      <a target="_blank" rel="noopener noreferrer" href="https://www.yunzhijia.com/">
        菜单3
      </a>
    </Item>
    <Item danger key="4">
      a danger item
    </Item>
  </Menu>
)

const wrapperRef = React.createRef() as any

describe('Dropdown', () => {
  Placements.forEach((placement) => {
    mountTest(() => (
      <Dropdown menu={menu} placement={placement}>
        <span />
      </Dropdown>
    ))
  })

  it('renders correctly', () => {
    const wrapper = mount(
      <Dropdown menu={menu}>
        <span />
      </Dropdown>,
    )
    expect(wrapper).toMatchSnapshot()

    Placements.forEach((placement) => {
      expect(
        mount(
          <Dropdown menu={menu} placement={placement}>
            <span />
          </Dropdown>,
        ),
      ).toMatchSnapshot()
    })

    Triggers.forEach((trigger) => {
      expect(
        mount(
          <Dropdown menu={menu} trigger={[trigger]}>
            <span />
          </Dropdown>,
        ),
      ).toMatchSnapshot()
    })
  })

  it('menu is Array', () => {
    const wrapper = mount(
      <Dropdown menu={[]}>
        <button type="button">button</button>
      </Dropdown>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should have displayName static property', () => {
    const wrapper = mount(
      <Dropdown menu={menu}>
        <span />
      </Dropdown>,
    )
    expect((wrapper.type() as any).displayName).toBe('Dropdown')
  })

  it('should not visible when dropdown is disabled', () => {
    const onVisibleChange = jest.fn()
    const wrapper = mount(
      <Dropdown menu={menu} onVisibleChange={onVisibleChange} disabled>
        <span />
      </Dropdown>,
    )
    wrapper.simulate('mouseenter')
    expect(onVisibleChange).not.toHaveBeenCalledWith()
  })

  it('should visible', () => {
    const onClick = jest.fn()
    const wrapper = mount(
      <Dropdown menu={menu} trigger="click">
        <span onClick={onClick} />
      </Dropdown>,
    )
    wrapper.find('.kd-dropdown-trigger').simulate('click')
    expect(onClick).toHaveBeenCalled()
  })

  it('should menu item onItemClick', () => {
    const onItemClick = jest.fn()

    const wrapper = mount(
      <div ref={wrapperRef}>
        <Dropdown
          visible
          menu={menu}
          trigger={'click'}
          onItemClick={onItemClick}
          getPopupContainer={() => wrapperRef.current}
        >
          <span />
        </Dropdown>
      </div>,
    )
    wrapper.find('.kd-dropdown-menu').find('.kd-dropdown-menu-item').at(0).simulate('click')
    expect(onItemClick).toHaveBeenCalled()
  })

  it('only one menuItem should trigger onItemClick', () => {
    const onItemClick = jest.fn()

    let menu = (
      <Dropdown.Menu>
        <Dropdown.Item key="1">
          <span>菜单1</span>
        </Dropdown.Item>
      </Dropdown.Menu>
    )
    const wrapper = mount(
      <div ref={wrapperRef}>
        <Dropdown
          visible
          menu={menu}
          trigger={'click'}
          onItemClick={onItemClick}
          getPopupContainer={() => wrapperRef.current}
        >
          <span />
        </Dropdown>
      </div>,
    )
    wrapper.find('.kd-dropdown-menu').find('.kd-dropdown-menu-item').at(0).simulate('click')
    expect(onItemClick).toHaveBeenCalled()
  })

  it('should menu has arrow', () => {
    const wrapper = mount(
      <div ref={wrapperRef}>
        <Dropdown arrow visible menu={menu} trigger={'click'} getPopupContainer={() => wrapperRef.current}>
          <span />
        </Dropdown>
      </div>,
    )
    expect(wrapper.find('.kd-dropdown')).toHaveClassName('arrow')
    expect(wrapper.find('.kd-dropdown')).toHaveStyle('--arrowSize', '4.25px')
  })

  it('should menu item disabled', () => {
    const onItemClick = jest.fn()
    const menu = (
      <Menu>
        <Item key="1" disabled>
          <span>菜单1</span>
        </Item>
      </Menu>
    )

    const wrapper = mount(
      <div ref={wrapperRef}>
        <Dropdown
          visible
          menu={menu}
          trigger={'click'}
          onItemClick={onItemClick}
          getPopupContainer={() => wrapperRef.current}
        >
          <span />
        </Dropdown>
      </div>,
    )
    wrapper.find('.kd-dropdown-menu').find('.kd-dropdown-menu-item').at(0).simulate('click')
    expect(onItemClick).not.toBeCalled()
  })

  it('should menu item danger and divided', () => {
    const menu = (
      <Menu>
        <Item danger>
          <a target="_blank" rel="noopener noreferrer" href="https://www.kingdee.com/">
            菜单1
          </a>
        </Item>
        <Item divided>
          <a target="_blank" rel="noopener noreferrer" href="https://www.kdcloud.com/">
            菜单2
          </a>
        </Item>
      </Menu>
    )

    const wrapper = mount(
      <div ref={wrapperRef}>
        <Dropdown visible menu={menu} trigger={'click'} getPopupContainer={() => wrapperRef.current}>
          <span />
        </Dropdown>
      </div>,
    )
    expect(wrapper.find('.kd-dropdown-menu').find('.kd-dropdown-menu-item').at(0)).toHaveClassName('danger')
    expect(wrapper.find('.kd-dropdown-menu').find('.kd-dropdown-menu-item').at(1)).toHaveClassName('divided')
  })
  it('should extend menu class ', () => {
    const menu1 = (
      <Menu className="myClass1">
        <Item danger>
          <a target="_blank" rel="noopener noreferrer" href="https://www.kingdee.com/">
            菜单1
          </a>
        </Item>
      </Menu>
    )

    const wrapper = mount(
      <div ref={wrapperRef}>
        <Dropdown visible menu={menu1} trigger={'click'} getPopupContainer={() => wrapperRef.current}>
          <span />
        </Dropdown>
      </div>,
    )
    expect(wrapper.find('.kd-dropdown-menu').at(0)).toHaveClassName('myClass1')

    const menu2 = (
      <Menu className="myClass2">
        <>
          <Item danger>
            <a target="_blank" rel="noopener noreferrer" href="https://www.kingdee.com/">
              菜单1
            </a>
          </Item>
          <Item danger>
            <a target="_blank" rel="noopener noreferrer" href="https://www.kingdee.com/">
              菜单2
            </a>
          </Item>
        </>
      </Menu>
    )

    const wrapper2 = mount(
      <div ref={wrapperRef}>
        <Dropdown visible menu={menu2} trigger={'click'} getPopupContainer={() => wrapperRef.current}>
          <span />
        </Dropdown>
      </div>,
    )
    expect(wrapper2.find('.kd-dropdown-menu').at(0)).toHaveClassName('myClass2')
  })
  it('should menu item can select able', () => {
    const wrapper = mount(
      <div ref={wrapperRef}>
        <Dropdown arrow visible menu={menu} trigger={'click'} getPopupContainer={() => wrapperRef.current} selectable>
          <span />
        </Dropdown>
      </div>,
    )
    wrapper.find('.kd-dropdown-menu').find('.kd-dropdown-menu-item').at(0).simulate('click')
    expect(wrapper.find('.kd-dropdown-menu').find('.kd-dropdown-menu-item').at(0)).toHaveClassName('selected')
  })

  it('should props defaultKey can select key', () => {
    const wrapper = mount(
      <div ref={wrapperRef}>
        <Dropdown arrow visible menu={menu} getPopupContainer={() => wrapperRef.current} selectable defaultKey="2">
          <span />
        </Dropdown>
      </div>,
    )
    expect(wrapper.find('.kd-dropdown-menu').find('.kd-dropdown-menu-item').at(1)).toHaveClassName('selected')
  })

  it('should props selectedKey can select key', () => {
    const wrapper = mount(
      <div ref={wrapperRef}>
        <Dropdown arrow visible menu={menu} getPopupContainer={() => wrapperRef.current} selectable selectedKey="2">
          <span />
        </Dropdown>
      </div>,
    )
    expect(wrapper.find('.kd-dropdown-menu').find('.kd-dropdown-menu-item').at(1)).toHaveClassName('selected')
  })

  it('should select selectedKey when both selectedKey and defaultKey exist', () => {
    const wrapper = mount(
      <div ref={wrapperRef}>
        <Dropdown
          arrow
          visible
          menu={menu}
          getPopupContainer={() => wrapperRef.current}
          selectable
          selectedKey="2"
          defaultKey="1"
        >
          <span />
        </Dropdown>
      </div>,
    )
    expect(wrapper.find('.kd-dropdown-menu').find('.kd-dropdown-menu-item').at(1)).toHaveClassName('selected')
  })

  it('should onItemClick change selectKey when click the dropdown MenuItem', () => {
    const onItemClick = jest.fn((...rest) => {
      rest.map((item) => {
        expect(item).toEqual('2')
      })
    })
    const wrapper = mount(
      <div ref={wrapperRef}>
        <Dropdown
          arrow
          visible
          menu={menu}
          getPopupContainer={() => wrapperRef.current}
          selectable
          onItemClick={onItemClick}
        >
          <span />
        </Dropdown>
      </div>,
    )
    wrapper.find('.kd-dropdown-menu').find('.kd-dropdown-menu-item').at(1).simulate('click')
  })
  it('should onClick change selectKey when click the dropdown MenuItem', () => {
    const onClick = jest.fn((...rest) => {
      rest.map((item) => {
        expect(item).toEqual('1')
      })
    })
    const clickMenu = (
      <Menu onClick={onClick}>
        <Item key="1">
          <a target="_blank" rel="noopener noreferrer" href="https://www.kingdee.com/">
            菜单1
          </a>
        </Item>
      </Menu>
    )
    const wrapper = mount(
      <div ref={wrapperRef}>
        <Dropdown arrow visible menu={clickMenu} getPopupContainer={() => wrapperRef.current} selectable>
          <span />
        </Dropdown>
      </div>,
    )
    wrapper.find('.kd-dropdown-menu').find('.kd-dropdown-menu-item').at(0).simulate('click')
  })
})
