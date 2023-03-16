import React, { FunctionComponentElement, useContext } from 'react'
import { Icon } from '../index'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { getCompProps } from '../_utils'
import { tuple } from '../_utils/type'
import devWarning from '../_utils/devwarning'

export const ButtonTypes = tuple('second', 'primary', 'ghost', 'text')
export type ButtonType = typeof ButtonTypes[number]

export const ButtonSizes = tuple('large', 'middle', 'small')
export type ButtonSize = typeof ButtonSizes[number]

export const ButtonShapes = tuple('circle', 'round', 'none')
export type ButtonShape = typeof ButtonShapes[number]

export const ButtonIconPlaces = tuple('left', 'right')
export type ButtonIconPlace = typeof ButtonIconPlaces[number]

export const ButtonHTMLTypes = tuple('submit', 'button', 'reset')
export type ButtonHTMLType = typeof ButtonHTMLTypes[number]

export interface IButtonProps {
  type?: ButtonType // 按钮类型
  iconPlace?: ButtonIconPlace // 图标位置
  size?: ButtonSize // 尺寸
  shape?: ButtonShape // 按钮形状
  style?: Record<string, unknown> // 内联样式
  className?: string // 样式名
  prefixCls?: string // 样式前缀
  loading?: boolean // loading状态
  ghost?: boolean // 是否幽灵属性
  disabled?: boolean // 是否禁用
  bordered?: boolean // 是否有边框
  block?: boolean // 是否撑满父元素
  icon?: React.ReactNode // 图标
  children?: React.ReactNode // 子元素
  onClick?: React.MouseEventHandler<HTMLElement> // 点击事件
  htmlType?: ButtonHTMLType
}
const InternalButton = (props: IButtonProps, ref: unknown): FunctionComponentElement<IButtonProps> => {
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps } = useContext(ConfigContext)
  const buttonProps = getCompProps('Button', userDefaultProps, props) // 按钮属性需要合并一遍用户定义的默认属性
  const {
    type,
    iconPlace,
    children,
    className,
    prefixCls: customPrefixcls,
    size,
    loading,
    shape,
    bordered,
    onClick,
    icon,
    ghost,
    block,
    disabled,
    htmlType = 'button' as IButtonProps['htmlType'],
    ...others
  } = buttonProps

  devWarning(ButtonTypes.indexOf(type) === -1, 'button', `cannot found button type '${type}'`)

  const btnPrefixCls = getPrefixCls!(prefixCls, 'btn', customPrefixcls) // 按钮样式前缀
  /**
   * 按钮click事件处理
   * @param {React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>} e 事件对象
   */
  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => {
    if (loading || disabled) {
      // 加载中和禁用状态不触发点击事件
      return
    }
    const waveStatus = buttonRef.current.getAttribute('click-animating-wave')
    // 进入时是否在加载动画
    if (waveStatus === 'true') {
      buttonRef.current.setAttribute('click-animating-wave', false)
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      window.getComputedStyle(buttonRef.current).animationPlayState
    }
    // 启动动画
    buttonRef.current.setAttribute('click-animating-wave', true)
    buttonRef.current.addEventListener('animationend', onAnimationEnd)

    onClick && onClick(e)
  }
  const onAnimationEnd = (e: any) => {
    if (e.animationName === 'waveEffect') {
      return
    }
    e.target.setAttribute('click-animating-wave', 'false')
    removeEventListener('animationend', onAnimationEnd)
  }

  // ref
  const buttonRef = (ref as any) || React.createRef<HTMLElement>()
  // 对children进行进一步处理，目前只处理typeof child === 'string'的情况，后续有特殊情况的在此方法处理
  const handleChild = function (child: React.ReactChild) {
    if (typeof child === 'string') {
      return <span>{child}</span> // 包一层span,该层span的dsiplay为inline-block, 用于处理没内容时按钮高度位置跳动问题
    }
    return child
  }
  const isTextBtn = type === 'text' // 判断按钮是否文本类型。这些类型下有部分样式不适用
  const btnClasses = classNames(btnPrefixCls, className, {
    [`${btnPrefixCls}-${type}`]: type, // 类型样式
    [`${btnPrefixCls}-size-${size}`]: size, // 尺寸样式
    [`${btnPrefixCls}-shape-${shape}`]: shape && !isTextBtn, // 圆或椭圆形状样式
    [`${btnPrefixCls}-no-border`]: !bordered, // 无边框样式
    [`${btnPrefixCls}-background-ghost`]: ghost && !disabled, // 幽灵样式
    [`${btnPrefixCls}-loading`]: loading && !isTextBtn, // 加载中样式
    [`${btnPrefixCls}-block`]: block && !shape, // 撑满父级的样式
    [`${btnPrefixCls}-icon-only`]: !children && children !== 0 && icon,
  })
  const iconWrapperClassName = `${btnPrefixCls}-iconWrapper-${iconPlace === 'left' ? 'left' : 'right'}`
  const iconNode =
    icon && !loading ? (
      <span className={iconWrapperClassName}>{icon}</span>
    ) : loading ? (
      <span className={iconWrapperClassName}>
        <Icon
          className={`${btnPrefixCls}-${type === ButtonTypes[1] ? 'primary-loadingIcon' : 'loadingIcon'}`}
          type="loadding"
          spin
        />
      </span>
    ) : null
  const btnChild = handleChild(children)
  switch (type) {
    case 'text':
      return (
        <span ref={buttonRef} className={btnClasses} onClick={handleClick} disabled={disabled} {...others}>
          {iconNode}
          {children}
        </span>
      )
    default:
      return (
        <button
          ref={buttonRef}
          className={btnClasses}
          onClick={handleClick}
          disabled={disabled}
          type={htmlType}
          {...others}
          click-animating-wave="false"
        >
          {iconPlace === 'left' ? (
            <>
              {iconNode}
              {!!(iconNode && children) && <span className="btn-space" />}
              {btnChild}
            </>
          ) : (
            <>
              {btnChild}
              {!!(iconNode && children) && <span className="btn-space" />}
              {iconNode}
            </>
          )}
        </button>
      )
  }
}
const Button = React.forwardRef<unknown, IButtonProps>(InternalButton)
Button.displayName = 'Button'
export default Button
