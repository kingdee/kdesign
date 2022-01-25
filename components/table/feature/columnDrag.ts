import { features } from '@kdcloudjs/table'
import { TablePipeline } from '../interface'
import { ColumnDragOptions } from '@kdcloudjs/table/es/table/pipeline/features'
function useColumnDrag(pipeline: TablePipeline, columnDrag?: boolean | ColumnDragOptions) {
  if (columnDrag) {
    pipeline.use(features.columnDrag(columnDrag === true ? {} : columnDrag))
  }
}

export default useColumnDrag
