import { features } from '@kdcloudjs/table'
import { TableFilter, TablePipeline } from '../interface'

function useFilter(pipeline: TablePipeline, filter?: TableFilter) {
  if (filter) {
    pipeline.use(
      features.filter({
        ...filter,
      }),
    )
  }
}

export default useFilter
