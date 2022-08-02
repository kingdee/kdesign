import { TreeNodeData } from '../tree'

const DRAG_OFFSET = 0.3

/**
 * 打平所有数组，并添加pos位置信息，
 * 方便根据expandKeys等计算节点的expand，checkedKeys计算节点checked状态
 * @param treeData [{key:'',title:'',children:[]}]
 * @param newTreeData[{key:'',title:'',children:[], pos:'', hasChildNode, level}]
 * @param level
 * @param pos
 */
export const flattenAll = (
  treeData: any[],
  newTreeData: TreeNodeData[] = [],
  level = 0,
  pos?: string,
  parent: any = null,
) => {
  treeData &&
    treeData.forEach((item, index) => {
      const { children, title, key, ...others } = item
      item.parent = parent
      const _pos = pos ? `${pos}-${index}` : `${index}`
      const hasChildNode = children && children instanceof Array && children.length > 0
      const flattenNode: any = { title, key, pos: _pos, hasChildNode, level, parent, ...others }
      newTreeData.push(flattenNode)
      let _level = level
      _level++
      flattenAll(children, newTreeData, _level, _pos, flattenNode)
    })
  return newTreeData
}

export const getExpand = (expandedKeys: string[], key: string) => {
  return expandedKeys?.includes(key)
}

export const getChecked = (checkedKeys: string[], key: string) => {
  return checkedKeys?.includes(key)
}

export const getSelected = (selectedKeys: string[], key: string) => {
  return selectedKeys?.includes(key)
}

export const getHalfChecked = (halfCheckedKeys: string[], key: string) => {
  return halfCheckedKeys?.includes(key)
}

/**
 * 获取所有层级的父节点
 * @param data
 * @param pos
 */
const isAllParentExpand = (data: any[], pos: string) => {
  let expand = true
  while (pos.lastIndexOf('-') > -1 && expand) {
    pos = pos.substring(0, pos.lastIndexOf('-'))
    const parentNode = data.find((item) => {
      return item.pos === pos
    })
    expand = parentNode?.expand
  }
  return expand
}

export const getAllFilterKeys = (data: any[], filterTreeNode: FunctionConstructor): any[] => {
  const allFilterKeys: any[] = []
  data
    .filter((item: any) => filterTreeNode?.(item))
    .forEach((item) => {
      let node = { ...item }
      while (node) {
        allFilterKeys.push(node.key)
        node = node.parent
      }
    })
  return [...new Set(allFilterKeys)]
}

export const getFilterData = (data: any[], filterTreeNode: FunctionConstructor, isSearching: boolean) => {
  let filterData = data
  let allFilterKeys: any = null
  if (isSearching) {
    allFilterKeys = getAllFilterKeys(filterData, filterTreeNode)
    filterData = filterData.filter((item) => allFilterKeys.includes(item.key))
  }
  const newData: any[] = []
  filterData.forEach((item) => {
    const { pos } = item
    const parentExpand = isAllParentExpand(filterData, pos)
    if (parentExpand) {
      newData.push(item)
    }
  })
  return newData
}

const hasParentChecked = (data: any[], checkedKeys: string[], pos = '') => {
  let checked = false
  while (pos.lastIndexOf('-') > -1 && !checked) {
    pos = pos.substring(0, pos.lastIndexOf('-'))
    const parentNode = data.find((item) => {
      return item.pos === pos
    })
    checked = getChecked(checkedKeys, parentNode.key)
  }
  return checked
}

const isChild = (itemPos: string, pos: string, condition: boolean) => {
  const index = itemPos.indexOf(pos)
  const str = itemPos.substr(index + pos.length, 1)
  if (itemPos.startsWith(pos) && str === '-' && condition) {
    return true
  }
  return false
}

const hasChildCheckState = (
  data: any[],
  halfCheckedKeys: string[],
  checkedKeys: string[],
  pos: string,
  level: number,
  isInit = false,
) => {
  const childNodes = data.filter((item) => {
    if (isInit) {
      return isChild(item.pos, pos, pos !== item.pos)
    }
    return isChild(item.pos, pos, level === item.level - 1)
  })
  const childNodesCheckedState: any[] = []
  const childNodesHalfCheckedState: any[] = []
  childNodes.forEach((item) => {
    childNodesCheckedState.push(getChecked(checkedKeys, item.key))
    childNodesHalfCheckedState.push(getChecked(halfCheckedKeys, item.key))
  })
  const checked = childNodesCheckedState.some((item) => {
    return item === true
  })
  const halfChecked = childNodesHalfCheckedState.some((item) => {
    return item === true
  })
  return { checked, halfChecked }
}

const allChildChecked = (data: any[], checkedKeys: string[], pos: string, level: number, init: boolean) => {
  const childNodes = data.filter((item) => {
    if (init) {
      return isChild(item.pos, pos, pos !== item.pos)
    }
    return isChild(item.pos, pos, level === item.level - 1)
  })
  const childNodesCheckedState: any[] = []
  childNodes.forEach((item) => {
    childNodesCheckedState.push(getChecked(checkedKeys, item.key))
  })
  const checked = childNodesCheckedState.every((item) => {
    return item === true
  })
  return checked
}

export const getMaxLevel = (data: any[]) => {
  let maxLevel = 0
  data.forEach((item) => {
    maxLevel = item.level > maxLevel ? item.level : maxLevel
  })
  return maxLevel
}
/**
 *计算node的属性后返回新的 treedata
 * @param treeData  打平后的treeData [{key:'',title:'',children:[], pos:''}]
 * @param defaultExpandRoot
 * @param expandedKeys
 * @param defaultExpandAll
 */
export const getSpreadAttrData = (treeData: any[], expandedKeys: string[]) => {
  const newTreeData: any[] = []
  treeData.forEach((item) => {
    const { title, key, icon, disabled, checkable, pos, level, hasChildNode, selectable, ...others } = item
    const itemExpand = getExpand(expandedKeys, key)
    const expand = itemExpand || false
    newTreeData.push({
      title,
      key,
      level,
      pos,
      hasChildNode,
      expand,
      icon,
      disabled,
      checkable,
      selectable,
      ...others,
    })
  })
  return newTreeData
}

export const addKeys = (prevKeys: string[] = [], newKeys: string[] = []) => {
  return Array.from(new Set([...prevKeys, ...newKeys]))
}
export const getAllParentKeys = (data: any[], pos = '') => {
  const keys: string[] = []
  while (pos.lastIndexOf('-') > -1) {
    pos = pos.substring(0, pos.lastIndexOf('-'))
    data.forEach((item) => {
      if (item.pos === pos) {
        keys.push(item.key)
      }
    })
  }
  return keys
}

export const getAllParentPos = (data: any[], pos = '') => {
  const posArr: string[] = []
  while (pos.lastIndexOf('-') > -1) {
    pos = pos.substring(0, pos.lastIndexOf('-'))
    data.forEach((item) => {
      if (item.pos === pos) {
        posArr.push(item.pos)
      }
    })
  }
  return posArr
}

export const getAllChildKeys = (data: any[], pos = '') => {
  const keys: string[] = []
  const childNodes = data.filter((item) => {
    return isChild(item.pos, pos, pos !== item.pos)
  })
  childNodes.forEach((item) => {
    keys.push(item.key)
  })
  return keys
}

export const getPos = (data: any[], key: string) => {
  const node = data.find((item) => {
    return item.key === key
  })
  return node?.pos
}

export const getInitCheckedKeys = (data: any[], keys: string[]) => {
  const checkedKeys: any[] = []
  keys.forEach((item) => {
    const pos = getPos(data, item)
    checkedKeys.push(...getAllChildKeys(data, pos))
  })
  return Array.from(new Set([...checkedKeys, ...keys]))
}

export const getInitCheckededState = (data: any[], checkedKeys: string[] = [], maxLevel: number, init = false) => {
  const _checkedKeys = [...checkedKeys]
  const _halfCheckedKeys: string[] = []
  for (let i = maxLevel; i >= 0; i--) {
    data.forEach((item) => {
      if (item.level === i) {
        const selfChecked = getChecked(_checkedKeys, item.key)
        const _hasChildCheckState =
          item.hasChildNode && hasChildCheckState(data, _halfCheckedKeys, _checkedKeys, item.pos, item.level, init)
        const _allChildChecked = item.hasChildNode && allChildChecked(data, _checkedKeys, item.pos, item.level, init)
        const _hasChildChecked = _hasChildCheckState?.checked
        const _hasHalfChildChecked = _hasChildCheckState?.halfChecked
        const _hasParentChecked = hasParentChecked(data, checkedKeys, item.pos)
        const checked = selfChecked || _hasParentChecked || _allChildChecked
        if (checked) {
          _checkedKeys.push(item.key)
        }
        const halfChecked = (_hasChildChecked || _hasHalfChildChecked) && !checked
        if (halfChecked) {
          _halfCheckedKeys.push(item.key)
        }
      }
    })
  }
  return { checkedKeys: Array.from(new Set(_checkedKeys)), halfCheckedKeys: Array.from(new Set(_halfCheckedKeys)) }
}

export const getDataCheckededState = (
  data: any[],
  checkedKeys: string[],
  halfCheckedKeys: string[],
  maxLevel: number,
  init = false,
  pos: string,
  value?: boolean,
) => {
  let _checkedKeys = [...checkedKeys]
  let _halfCheckedKeys = [...halfCheckedKeys]
  for (let i = maxLevel; i >= 0; i--) {
    data.forEach((item) => {
      const selfChecked = getChecked(_checkedKeys, item.key)
      const selfHalfChecked = getChecked(_halfCheckedKeys, item.key)
      const _allChildChecked = item.hasChildNode && allChildChecked(data, _checkedKeys, item.pos, item.level, false)
      const _hasChildCheckState =
        item.hasChildNode && hasChildCheckState(data, _halfCheckedKeys, _checkedKeys, item.pos, item.level, init)
      const _hasChildChecked = _hasChildCheckState?.checked
      const _hasHalfChildChecked = _hasChildCheckState?.halfChecked
      if (item.level === i) {
        if (item.disabled) return // 节点被禁用
        if (value) {
          if (!selfChecked) {
            if (isParentNode(item.pos, pos)) {
              _checkedKeys.push(item.key)
              _halfCheckedKeys = delKey(_halfCheckedKeys, [item.key])
            } else if (isChildNode(item.pos, pos)) {
              if (_allChildChecked) {
                _checkedKeys.push(item.key)
              } else if (_hasChildChecked || _hasHalfChildChecked) {
                _halfCheckedKeys.push(item.key)
              }
            }
          }
        } else {
          if (selfChecked) {
            if (isParentNode(item.pos, pos)) {
              _checkedKeys = delKey(_checkedKeys, [item.key])
            } else if (isChildNode(item.pos, pos)) {
              if (!_allChildChecked && (_hasChildChecked || _hasHalfChildChecked)) {
                _halfCheckedKeys.push(item.key)
              }
              _checkedKeys = delKey(_checkedKeys, [item.key])
            }
          } else if (selfHalfChecked) {
            if (!_hasChildChecked && !_hasHalfChildChecked) {
              _halfCheckedKeys = delKey(_halfCheckedKeys, [item.key])
            }
          }
        }
      }
    })
  }
  return { checkedKeys: Array.from(new Set(_checkedKeys)), halfCheckedKeys: Array.from(new Set(_halfCheckedKeys)) }
}

export const getDataCheckededStateStrictly = (checkedKeys: string[]) => {
  const _checkedKeys = [...checkedKeys]
  return { checkedKeys: Array.from(new Set(_checkedKeys)), halfCheckedKeys: [] }
}

const isChildNode = (pos: string, childPos: string) => {
  return isChild(childPos, pos, pos !== childPos)
}

const isParentNode = (pos: string, childPos: string) => {
  return isChildNode(childPos, pos)
}

export const delKey = (prevKeys: string[], delKeys: string[]) => {
  const keys = Object.assign([], prevKeys)
  delKeys.forEach((item) => {
    const index = keys.indexOf(item)
    index > -1 && keys.splice(index, 1)
  })
  return keys
}
export const getAllNodeKeys = (data: any[]) => {
  const keys: string[] = []
  data.forEach((item) => {
    keys.push(item.key)
  })
  return keys
}

const getRootKeys = (data: any[]) => {
  let rootKey = ''
  const NO_ROOT = undefined
  const firstLevelNodes = data.filter((item) => {
    return item.pos?.indexOf('-') === -1
  })
  if (firstLevelNodes.length > 1) return NO_ROOT
  data.forEach((item) => {
    if (item.pos === '0') {
      rootKey = item.key
    }
  })
  return rootKey
}

export const getInitExpandedKeys = (
  data: any[],
  expandedKeys: string[],
  defaultExpandedKeys: string[],
  defaultExpandAll: boolean,
  defaultExpandRoot: boolean,
  defaultExpandParent: boolean,
  expandScrollkeys: string[] = [],
  filterTreeNode: FunctionConstructor,
  isSearching: boolean,
) => {
  let keys: string[] = expandedKeys?.concat(expandScrollkeys) || defaultExpandedKeys?.concat(expandScrollkeys) || []

  if (defaultExpandAll) {
    keys = getAllNodeKeys(data)
  } else {
    if (defaultExpandRoot) {
      const rootKey = getRootKeys(data)
      if (rootKey) {
        keys = keys.concat(rootKey)
      }
    }
    if (defaultExpandParent) {
      const parentKeys: string[] = []
      keys.forEach((key) => {
        parentKeys.push(...getAllParentKeys(data, key))
      })
      keys = keys.concat(parentKeys)
    }
  }

  if (isSearching) {
    keys = [...keys, ...getAllFilterKeys(data, filterTreeNode)]
  }
  return Array.from(new Set([...keys]))
}

export const getExpandedKeys = (expandedKeys: string[], expandScrollkeys: string[] = []) => {
  const keys: string[] = expandedKeys?.concat(expandScrollkeys) || []
  return Array.from(new Set([...keys]))
}

export const calcDropPosition = (event: React.MouseEvent, dropNode: HTMLElement) => {
  const { clientY } = event
  const { top, bottom, height } = dropNode.getBoundingClientRect()
  if (clientY <= top + height * DRAG_OFFSET) {
    return -1
  }
  if (clientY >= bottom - height * DRAG_OFFSET) {
    return 1
  }

  return 0
}
