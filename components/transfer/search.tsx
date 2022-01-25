import React from 'react'
import Input from '../input'
import Icon from '../icon'

export interface TransferSearchProps {
  prefixCls?: string
  placeholder?: string
  onChange?: (e: React.FormEvent<HTMLElement>) => void
  handleClear?: (e: React.MouseEvent<HTMLElement>) => void
  value?: string
  disabled?: boolean
}

const transferSearch: React.FC<TransferSearchProps> = (props: TransferSearchProps) => {
  const { prefixCls, placeholder, onChange, handleClear, value, disabled } = props

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e)
    }
  }

  const handleClearFn = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (!disabled && handleClear) {
      handleClear(e)
    }
  }

  const prefixIcon = (
    <span className={`${prefixCls}-prefix`}>
      <Icon type="search" />
    </span>
  )
  const suffixIcon =
    value && value.length > 0 ? (
      <span className={`${prefixCls}-suffix`} onClick={handleClearFn}>
        <Icon type="close-solid" />
      </span>
    ) : null

  return (
    <>
      <Input
        borderType="bordered"
        placeholder={placeholder}
        className={prefixCls}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        prefix={prefixIcon}
        suffix={suffixIcon}
      />
    </>
  )
}

transferSearch.defaultProps = {
  placeholder: '',
}

export default transferSearch
