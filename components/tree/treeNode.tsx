import React, { MouseEvent, useContext, useEffect } from 'react'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { getCompProps } from '../_utils'
import Checkbox from './../checkbox'
import Icon from '../icon'
import { TreeNodeData } from './index'
// import { tuple } from '../_utils/type'

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
  // leafIcon?: React.ReactNode | ((props: any) => React.ReactNode)
  indeterminate?: boolean
  checked?: boolean
  pos?: string
  estimatedItemSize?: number
  dragOver?: boolean
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

const TreeNode = React.forwardRef<unknown, TreeNodeProps>((props, ref) => {
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
    // leafIcon,
    indeterminate,
    estimatedItemSize,
    dragOver,
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
      // showLine,
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
      indentArr.push(
        <span className={className} key={i} style={{ height: `${estimatedItemSize}` }}>
          &nbsp;&nbsp;&nbsp;&nbsp;
        </span>,
      )
    }
    return indentArr
  }

  // line的两种模式， 图标被替换和图标不被替换
  const renderExpandIcon = () => {
    // todo 图标被替换则 line样式改变
    // if(switcherIcon){

    // }
    if (hasChildNode) {
      // todo    showLine模式 使用+ -符号图标
      // if(!!showLine){
      //   return (
      //     <span
      //     onClick={handleClick}
      //     className={classNames(`${treeNodePrefixCls}-icon`)}
      //   >
      //     {expand ? <Icon type='search' /> : <Icon type='add' />}
      //   </span>
      //   )
      // }
      if (Array.isArray(switcherIcon) && switcherIcon.length === 2) {
        return (
          <span className={classNames(`${treeNodePrefixCls}-icon`)}>
            {expandState ? renderIcon(switcherIcon[1]) : renderIcon(switcherIcon[0])}
          </span>
        )
      }
      return (
        <span
          className={classNames(`${treeNodePrefixCls}-icon`, {
            [`${treeNodePrefixCls}-animation-expand`]: expandState,
            [`${treeNodePrefixCls}-animation-collapse`]: !expandState,
          })}
        >
          {renderIcon(switcherIcon || <Icon type="arrow-right-solid" />)}
        </span>
      )
    } else {
      // if(typeof showLine === 'object' && !showLine.showLeafIcon){
      //   return (
      //     <span
      //       className={classNames(`${treeNodePrefixCls}-icon-hidden`)}
      //     >
      //       {/* todo  renderLeafLine() */}
      //       {renderIcon(leafIcon)}
      //     </span>
      //   )
      // }else if(typeof showLine === 'object' && showLine.showLeafIcon || showLine === true){
      //   return (
      //     <span
      //       className={classNames(`${treeNodePrefixCls}-leaf-icon`)}
      //     >
      //       {renderIcon(leafIcon)}
      //     </span>
      //   )
      // }
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
          <div className={`${treeNodePrefixCls}-title-wrap`}>
            {checkable ? (
              <Checkbox
                onChange={handleOnchange}
                checked={checked}
                indeterminate={!disabled && indeterminate}
                disabled={disabled}
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
            {showDragLine && !dragOver && <span className={classNames(`${treeNodePrefixCls}-drag-line`)}></span>}
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
  React.useImperativeHandle(ref, () => ({ selectNode: handleSelect }))

  const handleClick = React.useCallback(
    (e: MouseEvent) => {
      e.stopPropagation()
      setExpandState(!expandState)
      onExpand && onExpand(nodeKey, !expandState, nodeData)
      handleSelect(e)
    },
    [setExpandState, expandState, onExpand, nodeKey, nodeData, handleSelect],
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
        { [`${treeNodePrefixCls}-item-hover`]: !disabled && selectable },
        { [`${treeNodePrefixCls}-selected`]: selected && selectable && !disabled },
        { [`${treeNodePrefixCls}-disabled`]: disabled },
        { [`${treeNodePrefixCls}-opened`]: expandState },
        `${treeNodePrefixCls}-item-${nodeKey}`,
        className,
      )}
      style={{ height: `${estimatedItemSize}px`, ...style }}
      onClick={handleClick}
    >
      {renderNode()}
    </div>
  )
})

TreeNode.displayName = 'TreeNode'
export default TreeNode
