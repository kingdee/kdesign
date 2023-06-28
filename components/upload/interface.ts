import * as React from 'react'
import { ProgressProps } from '../progress'

export type UploadFileStatus = 'error' | 'success' | 'done' | 'uploading' | 'removed' | 'notStart'
export type UploadRequestMethod = 'POST' | 'PUT' | 'PATCH' | 'post' | 'put' | 'patch'

export type Action = string | ((file: UploadFile) => string) | ((file: UploadFile) => PromiseLike<string>)

export interface HttpRequestHeader {
  [key: string]: string
}

export interface UploadFile<T = any> extends File {
  uid: string
  size: number
  name: string
  type: string
  fileName?: string
  readonly lastModified: number
  readonly lastModifiedDate: Date
  webkitRelativePath: string
  url?: string
  status?: UploadFileStatus
  percent?: number
  thumbUrl?: string
  originFileObj?: File | Blob
  response?: T
  error?: any
  linkProps?: any
  xhr?: T
  preview?: string
}

export interface UploadChangeParam<T extends UploadFile> {
  file: T
  fileList: Array<UploadFile>
  event?: { percent: number }
}

export interface ShowUploadListInterface {
  showRemoveIcon?: boolean
  showPreviewIcon?: boolean
  showDownloadIcon?: boolean
  removeIcon?: React.ReactNode | ((file: UploadFile) => React.ReactNode)
  downloadIcon?: React.ReactNode | ((file: UploadFile) => React.ReactNode)
}

export interface UploadLocale {
  uploading?: string
  removeFile?: string
  downloadFile?: string
  uploadError?: string
  previewFile?: string
}

export type UploadType = 'drag' | 'select'
export type UploadListType = 'text' | 'picture'
export type UploadListProgressProps = Omit<ProgressProps, 'percent' | 'type'>

export type ItemRender<T = any> = (
  originNode: React.ReactElement,
  file: UploadFile,
  fileList?: Array<UploadFile<T>>,
) => React.ReactNode

type PreviewFileHandler = (file: File | Blob) => PromiseLike<string>
type TransformFileHandler = (file: UploadFile) => string | Blob | File | PromiseLike<string | Blob | File>

export interface UploadProps<T = any> {
  type?: UploadType
  name?: string
  defaultFileList?: Array<UploadFile<T>>
  fileList?: Array<UploadFile<T>>
  action?: Action
  directory?: boolean
  data?: Record<string, unknown> | ((file: UploadFile<T>) => Record<string, unknown>)
  method?: 'POST' | 'PUT' | 'PATCH' | 'post' | 'put' | 'patch'
  headers?: HttpRequestHeader
  showUploadList?: boolean | ShowUploadListInterface
  multiple?: boolean
  accept?: string
  beforeUpload?: (file: UploadFile, FileList: UploadFile[]) => boolean | Promise<void | Blob | File>
  onStart?: (file: UploadFile<T>) => void
  onChange?: (info: UploadChangeParam<UploadFile>) => void
  listType?: UploadListType
  className?: string
  onPreview?: (file: UploadFile<T>) => void
  onDownload?: (file: UploadFile<T>) => void
  onRemove?: (file: UploadFile<T>) => void | boolean | Promise<void | boolean>
  supportServerRender?: boolean
  style?: React.CSSProperties
  disabled?: boolean
  prefixCls?: string
  customRequest?: (options: UploadRequestOption) => void
  withCredentials?: boolean
  openFileDialogOnClick?: boolean
  locale?: UploadLocale
  id?: string
  previewFile?: PreviewFileHandler
  /** @deprecated Please use `beforeUpload` directly */
  transformFile?: TransformFileHandler
  iconRender?: (file: UploadFile<T>, listType?: UploadListType) => React.ReactNode
  isImageUrl?: (file: UploadFile) => boolean
  progress?: UploadListProgressProps
  itemRender?: ItemRender<T>
  onError?: (error: Error, ret: Record<string, unknown>, file: UploadFile) => void
  onSuccess?: (response: Record<string, unknown>, file: UploadFile, xhr: XMLHttpRequest) => void
  onProgress?: (event: UploadProgressEvent, file: UploadFile) => void
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void
  onClick?: (e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => void
}

export interface UploadState<T = any> {
  fileList: UploadFile<T>[]
  dragState: string
}

export interface UploadListProps<T = any> {
  listType?: UploadListType
  onPreview?: (file: UploadFile<T>) => void
  onDownload?: (file: UploadFile<T>) => void
  onRemove?: (file: UploadFile<T>) => void | boolean
  items?: Array<UploadFile<T>>
  progress?: UploadListProgressProps
  prefixCls?: string
  showRemoveIcon?: boolean
  showDownloadIcon?: boolean
  showPreviewIcon?: boolean
  removeIcon?: React.ReactNode | ((file: UploadFile) => React.ReactNode)
  downloadIcon?: React.ReactNode | ((file: UploadFile) => React.ReactNode)
  locale: UploadLocale
  previewFile?: PreviewFileHandler
  iconRender?: (file: UploadFile<T>, listType?: UploadListType) => React.ReactNode
  isImageUrl?: (file: UploadFile) => boolean
  appendAction?: React.ReactNode
  itemRender?: ItemRender<T>
}

export interface UploadRequestError extends Error {
  status?: number
  method?: UploadRequestMethod
  url?: string
}

export interface UploadProgressEvent extends ProgressEvent {
  percent: number
}

export interface UploadRequestOption<T = any> {
  onProgress?: (event: UploadProgressEvent) => void
  onError?: (event: UploadRequestError | ProgressEvent, body?: T) => void
  onSuccess?: (body: T, xhr: XMLHttpRequest) => void
  data?: Record<string, unknown>
  filename?: string
  file: UploadFile
  withCredentials?: boolean
  action: string
  headers?: HttpRequestHeader
  method: UploadRequestMethod
}

export interface IFileItem {
  file: UploadFile
  prefixCls: string
  listType: string
  disabled: boolean
  onPreview?: (file: UploadFile) => void
  handleReUpload: (file: UploadFile, e: React.MouseEvent) => void
  handleRemove: (file: UploadFile, e: React.MouseEvent) => void
}
