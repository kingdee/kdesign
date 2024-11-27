import React, { FC } from 'react'
import { ProgressProps } from './progress'
import classNames from 'classnames'

interface CircleProps extends ProgressProps {
  prefixCls?: string
  children?: React.ReactNode
}

let gradientSeed = 0

const Circle: FC<CircleProps> = (props) => {
  const { prefixCls, percent = 0, width = 88, strokeWidth = 4, trailColor, strokeColor, children } = props

  const circleStyle = {
    width: `${width}px`,
    height: `${width}px`,
  }

  const gradientId = gradientSeed
  gradientSeed++

  const radius = 50 - strokeWidth / 2
  const beginPositionX = 0
  const beginPositionY = -radius
  const endPositionX = 0
  const endPositionY = radius * 2
  const len = Math.PI * 2 * radius

  const isGradient = Object.prototype.toString.call(strokeColor) === '[object Object]'

  const stripPercentToNumber = (percent: string) => {
    return +percent.replace('%', '')
  }

  const toArray = (symArray: CircleProps['strokeColor']) => {
    return Array.isArray(symArray) ? symArray : [symArray]
  }

  const gradientColor = toArray(strokeColor).find((color) => {
    return Object.prototype.toString.call(color) === '[object Object]'
  })

  const gradientArr = isGradient
    ? Object.keys(gradientColor).sort(function (a, b) {
        return stripPercentToNumber(a) - stripPercentToNumber(b)
      })
    : null

  const gradientDom = isGradient ? (
    <defs>
      <linearGradient id={`${prefixCls}-gradient-${gradientId}`} x1="100%" y1="0%" x2="0%" y2="0%">
        {gradientArr?.map((key, index) => {
          return <stop key={index} offset={key} stopColor={gradientColor[key]}></stop>
        })}
      </linearGradient>
    </defs>
  ) : null

  const pathColor =
    strokeColor && typeof strokeColor !== 'string' ? `url(#${prefixCls}-gradient-${gradientId})` : strokeColor

  const pathString = `M 50,50 m ${beginPositionX},${beginPositionY} \n
                      a ${radius},${radius} 0 1 1 ${endPositionX},${endPositionY} \n
                      a ${radius},${radius} 0 1 1 ${endPositionX},${-endPositionY} \n`
  const pathStyle = {
    strokeDasharray: `${(percent / 100) * len}px ${len}px`,
    strokeDashoffset: '0px',
    opacity: percent === 0 ? 0 : 1,
    stroke: pathColor,
  }

  const wrapperClassName = classNames(`${prefixCls}-circle-box`, {
    [`${prefixCls}-circle-gradient`]: isGradient,
  })

  return (
    <>
      <div className={wrapperClassName} style={circleStyle}>
        <svg className={`${prefixCls}-circle`} viewBox="0 0 100 100" strokeWidth={strokeWidth}>
          {gradientDom}
          <path
            className={`${prefixCls}-circle-trail`}
            style={{ stroke: trailColor }}
            d={pathString}
            // stroke={trailColor}
            strokeWidth={strokeWidth}
            fillOpacity="0"
            strokeLinecap="round"
          ></path>
          <path
            className={`${prefixCls}-circle-path`}
            d={pathString}
            // stroke={pathColor}
            strokeWidth={strokeWidth}
            style={pathStyle}
            fillOpacity="0"
            strokeLinecap="round"
          ></path>
        </svg>
        {children}
      </div>
    </>
  )
}

export default Circle
