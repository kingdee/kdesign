import { features } from '@kdcloudjs/table'
import { TableRowDrag, TablePipeline } from '../interface'

function useRowDrag(pipeline: TablePipeline, rowDrag?: TableRowDrag, estimatedRowHeight?: number) {
  if (rowDrag) {
    pipeline.use(
      features.rowDrag({
        rowHeight: estimatedRowHeight,
        ...rowDrag,
      }),
    )
  }
}

export default useRowDrag