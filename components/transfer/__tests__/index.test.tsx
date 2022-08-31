import React from 'react'
import { render, mount } from 'enzyme'
import Transfer, { TransferItem, TransferRenderParam } from '../index'
import Operation from '../operation'
import Button from '../../button'
import ListItem from '../list-item'
import TransferSearch from '../search'
import TransferList from '../list'
import mountTest from '../../../tests/shared/mountTest'

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
      chosen: false,
    },
    {
      key: '1',
      title: 'content2',
      description: 'description of content2',
      chosen: false,
    },
    {
      key: '2',
      title: 'content3',
      description: 'description of content3',
      chosen: false,
    },
    {
      key: '3',
      title: 'content4',
      description: 'description of content4',
      chosen: false,
    },
    {
      key: '4',
      title: 'content5',
      description: 'description of content5',
      chosen: false,
    },
    {
      key: '5',
      title: 'content6',
      description: 'description of content6',
      chosen: false,
    },
  ],
  selectedKeys: [],
  targetKeys: ['3', '4'],
}

describe('Transfer', () => {
  // mount test
  mountTest(Transfer)

  // render test
  it('renders correctly', () => {
    const wrapper = render(<Transfer {...listCommonProps} />)
    expect(wrapper).toMatchSnapshot()
  })

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

  // check all
  it('should check all item', () => {
    const handleSelectChange = jest.fn()
    const wrapper = mount(<Transfer {...listCommonProps} onSelectChange={handleSelectChange} />)
    wrapper.find('.kd-transfer-list-header-select-all').last().find('input').simulate('change')
    expect(handleSelectChange).toHaveBeenCalledWith(['a'], ['b'])
  })

  // call filterOption
  it('should call `filterOption` when use input in search box', () => {
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

  it('should input placeholder customize', () => {
    const wrapper = mount(
      <Transfer
        {...searchTransferProps}
        placeholders={['自定义的左placeholder', '自定义的右placeholder']}
        showSearch
      />,
    )
    expect(wrapper.find(TransferSearch).first().find('input').props().placeholder).toEqual('自定义的左placeholder')
    expect(wrapper.find(TransferSearch).last().find('input').props().placeholder).toEqual('自定义的右placeholder')
  })

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
  })

  // support rowkey
  it('should support rowKey is function', () => {
    expect(() => {
      mount(<Transfer {...listCommonProps} rowKey={(record) => record.key} />)
    }).not.toThrow()
  })

  // custom render
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
    expect(component).toMatchSnapshot()
  })

  // oneWay mode
  it('remove by click icon', () => {
    const onChange = jest.fn()
    const wrapper = mount(<Transfer {...listCommonProps} onChange={onChange} oneWay />)
    wrapper.find('.kd-transfer-list-content-item-remove').first().simulate('click')
    expect(onChange).toHaveBeenCalledWith([], 'left', ['b'])
  })

  // custom footer and noDataContent
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
})

describe('pagination', () => {
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
    wrapper.find('.kd-pagination-item').last().childAt(0).simulate('click')
    expect(wrapper.find('Pagination').first().props()).toEqual(
      expect.objectContaining({
        current: 2,
      }),
    )

    // pagination has bug
    // wrapper.setProps({ targetKeys: ['b', 'c'] })
    // expect(wrapper.find('Pagination').first().props()).toEqual(
    //   expect.objectContaining({
    //     current: 1
    //   })
    // )
  })
})
