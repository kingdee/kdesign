import React, { useEffect, useState, useCallback, useRef, cloneElement } from 'react'
import ReactDOM from 'react-dom'
import { tuple } from '../_utils/type'
import debounce from 'lodash/debounce'
import classNames from 'classnames'
import devWarning from '../_utils/devwarning'
import { useResizeObserver } from './hooks'

export const Placements = tuple(
  'top',
  'left',
  'right',
  'bottom',
  'topLeft',
  'topRight',
  'bottomLeft',
  'bottomRight',
  'leftTop',
  'leftBottom',
  'rightTop',
  'rightBottom',
)
export type PlacementType = typeof Placements[number]

export const Triggers = tuple('hover', 'focus', 'click', 'contextMenu')

export type TriggerType = typeof Triggers[number]

type Position = {
  top: number
  left: number
  right: number
  bottom: number
  height: number
  width: number
}

type Align = {
  top: number
  left?: number
  right?: number
}

type NormalProps = {
  [key: string]: any
}

export interface PopperProps {
  gap?: number
  arrow?: boolean
  visible?: boolean
  prefixCls?: string
  arrowSize?: number
  disabled?: boolean
  arrowOffset?: number
  scrollHidden?: boolean
  mouseEnterDelay?: number
  mouseLeaveDelay?: number
  defaultVisible?: boolean
  autoPlacement?: boolean
  popperClassName?: string
  placement?: PlacementType
  popperStyle?: React.CSSProperties
  trigger?: TriggerType | Array<TriggerType>
  clickToClose?: boolean
  isMobile?: boolean
  triggerScroll?: boolean
  onTrigger?: (trigger: TriggerType) => void
  onVisibleChange?: (visible: boolean) => void
  getTriggerElement?: (locatorNode: HTMLElement) => HTMLElement
  getPopupContainer?: (locatorNode: HTMLElement) => HTMLElement
  onTransitionEnd?: (e: React.TransitionEvent) => void
}

function getTranslate(node: Element, param: string) {
  const translates = document.defaultView?.getComputedStyle(node, null).transform.substring(7) || ''
  const result = translates.match(/\(([^)]*)\)/)
  const matrix = result ? result[1].split(',') : translates.split(',')
  if (param === 'x' || param === undefined) {
    return matrix.length > 6 ? parseFloat(matrix[12]) : parseFloat(matrix[4])
  } else if (param === 'y') {
    return matrix.length > 6 ? parseFloat(matrix[13]) : parseFloat(matrix[5])
  } else if (param === 'z') {
    return matrix.length > 6 ? parseFloat(matrix[14]) : 0
  } else if (param === 'rotate') {
    return matrix.length > 6
      ? getRotate([parseFloat(matrix[0]), parseFloat(matrix[1]), parseFloat(matrix[4]), parseFloat(matrix[5])])
      : getRotate(matrix.map((i: string) => parseFloat(i)))
  }
}

function getRotate(matrix: Array<number>) {
  const aa = Math.round((180 * Math.asin(matrix[0])) / Math.PI)
  const bb = Math.round((180 * Math.acos(matrix[1])) / Math.PI)
  const cc = Math.round((180 * Math.asin(matrix[2])) / Math.PI)
  const dd = Math.round((180 * Math.acos(matrix[3])) / Math.PI)
  let deg = 0
  if (aa === bb || -aa === bb) {
    deg = dd
  } else if (-aa + bb === 180) {
    deg = 180 + cc
  } else if (aa + bb === 180) {
    deg = 360 - cc || 360 - dd
  }
  return deg >= 360 ? 0 : deg
}

const getTranslatePos: (el: Element) => { top: number; left: number } = (el: HTMLElement) => {
  const elPos = { top: getTranslate(el, 'y') || 0, left: getTranslate(el, 'x') || 0 }
  if (el.parentElement) {
    const parentPos = getTranslatePos(el.parentElement)
    elPos.top += parentPos.top
    elPos.left += parentPos.left
  }
  return elPos
}

const getOffsetPos: (el: Element) => { top: number; left: number } = (el: HTMLElement) => {
  const elPos = { top: el.offsetTop, left: el.offsetLeft }
  if (el.offsetParent) {
    const parentPos = getOffsetPos(el.offsetParent)
    elPos.top += parentPos.top
    elPos.left += parentPos.left
  }
  return elPos
}

const getBorderWidth: (el: Element) => { top: number; left: number } = (el: HTMLElement) => {
  const border = { top: 0, left: 0 }
  if (el.offsetParent) {
    const parentBorder = getBorderWidth(el.offsetParent)
    border.top += parentBorder.top + parseInt(getComputedStyle(el.offsetParent, null).borderTopWidth.slice(0, -2))
    border.left += parentBorder.left + parseInt(getComputedStyle(el.offsetParent, null).borderLeftWidth.slice(0, -2))
  }
  return border
}

const getScrollDist: (el: Element, container: Element) => { top: number; left: number } = (
  el: HTMLElement,
  container: HTMLElement,
) => {
  const elScroll = { top: el.scrollTop, left: el.scrollLeft }
  const isFixed = getComputedStyle(el, null).getPropertyValue('position') === 'fixed'
  if (isFixed) {
    elScroll.top -= document.documentElement.scrollTop
    elScroll.left -= document.documentElement.scrollLeft
  } else if (el.parentElement && container.contains(el.parentElement)) {
    const parentScroll = getScrollDist(el.parentElement, container)
    elScroll.top += parentScroll.top
    elScroll.left += parentScroll.left
  }
  return elScroll
}

const getRealDom = (locatorRef: any, locatorElement: any) => {
  if (!locatorRef.current) return locatorRef.current
  const REF_NAME_OBJ: any = {
    Input: 'input',
    InputNumber: 'input',
    Select: 'select',
    Upload: 'input',
  }
  if (locatorRef.current.tagName) return locatorRef.current
  const name = REF_NAME_OBJ[locatorElement?.type?.displayName]
  return locatorRef?.current[name]
}

const DEFAULT_PLACEMENT = 'top'

function usePopper(locatorElement: React.ReactElement, popperElement: React.ReactElement, props: PopperProps) {
  const {
    prefixCls,
    onTrigger,
    popperStyle,
    arrow = false,
    onVisibleChange,
    popperClassName,
    arrowOffset = 12,
    arrowSize = 4.25,
    disabled = false,
    trigger = 'click',
    placement = DEFAULT_PLACEMENT,
    gap: defaultGap = 4,
    scrollHidden = false,
    mouseEnterDelay = 0.1,
    mouseLeaveDelay = 0.1,
    defaultVisible = false,
    autoPlacement = true,
    clickToClose = true,
    isMobile,
    triggerScroll = false,
    getTriggerElement = (locatorNode) => locatorNode,
    getPopupContainer = () => document.body,
    onTransitionEnd,
  } = props

  const arrowWidth = Math.sqrt(2 * Math.pow(arrowSize, 2))

  const componentName = prefixCls?.split('-')[1] || ''

  devWarning(
    Placements.indexOf(placement) === -1,
    componentName,
    `cannot found ${componentName} placement '${placement}'`,
  )

  const isWrongTrigger = Array.isArray(trigger)
    ? trigger.some((v) => !Triggers.includes(v))
    : Triggers.indexOf(trigger) === -1
  devWarning(isWrongTrigger, componentName, `cannot found ${componentName} trigger '${trigger}'`)

  const locatorEl = useRef<HTMLElement>()
  const popperEl = useRef<HTMLElement>()
  const locatorRef = (locatorElement as any).ref || locatorEl
  const popperRef = (popperElement as any).ref || popperEl

  const container = getPopupContainer(getRealDom(locatorRef, locatorElement) || document.body)

  Promise.resolve().then(() => {
    const realDom = getRealDom(locatorRef, locatorElement)
    const triggerNode = getTriggerElement(realDom)
    const container = getPopupContainer(realDom)
    devWarning(
      !triggerNode,
      componentName,
      `getTriggerElement() must return a HTMLElement, but now it does not return anything`,
    )
    devWarning(
      !container,
      componentName,
      `getPopupContainer() must return a HTMLElement, but now it does not return anything`,
    )
  })

  const initPos = { top: 0, left: 0, right: 0, bottom: 0, height: 0, width: 0 }

  const initAlign = { top: 0, left: 0 }

  const gap = defaultGap + (arrow ? 10 : 0)

  const [mousePos, setMousePos] = useState<Position>(initPos)
  const [arrowPos, setArrowPos] = useState<Align>(initAlign)

  const [exist, setExist] = useState(!!props.visible || defaultVisible)
  const [canAlign, setCanAlign] = useState(!!props.visible || defaultVisible)
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState(false)
  const [maxHeight, setMaxHeight] = useState<number | undefined>(undefined)
  const [maxWidth, setMaxWidth] = useState<number | undefined>()
  const [forceStyle, setForceStyle] = useState<Record<string, any>>({})

  useEffect(() => {
    if (props.visible) {
      !exist && setExist(true)
      setCanAlign(true)
      setVisible(true)
    } else {
      setVisible(false)
    }
  }, [exist, props.visible])

  const [evType, setEvType] = useState<string>('')
  const [align, setAlign] = useState<Align | undefined>()

  const [nextPlacement, setNextPlacement] = useState<string>(
    Placements.includes(placement) ? placement : DEFAULT_PLACEMENT,
  )

  useEffect(() => {
    // 如果当前是移动端且正在 align，就不要重置 nextPlacement
    if (isMobile) return
    if (nextPlacement !== placement && Placements.includes(placement)) {
      setNextPlacement(placement)
    }
  }, [placement])

  const alignPopper = useCallback(() => {
    const realDom = getRealDom(locatorRef, locatorElement)
    if (realDom && popperRef?.current) {
      const { width: popperWidth, height: popperHeight } = popperRef.current.getBoundingClientRect()
      const { top, bottom, left, right, height, width } = realDom.getBoundingClientRect()

      if (height === 0 && width === 0) {
        hidePopper()
        return
      }

      const { top: containerTop, left: containerLeft } = getOffsetPos(container)
      const { top: locatorTop, left: locatorLeft } = getOffsetPos(realDom)
      const { top: translateTop, left: translateLeft } = getTranslatePos(realDom)
      const { top: borderTop, left: borderLeft } = getBorderWidth(realDom)
      const { top: scrollTop, left: scrollLeft } = getScrollDist(realDom.parentElement, container)

      const locatorPos = {
        width,
        height,
        top: locatorTop + borderTop + translateTop - containerTop - scrollTop,
        left: locatorLeft + borderLeft + translateLeft - containerLeft - scrollLeft,
        right: locatorLeft + borderLeft + translateLeft + width - containerLeft - scrollLeft,
        bottom: locatorTop + borderTop + translateTop + height - containerTop - scrollTop,
      }

      const currentPos = trigger === 'contextMenu' ? mousePos : locatorPos

      let currentPlacement: string = nextPlacement

      if (autoPlacement) {
        if (top - gap - popperHeight <= 5 && bottom + gap + popperHeight < document.body.clientHeight - 5) {
          currentPlacement = currentPlacement.replace('top', 'bottom')
        }
        if (bottom + gap + popperHeight >= document.body.clientHeight - 5 && top - gap - popperHeight > 5) {
          currentPlacement = currentPlacement.replace('bottom', 'top')
        }
        if (left + popperWidth >= document.body.clientWidth - 5 && right - popperWidth > 5) {
          currentPlacement = currentPlacement.replace('Left', 'Right')
        }
        if (right - popperWidth <= 5 && left + popperWidth < document.body.clientWidth - 5) {
          currentPlacement = currentPlacement.replace('Right', 'Left')
        }
        if (top + popperHeight >= document.body.clientHeight - 5 && bottom - popperHeight > 5) {
          currentPlacement = currentPlacement.replace('Top', 'Bottom')
        }
        if (bottom - popperHeight <= 5 && top + popperHeight < document.body.clientHeight - 5) {
          currentPlacement = currentPlacement.replace('Bottom', 'Top')
        }
        if (left - gap - popperWidth <= 5 && right + gap + popperWidth < document.body.clientWidth - 5) {
          currentPlacement = currentPlacement.replace('left', 'right')
        }
        if (right + gap + popperWidth >= document.body.clientWidth - 5 && left - gap - popperWidth > 5) {
          currentPlacement = currentPlacement.replace('right', 'left')
        }
        if (['top', 'bottom'].includes(currentPlacement)) {
          if (right - width / 2 + popperWidth / 2 >= document.body.clientWidth - 5 && right - popperWidth > 5) {
            currentPlacement += 'Right'
          }
          if (left - width / 2 - popperWidth / 2 <= 5 && left + popperWidth < document.body.clientWidth - 5) {
            currentPlacement += 'Left'
          }
        }
      }

      const leftLeft = currentPos.left - popperWidth - gap
      const topTop = currentPos.top - gap - popperHeight
      const bottomTop = currentPos.top + currentPos.height + gap
      const rightLeft = currentPos.left + currentPos.width - popperWidth
      const centerLeft = currentPos.left + (currentPos.width - popperWidth) / 2
      const centerTop = currentPos.top - (popperHeight - currentPos.height) / 2
      const topBottom = currentPos.bottom - popperHeight
      const leftRight = currentPos.right + gap

      const mapAlign: { [key: string]: Align } = {
        topLeft: { left: currentPos.left, top: topTop },
        top: { left: centerLeft, top: topTop },
        topRight: { left: rightLeft, top: topTop },
        bottomLeft: { left: currentPos.left, top: bottomTop },
        bottom: { left: centerLeft, top: bottomTop },
        bottomRight: { left: rightLeft, top: bottomTop },
        leftTop: { left: leftLeft, top: currentPos.top },
        left: { left: leftLeft, top: centerTop },
        leftBottom: { left: leftLeft, top: topBottom },
        rightTop: { left: leftRight, top: currentPos.top },
        right: { left: leftRight, top: centerTop },
        rightBottom: { left: leftRight, top: topBottom },
      }

      const alignPos = mapAlign[currentPlacement]
      const arrowPos = { top: 0, left: 0 }

      if (/left/.test(currentPlacement) || /right/.test(currentPlacement)) {
        if (/Top/.test(currentPlacement)) {
          arrowPos.top = arrowOffset
        } else if (/Bottom/.test(currentPlacement)) {
          arrowPos.top = popperHeight - arrowOffset - 2 * arrowSize
        } else {
          arrowPos.top = (popperHeight - arrowWidth) / 2 - 1
        }

        if (top <= 0) {
          alignPos.top = locatorPos.top
          arrowPos.top = arrowOffset
        } else if (bottom - height / 4 >= document.body.clientHeight) {
          alignPos.top = locatorPos.bottom - popperHeight
          arrowPos.top = popperHeight - arrowOffset - 2 * arrowSize
        } else {
          const scrollTop = alignPos.top - window.pageYOffset
          const scrollBottom = alignPos.top + popperHeight - 5 - window.pageYOffset
          if (scrollTop < 0) {
            alignPos.top -= scrollTop
            arrowPos.top += scrollTop
          }
          if (scrollBottom > document.body.clientHeight) {
            alignPos.top += document.body.clientHeight - scrollBottom
            arrowPos.top += scrollBottom - document.body.clientHeight
          }
        }
      } else if (/top/.test(currentPlacement) || /bottom/.test(currentPlacement)) {
        if (/Left/.test(currentPlacement)) {
          arrowPos.left = arrowOffset
        } else if (/Right/.test(currentPlacement)) {
          arrowPos.left = popperWidth - arrowOffset - 2 * arrowSize
        } else {
          arrowPos.left = (popperWidth - arrowWidth) / 2 - 1
        }

        if (left <= 0) {
          alignPos.left = locatorPos.left
          arrowPos.left = arrowOffset
        } else if (right >= document.body.clientWidth) {
          delete alignPos.left
          alignPos.right = -1 * (right - document.body.clientWidth)
          arrowPos.left = popperWidth - arrowOffset - 2 * arrowSize
        }
        if (isMobile) {
          // left/right 边界超出时，往内偏移 Popper
          const rightEdge = alignPos.left! + popperWidth
          if (rightEdge > document.body.clientWidth) {
            const overflowRight = rightEdge - document.body.clientWidth
            alignPos.left = alignPos.left! - overflowRight
            arrowPos.left = arrowPos.left - overflowRight
          }

          // 判断左边是否超出屏幕，如果是，则向右偏移
          if (alignPos.left! < 0) {
            const overflowLeft = -alignPos.left!
            alignPos.left = 0
            arrowPos.left = arrowPos.left + overflowLeft
          }
        }
      }

      setAlign(alignPos)
      setArrowPos(arrowPos)
      setNextPlacement(currentPlacement)
    }
  }, [
    locatorRef,
    popperRef,
    container,
    trigger,
    mousePos,
    autoPlacement,
    gap,
    arrowOffset,
    arrowSize,
    arrowWidth,
    align?.left,
    align?.top,
    nextPlacement,
  ])

  useEffect(() => {
    if (canAlign) {
      alignPopper()
      setCanAlign(false)
      props.visible === undefined && setVisible(true)
      onVisibleChange && onVisibleChange(true)
      setActive(true)
      setTimeout(() => setActive(false), 200)
    }
  }, [alignPopper, canAlign, onVisibleChange, props])

  useEffect(() => {
    if (canAlign && isMobile) {
      const realDom = getRealDom(locatorRef, locatorElement)
      const rect = realDom?.getBoundingClientRect()

      if (rect) {
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight
        const viewportWidth = window.innerWidth || document.documentElement.clientWidth
        let placementForCalc = nextPlacement
        // ---- 新增左右方向空间优先逻辑 ----
        if (/^(left|right)/i.test(nextPlacement)) {
          const popperRect = popperRef.current?.getBoundingClientRect()
          const popperWidth =
            popperRect?.width ??
            (typeof (popperElement as any)?.props?.style?.width === 'number'
              ? (popperElement as any).props.style.width
              : (() => {
                  const w = (popperElement as any)?.props?.style?.width
                  if (typeof w === 'string' && w.endsWith('px')) return parseFloat(w)
                  return 0
                })())
          const availableLeft = rect.left - gap // 可用于左侧摆放的净空间（不减 popperWidth）
          const availableRight = viewportWidth - rect.right - gap

          const canFitLeft = popperWidth <= availableLeft
          const canFitRight = popperWidth <= availableRight

          // 如果传入的方向空间不足，就自动选较大一侧
          if (/^left/i.test(placementForCalc) && !canFitLeft) {
            if (canFitRight) {
              placementForCalc = 'right' + placementForCalc.replace(/^(left)/i, '')
            } else {
              placementForCalc =
                availableRight >= availableLeft ? 'right' + placementForCalc.replace(/^(left)/i, '') : placementForCalc // 继续用 left（尽管会溢出）
            }
          } else if (/^right/i.test(placementForCalc) && !canFitRight) {
            if (canFitLeft) {
              placementForCalc = 'left' + placementForCalc.replace(/^(right)/i, '')
            } else {
              placementForCalc =
                availableLeft >= availableRight ? 'left' + placementForCalc.replace(/^(right)/i, '') : placementForCalc
            }
          }

          // 如果有合法的 placement，则更新 nextPlacement（并且后面立即用 placementForCalc 做计算）
          if (Placements.includes(placementForCalc as PlacementType)) {
            setNextPlacement(placementForCalc)
          }
        }
        // ---- 左右优先逻辑结束 ----

        let newMaxHeight = 0
        let newMaxWidth
        let newForceStyle: Record<string, any> = {}
        // 高度限制逻辑
        if (/top/.test(placementForCalc)) {
          newMaxHeight = rect.top - gap
        } else if (/bottom/.test(placementForCalc)) {
          newMaxHeight = viewportHeight - rect.bottom - gap
        } else {
          const spaceAbove = rect.top
          const spaceBelow = viewportHeight - rect.bottom
          newMaxHeight = Math.max(spaceAbove, spaceBelow) - gap
          // 左右弹出时限制宽度
          if (/left/.test(placementForCalc)) {
            newMaxWidth = rect.left - gap
          } else if (/right/.test(placementForCalc)) {
            newMaxWidth = viewportWidth - rect.right - gap
          }
          const triggerWidth = rect.width
          if (triggerWidth >= viewportWidth * 0.8) {
            newForceStyle = {
              left: 0,
              right: 'auto',
              transform: 'none',
              maxWidth: '100vw',
            }
          }
        }

        setMaxHeight(Math.max(newMaxHeight, 0))
        setMaxWidth(newMaxWidth && newMaxWidth > 0 ? newMaxWidth : undefined)
        setForceStyle(newForceStyle)
      }
      setCanAlign(false)
      props.visible === undefined && setVisible(true)
      onVisibleChange && onVisibleChange(true)
      setActive(true)
      setTimeout(() => setActive(false), 200)
    }
  }, [alignPopper, canAlign, onVisibleChange, props, isMobile, nextPlacement])

  const arrowStyle: Record<string, string> = {
    [`--arrowSize`]: arrowSize + 'px',
    [`--arrowSpill`]: arrowWidth / -2 + 'px',
  }
  if (arrowPos.top) arrowStyle[`--arrowTop`] = arrowPos.top + 'px'
  if (arrowPos.left) arrowStyle[`--arrowLeft`] = arrowPos.left + 'px'

  const popperContainerStyle = {
    position: 'absolute',
    ...align,
    ...(arrow ? arrowStyle : {}),
    ...(maxHeight ? { maxHeight: maxHeight + 'px' } : {}),
    ...(maxWidth ? { maxWidth: maxWidth + 'px' } : {}),
    ...forceStyle,
    ...popperStyle,
  }

  const popperProps: NormalProps = {
    ref: popperRef,
    style: popperContainerStyle,
    className: classNames(prefixCls, popperClassName, nextPlacement, {
      arrow,
      hidden: !visible,
      [`${nextPlacement}-active`]: active,
    }),
    onTransitionEnd: typeof onTransitionEnd === 'function' ? onTransitionEnd : undefined,
  }

  const popperNode = popperRef.current
  const locatorNode = getRealDom(locatorRef, locatorElement)

  useResizeObserver(popperNode || document.body, alignPopper)
  useResizeObserver(locatorNode || document.body, alignPopper)

  const showPopper = useCallback(
    (evType: string) => {
      if (!disabled) {
        !exist && setExist(true)
        setEvType(evType)
        if (onTrigger) {
          const mapTrigger: NormalProps = {
            mouseenter: 'hover',
            mouseup: 'click',
            focus: 'focus',
            contextmenu: 'contextMenu',
          }
          onTrigger(mapTrigger[evType])
        }
        if (!visible || evType === 'contextmenu') {
          setCanAlign(true)
        }
      }
    },
    [disabled, exist, onTrigger, visible],
  )

  const hidePopper = useCallback(() => {
    props.visible === undefined && setVisible(false)
    onVisibleChange && onVisibleChange(false)
  }, [onVisibleChange, props.visible])

  const matchTrigger = (words: TriggerType) => (Array.isArray(trigger) ? trigger.includes(words) : trigger === words)

  useEffect(() => {
    if (exist && visible) {
      let mouseleaveTimer: number
      const realDom = getRealDom(locatorRef, locatorElement)
      const triggerNode = getTriggerElement(realDom)
      const handleHidePopper = (e: MouseEvent) => {
        const triggerRect = triggerNode.getBoundingClientRect()
        const popperRect = popperRef.current.getBoundingClientRect()
        const left = triggerRect.left
        const right = triggerRect.right
        const top = triggerRect.top
        const bottom = triggerRect.bottom
        const { clientX: X, clientY: Y } = e
        const inTriggerRect = X > left + 2 && X < right - 2 && Y > top + 2 && Y < bottom - 2
        const inPopperRect = X > popperRect.left && X < popperRect.right && Y > popperRect.top && Y < popperRect.bottom
        const ableArea = matchTrigger('contextMenu') ? inPopperRect : inTriggerRect || inPopperRect

        if (ableArea) {
          mouseleaveTimer && clearTimeout(mouseleaveTimer)
          matchTrigger('focus') && triggerNode.focus()
        } else {
          if (matchTrigger('hover')) {
            mouseleaveTimer && clearTimeout(mouseleaveTimer)
            mouseleaveTimer = window.setTimeout(hidePopper, mouseLeaveDelay * 1000)
          } else {
            hidePopper()
          }
        }
      }

      const debounceHidePopper = debounce(handleHidePopper, 10, { leading: true })

      const mapEvent: NormalProps = {
        hover: 'mousemove',
        click: 'mousedown',
        focus: 'mousedown',
        contextMenu: 'mousedown',
      }

      if (matchTrigger('hover')) {
        triggerNode?.removeEventListener('mouseleave', debounceHidePopper)
        popperNode?.removeEventListener('mouseleave', debounceHidePopper)
        triggerNode?.addEventListener('mouseleave', debounceHidePopper)
        popperNode?.addEventListener('mouseleave', debounceHidePopper)
      }

      Array.isArray(trigger)
        ? trigger.forEach((action: string) => document.addEventListener(mapEvent[action], debounceHidePopper))
        : document.addEventListener(mapEvent[trigger], debounceHidePopper)

      return () => {
        triggerNode?.removeEventListener('mouseleave', debounceHidePopper)
        popperNode?.removeEventListener('mouseleave', debounceHidePopper)
        Array.isArray(trigger)
          ? trigger.forEach((action: string) => document.removeEventListener(mapEvent[action], debounceHidePopper))
          : document.removeEventListener(mapEvent[trigger], debounceHidePopper)
      }
    }
  }, [nextPlacement, evType, exist, getTriggerElement, hidePopper, locatorRef, mouseLeaveDelay, popperRef, visible])

  useEffect(() => {
    if (visible) {
      const scrollAlign = debounce((e: Event) => {
        const target = e.target as HTMLElement | null

        const popperNode = popperRef.current
        const realDom = getRealDom(locatorRef, locatorElement)
        const triggerNode = realDom ? getTriggerElement(realDom) : null

        const isPopperScroll = popperNode && target && (target === popperNode || popperNode.contains(target))

        const isTriggerScroll =
          triggerNode && target && (target === triggerNode || triggerNode.contains(target)) && triggerScroll

        if (scrollHidden && !isPopperScroll && !isTriggerScroll) {
          props.visible === undefined && setVisible(false)
          onVisibleChange && onVisibleChange(false)
          return
        }

        alignPopper()
      }, 10)

      window.addEventListener('resize', alignPopper)
      document.addEventListener('scroll', scrollAlign, true)

      return () => {
        window.removeEventListener('resize', alignPopper)
        document.removeEventListener('scroll', scrollAlign, true)
      }
    }
  }, [
    visible,
    alignPopper,
    scrollHidden,
    onVisibleChange,
    props.visible,
    popperRef,
    locatorRef,
    locatorElement,
    getTriggerElement,
  ])

  useEffect(() => {
    const realDom = getRealDom(locatorRef, locatorElement)
    const triggerNode = getTriggerElement(realDom)
    if (triggerNode) {
      let mouseenterTimer: number
      const clearMouseLeave = () => clearTimeout(mouseenterTimer)
      const addAction = (action: string) => {
        if (action === 'hover') {
          triggerNode.addEventListener('mouseenter', debounceShowPopper)
          triggerNode.addEventListener('mouseleave', clearMouseLeave)
        } else {
          triggerNode.addEventListener(action, debounceShowPopper)
        }
      }
      const removeAction = (action: string) => {
        if (action === 'hover') {
          triggerNode.removeEventListener('mouseenter', debounceShowPopper)
          triggerNode.removeEventListener('mouseleave', clearMouseLeave)
        } else {
          triggerNode.removeEventListener(action, debounceShowPopper)
        }
      }
      const handleShowPopper = (e: MouseEvent) => {
        e.preventDefault()
        if (e.type === 'contextmenu') {
          const currentMousePos = {
            ...mousePos,
            ...{ left: e.pageX, top: e.pageY, right: e.pageX, bottom: e.pageY },
          }
          setMousePos(currentMousePos)
        }

        if (e.type === 'mouseenter') {
          mouseenterTimer = window.setTimeout(() => showPopper(e.type), mouseEnterDelay * 1000)
        } else if (e.type === 'mouseup' && visible) {
          clickToClose && hidePopper()
        } else {
          showPopper(e.type)
        }
      }

      const debounceShowPopper = debounce(handleShowPopper, 10, { leading: true })

      const mapEvent: NormalProps = {
        hover: 'hover',
        click: 'mouseup',
        focus: 'focus',
        contextMenu: 'contextmenu',
      }

      Array.isArray(trigger)
        ? trigger.forEach((action: string) => addAction(mapEvent[action]))
        : addAction(mapEvent[trigger as string])

      return () => {
        Array.isArray(trigger)
          ? trigger.forEach((action: string) => removeAction(mapEvent[action]))
          : removeAction(mapEvent[trigger as string])
      }
    }
  }, [getTriggerElement, hidePopper, locatorRef, mouseEnterDelay, mousePos, showPopper, trigger, visible])

  const Locator = cloneElement(locatorElement, { ref: locatorRef })

  const Popper = <div {...popperProps}>{popperElement}</div>
  return (
    <>
      {Locator}
      {exist && container && ReactDOM.createPortal(Popper, container)}
    </>
  )
}

export default usePopper
