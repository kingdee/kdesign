export type TransferDirection = 'left' | 'right'

export interface RenderResultObject {
  label: React.ReactElement | string | null | undefined
  value: string
}

export type RenderResult = React.ReactElement | RenderResultObject | string | null | undefined

export interface TransferItem {
  key: string
  title: string
  description?: string
  disabled?: boolean
  [name: string]: any
}

export type TransferRender = (item: TransferItem) => RenderResult

export interface TransferRenderParam {
  direction: TransferDirection
}

export type PaginationType =
  | boolean
  | {
      pageSize?: number
    }
