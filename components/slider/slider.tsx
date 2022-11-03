import React, { FunctionComponentElement, useContext, useEffect, useRef } from 'react'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { getCompProps } from '../_utils'
import devWarning from '../_utils/devwarning'
import Marks from './marks'
import Steps from './steps'
import Track from './track'
import SliderTooltip from './sliderTooltip'
import { PlacementType } from '../_utils/usePopper'
import { useMergedState } from '../_utils/hooks'
import { getHandleCenterposition, ensureValueInRange, ensureValuePrecision } from './utils'
interface sliderMarkProps {
  [key: number]: React.ReactNode | { style?: React.CSSProperties; label: React.ReactNode }
}

export interface ISliderProps {
  className?: string // 样式名
  style?: React.CSSProperties
  children?: React.ReactNode // 子元素
  defaultValue?: number | number[]
  disabled?: boolean
  dots?: boolean
  marks?: sliderMarkProps
  min?: number
  max?: number
  reverse?: boolean
  step?: number | null
  tipFormatter?: null | ((value?: number) => React.ReactNode)
  tooltipVisible?: boolean
  tooltipPlacemant?: PlacementType
  value?: number | number[]
  getPopupContainer?: () => React.ReactNode
  vertical?: boolean
  onAfterChange?: (value?: number | number[]) => void
  onChange?: (value?: number | number[]) => void
}

// remove this line and code Slider component here
const InteranalSlider = (props: ISliderProps, ref: unknown): FunctionComponentElement<any> => {
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps } = useContext(ConfigContext)
  const sliderProps = getCompProps('Slider', userDefaultProps, props)
  const {
    className,
    style,
    prefixCls: customPrefixcls,
    defaultValue,
    disabled,
    dots,
    marks,
    min,
    max,
    vertical,
    reverse,
    step,
    tipFormatter,
    tooltipVisible,
    tooltipPlacement,
    value: propsValue,
    getPopupContainer,
    onAfterChange,
    onChange,
    onBlur,
    ...others
  } = sliderProps

  devWarning(className && className.indexOf('shit') > -1, 'slider', `slider className can't include '${className}'`)

  const sliderPrefixCls = getPrefixCls!(prefixCls, 'slider', customPrefixcls)

  // ref
  const thisSliderRef = useRef<HTMLElement>()
  const sliderRef = (ref as any) || thisSliderRef
  const handleRef = useRef<HTMLElement>()

  const sliderClasses = classNames(sliderPrefixCls, className, {
    [`${sliderPrefixCls}-vertical`]: vertical,
    [`${sliderPrefixCls}-disabled`]: disabled,
    [`${sliderPrefixCls}-reverse`]: reverse,
  })

  const [value, setValue] = useMergedState(0, {
    defaultValue,
    value: propsValue,
  })
  const isDragging = useRef(false)
  const valueRef = useRef(
    useMergedState(0, {
      defaultValue,
      value: propsValue,
    }) as any,
  )

  let mouseOffset: number
  const addDocumentMouseEvents = () => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }
  const removeDocumentEvents = () => {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }
  const noop = () => undefined

  // 获取开始位置尺寸
  const getSliderStart = () => {
    const rect = sliderRef.current.getBoundingClientRect()
    if (vertical) {
      return reverse ? rect.bottom : rect.top
    }
    return window.pageXOffset + (reverse ? rect.right : rect.left)
  }
  // 获取整个滑块的长度
  const getSliderLength = () => {
    const slider = sliderRef.current
    if (!slider) {
      return 0
    }

    const coords = slider.getBoundingClientRect()
    return vertical ? coords.height : coords.width
  }
  // 将鼠标点击位置距开始位置的偏移量转化为value
  const calcValue = (offset: number) => {
    const ratio = Math.abs(Math.max(offset, 0) / getSliderLength())
    const value = vertical ? (1 - ratio) * (max - min) + min : ratio * (max - min) + min
    return value
  }
  // 对值进行转化 1. 在[min, max]区间 2. 当设置了step或者marks时找到距离最近的点
  const trimAlignValue = (v: number, nextProps: Partial<ISliderProps> = {}) => {
    if (v === null) {
      return null
    }

    const mergedProps = { ...sliderProps, ...nextProps }
    const val = ensureValueInRange(v, mergedProps)
    return ensureValuePrecision(val!, mergedProps)
  }
  // 将鼠标点击的位置转化value
  const calcValueByPos = (position: number) => {
    const sign = reverse ? -1 : +1
    const pixelOffset = sign * (position - getSliderStart())
    const nextValue = trimAlignValue(calcValue(pixelOffset))
    return nextValue
  }
  const onEnd = () => {
    removeDocumentEvents()
    if (isDragging.current) {
      onAfterChange && onAfterChange(valueRef.current)
    }
    isDragging.current = false
  }
  const handleTouchStart = () => {
    // console.log('object :>> ', 'object', addDocumentMouseEvents)
  }
  const handleMouseDown = (e: MouseEvent) => {
    // 移除document的鼠标事件
    removeDocumentEvents()
    // 获取当前鼠标的坐标位置
    let position = vertical ? e.clientY : e.pageX
    // 判断当前点击的区域是否是拖拽点还是bar条
    const isHandlePoint = handleRef.current === e.target
    if (!isHandlePoint) {
      mouseOffset = 0
    } else {
      const handlePosition = getHandleCenterposition(vertical!, e.target as HTMLElement)
      mouseOffset = position - handlePosition
      position = handlePosition
    }
    // 设置状态值
    isDragging.current = true
    const newV = calcValueByPos(position)
    if (newV !== value) {
      setValue(newV)
      valueRef.current = newV
    }
    onChange && onChange(newV)
    // 监听document的鼠标事件
    addDocumentMouseEvents()
  }
  const handleMouseUp = () => {
    onEnd()
  }
  const handleKeyDown = () => {
    // console.log('object :>> ', 'object')
  }
  const handleFocus = () => {
    // console.log('object :>> ', 'object')
  }
  const handleBlur = (e: FocusEvent) => {
    onEnd()
    onBlur && onBlur(e)
  }
  const handleMouseMove = (e: MouseEvent) => {
    if (!sliderRef.current) {
      removeDocumentEvents()
      if (isDragging.current) {
        onAfterChange(value)
      }
      isDragging.current = false
      return
    }
    const position = vertical ? e.clientY : e.pageX
    const newV = calcValueByPos(position - mouseOffset)
    if (newV !== value) {
      setValue(newV)
      valueRef.current = newV
    }

    onChange && onChange(newV)
  }

  useEffect(() => {
    return () => {
      removeDocumentEvents()
    }
  }, [])

  return (
    <div
      ref={sliderRef}
      className={sliderClasses}
      {...others}
      style={style}
      onTouchStart={disabled ? noop : handleTouchStart}
      onMouseDown={disabled ? noop : handleMouseDown}
      // onMouseUp={disabled ? noop : handleMouseUp}
      onKeyDown={disabled ? noop : handleKeyDown}
      onFocus={disabled ? noop : handleFocus}
      onBlur={disabled ? noop : handleBlur}
    >
      <div className={`${sliderPrefixCls}-rail`}></div>
      <Track prefixCls={sliderPrefixCls} vertical={vertical} reverse={reverse} min={min} max={max} bound={value} />
      <Steps
        marks={marks}
        prefixCls={sliderPrefixCls}
        vertical={vertical}
        min={min}
        max={max}
        dots={dots}
        step={step}
        reverse={reverse}
        bound={value}
      />
      <SliderTooltip
        ref={handleRef}
        placement={tooltipPlacement}
        tip={tipFormatter?.(value)}
        visible={disabled ? false : tooltipVisible}
        prefixCls={sliderPrefixCls}
        vertical={vertical}
        reverse={reverse}
        min={min}
        max={max}
        bound={value}
        getPopupContainer={getPopupContainer}
      />
      <Marks
        marks={marks}
        prefixCls={sliderPrefixCls}
        vertical={vertical}
        reverse={reverse}
        min={min}
        max={max}
        bound={value}
        onClickLabel={() => {
          // console.log('hello world!')
        }}
      />
    </div>
  )
}

const Slider = React.forwardRef<unknown, ISliderProps>(InteranalSlider)
Slider.displayName = 'Slider'
export default Slider
