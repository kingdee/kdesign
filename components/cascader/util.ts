import { useEffect, useState, useMemo } from 'react'
import { CascaderValueType, CascaderOptionType, KeysDataType } from './cascader'
import cloneDeep from 'lodash/cloneDeep'

export const useChecked = (
  value: CascaderValueType,
  flattenData: CascaderOptionType[],
  keysData: KeysDataType,
  isMultiple: boolean,
) => {
  const initialCheckedState = useMemo(
    () => setNodeCheckedByValue(value, flattenData, keysData),
    [value, flattenData, keysData],
  )
  const [checkedKeys, setCheckedKeys] = useState(initialCheckedState.checkedKeys)
  const [halfCheckedKeys, setHalfCheckedKeys] = useState(initialCheckedState.halfCheckedKeys)
  useEffect(() => {
    setCheckedKeys(initialCheckedState.checkedKeys)
  }, [initialCheckedState.checkedKeys])
  useEffect(() => {
    setHalfCheckedKeys(initialCheckedState.halfCheckedKeys)
  }, [initialCheckedState.halfCheckedKeys])
  if (!isMultiple) return []
  return [checkedKeys, halfCheckedKeys, setCheckedKeys, setHalfCheckedKeys] as const
}

export const flattenAll = (data: CascaderOptionType[], newTreeData: CascaderOptionType[] = []) => {
  const keysData: CascaderOptionType = {}
  const formatData = cloneDeep(data)
  const fn = (data: CascaderOptionType[], newTreeData: CascaderOptionType[] = [], parent: any = null) => {
    const newParent = cloneDeep(parent)
    if (newParent) {
      newParent.children = null
    }
    data &&
      data.forEach((item) => {
        const { children, label, value, ...others } = item
        const flattenNode: CascaderOptionType = {
          label,
          value,
          children,
          parent: newParent,
          parentKey: parent?.value || null,
          pathKeys: [...(parent?.pathKeys || []), value],
          _level: parent ? parent._level + 1 : 0,
          ...others,
        }
        item.parent = newParent
        item.parentKey = parent?.value || null
        item.pathKeys = [...(parent?.pathKeys || []), value]
        item._level = parent ? parent._level + 1 : 0
        value && (keysData[value] = flattenNode)
        newTreeData.push(flattenNode)
        children && fn(children, newTreeData, flattenNode)
      })
    return newTreeData
  }
  const flattenData = fn(formatData, newTreeData)
  return { formatData, keysData, flattenData }
}

export const isHalfChecked = (data: any[]) => {
  const checkedLen = data.reduce((total, prev) => {
    const num = prev._halfChecked ? 0.5 : prev._checked ? 1 : 0
    return total + num
  }, 0)
  return checkedLen !== data.length && checkedLen > 0
}

export const ValueSeparator = '__kdm_cascader__'
export const transformValuesToSet = (values: CascaderValueType) => {
  const _values = values || []
  const valuesSet = _values.reduce((set, next: any) => {
    set.add([].concat(next).join(ValueSeparator))
    return set
  }, new Set())

  return valuesSet
}

export const valueInSet = (set: Set<any>, value: string[]) => {
  const _value = value || []
  return set.has(_value.join(ValueSeparator))
}

export function getChildNodeKeys(node: CascaderOptionType, keysNodeProps: KeysDataType): Set<string> {
  const nodes: Set<string> = new Set()
  const loop = (children: CascaderOptionType[]) => {
    children.map((child) => {
      const key: string | undefined = child.value
      if (!key) return
      const item = keysNodeProps[key]
      if (!item || item.disabled) {
        return
      }
      key && nodes.add(key)
      loop(item.children || [])
    })
  }
  if (node) {
    loop(node.children || [])
  }
  return nodes
}

export const setNodeCheckedByValue = (
  initValues: CascaderValueType,
  flatNodes: CascaderOptionType[],
  keysNodeProps: KeysDataType,
) => {
  const valuesSet = transformValuesToSet(initValues)

  const checkedSet = new Set()
  const halfCheckedSet = new Set()
  const childCheckedKeysSet = new Set()

  flatNodes.forEach((node: any) => {
    if (
      node.pathKeys.some((_item: any, index: number, arr: string[]) => valueInSet(valuesSet, arr.slice(0, index + 1)))
    ) {
      checkedSet.add(node.value)
    }
  })
  ;[...checkedSet].map((value: string) => {
    if (!childCheckedKeysSet.has(value)) {
      const childKeys = getChildNodeKeys(keysNodeProps[value], keysNodeProps)
      childKeys.forEach((v) => {
        childCheckedKeysSet.add(v)
      })
    }
    updateParent(value, keysNodeProps, checkedSet, halfCheckedSet)
  })

  return {
    checkedKeys: [...new Set([...checkedSet, ...childCheckedKeysSet])],
    halfCheckedKeys: [...halfCheckedSet],
  }
}

const updateParent = (key: any, keysNodeProps: KeysDataType, allKeys: Set<any>, halfCheckedKeysSet: Set<any>) => {
  const pathKeys = [...keysNodeProps[key].pathKeys]
  pathKeys.pop()

  pathKeys.reverse().forEach((itemKey: any) => {
    const parent = keysNodeProps[itemKey]
    if (parent && !parent.disabled) {
      let total = 0
      let number = 0
      ;(parent as any).children.some(({ value }: CascaderOptionType) => {
        const item = keysNodeProps[value as string]
        if (!item || item.disabled) {
          return false
        }
        total++
        if (allKeys.has(value)) {
          number++
        } else if (halfCheckedKeysSet.has(value)) {
          number += 0.5
          return true
        }
      })

      if (!number || number === total) {
        halfCheckedKeysSet.delete(itemKey)
      } else {
        halfCheckedKeysSet.add(itemKey)
      }

      if (number && number === total) {
        allKeys.add(itemKey)
      } else {
        allKeys.delete(itemKey)
      }
    }
  })
}

export const getHalfChecked = (halfCheckedKeys: any[], key: string) => {
  return halfCheckedKeys?.includes(key)
}

export const getChecked = (checkedKeys: any[], key: string) => {
  return checkedKeys?.includes(key)
}

const getCheckedNodes = (flatNodes: CascaderOptionType[], checkedKeys: string[]) => {
  const result = []
  for (let i = 0; i < checkedKeys.length; i++) {
    const key = checkedKeys[i]
    for (let j = 0; j < flatNodes.length; j++) {
      const obj = flatNodes[j]
      if (obj.value === key) {
        result.push(obj)
        break
      }
    }
  }
  return result
}

export const addKeys = (prevKeys: any[] = [], newKeys: any[] = []) => {
  return Array.from(new Set([...prevKeys, ...newKeys]))
}

export const delKey = (prevKeys: any[], delKeys: any[]) => {
  const keys = Object.assign([], prevKeys)
  delKeys.forEach((item) => {
    const index = keys.indexOf(item)
    index > -1 && keys.splice(index, 1)
  })
  return keys
}

export const getMultipleCheckValue = (
  _propsValue: CascaderValueType,
  _option: CascaderOptionType,
  _checked: boolean,
  flatNodes: CascaderOptionType[],
  checkedKeys: [],
) => {
  const checkedNodes = getCheckedNodes(flatNodes, checkedKeys)
  const currentValue = checkedNodes
    .map((node: CascaderOptionType) => !node.children && node.pathKeys)
    .filter((node) => node)
  return currentValue
}

export function getAllCheckedKeys(
  key: any,
  checked: boolean,
  checkedKeys: any[],
  keysNodeProps: KeysDataType,
  halfCheckedKeys: any[],
) {
  if (!keysNodeProps[key]) {
    return {
      checkedKeys,
      halfCheckedKeys,
    }
  }
  const checkedKeysSet = new Set(checkedKeys)
  const halfCheckedKeysSet = new Set(halfCheckedKeys)
  const childKeys = getChildNodeKeys(keysNodeProps[key], keysNodeProps)
  const allKeys = checkedKeysSet

  if (checked) {
    allKeys.add(key)
    halfCheckedKeysSet.delete(key)
    childKeys.forEach((v) => {
      allKeys.add(v)
    })
  } else {
    halfCheckedKeysSet.delete(key)
    allKeys.delete(key)
    childKeys.forEach((v) => {
      allKeys.delete(v)
    })
  }

  updateParent(key, keysNodeProps, checkedKeysSet, halfCheckedKeysSet)

  return {
    checkedKeys: [...allKeys],
    halfCheckedKeys: [...halfCheckedKeysSet],
  }
}
