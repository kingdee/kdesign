import React, { useContext, useRef, useEffect, useState, useCallback, useLayoutEffect, useMemo } from 'react'
import { useMergedState } from '../_utils/hooks'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { getCompProps } from '../_utils'
import { Icon, Tag, Tree } from '../index'
import { ITreeSelectProps, TreeSelectValue } from './interface'
import { TreeNodeData } from '../tree'
import usePopper from '../_utils/usePopper'

const INPUT_MIN_WIDTH = 4 // 输入框最小宽度

function flattenTreeData(treeData: TreeNodeData[]) {
  const map = new Map()

  function flatten(node: TreeNodeData, parentKeys: string[] = []) {
    const key = node.key
    const data = { ...node, childrenKeys: [] as string[], parentKeys }
    map.set(key, data)

    if (node.children) {
      const keys = []
      node.children?.forEach((child: TreeNodeData) => {
        const childKey = flatten(child, [...parentKeys, key])
        keys.push(childKey)
        const grandchildrenKeys = map.get(childKey).childrenKeys
        data.childrenKeys.push(childKey, ...grandchildrenKeys)
      })
    }

    return key
  }

  treeData?.forEach((node) => {
    flatten(node)
  })

  return map
}

const InternalTreeSelect: React.ForwardRefRenderFunction<ITreeSelectProps<TreeSelectValue>> = (
  props: any,
  ref: unknown,
) => {
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps, locale } = useContext(ConfigContext)
  const treeSelectProps = getCompProps('TreeSelect', userDefaultProps, props)
  const {
    size,
    value,
    autoFocus,
    className,
    defaultOpen,
    dropdownClassName,
    disabled,
    borderType,
    showArrow = true,
    allowClear,
    prefixCls: customPrefixcls,
    onFocus,
    onBlur,
    onClear,
    onVisibleChange,
    mode,
    showSearch,
    onChange,
    onSearch,
    defaultValue,
    placeholder = locale.getLangMsg('global', 'placeholder'),
    dropdownStyle,
    style,
    clearIcon,
    filterTreeNode,
    treeNodeFilterProp,
    treeNodeLabelProp,
    popperStyle = {},
    tagRender,
    treeData,
    virtual,
    treeIcon,
    showTreeIcon,
    switcherIcon,
    treeDefaultExpandAll,
    treeDefaultExpandedKeys,
    treeCheckStrictly,
    treeExpandedKeys,
    treeExpandOnClickNode,
    treeLoadData,
    onTreeExpand,
    onSelect,
    onCheck,
    dropdownRender,
    onlyExpandOnClickIcon,
    listHeight,
    status,
  } = treeSelectProps
  const isMultiple = mode === 'multiple' // 是否多选
  const [initValue, setInitValue] = useMergedState(isMultiple ? [] : undefined, {
    value,
    defaultValue,
  })
  const [expandedKeys, setExpandedKeys] = useState(treeExpandedKeys)
  const [selectedKeys, setSelectedKeys] = useState<string[]>(initValue)
  const innerRef = useRef<HTMLElement>()
  const selectRef = (ref as any) || innerRef
  const searchRef = useRef<any>(null) // 搜索框ref
  const selectionRef = useRef<any>(null)
  const dropDownRef = useRef<any>(null)
  const measureRef = useRef<HTMLSpanElement>(null)
  const [optionShow, setOptionShow] = useState<boolean>(!!props.visible || defaultOpen) // 下拉列表是否展示
  const [searchValue, setSearchValue] = useState<any>('') // 搜索框定时器
  const [inputWidth, setInputWidth] = useState(INPUT_MIN_WIDTH) // 输入框宽度
  const [focusd, setFocusd] = useState(autoFocus)
  const [selectTreeNodes, setSelectTreeNodes] = useState<TreeNodeData[]>([])

  const TreeMap = useMemo(() => flattenTreeData(treeData), [treeData])

  const isSelected = useMemo(() => !!selectTreeNodes?.length, [selectTreeNodes])

  const selectPrefixCls = getPrefixCls!(prefixCls, 'tree-select', customPrefixcls)
  // 选择器样式
  const selectCls = classNames(selectPrefixCls, className, {
    [`${selectPrefixCls}-visible`]: optionShow,
  })

  const selectionCls = classNames({
    [`${selectPrefixCls}-selector`]: true,
  })

  // 下拉列表框样式
  const dropDownCls = classNames(dropdownClassName, {
    [`${selectPrefixCls}-dropdown`]: true,
  })

  // 多选，单选公共样式
  const commCls = classNames({
    [`${selectPrefixCls}-bordered`]: borderType === 'bordered',
    [`${selectPrefixCls}-underline`]: borderType === 'underline',
    [`${selectPrefixCls}-borderless`]: borderType === 'none',
    [`${selectPrefixCls}-size-${size}`]: size,
    [`${selectPrefixCls}-wrapper`]: true,
    [`${selectPrefixCls}-error`]: status === 'error',
  })

  useEffect(() => {
    const arr = []
    if (isMultiple) {
      for (let index = 0; index < initValue.length; index++) {
        const key = initValue[index]
        if (TreeMap.has(key)) {
          arr.push(TreeMap.get(key))
        } else {
          arr.push({ key, title: key })
        }
      }
    } else {
      if (TreeMap.has(initValue)) {
        arr.push(TreeMap.get(initValue))
      } else {
        ;(initValue ?? '') !== '' && arr.push({ key: initValue, title: initValue })
      }
    }
    setSelectTreeNodes(arr)
  }, [initValue, TreeMap, isMultiple])

  useEffect(() => {
    if (optionShow === false) {
      handleClear()
    }
  }, [optionShow])

  const handleFocus = useCallback(
    (e: React.ChangeEvent<HTMLSpanElement>) => {
      e.stopPropagation()
      setFocusd(true)
      onFocus && onFocus(e)
    },
    [onFocus],
  )

  const handleBlur = useCallback(
    (e: React.ChangeEvent<HTMLSpanElement>) => {
      e.stopPropagation()
      setFocusd(false)
      onBlur && onBlur(e)
    },
    [onBlur],
  )

  useEffect(() => {
    selectionRef.current.addEventListener('mouseup', (e: MouseEvent) => {
      const isCloseBtn = (e?.target as Element)?.className.indexOf('kd-tag-close-icon') > -1
      if (isCloseBtn) {
        e.stopPropagation()
      }
    })
  }, [])

  useLayoutEffect(() => {
    measureRef.current && setInputWidth(measureRef.current.scrollWidth)
  }, [searchValue])

  const getTreeNodeLabel = (node: any) => {
    return node?.[treeNodeLabelProp] || node?.title
  }

  // 输入框变化搜索内容
  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const val = event.currentTarget.value
      handleVisibleChange(true)
      setSearchValue(val)
      onSearch?.(val)
    },
    [onSearch],
  )

  // 清除搜索内容
  const handleClear = useCallback(() => {
    if (searchRef.current) {
      searchRef.current.value = ''
      setSearchValue('')
    }
  }, [searchRef])

  // 清空选择器内容
  const handleReset = (e: any) => {
    e.stopPropagation()
    if (isMultiple) {
      setInitValue([])
    } else {
      setInitValue('')
    }
    onClear?.('')
    setSearchValue('')
    isMultiple ? onChange?.('', '') : onChange?.(undefined, undefined)
  }

  // 多选模式下清除某一项
  const handleRemove = (e: any, key: any) => {
    if (disabled) return
    const allRemoveKeys = [...(TreeMap.get(key)?.childrenKeys || []), ...(TreeMap.get(key)?.parentKeys || []), key]
    const newSelectTreeNodes = selectTreeNodes.filter((item) => !allRemoveKeys.includes(item.key))
    const newKeys = newSelectTreeNodes.map(({ key }) => key)
    if (!Object.hasOwnProperty.call(treeSelectProps, 'value')) {
      setInitValue(newKeys)
    }
    onChange?.(newKeys, newSelectTreeNodes)
    e.stopPropagation()
  }

  const handleSelect = (keys: string[], state: any) => {
    !isMultiple && !Object.hasOwnProperty.call(treeSelectProps, 'value') && setInitValue(keys[0])
    setSelectedKeys(keys)
    onSelect?.(keys, state)
    !isMultiple && onChange?.(keys[0], [TreeMap.get(keys[0])])
    if (!isMultiple) {
      handleVisibleChange(false)
    }
  }

  const handleCheck = (keys: string[], state: any) => {
    onCheck?.(keys, state)
    onChange?.(
      keys,
      keys.map((key) => TreeMap.get(key)),
    )
    !Object.hasOwnProperty.call(treeSelectProps, 'value') && setInitValue(keys)
  }

  const handleExpand = (keys: string[], state: any) => {
    !Object.hasOwnProperty.call(treeSelectProps, 'treeExpandedKeys') && setExpandedKeys(keys)
    onTreeExpand?.(keys, state)
  }

  // 渲染后缀图标
  const renderSuffix = () => {
    const { suffixIcon } = treeSelectProps
    // 选择器下拉icon样式
    const arrowIconCls = classNames({
      [`${selectPrefixCls}-icon-arrow`]: true,
      [`${selectPrefixCls}-icon-arrow-up`]: optionShow,
      [`${selectPrefixCls}-icon-arrow-down`]: !optionShow,
      [`${selectPrefixCls}-icon-arrow-focus`]: optionShow,
    })
    const iconShow =
      allowClear && !disabled && (isMultiple ? !!selectTreeNodes.length : (initValue ?? '') !== '' || searchValue)
    const clearIconCls = classNames({
      [`${selectPrefixCls}-icon-clear`]: true,
    })
    return (
      <>
        {iconShow && (
          <span onClick={handleReset} onMouseDown={(e) => e.preventDefault()} className={clearIconCls}>
            {clearIcon || <Icon type="close-solid" />}
          </span>
        )}
        {showArrow && <span className={arrowIconCls}>{suffixIcon || <Icon type="arrow-down" />}</span>}
      </>
    )
  }

  const defFilterTreeNode = (node: any) => {
    if (typeof filterTreeNode === 'function') {
      return filterTreeNode(node, searchValue)
    }
    if (node?.[treeNodeFilterProp]?.includes(searchValue)) {
      return true
    }
    return false
  }

  const dropRender = () => {
    const treeProps: any = {
      expandOnClickNode: treeExpandOnClickNode,
      loadData: treeLoadData,
      treeData: treeData,
      virtual,
      defaultExpandAll: treeDefaultExpandAll,
      defaultExpandedKeys: treeDefaultExpandedKeys,
      checkStrictly: treeCheckStrictly,
      selectedKeys,
      expandedKeys,
      filterValue: searchValue,
      icon: treeIcon,
      showIcon: showTreeIcon,
      switcherIcon,
      onlyExpandOnClickIcon: onlyExpandOnClickIcon,
      notFoundContent: renderNotContent(),
      filterTreeNode: defFilterTreeNode,
      onSelect: handleSelect,
      onExpand: handleExpand,
      height: listHeight,
    }

    if (isMultiple) {
      treeProps.checkable = true
      treeProps.checkedKeys = initValue
      treeProps.onCheck = handleCheck
    }
    return <Tree {...treeProps} />
  }

  // 下拉列表为空时显示的内容
  const renderNotContent = () => {
    // 下拉列表为空
    const emptyListCls = classNames({
      [`${selectPrefixCls}-dropdown-empty`]: true,
    })
    const { notFoundContent } = treeSelectProps
    const emptyContent = notFoundContent || locale.getLangMsg('global', 'emptyText')
    return <div className={emptyListCls}>{emptyContent}</div>
  }

  useEffect(() => {
    if (showSearch && autoFocus && !disabled) {
      searchRef.current?.focus()
    }
  }, [showSearch, autoFocus, disabled])

  useEffect(() => {
    setSelectedKeys(initValue)
  }, [initValue])

  useEffect(() => {
    setOptionShow(props.visible)
  }, [props.visible])

  // 渲染下拉列表框
  const renderContent = () => {
    const dropDownStyle = Object.assign({ width: style?.width, maxHeight: virtual ? 'unset' : '' }, dropdownStyle)
    return (
      <>
        {
          <div className={dropDownCls} style={dropDownStyle} ref={dropDownRef}>
            {dropdownRender ? dropdownRender?.(dropRender()) : dropRender()}
          </div>
        }
      </>
    )
  }

  // 处理多选tag
  const handleMaxTagHolder = useCallback(() => {
    const { maxTagPlaceholder } = treeSelectProps
    if (typeof maxTagPlaceholder === 'function') {
      return (
        <Tag type="edit" size={size} disabled={disabled}>
          {maxTagPlaceholder(selectTreeNodes)}
        </Tag>
      )
    } else {
      return (
        <Tag type="edit" size={size} disabled={disabled}>
          {maxTagPlaceholder}
        </Tag>
      )
    }
  }, [selectTreeNodes])

  const renderSingle = () => {
    let label = ''
    if (isSelected) {
      label = getTreeNodeLabel(selectTreeNodes[0])
    }
    return (
      <>
        <div className={singleCls} ref={selectionRef} title={typeof label === 'string' ? label : ''}>
          <span className={`${selectPrefixCls}-selection-search`}>
            <input
              ref={searchRef}
              value={searchValue}
              className={`${selectPrefixCls}-selection-search-input`}
              onChange={handleSearchChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              readOnly={!showSearch || !!disabled}
            />
          </span>
          {isSelected && !searchValue && <span className={`${selectPrefixCls}-selection-item`}>{label}</span>}
          {!isSelected && !searchValue && <span className={`${selectPrefixCls}-placeholder`}>{placeholder}</span>}
          <span className={`${selectPrefixCls}-suffix`}>{renderSuffix()}</span>
        </div>
      </>
    )
  }

  const renderMultiple = () => {
    const { maxTagCount, maxTagPlaceholder } = treeSelectProps
    const multipleCls = classNames(commCls, {
      [`${selectPrefixCls}-multiple-disabled`]: disabled,
      [`${selectPrefixCls}-${mode}`]: mode,
      [`${selectPrefixCls}-focused`]: focusd || optionShow,
      [`${selectPrefixCls}-placeholder`]: placeholder && !selectTreeNodes.length,
    })

    const itemCls = classNames({
      [`${selectPrefixCls}-selection-item`]: true,
      [`${selectPrefixCls}-selection-item-${size}`]: size,
    })
    const TagStyle = { margin: '2px 8px 2px 0', maxWidth: '100%' }
    const totalText = locale.getLangMsg('TreeSelect', 'total', { total: selectTreeNodes.length })
    return (
      <div className={multipleCls} ref={selectionRef}>
        {Array.isArray(selectTreeNodes) && (
          <>
            {selectTreeNodes.map((item: any, index: number) => {
              const { key } = item
              const label = getTreeNodeLabel(item)
              return (
                (!maxTagCount || index <= maxTagCount - 1) && (
                  <span
                    key={key}
                    className={classNames(`${selectPrefixCls}-selection-tag`)}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    {typeof tagRender === 'function' ? (
                      tagRender?.({ onClose: handleRemove, disabled, size, ...item })
                    ) : (
                      <Tag
                        type="edit"
                        style={TagStyle}
                        size={size}
                        closable
                        disabled={disabled}
                        onClose={(e) => handleRemove(e, key)}
                        data-tag={key}
                        title={typeof label === 'string' ? label : ''}
                      >
                        {label}
                      </Tag>
                    )}
                  </span>
                )
              )
            })}
            {maxTagCount && selectTreeNodes.length > maxTagCount ? (
              maxTagPlaceholder ? (
                handleMaxTagHolder()
              ) : (
                <span className={itemCls}>
                  <span className={`${selectPrefixCls}-selection-item-content`}>{totalText}</span>
                </span>
              )
            ) : null}
          </>
        )}
        <span className={`${selectPrefixCls}-selection-search`} style={{ width: inputWidth }}>
          <input
            ref={searchRef}
            value={searchValue}
            className={`${selectPrefixCls}-selection-search-input`}
            onChange={handleSearchChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            readOnly={!showSearch || !!disabled}
          />
          <span ref={measureRef} className={`${selectPrefixCls}-selection-search-mirror`}>
            {searchValue}&nbsp;
          </span>
        </span>
        <span className={`${selectPrefixCls}-placeholder`}>
          {!selectTreeNodes?.length && !searchValue && placeholder}
        </span>
        <span className={`${selectPrefixCls}-suffix`}>{renderSuffix()}</span>
      </div>
    )
  }

  const singleCls = classNames(commCls, {
    [`${selectPrefixCls}-single`]: true,
    [`${selectPrefixCls}-single-disabled`]: disabled,
    [`${selectPrefixCls}-single-focused`]: (focusd && !disabled) || optionShow,
  })

  const renderSelect = () => {
    return (
      <div className={selectCls} ref={selectRef} style={style}>
        <span
          className={selectionCls}
          tabIndex={disabled ? -1 : 0}
          onFocus={() => searchRef.current?.focus()}
          onBlur={() => searchRef.current?.blur()}
        >
          {/* 单选模式Input  多选输入框 */}
          {!isMultiple ? renderSingle() : renderMultiple()}
        </span>
      </div>
    )
  }

  const catchStyle = () => {
    if (selectRef?.current) {
      const { width } = selectRef.current?.getBoundingClientRect()
      return { width: dropdownStyle?.width || (width > 75 ? width : 75), zIndex: 1050, ...popperStyle }
    }
  }

  const handleVisibleChange = (visible: boolean) => {
    if (visible !== optionShow) {
      props.visible === undefined && setOptionShow(visible)
      onVisibleChange?.(visible)
    }
  }

  const popperProps = {
    placement: 'bottomLeft',
    ...treeSelectProps,
    prefixCls: `${selectPrefixCls}-panel`,
    popperStyle: catchStyle(),
    defaultVisible: optionShow,
    visible: optionShow,
    onVisibleChange: handleVisibleChange,
    clickToClose: !(showSearch && searchValue),
  }
  return usePopper(renderSelect(), renderContent(), popperProps)
}

const TreeSelect = React.forwardRef<unknown, ITreeSelectProps<TreeSelectValue>>(InternalTreeSelect)

TreeSelect.displayName = 'TreeSelect'

export default TreeSelect
