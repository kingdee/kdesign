import React, { useState, useContext, useEffect, useCallback } from 'react'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { getCompProps } from '../_utils'
import { tuple } from '../_utils/type'
import AnchorContext from './context'
import devWarning from '../_utils/devwarning'
import { Icon } from '../index'
import usePopper from '../_utils/usePopper'
import { toArray } from '../_utils/react-children'
import { useResizeObserver } from '../_utils/hooks'

const sharpMatcherRegx = /#(\S+)$/

export type AnchorContainer = HTMLElement | Window

export const AnchorTypes = tuple('bookmarks', 'menu', 'advanced')
export type AnchorType = typeof AnchorTypes[number]

type Section = {
  link: string
  top: number
}

type anchorPositionProps = {
  width?: number
  height?: number
  top?: number
}

function getDefaultContainer() {
  return window
}

function getOffsetTop(element: HTMLElement, container: AnchorContainer): number {
  if (!element.getClientRects().length) {
    return 0
  }

  const rect = element.getBoundingClientRect()

  if (rect.width || rect.height) {
    if (container === window) {
      container = element.ownerDocument!.documentElement!
      return rect.top - container.clientTop
    }
    return rect.top - (container as HTMLElement).getBoundingClientRect().top
  }

  return rect.top
}

export interface AnchorProps {
  prefixCls?: string
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
  type?: AnchorType
  offsetTop?: number
  bounds?: number
  affix?: boolean
  lockedIcon?: boolean | React.ReactNode
  icon?: React.ReactNode
  dropdownStyle?: React.CSSProperties
  visible?: boolean
  getContainer?: () => AnchorContainer
  getCurrentAnchor?: () => string
  onClick?: (e: React.MouseEvent<HTMLElement>, link: { title: React.ReactNode; href: string }) => void
  onChange?: (currentActiveLink: string) => void
}
const InternalAnchor = (props: AnchorProps, ref: unknown): React.FunctionComponentElement<AnchorProps> => {
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps } = useContext(ConfigContext)
  const anchorProps = getCompProps('Anchor', userDefaultProps, props)
  const {
    prefixCls: customPrefixcls,
    className,
    children,
    type,
    onChange,
    onClick,
    getCurrentAnchor,
    offsetTop = 0,
    getContainer,
    bounds = 5,
    style,
    lockedIcon = true,
    icon,
    affix,
    dropdownStyle,
    onVisibleChange,
  } = anchorProps

  const anchorPrefixCls = getPrefixCls!(prefixCls, 'anchor', customPrefixcls) // 锚点样式前缀

  devWarning(AnchorTypes.indexOf(type) === -1, 'anchor', `cannot found anchor type '${type}'`)

  const [activeLink, setActiveLink] = useState<string | null>(null)
  const [fixedTop, setFixedTop] = useState(false)
  const [links, setLinks] = useState<string[]>([])
  const [anchorPosition, setAnchorPosition] = useState<anchorPositionProps>({})
  const [listWidth, setListWidth] = useState(0)
  const [menuWrapWidth, setMenuWrapWidth] = useState(0)
  const [listPostion, setListPosition] = useState(0)
  const [positionHistory, setPositionHistory] = useState<number[]>([0])
  const [optionShow, setOptionShow] = useState<boolean>(!!props.visible)
  const [isLocked, setIsLocked] = useState(false)

  const isAdcanced = type === 'advanced'

  // ref
  const wrapperRef = React.useRef<HTMLDivElement>(null)
  const inkRef = React.useRef<HTMLElement>(null)
  const linkContentRef = React.useRef<HTMLDivElement>(null)
  const iconRef = React.useRef<HTMLElement>(null)
  const menuWrapRef = React.createRef<HTMLDivElement>()
  const normalRef = React.useRef<HTMLDivElement>(null)
  const anchorRef = (ref as any) || normalRef
  const linksWidthRef = React.useRef<number[]>([])

  const wrapperClass = classNames(className, {
    [`${anchorPrefixCls}-wrapper`]: true,
  })

  // classes
  const anchorMenuClass = classNames({
    [`${anchorPrefixCls}-menu`]: true,
  })

  const anchorAdvancedClass = classNames({
    [`${anchorPrefixCls}-advanced`]: true,
  })

  const inkClass = classNames(`${anchorPrefixCls}-line-slider`, {
    visible: activeLink,
  })

  React.useEffect(() => {
    setOptionShow(!!props.visible)
  }, [props.visible])

  const updateInk = useCallback(() => {
    const anchorNode = (isAdcanced ? wrapperRef : anchorRef).current
    const inkNode = inkRef.current
    const linkNode = anchorNode?.getElementsByClassName(`${anchorPrefixCls}-link-title-active`)[0]
    if (linkNode && inkNode) {
      inkNode.style.top = `${(linkNode as any).offsetTop + 1}px`
    }
  }, [anchorPrefixCls, anchorRef, isAdcanced])

  const mounting = React.useRef(true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (mounting.current) {
      mounting.current = false
      if (linkContentRef.current) {
        const nodelist = linkContentRef.current?.children
        const linksWidth = Array.from(nodelist).map((item: any) => item.getBoundingClientRect().width)
        linksWidthRef.current = linksWidth
      }
      return
    }
    updateInk()
  })

  useResizeObserver(anchorRef.current, () => {
    const nodelist = linkContentRef.current?.children
    if (!nodelist) return
    const linksWidth = Array.from(nodelist).map((item: any) => item.getBoundingClientRect().width)
    linksWidthRef.current = linksWidth
  })

  useEffect(() => {
    if (linkContentRef.current) {
      setTimeout(() => {
        const width = linkContentRef.current?.getBoundingClientRect().width || 0
        setListWidth(width)
      }, 0)
    }
  }, [linkContentRef, menuWrapRef, children])

  useEffect(() => {
    if (menuWrapRef.current) {
      setTimeout(() => {
        setMenuWrapWidth(menuWrapRef.current?.getBoundingClientRect().width || 0)
      }, 0)
    }
  }, [menuWrapRef])

  const registerLink = (link: string) => {
    if (!links.includes(link)) {
      setLinks((pre) => [...pre, link])
    }
  }

  const getScrollContainer = useCallback(() => {
    const getFunc = getContainer || getDefaultContainer
    return getFunc()
  }, [getContainer])

  const getAnchor = useCallback(
    (offsetTop = 0, bounds): string => {
      const linkSections: Array<Section> = []
      const container = getScrollContainer()
      links.forEach((link) => {
        const sharpLinkMatch = sharpMatcherRegx.exec(link.toString())
        if (!sharpLinkMatch) {
          return
        }
        const target = document.getElementById(sharpLinkMatch[1])
        if (target) {
          const top = getOffsetTop(target, container)
          if (top < offsetTop + bounds) {
            linkSections.push({
              link,
              top,
            })
          }
        }
      })
      if (linkSections.length) {
        const maxSection = linkSections.reduce((prev, curr) => (curr.top > prev.top ? curr : prev))
        return maxSection.link
      }
      return ''
    },
    [getScrollContainer, links],
  )

  const handleScrollTo = (link: string) => {
    setCurrentActiveLink(link)
  }

  const setCurrentActiveLink = useCallback(
    (link: string) => {
      if (activeLink === link) {
        return undefined
      }
      setActiveLink(typeof getCurrentAnchor === 'function' ? getCurrentAnchor() : link)
      onChange?.(link)
    },
    [onChange, setActiveLink, activeLink, getCurrentAnchor],
  )

  const handleScroll = useCallback(() => {
    if (affix && type !== 'advanced' && anchorRef.current) {
      const container = getScrollContainer()
      const top = getOffsetTop(anchorRef.current, container)
      if (top <= offsetTop) {
        setFixedTop(true)
      }
      if (top > offsetTop) {
        setFixedTop(false)
      }
    }
    const currentActiveLink = getAnchor(offsetTop || 0, bounds)
    currentActiveLink && setCurrentActiveLink(currentActiveLink)
  }, [affix, setFixedTop, offsetTop, bounds, getAnchor, setCurrentActiveLink, type, getScrollContainer, anchorRef])

  useEffect(() => {
    getScrollContainer().addEventListener('scroll', handleScroll)
    handleScroll()
    return () => getScrollContainer().removeEventListener('scroll', handleScroll)
  }, [handleScroll, getScrollContainer])

  useEffect(() => {
    if (!isAdcanced && anchorRef && anchorRef.current) {
      const { top, width, height } = anchorRef.current.getBoundingClientRect()
      setAnchorPosition({ top, width, height })
    }
  }, [anchorRef, getScrollContainer, isAdcanced])

  const handleVisibleChange = (visible: boolean) => {
    !isLocked && onVisibleChange && onVisibleChange(visible)
    if (props.visible !== undefined) return
    !isLocked && setOptionShow(visible)
  }

  const popperProps = {
    autoPlacement: false,
    ...anchorProps,
    prefixCls: anchorPrefixCls,
    defaultVisible: optionShow,
    visible: optionShow,
    gap: -(((ref as any) || iconRef).current?.offsetHeight || 0),
    onVisibleChange: handleVisibleChange,
  }

  const fixedRef = React.useRef<HTMLDivElement>(null)

  if (type === 'advanced' && isLocked) {
    if (fixedRef.current) {
      const { left, top } = fixedRef.current.getBoundingClientRect()
      popperProps.popperStyle = { position: 'fixed', left, top }
    }
  }

  const addChildrenProps = (linksChildren: any) => {
    return toArray(linksChildren).map((item: any, indx: number) => {
      if (!item) return item
      return React.cloneElement(item, { isFirstLevel: true, key: indx })
    })
  }

  const anchorBookmarksContent = (ref: any) => (
    <div ref={ref} className={wrapperClass} style={style}>
      <div
        className={anchorPrefixCls}
        style={fixedTop ? { position: 'fixed', top: offsetTop || 0, width: anchorPosition.width } : undefined}
      >
        <div className={`${anchorPrefixCls}-line`}>
          <span className={inkClass} ref={inkRef} />
        </div>
        {addChildrenProps(children)}
      </div>
    </div>
  )

  const renderLeftArrow = () => {
    const leftClasses = classNames(`${anchorMenuClass}-left-arrows`, {
      [`${anchorMenuClass}-left-arrows-disabled`]: listPostion === 0,
    })

    const handleLeft = () => {
      if (listPostion === 0) return
      const positions = [...positionHistory]
      positions.pop()
      setPositionHistory(positions)

      setListPosition(positions[positions.length - 1])
    }
    return (
      <span className={leftClasses} onClick={handleLeft}>
        <Icon type="arrow-left" />
      </span>
    )
  }

  const findCurrentLinkPosition = (linksWidth: number[], boxWidth: number, position: number) => {
    if (!linksWidth.length) return 0
    let offset = 0
    for (let index = 0; index < linksWidth.length - 1; index++) {
      if (linksWidth[index] + offset < boxWidth - position) {
        offset += linksWidth[index]
      }
    }
    return offset
  }

  const renderRightArrow = () => {
    const canActionRightArrow = listPostion === menuWrapWidth - listWidth
    const rightClasses = classNames(`${anchorMenuClass}-right-arrows`, {
      [`${anchorMenuClass}-right-arrows-disabled`]: canActionRightArrow,
    })
    const handleRight = () => {
      if (canActionRightArrow) return
      const offset = findCurrentLinkPosition(linksWidthRef.current, menuWrapWidth, listPostion)
      const posiostion = offset + menuWrapWidth >= listWidth ? menuWrapWidth - listWidth : -offset
      setPositionHistory((pre) => [...pre, posiostion])
      setListPosition(posiostion)
    }
    return (
      <span className={rightClasses} onClick={handleRight}>
        <Icon type="arrow-right" />
      </span>
    )
  }

  const anchorMenuContent = (
    <div ref={anchorRef} className={`${anchorPrefixCls}-menu-wrapper`} style={{ width: '100%', ...style }}>
      <div
        className={anchorMenuClass}
        style={
          fixedTop
            ? { position: 'fixed', top: offsetTop || 0, width: style?.width || '100px' }
            : { width: style?.width }
        }
      >
        {renderLeftArrow()}
        <div className={`${anchorPrefixCls}-menu-wrap`} ref={menuWrapRef} style={{ maxWidth: listWidth }}>
          <div
            ref={linkContentRef}
            className={`${anchorPrefixCls}-menu-link-list`}
            style={{ left: `${listPostion}px` }}
          >
            {children}
          </div>
        </div>
        {renderRightArrow()}
      </div>
    </div>
  )

  const renderAnchorAdvanced = () => {
    const iconList = toArray(lockedIcon)
    const unlock = iconList[0] || <Icon type="unlock-solid" />
    const lock = iconList[1] || <Icon type="lock-solid" />
    return (
      <div ref={fixedRef} className={anchorAdvancedClass} style={dropdownStyle}>
        {lockedIcon !== false && (
          <span className={`${anchorPrefixCls}-advanced-lock`} onClick={() => setIsLocked(!isLocked)}>
            {isLocked ? lock : unlock}
          </span>
        )}
        {anchorBookmarksContent(wrapperRef)}
      </div>
    )
  }

  const anchorAdvancedContent = usePopper(
    <span className={`${anchorPrefixCls}-advanced-arrows`} ref={isAdcanced ? (ref as any) || iconRef : null}>
      {icon || <Icon type="location-solid" />}
    </span>,
    renderAnchorAdvanced(),
    popperProps,
  )

  const renderAnchorContent = (anchorType: string) => {
    switch (anchorType) {
      case 'bookmarks':
        return anchorBookmarksContent(anchorRef)
      case 'menu':
        return anchorMenuContent
      case 'advanced':
        return anchorAdvancedContent
      default:
        return anchorBookmarksContent(anchorRef)
    }
  }

  return (
    <AnchorContext.Provider
      value={{
        registerLink,
        activeLink,
        scrollTo: handleScrollTo,
        onClick,
        type,
      }}
    >
      {renderAnchorContent(type)}
    </AnchorContext.Provider>
  )
}

const Anchor = React.forwardRef<unknown, AnchorProps>(InternalAnchor)
Anchor.displayName = 'Anchor'
export default Anchor
