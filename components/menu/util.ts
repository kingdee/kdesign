import isArray from 'lodash/isArray'
import * as React from 'react'
import { toArray } from '../_utils/react-children'

const DEFAULT_ITEM_WIDTH = 160
const DEFAULT_MAX_WIDTH = 800
const DEFAULT_MARGIN_WIDTH = 40
const DEFAULT_ITEM_NUM = 5

export const isString = (value: any): boolean => {
  return typeof value === 'string'
}

export const isNumber = (value: any): boolean => {
  return typeof value === 'number'
}

export const getColumnWidthList = (nodeList: React.ReactElement): number[] => {
  if (!nodeList) return []

  const columnWidthList: number[] = []

  toArray(nodeList).map((item: React.ReactElement) => {
    if (!item || isString(item) || isNumber(item)) return item

    const width = getItemWidth(item.props.children)
    columnWidthList.push(width)

    return item
  })

  return columnWidthList
}

// 计算外层面板的总宽度 DEFAULT_MAX_WIDTH: 824px, 最多四列（790px），
// 每列160px+40px
// 其中160px是width,40px是marginRight
export const getWrapWidth = (nodelist: React.ReactElement): number => {
  let wrapWidth = 0
  let totalWidth = 0

  const columnWidthList = getColumnWidthList(nodelist)

  columnWidthList.map((width: number) => {
    totalWidth += width + DEFAULT_MARGIN_WIDTH

    if (totalWidth < DEFAULT_MAX_WIDTH) {
      wrapWidth = totalWidth
    } else {
      wrapWidth = DEFAULT_MAX_WIDTH
    }

    return width
  })
  return wrapWidth + 10
}

// 计算子项的宽度
export const getItemWidth = (children: React.ReactElement): number => {
  if (!isArray(children)) {
    return DEFAULT_ITEM_WIDTH
  }

  if (!children || children.length <= DEFAULT_ITEM_NUM) {
    return DEFAULT_ITEM_WIDTH
  } else {
    const width: number =
      (DEFAULT_ITEM_WIDTH + DEFAULT_MARGIN_WIDTH) * Math.ceil(children.length / DEFAULT_ITEM_NUM) - DEFAULT_MARGIN_WIDTH
    return width > DEFAULT_MAX_WIDTH ? DEFAULT_MAX_WIDTH : width
  }
}

export const renderReactNodeFunction = (reactNode: React.ReactNode) => {
  if (typeof reactNode === 'function') {
    return reactNode()
  }
  return reactNode
}

export const isElementInViewport = (el: any) => {
  const rect = el.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

export const DEFAUTL_PADDING = 15
