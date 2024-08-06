import * as React from 'react'
import { ImageProps } from './image'
import Preview, { PreviewType } from './preview'

export interface PreviewGroupProps {
  children?: Array<React.ReactElement> | React.ReactElement
  className?: string
  previewType?: PreviewType
  style?: React.CSSProperties
  operations?: Array<React.ReactNode>
  items?: Array<string>
}

const PreviewGroup: React.FC<PreviewGroupProps> = ({ children, className, style, previewType, operations, items }) => {
  const hasItems = Array.isArray(items) && items.length > 0

  const images: Array<ImageProps> = React.useMemo(
    () =>
      hasItems
        ? (items?.map((item: string) => ({ src: item })) as Array<ImageProps>)
        : Array.isArray(children)
        ? (children as Array<React.ReactElement>)
            .filter((image: React.ReactElement) => image.props.src)
            .map((image: React.ReactElement) => image.props)
        : [children !== undefined ? (children as React.ReactElement).props : {}],
    [children, items, hasItems],
  )

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const refs = images.map(() => React.useRef<HTMLImageElement>())
  const [image, setImage] = React.useState<ImageProps>(images[0] || {})
  const [current, setCurrent] = React.useState<number>(0)
  const [exit, setExit] = React.useState(false)
  React.useEffect(() => {
    exit && setVisible(true)
  }, [exit])
  React.useEffect(() => {
    if (images[current]) {
      setImage(images[current])
    }
  }, [current, images])

  const [visible, setVisible] = React.useState(false)
  const [transformOrigin, setTransformOrigin] = React.useState('')

  const calcTransformOrigin = (element: HTMLImageElement | undefined) => {
    const transformOriginX = element && element.getBoundingClientRect().x + element.getBoundingClientRect().width / 2
    const transformOriginY = element && element.getBoundingClientRect().y + element.getBoundingClientRect().height / 2
    setTransformOrigin(`${transformOriginX}px ${transformOriginY}px`)
  }

  const onPreview = (index: number, src: string) => {
    if (hasItems) {
      const curIndex = images.findIndex((item: ImageProps) => item.src === src) || 0
      setCurrent(curIndex)
    } else {
      setCurrent(index)
      calcTransformOrigin(refs[index].current)
    }
    exit ? setVisible(true) : setExit(true)
  }

  const onClose = () => setVisible(false)

  const onNext = () => current < images.length - 1 && setCurrent(current + 1)

  const onPrevious = () => current > 0 && setCurrent(current - 1)

  const { alt, src, previewStyle, previewClassName, previewOperations } = image

  const previewProps = {
    alt,
    src,
    visible,
    current,
    type: previewType,
    length: images.length,
    style: { ...(previewStyle || style), transformOrigin },
    className: previewClassName || className,
    operations: previewOperations || operations,
    onNext,
    onClose,
    onPrevious,
  }

  return (
    <>
      {images.length > 1
        ? React.Children.map(children, (image: React.ReactElement, index: number) =>
            React.cloneElement(image, {
              key: image.key || index,
              preview: false,
              ref: refs[index],
              onClick: image?.props?.preview !== false ? onPreview.bind(null, index, image?.props?.src) : undefined,
            }),
          )
        : children}
      {exit && <Preview {...previewProps} />}
    </>
  )
}

export default PreviewGroup
