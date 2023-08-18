import React, { CSSProperties, FunctionComponentElement, isValidElement, useContext, useImperativeHandle } from 'react'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { getCompProps } from '../_utils'
import ResizeObserver from 'resize-observer-polyfill'
import devWarning from '../_utils/devwarning'
import { tuple } from '../_utils/type'
import isBoolean from 'lodash/isBoolean'
import { FadeList } from './fadeList'
import { SlideList } from './slideList'
import { DisplayList } from './displayList'
import { Slidebar } from './slidebar'
import Icon from '../icon'

export const DotPositionTypes = tuple('top', 'left', 'bottom', 'right')
export type DotPositionType = typeof DotPositionTypes[number]
export const EffectTypes = tuple('scrollx', 'fade')
export type EffectType = typeof EffectTypes[number]
export interface CarouselProps {
  autoplay?: boolean
  jumpNode?: boolean | React.ReactNode[]
  children?: React.ReactNode
  dotPosition?: string
  dots?: boolean | { dotsClassName: string; activeDotsClassName: string }
  easing?: string
  effect?: string
  intervalTime?: number // 间隔时间， 单位 ms
  className?: string
  style?: CSSProperties
  afterChange?: (currentIndex: number) => void
  beforeChange?: (form: number, to: number) => void
}

const InternalCarousel = (props: CarouselProps, ref: unknown): FunctionComponentElement<CarouselProps> => {
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps } = useContext(ConfigContext)
  const carouselProps = getCompProps('Carousel', userDefaultProps, props)
  const {
    autoplay,
    jumpNode,
    dotPosition,
    children,
    dots,
    easing,
    effect,
    intervalTime,
    afterChange,
    beforeChange,
    prefixCls: customPrefixcls,
    className,
    style,
  } = carouselProps

  devWarning(DotPositionTypes.indexOf(dotPosition) === -1, 'carousel', `cannot found dotPosition type '${dotPosition}'`)
  devWarning(EffectTypes.indexOf(effect) === -1, 'carousel', `cannot found effect type '${effect}'`)

  const carouselPrefixCls = getPrefixCls!(prefixCls, 'carousel', customPrefixcls) // 按钮样式前缀
  const [itemWidth, setItemWidth] = React.useState(0)
  const [needAnimation, setNeedAnimation] = React.useState(false)
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const carouselRef = React.useRef<HTMLElement>()
  const listRef = React.useRef<HTMLElement>()
  const autoplayRef = React.useRef<any>()

  const isScrollxEffect = React.useMemo(() => {
    return effect === 'scrollx'
  }, [effect])

  const isFadeEffect = React.useMemo(() => {
    return effect === 'fade'
  }, [effect])

  const isNoneEffect = React.useMemo(() => {
    return effect === 'none'
  }, [effect])

  const posX = React.useMemo(() => {
    return -1 * (currentIndex + 1) * itemWidth
  }, [currentIndex, itemWidth])

  const reSize = React.useCallback(
    (rect: any) => {
      if (itemWidth !== rect.width && !rect.hide) {
        setItemWidth(rect.width)
      }
    },
    [itemWidth],
  )

  const setScrollXEffectStyle = React.useCallback(() => {
    if (!listRef.current) return
    listRef.current.style.cssText = needAnimation
      ? `transform: translateX(${posX}px); transition:all 0.3s ${easing}`
      : `transform: translateX(${posX}px); transition:none`
  }, [children?.length, needAnimation, easing, posX])

  const jumpTo = React.useCallback(
    (index: number, needAnimation: boolean) => {
      if (isFadeEffect) {
        if (index === -1 || index === children.length) index = 0
        beforeChange && beforeChange(currentIndex, index)
        setCurrentIndex(index)
        setNeedAnimation(needAnimation)
      } else if (index >= -1 && index <= children.length) {
        beforeChange && beforeChange(currentIndex, index)
        setCurrentIndex(index)
        setNeedAnimation(needAnimation)
      }
    },
    [isFadeEffect, beforeChange, currentIndex, children?.length],
  )

  const next = React.useCallback(() => {
    jumpTo(currentIndex + 1, true)
  }, [currentIndex, jumpTo])

  const prev = React.useCallback(() => {
    jumpTo(currentIndex - 1, true)
  }, [currentIndex, jumpTo])

  const play = React.useCallback(() => {
    autoplayRef.current && clearTimeout(autoplayRef.current)
    autoplayRef.current = setTimeout(() => {
      next()
    }, intervalTime)
  }, [intervalTime, next])

  React.useEffect(() => {
    const element = carouselRef.current
    const handler = reSize
    if (!element) {
      devWarning(!element && element !== null, 'useResizeMeasure', 'useResizeMeasure指定的元素不存在')
      return
    }
    const measure = (entries: any[]) => {
      if (!entries[0] || !entries[0].contentRect) {
        return
      }
      const contentRect = entries[0].contentRect
      const hide = contentRect.width === 0 && contentRect.height === 0 // 隐藏条件：高宽都为0
      const { bottom, height, left, right, top, width, x, y } = contentRect
      handler && handler({ bottom, height, left, right, top, width, x, y, hide })
    }
    const resizeObserver = new ResizeObserver(measure)
    resizeObserver && resizeObserver.observe(element)
    return () => {
      resizeObserver && resizeObserver.disconnect()
    }
  }, [reSize])

  React.useLayoutEffect(() => {
    isScrollxEffect && setScrollXEffectStyle()
  }, [setScrollXEffectStyle, isScrollxEffect])

  React.useEffect(() => {
    if (autoplay) {
      play()
    }
    return () => {
      autoplayRef.current && clearTimeout(autoplayRef.current)
    }
  }, [currentIndex, autoplay, intervalTime, play])

  const showDot = () => {
    return isBoolean(dots) ? dots : true
  }

  useImperativeHandle(ref as any, () => ({
    next: next,
    prev: prev,
    jumpTo: jumpTo,
    getRef: () => carouselRef.current,
  }))

  const handleClick = React.useCallback(
    (index: number) => {
      beforeChange && beforeChange(currentIndex, index)
      setCurrentIndex(index)
      setNeedAnimation(true)
    },
    [beforeChange, currentIndex],
  )

  const handleTransitionEnd = React.useCallback(() => {
    if (!autoplay || !children?.length) return
    const childrenL = children.length
    let newCurrentIndex = currentIndex
    if (isScrollxEffect) {
      if (currentIndex === -1) {
        newCurrentIndex = childrenL - 1
      }
      if (currentIndex === childrenL) {
        newCurrentIndex = 0
      }
    }
    afterChange && afterChange(currentIndex)
    setCurrentIndex(newCurrentIndex)
    isScrollxEffect && setNeedAnimation(false)
  }, [currentIndex, children?.length, afterChange, isScrollxEffect, autoplay])

  const handleMouseEnter = React.useCallback(() => {
    autoplayRef.current && clearTimeout(autoplayRef.current)
  }, [])

  const handleMouseLeave = React.useCallback(() => {
    autoplay && play()
  }, [play, autoplay])

  const rootClassName = classNames(className, {
    [`${carouselPrefixCls}-root`]: true,
  })

  const renderDisplayList = () => {
    let content
    if (isFadeEffect) {
      content = (
        <FadeList
          items={children}
          parentPrefixCls={carouselPrefixCls}
          needAnimation={needAnimation}
          currentIndex={currentIndex}
          ref={listRef}
          itemWidth={itemWidth}
        />
      )
    } else if (isNoneEffect) {
      content = (
        <DisplayList items={children} parentPrefixCls={carouselPrefixCls} currentIndex={currentIndex} ref={listRef} />
      )
    } else {
      content = (
        <SlideList items={children} parentPrefixCls={carouselPrefixCls} currentIndex={currentIndex} ref={listRef} />
      )
    }
    return content
  }

  const renderJumpNode = () => {
    if (children?.length && jumpNode) {
      const jumpClassPrefix = `${carouselPrefixCls}-jump`
      const leftClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (currentIndex !== 0) {
          prev()
        }
      }
      const rightClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (currentIndex !== children.length - 1) {
          next()
        }
      }

      const mergeNode = (node: React.ReactElement, type: 'left' | 'right') => {
        const onClick = (evt: any) => {
          const { onClick: chClick } = node.props

          if (type === 'left') {
            leftClick(evt)
          } else {
            rightClick(evt)
          }
          if (typeof chClick === 'function') {
            chClick(evt)
          }
        }
        return {
          ...node.props,
          onClick,
        }
      }

      const leftNode = (
        <div
          className={classNames(jumpClassPrefix, `${jumpClassPrefix}-left`, {
            [`${jumpClassPrefix}-disabled`]: currentIndex <= 0,
          })}
        >
          {Array.isArray(jumpNode) && jumpNode.length > 0 && isValidElement(jumpNode[0]) ? (
            React.cloneElement(jumpNode[0], mergeNode(jumpNode[0], 'left'))
          ) : (
            <Icon className={`${jumpClassPrefix}-icon`} type={'arrow-left-circle-solid'} onClick={leftClick} />
          )}
        </div>
      )

      const rightNode = (
        <div
          className={classNames(jumpClassPrefix, `${jumpClassPrefix}-right`, {
            [`${jumpClassPrefix}-disabled`]: currentIndex >= children.length - 1,
          })}
        >
          {Array.isArray(jumpNode) && jumpNode.length > 1 && isValidElement(jumpNode[1]) ? (
            React.cloneElement(jumpNode[1], mergeNode(jumpNode[1], 'right'))
          ) : (
            <Icon className={`${jumpClassPrefix}-icon`} type={'arrow-right-circle-solid'} onClick={rightClick} />
          )}
        </div>
      )

      return (
        <>
          {leftNode}
          {rightNode}
        </>
      )
    }
    return null
  }

  return (
    <div
      className={rootClassName}
      ref={carouselRef as any}
      onTransitionEnd={() => handleTransitionEnd()}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children?.length ? renderDisplayList() : null}
      {children?.length && showDot() ? (
        <Slidebar
          number={children.length}
          currentIndex={currentIndex}
          dotsClassName={dots}
          parentPrefixCls={carouselPrefixCls}
          dotPosition={dotPosition}
          onClick={handleClick}
        />
      ) : null}
      {renderJumpNode()}
    </div>
  )
}

const Carousel = React.forwardRef<unknown, CarouselProps>(InternalCarousel)
Carousel.displayName = 'Carousel'
export default Carousel
