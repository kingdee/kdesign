import { features } from '@kdcloudjs/table'
import { TablePipeline } from '../interface'

function useAutoRowSpan(pipeline: TablePipeline, autoRowSpan?: boolean) {
  if (autoRowSpan) {
    pipeline.use(features.autoRowSpan())
  }
}

export default useAutoRowSpan
