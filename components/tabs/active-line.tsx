import React, { useContext } from 'react'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'

export interface ActiveLineProps extends React.HTMLAttributes<HTMLElement> {
  left: number
  width: number
  className?: string
}

const Line: React.FC<ActiveLineProps> = (props) => {
  const { getPrefixCls, prefixCls } = useContext(ConfigContext)
  const { left, width, className } = props

  const activeLinePrefixCls = getPrefixCls!(prefixCls, 'active-line')

  const activeLineClasses = classNames(activeLinePrefixCls, className, {
    // [`${tabPanePrefixCls}-size-${size}`]: size, // 尺寸样式
    // [`${tabPanePrefixCls}-disabled`]: disabled || loadingDisabled, // 禁用态样式
    // [`${tabPanePrefixCls}-loading`]: loading, // 加载中样式
  })

  const activeLineStyle = {
    left: `${left}px`,
    width: `${width}px`,
  }

  return <span className={activeLineClasses} style={activeLineStyle} />
}

Line.displayName = 'Line'

export default Line
