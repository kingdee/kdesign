import React, { FunctionComponentElement, useContext } from 'react'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { tuple } from '../_utils/type'
import { getCompProps } from '../_utils'
import devWarning from '../_utils/devwarning'
import { Icon } from '../index'

export const AvatarSizes = tuple('large', 'middle', 'small', 'extra-small')
export type AvatarSize = typeof AvatarSizes[number]

export const AvatarShapes = tuple('circle', 'square')
export type AvatarShape = typeof AvatarShapes[number]

export interface AvatarProps {
  shape?: AvatarShape
  size?: AvatarSize | number
  gap?: number
  src?: React.ReactNode
  srcSet?: string
  draggable?: boolean
  icon?: React.ReactNode
  style?: React.CSSProperties
  prefixCls?: string
  className?: string
  children?: React.ReactNode
  alt?: string
  disabled?: boolean
  onError?: () => boolean
}

const InternalAvatar = (props: AvatarProps, ref: unknown): FunctionComponentElement<any> => {
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps } = useContext(ConfigContext)
  const avatarProps = getCompProps('Avatar', userDefaultProps, props)

  const {
    className,
    style,
    prefixCls: customPrefixcls,
    shape,
    size,
    icon,
    src,
    draggable,
    alt,
    children,
    gap,
    disabled,
    srcSet,
  } = avatarProps

  devWarning(
    AvatarSizes.indexOf(size) === -1 && typeof size !== 'number',
    'avatar',
    `cannot found avatar type '${size}'`,
  )

  devWarning(AvatarShapes.indexOf(shape) === -1, 'avatar', `cannot found avatar shape '${shape}'`)

  const [isImgExist, setIsImgExist] = React.useState(true)
  const [scale, setScale] = React.useState(1)
  const [mounted, setMounted] = React.useState(false)

  // ref
  const avatarRef = (ref as any) || React.createRef<HTMLElement>()
  const avatarChildrenRef = React.useRef<HTMLElement>()

  // class
  const avatarPrefixCls = getPrefixCls!(prefixCls, 'avatar', customPrefixcls)
  const sizeClasses = classNames({
    [`${avatarPrefixCls}-lg`]: size === 'large',
    [`${avatarPrefixCls}-md`]: size === 'middle',
    [`${avatarPrefixCls}-sm`]: size === 'small',
    [`${avatarPrefixCls}-xs`]: size === 'extra-small',
  })

  const hasImageElement = React.isValidElement(src)

  const isShowDefaultIcon = !src && !icon && !children

  const avatarClasses = classNames(
    avatarPrefixCls,
    sizeClasses,
    {
      [`${avatarPrefixCls}-${shape}`]: !!shape,
      [`${avatarPrefixCls}-image`]: hasImageElement || (src && isImgExist),
      [`${avatarPrefixCls}-icon`]: !!icon || isShowDefaultIcon,
      [`${avatarPrefixCls}-disabled`]: disabled,
    },
    className,
  )

  const sizeStyle: React.CSSProperties =
    typeof size === 'number'
      ? {
          width: size,
          height: size,
          lineHeight: `${size}px`,
          fontSize: icon ? size / 2 : 18,
        }
      : {}

  React.useEffect(() => {
    setIsImgExist(true)
    setScale(1)
  }, [src])

  React.useEffect(() => {
    setScaleParam()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gap])

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleImgLoadError = () => {
    const { onError } = props
    const errorFlag = onError ? onError() : undefined
    if (errorFlag !== false) {
      setIsImgExist(false)
    }
  }

  const setScaleParam = () => {
    if (!avatarChildrenRef.current || !avatarRef.current) {
      return
    }
    const childrenWidth = avatarChildrenRef.current.offsetWidth
    const nodeWidth = avatarRef.current.offsetWidth
    if (childrenWidth !== 0 && nodeWidth !== 0) {
      if (gap * 2 < nodeWidth) {
        setScale(nodeWidth - gap * 2 < childrenWidth ? (nodeWidth - gap * 2) / childrenWidth : 1)
      }
    }
  }

  let childrenToRender
  if (typeof src === 'string' && isImgExist) {
    childrenToRender = <img src={src} srcSet={srcSet} draggable={draggable} onError={handleImgLoadError} alt={alt} />
  } else if (hasImageElement) {
    childrenToRender = src
  } else if (icon) {
    childrenToRender = icon
  } else if (!children) {
    childrenToRender = <Icon type="avatar-solid" />
  } else if (mounted || scale !== 1) {
    const childrenStyle: React.CSSProperties = {
      transform: `scale(${scale}) translateX(-50%)`,
    }
    const sizeChildrenStyle: React.CSSProperties =
      typeof size === 'number'
        ? {
            lineHeight: `${size}px`,
          }
        : {}

    childrenToRender = (
      <span
        className={`${avatarPrefixCls}-string`}
        ref={(node: HTMLElement) => {
          avatarChildrenRef.current = node
        }}
        style={{ ...sizeChildrenStyle, ...childrenStyle }}
      >
        {children}
      </span>
    )
  } else {
    childrenToRender = (
      <span
        className={`${avatarPrefixCls}-string`}
        style={{ opacity: 0 }}
        ref={(node: HTMLElement) => {
          avatarChildrenRef.current = node
        }}
      >
        {children}
      </span>
    )
  }

  return (
    <span ref={avatarRef} className={avatarClasses} style={{ ...sizeStyle, ...style }}>
      {childrenToRender}
    </span>
  )
}

const Avatar = React.forwardRef<unknown, AvatarProps>(InternalAvatar)
Avatar.displayName = 'Avatar'
export default Avatar
