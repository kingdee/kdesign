import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react'
import { Table as BaseTable, TablePipeline, useTablePipeline } from '@kdcloudjs/table'

import ConfigContext from '../config-provider/ConfigContext'

import Checkbox from '../checkbox/index'
import Radio from '../radio/index'
import { Spin, Empty } from '../index'

import useRowSelection from './feature/rowSelection'
import useRowDetail from './feature/rowDetail'
import useFilter from './feature/filter'
import useSort from './feature/sort'
import useAutoRowSpan from './feature/autoRowSpan'

import { TableProps, TableInstance } from './interface'
import classNames from 'classnames'
import useTreeMode from './feature/treeMode'
import useColumnResize from './feature/columnResize'
import useColumnDrag from './feature/columnDrag'
import useContextMenu from './feature/contextMenu'
import useRangeSelection from './feature/useRangeSelection'
import useＭergeCellHover from './feature/mergeCellHover'
import devWarning from '../_utils/devwarning'
import useFooterDataSource from './feature/useFooterDataSource'
import usecolGroupExtendable from './feature/colGroupExtendable'
import getApi from './api'

const Table = forwardRef<unknown, TableProps>((props: TableProps, ref) => {
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
    scrollLoad,
    columnGroupExtend = {},
  } = props

  const { getPrefixCls, prefixCls, locale } = useContext(ConfigContext)

  const tablePrefixCls = getPrefixCls!(prefixCls, customPrefixcls)
  const tableCls = classNames(tablePrefixCls, className)
  const localeText = locale.getCompLangMsg({ componentName: 'Table' })
  const pipeline = useTablePipeline({
    components: {
      Checkbox: components?.Checkbox || Checkbox,
      Radio: components?.Radio || Radio,
    },
    localeText,
  })
    .primaryKey(primaryKey === undefined ? '' : primaryKey)
    .input({
      columns,
      dataSource,
    })

  const pipelineRef = useRef<TablePipeline>(pipeline)
  pipelineRef.current = pipeline

  // if (footerDataSource) {
  //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   // @ts-ignore
  //   pipeline.footerDataSource(footerDataSource)
  // }

  useImperativeHandle(
    ref,
    (): TableInstance => ({
      api: getApi(pipelineRef),
    }),
  )

  /* -------------------------------------------------------------------------- */
  /* features                                                                   */
  /* -------------------------------------------------------------------------- */
  useRowSelection(pipeline, rowSelection)
  useRowDetail(pipeline, rowDetail)
  useFilter(pipeline, filter)
  useSort(pipeline, sort)
  useAutoRowSpan(pipeline, autoRowSpan)
  useTreeMode(pipeline, treeMode)
  usecolGroupExtendable(pipeline, columnGroupExtend)
  useColumnResize(pipeline, columnResize)
  useColumnDrag(pipeline, columnDrag)
  useContextMenu(pipeline, contextMenu)
  useRangeSelection(pipeline, rangeSelection)
  useＭergeCellHover(pipeline)
  useFooterDataSource(pipeline, footerDataSource)

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
})

Table.displayName = 'Table'

export default Table
