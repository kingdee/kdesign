import { tuple } from '../_utils/type'

export const Modes = tuple('multiple', 'single')
export type Mode = typeof Modes[number]

export type SelectValue = string | string[] | number | number[] | IOptionsProps[] | null

export interface IAdvancedSelectorProps<T = SelectValue> {
  prefixCls?: string // 样式前缀
  className?: string // 样式名
  children?: React.ReactNode
  style?: React.CSSProperties // 内联样式
  disabled?: boolean // 禁用
  dropdownStyle?: React.CSSProperties // 下拉样式
  notFoundContent?: React.ReactNode // 列表为空时文本
  placeholder?: string // 选择框默认文字
  showFrequent?: boolean // 是否显示历史记录与我的收藏面板
  showCollectIcon?: boolean // 是否显示收藏按钮
  showDetailIcon?: boolean // 是否显示详情按钮
  suffixIcon?: React.ReactNode // 选择框后缀图标
  mode?: Mode // 模式
  value?: IOptionsProps[] | IOptionsProps // 指定选中的条目
  columns?: [] // 下拉列表的展示列
  options?: [] // 下拉列表的数据
  size?: number // 下拉列表显示数量
  optionLabelProp?: string // 回填到选择框的属性
  dropdownFooterRender?: React.ReactNode // 自定义下拉框footer内容
  visible?: boolean
  collectList?: [] // 收藏列表
  historyList?: [] // 我的历史
  loading?: boolean // 加载中状态
  searchField?: string // 搜索字段 默认 all（全部字段）
  onChange?: () => void // 选中option调用此函数
  onSearch?: (val: string) => void // input的value变化时调用
  onSelect?: (value: T extends (infer I)[] ? I : T, option: React.ReactElement<any>) => void
  onShowDetail?: (value: IOptionsProps[]) => void
  onShowMore?: () => void
  onCollect?: (flag: boolean, value: IOptionsProps) => void
}

export interface IIndxPosListProps {
  end: number
  start: number
}

export interface IColumnsProps {
  title?: string
  key: string
}

export interface IOptionsProps {
  value?: string | number
  label?: string
}

export interface ISearchInfoProps {
  searchValue?: string
  previousInputValue: string
  previousEditValue?: string
  searchIndex?: number
  selectionStart?: number
  deleteEndIndx: number
  editOptions?: any[]
}
