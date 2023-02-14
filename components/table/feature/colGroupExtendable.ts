import { features } from '@kdcloudjs/table'
import { colGroupExtendOption } from '@kdcloudjs/table/es/table/pipeline/features'
import { TablePipeline } from '../interface'

function colGroupExtendable(pipeline: TablePipeline, columnGroupExtend: colGroupExtendOption) {
  if (columnGroupExtend) {
    pipeline.use(features.colGroupExtendable(columnGroupExtend))
  }
}

export default colGroupExtendable
