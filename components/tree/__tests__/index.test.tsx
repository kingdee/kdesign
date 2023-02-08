import React from 'react'
import { mount, render } from 'enzyme'
import Tree from '../index'
import mountTest from '../../../tests/shared/mountTest'
import { createDragEventTarget as createEventData } from '../../../tests/shared/simulateEvent'

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
// TODO: 递归type
// const countTreeDataNode = (treeData: Array<any>): number => treeData.reduce((res, node) => {
//   let ret = res + 1
//   return ret + countTreeDataNode(node.children)
// }, 0)
// how to use useVisibleDataMemo
// visibleDataCount
// const treeNodeCount = countTreeDataNode(treeData)
// const dataFactory = (leafLength = 1000, level = 0, maxLevel = 2, preKey = '0') => {
//   const treeData = []

//   for (let i = 0; i < leafLength; i++) {
//     const key = preKey ? `${preKey}-${i}` : `${i}`
//     let _level = level
//     const children: any = []
//     const node = { title: key, key, children }
//     if (_level <= maxLevel) {
//       _level++
//       node.children = dataFactory(Math.floor(Math.random() * 2 + 1), _level, maxLevel, key)
//     }
//     treeData.push(node)
//   }
//   return treeData
// }

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
}
const expandIconNum = 5
// const allNodeNum = 13
// const bigTreeData = dataFactory(200, 0, 2)
describe('Tree', () => {
  mountTest(() => <Tree {...defaultTreeProps} />)

  it('renders correctly', () => {
    const wrapper = render(<Tree {...defaultTreeProps}></Tree>)
    expect(wrapper).toMatchSnapshot()
  })

  it('should have displayName static property', () => {
    const wrapper = mount(<Tree {...defaultTreeProps}></Tree>)
    expect((wrapper.type() as any).displayName).toBe('Tree')
  })
  it('should expand all nodes , when defaultExpandAll property is true', () => {
    const wrapper = mount(<Tree {...defaultTreeProps}></Tree>)
    wrapper.setProps({ defaultExpandAll: true })
    wrapper.update()
    expect(wrapper.find('.kd-tree-node-animation-expand').length).toBe(expandIconNum)
  })
  it('should expand all nodes , when defaultExpandAll property is true, and treeData change', () => {
    const wrapper = mount(<Tree {...defaultTreeProps} defaultExpandAll={true} treeData={[]}></Tree>)
    wrapper.setProps({ treeData: treeData })
    wrapper.update()
    expect(wrapper.find('.kd-tree-node-animation-expand').length).toBe(expandIconNum)
  })
  it('should expand root node , when defaultExpandRoot property is true', () => {
    const wrapper = mount(<Tree {...defaultTreeProps}></Tree>)
    const expandedKeys = { expandedKeys: ['1'] }
    // const props = {expandedKeys: expandedKeys, defaultExpandRoot:true}
    wrapper.setProps({ expandedKeys: expandedKeys.expandedKeys, defaultExpandRoot: true })
    wrapper.update()
    expect(wrapper.find('.kd-tree-node-animation-expand').length).toBe(expandedKeys.expandedKeys.length)
  })

  it('tree expanded by expandedKeys', () => {
    const wrapper = mount(<Tree {...defaultTreeProps}></Tree>)
    const expandedKeys = { expandedKeys: ['0', '1'] }
    wrapper.setProps(expandedKeys)
    wrapper.update()
    expect(wrapper.find('.kd-tree-node-animation-expand').length).toBe(expandedKeys.expandedKeys.length)
  })

  it('tree expanded by defaultExpandedKeys', () => {
    const wrapper = mount(<Tree {...defaultTreeProps}></Tree>)
    const defaultExpandedKeys = { defaultExpandedKeys: ['0', '1'] }
    wrapper.setProps(defaultExpandedKeys)
    wrapper.update()
    expect(wrapper.find('.kd-tree-node-animation-expand').length).toBe(defaultExpandedKeys.defaultExpandedKeys.length)
  })

  it('tree expanded while defaultExpandParent is true', () => {
    const wrapper = mount(<Tree {...defaultTreeProps}></Tree>)
    const expandedKeys = { expandedKeys: ['0', '1'], defaultExpandParent: true }
    wrapper.setProps(expandedKeys)
    wrapper.update()
    expect(wrapper.find('.kd-tree-node-animation-expand').length).toBe(expandedKeys.expandedKeys.length)
  })

  it('tree checkabled, should change childnodes and father nodes checked status synchronously', () => {
    const wrapper = mount(<Tree {...defaultTreeProps} defaultExpandAll checkedKeys={['1-1']}></Tree>)
    expect(wrapper.find('.kd-checkbox-default-checked').length).toBe(5)
    expect(wrapper.find('.kd-checkbox-default-indeterminate').length).toBe(1)
  })

  it('tree onCheck event', () => {
    const wrapper = mount(<Tree {...defaultTreeProps} defaultExpandAll></Tree>)
    const props = {
      checkable: true,
      checkedKeys: ['1-1'],
    }
    wrapper.setProps(props)
    wrapper.update()
    expect(wrapper.find('.kd-checkbox-default-checked').length).toBe(5)
    expect(wrapper.find('.kd-checkbox-default-indeterminate').length).toBe(1)
    wrapper.find('.kd-checkbox').at(1).simulate('click')
  })

  it('tree onExpand event', () => {
    const wrapper = mount(<Tree {...defaultTreeProps}></Tree>)
    const props = {
      checkable: true,
      checkedKeys: ['1-1'],
      expandedKeys: ['0', '1'],
    }
    wrapper.setProps(props)
    wrapper.update()
    wrapper.find('.kd-tree-node-animation-expand').at(0).simulate('click')
    expect(wrapper.find('.kd-tree-node-animation-expand').length).toBe(props.expandedKeys.length - 1)
  })

  it('tree checkabled checkStrictly', () => {
    const wrapper = mount(<Tree {...defaultTreeProps}></Tree>)
    const props = {
      defaultExpandAll: true,
      checkStrictly: true,
      checkedKeys: ['1-1'],
    }
    wrapper.setProps(props)
    wrapper.update()
    expect(wrapper.find('.kd-checkbox-default-checked').length).toBe(1)
    expect(wrapper.find('.kd-checkbox-default-indeterminate').length).toBe(0)
  })

  it('when tree is disabled, checkbox title and event should be disabled, but can still expand', () => {
    const expandedKeys = ['0', '1']
    const wrapper = mount(
      <Tree {...defaultTreeProps} disabled checkedKeys={['1-1']} expandedKeys={expandedKeys}></Tree>,
    )
    expect(wrapper.find('.kd-checkbox-default-checked-disabled').length).toBe(1)
    expect(wrapper.find('.kd-tree-node-title-disabled').length).toBeGreaterThan(1)
    wrapper.find('.kd-tree-node-animation-expand').at(0).simulate('click')
    expect(wrapper.find('.kd-tree-node-animation-expand').length).toBe(expandedKeys.length - 1)
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
    // expect(defaultTreeProps.onDrop).toHaveBeenCalled()
  })
  it('test setTreeNodeClassName', () => {
    const setTreeNodeClassName = jest.fn(({ key, title }) => {
      return `tree-node-${key}-${title}`
    })
    const wrapper = mount(<Tree {...defaultTreeProps} setTreeNodeClassName={setTreeNodeClassName}></Tree>)
    // expect(setTreeNodeClassName).toHaveBeenCalledTimes(treeNodeCount)
    expect(setTreeNodeClassName).toHaveBeenCalled()
    expect(wrapper.find('.tree-node-0-0')).toExist()
  })
  it('test setTreeNodeStyle', () => {
    const setTreeNodeStyle = jest.fn()
    const wrapper = mount(<Tree {...defaultTreeProps} setTreeNodeStyle={setTreeNodeStyle}></Tree>)
    // expect(setTreeNodeStyle).toHaveBeenCalledTimes(treeNodeCount)
    expect(setTreeNodeStyle).toHaveBeenCalled()
    wrapper.unmount()
  })
})
