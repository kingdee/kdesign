import { features } from '@kdcloudjs/table'
import { TablePipeline, IContextMenu } from '../interface'

function useContextMenu(pipeline: TablePipeline, contextMenu?: IContextMenu) {
  if (contextMenu) {
    pipeline.use(features.contextMenu(contextMenu === true ? {} : contextMenu))
  }
}

export default useContextMenu
