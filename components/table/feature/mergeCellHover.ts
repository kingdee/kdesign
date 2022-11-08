import { features } from '@kdcloudjs/table'
import { TablePipeline } from '../interface'

function mergeCellHover(pipeline: TablePipeline) {
  pipeline.use(features.mergeCellHover())
}

export default mergeCellHover
