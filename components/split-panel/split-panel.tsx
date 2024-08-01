import React, { useContext, useState, useEffect, useRef, useMemo, useCallback } from 'react'
import ConfigContext from '../config-provider/ConfigContext'
import Trigger from './trigger'
import classNames from 'classnames'
import { getCompProps } from '../_utils'
import { SplitPanelMode, FoldDirection } from './interface'
import { tuple } from '../_utils/type'
import devWarning from '../_utils/devwarning'
import ResizeObserver from 'resize-observer-polyfill'

export const SplitPanelModes = tuple('horizontal', 'vertical')

export interface SplitPanelProps {
  prefixCls?: string // css prefix前缀
  className?: string
  style?: React.CSSProperties
  disabled?: boolean // 是否禁用拖拽
  defaultSplit?: number | string // 默认分割比例
  mode?: SplitPanelMode // 分割容器模式：垂直or水平（'horizontal' | 'vertical'）
  lineStyle?:
    | ((mode: SplitPanelMode) => React.CSSProperties | undefined | null)
    | React.CSSProperties
    | undefined
    | null
  min?: number | string // 最小阈值
  max?: number | string // 最大阈值
  firstSlot?: React.ReactNode // 第一个插槽的内容，在horizontal模式下为left区域，在vertical模式下为top区域
  secondSlot?: React.ReactNode // 第二个插槽的内容，在horizontal模式下为right区域，在vertical模式下为bottom区域
  canFold?: boolean
  foldIcons?: ((mode: SplitPanelMode) => React.ReactNode[] | undefined) | React.ReactNode[] | undefined
  onFold?: (e: React.MouseEvent, direction: FoldDirection) => void
  onMoving?: (e: MouseEvent) => void
  onMoveStart?: (e: React.MouseEvent) => void
  onMoveEnd?: (e: MouseEvent) => void
}

function pxToScale(numerator: string | number, denominator: string | number) {
  const percent = parseFloat(numerator as string) / parseFloat(denominator as string)
  return calcNumber(percent)
}

function calcNumber(value: number): number {
  if (value > 1) return 1
  if (value < 0) return 0
  return value
}

function valueIsNaN(value: number | string) {
  return Number.isNaN(parseFloat(value as string))
}

const SplitPanel: React.FC<SplitPanelProps> = (props) => {
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps } = useContext(ConfigContext)
  const splitPanelProps = getCompProps('SplitPanel', userDefaultProps, props) // props
  const {
    prefixCls: customPrefixcls,
    className,
    style,
    disabled,
    defaultSplit,
    mode,
    lineStyle,
    min,
    max,
    firstSlot,
    secondSlot,
    canFold,
    foldIcons,
    onFold,
    onMoving,
    onMoveStart,
    onMoveEnd,
  } = splitPanelProps

  devWarning(SplitPanelModes.indexOf(mode) === -1, 'split-panel', `cannot found split-panel mode '${mode}'`)
  devWarning(valueIsNaN(defaultSplit), 'split-panel', `incorrect prop 'defaultSplit'`)

  const splitPanelPrefixCls = getPrefixCls!(prefixCls, 'split', customPrefixcls)
  const isHorizontal = mode === 'horizontal'
  const offsetSizeProperty = isHorizontal ? 'clientWidth' : 'clientHeight'
  const pos = isHorizontal ? 'left' : 'top'
  const oppositePos = isHorizontal ? 'right' : 'bottom'
  const oppositeMode = isHorizontal ? 'vertical' : 'horizontal'
  const outerWrapper = useRef(null)
  const [isMoving, setIsMoving] = useState(false)
  const [offset, setOffset] = useState(0)
  const [anotherOffset, setAnotherOffset] = useState(100)
  const [computeMin, setComputeMin] = useState(0)
  const [computeMax, setComputeMax] = useState(100)
  const [offsetCache, setOffsetCache] = useState(0)
  const isFirstPanelHide = offset === 0
  const isSecondPanelHide = offset === 100
  const canDrag = offset >= computeMin && offset <= computeMax

  useEffect(() => {
    setAnotherOffset(100 - offset)
  }, [offset])

  // 将defaultOffset转换成百分比
  const getComputeOffset = useCallback(
    (value: number | string) => {
      const newVal =
        typeof value === 'string' ? pxToScale(value, outerWrapper.current![offsetSizeProperty]) : calcNumber(value)
      return newVal * 100
    },
    [offsetSizeProperty],
  )

  // 将min和max转换为百分比
  const getComputedThresholdValue = useCallback(
    (val: string | number) => {
      const size = outerWrapper.current![offsetSizeProperty]
      const newVal = typeof val === 'string' ? pxToScale(val, size) : calcNumber(val)
      return newVal * 100
    },
    [offsetSizeProperty],
  )

  // 初始化分割线、min和max
  const initPanel = useCallback(() => {
    let thresholdMin = getComputedThresholdValue(min)
    const thresholdMax = 100 - getComputedThresholdValue(max)
    let computeOffset = getComputeOffset(defaultSplit)
    // 边界处理，计算出的min和max进行判断
    if (thresholdMin > thresholdMax) {
      thresholdMin = thresholdMax
    }
    // 计算出的offset值的边界处理
    if (computeOffset < thresholdMin) {
      computeOffset = thresholdMin
    } else if (computeOffset > thresholdMax) {
      computeOffset = thresholdMax
    }
    setOffset(computeOffset)
    setOffsetCache(computeOffset)
    setComputeMin(thresholdMin)
    setComputeMax(thresholdMax)
  }, [min, max, defaultSplit, getComputedThresholdValue, getComputeOffset])

  useEffect(() => {
    initPanel()
    const element = outerWrapper.current
    if (!element) {
      devWarning(
        !element && element !== null,
        'useResizeMeasure',
        'Specified element for useResizeMeasure does not exist',
      )
      return
    }
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (entry.contentRect) {
        initPanel()
      }
    })
    resizeObserver.observe(element as Element)
    return () => {
      resizeObserver.disconnect()
    }
  }, [initPanel])

  const handleMove = useCallback(
    (e: MouseEvent) => {
      // 将鼠标移动距离与offset进行处理
      const scrollX = document.documentElement.scrollLeft || document.body.scrollLeft
      const scrollY = document.documentElement.scrollTop || document.body.scrollTop
      const wrapperOffset = (outerWrapper.current! as HTMLDivElement).getBoundingClientRect()[pos]
      const mouseOffset = isHorizontal ? e.pageX - scrollX : e.pageY - scrollY
      const moveInstance = mouseOffset - wrapperOffset!
      const outerWidth = outerWrapper.current![offsetSizeProperty]
      let value = pxToScale(moveInstance, outerWidth) * 100
      // 边界阈值处理
      if (value <= computeMin) value = Math.max(value, computeMin)
      if (value >= computeMax) value = Math.min(value, computeMax)
      setOffset(value)
      setOffsetCache(value)
      onMoving && onMoving(e)
    },
    [pos, offsetSizeProperty, isHorizontal, onMoving, computeMin, computeMax],
  )
  const handleUp = useCallback(
    (e: MouseEvent) => {
      setIsMoving(false)
      document.removeEventListener('mouseup', handleUp)
      document.removeEventListener('mousemove', handleMove)
      onMoveEnd && onMoveEnd(e)
    },
    [handleMove, onMoveEnd],
  )
  const handleMousedown = useCallback(
    (e: React.MouseEvent) => {
      if (disabled || !canDrag) return
      e.stopPropagation()
      setIsMoving(true)
      document.addEventListener('mousemove', handleMove)
      document.addEventListener('mouseup', handleUp)
      onMoveStart && onMoveStart(e)
    },
    [disabled, canDrag, handleMove, handleUp, onMoveStart],
  )

  const changeSplit = useCallback((offset) => {
    setOffset(offset)
  }, [])

  const getSecondHideOffset = () => {
    if (offset === 0 && computeMin > 0) {
      return computeMin
    } else if (offset >= computeMin && offset < offsetCache) {
      return offsetCache
    } else {
      return 100
    }
  }

  const getFirstHideOffset = () => {
    if (offset === 100 && computeMax < 100) {
      return computeMax
    } else if (offset > offsetCache && offset <= computeMax) {
      return offsetCache
    } else {
      return 0
    }
  }

  // 折叠第一个面板
  const hideFirstPanel = (e: React.MouseEvent, direction: FoldDirection) => {
    if (disabled) return
    e.persist()
    const pos = getFirstHideOffset()
    changeSplit(pos)
    onFold && onFold(e, direction)
  }

  // 折叠第二个面板
  const hideSecondPanel = (e: React.MouseEvent, direction: FoldDirection) => {
    if (disabled) return
    e.persist()
    const pos = getSecondHideOffset()
    changeSplit(pos)
    onFold && onFold(e, direction)
  }

  // 处理lineStyle
  const handleLineStyle = useCallback(
    (mode: SplitPanelMode) => {
      if (typeof lineStyle === 'function') {
        return lineStyle(mode)
      }
      return lineStyle
    },
    [lineStyle],
  )
  const triggerLineStyle = useMemo(() => {
    return {
      horizontal: handleLineStyle('horizontal') || {},
      vertical: handleLineStyle('vertical') || {},
    }
  }, [handleLineStyle])

  // 处理自定义折叠图标
  const handleFoldIcons = useCallback(
    (mode: SplitPanelMode) => {
      if (typeof foldIcons === 'function') {
        return foldIcons(mode)
      }
      return foldIcons
    },
    [foldIcons],
  )
  const triggerFoldIcons = useMemo(() => {
    return {
      horizontal: handleFoldIcons('horizontal'),
      vertical: handleFoldIcons('vertical'),
    }
  }, [handleFoldIcons])

  const cls = classNames(
    `${splitPanelPrefixCls}-wrapper`,
    {
      'no-select': isMoving,
    },
    className,
  )
  const getPanelCls = (cls: string) =>
    classNames(
      `${splitPanelPrefixCls}-panel`,
      {
        [`${splitPanelPrefixCls}-panel-moving`]: isMoving,
      },
      `${cls}-panel`,
    )
  const triggerWrapperCls = classNames(`${splitPanelPrefixCls}-trigger-con`, {
    'can-drag': canDrag,
    'is-disabled': disabled,
    'is-active': isFirstPanelHide || isSecondPanelHide,
  })

  return (
    <div className={cls} style={style} ref={outerWrapper}>
      <div className={`${splitPanelPrefixCls}-${mode}`}>
        <div className={getPanelCls(pos)} style={{ [oppositePos]: `${anotherOffset}%` }}>
          {firstSlot}
        </div>
        <div className={triggerWrapperCls} style={{ [pos]: `${offset}%` }}>
          <Trigger
            style={triggerLineStyle[mode as SplitPanelMode]}
            mode={oppositeMode}
            prefixCls={splitPanelPrefixCls}
            disabled={disabled}
            showFoldIcons={canFold}
            hideFirstPanel={hideFirstPanel}
            hideSecondPanel={hideSecondPanel}
            foldIcons={triggerFoldIcons[mode as SplitPanelMode]}
            handleMousedown={handleMousedown}
          />
        </div>
        <div className={getPanelCls(oppositePos)} style={{ [pos]: `${offset}%` }}>
          {secondSlot}
        </div>
      </div>
    </div>
  )
}

SplitPanel.displayName = 'SplitPanel'
export default SplitPanel
