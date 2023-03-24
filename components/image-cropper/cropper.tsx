import React, { forwardRef, useEffect, useImperativeHandle, useRef, useMemo } from 'react'
import CropperJS from 'cropperjs'
import { tuple } from '../_utils/type'

export type CropperInstance = {
  getImage: () => Promise<File | null | undefined>
  reset: () => void
  rotate: () => void
  zoom: (num: number) => void
  replace: (src: string) => void
}

// crop 形成新的裁剪框
// move 图片可移动
// none 都不能移动
export const DragModeTypes = tuple('crop', 'move', 'none')
export type DragModeType = typeof DragModeTypes[number]

// 0 无限制
// 1 限制裁剪框不能超出图片的范围
// 2 限制裁剪框不能超出图片的范围 且图片填充模式为 cover 最长边填充
// 3 限制裁剪框不能超出图片的范围 且图片填充模式为 contain 最短边填充
export type ViewModeType = 0 | 1 | 2 | 3

export interface CropperProps {
  className?: string
  imgSrc?: string
  ref?: React.RefObject<CropperInstance | null>
  dragMode?: DragModeType
  viewMode?: ViewModeType
  aspectRatio?: number
  modal?: boolean
  zoomOnWheel?: boolean
  cropBoxMovable?: boolean
  autoCropArea?: number
  onCropSuccess?: () => void
}

const Cropper = forwardRef<CropperInstance | null, CropperProps>((props, forwardedRef) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const cropperRef = useRef<CropperJS | null>(null)

  useImperativeHandle(forwardedRef, () => {
    return {
      getImage,
      reset,
      rotate,
      zoom,
      replace,
      cropper: cropperRef,
    }
  })

  const {
    className,
    imgSrc = '',
    dragMode,
    viewMode,
    aspectRatio,
    autoCropArea,
    modal = true,
    zoomOnWheel = true,
    cropBoxMovable = true,
  } = props

  const options = useMemo(
    () => ({
      aspectRatio: aspectRatio,
      viewMode: viewMode,
      responsive: false,
      restore: false,
      zoomOnWheel: zoomOnWheel,
      dragMode: dragMode,
      cropBoxMovable: cropBoxMovable,
      modal: modal,
      autoCropArea: autoCropArea,
    }),
    [aspectRatio, viewMode, zoomOnWheel, dragMode, cropBoxMovable, modal, autoCropArea],
  )

  useEffect(() => {
    if (!imgRef.current) return
    if (!imgSrc) return
    if (cropperRef.current) {
      cropperRef.current.destroy()
    }

    imgRef.current.onload = () => {
      const img = imgRef.current as HTMLImageElement
      cropperRef.current = new CropperJS(img, options)
    }
    return () => {
      if (cropperRef.current) {
        cropperRef.current.destroy()
      }
    }
  }, [imgSrc, options])

  useEffect(() => {
    return () => {
      if (cropperRef.current) {
        cropperRef.current.destroy()
      }
    }
  }, [])

  const getImage: () => Promise<File | null | undefined> = () => {
    return new Promise((resolve) => {
      if (!cropperRef.current) return resolve(null)
      cropperRef.current!.getCroppedCanvas().toBlob((blob) => {
        if (!blob) return resolve(null)
        resolve(new File([blob!], `${Math.random().toString(36).slice(-8)}.png`, { type: blob!.type }))
      })
    })
  }

  const reset = () => {
    if (!cropperRef.current) return
    cropperRef.current.reset()
  }

  const rotate = () => {
    if (!cropperRef.current) return
    cropperRef.current.rotate(-90)
  }

  const zoom = (num: number) => {
    if (!cropperRef.current) return
    cropperRef.current.zoom(num)
  }

  const replace = (src: string) => {
    if (!cropperRef.current) return
    cropperRef.current.replace(src)
  }

  const imgStyle = {
    display: 'none',
  }
  return (
    <div className={className} ref={containerRef}>
      <img ref={imgRef} style={imgStyle} src={imgSrc} />
    </div>
  )
})

export default Cropper
