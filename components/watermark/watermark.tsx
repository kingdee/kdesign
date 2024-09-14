import React, {
  CSSProperties,
  FC,
  // FunctionComponentElement,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react'
// import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { getCompProps } from '../_utils'
import useWatermark from './useWatermark'

export interface IWatermarkProps extends PropsWithChildren<unknown> {
  style?: CSSProperties
  className?: string
  zIndex?: string | number
  width?: number
  height?: number
  rotate?: number
  image?: string
  content?: string | string[]
  fontStyle?: {
    color?: string
    fontFamily?: string
    fontSize?: number | string
    fontWeight?: number | string
  }
  gap?: [number, number]
  offset?: [number, number]
  getContainer?: () => HTMLElement
}

const Watermark: FC<IWatermarkProps> = (props) => {
  // prefixCls 是默认提供的类名前缀，默认值是'kd';
  // compDefaultProps存放了所有组件全局化配置的默认值，用户可以通过ConfigProvider这个组件区去做修改；
  // const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps } = useContext(ConfigContext)
  const { compDefaultProps: userDefaultProps } = useContext(ConfigContext)
  // 这里将用户传入的 props 和 Watermark 组件的全局化默认配置 userDefaultProps 做了合并处理，得到最终 Watermark 组件渲染的prop
  const watermarkProps = getCompProps('Watermark', userDefaultProps, props)
  // 解构获取需要的操作的属性值 customPrefixcls最终组件的默认类名前缀，如果用户不通过ConfigProvider全局化配置传入，则默认为‘kd’，否则为用户传入值
  const {
    className,
    // prefixCls: customPrefixcls,
    style,
    zIndex,
    width,
    height,
    rotate,
    image,
    content,
    fontStyle,
    gap,
    offset,
  } = watermarkProps

  // 获取组件的基类样式前缀，此时watermarkPrefixCls的值为 kd-watermark ，后续的Watermark组件的样式名都以此开头，使用中划线连接
  // const watermarkPrefixCls = getPrefixCls!(prefixCls, 'watermark', customPrefixcls)
  // 混合用户传入的类名 与 组件内部定义的样式名（水印组件的设计不需要watermarkClass）
  // const watermarkClass = classNames(watermarkPrefixCls, className)

  const containerRef = useRef<HTMLDivElement>(null)

  const getContainer = useCallback(() => {
    return props.getContainer ? props.getContainer() : containerRef.current!
  }, [containerRef.current, props.getContainer])

  const { generateWatermark } = useWatermark({
    zIndex,
    width,
    height,
    rotate,
    image,
    content,
    fontStyle,
    gap,
    offset,
    getContainer,
  })

  useEffect(() => {
    generateWatermark({
      zIndex,
      width,
      height,
      rotate,
      image,
      content,
      fontStyle,
      gap,
      offset,
      getContainer,
    })
  }, [
    zIndex,
    width,
    height,
    rotate,
    image,
    content,
    JSON.stringify(props.fontStyle),
    JSON.stringify(props.gap),
    JSON.stringify(props.offset),
    getContainer,
  ])

  return props.children ? (
    <div className={className} style={style} ref={containerRef}>
      {props.children}
    </div>
  ) : null
}

Watermark.displayName = 'Watermark'
export default Watermark
