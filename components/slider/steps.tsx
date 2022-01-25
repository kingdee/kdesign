import React from 'react'
import classNames from 'classnames'
import devWarning from '../_utils/devwarning'

const getAllMarkPoints = (
  marks: Record<number, React.ReactNode | { style?: React.CSSProperties; label?: React.ReactNode }>,
  dots: boolean,
  step: number,
  min: number,
  max: number,
) => {
  devWarning(
    dots ? step > 0 : true,
    'slider',
    '`Slider[step]` should be a positive number in order to make Slider[dots] work.',
  )
  const points = Object.keys(marks)
    .map(parseFloat)
    .sort((a, b) => a - b)
  if (dots && step) {
    for (let i = min; i <= max; i += step) {
      if (points.indexOf(i) === -1) {
        points.push(i)
      }
    }
  }
  return points
}

export interface stepsProps {
  marks: Record<number, React.ReactNode | { style?: React.CSSProperties; label?: string }>
  prefixCls: string
  vertical: boolean
  reverse: boolean
  dots: boolean
  step: number
  min: number
  max: number
  bound: number
}

function steps(props: stepsProps) {
  const { marks, prefixCls, vertical, reverse, dots, step, min, max, bound } = props
  const range = max - min
  const elements = getAllMarkPoints(marks, dots, step, min, max).map((point) => {
    const isActived = bound >= point
    const offset = `${(Math.abs(point - min) / range) * 100}%`
    const style = vertical ? { [reverse ? 'top' : 'bottom']: offset } : { [reverse ? 'right' : 'left']: offset }
    const markPointClass = classNames({
      [`${prefixCls}-dot`]: true,
      [`${prefixCls}-dot-actived`]: isActived,
    })
    return <span className={markPointClass} key={point} style={style}></span>
  })
  const stepClass = classNames(`${prefixCls}-step`, {
    [`${prefixCls}-reverse`]: reverse,
  })
  return <div className={stepClass}>{elements}</div>
}

export default steps
