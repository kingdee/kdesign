import React, { useContext } from 'react'
import { ContentProps } from './index'
import { ConfigContext } from '../config-provider'
import Icon from '../icon'

export interface IconMap {
  [key: string]: React.ReactNode
}

const Content: React.FC<ContentProps> = (args) => {
  const { icon, content, closable, suffixCls, type, contentClose, closeNode } = args
  const { prefixCls } = useContext(ConfigContext)
  const classPrefix = `${prefixCls}-${suffixCls}-content`

  const iconMap: IconMap = {
    success: <Icon type="right-solid" />,
    warning: <Icon type="warning-solid" />,
    error: <Icon type="warning-solid" />,
    info: <Icon type="notice" />,
  }

  const renderIcon = () => {
    if (icon) return <div className={`${classPrefix}-icon-wrapper`}>{icon}</div>
    return iconMap[type] ? <div className={`${classPrefix}-icon-wrapper`}>{iconMap[type]}</div> : null
  }

  const handleClick = (e: React.MouseEvent) => {
    if (e) {
      e.stopPropagation()
    }
    contentClose && contentClose()
  }

  const renderCloseIcon = () => {
    if (!closable) return null
    if (closeNode) {
      return (
        <div className={`${classPrefix}-close`} onClick={handleClick}>
          {closeNode}
        </div>
      )
    }
    return (
      <div className={`${classPrefix}-close`} onClick={handleClick}>
        <Icon type="close" />
      </div>
    )
  }

  const getMainElement = () => {
    if (typeof content === 'string') {
      return (
        <>
          <div className={`${classPrefix}-main`}>
            {renderIcon()}
            <div className={`${classPrefix}-text`}>{content}</div>
          </div>
          {renderCloseIcon()}
        </>
      )
    }

    if (React.isValidElement(content)) {
      return content
    }

    return null
  }

  return <>{getMainElement()}</>
}

export default Content
