import * as React from 'react'
export type RadioGroupOptionType = 'default' | 'button'
export type SizeType = 'large' | 'middle' | 'small'
export type RadioType = 'default' | 'square'
export type RadioValueType = string | number

export interface IRadioProps {
  prefixCls?: string
  className?: string
  defaultChecked?: boolean
  checked?: boolean
  style?: React.CSSProperties
  disabled?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClick?: React.MouseEventHandler<HTMLElement>
  value?: any
  name?: string
  children?: React.ReactNode
  radioType?: RadioType
}

export interface IRadioOptionType {
  label: React.ReactNode
  value: RadioValueType
  style?: React.CSSProperties
  disabled?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface IRadioGroupProps {
  prefixCls?: string
  defaultValue?: any
  value?: any
  className?: string
  style?: React.CSSProperties
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  size?: SizeType
  name?: string
  children?: React.ReactNode
  id?: string
  disabled?: boolean
  options?: Array<IRadioOptionType | string>
  optionType?: RadioGroupOptionType
}

export interface IRadioGroupContextProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: any
  disabled?: boolean
  name?: string
}
