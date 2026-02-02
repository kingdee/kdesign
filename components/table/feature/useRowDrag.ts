import { features } from '@kdcloudjs/table'
import { TableRowDrag, TablePipeline } from '../interface'

function useRowDrag(pipeline: TablePipeline, rowDrag?: TableRowDrag, estimatedRowHeight?: number) {
  if (rowDrag) {
    pipeline.use(
      features.rowDrag({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        rowHeight: estimatedRowHeight as number | undefined,
        ...rowDrag,
      }),
    )
  }
}

export default useRowDrag
