import React, { CSSProperties, ReactNode, FunctionComponentElement, useContext, useState, useCallback } from 'react'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { getCompProps } from '../_utils'
import { Button, Icon } from '../index'
import usePopper, { PopperProps } from '../_utils/usePopper'
import { toArray } from '../_utils/react-children'
import { tuple } from '../_utils/type'
import { ButtonType, ButtonSize } from './button'

export const ButtonGroupTypes = tuple('basic', 'similar')
export type ButtonGroupType = typeof ButtonGroupTypes[number]
export interface OverlayType {
  value?: string
  label?: React.ReactNode
}

export interface ButtonGroupProps extends PopperProps {
  buttonType?: ButtonType
  children?: ReactNode
  className?: string
  disabled?: boolean
  icon?: [ReactNode, ReactNode]
  overlay?: Array<OverlayType>
  size?: ButtonSize
  style?: CSSProperties
  type?: ButtonGroupType
  onClick?: () => void
  onItemClick?: (data: OverlayType) => void
  loading?: boolean
}

const InternalButtonGroup = (
  props: ButtonGroupProps,
  ref: React.LegacyRef<HTMLDivElement> | undefined,
): FunctionComponentElement<ButtonGroupProps> => {
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps } = useContext(ConfigContext)

  const buttonGoupProps = getCompProps('ButtonGroup', userDefaultProps, props)
  const {
    style,
    className,
    children,
    prefixCls: customPrefixcls,
    onClick,
    onItemClick,
    overlay,
    icon,
    type,
    size,
    buttonType,
    disabled,
    onVisibleChange,
    loading,
  } = buttonGoupProps

  const [optionShow, setOptionShow] = useState<boolean>(false) // 下拉列表是否展示

  const refBtnGroup = React.useRef<HTMLDivElement>(null) || ref

  const triggerRef = React.useRef<HTMLDivElement>(null)

  const isBsicType = type === 'basic'

  const btnGroupPrefixCls = getPrefixCls!(prefixCls, 'btn-group', customPrefixcls)
  const btnGroupClasses = classNames(`${btnGroupPrefixCls}`, className, {
    [`${btnGroupPrefixCls}-${type}`]: type,
  })

  const renderTriggerButton = useCallback(() => {
    const [iconUp = <Icon type="arrow-up" />, iconDown = <Icon type="arrow-down" />] = toArray(icon)

    return (
      <div style={style} className={btnGroupClasses} ref={refBtnGroup}>
        {isBsicType && (
          <Button type={buttonType} size={size} disabled={disabled} loading={loading}>
            {children}
            <span className={`${btnGroupPrefixCls}-basic-icon`}>{optionShow ? iconUp : iconDown}</span>
          </Button>
        )}
        {!isBsicType && (
          <Button type={buttonType} size={size} disabled={disabled} onClick={onClick} loading={loading}>
            {children}
          </Button>
        )}
        {!isBsicType && (
          <span className={`${btnGroupPrefixCls}-trigger`} ref={triggerRef}>
            {optionShow ? (
              <Button icon={iconUp} type={buttonType} size={size} disabled={disabled} />
            ) : (
              <Button icon={iconDown} type={buttonType} size={size} disabled={disabled} />
            )}
          </span>
        )}
      </div>
    )
  }, [
    icon,
    btnGroupPrefixCls,
    style,
    btnGroupClasses,
    refBtnGroup,
    isBsicType,
    buttonType,
    disabled,
    children,
    optionShow,
    onClick,
    size,
  ])

  const handleItemClick = useCallback(
    (data: OverlayType) => {
      onItemClick?.(data)
      setOptionShow(false)
    },
    [onItemClick],
  )

  const renderContent = useCallback(
    () => (
      <div className={`${btnGroupPrefixCls}-dropdown`}>
        {(overlay || []).map((item: OverlayType) => {
          return (
            <div
              key={item.value}
              className={`${btnGroupPrefixCls}-dropdown-item`}
              onClick={() => handleItemClick?.(item)}
            >
              {item.label}
            </div>
          )
        })}
      </div>
    ),
    [btnGroupPrefixCls, overlay, handleItemClick],
  )

  const handleVisibleChange = (visible: boolean) => {
    setOptionShow(visible)
    onVisibleChange?.(visible)
  }

  const popperProps = {
    placement: 'bottomLeft',
    trigger: 'click',
    gap: 0,
    ...buttonGoupProps,
    prefixCls: btnGroupPrefixCls,
    defaultVisible: optionShow,
    visible: optionShow,
    onVisibleChange: handleVisibleChange,
    getTriggerElement: (locatorNode: HTMLElement) => (isBsicType ? locatorNode : triggerRef.current),
  }

  return usePopper(renderTriggerButton(), renderContent(), popperProps)
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(InternalButtonGroup)
ButtonGroup.displayName = 'ButtonGroup'
export default ButtonGroup
