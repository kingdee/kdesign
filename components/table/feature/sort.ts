import { features } from '@kdcloudjs/table'
import { TableSort, TablePipeline } from '../interface'

function useSort(pipeline: TablePipeline, sort?: TableSort) {
  if (sort) {
    pipeline.use(
      features.sort({
        ...sort,
      }),
    )
  }
}

export default useSort
