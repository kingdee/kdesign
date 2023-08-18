import React, { useContext, ReactNode, useCallback, useEffect } from 'react'
import classNames from 'classnames'
import cloneDeep from 'lodash/cloneDeep'
import ConfigContext from '../config-provider/ConfigContext'
import { getCompProps } from '../_utils'
import TreeNode from './treeNode'
import VirtualList, { VirtualListHandle } from '../virtual-list'
import {
  getChecked,
  getHalfChecked,
  addKeys,
  flattenAll,
  delKey,
  getFilterData,
  getSpreadAttrData,
  getAllCheckedKeys,
  getDataCheckededStateStrictly,
  getAllChildKeys,
  getPos,
  calcDropPosition,
} from './utils/treeUtils'
import { useChecked, useExpand, useSelect } from './treeHooks'
import isBoolean from 'lodash/isBoolean'

export interface TreeProps {
  checkable?: boolean
  checkedKeys?: string[]
  checkStrictly?: boolean
  defaultCheckedKeys?: string[]
  defaultExpandAll?: boolean
  defaultExpandRoot?: boolean
  defaultExpandParent?: boolean
  defaultExpandedKeys?: string[]
  defaultSelectedKeys?: string[]
  disabled?: boolean
  draggable?: boolean
  expandedKeys?: string[]
  filterValue?: string
  filterTreeNode?: () => boolean
  height?: number
  icon?: ReactNode | ((props: any) => ReactNode)
  switcherIcon?: ReactNode | ((props: any) => ReactNode) | [ReactNode | ((props: any) => ReactNode)]
  showLine?: boolean | { showLeafIcon: boolean }
  treeData?: TreeNodeData[]
  virtual?: boolean
  scrollToKey?: string
  selectedKeys?: string[]
  notFoundContent?: ReactNode
  loadData?: () => void
  onCheck?: (checkedKeys: string[], { checked, node, event, halfCheckedKeys }: any) => void
  onExpand?: (expandedKeys: string[], { expanded, node }: any) => void
  onSelect?: (keys: string[], { checked, node, event }: any) => void
  onDragStart?: ({ event, node }: any) => void
  onDragOver?: ({ event, node }: any) => void
  onDragLeave?: ({ event, node }: any) => void
  onDragEnter?: ({ event, node }: any) => void
  onDragEnd?: ({ event, node }: any) => void
  onDrop?: ({ event, node, dragNode, dragNodesKeys }: any) => void
  setTreeNodeClassName?: (node: any) => string
  setTreeNodeStyle?: (node: any) => Map<string, string>
  estimatedItemSize?: number
  expandOnClickNode?: boolean
  onlyExpandOnClickIcon?: boolean
  showIcon?: boolean
  style?: React.CSSProperties
  className?: string
}

export type TreeNodeData = {
  checkable?: boolean
  expand?: boolean
  key: string
  level?: number
  title?: string
  disabled?: boolean
  draggable?: boolean
  checked?: boolean
  pos?: string
  hasChildNode?: boolean
  children?: TreeNodeData[]
  indeterminate?: boolean
  icon?: ReactNode | ((props: any) => ReactNode)
  showLine?: boolean
  showIcon?: boolean
  selectable?: boolean
}

export type KeysDataType = {
  [key: string]: TreeNodeData & { pathParentKeys: string[] }
}

export type PosDataType = {
  [key: string]: TreeNodeData
}

const InternalTree = React.forwardRef((props: TreeProps, ref: any): React.FunctionComponentElement<TreeProps> => {
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps } = useContext(ConfigContext)

  const TreeProps = getCompProps('Tree', userDefaultProps, props) // 按钮属性需要合并一遍用户定义的默认属性
  const {
    prefixCls: customPrefixcls,
    treeData,
    virtual,
    showIcon,
    switcherIcon,
    icon,
    checkable,
    checkStrictly,
    disabled,
    draggable,
    scrollToKey,
    expandedKeys: expandedKeysProps,
    checkedKeys: checkedKeysProps,
    defaultExpandRoot,
    defaultExpandAll,
    defaultExpandParent,
    defaultExpandedKeys,
    defaultCheckedKeys,
    defaultSelectedKeys,
    height,
    onCheck,
    onExpand,
    onDragStart,
    onDragOver,
    onDragLeave,
    onDragEnter,
    onDragEnd,
    onDrop,
    onSelect,
    selectedKeys: selectedKeysProps,
    setTreeNodeStyle = () => ({}),
    setTreeNodeClassName = () => '',
    estimatedItemSize: innerEstimatedItemSize,
    style,
    className,
    filterTreeNode,
    filterValue,
    expandOnClickNode,
    onlyExpandOnClickIcon = false,
    loadData,
    notFoundContent,
    ...others
  } = TreeProps

  const treePrefixCls = getPrefixCls!(prefixCls, 'tree', customPrefixcls) // 树样式前缀
  const treeNodeClassName = classNames(className, {
    [`${treePrefixCls}`]: true,
  })
  const treeRootClassName = `${treePrefixCls}-root`
  const estimatedItemSize = innerEstimatedItemSize // 节点高度

  const { flattenAllData, maxLevel, keysData } = React.useMemo(() => {
    return flattenAll(treeData, [])
  }, [treeData])

  const [scrollKey, setScrollKey] = React.useState(scrollToKey)
  const [selectedKeys, setSelectedKeys] = useSelect(selectedKeysProps, defaultSelectedKeys)
  const listRef = React.useRef<HTMLElement>(null)
  const rootRef = React.useRef<HTMLElement>(null)
  const scrollRef = ref || rootRef
  const treeNodeRef = React.useRef<any>(null)
  const dragNodeRef = React.useRef<any>(null)
  const delayedDragEnterRef = React.useRef<any>(null)
  const virtualListRef = React.useRef<VirtualListHandle>(null)
  const [isInit, setIsInit] = React.useState(true)
  const [dropPosition, setDropPosition] = React.useState<any>(null)
  const [dragOverNodeKey, setDragOverNodeKey] = React.useState<any>(null)
  const [loadedKeys, setLoadedKeys] = React.useState<Set<string>>(new Set())
  const [loadingKeys, setLoadingKeys] = React.useState<Set<string>>(new Set())
  const [searchExpandedKeys, setSearchExpandedKeys] = React.useState<Array<string>>([])

  const isSearching = React.useMemo(() => typeof filterTreeNode === 'function' && !!filterValue, [filterValue])

  useEffect(() => {
    setSearchExpandedKeys([])
  }, [filterValue])

  const [expandedKeys, setExpandedKeys] = useExpand(
    flattenAllData,
    expandedKeysProps,
    defaultExpandedKeys,
    defaultExpandAll,
    defaultExpandRoot,
    defaultExpandParent,
    scrollKey,
    isInit,
    filterTreeNode,
    isSearching,
    keysData,
    searchExpandedKeys,
  )
  const { spreadAttrData, posData } = React.useMemo(() => {
    return getSpreadAttrData(flattenAllData, expandedKeys)
  }, [flattenAllData, expandedKeys])

  const [checkedKeys, halfCheckedKeys, setCheckedKeys, setHalfCheckedKeys] = useChecked(
    checkStrictly,
    checkedKeysProps,
    defaultCheckedKeys,
    flattenAllData,
    maxLevel,
    checkable,
    keysData,
  )

  const filterData = React.useMemo(() => {
    return getFilterData(spreadAttrData, filterTreeNode, isSearching, posData, keysData)
  }, [spreadAttrData, isSearching, posData, keysData])

  useEffect(() => {
    if (typeof scrollKey === 'undefined') {
      return
    }
    let scrollIndex = 0
    for (let i = 0; i < filterData.length; i++) {
      if (filterData[i].key === scrollKey) {
        scrollIndex = i
        break
      }
    }
    if (virtual) {
      virtualListRef.current?.scrollTo({ index: scrollIndex })
    } else {
      const wrapperDom = scrollRef.current
      const node = wrapperDom ? wrapperDom?.children[0]?.children[scrollIndex] : null
      if (node && wrapperDom) {
        const containerHeight = wrapperDom.clientHeight
        const targetHeight = node.clientHeight
        const scrollPosition = node.offsetTop + targetHeight - containerHeight
        wrapperDom.scrollTop = scrollPosition
      }
    }
  }, [filterData, scrollKey, virtual])

  const handleNodeLoad = useCallback(
    (loadedKeys: Set<string>, loadingKeys: Set<string>, data: any) => {
      const { key } = data
      if (!loadData || loadedKeys.has(key) || loadingKeys.has(key)) {
        return
      }
      setLoadingKeys((prevLoadingKeys) => new Set([...prevLoadingKeys, key]))
      loadData(data)
        .then(() => {
          setLoadedKeys((prevState) => new Set([...prevState, key]))
          setLoadingKeys((prevState) => {
            const prevLoadingKeys = cloneDeep(prevState)
            prevLoadingKeys.delete(key)
            return prevLoadingKeys
          })
        })
        .catch((e: any) => {
          setLoadingKeys((prevState) => {
            const prevLoadingKeys = cloneDeep(prevState)
            prevLoadingKeys.delete(key)
            return prevLoadingKeys
          })
          setExpandedKeys((preExpandedKeys) => delKey([...preExpandedKeys], [key]))
          throw e
        })
    },
    [loadData, setExpandedKeys],
  )

  const handleExpand = React.useCallback(
    (key: string, expanded: boolean, node: any) => {
      const newExpandedKeys = expanded ? addKeys(expandedKeys, [key]) : delKey(expandedKeys, [key])
      if (expandedKeysProps === undefined) {
        setExpandedKeys(newExpandedKeys)
      }
      onExpand && onExpand(newExpandedKeys, { node, expanded: expanded })
      if (isSearching) {
        const newSearchExpandedKeys = expanded ? addKeys(searchExpandedKeys, [key]) : delKey(searchExpandedKeys, [key])
        setSearchExpandedKeys(newSearchExpandedKeys)
      }
      setScrollKey(undefined)
      setIsInit(false)
      if (expanded && loadData) {
        handleNodeLoad(loadedKeys, loadingKeys, node)
      }
    },
    [expandedKeys, onExpand, loadData, handleNodeLoad, loadedKeys, loadingKeys],
  )

  const handleCheck = React.useCallback(
    (key: string, value: boolean, node: any, event: MouseEvent, _pos: string) => {
      const newCheckedKeys = value ? addKeys(checkedKeys, [key]) : delKey(checkedKeys, [key])
      const checkState = checkStrictly
        ? getDataCheckededStateStrictly(newCheckedKeys)
        : getAllCheckedKeys(key, value, checkedKeys, keysData, halfCheckedKeys)
      if (!('checkedKeys' in TreeProps)) {
        setCheckedKeys(checkState.checkedKeys)
        setHalfCheckedKeys(checkState.halfCheckedKeys)
      }
      onCheck &&
        onCheck(checkState.checkedKeys, { event, node, checked: value, halfCheckedKeys: checkState.halfCheckedKeys })
    },
    [
      checkedKeys,
      spreadAttrData,
      halfCheckedKeys,
      maxLevel,
      onCheck,
      checkStrictly,
      setCheckedKeys,
      setHalfCheckedKeys,
    ],
  )

  const handleDragStart = React.useCallback(
    (event: React.MouseEvent, node: any) => {
      onDragStart && onDragStart({ event, node })
    },
    [onDragStart],
  )

  const handleDragOver = React.useCallback(
    (event: React.MouseEvent, node: any, dropTarget: HTMLElement) => {
      const dropPos = calcDropPosition(event, dropTarget)
      if (!delayedDragEnterRef.current) {
        delayedDragEnterRef.current = {}
      }
      if (dropPos !== 0 && dropPos !== dropPosition) {
        Object.keys(delayedDragEnterRef.current).forEach((key) => {
          clearTimeout(delayedDragEnterRef.current[key])
          delayedDragEnterRef.current[key] = null
        })
      }
      setDropPosition(dropPos)

      const { key, pos } = node
      const dragNode = getDragNode()
      if (dragNode.key === node.key) {
        setDropPosition(null)
      }

      if (dragNode?.key !== key && dropPos === 0) {
        if (dragNode.key === node.key || delayedDragEnterRef.current[pos]) {
          return
        }
        delayedDragEnterRef.current[pos] = setTimeout(() => {
          let newExpandedKeys = [...expandedKeys]
          if (!node.expand) {
            newExpandedKeys = addKeys(expandedKeys, [key])
          }
          if (!('expandedKeys' in TreeProps)) {
            setExpandedKeys(newExpandedKeys)
          }
          onExpand?.(newExpandedKeys, { node, expanded: true })
        }, 800)
      }
      onDragOver && onDragOver({ event, node })
    },
    [TreeProps, dropPosition, expandedKeys, onDragOver, onExpand, setExpandedKeys],
  )

  const handleDragLeave = React.useCallback(
    (event: React.MouseEvent, node: any) => {
      onDragLeave && onDragLeave({ event, node })
    },
    [onDragLeave],
  )

  const handleDragEnter = React.useCallback(
    (event: React.MouseEvent, node: any, _dropTarget: HTMLElement) => {
      const { key } = node

      const dragNode = getDragNode()
      if (!dragNode) {
        return
      }
      if (dragNode?.key !== key) {
        setDragOverNodeKey(key)
      }

      onDragEnter && onDragEnter({ event, node })
    },
    [onDragEnter],
  )

  const handleDragEnd = React.useCallback(
    (event: React.MouseEvent, node: any) => {
      setDragOverNodeKey(null)
      onDragEnd && onDragEnd({ event, node })
    },
    [onDragEnd],
  )

  const handleDrop = React.useCallback(
    (event: React.MouseEvent, node: any, dragNode: any, dragNodesKeys: string) => {
      setDragOverNodeKey(null)
      setDropPosition(null)
      const pos = getPos(flattenAllData, dragNodesKeys)
      const keys = getAllChildKeys(flattenAllData, pos).concat(dragNodesKeys)
      onDrop && onDrop({ event, node, dragNode, dragNodesKeys: keys, dropPosition })
    },
    [flattenAllData, onDrop, dropPosition],
  )

  const handleSelect = React.useCallback(
    (event: React.MouseEvent, node: any, key: string) => {
      const checked = getChecked(checkedKeys, key)
      onSelect && onSelect([key], { node, event, checked })
    },
    [onSelect, setSelectedKeys, checkedKeys],
  )
  const getSelectable = (selectable: boolean) => {
    if (isBoolean(selectable)) {
      return selectable
    }
    return true
  }

  const getCheckable = (checkableProps: boolean, itemCheckable: boolean) => {
    return isBoolean(itemCheckable) ? itemCheckable : checkableProps
  }

  const getDisabled = (disabledProps: boolean, itemDisabled: boolean) => {
    return isBoolean(itemDisabled) ? itemDisabled : disabledProps
  }
  const getDragNode = (): TreeNodeData => {
    return dragNodeRef.current
  }
  const setDragNode = (nodeData: TreeNodeData) => {
    dragNodeRef.current = nodeData
  }

  useEffect(() => {
    if (scrollToKey) {
      setSelectedKeys([scrollToKey])
      setScrollKey(scrollToKey)
    }
  }, [scrollToKey])

  useEffect(() => {
    setHalfCheckedKeys(halfCheckedKeys)
  }, [halfCheckedKeys, setHalfCheckedKeys])

  useEffect(() => {
    setCheckedKeys(checkedKeys)
  }, [checkedKeys, setCheckedKeys])

  const renderTreeNode = (item: any) => {
    const checked = getChecked(checkedKeys, item.key)
    const indeterminate = getHalfChecked(halfCheckedKeys, item.key)
    item.nodeKey = item.key
    item.onExpand = handleExpand
    item.onCheck = handleCheck
    item.onDragStart = handleDragStart
    item.onDragOver = handleDragOver
    item.onDragLeave = handleDragLeave
    item.onDragEnter = handleDragEnter
    item.onDragEnd = handleDragEnd
    item.onDrop = handleDrop
    item.onSelect = handleSelect
    item.checked = checked
    item.selected = checkable
      ? false
      : Array.isArray(selectedKeys)
      ? selectedKeys?.[0] === item.key
      : selectedKeys === item.key
    item.indeterminate = indeterminate
    item.disabled = getDisabled(disabled, item.disabled)
    item.showIcon = showIcon || false
    item.checkable = getCheckable(checkable, item.checkable) // 哪个优先
    item.selectable = getSelectable(item.selectable)
    item.icon = item.icon || icon
    item.switcherIcon = item.switcherIcon || switcherIcon
    item.estimatedItemSize = estimatedItemSize
    item.draggable = draggable
    item.className = setTreeNodeClassName(Object.assign({}, item))
    item.style = setTreeNodeStyle(Object.assign({}, item))
    item.getDragNode = getDragNode
    item.setDragNode = setDragNode
    item.dragOver = dragOverNodeKey === item.key && dropPosition === 0
    item.dropPosition = dropPosition
    item.expandOnClickNode = expandOnClickNode
    item.onlyExpandOnClickIcon = onlyExpandOnClickIcon
    item.loading = loadingKeys.has(item.key) && !loadedKeys.has(item.key)
    item.loadData = loadData
    return <TreeNode {...item} key={item.key} ref={treeNodeRef} />
  }

  return (
    <div className={treeNodeClassName} style={style} ref={scrollRef} {...others}>
      <div className={treeRootClassName} ref={listRef as any}>
        {!filterData?.length && notFoundContent}
        {virtual ? (
          <VirtualList
            className={className}
            style={style}
            ref={virtualListRef}
            data={filterData}
            isStaticItemHeight={true}
            itemKey={(item) => item?.key}
            height={height}
            itemHeight={estimatedItemSize}
            outerStyle={{ overflow: 'unset' }}
            innerStyle={{ minWidth: '100%', width: 'max-contnet' }}
          >
            {renderTreeNode}
          </VirtualList>
        ) : (
          filterData.map(renderTreeNode)
        )}
      </div>
    </div>
  )
})

const Tree = InternalTree
Tree.displayName = 'Tree'
export default Tree
