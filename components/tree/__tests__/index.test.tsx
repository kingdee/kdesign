import React from 'react'
import { mount, render } from 'enzyme'
import Tree from '../index'
import mountTest from '../../../tests/shared/mountTest'
import { createDragEventTarget as createEventData } from '../../../tests/shared/simulateEvent'
import ConfigProvider from '../../config-provider/index'

const treeData = [
  {
    key: '0',
    title: '0',
    children: [
      {
        key: '0-0',
        title: '0-0',
        children: [],
      },
      {
        key: '0-1',
        title: '0-1',
        children: [],
      },
    ],
  },
  {
    key: '1',
    title: '1',
    children: [
      {
        key: '1-0',
        title: '1-0',
        children: [],
      },
      {
        key: '1-1',
        title: '1-1',
        children: [
          {
            key: '1-1-0',
            title: '1-1-0',
            children: [
              {
                key: '1-1-0-0',
                title: '1-1-0-0',
                children: [],
              },
            ],
          },
          {
            key: '1-1-1',
            title: '1-1-1',
            children: [
              {
                key: '1-1-1-0',
                title: '1-1-1-0',
                children: [],
              },
            ],
          },
        ],
      },
      {
        key: '1-2',
        title: '1-2',
        children: [],
      },
    ],
  },
  {
    key: '2',
    title: '2',
    children: [],
  },
  {
    key: '3',
    title: '3',
    children: [],
  },
]

const defaultTreeProps = {
  virtual: false,
  checkable: true,
  treeData: treeData,
  onDrop: jest.fn(),
  onDragStart: jest.fn(),
  onDragOver: jest.fn(),
  onDragLeave: jest.fn(),
  onDragEnter: jest.fn(),
  onDragEnd: jest.fn(),
  onCheck: jest.fn(),
  onExpand: jest.fn(),
  onSelect: jest.fn(),
}
describe('Tree', () => {
  // 1. mount test
  mountTest(() => <Tree {...defaultTreeProps} />)

  // 2. render test
  it('renders correctly', () => {
    expect(render(<Tree checkable={false} />)).toMatchSnapshot()
    expect(render(<Tree checkable={true} />)).toMatchSnapshot()
    expect(render(<Tree {...defaultTreeProps}></Tree>)).toMatchSnapshot()
  })

  // 5. displayName
  it('should have displayName static property', () => {
    const wrapper = mount(<Tree {...defaultTreeProps}></Tree>)
    expect((wrapper.type() as any).displayName).toBe('Tree')
  })

  // 6. class state
  it('className style disabled', () => {
    const wrapper = mount(<Tree className="my-test" style={{ color: 'red' }} data-test="test" />)
    expect(wrapper.find('.kd-tree')).toHaveClassName('.my-test')
    expect(wrapper.find('.kd-tree')).toHaveStyle('color', 'red')
    expect(wrapper.prop('data-test')).toEqual('test')
  })

  // 7.component interaction(event)
  it('tree checkabled, should change childnodes and father nodes checked status synchronously', () => {
    const wrapper = mount(<Tree {...defaultTreeProps} defaultExpandAll checkedKeys={['1-1']}></Tree>)
    expect(wrapper.find('.kd-checkbox-default-checked').length).toBe(5)
    expect(wrapper.find('.kd-checkbox-default-indeterminate').length).toBe(1)
  })

  it('test drag events', () => {
    const expandedKeys = ['0', '1']
    const wrapper = mount(
      <Tree {...defaultTreeProps} disabled checkedKeys={['1-1']} expandedKeys={expandedKeys} draggable></Tree>,
    )
    const nodeWrapper = wrapper.find('.kd-tree-node-draggabled').at(0)
    const dom = wrapper.find('.kd-tree-node-draggabled').at(0).getDOMNode() as any
    nodeWrapper.simulate('drop', createEventData(dom))
    nodeWrapper.simulate('dragStart', createEventData(dom))
    nodeWrapper.simulate('dragOver', createEventData(dom))
    nodeWrapper.simulate('dragLeave', createEventData(dom))
    nodeWrapper.simulate('dragEnter', createEventData(dom))
    nodeWrapper.simulate('dragEnd', createEventData(dom))
    expect(defaultTreeProps.onDragStart).toHaveBeenCalled()
    expect(defaultTreeProps.onDragOver).toHaveBeenCalled()
    expect(defaultTreeProps.onDragLeave).toHaveBeenCalled()
    expect(defaultTreeProps.onDragEnter).toHaveBeenCalled()
    expect(defaultTreeProps.onDragEnd).toHaveBeenCalled()
  })

  // 8.config provider
  it('should config use config provider', () => {
    const demoConfig = {
      compDefaultProps: {
        Tree: {
          estimatedItemSize: 40,
        },
      },
    }
    const wrapper = mount(
      <ConfigProvider value={demoConfig}>
        <Tree {...defaultTreeProps} />
      </ConfigProvider>,
    )
    expect(wrapper.find('.kd-tree-node-item').at(0)).toHaveStyle('height', '40px')
  })

  // 9. ref test
  describe('9. ref test', () => {
    it('should get Demo element from ref', () => {
      const ref = React.createRef()
      mount(<Tree ref={ref} />)
      expect((ref.current as HTMLElement).classList.contains('kd-tree')).toBe(true)
    })
  })

  // 10. api
  it('api test', () => {
    const wrapper = mount(<Tree {...defaultTreeProps} />)

    // checkable checkedKeys defaultExpandAll
    wrapper.setProps({
      checkable: true,
      checkedKeys: ['0-0'],
      defaultExpandAll: true,
    })
    wrapper.update()
    expect(wrapper.find('.kd-checkbox').length).toBe(13)
    expect(wrapper.find('.kd-checkbox-default-checked').length).toBe(1)
    expect(wrapper.find('.kd-checkbox-default-indeterminate').length).toBe(1)

    // checkStrictly
    wrapper.setProps({ checkStrictly: true })
    wrapper.update()
    expect(wrapper.find('.kd-checkbox-default-indeterminate').length).toBe(0)

    // defaultExpandedKeys
    wrapper.setProps({ defaultExpandAll: false, defaultExpandedKeys: ['0'] })
    wrapper.update()
    expect(wrapper.find('.kd-tree-node-opened').length).toBe(1)
    expect(wrapper.find('.kd-tree-node-item-0').hasClass('kd-tree-node-opened')).toBe(true)

    // expandedKeys defaultExpandParent
    wrapper.setProps({ expandedKeys: ['1-1'] })
    wrapper.update()
    expect(wrapper.find('.kd-tree-node-item-1-1').length).toBe(0)

    wrapper.setProps({ defaultExpandParent: true })
    wrapper.update()
    expect(wrapper.find('.kd-tree-node-item-1-1').hasClass('kd-tree-node-opened')).toBe(true)

    // estimatedItemSize
    wrapper.setProps({ estimatedItemSize: 50 })
    expect(wrapper.find('.kd-tree-node-item').at(0)).toHaveStyle('height', '50px')

    // icon showIcon
    wrapper.setProps({ icon: 'kd' })
    expect(wrapper.find('.kd-tree-node-leaf-icon').length).toBe(0)

    wrapper.setProps({ showIcon: true })
    expect(wrapper.find('.kd-tree-node-leaf-icon').at(0)).toHaveText('kd')

    // setTreeNodeClassName
    const setTreeNodeClassName = jest.fn(({ key, title }) => {
      return `tree-node-${key}-${title}`
    })
    wrapper.setProps({ setTreeNodeClassName })
    expect(setTreeNodeClassName).toHaveBeenCalled()
    expect(wrapper.find('.tree-node-0-0')).toExist()

    // setTreeNodeStyle
    const setTreeNodeStyle = jest.fn(() => ({ background: 'red' }))
    wrapper.setProps({ setTreeNodeStyle })
    expect(setTreeNodeStyle).toHaveBeenCalled()
    expect(wrapper.find('.kd-tree-node-item').at(0)).toHaveStyle({ background: 'red' })

    // onCheck
    wrapper.find('.kd-checkbox-input').at(0).simulate('change')
    expect(defaultTreeProps.onCheck).toHaveBeenCalled()

    // disabled
    const expandedKeys = ['0', '1']
    const disabledWrapper = mount(
      <Tree {...defaultTreeProps} disabled checkedKeys={['1-1']} expandedKeys={expandedKeys}></Tree>,
    )
    expect(disabledWrapper.find('.kd-tree-node-disabled').length).toBeGreaterThan(1)
    disabledWrapper.find('.kd-tree-node-item-0').at(0).simulate('click')
    expect(defaultTreeProps.onExpand).toHaveBeenCalled()
    expect(defaultTreeProps.onSelect).not.toBeCalled()

    // defaultSelectedKeys selectedKeys
    const defWrapper = mount(<Tree {...defaultTreeProps} defaultSelectedKeys={['0']} checkable={false} />)
    expect(defWrapper.find('.kd-tree-node-item-0').hasClass('kd-tree-node-selected')).toBe(true)

    defWrapper.setProps({ selectedKeys: ['1'] })
    defWrapper.update()
    expect(defWrapper.find('.kd-tree-node-item-1').hasClass('kd-tree-node-selected')).toBe(true)

    defWrapper.setProps({ checkable: true })

    // expandOnClickNode onSelect onExpand
    expect(defWrapper.find('.kd-tree-node-item-0-0').length).toBe(0)
    defWrapper.find('.kd-tree-node-item-0').at(0).simulate('click')
    defWrapper.update()
    expect(defaultTreeProps.onSelect).toHaveBeenCalled()
    expect(defaultTreeProps.onExpand).toHaveBeenCalled()

    defWrapper.setProps({ expandOnClickNode: false })
    defWrapper.find('.kd-tree-node-item-0').find('.kd-tree-node-icon').at(0).simulate('click')
    expect(defWrapper.find('.kd-tree-node-item-0-0').length).toBe(0)
    expect(defaultTreeProps.onSelect).toHaveBeenCalled()

    defWrapper.find('.kd-tree-node-item-0').find('.kd-tree-node-icon').simulate('click')
    defWrapper.update()
    expect(defaultTreeProps.onExpand).toHaveBeenCalled()
    expect(defWrapper.find('.kd-tree-node-item-0-0').length).toBe(1)

    // filterTreeNode filterValue
    const filterTreeNode = (node: any) => {
      if (node.title.includes('1-1-1-0')) {
        return true
      }
      return false
    }
    const searchWrapper = mount(<Tree {...defaultTreeProps} />)
    expect(searchWrapper.find('.kd-tree-node-item-1-1-1-0').length).toBe(0)

    searchWrapper.setProps({ filterTreeNode, filterValue: '1-1-1-0' })
    searchWrapper.update()
    expect(searchWrapper.find('.kd-tree-node-item-1-1-1-0').length).toBe(1)

    // treeNode api
    const data = [
      {
        key: '0',
        title: '0',
        checkable: true,
        disabled: true,
        icon: 'kd',
        showIcon: true,
        selectable: true,
      },
    ]

    const nodeWrapper = mount(<Tree {...defaultTreeProps} treeData={data} />)
    expect(nodeWrapper.find('.kd-tree-node-item-0').hasClass('kd-tree-node-disabled')).toBe(true)
    expect(wrapper.find('.kd-tree-node-leaf-icon').at(0)).toHaveText('kd')
    expect(nodeWrapper.find('.kd-tree-node-item-0').find('.kd-checkbox').length).toBe(1)
    expect(defaultTreeProps.onSelect).toHaveBeenCalled()

    data[0].checkable = false
    data[0].selectable = false
    nodeWrapper.setProps({ treeData: [...data] })
    nodeWrapper.update()
    expect(nodeWrapper.find('.kd-tree-node-item-0').find('.kd-checkbox').length).toBe(0)
    expect(defaultTreeProps.onSelect).not.toHaveBeenCalledWith()
  })
})
