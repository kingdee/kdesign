import { TreeNodeData, KeysDataType } from './tree'
import React, { useEffect, useState } from 'react'
import {
  getInitCheckededKeys,
  getDataCheckededStateStrictly,
  getInitExpandedKeys,
  getPos,
  getAllParentKeys,
} from './utils/treeUtils'

export const useViewportHeight = (height: number, listRef: React.RefObject<HTMLElement>) => {
  const [viewportHeight, setViewportHeight] = React.useState(0)
  React.useEffect(() => {
    height ? setViewportHeight(height) : listRef.current && setViewportHeight(listRef.current.clientHeight)
  }, [listRef, height])
  return [viewportHeight]
}

export const useVisibleDataMemo = (
  virtual: boolean,
  filterData: TreeNodeData[],
  viewportHeight: number,
  estimatedItemSize: number,
  start: number,
) => {
  const visibledCount = React.useMemo(() => {
    return Math.ceil(viewportHeight / estimatedItemSize)
  }, [viewportHeight, estimatedItemSize])

  const viewportData = React.useMemo(() => {
    return filterData.slice(start, start + visibledCount)
  }, [filterData, start, visibledCount])

  const visibleData = React.useMemo(() => {
    return virtual ? viewportData : filterData
  }, [virtual, viewportData, filterData])

  return [visibleData]
}

export const usePlantomHeightEffect = (
  plantomRef: React.RefObject<HTMLElement>,
  filterData: TreeNodeData[],
  estimatedItemSize: number,
) => {
  React.useEffect(() => {
    const height = filterData.length * estimatedItemSize
    if (plantomRef.current) {
      plantomRef.current.style.height = height + 'px'
    }
  }, [plantomRef, filterData, estimatedItemSize])
}

export const useChecked = (
  checkStrictly: boolean,
  checkedKeysProps: string[],
  defaultCheckedKeys: string[],
  _flattenAllData: any[],
  _maxLevel: number,
  checkable: boolean,
  keysData: KeysDataType,
) => {
  const initialCheckedState = React.useMemo(() => {
    if (!checkable) return { checkedKeys: [], halfCheckedKeys: [] }
    return checkStrictly
      ? getDataCheckededStateStrictly(checkedKeysProps || defaultCheckedKeys)
      : getInitCheckededKeys(checkedKeysProps || defaultCheckedKeys, keysData)
  }, [checkable, checkStrictly, checkedKeysProps, defaultCheckedKeys, keysData])
  const [checkedKeys, setCheckedKeys] = React.useState(initialCheckedState.checkedKeys)
  const [halfCheckedKeys, setHalfCheckedKeys] = React.useState(initialCheckedState.halfCheckedKeys)
  const nextCheckedKeys = initialCheckedState.checkedKeys
  const nextHalfCheckedKeys = initialCheckedState.halfCheckedKeys
  useEffect(() => {
    setCheckedKeys(nextCheckedKeys)
  }, [nextCheckedKeys])
  useEffect(() => {
    setHalfCheckedKeys(nextHalfCheckedKeys)
  }, [nextHalfCheckedKeys])
  return [checkedKeys, halfCheckedKeys, setCheckedKeys, setHalfCheckedKeys] as const
}

export const useExpand = (
  flattenAllData: any[],
  expandedKeysProps: string[],
  defaultExpandedKeys: string[],
  defaultExpandAll: boolean,
  defaultExpandRoot: boolean,
  defaultExpandParent: boolean,
  scrollKey: string,
  isInit: boolean,
  filterTreeNode: FunctionConstructor,
  isSearching: boolean,
  keysData: KeysDataType,
  searchExpandedKeys: string[],
) => {
  let expandScrollkeys: string[] = []
  if (scrollKey) {
    const pos = getPos(flattenAllData, scrollKey)
    expandScrollkeys = getAllParentKeys(flattenAllData, pos)
  }
  const initialExpandedKeys = React.useMemo(() => {
    return getInitExpandedKeys(
      flattenAllData,
      expandedKeysProps,
      defaultExpandedKeys,
      defaultExpandAll,
      defaultExpandRoot,
      defaultExpandParent,
      expandScrollkeys,
      filterTreeNode,
      isSearching,
      keysData,
      searchExpandedKeys,
      isInit,
    )
  }, [
    flattenAllData,
    expandedKeysProps,
    defaultExpandedKeys,
    defaultExpandAll,
    defaultExpandRoot,
    defaultExpandParent,
    scrollKey,
    filterTreeNode,
    isSearching,
    keysData,
    searchExpandedKeys,
    isInit,
  ])

  const [expandedKeys, setExpandedKeys] = React.useState(initialExpandedKeys)

  React.useEffect(() => {
    setExpandedKeys(initialExpandedKeys)
  }, [
    flattenAllData,
    expandedKeysProps,
    searchExpandedKeys,
    defaultExpandAll,
    defaultExpandedKeys,
    defaultExpandRoot,
    defaultExpandParent,
    scrollKey,
  ])

  return [expandedKeys, setExpandedKeys] as const
}

export const useScrollToKey = (
  scrollKey: string,
  index: number,
  estimatedItemSize: number,
  scrollRef: any,
  viewportHeight: number,
  treeNodePrefixCls: string,
) => {
  const [scroll, setScroll] = React.useState(false)
  useEffect(() => {
    setScroll(true)
  }, [scrollKey])
  useEffect(() => {
    if (!scroll) return
    const treeRoot = scrollRef.current
    const treeNode = treeRoot?.getElementsByClassName(`${treeNodePrefixCls}-item-${scrollKey}`)[0]
    if (!scrollKey) {
      setScroll(false)
      return
    }
    if (treeRoot && treeNode) {
      const treeRootRect = treeRoot.getBoundingClientRect()
      const treeNodeRect = treeNode.getBoundingClientRect()
      if (treeRootRect.top <= treeNodeRect.top && treeRootRect.bottom >= treeNodeRect.bottom) {
        setScroll(false)
        return
      }
    }
    let _index = index
    const visibleDataLength = Math.ceil(viewportHeight / estimatedItemSize)
    const halfVisibleIndex = Math.floor(visibleDataLength / 2)
    _index = _index - halfVisibleIndex
    scrollRef.current.scrollTop = _index * estimatedItemSize
    setScroll(false)
  }, [scroll, index, viewportHeight, estimatedItemSize])
}

export const useSelect = (selectedKeysProps: string[], defaultSelectedKeys: string[]) => {
  const [selectedKeys, setSelectedKeys] = useState(selectedKeysProps || defaultSelectedKeys)
  useEffect(() => {
    selectedKeysProps && setSelectedKeys(selectedKeysProps)
  }, [selectedKeysProps])
  return [selectedKeys, setSelectedKeys] as const
}
