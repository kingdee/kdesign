import { features } from '@kdcloudjs/table'
import { TableRowDrag, TablePipeline } from '../interface'

function useRowDrag(pipeline: TablePipeline, rowDrag?: TableRowDrag) {
  if (rowDrag) {
    pipeline.use(
      features.rowDrag({
        ...rowDrag,
      }),
    )
  }
}

export default useRowDrag
