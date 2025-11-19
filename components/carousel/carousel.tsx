import React, {
  CSSProperties,
  FunctionComponentElement,
  isValidElement,
  useContext,
  useEffect,
  useImperativeHandle,
} from 'react'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { getCompProps } from '../_utils'
import ResizeObserver from 'resize-observer-polyfill'
import devWarning from '../_utils/devwarning'
import { tuple } from '../_utils/type'
import isBoolean from 'lodash/isBoolean'
import { FadeList, ItemType } from './fadeList'
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
  dotPosition?: DotPositionType
  dots?: boolean | { dotsClassName: string; activeDotsClassName: string }
  easing?: string
  effect?: EffectType
  intervalTime?: number // 间隔时间， 单位 ms
  className?: string
  style?: CSSProperties
  afterChange?: (currentIndex: number) => void
  beforeChange?: (form: number, to: number) => void
}

type RectType = {
  bottom: number
  height: number
  left: number
  right: number
  top: number
  width: number
  x: number
  y: number
  hide: boolean
}

export interface ICarouselImperativeRef {
  next: () => void
  prev: () => void
  jumpTo: (index: number, needAnimation: boolean) => void
  getRef: () => HTMLDivElement | null
}

const InternalCarousel = (
  props: CarouselProps,
  ref: React.RefObject<ICarouselImperativeRef>,
): FunctionComponentElement<CarouselProps> => {
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
  const carouselRef = React.useRef<HTMLDivElement>(null)
  const listRef = React.useRef<HTMLUListElement>(null)
  const autoplayRef = React.useRef<NodeJS.Timeout>()
  const [isHidden, setIsHidden] = React.useState(false)

  const processChildren = (children: ItemType): ItemType[] => {
    const childCount = React.Children.count(children)
    if (childCount === 0) {
      return []
    } else if (childCount === 1) {
      return [children]
    } else {
      return React.Children.toArray(children) as ItemType[]
    }
  }

  const tempChild = processChildren(children)

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
    (rect: RectType) => {
      // 记录当前可见性
      setIsHidden(!!rect.hide)
      // 仅在可见时更新宽度
      if (itemWidth !== rect.width && !rect.hide) {
        setItemWidth(rect.width)
      }
    },
    [itemWidth],
  )

  const setScrollXEffectStyle = React.useCallback(() => {
    const tempChild = processChildren(children)
    if (!listRef.current) return
    if (tempChild.length <= 1) {
      listRef.current.style.cssText = ''
    } else {
      listRef.current.style.cssText = needAnimation
        ? `transform: translateX(${posX}px); transition:all 0.3s ${easing}`
        : `transform: translateX(${posX}px); transition:none`
    }
  }, [children?.length, needAnimation, easing, posX])

  useEffect(() => {
    setCurrentIndex(0)
  }, [children?.length])

  const jumpTo = React.useCallback(
    (index: number, needAnimation: boolean) => {
      const tempChild = processChildren(children)
      if (isFadeEffect) {
        if (index === -1 || index === tempChild.length) index = 0
        beforeChange && beforeChange(currentIndex, index)
        setCurrentIndex(index)
        setNeedAnimation(needAnimation)
      } else if (index >= -1 && index <= tempChild.length) {
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
      devWarning(
        !element && element !== null,
        'useResizeMeasure',
        'Specified element for useResizeMeasure does not exist',
      )
      return
    }
    const measure = (entries: ResizeObserverEntry[]) => {
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
    if (autoplay && !isHidden) {
      play()
    }
    return () => {
      autoplayRef.current && clearTimeout(autoplayRef.current)
    }
  }, [currentIndex, autoplay, intervalTime, play, isHidden])

  // 当容器从隐藏恢复到可见时，归一化索引并恢复自动播放
  React.useEffect(() => {
    // 隐藏时清理定时器，避免越界索引累积
    if (isHidden) {
      autoplayRef.current && clearTimeout(autoplayRef.current)
      return
    }

    // 可见时进行索引归一化，避免处于 -1 或 children.length 导致指示点不激活与自动播放停止
    if (isScrollxEffect) {
      const tempChild = processChildren(children)
      const len = tempChild.length
      let newIndex = currentIndex
      if (newIndex === -1 && len > 0) {
        newIndex = len - 1
      }
      if (newIndex === len && len > 0) {
        newIndex = 0
      }
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex)
        setNeedAnimation(false)
      }
    }

    // 当前索引未变化时，确保自动播放恢复
    if (autoplay) {
      play()
    }
  }, [isHidden])

  const showDot = () => {
    return isBoolean(dots) ? dots : true
  }

  useImperativeHandle(ref, () => ({
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
    const tempChild = processChildren(children)
    if (!autoplay || !tempChild?.length) return
    const childrenL = tempChild.length
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
    const tempChild = processChildren(children)
    let content
    if (isFadeEffect) {
      content = (
        <FadeList
          items={tempChild}
          parentPrefixCls={carouselPrefixCls}
          needAnimation={needAnimation}
          currentIndex={currentIndex}
          ref={listRef}
          itemWidth={itemWidth}
        />
      )
    } else if (isNoneEffect) {
      content = (
        <DisplayList items={tempChild} parentPrefixCls={carouselPrefixCls} currentIndex={currentIndex} ref={listRef} />
      )
    } else {
      content = (
        <SlideList items={tempChild} parentPrefixCls={carouselPrefixCls} currentIndex={currentIndex} ref={listRef} />
      )
    }
    return content
  }

  const renderJumpNode = () => {
    const tempChild = processChildren(children)
    if (tempChild?.length && jumpNode) {
      const jumpClassPrefix = `${carouselPrefixCls}-jump`
      const leftClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (currentIndex !== 0) {
          prev()
        }
      }
      const rightClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (currentIndex !== tempChild.length - 1) {
          next()
        }
      }

      const mergeNode = (node: React.ReactElement, type: 'left' | 'right') => {
        const onClick = (evt: React.MouseEvent) => {
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
            [`${jumpClassPrefix}-disabled`]: currentIndex >= tempChild.length - 1,
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
      ref={carouselRef}
      onTransitionEnd={() => handleTransitionEnd()}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {tempChild?.length ? renderDisplayList() : null}
      {tempChild?.length && showDot() ? (
        <Slidebar
          number={tempChild.length}
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
