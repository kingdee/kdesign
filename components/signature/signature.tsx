import React, { FunctionComponentElement, useContext, useState, useRef, useEffect, RefObject } from 'react'
import classNames from 'classnames'
import SignaturePad from './utils/signature_pad'
import Modal from '../modal'
import Icon from '../icon'
import Image from '../image'
import Button from '../button'
import DrawingBoard from './drawingBoard'
import ConfigContext from '../config-provider/ConfigContext'
import { getCompProps } from '../_utils'
import { useResizeObserver } from '../_utils/hooks'
import { tuple } from '../_utils/type'
import { FullScreen, CloseFullscreen } from '@kdcloudjs/kdesign-icons'

export const DataUrlTypes = tuple('png', 'jpeg', 'svg')
export type DataUrlType = typeof DataUrlTypes[number]
type CSSSelector = string
const typeMapping = {
  png: 'image/png',
  jpeg: 'image/jpeg',
  svg: 'image/svg+xml',
}
export interface ISignatureProps {
  dataUrlType?: DataUrlType
  style?: Record<string, unknown> // 内联样式
  className?: string // 样式名
  prefixCls?: string // 样式前缀
  disabled?: boolean // 是否禁用
  containerWidth?: number
  containerHeight?: number
  penColor?: string
  backgroundColor?: string
  children?: React.ReactNode
  title?: React.ReactNode
  preview?: boolean
  canFullScreen?: boolean
  getContainer?: HTMLElement | (() => HTMLElement | CSSSelector | null | false) | null | false
  undo?: () => void
  redo?: () => void
  onClear?: () => void
  onStart?: () => void
  onEnd?: () => void
  getSignatureData?: (dataUrl: string) => void
  onClose?: () => void
}

const Signature = (props: ISignatureProps): FunctionComponentElement<ISignatureProps> => {
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps, locale } = useContext(ConfigContext)
  const signatureProps = getCompProps('Signature', userDefaultProps, props)
  const signatureLangMsg = locale.getCompLangMsg({ componentName: 'Signature' })
  const {
    className,
    style,
    prefixCls: customPrefixcls,
    containerWidth,
    containerHeight,
    getSignatureData,
    onStart,
    onEnd,
    onClear,
    undo,
    redo,
    penColor,
    backgroundColor,
    dataUrlType = 'png',
    title,
    onClose,
    disabled,
    preview,
    canFullScreen,
    ...restProps
  } = signatureProps
  const signaturePrefixCls = getPrefixCls!(prefixCls, 'signature', customPrefixcls)
  const signatureClass = classNames(signaturePrefixCls, className, {
    [`${signaturePrefixCls}-disabled`]: disabled,
  })

  const [modalVisible, setModalVisible] = useState(false)
  const [dataUrl, setDataUrl] = useState<string>('')
  const [isEmpty, setIsEmpty] = useState<boolean>(true)
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false)
  const modalRef = useRef()
  const modalBodyRef = useRef() as any
  const triggerRef = useRef() as RefObject<HTMLDivElement>
  const signaturePadRef = useRef<SignaturePad | null>()

  const handleOnClick = () => {
    if (disabled) return
    setModalVisible(true)
  }

  const setJpegBgColor = () => {
    const canvas = modalBodyRef.current.getCanvasRef()
    const ctx = canvas.getContext('2d')
    ctx.globalCompositeOperation = 'destination-over'
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  const handleModalOk = () => {
    let type = typeMapping[dataUrlType as DataUrlType] || ''
    if (type === 'image/jpeg') setJpegBgColor()
    const result = signaturePadRef.current?.toDataURL(type)
    result && setDataUrl(result)
    getSignatureData && getSignatureData(result)
    signaturePadRef.current?.clear()
    setModalVisible(false)
  }
  const handleDelete = () => {
    if (disabled) return
    setDataUrl('')
  }
  const handleModalCancel = () => {
    onClose && onClose()
    setModalVisible(false)
  }
  const handleFullScreen = (type: string) => {
    setIsFullScreen(true)
    type === 'open' ? setIsFullScreen(true) : setIsFullScreen(false)
  }
  useResizeObserver(modalRef.current!, (rect) => {
    const { width, height } = rect
    const canvas = modalBodyRef.current.getCanvasRef()
    canvas.width = width - 40
    canvas.height = height - 142
  })

  useEffect(() => {
    if (modalBodyRef.current) {
      const canvas = modalBodyRef.current.getCanvasRef()

      signaturePadRef.current = new SignaturePad(canvas as HTMLCanvasElement, {
        penColor: penColor,
      })
      signaturePadRef.current!.addEventListener('beginStroke', () => {
        setIsEmpty(false)
        onStart && onStart()
      })
      signaturePadRef.current!.addEventListener('endStroke', () => {
        modalBodyRef.current.saveSignatureToHistory()
        onEnd && onEnd()
      })
    }
    return () => {
      if (signaturePadRef.current) {
        signaturePadRef.current.off()
      }
    }
  }, [])
  useEffect(() => {
    if (modalVisible) {
      signaturePadRef.current?.on()
      modalBodyRef.current.saveSignatureToHistory()
    } else {
      signaturePadRef.current?.off()
      modalBodyRef.current.setSignatureHistory([])
      modalBodyRef.current.setCurrentHistoryIndex(-1)
    }
  }, [modalVisible])

  useEffect(() => {
    signaturePadRef.current && (signaturePadRef.current.penColor = penColor)
  }, [penColor])

  const DrawingBoardProps = {
    prefixCls: signaturePrefixCls,
    signatureLangMsg,
    undo,
    redo,
    isEmpty,
    onClear,
    setDataUrl,
    setIsEmpty,
    signaturePad: () => signaturePadRef.current,
  }

  const modalClasses = classNames({
    [`${signaturePrefixCls}-modal`]: true,
    [`${signaturePrefixCls}-modal-fullscreen`]: isFullScreen,
  })

  const footer = (
    <div className={`${signaturePrefixCls}-modal-footer`}>
      <Button onClick={handleModalCancel}>{signatureLangMsg?.cancelText}</Button>
      <Button type="primary" onClick={handleModalOk} disabled={isEmpty}>
        {signatureLangMsg?.okText}
      </Button>
    </div>
  )
  const titleIcon = (
    <>
      {!isFullScreen ? (
        <FullScreen fill="#666666" className="kd-modal-expand-icon" onClick={() => handleFullScreen('open')} />
      ) : (
        <CloseFullscreen fill="#666666" className="kd-modal-expand-icon" onClick={() => handleFullScreen('close')} />
      )}
    </>
  )

  return (
    <>
      {dataUrl ? (
        <Image
          preview={preview}
          src={dataUrl}
          title="删除"
          operations={!disabled ? [<Icon type="delete" key="delete" onClick={() => handleDelete()} />] : undefined}
        />
      ) : (
        <div className={signatureClass} ref={triggerRef} onClick={handleOnClick} style={style}>
          <Icon type="edit" />
          <span>{signatureLangMsg?.clickToSign}</span>
        </div>
      )}
      <Modal
        width={containerWidth}
        height={containerHeight}
        ref={modalRef}
        className={modalClasses}
        visible={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        resizable
        title={title || signatureLangMsg?.handwrittenSignature}
        titleIcon={canFullScreen && titleIcon}
        body={<DrawingBoard {...DrawingBoardProps} ref={modalBodyRef} />}
        footer={footer}
        {...restProps}
      />
    </>
  )
}

Signature.displayName = 'Signature'
export default Signature
