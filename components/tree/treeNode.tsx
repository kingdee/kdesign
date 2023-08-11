import React, { MouseEvent, useCallback, useContext, useEffect } from 'react'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { getCompProps } from '../_utils'
import Checkbox from './../checkbox'
import Icon from '../icon'
import Spin from '../spin'
import { TreeNodeData } from './index'

export interface TreeNodeProps {
  nodeKey?: string
  title?: string
  selectable?: boolean
  checkable?: boolean
  className?: string
  disabled?: boolean
  draggable?: boolean
  disableCheckbox?: boolean
  icon?: React.ReactNode | ((props: any) => React.ReactNode)
  showLine?: boolean | { showLeafIcon: boolean }
  showIcon?: boolean
  selected?: boolean
  style?: Map<string, string>
  hasChildNode?: boolean
  expand?: boolean
  level?: number
  switcherIcon?: React.ReactNode | ((props: any) => React.ReactNode)
  indeterminate?: boolean
  checked?: boolean
  pos?: string
  estimatedItemSize?: number
  dragOver?: boolean
  isLeaf?: boolean
  expandOnClickNode?: boolean
  onlyExpandOnClickIcon?: boolean
  onCheck?: (
    key: string,
    value: boolean,
    node: React.ReactNode,
    event: React.MouseEvent<MouseEvent>,
    pos: string,
  ) => void
  onSelect?: (event: React.MouseEvent<MouseEvent>, node: React.ReactNode, key: string) => void
  onExpand?: (value: boolean, node: React.ReactNode) => void
  onDragStart?: (event: React.MouseEvent<MouseEvent>, node: React.ReactNode) => void
  onDragOver?: (event: React.MouseEvent<MouseEvent>, node: React.ReactNode) => void
  onDragLeave?: (event: React.MouseEvent<MouseEvent>, node: React.ReactNode) => void
  onDragEnter?: (event: React.MouseEvent<MouseEvent>, node: React.ReactNode) => void
  onDragEnd?: (event: React.MouseEvent<MouseEvent>, node: React.ReactNode) => void
  onDrop?: (event: React.MouseEvent<MouseEvent>, node: React.ReactNode, dragNode: React.ReactNode) => void
  setDragNode?: (nodeData: TreeNodeData) => void
  getDragNode?: () => TreeNodeData
}

const TreeNode = React.forwardRef<unknown, TreeNodeProps>((props) => {
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps } = useContext(ConfigContext)

  const TreeNodeProps = getCompProps('TreeNode', userDefaultProps, props) // 按钮属性需要合并一遍用户定义的默认属性
  const {
    nodeKey,
    prefixCls: customPrefixcls,
    selectable,
    checkable,
    className,
    icon,
    switcherIcon,
    disabled,
    draggable,
    pos,
    checked,
    level,
    getDragNode,
    hasChildNode,
    expand,
    title,
    showLine,
    showIcon,
    selected,
    setDragNode,
    style,
    indeterminate,
    estimatedItemSize,
    dragOver,
    dropPosition,
    expandOnClickNode,
    onlyExpandOnClickIcon,
    loading,
    onExpand,
    onCheck,
    onDragStart,
    onDragOver,
    onDragLeave,
    onDragEnter,
    onDragEnd,
    onDrop,
    onSelect,
    ...others
  } = TreeNodeProps
  const nodeData = React.useMemo(() => {
    return {
      selectable,
      checkable,
      expand,
      key: nodeKey,
      level,
      title,
      disabled,
      draggable,
      checked,
      pos,
      hasChildNode,
      indeterminate,
      icon,
      switcherIcon,
      showIcon,
      selected,
      ...others,
    }
  }, [
    selectable,
    checkable,
    expand,
    nodeKey,
    level,
    title,
    disabled,
    draggable,
    checked,
    pos,
    hasChildNode,
    indeterminate,
    icon,
    switcherIcon,
    showIcon,
    selected,
  ])

  const useExpand = (value: boolean): [boolean, (value: boolean) => void] => {
    const [expand, setExpand] = React.useState(value)
    const setExpandState = (value: boolean) => setExpand(value)
    useEffect(() => {
      setExpand(value)
    }, [value])
    return [expand, setExpandState]
  }

  const dragRef = React.useRef<HTMLElement>(null)
  const [expandState, setExpandState] = useExpand(expand)
  const [showDragLine, setShowDragLine] = React.useState(false)
  const [forbiddenChildrenPointerEvents, setForbiddenChildrenPointerEvents] = React.useState(false)
  const treeNodePrefixCls = getPrefixCls!(prefixCls, 'tree-node', customPrefixcls) // 按钮样式前缀

  const renderIcon = (icon: React.ReactNode | ((props: any) => React.ReactNode)): React.ReactNode => {
    if (typeof icon === 'function') {
      const nodeProps = {
        selectable,
        checkable,
        disabled,
        title,
        draggable,
        checked,
        hasChildNode,
        expand,
        nodeKey,
        icon,
        switcherIcon,
        showIcon,
        selected,
        indeterminate,
      }
      return icon({ ...nodeProps })
    }
    return icon
  }

  const indent = () => {
    const indentArr = []
    const className = classNames({
      [`${treeNodePrefixCls}-indent`]: true,
      [`${treeNodePrefixCls}-indent-line`]: !!showLine,
    })
    for (let i = 0; i < level; i++) {
      indentArr.push(<span className={className} key={i} style={{ height: `${estimatedItemSize}` }}></span>)
    }
    return indentArr
  }

  const isLeaf = useCallback(() => {
    const { isLeaf, loadData, hasChildNode } = TreeNodeProps
    if (isLeaf === false) {
      return false
    }
    return isLeaf || (!loadData && !hasChildNode)
  }, [TreeNodeProps])

  // line的两种模式， 图标被替换和图标不被替换
  const renderExpandIcon = () => {
    if (loading) {
      return <Spin type="component" />
    }

    const showExpandIcon = !isLeaf()
    if (showExpandIcon) {
      if (Array.isArray(switcherIcon) && switcherIcon.length === 2) {
        return (
          <span
            className={classNames(`${treeNodePrefixCls}-icon`, {
              [`${treeNodePrefixCls}-icon-hover`]: !expandOnClickNode,
            })}
            onClick={
              expandOnClickNode ? (onlyExpandOnClickIcon ? handleExpandIconClick : undefined) : handleExpandIconClick
            }
          >
            {expandState ? renderIcon(switcherIcon[1]) : renderIcon(switcherIcon[0])}
          </span>
        )
      }
      return (
        <span
          className={classNames(`${treeNodePrefixCls}-icon`, {
            [`${treeNodePrefixCls}-animation-expand`]: expandState,
            [`${treeNodePrefixCls}-animation-collapse`]: !expandState,
            [`${treeNodePrefixCls}-icon-hover`]: !expandOnClickNode,
          })}
          onClick={
            expandOnClickNode ? (onlyExpandOnClickIcon ? handleExpandIconClick : undefined) : handleExpandIconClick
          }
        >
          {renderIcon(switcherIcon || <Icon type="arrow-right-solid" />)}
        </span>
      )
    } else {
      // 叶子结点 隐藏展开按钮
      return <span className={`${treeNodePrefixCls}-icon-hidden`}></span>
    }
  }

  const renderNodeIcon = () => {
    return <span className={`${treeNodePrefixCls}-leaf-icon`}>{renderIcon(icon)}</span>
  }

  const renderNode = () => {
    return (
      <>
        <div
          draggable={draggable && !disabled}
          className={classNames({
            [`${treeNodePrefixCls}-draggabled`]: true,
            [`${treeNodePrefixCls}-root`]: true,
            [`${treeNodePrefixCls}-fb-children-pointerEvents`]: forbiddenChildrenPointerEvents,
            [`${treeNodePrefixCls}-drag-over`]: dragOver,
          })}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDragEnter={handleDragEnter}
          onDrop={handleDrop}
          ref={dragRef as any}
        >
          {indent()}
          {renderExpandIcon()}
          {showIcon && renderNodeIcon()}
          <div
            className={classNames({
              [`${treeNodePrefixCls}-title-wrap`]: true,
              [`${treeNodePrefixCls}-title-wrap-hover`]: !expandOnClickNode && !disabled,
              [`${treeNodePrefixCls}-title-wrap-selected`]: selected && selectable && !disabled && !expandOnClickNode,
            })}
            onClick={expandOnClickNode ? undefined : handleClick}
          >
            {showDragLine && dropPosition === -1 && (
              <span className={classNames(`${treeNodePrefixCls}-drag-line-top`)}></span>
            )}
            {checkable ? (
              <Checkbox
                onChange={handleOnchange}
                checked={checked}
                indeterminate={!disabled && indeterminate}
                disabled={disabled}
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                <span
                  className={classNames(`${treeNodePrefixCls}-title`, {
                    [`${treeNodePrefixCls}-title-disabled`]: disabled,
                  })}
                >
                  {title}
                </span>
              </Checkbox>
            ) : (
              <span
                className={classNames(`${treeNodePrefixCls}-title`, {
                  [`${treeNodePrefixCls}-title-disabled`]: disabled,
                })}
              >
                {title}
              </span>
            )}
            {showDragLine && dropPosition === 1 && (
              <span className={classNames(`${treeNodePrefixCls}-drag-line-bottom`)}></span>
            )}
          </div>
        </div>
      </>
    )
  }

  const handleOnchange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.checked
      onCheck && onCheck(nodeKey, value, nodeData, e, pos)
    },
    [onCheck, nodeKey, nodeData, pos],
  )
  const handleSelect = React.useCallback(
    (e: MouseEvent) => {
      selectable && !disabled && onSelect && onSelect(e, nodeData, nodeKey)
    },
    [onSelect, selectable, disabled, nodeData, nodeKey],
  )

  const handleExpandIconClick = useCallback(
    (e?: MouseEvent) => {
      e?.stopPropagation()
      setExpandState(!expandState)
      onExpand && onExpand(nodeKey, !expandState, nodeData)
    },
    [expandState, nodeData, nodeKey, onExpand, setExpandState],
  )

  const handleClick = React.useCallback(
    (e: MouseEvent) => {
      e.stopPropagation()
      if (expandOnClickNode) {
        !onlyExpandOnClickIcon && handleExpandIconClick()
      }
      handleSelect(e)
    },
    [expandOnClickNode, handleExpandIconClick, handleSelect, onlyExpandOnClickIcon],
  )

  const handleDragStart = React.useCallback(
    (e) => {
      if (!draggable) return
      setDragNode(nodeData)
      onDragStart && onDragStart(e, props)
    },
    [draggable, setDragNode, nodeData, onDragStart, props],
  )

  const handleDragOver = React.useCallback(
    (e) => {
      if (!draggable) return
      e.preventDefault()
      onDragOver && onDragOver(e, nodeData, dragRef.current)
    },
    [onDragOver, nodeData, draggable],
  )

  const handleDragLeave = React.useCallback(
    (e) => {
      if (!draggable) return
      if (!dragRef.current?.isEqualNode(e.target)) return
      setForbiddenChildrenPointerEvents(false)
      setShowDragLine(false)
      onDragLeave && onDragLeave(e, nodeData)
    },
    [onDragLeave, nodeData, draggable],
  )

  const handleDragEnter = React.useCallback(
    (e) => {
      if (!draggable) return
      setForbiddenChildrenPointerEvents(true)
      if (!dragRef.current?.isEqualNode(e.target)) return
      setShowDragLine(true)
      onDragEnter && onDragEnter(e, nodeData, dragRef.current)
    },
    [onDragEnter, nodeData, draggable],
  )

  const handleDragEnd = React.useCallback(
    (e) => {
      if (!draggable) return
      onDragEnd && onDragEnd(e, nodeData)
      setDragNode(undefined)
    },
    [onDragEnd, nodeData, draggable],
  )

  const handleDrop = React.useCallback(
    (e) => {
      if (!draggable) return
      setShowDragLine(false)
      setForbiddenChildrenPointerEvents(false)
      const data = getDragNode()
      const sourceKey = data?.key
      if (sourceKey) {
        const targetKey = nodeKey
        if (targetKey !== sourceKey) {
          onDrop && onDrop(e, nodeData, data, sourceKey)
        }
      }
    },
    [onDrop, nodeData, nodeKey],
  )

  return (
    <div
      className={classNames(
        `${treeNodePrefixCls}-item`,
        { [`${treeNodePrefixCls}-item-hover`]: !disabled && selectable && expandOnClickNode },
        { [`${treeNodePrefixCls}-selected`]: selected && selectable && !disabled && expandOnClickNode },
        { [`${treeNodePrefixCls}-disabled`]: disabled },
        { [`${treeNodePrefixCls}-opened`]: expandState },
        `${treeNodePrefixCls}-item-${nodeKey}`,
        className,
      )}
      style={{ height: `${estimatedItemSize}px`, ...style }}
      onClick={expandOnClickNode ? handleClick : undefined}
    >
      {renderNode()}
    </div>
  )
})

TreeNode.displayName = 'TreeNode'
export default TreeNode
