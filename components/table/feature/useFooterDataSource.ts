import { features } from '@kdcloudjs/table'
import { TablePipeline } from '../interface'

function useFooterDataSource(pipeline: TablePipeline, footerDataSource: any[] | undefined) {
  if (footerDataSource) {
    pipeline.use(
      features.footerDataSource({
        dataSource: footerDataSource,
      }),
    )
  }
}

export default useFooterDataSource
