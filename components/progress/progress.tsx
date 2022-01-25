import React, { FC, useContext, useEffect } from 'react'
import classNames from 'classnames'
import Icon from '../icon'
import Line from './line'
import Circle from './circle'
import ConfigContext from '../config-provider/ConfigContext'
import { tuple } from '../_utils/type'
import { omit } from '../_utils/omit'
import { getCompProps } from '../_utils'
import { validProgress } from './utils'
import devWarning from '../_utils/devwarning'

export const ProgressTypes = tuple('line', 'circle')
export type ProgressType = typeof ProgressTypes[number]
export const ProgressStatuses = tuple('normal', 'cycle', 'loading', 'failure', 'success')
export type StringGradients = { [percentage: string]: string }
type FromToGradients = { from: string; to: string }
export type ProgressGradient = { direction?: string } & (StringGradients | FromToGradients)

export interface ProgressProps {
  type?: ProgressType
  style?: Record<string, unknown>
  className?: string
  width?: number
  strokeWidth?: number
  strokeColor?: string | ProgressGradient
  percent?: number
  showInfo?: boolean
  status?: typeof ProgressStatuses[number]
  infoPosition?: string
  trailColor?: string
  textMap?: React.ReactNode[]
  successIcon?: React.ReactNode
  failureIcon?: React.ReactNode
  format?: (percent: number) => React.ReactNode
  onProcess?: <T>(p: T) => T
  onFailedClick?: (percent: number, successPercent: number) => boolean
}

const Progress: FC<ProgressProps> = (props) => {
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps, locale } = useContext(ConfigContext)
  const progressProps = getCompProps('Progress', userDefaultProps, props)
  const { type, className, prefixCls: customPrefixcls, showInfo, percent, onProcess } = progressProps

  devWarning(ProgressTypes.indexOf(type) === -1, 'progress', `cannot found progress type '${type}'`)
  devWarning(type !== 'circle' && !!props.width, 'progress', 'props width only effect when type is circle')

  if (props.strokeWidth === undefined) {
    progressProps.strokeWidth = type === 'circle' ? progressProps.strokeWidth : progressProps.trailWidth
  }

  const getPercentNumber = (props: ProgressProps) => {
    const { percent = 0 } = props
    return parseInt(percent.toString(), 10)
  }

  const getProgressStatus = (props: ProgressProps) => {
    const { status } = props
    if (ProgressStatuses.indexOf(status!) < 0 && getPercentNumber(props) >= 100) {
      return 'success'
    }
    return status || 'normal'
  }

  const progressStatus = getProgressStatus(progressProps)
  const progressPrefixCls = getPrefixCls!(prefixCls, 'progress', customPrefixcls)
  const progressClasses = classNames(progressPrefixCls, className, {
    [`${progressPrefixCls}-type-${type}`]: type,
    [`${progressPrefixCls}-status-${progressStatus}`]: true,
    [`${progressPrefixCls}-show-info`]: showInfo,
  })

  const renderProgressInfo = (
    prefixCls: string,
    progressStatus: typeof ProgressStatuses[number],
    props: ProgressProps,
  ) => {
    const { type = 'line', showInfo, format, percent, infoPosition, successIcon, failureIcon } = props
    const isLoading = progressStatus !== 'failure' && progressStatus !== 'success'
    if ((!showInfo && type !== 'circle') || (infoPosition !== 'right' && isLoading)) return null

    let text
    const textFormatter =
      format ||
      ((percentNumber) => (
        <>
          <span className={`${prefixCls}-text-percent`}>{percentNumber}</span>
          <span className={`${prefixCls}-text-unit`}>%</span>
        </>
      ))

    const successNodeMap = {
      line: <Icon className={`${prefixCls}-icon`} type="right-solid" />,
      circle: <Icon className={`${prefixCls}-icon`} type="right-bold" />,
      custom: successIcon,
    }
    const failureNodeMap = {
      line: <Icon className={`${prefixCls}-icon`} type="refresh-solid" />,
      circle: <Icon className={`${prefixCls}-icon`} type="close-bold" />,
      custom: failureIcon,
    }

    if (format || isLoading) {
      text = textFormatter(validProgress(percent))
    } else if (progressStatus === 'failure') {
      text = failureNodeMap.custom || failureNodeMap[type]
    } else if (progressStatus === 'success') {
      text = successNodeMap.custom || successNodeMap[type]
    }

    return <span className={`${prefixCls}-text`}>{text}</span>
  }

  const renderSpecialInfo = (
    prefixCls: string,
    progressStatus: typeof ProgressStatuses[number],
    props: ProgressProps,
  ) => {
    const { type, showInfo, infoPosition, textMap = [] } = props
    const langMsgs = locale.getCompLangMsg({ componentName: 'Progress' })
    const defaultTextMap = [langMsgs.loading, langMsgs.fail, langMsgs.success]
    const isLoading = progressStatus !== 'failure' && progressStatus !== 'success'
    if (!showInfo || (infoPosition === 'right' && type !== 'circle')) return null

    const concatMap = defaultTextMap.map((text: string, index: number) => {
      if (type === 'circle' && index === 0) return textMap[index] || langMsgs.circleLoadingDesc
      return textMap[index] || text
    })
    let text
    if (isLoading) {
      text = concatMap[0]
    } else if (progressStatus === 'failure') {
      text = concatMap[1]
    } else if (progressStatus === 'success') {
      text = concatMap[2]
    }

    return <div className={`${prefixCls}-special-text`}>{text}</div>
  }

  let progress = (
    <Line {...progressProps} prefixCls={progressPrefixCls}>
      {renderProgressInfo(progressPrefixCls, progressStatus, progressProps)}
    </Line>
  )

  if (type === 'circle') {
    progress = (
      <Circle {...progressProps} prefixCls={progressPrefixCls}>
        {renderProgressInfo(progressPrefixCls, progressStatus, progressProps)}
      </Circle>
    )
  }

  useEffect(() => {
    onProcess && onProcess(percent)
  }, [percent, onProcess])

  return (
    <div
      {...omit(progressProps, [
        'status',
        'format',
        'width',
        'strokeWidth',
        'trailWidth',
        'trailColor',
        'strokeColor',
        'percent',
        'infoPosition',
        'showInfo',
        'textMap',
        'onProcess',
      ])}
      className={progressClasses}
    >
      {progress}
      {renderSpecialInfo(progressPrefixCls, progressStatus, progressProps)}
    </div>
  )
}

Progress.displayName = 'Progress'

export default Progress
