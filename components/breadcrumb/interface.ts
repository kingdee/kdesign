import { ReactNode } from 'react'
import { DropDownProps } from '../dropdown'
import { tuple } from '../_utils/type'

export const ColorModelTypes = tuple('emphasize', 'weaken')
export type ColorModelType = typeof ColorModelTypes[number]

export interface IBreadcrumbProps {
  style?: Record<string, unknown> // 内联样式
  className?: string // 类名
  colorModel?: ColorModelType // 颜色模式，默认是 'emphasize'
  prefixCls?: string // 样式前缀
  items: Array<IBreadcrumbItem> // 面包屑导航的各项，支持传入 ReactNode 类型
  separator?: ReactNode // 分隔符，默认是 '/'
  children?: ReactNode // 子元素
  onItemClick?: (item: IBreadcrumbItem, index: number) => void // 点击面包屑导航的回调函数
}

export interface IBreadcrumbItems {
  item: IBreadcrumbItem
  index: number
  separator?: ReactNode
  openEllipsis?: boolean
  onItemClick?: (item: IBreadcrumbItem, index: number) => void // 点击面包屑导航的回调函数
}

export interface IBreadcrumbItem {
  className?: string // 类名
  title?: ReactNode
  dropdownProps?: DropDownProps
  href?: string // 链接地址，不能和path共用
  path?: string // 拼接地址，不能和href共用
  icon?: ReactNode
}

export interface IItemsWidth {
  width: number
  index: number
}
