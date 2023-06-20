import React from 'react'
import { render, mount } from 'enzyme'
import Transfer, { TransferItem, TransferRenderParam } from '../index'
import Operation from '../operation'
import ConfigProvider from '../../config-provider/index'
import Button from '../../button'
import ListItem from '../list-item'
import TransferSearch from '../search'
import TransferList from '../list'
import mountTest from '../../../tests/shared/mountTest'
import { act } from 'react-dom/test-utils'

const headerText = (wrapper: any, index = 0) => {
  const text = wrapper
    .find(TransferList)
    .at(index)
    .find('.kd-transfer-list-header-selected')
    .at(0)
    .first()
    .text()
    .trim()
  return text
}

const listEmptyProps = {
  dataSource: [],
}

const baseData = [
  {
    key: '0',
    title: 'content1',
    description: 'description of content1',
    disabled: true,
  },
  {
    key: '1',
    title: 'content2',
    description: 'description of content2',
  },
  {
    key: '2',
    title: 'content3',
    description: 'description of content3',
  },
  {
    key: '3',
    title: 'content4',
    description: 'description of content4',
  },
  {
    key: '4',
    title: 'content5',
    description: 'description of content5',
  },
  {
    key: '5',
    title: 'content6',
    description: 'description of content6',
  },
]

const listCommonProps = {
  dataSource: [
    {
      key: 'a',
      title: 'a',
    },
    {
      key: 'b',
      title: 'b',
    },
    {
      key: 'c',
      title: 'c',
      disabled: true,
    },
  ],
  selectedKeys: ['a'],
  targetKeys: ['b'],
}

const listDisabledProps = {
  dataSource: [
    {
      key: 'a',
      title: 'a',
      disabled: true,
    },
    {
      key: 'b',
      title: 'b',
    },
  ],
  selectedKeys: ['a', 'b'],
  targetKeys: [],
}

const searchTransferProps = {
  dataSource: [
    {
      key: '0',
      title: 'content1',
      description: 'description of content1',
    },
    {
      key: '1',
      title: 'content2',
      description: 'description of content2',
    },
    {
      key: '2',
      title: 'content3',
      description: 'description of content3',
    },
    {
      key: '3',
      title: 'content4',
      description: 'description of content4',
    },
    {
      key: '4',
      title: 'content5',
      description: 'description of content5',
    },
    {
      key: '5',
      title: 'content6',
      description: 'description of content6',
    },
  ],
  selectedKeys: [],
  targetKeys: ['3', '4'],
}

describe('Transfer', () => {
  // 1.mount test
  mountTest(Transfer)

  // 2.render test
  it('renders correctly', () => {
    const wrapper = render(<Transfer {...listCommonProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  // 3.render no child without errors
  it('render no child without errors', () => {
    expect(mount(<Transfer dataSource={[]}></Transfer>)).toMatchSnapshot()
  })

  //! 有bug
  // 4.render null or undefined without errors
  // it('render null or undefined without errors', () => {
  //   expect(
  //     mount(
  //       <Transfer dataSource={[]}>
  //         {null}
  //         {undefined}
  //       </Transfer>,
  //     ),
  //   ).toMatchSnapshot()
  // })

  // 5.displayName
  it('should have displayName static property', () => {
    const wrapper = mount(<Transfer dataSource={[]}></Transfer>)
    expect((wrapper.type() as any).displayName).toBe('Transfer')
  })

  // #region 6.API
  // className
  it('should show correct class name when set "className" of props', () => {
    expect(mount(<Transfer dataSource={baseData} className="my-transfer"></Transfer>)).toHaveClassName('my-transfer')
  })

  // style
  it("should show correct style when set 'style' of props", () => {
    expect(mount(<Transfer dataSource={baseData} style={{ backgroundColor: 'red' }}></Transfer>)).toHaveStyle(
      'backgroundColor',
      'red',
    )
  })

  // dataSource
  it('should render data correctly in the left panel', () => {
    const wrapper = mount(<Transfer dataSource={baseData}></Transfer>)
    expect(wrapper.find(TransferList).at(0).find('.kd-transfer-list-content-item').length).toEqual(6)
    expect(wrapper.find(TransferList).at(1).find('.kd-transfer-list-content-item').length).toEqual(0)
  })

  // disabled
  it('should disable rows according to the "disabled" attribute setting', () => {
    const wrapper = mount(<Transfer dataSource={baseData}></Transfer>)
    expect(wrapper.find(TransferList).at(0).find('.kd-transfer-list-content-item').at(0)).toHaveClassName(
      'kd-transfer-list-content-item-disabled',
    )
    expect(wrapper.find(TransferList).at(0).find('.kd-transfer-list-content-item').at(1)).not.toHaveClassName(
      'kd-transfer-list-content-item-disabled',
    )
    wrapper.find(TransferList).at(0).find('.kd-transfer-list-content-item').at(0).simulate('click')
    expect(wrapper.find(TransferList).at(0).find('.kd-transfer-list-header-selected').text()).toEqual('(0/6)')
    wrapper.find(TransferList).at(0).find('.kd-transfer-list-content-item').at(1).simulate('click')
    expect(wrapper.find(TransferList).at(0).find('.kd-transfer-list-header-selected').text()).toEqual('(1/6)')
  })

  // filterOption
  it('should call "filterOption" when use input in search box', () => {
    const filterOption = (inputValue: string, option: TransferItem) => inputValue === option.title
    const onSearch = jest.fn()
    const wrapper = mount(<Transfer {...listCommonProps} showSearch filterOption={filterOption} onSearch={onSearch} />)
    wrapper
      .find(TransferSearch)
      .at(0)
      .find('input')
      .simulate('change', { target: { value: 'a' } })
    expect(onSearch).toHaveBeenCalledWith('left', 'a')
    expect(wrapper.find(TransferList).at(0).find(ListItem)).toHaveLength(1)
    wrapper.find(TransferSearch).first().find('.kd-transfer-list-search-suffix').at(0).simulate('click')
    expect(wrapper.find(TransferList).at(0).find(ListItem)).toHaveLength(2)
    expect(onSearch).toHaveBeenCalledTimes(2)
  })

  // footer & noDataContent
  it('custom footer and noDataContent', () => {
    const noDataContent = ({ direction }: TransferRenderParam) => {
      if (direction === 'left') {
        return <div>Source is empty~</div>
      } else {
        return <div>Target is empty~</div>
      }
    }
    const renderFooter = () => (
      <Button size="small" style={{ float: 'right', margin: 5 }}>
        reload
      </Button>
    )
    const wrapper = mount(<Transfer {...listEmptyProps} noDataContent={noDataContent} footer={renderFooter} />)
    const leftNoDataContent = wrapper.find('.kd-transfer-list-body-not-found').first().childAt(0).text()
    const rightNoDataContent = wrapper.find('.kd-transfer-list-body-not-found').last().childAt(0).text()
    expect(leftNoDataContent).toEqual('Source is empty~')
    expect(rightNoDataContent).toEqual('Target is empty~')
    expect(wrapper.find('.kd-transfer-list-footer').at(0).find(Button).length).toBe(1)
  })

  // listStyle & operations
  it('should add custom styles when their props are provided', () => {
    const style = {
      backgroundColor: 'red',
    }
    const leftStyle = {
      backgroundColor: 'blue',
    }
    const rightStyle = {
      backgroundColor: 'red',
    }
    const operationStyle = {
      backgroundColor: 'yellow',
    }

    const component = mount(
      <Transfer
        {...listCommonProps}
        style={style}
        listStyle={({ direction }) => (direction === 'left' ? leftStyle : rightStyle)}
        operationStyle={operationStyle}
        operations={['to right', 'to left']}
      />,
    )

    const wrapper = component.find('.kd-transfer')
    const listSource = component.find('.kd-transfer-list').first()
    const listTarget = component.find('.kd-transfer-list').last()
    const operation = component.find('.kd-transfer-operation').first()

    expect(wrapper.prop('style')).toHaveProperty('backgroundColor', 'red')
    expect(listSource.prop('style')).toHaveProperty('backgroundColor', 'blue')
    expect(listTarget.prop('style')).toHaveProperty('backgroundColor', 'red')
    expect(operation.prop('style')).toHaveProperty('backgroundColor', 'yellow')
    expect(component.find('.kd-transfer-operation').find('button').at(0)).toHaveText('to right')
    expect(component.find('.kd-transfer-operation').find('button').at(1)).toHaveText('to left')
  })

  // oneWay
  it('remove by click icon', () => {
    const onChange = jest.fn()
    const wrapper = mount(<Transfer {...listCommonProps} onChange={onChange} oneWay />)
    wrapper.find('.kd-transfer-list-content-item-remove').first().simulate('click')
    expect(onChange).toHaveBeenCalledWith([], 'left', ['b'])
  })

  // searchPlaceholder & showSearch
  it('should input placeholder customize', () => {
    const wrapper = mount(
      <Transfer
        {...searchTransferProps}
        searchPlaceholder={['自定义的左placeholder', '自定义的右placeholder']}
        showSearch
      />,
    )
    expect(wrapper.find('.kd-transfer-list-body-search-wrapper')).toHaveLength(2)
    expect(wrapper.find(TransferSearch).first().find('input').props().placeholder).toEqual('自定义的左placeholder')
    expect(wrapper.find(TransferSearch).last().find('input').props().placeholder).toEqual('自定义的右placeholder')
  })

  // render
  it('should support render value and label in item', () => {
    const component = mount(
      <Transfer
        dataSource={[
          {
            key: 'a',
            title: 'title',
          },
        ]}
        render={(record: TransferItem) => ({ value: `${record.title} value`, label: 'label' })}
      />,
    )
    expect(component.find(TransferList).at(0).find('.kd-transfer-list-content-item-text')).toHaveText('label')
    expect(component.find(TransferList).at(0).find('.kd-transfer-list-content-item').props().title).toEqual(
      'title value',
    )
    expect(component).toMatchSnapshot()
  })

  // selectedKeys
  it('should be selected correctly when set "selectedKeys" attribute', () => {
    const wrapper = mount(<Transfer dataSource={baseData} selectedKeys={['1', '2', '4']} />)
    expect(wrapper.find('.kd-transfer-list-content-item').at(1)).toHaveClassName(
      'kd-transfer-list-content-item-checked',
    )
    expect(wrapper.find('.kd-transfer-list-content-item').at(2)).toHaveClassName(
      'kd-transfer-list-content-item-checked',
    )
    expect(wrapper.find('.kd-transfer-list-content-item').at(4)).toHaveClassName(
      'kd-transfer-list-content-item-checked',
    )
  })

  // showSelectAll & targetKeys
  it('should correctly render the select all checkbox component when the "showSelectAll" attribute is set,and select all options when this component is clicked', () => {
    const handleSelectChange = jest.fn()
    const wrapper = mount(<Transfer {...listCommonProps} onSelectChange={handleSelectChange} />)
    expect(wrapper.find('.kd-transfer-list-header').find('.kd-transfer-list-header-select-all')).toHaveLength(2)
    wrapper.find('.kd-transfer-list-header-select-all').last().find('input').simulate('change')
    expect(handleSelectChange).toHaveBeenCalledWith(['a'], ['b'])
    expect(wrapper.find(TransferList).at(1).find('.kd-transfer-list-content-item-checked').length).toEqual(1)
  })

  // titles
  it('should correctly render the title when the "title" attribute is set', () => {
    const wrapper = mount(<Transfer dataSource={baseData} titles={['test title left', 'test title right']} />)
    expect(wrapper.find('.kd-transfer-list-header-title').at(0)).toHaveText('test title left')
    expect(wrapper.find('.kd-transfer-list-header-title').at(1)).toHaveText('test title right')
  })

  //! api文档未标明
  // rowkey
  it('should support rowKey is function', () => {
    expect(() => {
      mount(<Transfer {...listCommonProps} rowKey={(record) => record.key} />)
    }).not.toThrow()
  })

  // #region onChange
  // select keys to move right
  it('should move selected keys to corresponding list', () => {
    const handleChange = jest.fn()
    const wrapper = mount(<Transfer {...listCommonProps} onChange={handleChange} />)
    wrapper.find(Operation).find(Button).at(0).simulate('click') // move selected keys to right list
    expect(handleChange).toHaveBeenCalledWith(['a', 'b'], 'right', ['a'])
  })
  // select keys to move left
  it('should move selected keys to left list', () => {
    const handleChange = jest.fn()
    const wrapper = mount(
      <Transfer {...listCommonProps} selectedKeys={['a']} targetKeys={['a']} onChange={handleChange} />,
    )
    wrapper.find(Operation).find(Button).at(1).simulate('click') // move selected keys to left list
    expect(handleChange).toHaveBeenCalledWith([], 'left', ['a'])
  })
  // test disabled item should not move
  it('should move selected keys expect disabled to corresponding list', () => {
    const handleChange = jest.fn()
    const wrapper = mount(<Transfer {...listDisabledProps} onChange={handleChange} />)
    wrapper.find(Operation).find(Button).at(0).simulate('click') // move selected keys to right list
    expect(handleChange).toHaveBeenCalledWith(['b'], 'right', ['b'])
  })
  // #endregion

  // #region onSearch
  // display the correct count of items when filter called
  it('should display the correct count of items when filter by input', () => {
    const renderFunc = (item: TransferItem) => item.title
    const onSearch = jest.fn()
    const wrapper = mount(<Transfer {...searchTransferProps} showSearch render={renderFunc} onSearch={onSearch} />)
    wrapper
      .find(TransferSearch)
      .last()
      .find('input')
      .simulate('change', { target: { value: 'content4' } })
    expect(headerText(wrapper, 1)).toEqual('(0/1)')
    wrapper.find(TransferSearch).last().find('.kd-transfer-list-search-suffix').at(0).simulate('click')
    expect(headerText(wrapper, 1)).toEqual('(0/2)')
    expect(onSearch).toHaveBeenCalledTimes(2)
  })
  // #endregion

  // #region onSelectChange
  // uncheck checked items
  it('should uncheck checkbox when click on checked item', () => {
    const handleSelectChange = jest.fn()
    const wrapper = mount(<Transfer {...listCommonProps} onSelectChange={handleSelectChange} />)
    wrapper
      .find(ListItem)
      .filterWhere((n) => n.prop('item').key === 'a')
      .simulate('click')
    expect(handleSelectChange).toHaveBeenLastCalledWith([], [])
  })
  // check uncheck items
  it('should check item when click on unchecked item', () => {
    const handleSelectChange = jest.fn()
    const wrapper = mount(<Transfer {...searchTransferProps} onSelectChange={handleSelectChange} />)
    wrapper
      .find(ListItem)
      .filterWhere((n) => n.prop('item').key === '3')
      .simulate('click')
    expect(handleSelectChange).toHaveBeenLastCalledWith([], ['3'])
  })
  // disabled items will not no be checked
  it('should not check checkbox when click on disabled item', () => {
    const handleSelectChange = jest.fn()
    const wrapper = mount(<Transfer {...listCommonProps} onSelectChange={handleSelectChange} />)
    wrapper
      .find(ListItem)
      .filterWhere((n) => n.prop('item').key === 'c')
      .simulate('click')
    expect(handleSelectChange).not.toHaveBeenCalled()
  })
  // uncheck all
  it('should uncheck all item when click on uncheck all', () => {
    const handleSelectChange = jest.fn()
    const wrapper = mount(<Transfer {...listCommonProps} onSelectChange={handleSelectChange} />)
    wrapper.find('.kd-transfer-list-header-select-all').first().find('input').simulate('change')
    expect(handleSelectChange).toHaveBeenCalledWith([], [])
  })
  // #endregion
  // #endregion

  // 7.methods
  // clearSearch
  it('should clear keywords at correct position when using "clearSearch" method', () => {
    const ref = React.createRef()
    const wrapper = mount(<Transfer ref={ref} showSearch={true} {...listCommonProps} />)
    // clear left
    wrapper
      .find('.kd-input')
      .at(0)
      .simulate('change', { target: { value: '123' } })
    expect(wrapper.find('.kd-input').at(0).prop('value')).toEqual('123')
    act(() => {
      ;(ref.current as any).clearSearch('left')
    })
    wrapper.update()
    expect(wrapper.find('.kd-input').at(0).prop('value')).toEqual('')
    // clear right
    wrapper
      .find('.kd-input')
      .at(1)
      .simulate('change', { target: { value: '123' } })
    expect(wrapper.find('.kd-input').at(1).prop('value')).toEqual('123')
    act(() => {
      ;(ref.current as any).clearSearch('right')
    })
    wrapper.update()
    expect(wrapper.find('.kd-input').at(1).prop('value')).toEqual('')
    // clear all
    wrapper
      .find('.kd-input')
      .at(0)
      .simulate('change', { target: { value: '123' } })
    wrapper
      .find('.kd-input')
      .at(1)
      .simulate('change', { target: { value: '456' } })
    expect(wrapper.find('.kd-input').at(0).prop('value')).toEqual('123')
    expect(wrapper.find('.kd-input').at(1).prop('value')).toEqual('456')
    act(() => {
      ;(ref.current as any).clearSearch()
    })
    wrapper.update()
    expect(wrapper.find('.kd-input').at(0).prop('value')).toEqual('')
    expect(wrapper.find('.kd-input').at(1).prop('value')).toEqual('')
  })

  // 8.class state
  // data-test向下传递
  it('should ensure native API or custom API can pass', () => {
    expect(mount(<Transfer dataSource={baseData} data-index="1"></Transfer>)).toHaveProp('data-index', '1')
  })

  // #region 9.component interaction(event)
  it('should show sorted targetKey', () => {
    const sortedTargetKeyProps = {
      dataSource: [
        {
          key: 'a',
          title: 'a',
        },
        {
          key: 'b',
          title: 'b',
        },
        {
          key: 'c',
          title: 'c',
        },
      ],
      targetKeys: ['c', 'b'],
      lazy: false,
    }
    const wrapper = render(<Transfer {...sortedTargetKeyProps} render={(item: TransferItem) => item.title} />)
    expect(wrapper).toMatchSnapshot()
  })

  // pagination
  it('boolean', () => {
    const wrapper = mount(<Transfer {...listDisabledProps} pagination />)
    expect(wrapper.find('Pagination').first().props()).toEqual(
      expect.objectContaining({
        pageSize: 10,
      }),
    )
  })

  it('object', () => {
    const wrapper = mount(<Transfer {...listDisabledProps} pagination={{ pageSize: 1 }} />)
    expect(wrapper.find('.kd-transfer-list').first().find('.kd-transfer-list-content-item')).toHaveLength(1)
    expect(wrapper.find('Pagination').first().props()).toEqual(
      expect.objectContaining({
        pageSize: 1,
      }),
    )
  })

  it('not exceed max size', () => {
    const wrapper = mount(<Transfer {...listDisabledProps} pagination={{ pageSize: 1 }} />)
    wrapper.find('.kd-pagination-action-item').last().childAt(0).simulate('click')
    expect(wrapper.find('Pagination').first().props()).toEqual(
      expect.objectContaining({
        current: 2,
      }),
    )
    wrapper.setProps({ targetKeys: ['b', 'c'] })
    wrapper.update()
    expect(wrapper.find('Pagination').first().props()).toEqual(
      expect.objectContaining({
        current: 1,
      }),
    )
  })
  // #endregion

  // 10.config provider
  it('should provide the correct configuration by using configuration provider', () => {
    const localeData = {
      'Transfer.searchPlaceholder': [
        'Please enter what you want to search for',
        'Please enter what you want to search for 2',
      ],
    }
    const transferConfig = {
      compDefaultProps: {
        Transfer: {
          dataSource: [],
          locale: {},
          showSearch: true,
          listStyle: { width: '300px' },
        },
      },
      localeConfig: { localeData, locale: 'zh-EN' },
    }
    const wrapper = mount(
      <ConfigProvider value={transferConfig}>
        <Transfer dataSource={[]} />
      </ConfigProvider>,
    )
    expect(wrapper.find('.kd-transfer-list-body-not-found')).toHaveLength(2)
    expect(wrapper.find('.kd-transfer-list-body-search-wrapper')).toHaveLength(2)
    expect(wrapper.find('.kd-transfer-list').at(0)).toHaveStyle('width', '300px')
    expect(wrapper.find('.kd-input').at(0).prop('placeholder')).toEqual('Please enter what you want to search for')
    expect(wrapper.find('.kd-input').at(1).prop('placeholder')).toEqual('Please enter what you want to search for 2')
  })

  //! ref未关联到dom上
  // 11. ref test
  // it('should get correct dom from ref of props', () => {
  //   const ref = React.createRef()
  //   mount(<Transfer dataSource={[]} ref={ref}></Transfer>)
  //   expect(ref.current instanceof HTMLElement).toBe(true)
  // })
})
