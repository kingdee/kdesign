import React, { useContext } from 'react'
import { Table as BaseTable, useTablePipeline } from '@kdcloudjs/table'

import ConfigContext from '../config-provider/ConfigContext'

import Checkbox from '../checkbox/index'
import Radio from '../radio/index'
import { Spin, Empty } from '../index'

import useRowSelection from './feature/rowSelection'
import useRowDetail from './feature/rowDetail'
import useFilter from './feature/filter'
import useSort from './feature/sort'
import useAutoRowSpan from './feature/autoRowSpan'

import { TableProps } from './interface'
import classNames from 'classnames'
import useTreeMode from './feature/treeMode'
import useColumnResize from './feature/columnResize'
import useColumnDrag from './feature/columnDrag'
import useContextMenu from './feature/contextMenu'
import useRangeSelection from './feature/useRangeSelection'
import devWarning from '../_utils/devwarning'

function Table(props: TableProps) {
  const {
    columns,
    dataSource,
    columnDrag,
    columnResize,
    primaryKey,
    rowSelection,
    rowDetail,
    filter,
    sort,
    autoRowSpan,
    treeMode,
    prefixCls: customPrefixcls,
    className,
    style,
    components,
    isLoading,
    footerDataSource,
    useVirtual,
    estimatedRowHeight,
    emptyCellHeight,
    hasHeader,
    useOuterBorder,
    defaultColumnWidth,
    getRowProps,
    getTableProps,
    contextMenu,
    rangeSelection,
    cssVariables,
    stickyScrollHeight,
    scrollbarWidth,
    scrollLoad
  } = props

  const { getPrefixCls, prefixCls } = useContext(ConfigContext)

  const tablePrefixCls = getPrefixCls!(prefixCls, customPrefixcls)
  const tableCls = classNames(tablePrefixCls, className)
  const pipeline = useTablePipeline({
    components: {
      Checkbox: components?.Checkbox || Checkbox,
      Radio: components?.Radio || Radio,
    },
  })
    .primaryKey(primaryKey === undefined ? '' : primaryKey)
    .input({
      columns,
      dataSource,
    })

  if (footerDataSource) {
    pipeline.footerDataSource(footerDataSource)
  }

  /* -------------------------------------------------------------------------- */
  /* features                                                                   */
  /* -------------------------------------------------------------------------- */
  useRowSelection(pipeline, rowSelection)
  useRowDetail(pipeline, rowDetail)
  useFilter(pipeline, filter)
  useSort(pipeline, sort)
  useAutoRowSpan(pipeline, autoRowSpan)
  useTreeMode(pipeline, treeMode)
  useColumnResize(pipeline, columnResize)
  useColumnDrag(pipeline, columnDrag)
  useContextMenu(pipeline, contextMenu)
  useRangeSelection(pipeline, rangeSelection)

  /* -------------------------------------------------------------------------- */
  /* after useTablePipeline, merge pipeline.getProps result                     */
  /* -------------------------------------------------------------------------- */
  if (typeof getRowProps === 'function') {
    pipeline.appendRowPropsGetter(getRowProps)
  } else {
    devWarning(true, 'table', `parameter 'getRowProps' should be a function but here it is ${getRowProps}`)
  }

  if (typeof getTableProps === 'function') {
    const tableProps: React.HTMLAttributes<HTMLTableElement> = getTableProps()
    pipeline.addTableProps(tableProps)
  } else {
    devWarning(true, 'table', `parameter 'getTableProps' should be a function but here it is ${getTableProps}`)
  }

  return (
    <BaseTable
      {...pipeline.getProps()}
      className={tableCls}
      style={style}
      isLoading={isLoading}
      components={{
        LoadingIcon: components?.LoadingIcon || (() => <Spin type="container" />),
        EmptyContent: components?.EmptyContent || (() => <Empty />),
      }}
      useVirtual={useVirtual}
      estimatedRowHeight={estimatedRowHeight}
      emptyCellHeight={emptyCellHeight}
      hasHeader={hasHeader}
      useOuterBorder={useOuterBorder}
      defaultColumnWidth={defaultColumnWidth}
      cssVariables={cssVariables}
      stickyScrollHeight={stickyScrollHeight}
      scrollbarWidth={scrollbarWidth}
      scrollLoad={scrollLoad}
    />
  )
}

export default Table
