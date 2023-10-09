import React, { useRef, useState } from 'react'
import classnames from 'classnames'

import { Icon } from '../../index'
import usePickerInput from '../hooks/use-picker-input'
import { InputCommonProps, OutInputCommonProps, RangeValue } from '../interface'
import { getInputSize, getRangePlaceholder, elementsContains, getValue, updateValues } from '../utils'

export interface InputRangeProps extends OutInputCommonProps, InputCommonProps {
  startInputRef: React.RefObject<HTMLInputElement>
  endInputRef: React.RefObject<HTMLInputElement>
  startInputDivRef: React.RefObject<HTMLDivElement>
  endInputDivRef: React.RefObject<HTMLDivElement>
  separatorRef: React.RefObject<HTMLDivElement>
  activeBarPositionStyle: React.CSSProperties
  activeBarWidth: number
  dateValue: RangeValue
  selectedValue: RangeValue
  mergedDisabled: [boolean, boolean]
  mergedActivePickerIndex: 0 | 1
  startText: string
  endText: string
  startHoverValue?: string
  endHoverValue?: string
  startOpen: boolean
  endOpen: boolean
  separator?: React.ReactNode | string
  placeholder?: [string, string]
  resetStartText: () => void
  resetEndText: () => void
  setSelectedValue: (date: RangeValue) => void
  triggerStartTextChange: (value: string) => void
  triggerEndTextChange: (value: string) => void
  triggerOpen: (value: boolean, index: 0 | 1) => void
  triggerChange: (date: RangeValue, index?: 0 | 1) => void
  setMergedActivePickerIndex: (index: number) => void
  setHoverRangedValue: (value: RangeValue) => void
  triggerOpenAndFocus: (index: 0 | 1) => void
}

function InputDate(props: InputRangeProps, ref: React.RefObject<HTMLDivElement>) {
  const {
    startInputRef,
    endInputRef,
    startInputDivRef,
    endInputDivRef,
    separatorRef,
    panelDivRef,
    activeBarPositionStyle,
    activeBarWidth,

    id,
    autoFocus,
    allowClear,
    className,
    borderType,
    mergedDisabled,
    mergedActivePickerIndex,
    startHoverValue,
    endHoverValue,
    startText,
    endText,
    picker,
    placeholder: propsPlaceholder,
    style,
    size,
    needConfirmButton,
    dateValue,
    selectedValue,
    startOpen,
    endOpen,
    separator,
    suffixIcon,
    clearIcon,

    format,
    open,
    readOnly,
    prefixCls,
    locale,
    dataOrAriaProps,

    onFocus,
    onBlur,
    // onChange,
    onMouseDown,
    onMouseUp,
    onMouseEnter,
    onMouseLeave,
    onContextMenu,
    onClick,
    resetStartText,
    resetEndText,
    setSelectedValue,
    triggerStartTextChange,
    triggerEndTextChange,
    triggerOpen,
    triggerChange,
    triggerOpenAndFocus,
    setMergedActivePickerIndex,
    setHoverRangedValue,
    status,
  } = props

  const preventBlurRef = useRef<boolean>(false)
  const [isMouseEnter, setIsMouseEnter] = useState<boolean>(false)

  const placeholder = getRangePlaceholder(picker, locale, propsPlaceholder)

  const onInternalonClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick(e)
    }
    if (
      !open &&
      !startInputRef!.current!.contains(e.target as Node) &&
      !endInputRef!.current!.contains(e.target as Node)
    ) {
      if (!mergedDisabled[0]) {
        triggerOpenAndFocus(0)
      } else if (!mergedDisabled[1]) {
        triggerOpenAndFocus(1)
      }
    }
  }

  const onInternalonMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onMouseDown) {
      onMouseDown(e)
    }
    if (open) {
      preventBlurRef.current = true
      requestAnimationFrame(() => {
        preventBlurRef.current = false
      })
    }
    if (
      open &&
      (startFocused || endFocused) &&
      !startInputRef!.current!.contains(e.target as Node) &&
      !endInputRef!.current!.contains(e.target as Node)
    ) {
      e.preventDefault()
    }
  }

  const getSuffixNode = () => {
    if (
      isMouseEnter &&
      (startHoverValue || endHoverValue || startText || endText) &&
      allowClear &&
      !mergedDisabled[0] &&
      !mergedDisabled[1]
    ) {
      return (
        <span
          onMouseUp={(e) => {
            e.stopPropagation()
          }}
          onClick={(e) => {
            e.stopPropagation()
            let values = dateValue

            if (!mergedDisabled[0]) {
              values = updateValues(values, null, 0)
            }
            if (!mergedDisabled[1]) {
              values = updateValues(values, null, 1)
            }
            triggerChange(values)
            triggerOpen(false, mergedActivePickerIndex)
            setHoverRangedValue([null, null])
          }}
          className={`${prefixCls}-range-clear`}
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

  const getSharedInputHookProps = (index: 0 | 1, resetText: () => void) => ({
    preventBlurRef,
    blurToCancel: needConfirmButton,
    onBlur,
    isClickOutside: (target: EventTarget | null) =>
      !elementsContains([panelDivRef.current, startInputDivRef.current, endInputDivRef.current], target as HTMLElement),
    onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
      setMergedActivePickerIndex(index)
      if (onFocus) {
        onFocus(e)
      }
    },
    triggerOpen: (newOpen: boolean) => {
      triggerOpen(newOpen, index)
    },
    onSubmit: () => {
      triggerChange(selectedValue, index)
      resetText()
    },
    onCancel: () => {
      triggerOpen(false, index)
      setSelectedValue(dateValue)
      resetText()
    },
  })

  const [startInputProps, { focused: startFocused, typing: startTyping }] = usePickerInput({
    ...getSharedInputHookProps(0, resetStartText),
    open: startOpen,
    value: startText,
  })

  const [endInputProps, { focused: endFocused, typing: endTyping }] = usePickerInput({
    ...getSharedInputHookProps(1, resetEndText),
    open: endOpen,
    value: endText,
  })

  const borderClass = classnames({
    [`${prefixCls}-underline`]: borderType === 'underline',
    [`${prefixCls}-borderless`]: borderType === 'none',
  })

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

  return (
    <div
      ref={ref}
      className={classnames(prefixCls, `${prefixCls}-range`, className, borderClass, {
        [`${prefixCls}-${size}`]: size,
        [`${prefixCls}-disabled`]: mergedDisabled[0] && mergedDisabled[1],
        [`${prefixCls}-focused`]: mergedActivePickerIndex === 0 ? startFocused : endFocused,
        [`${prefixCls}-error`]: status === 'error',
      })}
      style={style}
      onMouseDown={onInternalonMouseDown}
      onMouseUp={onMouseUp}
      onMouseEnter={mouseEnterHandle}
      onMouseLeave={mouseLeaveHandle}
      onContextMenu={onContextMenu}
      onClick={onInternalonClick}
      {...dataOrAriaProps}
    >
      <div
        className={classnames(`${prefixCls}-input`, {
          [`${prefixCls}-input-active`]: mergedActivePickerIndex === 0,
          [`${prefixCls}-input-placeholder`]: !!startHoverValue,
          [`${prefixCls}-input-${size}`]: size,
        })}
        ref={startInputDivRef}
      >
        <input
          id={id}
          ref={startInputRef}
          disabled={mergedDisabled[0]}
          readOnly={readOnly || typeof format === 'function' || !startTyping}
          value={startHoverValue || startText}
          onChange={(e) => {
            triggerStartTextChange(e.target.value)
          }}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={autoFocus}
          placeholder={getValue(placeholder, 0) || ''}
          {...startInputProps}
          size={getInputSize(picker, format)}
        />
      </div>
      <div className={`${prefixCls}-range-separator`} ref={separatorRef}>
        {separator}
      </div>
      <div
        className={classnames(`${prefixCls}-input`, {
          [`${prefixCls}-input-active`]: mergedActivePickerIndex === 1,
          [`${prefixCls}-input-placeholder`]: !!endHoverValue,
          [`${prefixCls}-input-${size}`]: size,
        })}
        ref={endInputDivRef}
      >
        <input
          ref={endInputRef}
          disabled={mergedDisabled[1]}
          readOnly={readOnly || typeof format === 'function' || !endTyping}
          value={endHoverValue || endText}
          onChange={(e) => {
            triggerEndTextChange(e.target.value)
          }}
          placeholder={getValue(placeholder, 1) || ''}
          {...endInputProps}
          size={getInputSize(picker, format)}
        />
      </div>
      <div
        className={`${prefixCls}-active-bar`}
        style={{
          ...activeBarPositionStyle,
          width: activeBarWidth,
          position: 'absolute',
        }}
      />
      {getSuffixNode()}
    </div>
  )
}

export default React.forwardRef(InputDate)
