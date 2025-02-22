import React, { useContext } from 'react'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { getCompProps } from '../_utils'

export interface TypographyProps {
  id?: string
  prefixCls?: string
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
  ['aria-label']?: string
}

interface InternalTypographyProps extends TypographyProps {
  component?: string
  // setContentRef?: (node: HTMLElement) => void
}

// remove this line and code Typography component here
const InternalTypography: React.ForwardRefRenderFunction<unknown, InternalTypographyProps> = (
  props: InternalTypographyProps,
  ref: unknown,
) => {
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps, direction } = useContext(ConfigContext)
  const typographyProps = getCompProps('Typography', userDefaultProps, props)
  const {
    prefixCls: customPrefixcls,
    component = 'article',
    className,
    'aria-label': ariaLabel,
    children,
    ...restProps
  } = typographyProps
  const typographyPrefixCls = getPrefixCls!(prefixCls, 'typography', customPrefixcls) // 排版样式前缀
  const rtlCls = direction === 'rtl' ? `${typographyPrefixCls}-rtl` : null
  const typographyClasses = classNames(typographyPrefixCls, rtlCls, className, {
    // [`${typographyPrefixCls}-size-${size}`]: size,
    // [`${typographyPrefixCls}-borderless`]: borderType === 'none',
  })
  const Component = component as any
  return (
    <Component className={typographyClasses} aria-label={ariaLabel} ref={ref} {...restProps}>
      {children}
    </Component>
  )
}

const Typography = React.forwardRef<unknown, InternalTypographyProps>(InternalTypography)
Typography.displayName = 'Typography'
export default Typography
