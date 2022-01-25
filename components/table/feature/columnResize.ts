import { features } from '@kdcloudjs/table'
import { TablePipeline } from '../interface'
import { ColumnResizeOptions } from '@kdcloudjs/table/es/table/pipeline/features'
function useColumnResize(pipeline: TablePipeline, columnResize?: boolean | ColumnResizeOptions) {
  if (columnResize) {
    pipeline.use(features.columnResize(columnResize === true ? {} : columnResize))
  }
}

export default useColumnResize
