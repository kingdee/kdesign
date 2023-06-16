import React, { useState, useImperativeHandle } from 'react'
import { omit } from '../_utils/omit'
import Search from './search'
import { PaginationType, TransferItem, TransferDirection, RenderResult, RenderResultObject } from './interface'
import DefaultListBody, { TransferListBodyProps, OmitProps } from './list-body'
import classNames from 'classnames'
import Checkbox from '../checkbox'

const defaultRender = () => null

function isRenderResultPlainObject(result: RenderResult) {
  return result && !React.isValidElement(result) && Object.prototype.toString.call(result) === '[object Object]'
}

export interface RenderedItem {
  renderedText: string
  renderedEl: React.ReactNode
  item: TransferItem
}

type RenderListFunction = (props: TransferListBodyProps) => React.ReactNode

export interface TransferListProps {
  prefixCls: string
  titleText: string
  placeholder: string
  dataSource: TransferItem[]
  filterOption?: (filterText: string, item: TransferItem) => boolean
  style?: React.CSSProperties
  checkedKeys: string[]
  handleFilter: (e: React.ChangeEvent<HTMLInputElement>) => void
  onItemSelect: (key: string, check: boolean) => void
  onItemSelectAll: (dataSource: string[], checkAll: boolean) => void
  onItemRemove?: (keys: string[]) => void
  handleClear: () => void
  /** render item */
  render?: (item: TransferItem) => RenderResult
  showSearch?: boolean
  renderList?: RenderListFunction
  footer?: (props: TransferListProps) => React.ReactNode
  noDataContent: React.ReactNode
  disabled?: boolean
  direction: TransferDirection
  showSelectAll?: boolean
  showRemove?: boolean
  pagination?: PaginationType
}

const ITransferList = (props: TransferListProps, ref: any) => {
  const {
    prefixCls,
    dataSource,
    filterOption,
    handleFilter,
    handleClear,
    render = defaultRender,
    titleText,
    checkedKeys,
    disabled,
    showSearch,
    style,
    renderList,
    onItemSelectAll,
    noDataContent,
    showSelectAll,
    pagination,
    footer,
    showRemove,
    placeholder,
  } = props
  const [filterValue, setFilterValue] = useState('')
  // 自定义底部渲染
  const footerDom = footer && footer(props)

  useImperativeHandle(ref, () => {
    return {
      onClear,
    }
  })

  const renderItem = (item: TransferItem): RenderedItem => {
    const renderResult: RenderResult = render(item)
    const isRenderResultPlain = isRenderResultPlainObject(renderResult)
    return {
      renderedText: isRenderResultPlain ? (renderResult as RenderResultObject).value : (renderResult as string),
      renderedEl: isRenderResultPlain ? (renderResult as RenderResultObject).label : renderResult,
      item,
    }
  }

  const getFilteredItems = (
    dataSource: TransferItem[],
    filterValue: string,
  ): { filteredItems: TransferItem[]; filteredRenderItems: RenderedItem[] } => {
    const filteredItems: TransferItem[] = []
    const filteredRenderItems: RenderedItem[] = []

    dataSource.forEach((item) => {
      const renderedItem = renderItem(item)
      const { renderedText } = renderedItem

      // Filter skip
      if (filterValue && !matchFilter(renderedText, item)) {
        return null
      }

      filteredItems.push(item)
      filteredRenderItems.push(renderedItem)
    })

    return { filteredItems, filteredRenderItems }
  }

  const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value: filterStr },
    } = e
    setFilterValue(filterStr)
    handleFilter(e)
  }

  const onClear = () => {
    setFilterValue('')
    handleClear()
  }

  const matchFilter = (text: string, item: TransferItem) => {
    if (filterOption) {
      return filterOption(filterValue, item)
    }
    return text?.indexOf(filterValue) > -1
  }

  const renderListBody = (renderList: RenderListFunction | undefined, props: TransferListBodyProps) => {
    let bodyContent: React.ReactNode = renderList ? renderList(props) : null
    const customize = !!bodyContent
    if (!customize) {
      bodyContent = <DefaultListBody {...props} />
    }
    return {
      customize,
      bodyContent,
    }
  }

  const getListBody = (
    prefixCls: string,
    placeholder: string,
    filterValue: string,
    filteredItems: TransferItem[],
    noDataContent: React.ReactNode,
    filteredRenderItems: RenderedItem[],
    checkedKeys: string[],
    renderList?: RenderListFunction,
    showSearch?: boolean,
    disabled?: boolean,
  ): React.ReactNode => {
    const search = showSearch ? (
      <div className={`${prefixCls}-body-search-wrapper`}>
        <Search
          prefixCls={`${prefixCls}-search`}
          onChange={onFilterChange}
          handleClear={onClear}
          placeholder={placeholder}
          value={filterValue}
          disabled={disabled}
        />
      </div>
    ) : null

    const { bodyContent, customize } = renderListBody(renderList, {
      ...omit(props, OmitProps),
      filteredItems,
      filteredRenderItems,
      selectedKeys: checkedKeys,
    })

    let bodyNode: React.ReactNode
    // We should wrap customize list body in a classNamed div to use flex layout.
    if (customize) {
      bodyNode = <div className={`${prefixCls}-body-customize-wrapper`}>{bodyContent}</div>
    } else {
      bodyNode = filteredItems.length ? (
        bodyContent
      ) : (
        <div className={`${prefixCls}-body-not-found`}>{noDataContent}</div>
      )
    }

    return (
      <div className={classNames(showSearch ? `${prefixCls}-body ${prefixCls}-body-with-search` : `${prefixCls}-body`)}>
        {search}
        {bodyNode}
      </div>
    )
  }

  const getSelectAllLabel = (selectedCount: number, totalCount: number): React.ReactNode => {
    if (showRemove) {
      return <>{`${totalCount}`}</>
    }
    return <>{`(${selectedCount}/${totalCount})`}</>
  }

  const getCheckStatus = (filteredItems: TransferItem[]): string => {
    if (checkedKeys.length === 0) {
      return 'none'
    }
    if (filteredItems.every((item) => checkedKeys.indexOf(item.key) >= 0 || !!item.disabled)) {
      return 'all'
    }
    return 'part'
  }

  const getCheckBox = (
    filteredItems: TransferItem[],
    onItemSelectAll: (dataSource: string[], checkAll: boolean) => void,
    showSelectAll?: boolean,
    disabled?: boolean,
  ): false | JSX.Element => {
    const checkStatus = getCheckStatus(filteredItems)
    const checkedAll = checkStatus === 'all'
    const checkAllCheckbox = (
      <div className={`${prefixCls}-header-select-all`}>
        {showSelectAll !== false && (
          <Checkbox
            disabled={disabled}
            checked={checkedAll}
            indeterminate={checkStatus === 'part'}
            onChange={() => {
              // Only select enabled items
              onItemSelectAll(
                filteredItems.filter((item) => !item.disabled).map(({ key }) => key),
                !checkedAll,
              )
            }}
          />
        )}
      </div>
    )
    return checkAllCheckbox
  }

  const listFooter = footerDom ? <div className={`${prefixCls}-footer`}>{footerDom}</div> : null

  const { filteredItems, filteredRenderItems } = getFilteredItems(dataSource, filterValue)
  const checkAllCheckbox = !showRemove && getCheckBox(filteredItems, onItemSelectAll, showSelectAll, disabled)
  const listBody = getListBody(
    prefixCls,
    placeholder,
    filterValue,
    filteredItems,
    noDataContent,
    filteredRenderItems,
    checkedKeys,
    renderList,
    showSearch,
    disabled,
  )
  const listCls = classNames(prefixCls, {
    [`${prefixCls}-with-pagination`]: pagination,
    [`${prefixCls}-with-footer`]: footerDom,
  })
  return (
    <div className={listCls} style={style}>
      {/* Header */}
      <div className={`${prefixCls}-header`}>
        <div className={`${prefixCls}-header-left`}>
          {checkAllCheckbox}
          <span className={`${prefixCls}-header-title`}>{titleText}</span>
        </div>
        <span className={`${prefixCls}-header-selected`}>
          {getSelectAllLabel(checkedKeys.length, filteredItems.length)}
        </span>
      </div>
      {/* Body */}
      {listBody}
      {/* Footer */}
      {listFooter}
    </div>
  )
}

const TransferList = React.forwardRef<unknown, TransferListProps>(ITransferList)

TransferList.defaultProps = {
  dataSource: [],
  titleText: '',
  showSearch: false,
}

export default TransferList
