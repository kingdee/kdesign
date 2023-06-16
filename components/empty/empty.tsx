import React, { FunctionComponentElement, useContext, useRef } from 'react'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { getCompProps } from '../_utils'
import DefaultEmptyImg from './defaultEmptyImg'
import IllustrationEmptyImg from './illustrationEmptyImg'
export interface IEmptyProps {
  className?: string
  description?: React.ReactNode
  image?: React.ReactNode
  imageStyle?: React.CSSProperties
  children?: React.ReactNode
}

interface IEmptyType extends React.ForwardRefExoticComponent<IEmptyProps & React.RefAttributes<any>> {
  DEFAULT_IMG?: React.ReactNode
  ILLUSTRATION_IMG?: React.ReactNode
}

const defaultEmptyImg = <DefaultEmptyImg />
const illustrationEmptyImg = <IllustrationEmptyImg />

const InteranalEmpty = (props: IEmptyProps, ref: unknown): FunctionComponentElement<any> => {
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps, locale } = useContext(ConfigContext)
  const emptyProps = getCompProps('Empty', userDefaultProps, props)
  const {
    className,
    description,
    image = defaultEmptyImg,
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
    typeof image === 'string' ? (
      <img src={image} className={imgClasses} style={imageStyle} alt="empty" />
    ) : typeof image === 'boolean' ? null : (
      React.cloneElement(image, { style: imageStyle })
    )

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

const Empty: IEmptyType = React.forwardRef<unknown, IEmptyProps>(InteranalEmpty)
Empty.displayName = 'Empty'
Empty.DEFAULT_IMG = defaultEmptyImg
Empty.ILLUSTRATION_IMG = illustrationEmptyImg
export default Empty
