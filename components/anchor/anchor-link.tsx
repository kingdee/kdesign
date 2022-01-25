import React, { useContext, useEffect, useRef } from 'react'
import classNames from 'classnames'
import AnchorContext from './context'
import ConfigContext from '../config-provider/ConfigContext'
import { usePrevious } from '../_utils/hooks'

export interface AnchorLinkProps {
  prefixCls?: string
  href: string
  target?: string
  title: React.ReactNode
  children?: React.ReactNode
  className?: string
  isFirstLevel?: boolean
}

const AnchorLink = (props: AnchorLinkProps): React.FunctionComponentElement<any> => {
  const { prefixCls: customPrefixcls, href, title, children, className, isFirstLevel } = props
  const { getPrefixCls, prefixCls } = useContext(ConfigContext)
  const anchorLinkPrefixCls = getPrefixCls!(prefixCls, 'anchor', customPrefixcls) // 锚点样式前缀

  const { activeLink, scrollTo, onClick, type, registerLink } = useContext(AnchorContext)

  const prevHref = usePrevious(href)
  const mounting = useRef(true)
  useEffect(() => {
    if (mounting.current) {
      registerLink(href)
      mounting.current = false
      return
    }
    if (prevHref !== href) {
      registerLink(href)
    }
  }, [href, registerLink, prevHref])

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const anchorElement = document.getElementById(href.replace('#', ''))
    if (anchorElement) {
      anchorElement.scrollIntoView()
    }
    onClick?.(e, { title, href })
    scrollTo(href)
  }

  const renderAnchorLink = () => {
    const active = activeLink === href
    const anchorLinkClasses = classNames(
      `${anchorLinkPrefixCls}-link`,
      {
        [`${anchorLinkPrefixCls}-link-active`]: active,
      },
      className,
    )

    const titleClassName = classNames(`${anchorLinkPrefixCls}-link-title`, {
      [`${anchorLinkPrefixCls}-link-title-active`]: active,
      [`${anchorLinkPrefixCls}-link-title-secondary`]: !isFirstLevel && type === 'bookmarks',
    })

    return (
      <div className={anchorLinkClasses}>
        <span title={typeof title === 'string' ? title : ''} className={titleClassName} onClick={handleClick}>
          {title}
        </span>
        {type !== 'menu' && children}
      </div>
    )
  }

  return renderAnchorLink()
}

export default AnchorLink
