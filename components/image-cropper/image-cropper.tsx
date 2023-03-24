import React, { ReactNode, useRef, forwardRef, useState, useEffect, FunctionComponentElement } from 'react'
import Modal from '../modal'
import { getCompProps } from '../_utils'
import ConfigContext from '../config-provider/ConfigContext'
import Cropper, { CropperInstance, DragModeType, ViewModeType } from './cropper'
import OperationBar from './operation-bar'
import classNames from 'classnames'

interface customComponentsProps {
  (dom: any, key: number | string): ReactNode
}

type CSSSelector = string

export interface ImageCropperProps {
  containerWidth?: number
  containerHeight?: number
  image?: string
  title?: string
  visible?: boolean
  dragMode?: DragModeType
  viewMode?: ViewModeType
  aspectRatio?: number
  modal?: boolean
  zoomOnWheel?: boolean
  imageMaxSize?: number
  okText?: string
  okBtn?: ReactNode
  getContainer?: HTMLElement | (() => HTMLElement | CSSSelector | null | false) | null | false
  mask?: boolean
  children?: ReactNode
  customComponents?: customComponentsProps
  showDeaultToolbar?: boolean
  cropBoxMovable?: boolean
  autoCropArea?: number
  onClose?: () => void
  onCropSuccess?: (file: File) => void
  onCropFailed?: () => void
}

const InternalImageCropper = (
  props: ImageCropperProps,
  forwardedRef: unknown,
): FunctionComponentElement<ImageCropperProps> => {
  const [cropperSrc, setCropperSrc] = useState(props.image || '')
  const innerRef = useRef<CropperInstance | null>(null)
  const cropperRef = (forwardedRef as any) || innerRef
  const { getPrefixCls, prefixCls: pkgPrefixCls, compDefaultProps: userDefaultProps } = React.useContext(ConfigContext)

  const {
    prefixCls: customPrefixcls,
    containerWidth,
    containerHeight,
    title,
    visible,
    onClose,
    onCropSuccess,
    onCropFailed,
    dragMode,
    viewMode,
    aspectRatio,
    modal,
    okText,
    okBtn,
    image = '',
    zoomOnWheel,
    imageMaxSize,
    cropBoxMovable,
    customComponents,
    showDeaultToolbar,
    autoCropArea,
    ...restProps
  } = getCompProps('ImageCropper', userDefaultProps, props)

  const prefixCls = getPrefixCls!(pkgPrefixCls, 'image-cropper', customPrefixcls)

  const handleOkClick = async () => {
    const imgFile = await cropperRef!.current!.getImage()
    imgFile ? onCropSuccess?.(imgFile) : onCropFailed?.(imgFile)
  }

  const handleRotate = () => {
    cropperRef.current?.rotate()
  }

  const handleRevert = () => {
    cropperRef.current?.reset()
  }

  const handleZoom = (num: number) => {
    cropperRef.current?.zoom(num)
  }

  const handleReplace = (src: string) => {
    setCropperSrc(src)
  }

  useEffect(() => {
    setCropperSrc(image)
  }, [image])

  const CropperNode = (
    <Cropper
      className={`${prefixCls}-container`}
      dragMode={dragMode}
      viewMode={viewMode}
      aspectRatio={aspectRatio}
      modal={modal}
      zoomOnWheel={zoomOnWheel}
      cropBoxMovable={cropBoxMovable}
      imgSrc={cropperSrc}
      autoCropArea={autoCropArea}
      ref={cropperRef}
    />
  )

  const OperationBarNode = (
    <OperationBar
      className={`${prefixCls}-bar-container`}
      btnClassName={`${prefixCls}-btn-container`}
      imageMaxSize={imageMaxSize}
      onClick={handleOkClick}
      onRotate={handleRotate}
      onRevert={handleRevert}
      onZoom={handleZoom}
      onReplace={handleReplace}
      okText={okText}
      okBtn={okBtn}
      customComponents={customComponents}
      getCropper={cropperRef}
      showDeaultToolbar={showDeaultToolbar}
    />
  )

  return (
    <Modal
      className={classNames(`${prefixCls}-modal-container`)}
      bodyClassName={classNames(`${prefixCls}-modal-body-container`)}
      width={containerWidth}
      height={containerHeight}
      body={CropperNode}
      footer={OperationBarNode}
      visible={visible}
      title={title}
      onCancel={onClose}
      {...restProps}
    />
  )
}

const ImageCropper = forwardRef<unknown, ImageCropperProps>(InternalImageCropper)
ImageCropper.displayName = 'ImageCropper'
export default ImageCropper
