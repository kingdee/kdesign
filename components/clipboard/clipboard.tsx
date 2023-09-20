import classNames from 'classnames'
import React, { FunctionComponentElement, useCallback, useContext } from 'react'
import { getCompProps } from '../_utils'
import devWarning from '../_utils/devwarning'
import { tuple } from '../_utils/type'
import ConfigContext from '../config-provider/ConfigContext'
import Icon from '../icon'
import { onClipboardCopy, onClipboardCut } from './util'

export const ClipboardActions = tuple('copy', 'cut')
export type ClipboardAction = typeof ClipboardActions[number]

export const ClipboardSizes = tuple('large', 'middle', 'small')
export type ClipboardSize = typeof ClipboardSizes[number]

export interface IClipboardProps {
  action?: ClipboardAction // 动作
  content?: string // 剪贴内容
  children?: React.ReactNode // 子元素
  className?: string // 样式名
  disabled?: boolean // 禁用状态
  icon?: React.ReactNode | false // 自定义图标
  prefixCls?: string // 样式前缀
  size?: ClipboardSize // 尺寸
  style?: Record<string, unknown> // 内联样式
  target?: () => HTMLElement | string // 剪贴目标，DOM、id or class
  onError?: (error: Error) => void // 失败的回调
  onSuccess?: (content: string) => void // 成功的回调
}

const InternalClipboard = (props: IClipboardProps, ref: unknown): FunctionComponentElement<IClipboardProps> => {
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps } = useContext(ConfigContext)
  // 剪贴板参数，合并了系统默认参数、用户定义组件统一参数及组件传参
  const clipboardProps = getCompProps('Clipboard', userDefaultProps, props)
  const {
    className,
    prefixCls: customPrefixcls,
    action,
    content,
    children,
    disabled,
    icon,
    size,
    target,
    onError,
    onSuccess,
    ...others
  } = clipboardProps

  devWarning(ClipboardActions.indexOf(action) === -1, 'clipboard', `cannot found clipboard action '${action}'`)
  devWarning(ClipboardSizes.indexOf(size) === -1, 'clipboard', `cannot found clipboard size '${size}'`)

  // 剪贴板样式前缀
  const clipboardPrefixCls = getPrefixCls!(prefixCls, 'clipboard', customPrefixcls)
  const clipboardClass = classNames(clipboardPrefixCls, className, {
    [`${clipboardPrefixCls}-size-${size}`]: size, // 尺寸样式
    [`${clipboardPrefixCls}-icon-only`]: !children && children !== 0 && icon !== null, // 只有图标
  })

  // ref
  const clipboardRef = (ref as any) || React.createRef<HTMLElement>()

  // 如果没有传 icon，则使用默认图标
  // 如果 icon 传 null，则不使用图标
  const iconNode = icon || (icon === undefined ? <Icon type="copy-code" /> : null)

  // 如果传的 children 为 string，则将 children 包装成块标签
  const childrenNode = typeof children === 'string' ? <span>{children}</span> : children

  /**
   * 剪贴板 click 事件处理
   */
  const handleClick = useCallback(() => {
    if (disabled) {
      // 禁用状态不触发点击事件
      return
    }
    let selectedText
    try {
      if (content) {
        // 如果传了 content，则直接复制 content
        selectedText = onClipboardCopy(content)
      } else {
        const targetElement: HTMLElement = typeof target === 'string' ? document.querySelector(target) : target()
        if (!targetElement) {
          // 没有获取到元素，抛出异常
          throw new Error(`target element '${target}' does not exist`)
        } else {
          if (action === 'copy' && targetElement.hasAttribute('disabled')) {
            // 复制被置为 disabled 的元素，抛出异常
            throw new Error(
              `invalid "target" attribute of element '${targetElement}'. Please use "readonly" instead of "disabled" attribute`,
            )
          }
          if (action === 'cut' && (targetElement.hasAttribute('readonly') || targetElement.hasAttribute('disabled'))) {
            // 剪切被置为 readonly 或 disabled 的元素，抛出异常
            throw new Error(
              `invalid "target" attribute of element '${targetElement}'. You can't cut text from elements with "readonly" or "disabled" attributes`,
            )
          }
        }
        // 对 targetElement 的值进行复制或剪切
        selectedText = action === 'copy' ? onClipboardCopy(targetElement) : onClipboardCut(targetElement)
      }
    } catch (error) {
      // 触发失败的回调
      onError?.(error)
      // 退出处理器
      return
    }
    // 触发成功的回调
    onSuccess?.(selectedText)
  }, [action, content, disabled, onError, onSuccess, target])

  return (
    <div className={clipboardClass} disabled={disabled} onClick={handleClick} ref={clipboardRef} {...others}>
      {iconNode}
      {!!(iconNode && childrenNode) && <span className="clipboard-space" />}
      {childrenNode}
    </div>
  )
}

const Clipboard = React.forwardRef<unknown, IClipboardProps>(InternalClipboard)
Clipboard.displayName = 'Clipboard'
export default Clipboard
