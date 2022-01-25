import { features } from '@kdcloudjs/table'
import { TableRowDetail, TablePipeline } from '../interface'

function useRowDetail(pipeline: TablePipeline, rowDetail?: TableRowDetail) {
  if (rowDetail) {
    pipeline.use(
      features.rowDetail({
        ...rowDetail,
      }),
    )
  }
}

export default useRowDetail
