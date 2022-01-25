import React, { FC } from 'react'
import { ProgressProps } from './progress'
import { validProgress, handleGradient } from './utils'

interface LineProps extends ProgressProps {
  prefixCls?: string
  children?: React.ReactNode
}

const Line: FC<LineProps> = (props) => {
  const { prefixCls, children, percent, trailColor, strokeColor, strokeWidth } = props

  const backgroundProps =
    strokeColor && typeof strokeColor !== 'string'
      ? handleGradient(strokeColor)
      : {
          background: strokeColor,
        }

  const trailStyle = { backgroundColor: trailColor || undefined }

  const percentStyle = {
    width: `${validProgress(percent)}%`,
    height: strokeWidth && `${strokeWidth}px`,
    ...backgroundProps,
  } as React.CSSProperties

  return (
    <>
      <div className={`${prefixCls}-outer`}>
        <div className={`${prefixCls}-inner`} style={trailStyle}>
          <div className={`${prefixCls}-bg`} style={percentStyle}></div>
        </div>
      </div>
      {children}
    </>
  )
}

Line.displayName = 'Line'

export default Line
