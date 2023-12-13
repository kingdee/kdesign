import { TableProps as BaseTableProps, TablePipeline as TP, ArtColumnStaticPart } from '@kdcloudjs/table'
import {
  SortFeatureOptions,
  RowDetailFeatureOptions,
  FilterFeatureOptions,
  TreeModeFeatureOptions,
  ColumnDragOptions,
  ColumnResizeOptions,
  ContextMenuFeatureOptions,
  RangeSelectionFeatureOptions,
  colGroupExtendOption,
  RowDragFeatureOptions,
} from '@kdcloudjs/table/es/table/pipeline/features'

type TablePropsOfComponents = Pick<BaseTableProps, 'components'> & {
  components?: {
    /** 复选框 */
    Checkbox?: React.ComponentType
    /** 单选框 */
    Radio?: React.ComponentType
  }
}

type TablePropsOfExtend = Omit<BaseTableProps, 'components'>

export type TableApi = {
  getColumns: () => any[]
  getDataSource: () => any[]
  getFooterDataSource: () => any[]
  clearRangeSelection: () => void
  getHeightCache: () => number[]
  ensureRowIndexVisible: (rowIndex: number, position?: string | undefined) => void
  ensureColumnVisible: (code: string) => void
}

export type TableInstance = {
  api: TableApi
}

export interface TableProps extends TablePropsOfExtend, TablePropsOfComponents {
  rowSelection?: TableRowSelection
  prefixCls?: string
  rowDetail?: TableRowDetail
  filter?: TableFilter
  sort?: TableSort
  treeMode?: TableTreeMode
  autoRowSpan?: boolean
  columnDrag?: boolean | ColumnDragOptions
  columnResize?: boolean | ColumnResizeOptions
  contextMenu?: IContextMenu
  rangeSelection?: TableRangeSelection
  columnGroupExtend?: colGroupExtendOption
  rowDrag?: TableRowDrag
}

export type RowSelectionType = 'checkbox' | 'radio'
export type RowSelectionFixed = 'start' | 'end'
export type RowSelectionClickArea = 'self' | 'cell' | 'row'

export interface TableRowSelection {
  defaultValue?: string[] // 非受控用法：默认选中的值
  value?: string[] // 受控用法：当前选中的 keys
  type?: RowSelectionType // 选择类型
  clickArea?: RowSelectionClickArea // 点击触发的范围
  stopClickEventPropagation?: boolean // 是否对触发 onChange 的 click 事件调用 event.stopPropagation()
  fixed?: RowSelectionFixed // 复选框所在列的位置 对应 placement
  column?: Partial<ArtColumnStaticPart> // 选择列的 column 配置，可指定 width，lock, title, align, features 等属性 对应 checkboxColumn、radioColumn
  onChange?: (selectedRowKeys: string[], actionRowkey?: string, actionRowskeys?: string[], action?: string) => void
  isDisabled?(row: any, rowIndex: number): boolean // 判断一行中的是否要禁用
  highlightRowWhenSelected?: boolean // 是否高亮选中行
}

export type TableRowDetail = RowDetailFeatureOptions

export type TableFilter = FilterFeatureOptions

export type TableSort = SortFeatureOptions

export type TableTreeMode = TreeModeFeatureOptions

export type TablePipeline = TP

export type IContextMenu = boolean | ContextMenuFeatureOptions

export type TableRangeSelection = RangeSelectionFeatureOptions

export type TableRowDrag = RowDragFeatureOptions
