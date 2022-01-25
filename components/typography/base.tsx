import React, { FunctionComponentElement, useContext } from 'react'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { getCompProps } from '../_utils'
import Typography, { TypographyProps } from './typography'
import { tuple } from '../_utils/type'
import { omit } from '../_utils/omit'
import devWarning from '../_utils/devwarning'

export const BaseTypes = tuple('second', 'success', 'warning', 'danger', 'assist')
export type BaseType = typeof BaseTypes[number]
// export type BaseType = 'second' | 'success' | 'warning' | 'danger'

export interface BlockProps extends TypographyProps {
  title?: string
  type?: BaseType
  disabled?: boolean
  code?: boolean
  mark?: boolean
  underline?: boolean
  delete?: boolean
  strong?: boolean
  keyboard?: boolean
  italic?: boolean
}

interface InternalBlockProps extends BlockProps {
  component: string
}

function wrapperDecorations(
  { mark, code, underline, delete: del, strong, keyboard, italic }: BlockProps,
  content: React.ReactNode,
) {
  let currentContent = content

  function wrap(needed: boolean | undefined, tag: string) {
    if (!needed) return

    currentContent = React.createElement(tag, {}, currentContent)
  }

  wrap(strong, 'strong')
  wrap(underline, 'u')
  wrap(del, 'del')
  wrap(code, 'code')
  wrap(mark, 'mark')
  wrap(keyboard, 'kbd')
  wrap(italic, 'i')

  return currentContent
}

const InternalBase: React.ForwardRefRenderFunction<unknown, InternalBlockProps> = (
  props: InternalBlockProps,
  ref: unknown,
): FunctionComponentElement<BlockProps> => {
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps } = useContext(ConfigContext)

  const contentRef = (ref as any) || React.createRef<HTMLElement>()

  const typographyProps = getCompProps('Typography', userDefaultProps, props)
  const { prefixCls: customPrefixcls } = typographyProps
  const typographyPrefixCls = getPrefixCls!(prefixCls, 'typography', customPrefixcls) // 排版样式前缀

  const renderContent = () => {
    const { component, children, className, type, disabled, style, ...restProps } = props
    if (type) {
      devWarning(BaseTypes.indexOf(type) === -1, 'typography', `cannot found type '${type}'`)
    }
    const textProps = omit(restProps, [
      'prefixCls',
      'strong',
      'underline',
      'delete',
      'code',
      'mark',
      'keyboard',
      'italic',
    ]) as any
    const typographyClasses = classNames(className, {
      [`${typographyPrefixCls}-${type}`]: type,
      [`${typographyPrefixCls}-disabled`]: disabled,
    })

    let textNode: React.ReactNode = children

    textNode = wrapperDecorations(props, textNode)
    return (
      <Typography component={component} style={style} className={typographyClasses} ref={contentRef} {...textProps}>
        {textNode}
      </Typography>
    )
  }
  return renderContent()
}

const Base = React.forwardRef<unknown, InternalBlockProps>(InternalBase)

export default Base
