import React, { useEffect, useRef, useState, ReactElement, Children, forwardRef } from 'react'
import { createPopper, Instance, Modifier, Placement } from '@popperjs/core'
import { tuple } from '../_utils/type'
import classnames from 'classnames'
import debounce from 'lodash/debounce'
import ReactDOM from 'react-dom'
import { isFragment } from '../_utils/reactNode'
import { ConfigContext } from '../config-provider'

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

export type RenderFunction = () => React.ReactNode

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
  className?: string
  style?: React.CSSProperties
  popperClassName?: string
  popperStyle?: React.CSSProperties
  placement?: PlacementType
  tip?: any
  trigger?: TriggerType | Array<TriggerType>
  clickToClose?: boolean
  onTrigger?: (trigger: TriggerType) => void
  onVisibleChange?: (visible: boolean) => void
  getTriggerElement?: (locatorNode: HTMLElement) => HTMLElement
  getPopupContainer?: (locatorNode: HTMLElement) => HTMLElement
  onTransitionEnd?: (e: React.TransitionEvent) => void
  onAnimationEnd?: (e: React.AnimationEvent) => void
  children?: React.ReactNode
}

const useEnhancedEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect

const generateGetBoundingClientRect = (x = 0, y = 0) => {
  return () => ({
    width: 0,
    height: 0,
    top: y,
    right: x,
    bottom: y,
    left: x,
  })
}

const virtualElement = {
  getBoundingClientRect: generateGetBoundingClientRect(),
}

export const popperPlacementMap = {
  top: 'top',
  left: 'left',
  right: 'right',
  bottom: 'bottom',
  topLeft: 'top-start',
  topRight: 'top-end',
  bottomLeft: 'bottom-start',
  bottomRight: 'bottom-end',
  leftTop: 'left-start',
  leftBottom: 'left-end',
  rightTop: 'right-start',
  rightBottom: 'right-end',
}

const placementFlip: any = {
  bottom: 'bottom',
  top: 'bottom',
  right: 'left',
  left: 'right',
}

const getRealPlacement: (key: PlacementType) => Placement = (key: PlacementType) => {
  return popperPlacementMap[key] ? (popperPlacementMap[key] as Placement) : 'top'
}

const getFallbackPlacements: (key: Placement) => Placement[] = (key: Placement) => {
  const prefix = key.split('-')[0]
  const suffix = [''] // , '-start', '-end']

  return [
    ...[...Object.keys(placementFlip).filter((r) => [prefix, placementFlip[prefix]].includes(r))]
      .map((d) => suffix.map((o) => d + o))
      .flat()
      .filter((f) => f !== key),
    // ...[...Object.keys(placementFlip).filter((r) => ![prefix, placementFlip[prefix]].includes(r))]
    //   .map((d) => suffix.map((o) => d + o))
    //   .flat(),
  ] as Placement[]
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

const isTarget = (domRef: any, e: Event, locatorElement: any) => {
  if (domRef && domRef?.current) {
    const dom = getRealDom(domRef, locatorElement)
    return dom ? dom === e.target || dom?.contains?.(e.target) : false
  }
  return false
}

export const Popper = forwardRef<unknown, PopperProps>((props, ref) => {
  const { getPrefixCls, prefixCls: pkgPrefixCls } = React.useContext(ConfigContext)
  const {
    prefixCls,
    onTrigger,
    style,
    popperStyle,
    arrow = false,
    onVisibleChange,
    className,
    popperClassName,
    tip,
    disabled = false,
    trigger = 'click',
    placement = 'top',
    visible,
    arrowSize = 4.25,
    gap: defaultGap = 4,
    scrollHidden = false,
    mouseEnterDelay = 0.1,
    mouseLeaveDelay = 0.1,
    defaultVisible = false,
    autoPlacement = true,
    clickToClose = true,
    getTriggerElement = (locatorNode) => locatorNode,
    getPopupContainer,
    onTransitionEnd,
    onAnimationEnd,
    children,
  } = props

  // const trigger = 'click'
  // const arrow = false
  const popperPrefixCls = getPrefixCls!(pkgPrefixCls, 'popper')
  const referenceContentCls = `${popperPrefixCls}-reference-content`
  const childrenInner = React.isValidElement(children) && !isFragment(children) ? children : <span>{children}</span>
  const referenceElement: any = Children.only(childrenInner) as ReactElement
  const popperElement = typeof tip === 'function' ? tip() : tip

  const popperRefInner = useRef<any>(null)
  const popperRef: any = ref || popperRefInner
  const popperInstance = useRef<Instance | null>(null)
  const referenceRef = useRef<any>(null)
  // const referenceRef: any = referenceInnerRef
  const container = getPopupContainer?.(getRealDom(referenceRef, referenceElement) || document.body) || document.body

  // console.log('referenceElement', container, children, referenceElement)

  const [visibleInner, setVisibleInner] = useState(typeof visible === 'undefined' ? defaultVisible : visible)
  const [exist, setExist] = useState<boolean>(visibleInner)
  const [active, setActive] = useState<boolean>(false)
  const [placementInner, setPlacementInner] = useState<Placement | undefined>(getRealPlacement(placement))

  const delayRef = useRef<any>()
  const clearDelay = () => {
    if (typeof delayRef.current !== 'undefined') {
      clearTimeout(delayRef.current)
      delayRef.current = null
    }
  }
  const triggerOpen = (nextOpen: boolean, triggerType: TriggerType | string = '', delay = 0.1) => {
    console.log('triggerOpen', nextOpen, delay)
    clearDelay()
    if (delay === 0) {
      if (visibleInner !== nextOpen) {
        if (nextOpen) {
          onTrigger?.(triggerType as TriggerType)
        }
        if (typeof visible === 'undefined') {
          setVisibleInner(nextOpen)
        }
        onVisibleChange?.(nextOpen)
      }
    } else {
      if (visibleInner !== nextOpen) {
        delayRef.current = setTimeout(() => {
          if (nextOpen) {
            onTrigger?.(triggerType as TriggerType)
          }
          if (typeof visible === 'undefined') {
            setVisibleInner(nextOpen)
          }
          onVisibleChange?.(nextOpen)
        }, delay * 1000)
      }
    }
  }

  const onTriggerInner = (nextOpen: boolean, triggerType: TriggerType, delay: undefined | number = undefined) => {
    triggerOpen(nextOpen, triggerType, delay)
  }

  const onClick = (e: Event) => {
    onTriggerInner(!visibleInner, 'click', 0)
    referenceElement?.props?.onClick?.(e)
  }

  const onFocus = (e: Event) => {
    onTriggerInner(true, 'focus', 0)
    referenceElement?.props?.onFocus?.(e)
  }

  const onBlur = (e: Event) => {
    onTriggerInner(false, 'focus', 0)
    referenceElement?.props?.onBlur?.(e)
  }

  const onContextMenu = (e: any) => {
    e.preventDefault()
    virtualElement.getBoundingClientRect = generateGetBoundingClientRect(e.clientX, e.clientY)
    onTriggerInner(!visibleInner, 'contextMenu', 0)
    referenceElement?.props?.onContextMenu?.(e)
  }

  const onMouseOver = (e: Event) => {
    console.log('onMouseOver')
    onTriggerInner(true, 'hover', mouseEnterDelay)
    referenceElement?.props?.onMouseOver?.(e)
  }

  const onMouseLeave = (e: Event) => {
    console.log('onMouseLeave')
    onTriggerInner(false, 'hover', mouseLeaveDelay)
    referenceElement?.props?.onMouseLeave?.(e)
  }

  useEffect(() => {
    if (typeof visible !== 'undefined') {
      setVisibleInner(visible)
    }
  }, [visible])

  useEffect(() => {
    setPlacementInner(getRealPlacement(placement))
  }, [placement])

  useEffect(() => {
    const scrollHandle = debounce((e: Event) => {
      if (visibleInner) {
        const isPopper = e.target === popperRef.current || popperRef.current?.contains?.(e.target)
        if (scrollHidden && !isPopper) {
          triggerOpen(false)
        }
      }
    }, 10)

    if (visibleInner) {
      document.addEventListener('scroll', scrollHandle, true)
    }

    return () => {
      document.removeEventListener('scroll', scrollHandle, true)
    }
  }, [visibleInner, scrollHidden, popperRef])

  useEffect(() => {
    const clickHandle = debounce((e: Event) => {
      if (visibleInner) {
        const isReference = isTarget(referenceRef, e, referenceElement) || isTarget(popperRef, e, referenceElement)
        console.log('click----', visibleInner, clickToClose, isReference)
        if (clickToClose && !isReference) {
          triggerOpen(false, '', 0)
        }
      }
    }, 10)

    if (visibleInner) {
      document.addEventListener('click', clickHandle, true)
    }

    return () => {
      document.removeEventListener('click', clickHandle, true)
    }
  }, [visibleInner, clickToClose, referenceRef, popperRef])

  useEffect(() => {
    const realDom = getRealDom(referenceRef, referenceElement)
    const triggerNode = getTriggerElement(realDom)

    if (trigger === 'click') {
      triggerNode?.addEventListener('click', onClick)
    } else if (trigger === 'focus') {
      triggerNode?.addEventListener('focus', onFocus)
      triggerNode?.addEventListener('blur', onBlur)
    } else if (trigger === 'contextMenu') {
      triggerNode?.addEventListener('contextmenu', onContextMenu)
    } else {
      triggerNode?.addEventListener('mouseover', onMouseOver)
      triggerNode?.addEventListener('mouseleave', onMouseLeave)
    }

    return () => {
      triggerNode?.removeEventListener('click', onClick)
      triggerNode?.removeEventListener('focus', onClick)
      triggerNode?.removeEventListener('blur', onClick)
      triggerNode?.removeEventListener('contextmenu', onContextMenu)
      triggerNode?.removeEventListener('mouseover', onMouseOver)
      triggerNode?.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [getTriggerElement, visibleInner, referenceElement, referenceRef])

  const popperModifiers: Partial<Modifier<any, any>>[] = [
    {
      name: 'offset',
      options: {
        offset: [0, defaultGap + (arrow ? 5 : 0)],
      },
    },
    {
      name: 'preventOverflow',
      enabled: autoPlacement,
      options: {
        altBoundary: disabled,
        mainAxis: true,
      },
    },
    {
      name: 'flip',
      enabled: autoPlacement,
      options: {
        altBoundary: disabled,
        fallbackPlacements: autoPlacement ? getFallbackPlacements(placementInner as any) : undefined,
      },
    },
    {
      name: 'onUpdate',
      enabled: true,
      phase: 'afterWrite',
      fn: ({ state }) => {
        setPlacementInner(state.placement)
      },
    },
  ]
  const popperOptionsInner: any = {
    placement: placementInner,
    modifiers: popperModifiers,
    strategy: 'fixed',
  }

  useEnhancedEffect(() => {
    console.log('-----1', exist, popperInstance.current)
    if (visibleInner) {
      if (!exist) {
        setExist(true)
      } else {
        setActive(true)
        setTimeout(() => setActive(false), 1000)
        if (popperInstance.current) {
          popperInstance.current?.setOptions((options: any) => ({
            ...options,
            ...popperOptionsInner,
          }))

          popperInstance.current?.forceUpdate()
        }
      }
    }
  }, [visibleInner, placementInner])

  useEnhancedEffect(() => {
    console.log('-----2', exist)
    if (!exist || disabled) {
      return undefined
    }

    const current = getRealDom(referenceRef, referenceElement)

    if (current) {
      popperInstance.current = createPopper(
        trigger === 'contextMenu' ? virtualElement : current?.closest(`.${referenceContentCls}`) || current,
        popperRef.current,
        popperOptionsInner,
      )
    }

    return () => {
      console.log('-----3')
      popperInstance.current?.destroy()
    }
  }, [exist, disabled])

  if (children === null || typeof children === 'undefined') {
    return null
  }

  const popperContainerProps = {
    ref: popperRef,
    className: classnames(popperPrefixCls, referenceContentCls, { hidden: !visibleInner }),
    onTransitionEnd: (e: React.TransitionEvent) => onTransitionEnd?.(e),
  }
  const arrowStyle: Record<string, string> = {
    [`--arrowSize`]: arrowSize + 'px',
  }
  const popperProps = {
    className: classnames(
      [`${popperPrefixCls}-content`],
      [`${popperPrefixCls}-${placementInner}`],
      { [`${popperPrefixCls}-${placementInner}-out`]: !visibleInner },
      {
        [`${popperPrefixCls}-${placementInner}-in`]: active,
      },
      prefixCls,
      popperClassName,
      className,
    ),
    style: { ...(arrow ? arrowStyle : {}), ...popperStyle, ...style },
    onMouseOver: trigger === 'hover' ? () => onTriggerInner(true, 'hover', mouseEnterDelay) : undefined,
    onMouseLeave: trigger === 'hover' ? () => onTriggerInner(false, 'hover', mouseLeaveDelay) : undefined,
    onAnimationEnd: (e: React.AnimationEvent) => onAnimationEnd?.(e),
  }
  const referenceProps = {
    ref: referenceRef,
    className: classnames(referenceElement?.props?.className, referenceContentCls),
  }

  return (
    <>
      {React.cloneElement(referenceElement, referenceProps)}
      {exist &&
        container &&
        ReactDOM.createPortal(
          <div {...popperContainerProps}>
            <div {...popperProps}>
              {popperElement}
              {arrow && <div className={'arrow'} data-popper-arrow="" />}
            </div>
          </div>,
          container,
        )}
    </>
  )
})

Popper.displayName = 'Popper'

export default Popper
