import React, { useContext } from 'react'
import { ContentProps, footerArrayType } from './index'
import { ConfigContext } from '../config-provider'
import Icon from '../icon'
import classNames from 'classnames'

export interface IconMap {
  [key: string]: React.ReactNode
}

const Content: React.FC<ContentProps> = (args) => {
  const { title, footer, content, closable, suffixCls, contentClose, showIcon, type, icon, closeNode } = args
  const { prefixCls, locale } = useContext(ConfigContext)
  const notificationLangMsg = locale.getCompLangMsg({ componentName: 'Notification' })
  const classPrefix = `${prefixCls}-${suffixCls}-content`

  const iconMap: IconMap = {
    info: <Icon type="warning-solid" />,
    primary: <Icon type="warning-solid" />,
  }

  const renderIcon = () => {
    if (icon) return <div className={classNames(`${classPrefix}-title-left-icon`)}>{icon}</div>
    if (!showIcon) return null
    return iconMap[type] ? <div className={classNames(`${classPrefix}-title-left-icon`)}>{iconMap[type]}</div> : null
  }

  const renderCloseIcon = () => {
    if (!closable) return null
    if (closeNode) {
      return (
        <div className={`${classPrefix}-title-close`} onClick={contentClose}>
          {closeNode}
        </div>
      )
    }
    return (
      <div className={`${classPrefix}-title-close`} onClick={contentClose}>
        <Icon type="close" />
      </div>
    )
  }

  const getTitleElement = () => {
    if (typeof title === null) {
      return null
    }

    if (React.isValidElement(title)) {
      return title
    }

    return (
      <div className={classNames(`${classPrefix}-title`)}>
        <div className={classNames(`${classPrefix}-title-left`)}>
          {renderIcon()}
          <div className={classNames(`${classPrefix}-title-left-text`)}>
            {typeof title === 'undefined' ? notificationLangMsg.title : title}
          </div>
        </div>
        {renderCloseIcon()}
      </div>
    )
  }

  const getFooterElement = () => {
    if (React.isValidElement(footer)) {
      return footer
    }

    if (Array.isArray(footer)) {
      const arr = footer as footerArrayType[]
      return (
        <div className={classNames(`${classPrefix}-footer`)}>
          {arr.map(({ name, onClick }) => {
            if (name) {
              return (
                <div
                  key={name}
                  onClick={(e) => {
                    if (e) {
                      e.stopPropagation()
                    }
                    onClick && onClick()
                  }}
                >
                  <div>{name}</div>
                </div>
              )
            }
            return null
          })}
        </div>
      )
    }

    return null
  }

  const getMainElement = () => {
    if (typeof content === 'string') {
      return <div className={classNames(`${classPrefix}-description`)}>{content}</div>
    }

    if (React.isValidElement(content)) {
      return content
    }

    return null
  }

  return (
    <>
      {getTitleElement()}
      {getMainElement()}
      {getFooterElement()}
    </>
  )
}

export default Content
