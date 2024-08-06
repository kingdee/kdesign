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
    const type = typeMapping[dataUrlType as DataUrlType] || ''
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
        <span className="kd-modal-expand-icon" onClick={() => handleFullScreen('open')}>
          <svg width="1em" height="1em" viewBox="0 0 32 32">
            <g id="977.全屏" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="编组" transform="translate(2.000000, 2.000000)" fill="#000000" fill-rule="nonzero">
                <path
                  d="M1.07692308,17.4339622 C1.67169125,17.4339622 2.15384615,17.9161171 2.15384615,18.5108853 L2.15169231,24.8518084 L8.50424095,18.2911144 C8.91128276,17.8706218 9.58213195,17.8597178 10.0026246,18.2667596 L10.0077312,18.2717362 C10.4291221,18.6851765 10.4378354,19.3612143 10.0272402,19.7853779 L4.12030769,25.8856545 L10.2510885,25.8867924 C10.8346347,25.8867924 11.3076923,26.35985 11.3076923,26.9433963 C11.3076923,27.5269424 10.8346347,28 10.2510885,28 L1.0566038,28 C0.473057639,28 0,27.5269424 0,26.9433963 L0,18.5108853 C0,17.9161171 0.4821549,17.4339622 1.07692308,17.4339622 Z M26.9230769,16.9056604 C27.5178452,16.9056604 28,17.3878153 28,17.9825835 L28,17.9825835 L28,26.4150942 C28,26.9986405 27.5269424,27.4716981 26.9433963,27.4716981 L26.9433963,27.4716981 L17.7489115,27.4716981 C17.1653653,27.4716981 16.6923077,26.9986405 16.6923077,26.4150942 C16.6923077,25.8315482 17.1653653,25.3584905 17.7489115,25.3584905 L17.7489115,25.3584905 L25.8461538,25.3573527 L25.8461538,17.9825835 C25.8461538,17.3878153 26.3283087,16.9056604 26.9230769,16.9056604 Z M26.9433963,0 C27.5269424,0 28,0.473057639 28,1.0566038 L28,9.48911467 C28,10.0838829 27.5178452,10.5660378 26.9230769,10.5660378 C26.3283087,10.5660378 25.8461538,10.0838829 25.8461538,9.48911467 L25.8483077,3.1481916 L19.495759,9.70888562 C19.0887172,10.1293782 18.417868,10.1402822 17.9973754,9.73324042 L17.9922688,9.72826376 C17.5708779,9.31482358 17.5621646,8.63878569 17.9727599,8.21462222 L23.8796923,2.11434544 L17.7489115,2.11320756 C17.1653653,2.11320756 16.6923077,1.64014992 16.6923077,1.0566038 C16.6923077,0.473057639 17.1653653,0 17.7489115,0 L26.9433963,0 Z M10.2510885,0 C10.8346347,0 11.3076923,0.473057639 11.3076923,1.0566038 C11.3076923,1.64014992 10.8346347,2.11320756 10.2510885,2.11320756 L10.2510885,2.11320756 L2.15384615,2.11434544 L2.15384615,9.48911467 C2.15384615,10.0838829 1.67169125,10.5660378 1.07692308,10.5660378 C0.4821549,10.5660378 0,10.0838829 0,9.48911467 L0,9.48911467 L0,1.0566038 C0,0.473057639 0.473057639,0 1.0566038,0 L1.0566038,0 L10.2510885,0 Z"
                  id="形状"
                  fill="#666666"
                ></path>
              </g>
            </g>
          </svg>
        </span>
      ) : (
        <span className="kd-modal-expand-icon" onClick={() => handleFullScreen('close')}>
          <svg width="16px" height="16px" viewBox="0 0 32 32">
            <g id="1226-关闭全屏" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="编组" transform="translate(4.000000, 4.000000)" fill="#000000" fill-rule="nonzero">
                <path
                  d="M15.9569224,17.3691573 L15.9569224,22.6490507 C15.9569224,23.385811 16.0714999,23.9626957 15.336072,23.9626957 C14.6019762,23.9626957 14.6566004,23.385811 14.6566004,22.6490507 L14.6566004,15.9875652 C14.6566004,15.5932053 14.8191407,15.2747863 15.076274,15.0549573 C15.3252286,14.7994658 15.66681,14.6553386 16.0235372,14.6552681 L22.6370601,14.6552681 C23.3711558,14.6552681 23.9520373,14.6073054 23.9520373,15.3427334 C23.9520373,16.0794937 23.3711558,15.9022982 22.6370601,15.9022982 L17.2545798,15.9022982 L15.9569224,17.367825 L15.9569224,17.3691573 Z M8.00977019,17.4064616 L6.7107805,15.9382702 L1.32963251,15.9382702 C0.595536804,15.9382702 0.0146552671,16.116798 0.0146552671,15.3800378 C0.0146552671,14.6446098 0.595536804,14.6939048 1.32963251,14.6939048 L7.94315534,14.6939048 C8.31486623,14.6939048 8.6492728,14.8471189 8.88908626,15.0935939 C9.16260631,15.3252747 9.31724071,15.6678192 9.31009215,16.0262018 L9.31009215,22.6876874 C9.31009215,23.4231154 9.36471634,24 8.63062063,24 C7.89519263,24 8.00977017,23.4231153 8.00977019,22.6863551 L8.00977019,17.4064616 L8.00977019,17.4064616 Z M15.9569224,6.59487065 L17.2559121,8.06172976 L22.6370601,8.06172976 C23.3711558,8.06172976 23.9520373,7.88453425 23.9520373,8.62129455 C23.9520373,9.35539026 23.3711558,9.30742755 22.6370601,9.30742755 L16.0235372,9.30742755 C15.66681,9.30735708 15.3252286,9.16322991 15.076274,8.90773844 C14.8032501,8.675801 14.649122,8.33329396 14.6566004,7.97513047 L14.6566004,1.31364494 C14.6552817,0.578216941 14.6019762,0 15.3347396,0 C16.0701676,0 15.9555901,0.578216941 15.9555901,1.31364494 L15.9555901,6.59487065 L15.9569224,6.59487065 Z M7.9951149,6.59487065 L7.9951149,1.31364494 C7.99378262,0.578216941 7.88053736,0 8.61596536,0 C9.34872876,0 9.29543688,0.578216941 9.29543688,1.31364494 L9.29543688,7.97513047 C9.30291535,8.33329396 9.14878718,8.675801 8.87576331,8.90773844 C8.62648612,9.16356115 8.2843572,9.30771659 7.92716776,9.30742755 L1.31497725,9.30742755 C0.579549251,9.30742755 0,9.35539026 0,8.61996227 C0,7.88453427 0.579549251,8.06172978 1.31497725,8.06172976 L6.69612523,8.06172976 L7.99378262,6.59487065 L7.9951149,6.59487065 Z"
                  id="形状"
                  fill="#666666"
                ></path>
              </g>
            </g>
          </svg>
        </span>
      )}
    </>
  )

  return (
    <>
      <div className={signatureClass} ref={triggerRef} style={style}>
        {dataUrl ? (
          <Image
            className={`${signaturePrefixCls}-image`}
            preview={preview}
            src={dataUrl}
            title="删除"
            operations={!disabled ? [<Icon type="delete" key="delete" onClick={() => handleDelete()} />] : undefined}
          />
        ) : (
          <div className={`${signaturePrefixCls}-empty`} onClick={handleOnClick}>
            <Icon type="edit" />
            <span>{signatureLangMsg?.clickToSign}</span>
          </div>
        )}
      </div>

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
