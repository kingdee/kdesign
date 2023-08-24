import { collectNodes } from '@kdcloudjs/table/es/table/utils'
import { TablePipeline } from '@kdcloudjs/table'
import { TableApi } from './interface'
import { rangeSelectionKey } from '@kdcloudjs/table/es/table/pipeline/features/rangeSelection'

export default function getApi(pipelineRef: React.MutableRefObject<TablePipeline>) {
  function getColumns() {
    return pipelineRef.current.getColumns?.bind(pipelineRef.current)()
  }

  function getDataSource() {
    return pipelineRef.current.getDataSource?.bind(pipelineRef.current)()
  }

  function getFooterDataSource() {
    return pipelineRef.current.getFooterDataSource?.bind(pipelineRef.current)()
  }

  /**
   * 清除范围选中内容
   */
  function clearRangeSelection() {
    const pipeline = pipelineRef.current
    pipeline.setStateAtKey(rangeSelectionKey, null)
  }

  /**
   * 将目标行滚动到可视位置
   * @param rowIndex 行索引
   * @param position 目标行滚动到的位置，不传则根据目标行相对视口的位置滚动到底部或顶部，可取值为'top' | 'middle' | 'bottom'
   * @returns
   */
  function ensureRowIndexVisible(rowIndex: number, position?: string) {
    const pipeline = pipelineRef.current
    const { cache } = pipeline.ref?.current.rowHeightManager
    if (typeof rowIndex !== 'number' || rowIndex < 0 || rowIndex >= cache.length) {
      console.warn('invalid row index for ensureIndexVisible: ' + rowIndex)
      return
    }
    const tableBodyContainer = pipeline.ref?.current.domHelper.tableBody
    if (!tableBodyContainer) return
    let rowTopPixel = 0
    for (let i = 0; i < rowIndex; i++) {
      rowTopPixel += cache[i]
    }

    const rowBottomPixel = rowTopPixel + cache[rowIndex]
    const viewportHeight = tableBodyContainer.clientHeight

    const vScrollTop = tableBodyContainer.scrollTop
    const vScrollBottom = vScrollTop + viewportHeight

    const pxTop = rowTopPixel
    const pxBottom = rowBottomPixel - viewportHeight
    const pxMiddle = Math.min((pxTop + pxBottom) / 2, rowTopPixel)

    const rowBelowViewport = vScrollTop > rowTopPixel
    const rowAboveViewport = vScrollBottom < rowBottomPixel

    let newScrollPosition = null
    if (position === 'top') {
      newScrollPosition = pxTop
    } else if (position === 'bottom') {
      newScrollPosition = pxBottom
    } else if (position === 'middle') {
      newScrollPosition = pxMiddle
    } else if (rowBelowViewport) {
      // 目标行在视口之上，则向上滚动到顶部
      newScrollPosition = pxTop
    } else if (rowAboveViewport) {
      // 目标行在视口之下，则向下滚动到底部
      newScrollPosition = pxBottom
    }
    if (newScrollPosition !== null) {
      tableBodyContainer.scrollTop = newScrollPosition
    }
  }

  /**
   * 将目标列滚动到可视位置
   * @param code 列标识
   * @returns
   */
  function ensureColumnVisible(code: string) {
    const pipeline = pipelineRef.current
    const tableBodyContainer = pipeline.ref?.current.domHelper.tableBody
    const tableScroll = pipeline.ref?.current.domHelper.stickyScroll

    const columnNodes = collectNodes(pipeline.getColumns(), 'leaf-only')
    const column = columnNodes.find((col) => col.code === code)
    const index = columnNodes.findIndex((col) => col.code === code)
    // 固定列也不需要重置滚动条
    if (!column || !tableBodyContainer || column?.lock) return
    const colLeft = columnNodes.slice(0, index).reduce((acc, col) => {
      return acc + col.width
    }, 0)

    let lockColumnLeft = 0
    let lockColumnRight = 0

    for (let i = 0; i < columnNodes.length; i++) {
      if (columnNodes[i]?.lock) {
        lockColumnLeft += columnNodes[i].width
      } else {
        break
      }
    }

    for (let i = columnNodes.length - 1; i >= 0; i--) {
      if (columnNodes[i]?.lock) {
        lockColumnRight += columnNodes[i].width
      } else {
        break
      }
    }

    const colLeftPixel = colLeft // 目标列前面列宽总和
    const colRightPixel = colLeftPixel + column.width

    const viewportWidth = tableBodyContainer.clientWidth // 表体容器的宽度
    const scrollPosition = tableScroll.scrollLeft // 滚动条滚动的距离

    const vScrollLeft = scrollPosition
    const vScrollRight = scrollPosition + viewportWidth

    const pxLeft = colLeftPixel - lockColumnLeft
    const pxRight = colRightPixel - viewportWidth + lockColumnRight

    const colBeforeViewport = vScrollLeft > colLeftPixel // 滚动距离大于目标列前面列宽总和，说明目标列在视口之前
    const colPastViewport = vScrollRight < colRightPixel // 目标列是视口之后

    const colToSmallForViewport = viewportWidth < column.width
    const alignColToLeft = colBeforeViewport || colToSmallForViewport
    const alignColToRight = colPastViewport

    if (alignColToLeft || alignColToRight) {
      const newScrollPosition = alignColToLeft ? pxLeft : pxRight
      tableScroll.scrollLeft = newScrollPosition
    }
  }

  function getHeightCache() {
    const pipeline = pipelineRef.current
    return pipeline.ref?.current.rowHeightManager.cache
  }

  return {
    getColumns,
    getDataSource,
    getFooterDataSource,
    clearRangeSelection,
    ensureRowIndexVisible,
    ensureColumnVisible,
    getHeightCache,
  } as TableApi
}
