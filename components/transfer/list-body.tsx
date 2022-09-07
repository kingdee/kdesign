import React, { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import { ElementOf, Omit, tuple } from '../_utils/type'
import Pagination from '../pagination'
import { TransferListProps, RenderedItem } from './list'
import ListItem from './list-item'
import { PaginationType, TransferItem } from './interface'

export const OmitProps = tuple('handleFilter', 'handleClear', 'checkedKeys')
export type OmitProp = ElementOf<typeof OmitProps>
type PartialTransferListProps = Omit<TransferListProps, OmitProp>

export interface TransferListBodyProps extends PartialTransferListProps {
  filteredItems: TransferItem[]
  filteredRenderItems: RenderedItem[]
  selectedKeys: string[]
}

function parsePagination(pagination?: PaginationType) {
  if (!pagination) {
    return null
  }
  const defaultPagination = {
    pageSize: 10,
  }
  if (typeof pagination === 'object') {
    return {
      ...defaultPagination,
      ...pagination,
    }
  }
  return defaultPagination
}

const ListBody: React.FC<TransferListBodyProps> = (props: TransferListBodyProps) => {
  const {
    prefixCls,
    onItemSelect: itemSelect,
    onItemRemove: itemRemove,
    pagination,
    filteredRenderItems,
    selectedKeys,
    disabled: globalDisabled,
    showRemove,
  } = props

  const [current, setCurrent] = useState(1)

  const mergedPagination = useMemo(() => parsePagination(pagination), [pagination])

  const onItemSelect = (item: TransferItem) => {
    const checked = selectedKeys.indexOf(item.key) >= 0
    itemSelect(item.key, !checked)
  }

  const onItemRemove = (item: TransferItem) => {
    itemRemove && itemRemove([item.key])
  }

  const onPageChange = (current: number) => {
    setCurrent(current)
  }

  const getItems = () => {
    let displayItems = filteredRenderItems

    if (mergedPagination) {
      displayItems = filteredRenderItems.slice(
        (current - 1) * mergedPagination.pageSize,
        current * mergedPagination.pageSize,
      )
    }

    return displayItems
  }

  useEffect(() => {
    const total = filteredRenderItems.length
    if (mergedPagination && (current - 1) * mergedPagination.pageSize >= total) {
      const pageSize = mergedPagination.pageSize
      const pageNo = total % pageSize === 0 ? total / pageSize : total / pageSize + 1
      setCurrent(pageNo)
    }
  }, [mergedPagination, filteredRenderItems])

  let paginationNode: React.ReactNode = null
  if (mergedPagination) {
    paginationNode = (
      <div className={`${prefixCls}-pagination`}>
        <Pagination
          pageType="simple"
          disabled={globalDisabled}
          current={current}
          total={filteredRenderItems.length}
          pageSize={mergedPagination.pageSize}
          showQuickJumper={false}
          onChange={onPageChange}
        />
      </div>
    )
  }

  return (
    <>
      <ul className={classNames(`${prefixCls}-content`)}>
        {getItems().map(({ renderedEl, renderedText, item }: RenderedItem) => {
          const { disabled } = item
          const checked = selectedKeys.indexOf(item.key) >= 0
          return (
            <ListItem
              disabled={globalDisabled || disabled}
              key={item.key}
              item={item}
              renderedText={renderedText}
              renderedEl={renderedEl}
              checked={checked}
              prefixCls={prefixCls}
              onClick={onItemSelect}
              showRemove={showRemove}
              onRemove={onItemRemove}
            />
          )
        })}
      </ul>
      {paginationNode}
    </>
  )
}

export default ListBody
