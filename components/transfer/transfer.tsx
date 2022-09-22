import React, { useContext, useState, useImperativeHandle, useRef } from 'react'
import classNames from 'classnames'
import List, { TransferListProps } from './list'
import Operation from './operation'
import ConfigContext from '../config-provider/ConfigContext'
import { getCompProps } from '../_utils'

import { TransferListBodyProps } from './list-body'
import { PaginationType, TransferDirection, TransferItem, TransferRender, TransferRenderParam } from './interface'
import noDataImg from './img/transfer-empty.png'
// import devWarning from '../_utils/devwarning'
export interface TransferProps {
  prefixCls?: string // css prefix前缀
  className?: string
  disabled?: boolean // 是否禁用
  dataSource: TransferItem[] // 源数据
  targetKeys?: string[] // 右穿梭框的数据
  selectedKeys?: string[] // 选择的数据
  render?: TransferRender // 穿梭框行渲染函数
  onChange?: (targetKeys: string[], direction: string, moveKeys: string[]) => void // 穿梭框内容变化的change事件
  onSelectChange?: (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => void // 选择的数据发生变化的change事件
  style?: React.CSSProperties
  listStyle?: ((style: TransferRenderParam) => React.CSSProperties) | React.CSSProperties // 穿梭框面板自定义style
  operationStyle?: React.CSSProperties // 操作面板自定义style
  noDataContent?: ((param: TransferRenderParam) => React.ReactNode) | React.ReactNode // 穿梭框无数据时的内容
  titles?: string[] // 穿梭框标题
  operations?: string[] // 穿梭框操作面板文字
  searchPlaceholder?: string[] // 搜索框 placeholder
  showSearch?: boolean // 是否展示搜索框
  filterOption?: (inputValue: string, item: TransferItem) => boolean // 自定义搜索函数
  rowKey?: (record: TransferItem) => string
  onSearch?: (direction: TransferDirection, value: string) => void // 搜索输入框值改变的回调
  children?: (props: TransferListBodyProps) => React.ReactNode
  showSelectAll?: boolean // 是否显示全选checkbox
  oneWay?: boolean // 是否是单向模式
  pagination?: PaginationType // 是否采用分页显示
  footer?: (props: TransferListProps) => React.ReactNode // 是否采用自定义渲染底部
}

const InternalTransfer = (props: TransferProps, ref: any) => {
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps, locale } = useContext(ConfigContext)
  const transferProps = getCompProps('Transfer', userDefaultProps, props) // 获取穿梭框props
  const {
    prefixCls: customPrefixcls,
    className,
    dataSource,
    targetKeys = [],
    selectedKeys = [],
    disabled,
    render,
    onChange,
    onSelectChange,
    style,
    listStyle,
    operationStyle,
    titles = [],
    operations = [],
    searchPlaceholder = [],
    showSearch,
    filterOption,
    rowKey,
    onSearch,
    children,
    oneWay,
    pagination,
    showSelectAll,
    noDataContent,
    footer,
  } = transferProps

  const transferLang = locale.getCompLangMsg({ componentName: 'Transfer' })
  const transferPrefixCls = getPrefixCls!(prefixCls, 'transfer', customPrefixcls)
  const cls = classNames(
    transferPrefixCls,
    {
      [`${transferPrefixCls}-disabled`]: disabled,
      [`${transferPrefixCls}-customize-list`]: !!children,
    },
    className,
  )
  const [sourceSelectedKeys, setSourceSelectedKeys] = useState(
    selectedKeys.filter((key: string) => targetKeys.indexOf(key) === -1),
  )
  const [targetSelectedKeys, setTargetSelectedKeys] = useState(
    selectedKeys.filter((key: string) => targetKeys.indexOf(key) > -1),
  )
  const leftListRef = useRef(null)
  const rightListRef = useRef(null)
  const leftActive = targetSelectedKeys.length > 0
  const rightActive = sourceSelectedKeys.length > 0
  const mergedPagination = !children && pagination
  const leftTitle = titles[0] || transferLang.leftTitle
  const rightTitle = titles[1] || transferLang.rightTitle
  const leftPlaceholder = searchPlaceholder[0] || transferLang.searchPlaceholder[0]
  const rightPlaceholder = searchPlaceholder[1] || transferLang.searchPlaceholder[1]

  useImperativeHandle(ref, () => {
    return {
      clearSearch,
    }
  })

  const clearSearch = (position: string | undefined) => {
    if (position === 'left' || position === undefined) {
      ;(leftListRef?.current as any)?.onClear()
    }

    if (position === 'right' || position === undefined) {
      ;(rightListRef?.current as any)?.onClear()
    }
  }

  const setStateKeys = (direction: TransferDirection, keys: string[] | ((prevKeys: string[]) => string[])) => {
    if (direction === 'left') {
      setSourceSelectedKeys(typeof keys === 'function' ? keys(sourceSelectedKeys || []) : [...keys])
    } else {
      setTargetSelectedKeys(typeof keys === 'function' ? keys(targetSelectedKeys || []) : [...keys])
    }
  }

  const moveTo = (direction: TransferDirection) => {
    const moveKeys = direction === 'right' ? sourceSelectedKeys : targetSelectedKeys
    // 过滤出disable的选项
    const newMoveKeys = moveKeys.filter(
      (key: string) => !dataSource.some((data: TransferItem) => !!(key === data.key && data.disabled)),
    )
    const newTargetKeys =
      direction === 'right'
        ? newMoveKeys.concat(targetKeys)
        : targetKeys.filter((targetKey: string) => newMoveKeys.indexOf(targetKey) === -1)
    // 重置选择项
    const oppositeDirection = direction === 'right' ? 'left' : 'right'
    setStateKeys(oppositeDirection, [])
    handleSelectChange(oppositeDirection, [])
    if (onChange) {
      onChange(newTargetKeys, direction, newMoveKeys)
    }
  }

  const moveToLeft = () => moveTo('left')

  const moveToRight = () => moveTo('right')

  const handleFilter = (direction: TransferDirection, e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (onSearch) {
      onSearch(direction, value)
    }
  }

  const handleLeftFilter = (e: React.ChangeEvent<HTMLInputElement>) => handleFilter('left', e)

  const handleRightFilter = (e: React.ChangeEvent<HTMLInputElement>) => handleFilter('right', e)

  const handleClear = (direction: TransferDirection) => {
    if (onSearch) {
      onSearch(direction, '')
    }
  }

  const handleLeftClear = () => handleClear('left')

  const handleRightClear = () => handleClear('right')

  const onItemSelectAll = (direction: TransferDirection, selectedKeys: string[], checkAll: boolean) => {
    setStateKeys(direction, (prevKeys: string[]) => {
      let mergedCheckedKeys = []
      if (checkAll) {
        //  全选
        mergedCheckedKeys = [...new Set([...prevKeys, ...selectedKeys])]
      } else {
        // 取消全选
        mergedCheckedKeys = prevKeys.filter((key: string) => selectedKeys.indexOf(key) === -1)
      }
      handleSelectChange(direction, mergedCheckedKeys)
      return mergedCheckedKeys
    })
  }

  const onLeftItemSelectAll = (selectedKeys: string[], checkAll: boolean) =>
    onItemSelectAll('left', selectedKeys, checkAll)

  const onRightItemSelectAll = (selectedKeys: string[], checkAll: boolean) =>
    onItemSelectAll('right', selectedKeys, checkAll)

  const onItemSelect = (direction: TransferDirection, selectedKey: string, checked: boolean) => {
    const holder = direction === 'left' ? [...sourceSelectedKeys] : [...targetSelectedKeys]
    const index = holder.indexOf(selectedKey)
    if (index > -1) {
      holder.splice(index, 1)
    }
    if (checked) {
      holder.push(selectedKey)
    }
    handleSelectChange(direction, holder)
    setStateKeys(direction, holder)
  }

  const onLeftItemSelect = (selectedKey: string, checked: boolean) => onItemSelect('left', selectedKey, checked)

  const onRightItemSelect = (selectedKey: string, checked: boolean) => onItemSelect('right', selectedKey, checked)

  const onRightItemRemove = (selectedKeys: string[]) => {
    setStateKeys('right', [])

    if (onChange) {
      onChange(
        targetKeys.filter((key: string) => !selectedKeys.includes(key)),
        'left',
        [...selectedKeys],
      )
    }
  }

  const handleSelectChange = (direction: TransferDirection, holder: string[]) => {
    if (!onSelectChange) return
    if (direction === 'left') {
      onSelectChange(holder, targetSelectedKeys)
    } else {
      onSelectChange(sourceSelectedKeys, holder)
    }
  }

  const handleListStyle = (
    listStyle: ((style: TransferRenderParam) => React.CSSProperties) | React.CSSProperties,
    direction: TransferDirection,
  ) => {
    if (typeof listStyle === 'function') {
      return listStyle({ direction })
    }
    return listStyle
  }

  const handleNoDataContent = (
    noDataContent: ((param: TransferRenderParam) => React.ReactNode) | React.ReactNode,
    direction: TransferDirection,
  ) => {
    if (typeof noDataContent === 'function') {
      return noDataContent({ direction })
    }
    const defaultContent = (
      <>
        <img src={noDataImg} alt={transferLang.emptyTip} height={96} />
        <span className={`${transferPrefixCls}-list-body-not-found-tip`}>{transferLang.emptyTip}</span>
      </>
    )
    return noDataContent || defaultContent
  }

  // 获取左右数据源
  const separateDataSource = () => {
    const leftDataSource: TransferItem[] = []
    const rightDataSource: TransferItem[] = new Array(targetKeys.length)
    dataSource.forEach((record: TransferItem) => {
      if (rowKey) {
        record.key = rowKey(record)
      }
      const indexOfKey = targetKeys.indexOf(record.key)
      if (indexOfKey !== -1) {
        rightDataSource[indexOfKey] = record
      } else {
        leftDataSource.push(record)
      }
    })
    return {
      leftDataSource,
      rightDataSource,
    }
  }

  const { leftDataSource, rightDataSource } = separateDataSource()
  return (
    <div className={cls} style={style}>
      <List
        prefixCls={`${transferPrefixCls}-list`}
        placeholder={leftPlaceholder}
        titleText={leftTitle}
        dataSource={leftDataSource}
        filterOption={filterOption}
        style={handleListStyle(listStyle, 'left')}
        checkedKeys={sourceSelectedKeys}
        handleFilter={handleLeftFilter}
        handleClear={handleLeftClear}
        onItemSelect={onLeftItemSelect}
        onItemSelectAll={onLeftItemSelectAll}
        render={render}
        showSearch={showSearch}
        renderList={children}
        disabled={disabled}
        direction="left"
        showSelectAll={showSelectAll}
        pagination={mergedPagination}
        noDataContent={handleNoDataContent(noDataContent, 'left')}
        footer={footer}
        ref={leftListRef}
      />
      <Operation
        className={`${transferPrefixCls}-operation`}
        rightActive={rightActive}
        rightArrowText={operations[0]}
        moveToRight={moveToRight}
        leftActive={leftActive}
        leftArrowText={operations[1]}
        moveToLeft={moveToLeft}
        style={operationStyle}
        disabled={disabled}
        oneWay={oneWay}
      />
      <List
        prefixCls={`${transferPrefixCls}-list`}
        placeholder={rightPlaceholder}
        titleText={rightTitle}
        dataSource={rightDataSource}
        filterOption={filterOption}
        style={handleListStyle(listStyle, 'right')}
        checkedKeys={targetSelectedKeys}
        handleFilter={handleRightFilter}
        handleClear={handleRightClear}
        onItemSelect={onRightItemSelect}
        onItemSelectAll={onRightItemSelectAll}
        onItemRemove={onRightItemRemove}
        render={render}
        showSearch={showSearch}
        renderList={children}
        disabled={disabled}
        direction="right"
        showSelectAll={showSelectAll}
        pagination={mergedPagination}
        noDataContent={handleNoDataContent(noDataContent, 'right')}
        footer={footer}
        showRemove={oneWay}
        ref={rightListRef}
      />
    </div>
  )
}

const Transfer = React.forwardRef<unknown, TransferProps>(InternalTransfer)
Transfer.displayName = 'Transfer'

export default Transfer
