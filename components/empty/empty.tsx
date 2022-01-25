import React, { FunctionComponentElement, useContext, useRef } from 'react'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { getCompProps } from '../_utils'
import defaultEmptyImg from './img/transfer-empty.png'

export interface IEmptyProps {
  className?: string
  description?: React.ReactNode
  image?: React.ReactNode
  imageStyle?: React.CSSProperties
  children?: React.ReactNode
}

const InteranalEmpty = (props: IEmptyProps, ref: unknown): FunctionComponentElement<any> => {
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps, locale } = useContext(ConfigContext)
  const emptyProps = getCompProps('Empty', userDefaultProps, props)
  const {
    className,
    description,
    image,
    imageStyle,
    style,
    prefixCls: customPrefixcls,
    children,
    ...others
  } = emptyProps

  const emptyPrefixCls = getPrefixCls!(prefixCls, 'empty', customPrefixcls)

  const emptyLangMsg = locale.getCompLangMsg({ componentName: 'Empty' })

  // ref
  const thisEmptyRef = useRef<HTMLElement>()
  const emptyRef = (ref as any) || thisEmptyRef

  const imgClasses = classNames(`${emptyPrefixCls}-image`)
  const imgNode =
    image === undefined ? (
      <img src={defaultEmptyImg} className={imgClasses} style={imageStyle} alt="empty" />
    ) : image ? (
      <img src={image} className={imgClasses} style={imageStyle} alt="empty" />
    ) : null

  const descriptionNode =
    description === undefined ? (
      <div className={`${emptyPrefixCls}-description`}>{emptyLangMsg.emptyText}</div>
    ) : description ? (
      <div className={`${emptyPrefixCls}-description`}>{description}</div>
    ) : null

  const emptyFooter = children ? <div className={`${emptyPrefixCls}-footer`}>{children}</div> : null

  const emptyClasses = classNames(emptyPrefixCls, className)

  return (
    <div ref={emptyRef} className={emptyClasses} style={style} {...others}>
      {imgNode}
      {descriptionNode}
      {emptyFooter}
    </div>
  )
}

const Empty = React.forwardRef<unknown, IEmptyProps>(InteranalEmpty)
Empty.displayName = 'Empty'
export default Empty
