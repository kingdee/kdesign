import * as React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import { getCompProps } from '../_utils'
import { ConfigContext } from '../config-provider'
import Icon from '../icon'
import throttle from 'lodash/throttle'
import findLast from 'lodash/findLast'
import Draggable from 'react-draggable'

export type PreviewType = 'default' | 'upload'
interface IWheelEvent extends WheelEvent {
  wheelDelta: number
}

export interface PreviewProps {
  src?: string
  alt?: string
  name?: string
  size?: string
  scales?: Array<number>
  visible: boolean
  type?: PreviewType
  className?: string
  style?: React.CSSProperties
  operations?: Array<React.ReactNode>
  onNext?: (e: React.MouseEvent<HTMLElement>) => void
  onPrevious?: (e: React.MouseEvent<HTMLElement>) => void
  onClose?: (e: React.SyntheticEvent<Element>) => void
  icons?: {
    rotate?: React.ReactNode
    download?: React.ReactNode
    zoomIn?: React.ReactNode
    zoomOut?: React.ReactNode
    close?: React.ReactNode
    left?: React.ReactNode
    right?: React.ReactNode
  }
}

const Preview: React.FC<PreviewProps> = (props) => {
  const {
    getPrefixCls,
    prefixCls: pkgPrefixCls,
    compDefaultProps: userDefaultProps,
    locale,
  } = React.useContext(ConfigContext)

  // 属性需要合并一遍用户定义的默认属性
  const allProps = getCompProps('Image', userDefaultProps, props)
  const imageLangMsg = locale.getCompLangMsg({ componentName: 'Image' })

  const {
    src,
    alt,
    name,
    size,
    scales,
    visible,
    onClose,
    current,
    length,
    operations,
    prefixCls: customPrefixcls,
  } = allProps

  // className前缀
  const prefixCls = getPrefixCls!(pkgPrefixCls, 'image', customPrefixcls)

  const [show, setShow] = React.useState(visible)
  React.useEffect(() => {
    setShow(visible)
    visible && setPreviewSrc(src)
  }, [visible, src])

  const [previewSrc, setPreviewSrc] = React.useState(src)

  const [scale, setScale] = React.useState(1)

  const maxScale = scales[scales.length - 1] / 100
  const minScale = scales[0] / 100

  React.useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden'

      const throMouseWheel = throttle((e: IWheelEvent) => {
        if (e.wheelDelta > 0) {
          if (scale > maxScale) return
          if (scale + 0.1 > maxScale) {
            setScale(maxScale)
          } else {
            setScale(scale + 0.1)
          }
        } else if (e.wheelDelta < 0) {
          if (scale < minScale) return
          if (scale - 0.1 < minScale) {
            setScale(minScale)
          } else {
            setScale(scale - 0.1)
          }
        }
      }, 200)
      document.addEventListener('mousewheel', throMouseWheel)
      return () => {
        document.removeEventListener('mousewheel', throMouseWheel)
      }
    } else {
      document.body.style.overflow = ''
      setScale(1)
    }
  }, [show, scale])
  const handleZoomOut = () => {
    const nextScale = findLast(scales, (s: number) => s / 100 < scale)
    if (nextScale !== undefined) setScale(nextScale / 100)
  }
  const handleZoomIn = () => {
    const nextScale = scales.find((s: number) => s / 100 > scale)
    if (nextScale !== undefined) setScale(nextScale / 100)
  }

  const previewImgProps: Record<string, unknown> = {
    alt,
    src: previewSrc,
    draggable: 'false',
    className: `${prefixCls}-preview-img`,
    style: { transform: `scale3d(${scale}, ${scale}, 1)` },
    onClick: (e: React.MouseEvent) => e.stopPropagation(),
  }

  const peviewContainer = (
    <div className={classNames(`${prefixCls}-preview`, props.className, { show })} style={{ ...props.style }}>
      <div className={`${prefixCls}-preview-mask`} onClick={onClose}></div>
      <Draggable defaultClassName={`${prefixCls}-preview-wrap`} position={{ x: 0, y: 0 }}>
        <div onClick={onClose}>
          <img {...previewImgProps} />
        </div>
      </Draggable>
      <div className={`${prefixCls}-preview-action`}>
        {props.type !== 'upload' && length && (
          <Icon type="arrow-left" className={classNames({ disabled: current <= 0 })} onClick={props.onPrevious} />
        )}
        <Icon type="shrink" className={classNames({ disabled: scale <= minScale })} onClick={handleZoomOut} />
        <Icon type="zoom" className={classNames({ disabled: scale >= maxScale })} onClick={handleZoomIn} />
        {props.type !== 'upload' && operations}
        {props.type !== 'upload' && length && (
          <Icon type="arrow-right" className={classNames({ disabled: current >= length - 1 })} onClick={props.onNext} />
        )}
      </div>
      {props.type === 'upload' && length && (
        <>
          <span className={`${prefixCls}-preview-previous`}>
            <Icon
              type="arrow-left"
              style={{ fontSize: 20 }}
              className={classNames({ disabled: current <= 0 })}
              onClick={props.onPrevious}
            />
          </span>
          <span className={`${prefixCls}-preview-next`}>
            <Icon
              type="arrow-right"
              style={{ fontSize: 20 }}
              className={classNames({ disabled: current >= length - 1 })}
              onClick={props.onNext}
            />
          </span>
        </>
      )}
      {props.type !== 'upload' && (
        <Icon className={`${prefixCls}-preview-close`} type="close-solid" onClick={onClose} />
      )}
      {props.type === 'upload' && (
        <div className={`${prefixCls}-preview-topbar`}>
          <div className={`${prefixCls}-preview-topbar-info`}>
            <span className={`${prefixCls}-preview-topbar-info-name`}>{name}</span>
            <span className={`${prefixCls}-preview-topbar-info-size`}>{size}</span>
          </div>
          <div className={`${prefixCls}-preview-topbar-action`}>
            {operations}
            <span onClick={onClose}>
              <Icon type="close-solid" />
              {imageLangMsg.close}
            </span>
          </div>
        </div>
      )}
    </div>
  )

  return ReactDOM.createPortal(peviewContainer, document.body)
}

export default Preview
