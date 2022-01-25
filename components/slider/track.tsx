import React from 'react'

interface trackProps {
  prefixCls: string
  vertical: boolean
  reverse: boolean
  bound: number
  min: number
  max: number
}

function Track(props: trackProps) {
  const { prefixCls, vertical, reverse, bound, min, max } = props

  const range = max - min
  const offset = `${(Math.abs(bound - min) / range) * 100}%`

  const trackStyle = vertical
    ? {
        [reverse ? 'top' : 'bottom']: '0%',
        [reverse ? 'bottom' : 'top']: 'auto',
        height: offset,
      }
    : {
        [reverse ? 'right' : 'left']: '0%',
        [reverse ? 'left' : 'right']: 'auto',
        width: offset,
      }

  return <div className={`${prefixCls}-track`} style={trackStyle}></div>
}

export default Track
