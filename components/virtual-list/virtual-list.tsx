// Reference: https://github.com/arco-design/arco-design/blob/main/components/_class/VirtualList/index.tsx
import React, {
  useEffect,
  useImperativeHandle,
  useRef,
  useMemo,
  useState,
  ReactNode,
  CSSProperties,
  useLayoutEffect,
} from 'react'
import {
  Key,
  getValidScrollTop,
  getCompareItemRelativeTop,
  getItemAbsoluteTop,
  getItemRelativeTop,
  getNodeHeight,
  getRangeIndex,
  getScrollPercentage,
  GHOST_ITEM_KEY,
  getLongestItemIndex,
  getLocationItem,
} from './utils/itemUtil'
import { raf, caf } from '../_utils/raf'
import { usePrevious, useIsFirstRender, useForceUpdate, useStateWithPromise } from '../_utils/hooks'
import { findListDiffIndex, getIndexByStartLoc } from './utils/algorithmUtil'
import Filler from './Filler'
import ResizeObserver from '../_utils/resizeObserver'

export function isNumber(obj: any): obj is number {
  return Object.prototype.toString.call(obj) === '[object Number]' && obj === obj // eslint-disable-line
}

export type RenderFunc<T> = (item: T, index: number, props: { style: React.CSSProperties }) => ReactNode

type Status = 'NONE' | 'MEASURE_START' | 'MEASURE_DONE'

export interface VirtualListProps<T> extends Omit<React.HTMLAttributes<any>, 'children'> {
  children: RenderFunc<T>
  data: T[]
  height?: number | string
  itemHeight?: number
  wrapper?: string | React.FC<any> | React.ComponentClass<any>
  threshold?: number | null
  isStaticItemHeight?: boolean
  itemKey?: Key | ((item: T, index: number) => Key)
  measureLongestItem?: boolean
  scrollOptions?: ScrollIntoViewOptions
  needFiller?: boolean
  outerStyle?: CSSProperties
  innerStyle?: CSSProperties
  onScroll?: React.UIEventHandler<HTMLElement>
}

export type AvailableVirtualListProps = Pick<
  VirtualListProps<any>,
  'height' | 'itemHeight' | 'threshold' | 'isStaticItemHeight' | 'scrollOptions'
>

interface RelativeScroll {
  itemIndex: number
  relativeTop: number
}

interface VirtualListState {
  status: Status
  startIndex: number
  endIndex: number
  itemIndex: number
  itemOffsetPtg: number
  startItemTop: number
  scrollTop: number
}

export type VirtualListHandle = {
  dom: HTMLElement
  scrollTo: (
    arg:
      | number
      | {
          index: number
          options?: ScrollIntoViewOptions
        }
      | {
          key: Key
          options?: ScrollIntoViewOptions
        },
  ) => void
}

type ItemHeightMap = { [p: string]: number }

const DEFAULT_VIRTUAL_ITEM_HEIGHT = 32
const KEY_VIRTUAL_ITEM_HEIGHT = `__virtual_item_height_${Math.random().toFixed(5).slice(2)}`

const useComputeVirtualItemHeight = (refItemHeightMap: React.MutableRefObject<ItemHeightMap>) => {
  const forceUpdate = useForceUpdate()
  const { current: heightMap } = refItemHeightMap

  useEffect(() => {
    if (Object.keys(heightMap).length && !heightMap[KEY_VIRTUAL_ITEM_HEIGHT]) {
      heightMap[KEY_VIRTUAL_ITEM_HEIGHT] = Object.entries(heightMap).reduce(
        (sum, [, currentHeight], currentIndex, array) => {
          const nextSum = sum + currentHeight
          return currentIndex === array.length - 1 ? Math.round(nextSum / array.length) : nextSum
        },
        0,
      )
      forceUpdate()
    }
  }, [Object.keys(heightMap).length])
}

const useCacheChildrenNodes = (children: VirtualListProps<any>['children']) => {
  const refCacheMap = useRef<{ [key: number]: ReactNode }>({})
  const refPrevChildren = useRef(children)

  useEffect(() => {
    refPrevChildren.current = children
  }, [children])

  if (children !== refPrevChildren.current) {
    refCacheMap.current = {}
  }

  return (item: any[], index: number, props: { style: React.CSSProperties }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (!refCacheMap.current.hasOwnProperty(index)) {
      refCacheMap.current[index] = children(item, index, props)
    }
    return refCacheMap.current[index]
  }
}

const VirtualList: React.ForwardRefExoticComponent<VirtualListProps<any> & React.RefAttributes<VirtualListHandle>> =
  React.forwardRef((props: VirtualListProps<any>, ref) => {
    const {
      style,
      className,
      children,
      data = [],
      itemKey,
      threshold = 100,
      wrapper: WrapperTagName = 'div',
      height: propHeight = '100%',
      isStaticItemHeight = true,
      itemHeight: propItemHeight,
      measureLongestItem,
      scrollOptions,
      onScroll,
      needFiller = true,
      outerStyle,
      innerStyle,
      ...restProps
    } = props

    const styleListMaxHeight = (style && style.maxHeight) || propHeight

    const refItemHeightMap = useRef<ItemHeightMap>({})
    const [stateHeight, setStateHeight] = useState(200)
    const renderChild = useCacheChildrenNodes(children)

    useComputeVirtualItemHeight(refItemHeightMap)

    const itemCount = data.length
    const itemHeight =
      propItemHeight || refItemHeightMap.current[KEY_VIRTUAL_ITEM_HEIGHT] || DEFAULT_VIRTUAL_ITEM_HEIGHT
    const viewportHeight = isNumber(styleListMaxHeight) ? styleListMaxHeight : stateHeight
    const itemCountVisible = Math.ceil(viewportHeight / itemHeight)
    const itemTotalHeight = itemHeight * itemCount
    const isVirtual = threshold !== null && itemCount >= threshold && itemTotalHeight > viewportHeight

    const refList = useRef<any>(null)
    const refRafId = useRef(null)
    const refLockScroll = useRef(false)
    const refIsVirtual = useRef(isVirtual)

    const scrollListPadding = useMemo<{ top: number; bottom: number }>(() => {
      if (refList.current) {
        const getPadding = (property: any) => +window.getComputedStyle(refList.current)[property].replace(/\D/g, '')
        return {
          top: getPadding('paddingTop'),
          bottom: getPadding('paddingBottom'),
        }
      }

      return { top: 0, bottom: 0 }
    }, [refList.current])

    const [state, setState] = useStateWithPromise<VirtualListState>({
      status: 'NONE',
      startIndex: 0,
      endIndex: 0,
      itemIndex: 0,
      itemOffsetPtg: 0,
      startItemTop: 0,
      scrollTop: 0,
    })

    const prevData = usePrevious(data) || []
    const isFirstRender = useIsFirstRender()

    const getItemKey = (item: any, index: number) => {
      return typeof itemKey === 'function'
        ? itemKey(item, index)
        : typeof itemKey === 'string'
        ? item[itemKey]
        : item.key || index
    }

    const getItemKeyByIndex = (index: number, items = data) => {
      if (index === items.length) {
        return GHOST_ITEM_KEY
      }
      const item = items[index]
      return item !== undefined ? getItemKey(item, index) : null
    }

    const getCachedItemHeight = (key: Key): number => {
      return refItemHeightMap.current[key] || itemHeight
    }

    const internalScrollTo = (relativeScroll: RelativeScroll): void => {
      const { itemIndex: compareItemIndex, relativeTop: compareItemRelativeTop } = relativeScroll
      if (!refList.current) return
      const { scrollHeight, clientHeight } = refList.current
      const originScrollTop = state.scrollTop
      const maxScrollTop = scrollHeight - clientHeight

      let bestSimilarity = Number.MAX_VALUE
      let bestScrollTop: number | null = null
      let bestItemIndex: number | null = null
      let bestItemOffsetPtg: number | null = null
      let bestStartIndex: number | null = null
      let bestEndIndex: number | null = null
      let missSimilarity = 0

      for (let i = 0; i < maxScrollTop; i++) {
        const scrollTop = getIndexByStartLoc(0, maxScrollTop, originScrollTop, i)
        const scrollPtg = getScrollPercentage({ scrollTop, scrollHeight, clientHeight })
        const { itemIndex, itemOffsetPtg, startIndex, endIndex } = getRangeIndex(scrollPtg, itemCount, itemCountVisible)

        if (startIndex <= compareItemIndex && compareItemIndex <= endIndex) {
          const locatedItemRelativeTop = getItemRelativeTop({
            itemHeight: getCachedItemHeight(getItemKeyByIndex(itemIndex)),
            itemOffsetPtg,
            clientHeight,
            scrollPtg,
          })

          const compareItemTop = getCompareItemRelativeTop({
            locatedItemRelativeTop,
            locatedItemIndex: itemIndex,
            compareItemIndex,
            startIndex,
            endIndex,
            itemHeight,
            getItemKey: getItemKeyByIndex,
            itemElementHeights: refItemHeightMap.current,
          })

          const similarity = Math.abs(compareItemTop - compareItemRelativeTop)
          if (similarity < bestSimilarity) {
            bestSimilarity = similarity
            bestScrollTop = scrollTop
            bestItemIndex = itemIndex
            bestItemOffsetPtg = itemOffsetPtg
            bestStartIndex = startIndex
            bestEndIndex = endIndex

            missSimilarity = 0
          } else {
            missSimilarity += 1
          }
        }

        if (missSimilarity > 10) {
          break
        }
      }

      if (bestScrollTop !== null) {
        refLockScroll.current = true
        refList.current.scrollTop = bestScrollTop

        setState({
          ...state,
          status: 'MEASURE_START',
          scrollTop: bestScrollTop,
          itemIndex: bestItemIndex,
          itemOffsetPtg: bestItemOffsetPtg,
          startIndex: bestStartIndex,
          endIndex: bestEndIndex,
        })
      }

      refRafId.current = raf(() => {
        refLockScroll.current = false
      })
    }

    const rawListScrollHandler = (event: React.UIEvent<HTMLElement, UIEvent>) => {
      if (!refList.current) return
      const { scrollTop: rawScrollTop, clientHeight, scrollHeight } = refList.current
      const scrollTop = getValidScrollTop(rawScrollTop, scrollHeight - clientHeight)

      const scrollPtg = getScrollPercentage({
        scrollTop,
        clientHeight,
        scrollHeight,
      })

      const { index, offsetPtg } = getLocationItem(scrollPtg, itemCount)

      setState({
        ...state,
        scrollTop,
        itemIndex: index,
        itemOffsetPtg: offsetPtg,
      })

      event && onScroll && onScroll(event)
    }

    const virtualListScrollHandler = (event: React.UIEvent<HTMLElement, UIEvent> | null, isInit = false) => {
      const scrollHeight = itemTotalHeight
      if (!refList.current) return
      const { scrollTop: rawScrollTop, clientHeight } = refList.current
      const scrollTop = getValidScrollTop(rawScrollTop, scrollHeight - clientHeight)

      if (!isInit && (scrollTop === state.scrollTop || refLockScroll.current)) {
        return
      }

      const scrollPtg = getScrollPercentage({
        scrollTop,
        clientHeight,
        scrollHeight,
      })
      const { itemIndex, itemOffsetPtg, startIndex, endIndex } = getRangeIndex(scrollPtg, itemCount, itemCountVisible)

      setState({
        ...state,
        scrollTop,
        itemIndex,
        itemOffsetPtg,
        startIndex,
        endIndex,
        status: 'MEASURE_START',
      })

      event && onScroll && onScroll(event)
    }

    useEffect(() => {
      return () => {
        refRafId.current && caf(refRafId.current)
      }
    }, [])

    useEffect(() => {
      if (refList.current) {
        if (isFirstRender) {
          refList.current.scrollTop = 0
        }
        virtualListScrollHandler(null, true)
      }
    }, [itemCountVisible])

    useEffect(() => {
      let changedItemIndex: number | null = null
      const switchTo = refIsVirtual.current !== isVirtual ? (isVirtual ? 'virtual' : 'raw') : ''

      refIsVirtual.current = isVirtual

      if (viewportHeight && prevData.length !== data.length) {
        const diff = findListDiffIndex(prevData, data, getItemKey)
        changedItemIndex = diff ? diff.index : null
      }

      if ((switchTo || (isVirtual && changedItemIndex)) && refList.current) {
        const { clientHeight } = refList.current
        const locatedItemRelativeTop = getItemRelativeTop({
          itemHeight: getCachedItemHeight(getItemKeyByIndex(state.itemIndex, prevData)),
          itemOffsetPtg: state.itemOffsetPtg,
          scrollPtg: getScrollPercentage({
            scrollTop: state.scrollTop,
            scrollHeight: prevData.length * itemHeight,
            clientHeight,
          }),
          clientHeight,
        })

        if (switchTo === 'raw') {
          let rawTop = locatedItemRelativeTop
          for (let index = 0; index < state.itemIndex; index++) {
            rawTop -= getCachedItemHeight(getItemKeyByIndex(index))
          }

          refList.current.scrollTop = -rawTop
          refLockScroll.current = true
          refRafId.current = raf(() => {
            refLockScroll.current = false
          })
        } else {
          internalScrollTo({
            itemIndex: state.itemIndex,
            relativeTop: locatedItemRelativeTop,
          })
        }
      }
    }, [data, isVirtual])

    useLayoutEffect(() => {
      if (state.status === 'MEASURE_START' && refList.current) {
        const { scrollTop, scrollHeight, clientHeight } = refList.current
        const scrollPtg = getScrollPercentage({
          scrollTop,
          scrollHeight,
          clientHeight,
        })

        let startItemTop = getItemAbsoluteTop({
          scrollPtg,
          clientHeight,
          scrollTop: scrollTop - (scrollListPadding.top + scrollListPadding.bottom) * scrollPtg,
          itemHeight: getCachedItemHeight(getItemKeyByIndex(state.itemIndex)),
          itemOffsetPtg: state.itemOffsetPtg,
        })
        for (let index = state.itemIndex - 1; index >= state.startIndex; index--) {
          startItemTop -= getCachedItemHeight(getItemKeyByIndex(index))
        }

        setState({
          ...state,
          startItemTop,
          status: 'MEASURE_DONE',
        })
      }
    }, [state])

    useImperativeHandle<any, VirtualListHandle>(
      ref,
      () => ({
        dom: refList.current,
        scrollTo: (arg) => {
          refRafId.current && caf(refRafId.current)
          refRafId.current = raf(() => {
            if (typeof arg === 'number') {
              refList.current.scrollTop = arg
              return
            }

            const index =
              'index' in arg
                ? arg.index
                : 'key' in arg
                ? data.findIndex((item, index) => getItemKey(item, index) === arg.key)
                : 0
            const item = data[index]

            if (!item) {
              return
            }

            let align: ScrollIntoViewOptions['block'] =
              typeof arg === 'object' && arg.options?.block ? arg.options.block : scrollOptions?.block || 'nearest'
            const { clientHeight, scrollTop } = refList.current

            if (isVirtual && !isStaticItemHeight) {
              if (align === 'nearest') {
                const { itemIndex, itemOffsetPtg } = state
                if (Math.abs(itemIndex - index) < itemCountVisible) {
                  let itemTop = getItemRelativeTop({
                    itemHeight: getCachedItemHeight(getItemKeyByIndex(itemIndex)),
                    itemOffsetPtg,
                    clientHeight,
                    scrollPtg: getScrollPercentage(refList.current),
                  })

                  if (index < itemIndex) {
                    for (let i = index; i < itemIndex; i++) {
                      itemTop -= getCachedItemHeight(getItemKeyByIndex(i))
                    }
                  } else {
                    for (let i = itemIndex; i < index; i++) {
                      itemTop += getCachedItemHeight(getItemKeyByIndex(i))
                    }
                  }

                  if (itemTop < 0 || itemTop > clientHeight) {
                    align = itemTop < 0 ? 'start' : 'end'
                  } else {
                    return
                  }
                } else {
                  align = index < itemIndex ? 'start' : 'end'
                }
              }

              setState({
                ...state,
                startIndex: Math.max(0, index - itemCountVisible),
                endIndex: Math.min(itemCount - 1, index + itemCountVisible),
              }).then(() => {
                const itemHeight = getCachedItemHeight(getItemKey(item, index))
                internalScrollTo({
                  itemIndex: index,
                  relativeTop: align === 'start' ? 0 : (clientHeight - itemHeight) / (align === 'center' ? 2 : 1),
                })
              })
            } else {
              const indexItemHeight = getCachedItemHeight(getItemKeyByIndex(index))
              let itemTop = 0
              for (let i = 0; i < index; i++) {
                itemTop += getCachedItemHeight(getItemKeyByIndex(i))
              }
              const itemBottom = itemTop + indexItemHeight
              const itemMiddle = itemTop + indexItemHeight / 2

              if (itemMiddle > scrollTop && itemMiddle < clientHeight + scrollTop) {
                return
              }

              if (align === 'nearest') {
                if (itemTop < scrollTop) {
                  align = 'start'
                } else if (itemBottom > scrollTop + clientHeight) {
                  align = 'end'
                }
              }

              const viewportHeight = clientHeight - indexItemHeight
              refList.current.scrollTop =
                itemTop - (align === 'start' ? 0 : viewportHeight / (align === 'center' ? 2 : 1))
            }
          })
        },
      }),
      [data, itemHeight, state],
    )

    const renderChildren = (list: any[], startIndex: number) => {
      return list.map((item, index) => {
        const originIndex = startIndex + index
        const node = renderChild(item, originIndex, {
          style: {},
        }) as React.ReactElement
        const key = getItemKey(item, originIndex)
        return React.cloneElement(node, {
          key,
          ref: (ele: HTMLElement) => {
            const { current: heightMap } = refItemHeightMap
            if (ele && state.status === 'MEASURE_START' && (!isStaticItemHeight || heightMap[key] === undefined)) {
              if (isStaticItemHeight) {
                if (!heightMap[KEY_VIRTUAL_ITEM_HEIGHT]) {
                  heightMap[KEY_VIRTUAL_ITEM_HEIGHT] = getNodeHeight(ele, true)
                }
                heightMap[key] = heightMap[KEY_VIRTUAL_ITEM_HEIGHT]
              } else {
                heightMap[key] = getNodeHeight(ele, true)
              }
            }
          },
        })
      })
    }

    const refLongestItemIndex = useRef<any>(null)

    useEffect(() => {
      refLongestItemIndex.current = null
    }, [data])

    const renderLongestItem = () => {
      if (measureLongestItem) {
        const index = refLongestItemIndex.current === null ? getLongestItemIndex(data) : refLongestItemIndex.current
        const item = data[index]

        refLongestItemIndex.current = index

        return item ? (
          <div style={{ height: 1, overflow: 'hidden', opacity: 0 }}>{renderChild(item, index, { style: {} })}</div>
        ) : null
      }
      return null
    }

    return (
      <ResizeObserver
        onResize={() => {
          if (refList.current && !isNumber(styleListMaxHeight)) {
            const { clientHeight } = refList.current
            setStateHeight(clientHeight)
          }
        }}
      >
        <WrapperTagName
          ref={refList}
          style={{
            overflowY: 'auto',
            overflowAnchor: 'none',
            ...style,
            maxHeight: styleListMaxHeight,
          }}
          className={className}
          onScroll={isVirtual ? virtualListScrollHandler : rawListScrollHandler}
          {...restProps}
        >
          {isVirtual ? (
            <>
              <Filler
                height={itemTotalHeight}
                offset={state.status === 'MEASURE_DONE' ? state.startItemTop : 0}
                outerStyle={outerStyle}
                innerStyle={innerStyle}
              >
                {renderChildren(data.slice(state.startIndex, state.endIndex + 1), state.startIndex)}
              </Filler>
              {renderLongestItem()}
            </>
          ) : needFiller ? (
            <Filler height={viewportHeight}>{renderChildren(data, 0)}</Filler>
          ) : (
            renderChildren(data, 0)
          )}
        </WrapperTagName>
      </ResizeObserver>
    )
  })

VirtualList.displayName = 'VirtualList'

export default VirtualList
