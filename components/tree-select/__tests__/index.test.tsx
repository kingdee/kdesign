import React from 'react'
import { render, mount } from 'enzyme'
import ConfigProvider from '../../config-provider/index'
import TreeSelect from '../index'
import { BorderTypes, SelectSizes, Modes } from '../interface'
import mountTest from '../../../tests/shared/mountTest'

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

const defaultTreeSelectProps = {
  treeData: treeData,
  defaultOpen: true,
  onFocus: jest.fn(),
  onBlur: jest.fn(),
  onChange: jest.fn(),
  onClear: jest.fn(),
  onSearch: jest.fn(),
  onSelect: jest.fn(),
  onTreeExpand: jest.fn(),
}

describe('TreeSelect', () => {
  // 1. mount test
  describe('1. mount test', () => {
    mountTest(() => <TreeSelect />)
  })

  // 2. render test
  describe('2. render test', () => {
    it('renders correctly', () => {
      expect(render(<TreeSelect />)).toMatchSnapshot()

      BorderTypes.forEach((type) => {
        expect(render(<TreeSelect borderType={type} />)).toMatchSnapshot()
      })

      SelectSizes.forEach((type) => {
        expect(render(<TreeSelect size={type} />)).toMatchSnapshot()
      })

      Modes.forEach((type) => {
        expect(render(<TreeSelect mode={type} />)).toMatchSnapshot()
      })
    })
  })

  // 5. displayName
  describe('5. displayName', () => {
    it('should have displayName static property', () => {
      const TestTreeSelect = mount(<TreeSelect />)
      expect((TestTreeSelect.type() as any).displayName).toBe('TreeSelect')
    })
  })

  // 6. class state
  describe('6. class state', () => {
    it('should borderType class use right', () => {
      BorderTypes.forEach((type) => {
        const TestTreeSelect = mount(<TreeSelect borderType={type} />)
        expect(TestTreeSelect.find(`.kd-tree-select-wrapper`)).toHaveClassName(
          `.kd-tree-select-${type === 'none' ? 'borderless' : type}`,
        )
      })
    })

    it('should size class use right', () => {
      SelectSizes.forEach((type) => {
        const TestTreeSelect = mount(<TreeSelect size={type} />)
        expect(TestTreeSelect.find(`.kd-tree-select-wrapper`)).toHaveClassName(`.kd-tree-select-size-${type}`)
      })
    })

    it('should mode and disabled class use right', () => {
      Modes.forEach((type) => {
        const TestTreeSelect = mount(<TreeSelect mode={type} disabled />)
        expect(TestTreeSelect.find(`.kd-tree-select-wrapper`)).toHaveClassName(`.kd-tree-select-${type}`)
        expect(TestTreeSelect.find(`.kd-tree-select-wrapper`)).toHaveClassName(`.kd-tree-select-${type}-disabled`)
      })
    })

    it('should className style use right', () => {
      const TestTreeSelect = mount(<TreeSelect className="kd-test" style={{ color: 'red' }} />)
      expect(TestTreeSelect.find('.kd-tree-select')).toHaveClassName('.kd-test')
      expect(TestTreeSelect.find('.kd-tree-select')).toHaveStyle('color', 'red')
    })

    it('should dropdownClassName use right', () => {
      const TestTreeSelect = mount(<TreeSelect dropdownClassName="kd-dropdown-test" defaultOpen />)
      expect(TestTreeSelect.find('.kd-tree-select-dropdown')).toHaveClassName('.kd-dropdown-test')
    })
  })

  // 7.component interaction(event)
  describe('7.component interaction(event)', () => {
    it('test function called successfully', () => {
      let val = ''
      const onChange = jest.fn((key) => {
        val = key
      })
      const TestTreeSelect = mount(
        <TreeSelect {...defaultTreeSelectProps} onChange={onChange} allowClear treeData={treeData} />,
      )
      TestTreeSelect.find('input').simulate('focus')
      expect(defaultTreeSelectProps.onFocus).toHaveBeenCalled()

      TestTreeSelect.find('input').simulate('blur')
      expect(defaultTreeSelectProps.onBlur).toHaveBeenCalled()

      TestTreeSelect.find('input').simulate('change', { target: { value: '12' } })
      expect(defaultTreeSelectProps.onSearch).toHaveBeenCalled()

      TestTreeSelect.find('.kd-tree-node-item-0').find('.kd-tree-node-icon').simulate('click')
      expect(defaultTreeSelectProps.onTreeExpand).toHaveBeenCalled()

      TestTreeSelect.find('.kd-tree-node-item-0-0').at(0).simulate('click')
      expect(defaultTreeSelectProps.onSelect).toHaveBeenCalled()
      expect(val).toBe('0-0')

      TestTreeSelect.find('.kd-tree-select-icon-clear').simulate('click')
      expect(defaultTreeSelectProps.onClear).toHaveBeenCalled()
    })
  })

  // 8.config provider
  describe('8.config provider', () => {
    it('should config use config provider', () => {
      const treeSelectConfig = {
        compDefaultProps: {
          TreeSelect: {
            size: 'small',
          },
        },
      }
      const TestTreeSelect = mount(
        <ConfigProvider value={treeSelectConfig}>
          <TreeSelect />
        </ConfigProvider>,
      )
      expect(TestTreeSelect.find(`.kd-tree-select-wrapper`)).toHaveClassName('.kd-tree-select-size-small')
    })
  })

  // 9. ref test
  describe('9. ref test', () => {
    it('should get TreeSelect element from ref', () => {
      const ref = React.createRef()
      mount(<TreeSelect ref={ref}></TreeSelect>)
      expect(ref.current instanceof HTMLElement).toBe(true)
    })
  })

  // 10. api test
  describe('10. api test', () => {
    it('autoFocus', () => {
      // eslint-disable-next-line jsx-a11y/no-autofocus
      const TestTreeSelect = mount(<TreeSelect autoFocus={true} />)
      expect(TestTreeSelect.find(`.kd-tree-select-wrapper`)).toHaveClassName('.kd-tree-select-single-focused')
    })

    it('display the correct react node', () => {
      const TestTreeSelect = mount(
        <TreeSelect
          {...defaultTreeSelectProps}
          treeData={treeData}
          allowClear
          clearIcon="clearIcon-test"
          value={'0'}
          placeholder="placeholder-test"
          dropdownRender={() => <span>dropdownRender-test</span>}
        />,
      )

      // clearIcon
      expect(TestTreeSelect.find('.kd-tree-select-icon-clear').text()).toBe('clearIcon-test')
      // dropdownRender
      expect(TestTreeSelect.find('.kd-tree-select-dropdown span').text()).toBe('dropdownRender-test')

      // suffixIcon
      TestTreeSelect.setProps({ suffixIcon: 'suffixIcon-test' })
      expect(TestTreeSelect.find('.kd-tree-select-icon-arrow')).toHaveText('suffixIcon-test')

      // showArrow
      expect(TestTreeSelect.find('.kd-tree-select-icon-arrow').length).toBe(1)
      TestTreeSelect.setProps({ showArrow: false })
      expect(TestTreeSelect.find('.kd-tree-select-icon-arrow').length).toBe(0)

      // showSearch
      expect(TestTreeSelect.find('input').props().readOnly).toBe(false)
      TestTreeSelect.setProps({ showSearch: false })
      expect(TestTreeSelect.find('input').props().readOnly).toBe(true)

      TestTreeSelect.setProps({ mode: 'multiple' })
      expect(TestTreeSelect.find('.kd-tree-select-selection-tag').length).toBe(1)

      // tagRender
      TestTreeSelect.setProps({ tagRender: () => <span className="tagRender-test"></span> })
      expect(TestTreeSelect.find('.tagRender-test').length).toBe(1)

      TestTreeSelect.setProps({
        value: ['2', '3'],
        maxTagCount: 1,
        maxTagPlaceholder: <span className="kd-maxTagPlaceholder">kd</span>,
      })
      TestTreeSelect.update()
      // maxTagCount
      expect(TestTreeSelect.find('.kd-tree-select-selection-tag').length).toBe(1)
      // maxTagPlaceholder
      expect(TestTreeSelect.find('.kd-maxTagPlaceholder').length).toBe(1)

      // notFoundContent
      TestTreeSelect.setProps({ treeData: [], notFoundContent: 'notFoundContent-test', dropdownRender: undefined })
      expect(TestTreeSelect.find('.kd-tree-select-dropdown').text()).toBe('notFoundContent-test')
    })

    it('getPopupContainer', () => {
      const wrapperRef = React.createRef() as any
      const popupContainer = mount(
        <div ref={wrapperRef}>
          <TreeSelect defaultOpen getPopupContainer={() => wrapperRef.current} />
        </div>,
      )
      expect(popupContainer.childAt(0).children().at(1).find('.kd-tree-select-dropdown').length).toBe(1)
    })

    it('should pass tree props to Tree component', () => {
      const TestTreeSelect = mount(
        <TreeSelect
          {...defaultTreeSelectProps}
          treeIcon="treeIcon"
          treeData={treeData}
          treeDefaultExpandAll
          treeDefaultExpandedKeys={[]}
          treeExpandedKeys={[]}
          treeCheckStrictly
          treeExpandOnClickNode
          treeLoadData={() => undefined}
          showTreeIcon
          filterTreeNode={() => true}
          virtual
        />,
      )
      const treeProps = [
        'treeData',
        'icon',
        'virtual',
        'defaultExpandAll',
        'defaultExpandedKeys',
        'checkStrictly',
        'expandedKeys',
        'icon',
        'showIcon',
        'switcherIcon',
      ]
      treeProps.forEach((prop) => {
        expect(TestTreeSelect.find('Tree').prop(prop)).toBeDefined()
      })
    })
  })
})
