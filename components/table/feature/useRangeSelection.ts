import { features } from '@kdcloudjs/table'
import { TableRangeSelection, TablePipeline } from '../interface'

function useRangeSelection(pipeline: TablePipeline, rangeSelection?: TableRangeSelection) {
  if (rangeSelection) {
    pipeline.use(
      features.rangeSelection({
        ...rangeSelection,
      }),
    )
  }
}

export default useRangeSelection
