import * as React from 'react'
import classNames from 'classnames'
import { getCompProps } from '../_utils'
import { ConfigContext } from '../config-provider'
import Preview, { PreviewType } from './preview'
import PreviewGroup from './preview-group'

export interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'placeholder' | 'onClick'> {
  src?: string
  alt?: string
  name?: string
  size?: string
  width?: number
  height?: number
  className?: string
  style?: React.CSSProperties
  prefixCls?: string
  placeholder?: string
  fallback?: string
  preview?: boolean
  previewType?: PreviewType
  previewClassName?: string
  previewStyle?: React.CSSProperties
  operations?: Array<React.ReactNode>
  previewOperations?: Array<React.ReactNode>
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
}

const ImageInternal: React.ForwardRefRenderFunction<unknown, ImageProps> = (props, ref) => {
  const { getPrefixCls, prefixCls: pkgPrefixCls, compDefaultProps: userDefaultProps } = React.useContext(ConfigContext)

  // 属性需要合并一遍用户定义的默认属性
  const allProps = getCompProps('Image', userDefaultProps, props)
  const innerRef = React.useRef<HTMLImageElement>()
  const previewRef = (ref as any) || innerRef

  const {
    id,
    alt,
    name,
    size,
    width,
    height,
    preview,
    fallback,
    operations,
    placeholder = '',
    prefixCls: customPrefixcls,
  } = allProps

  // className前缀
  const prefixCls = getPrefixCls!(pkgPrefixCls, 'image', customPrefixcls)
  const [exit, setExit] = React.useState(false)
  React.useEffect(() => {
    if (exit) setVisible(true)
  }, [exit])

  const [src, setSrc] = React.useState(placeholder)
  const [error, setError] = React.useState(true)
  const [visible, setVisible] = React.useState(false)
  const [transformOrigin, setTransformOrigin] = React.useState('')

  React.useEffect(() => {
    placeholder && setSrc(placeholder)

    const img = new window.Image()
    img.src = props.src as string

    img.onload = () => {
      setError(false)
      setSrc(props.src as string)
    }

    img.onerror = () => {
      setError(true)
      setSrc((fallback || props.src) as string)
    }
  }, [props.src, fallback, placeholder])

  const imgProps: Record<string, unknown> = {
    id,
    src,
    alt,
    style: { height },
    className: `${prefixCls}-img`,
  }

  if (!error) {
    imgProps.onClick = (e: React.MouseEvent<HTMLImageElement>) => {
      preview && (exit ? setVisible(true) : setExit(true))
      props.onClick && props.onClick(e)
    }
  }

  const calcTransformOrigin = (element: HTMLImageElement) => {
    const transformOriginX = element.getBoundingClientRect().x + element.getBoundingClientRect().width / 2
    const transformOriginY = element.getBoundingClientRect().y + element.getBoundingClientRect().height / 2
    setTransformOrigin(`${transformOriginX}px ${transformOriginY}px`)
  }
  React.useEffect(() => {
    previewRef.current && calcTransformOrigin(previewRef.current)
  })

  const onClose = () => setVisible(false)

  const previewProps = {
    alt,
    name,
    size,
    visible,
    src: props.src,
    type: props.previewType,
    style: { ...props.previewStyle, transformOrigin },
    className: props.previewClassName,
    operations: props.previewOperations,
    onClose,
  }

  return (
    <div className={classNames(prefixCls, props.className, { error })} style={{ width, height, ...props.style }}>
      <img {...imgProps} ref={previewRef} />
      {operations?.length > 0 && !error && <div className={`${prefixCls}-action`}>{operations}</div>}
      {preview && exit && <Preview {...previewProps} />}
    </div>
  )
}

interface CompoundedComponent extends React.ForwardRefExoticComponent<ImageProps & React.RefAttributes<HTMLElement>> {
  Preview?: typeof Preview
  PreviewGroup?: typeof PreviewGroup
}

const Image = React.forwardRef<unknown, ImageProps>(ImageInternal)

const ImageOuter = Image as CompoundedComponent

ImageOuter.Preview = Preview

ImageOuter.PreviewGroup = PreviewGroup

ImageOuter.displayName = 'Image'

export default ImageOuter
