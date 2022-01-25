import { features } from '@kdcloudjs/table'
import { TableTreeMode, TablePipeline } from '../interface'

function useTreeMode(pipeline: TablePipeline, treeMode?: TableTreeMode) {
  if (treeMode) {
    pipeline.use(
      features.treeMode({
        ...treeMode,
      }),
    )
  }
}

export default useTreeMode
