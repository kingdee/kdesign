import React, { ReactNode, useContext, useEffect, useState, useRef, ReactElement, useCallback } from 'react'
import { Icon } from '../index'
import ReactDOM from 'react-dom'
import { tuple } from '../_utils/type'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { getCompProps } from '../_utils'
import { usePrevious } from '../_utils/hooks'
import devWarning from '../_utils/devwarning'

export const AlertTypes = tuple('success', 'info', 'warning', 'error')
export type AlertType = typeof AlertTypes[number]
const IconTypes = tuple('right-solid', 'notice', 'warning-solid', 'warning-solid')
type IconType = typeof IconTypes[number]
type Destination = 'bg' | 'border' | 'icon'
type BannerOffsetType = [number, number]
export const allBannerAlertPortals: Map<string, HTMLElement> = new Map()
const allBannerAlertPortalsContainer = document.querySelector('body')!
// 由于是全局的, 暂时关闭
// let originOrder = 100
export interface IAlertProps {
  type?: AlertType
  message?: ReactNode
  showIcon?: boolean
  icon?: ReactNode
  closable?: boolean
  closeNode?: ReactNode
  delayOffTime?: number
  className?: string
  style?: Record<string, unknown>
  prefixCls?: string // 样式前缀
  onClose?: () => void
  extra?: ReactNode
  banner?: boolean
  bannerOffset?: BannerOffsetType
}
const setContainerStyle = (dom: HTMLElement, posInfo: BannerOffsetType) => {
  const styles: Record<string, string> = {
    left: posInfo[0] + 'px',
    top: posInfo[1] + 'px',
  }
  Object.keys(styles).forEach((prop) => {
    dom.style.setProperty(prop, styles[prop])
  })
}

/**
 * @description 创建悬浮顶部的反馈浮层容器
 * @param alertContainer 反馈浮层容器ref
 * @param alertPrefixCls 反馈浮层前缀class
 * @param bannerOffset 反馈浮层悬浮顶部的坐标量
 *
 */

function createAlertContainer(
  alertContainer: React.MutableRefObject<HTMLElement | null>,
  alertPrefixCls: string,
  bannerOffset: BannerOffsetType,
) {
  const posKey = bannerOffset!.join(',')
  const container = document.createElement('div')
  container.classList.add(`${alertPrefixCls}-banner-container`)
  // container.classList.add(`${alertPrefixCls}-banner-container-flex`)

  setContainerStyle(container, bannerOffset!)
  alertContainer.current = container
  allBannerAlertPortalsContainer.appendChild(container)
  allBannerAlertPortals.set(posKey, container)
}
const Alert: React.FC<IAlertProps> = (props: IAlertProps): ReactElement | React.ReactPortal => {
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps } = useContext(ConfigContext)
  const alertProps: IAlertProps = getCompProps('Alert', userDefaultProps, props) // 属性需要合并一遍用户定义的默认属性
  const {
    type,
    message,
    showIcon,
    icon,
    className,
    style,
    prefixCls: customPrefixcls,
    closable,
    closeNode,
    delayOffTime,
    onClose,
    extra,
    banner,
    bannerOffset,
    ...othersProps
  } = alertProps
  devWarning(AlertTypes.indexOf(type!) === -1, 'alert', `cannot found alert type '${type}'`)
  const [visible, setVisible] = useState(true)
  const previousBannerOffset = usePrevious<BannerOffsetType>(bannerOffset!)
  const timerRef = useRef<number | undefined>()
  const alertRef = useRef<HTMLDivElement>(null)
  const alertContainer = useRef<HTMLElement | null>(allBannerAlertPortalsContainer)
  const forceUpdate = useState(0)[1]
  const previousMessage = usePrevious(message)
  const alertPrefixCls = getPrefixCls!(prefixCls, 'alert', customPrefixcls)

  useEffect(() => {
    if (banner) {
      const previousPosKey = previousBannerOffset.join(',')
      const posKey = bannerOffset!.join(',')
      if (
        previousPosKey !== posKey ||
        !alertContainer.current ||
        alertContainer.current === allBannerAlertPortalsContainer
      ) {
        const oldContainer = allBannerAlertPortals.get(previousPosKey)
        setTimeout(() => {
          if (oldContainer?.children?.length === 0) {
            Array.from(allBannerAlertPortalsContainer.children).includes(oldContainer) &&
              allBannerAlertPortalsContainer.removeChild(oldContainer)
            allBannerAlertPortals.delete(previousPosKey)
          }
        }, 0)
        const newContainer = allBannerAlertPortals.get(posKey)
        if (newContainer) {
          alertContainer.current = newContainer
        } else {
          createAlertContainer(alertContainer, alertPrefixCls, bannerOffset!)
        }
      }
      forceUpdate((val) => val + 1)
    }
  }, [banner, bannerOffset, previousBannerOffset, forceUpdate, alertPrefixCls])

  const showAlert = () => {
    setVisible(true)
  }

  const hideAlert = useCallback(() => {
    timerRef.current = window.setTimeout(() => {
      setVisible(false)
    }, delayOffTime)
  }, [delayOffTime])

  useEffect(() => {
    if (delayOffTime === 0 || message !== previousMessage) {
      showAlert()
      clearTimer()
    }
    if (delayOffTime === 0) {
      return () => {
        clearTimeout(timerRef.current)
      }
    }
    hideAlert()
    return () => {
      clearTimeout(timerRef.current)
    }
  }, [delayOffTime, message, previousMessage, timerRef, hideAlert])

  const alertClasses = classNames(alertPrefixCls, className, {
    [`${alertPrefixCls}-closable`]: closable,
    [`${alertPrefixCls}-banner`]: banner,
    [`${alertPrefixCls}-leave`]: !visible || !message,
    [`${alertPrefixCls}-visible`]: visible && message,
    [`${alertPrefixCls}-container`]: true,
  })

  const handleClose = () => {
    onClose && onClose()
    setVisible(false)
    clearTimer()
  }
  function clearTimer() {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = undefined
    }
  }
  function handleMouseOut() {
    hideAlert()
  }
  const events: Record<string, () => void> = {}
  if (delayOffTime) {
    events.onMouseOver = clearTimer
    events.onMouseOut = handleMouseOut
  }

  const alertIconType: IconType = IconTypes[AlertTypes.indexOf(type!)]
  const getAlertColorType = (mode: Destination): string => {
    return `alert-${type}-${mode}-color`
  }
  const iconNode: ReactNode = (
    <div className={classNames(`${alertPrefixCls}-icon`, getAlertColorType('icon'))}>
      {icon || <Icon type={alertIconType} />}
    </div>
  )
  const AlertComp: React.ReactElement = (
    <div
      className={classNames(alertClasses, getAlertColorType('bg'), getAlertColorType('border'))}
      {...events}
      ref={alertRef}
      style={style}
      {...othersProps}
    >
      {showIcon && iconNode}
      <div
        className={classNames({
          [`${alertPrefixCls}-message`]: true,
          [`${alertPrefixCls}-without-icon-message`]: !showIcon,
        })}
      >
        {message}
      </div>
      {extra}
      {closable && type !== 'success' && (
        <div className={`${alertPrefixCls}-close-icon`} onClick={handleClose}>
          {closeNode || <Icon type="close" />}
        </div>
      )}
    </div>
  )
  if (banner) {
    return ReactDOM.createPortal(AlertComp, alertContainer.current!)
  } else {
    return AlertComp
  }
}

Alert.displayName = 'Alert'
export default Alert
