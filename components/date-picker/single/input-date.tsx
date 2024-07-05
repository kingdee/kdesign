import React, { useRef, useState } from 'react'
import classnames from 'classnames'

import { Icon } from '../../index'
import usePickerInput from '../hooks/use-picker-input'
import { DateType, InputCommonProps, OutInputCommonProps } from '../interface'
import { getInputSize, getPlaceholder, elementsContains } from '../utils'
import { DisabledDataProps } from '../date-picker'

export interface InputDateProps extends OutInputCommonProps, InputCommonProps {
  inputRef: React.RefObject<HTMLInputElement>
  text: string
  dateValue: DateType | null
  selectedValue: DateType | null
  disabled?: boolean
  hoverValue?: string
  placeholder?: string
  disabledDate?: DisabledDataProps
  resetText: () => void
  setSelectedValue: (date: DateType | null) => void
  triggerTextChange: (value: string) => void
  triggerOpen: (open: boolean) => void
  triggerChange: (date: DateType | null) => void
}

function InputDate(props: InputDateProps, ref: React.RefObject<HTMLDivElement>) {
  const {
    inputRef,
    panelDivRef,

    id,
    autoFocus,
    allowClear,
    className,
    borderType,
    disabled,
    hoverValue,
    picker,
    placeholder: propsPlaceholder,
    style,
    size,
    text,
    needConfirmButton,
    dateValue,
    selectedValue,
    suffixIcon,
    clearIcon,

    format,
    open,
    readOnly,
    prefixCls,
    locale,
    dataOrAriaProps,

    disabledDate,
    onFocus,
    onBlur,
    // onChange,
    onMouseDown,
    onMouseUp,
    onMouseEnter,
    onMouseLeave,
    onContextMenu,
    onClick,
    resetText,
    setSelectedValue,
    triggerTextChange,
    triggerOpen,
    triggerChange,
    status,
  } = props

  const preventBlurRef = useRef<boolean>(false)
  const [isMouseEnter, setIsMouseEnter] = useState<boolean>(false)

  const placeholder = getPlaceholder(picker, locale, propsPlaceholder)

  const getSuffixNode = () => {
    if (isMouseEnter && (hoverValue || text) && allowClear && !disabled) {
      return (
        <span
          onMouseUp={(e) => {
            e.stopPropagation()
          }}
          onClick={(e) => {
            e.stopPropagation()
            triggerChange(null)
            triggerOpen(false)
          }}
          className={`${prefixCls}-clear`}
        >
          {clearIcon || <Icon type="close-solid" />}
        </span>
      )
    }

    return (
      <span className={`${prefixCls}-suffix`}>
        {suffixIcon || <Icon type={picker === 'time' ? 'waiting' : 'date'} />}
      </span>
    )
  }

  const mouseEnterHandle: React.MouseEventHandler<HTMLDivElement> = (e) => {
    setIsMouseEnter(true)
    if (typeof onMouseEnter === 'function') {
      onMouseEnter(e)
    }
  }

  const mouseLeaveHandle: React.MouseEventHandler<HTMLDivElement> = (e) => {
    setIsMouseEnter(false)
    if (typeof onMouseLeave === 'function') {
      onMouseLeave(e)
    }
  }

  const onInternalMouseUp: React.MouseEventHandler<HTMLDivElement> = (...args) => {
    if (onMouseUp) {
      onMouseUp(...args)
    }

    if (inputRef.current) {
      inputRef.current.focus()
      triggerOpen(true)
    }
  }

  const onInternalonMouseDown: React.MouseEventHandler<HTMLDivElement> = (...args) => {
    if (onMouseDown) {
      onMouseDown(...args)
    }
    if (open) {
      preventBlurRef.current = true
      requestAnimationFrame(() => {
        preventBlurRef.current = false
      })
    }
  }

  const [inputProps, { focused, typing }] = usePickerInput({
    preventBlurRef,
    blurToCancel: needConfirmButton,
    open: open,
    value: text,
    triggerOpen,
    // forwardKeyDown,
    isClickOutside: (target) => !elementsContains([panelDivRef.current, ref.current], target as HTMLElement),
    onSubmit: () => {
      if (selectedValue && disabledDate && disabledDate(selectedValue)) {
        return false
      }

      triggerChange(selectedValue)
      triggerOpen(false)
      resetText()
      return true
    },
    onCancel: () => {
      triggerOpen(false)
      setSelectedValue(dateValue)
      resetText()
    },
    onFocus,
    onBlur,
  })

  const borderClass = classnames({
    [`${prefixCls}-underline`]: borderType === 'underline',
    [`${prefixCls}-borderless`]: borderType === 'none',
  })

  return (
    <div
      ref={ref}
      className={classnames(prefixCls, className, borderClass, {
        // [`${prefixCls}-${size}`]: size,
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-focused`]: focused,
        [`${prefixCls}-${size}`]: size,
        [`${prefixCls}-error`]: status === 'error',
      })}
      style={style}
      onMouseDown={onInternalonMouseDown}
      onMouseUp={onInternalMouseUp}
      onMouseEnter={mouseEnterHandle}
      onMouseLeave={mouseLeaveHandle}
      onContextMenu={onContextMenu}
      onClick={onClick}
      {...dataOrAriaProps}
    >
      <div
        className={classnames(`${prefixCls}-input`, {
          [`${prefixCls}-input-placeholder`]: !!hoverValue,
        })}
      >
        <input
          // className={classnames({
          //   [`${prefixCls}-input-${size}`]: size,
          // })}
          id={id}
          ref={inputRef}
          // tabIndex={tabIndex}
          disabled={disabled}
          readOnly={readOnly || typeof format === 'function' || !typing}
          value={hoverValue || text}
          onChange={(e) => {
            triggerTextChange(e.target.value)
          }}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={autoFocus}
          placeholder={placeholder}
          title={text}
          {...inputProps}
          size={getInputSize(picker, format)}
        />
        {getSuffixNode()}
      </div>
    </div>
  )
}

export default React.forwardRef(InputDate)
