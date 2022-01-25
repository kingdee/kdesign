import React, { ReactNode, useCallback, useMemo } from 'react'
import classNames from 'classnames'
import Button from '../button'
import Icon from '../icon'
import Upload from '../upload'
import devWarning from '../_utils/devwarning'

export interface OperationBarProps {
  className?: string
  btnClassName?: string
  customComponents?: Array<React.FC>
  imageMaxSize?: number
  okText?: string
  okBtn?: ReactNode
  getCropper?: any
  showDeaultToolbar?: boolean
  onClick?: () => void
  onRevert?: () => void
  onRotate?: () => void
  onZoom?: (num: number) => void
  onReplace?: (src: string) => void
}

const ImageFileTypes = ['image/jpeg', 'image/jpg', 'image/png']

const OperationBar: React.FC<OperationBarProps> = (props) => {
  const {
    className,
    btnClassName,
    customComponents,
    imageMaxSize = 2,
    okText,
    okBtn,
    showDeaultToolbar = true,
    getCropper,
    onClick,
    onRevert,
    onRotate,
    onZoom,
    onReplace,
  } = props

  const handleBtnClick = () => {
    onClick?.()
  }

  const handleRotate = () => {
    onRotate?.()
  }

  const handleRevert = () => {
    onRevert?.()
  }

  const handleZoom = (value: number) => {
    onZoom?.(value)
  }

  const beforeUpload = useCallback(
    (file) => {
      const isImg = ImageFileTypes.includes(file.type)
      if (!isImg) {
        devWarning(true, 'image-cropper', 'You can only upload JPG/PNG file!')
      }
      const sizeOk = file.size <= 1024 * 1024 * imageMaxSize
      if (!sizeOk) {
        devWarning(true, 'image-cropper', `Please upload a picture smaller than ${imageMaxSize} MB.`)
      }

      if (isImg && sizeOk) {
        const src = URL.createObjectURL(file)
        onReplace?.(src)
      }
      return false
    },
    [onReplace, imageMaxSize],
  )

  const accept = useMemo(() => ImageFileTypes.map((type) => `.${type.replace('image/', '')}`).join(','), [])

  const uploadProps = useMemo(
    () => ({
      accept,
      beforeUpload,
      showUploadList: false,
    }),
    [accept, beforeUpload],
  )
  return (
    <div className={className}>
      {showDeaultToolbar && (
        <div className={classNames(btnClassName)}>
          <Icon type="reduction" onClick={handleRevert} />
          <Upload {...uploadProps}>
            <Icon type="upload" />
          </Upload>
          <Icon type="spin" onClick={handleRotate} />
          <Icon type="reduce" onClick={() => handleZoom(-0.1)} />
          <Icon type="add" onClick={() => handleZoom(0.1)} />
        </div>
      )}
      {/* {customComponents} */}
      {customComponents && customComponents.map((Component, index) => Component(getCropper, index))}
      {okBtn ? (
        <div onClick={handleBtnClick}>{okBtn}</div>
      ) : (
        <Button className={classNames('ok-btn')} type="primary" onClick={handleBtnClick}>
          {okText}
        </Button>
      )}
    </div>
  )
}

export default OperationBar
