import React, { useMemo, useCallback, useState, useRef, useEffect, useImperativeHandle } from 'react'
import classNames from 'classnames'
import { tuple } from '../_utils/type'
import { getCompProps } from '../_utils'
import { ConfigContext } from '../config-provider'
import usePopper, { PopperProps } from '../_utils/usePopper'
import Input from '../input'
import Icon from '../icon'
import Empty from '../empty'
import Checkbox from '../checkbox'
import Tag from '../tag'
import { flattenAll, useChecked, getHalfChecked, getChecked, getMultipleCheckValue, getAllCheckedKeys } from './util'

export interface CascaderOptionType {
  value?: string
  label?: React.ReactNode
  disabled?: boolean
  isLeaf?: boolean
  loading?: boolean
  children?: Array<CascaderOptionType>
  [key: string]: any
}

type FieldNames = {
  label: string
  value: string
  children: string
}

export type KeysDataType = {
  [key: string]: CascaderOptionType
}

export const CascaderPlacement = tuple('topLeft', 'topRight', 'bottomLeft', 'bottomRight')

export type CascaderPlacementType = typeof CascaderPlacement[number]

export type CascaderValueType = (string | string[])[]

export type CascaderExpandTrigger = 'click' | 'hover'

export interface CascaderProps extends PopperProps {
  id?: string
  name?: string
  className?: string
  prefixCls?: string
  bordered?: boolean
  disabled?: boolean
  autoFocus?: boolean
  allowClear?: boolean
  placeholder?: string
  popupVisible?: boolean
  popperVisible?: boolean
  fieldNames?: FieldNames
  popupClassName?: string
  popperClassName?: string
  changeOnSelect?: boolean
  notFoundContent?: string
  value?: CascaderValueType
  maxTagCount?: number
  maxTagPlaceholder?: React.ReactNode | ((omittedValues: number) => string)
  children?: React.ReactNode
  mode?: 'single' | 'multiple'
  style?: React.CSSProperties
  suffixIcon?: React.ReactNode
  expandIcon?: React.ReactNode
  defaultPopupVisible?: boolean
  defaultValue?: CascaderValueType
  popupPlacement?: CascaderPlacementType
  popperPlacement?: CascaderPlacementType
  options?: Array<CascaderOptionType>
  expandTrigger?: CascaderExpandTrigger
  onPopupVisibleChange?: (visible: boolean) => void
  onPopperVisibleChange?: (visible: boolean) => void
  loadData?: (selectedOptions: CascaderOptionType[]) => void
  dropdownRender?: (menus: React.ReactNode) => React.ReactNode
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement
  onChange?: (value: CascaderValueType, currentOptions?: CascaderOptionType[]) => void
  displayRender?: (label: string[], currentOptions?: CascaderOptionType[]) => React.ReactNode
}

const Cascader = React.forwardRef<unknown, CascaderProps>((props, ref) => {
  const { getPrefixCls, prefixCls: pkgPrefixCls, compDefaultProps: userDefaultProps } = React.useContext(ConfigContext)

  // 属性需要合并一遍用户定义的默认属性
  const allProps = getCompProps('Cascader', userDefaultProps, props)

  const {
    mode,
    style,
    options,
    bordered,
    disabled,
    children,
    loadData,
    clearIcon,
    className,
    fieldNames,
    placeholder,
    defaultValue,
    maxTagPlaceholder,
    displayRender,
    expandTrigger,
    changeOnSelect,
    dropdownRender,
    notFoundContent,
    getPopupContainer,
    defaultPopupVisible,
    onPopupVisibleChange,
    onPopperVisibleChange,
    prefixCls: customPrefixcls,
    allowClear: customAllowClear,
    popupPlacement,
    maxTagCount,
    autoFocus,
    ...otherProps
  } = allProps

  // className前缀
  const prefixCls = getPrefixCls!(pkgPrefixCls, 'cascader', customPrefixcls)

  const mergeRef = useRef<HTMLSpanElement>()
  const inputRef = useRef<HTMLSpanElement>()
  const wrapperRef = useRef<HTMLDivElement>()

  const [visible, setVisible] = useState(!!props.popperVisible || !!props.popupVisible || defaultPopupVisible)
  React.useEffect(() => {
    setVisible(!!props.popperVisible || !!props.popupVisible)
  }, [props.popperVisible, props.popupVisible])

  const [menus, setMenus] = useState<CascaderOptionType[][]>([options])
  const [currentOptions, setCurrentOptions] = useState<CascaderOptionType[]>([])
  const [selectedOptions, setSelectedOptions] = useState<CascaderOptionType[]>([])
  const [value, setValue] = useState<CascaderValueType>(props.value || defaultValue || [])
  React.useEffect(() => {
    props.value && setValue(props.value)
  }, [props.value])

  const isMultiple = useMemo(() => mode === 'multiple', [mode])

  const { flattenData, keysData } = useMemo(() => flattenAll(options, []), [options])

  const [checkedKeys, halfCheckedKeys] = useChecked(value, flattenData, keysData, isMultiple)

  React.useEffect(() => {
    if (!isMultiple && value && options?.length > 0) {
      const currentOptions: CascaderOptionType[] = []
      const menus = [options]
      const scanOptions = (options: Array<CascaderOptionType>) => {
        options.forEach((option: CascaderOptionType) => {
          if (value.includes(String(option[fieldNames.value]))) {
            currentOptions.push(option)
            if (option[fieldNames.children]?.length) {
              menus.push(option[fieldNames.children])
              scanOptions(option[fieldNames.children])
            }
          }
        })
      }
      scanOptions(options)

      setMenus(menus)
      setCurrentOptions(currentOptions)
    }
  }, [options, value, selectedOptions, fieldNames, isMultiple])

  React.useEffect(() => {
    if (isMultiple && value && options?.length > 0) {
      const currentOptions: CascaderOptionType[] = []
      const lastselectedOptions = value[value?.length - 1] || []
      const menus = [options]
      const scanOptions = (options: Array<CascaderOptionType>) => {
        options.forEach((option: CascaderOptionType) => {
          if (lastselectedOptions.includes(String(option[fieldNames.value]))) {
            currentOptions.push(option)
            if (option[fieldNames.children]?.length) {
              menus.push(option[fieldNames.children])
              scanOptions(option[fieldNames.children])
            }
          }
        })
      }
      scanOptions(options)
      const newMultipleOptions = value?.map((item) => {
        return Array.isArray(item) ? item.map((key: string) => keysData[key]) : []
      })

      setMenus(menus)
      setCurrentOptions(newMultipleOptions)
    }
  }, [options, value, fieldNames, isMultiple])

  const handleFocus = () => {
    if (!disabled) {
      if (isMultiple) {
        mergeRef.current?.focus()
      } else {
        inputRef.current?.focus()
      }
    }
  }

  const handleBlur = () => {
    if (!disabled) {
      if (isMultiple) {
        mergeRef.current?.blur()
      } else {
        inputRef.current?.blur()
      }
    }
  }

  useImperativeHandle(ref, () => {
    return {
      focus: handleFocus,
      blur: handleBlur,
      dom: mergeRef.current,
    }
  })

  useEffect(() => {
    if (autoFocus) {
      handleFocus()
    }
  }, [autoFocus, inputRef])

  const handleMouseUp = (e: MouseEvent) => {
    const cln = (e?.target as Element)?.className
    const isCloseBtn = cln.indexOf('kd-tag-close-icon') > -1 || cln.indexOf('kdicon') > -1
    if (isCloseBtn) {
      e.stopPropagation()
    }
  }

  React.useEffect(() => {
    wrapperRef.current?.addEventListener('mouseup', handleMouseUp)

    return () => {
      wrapperRef.current?.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  const labels = useMemo(() => {
    return !isMultiple
      ? currentOptions.map(({ [fieldNames.label]: label }: CascaderOptionType) => label as string)
      : currentOptions.map((option) =>
          option.map(({ [fieldNames.label]: label }: CascaderOptionType) => label as string),
        )
  }, [currentOptions, fieldNames.label, isMultiple])

  const values = useMemo(() => {
    return !isMultiple
      ? currentOptions.map(({ value }: CascaderOptionType) => value as string)
      : currentOptions.map((option) => option.map(({ value }: CascaderOptionType) => value as string))
  }, [currentOptions, isMultiple])

  const allowClear = customAllowClear && value.length > 0 && !disabled

  const handleClear = () => {
    handleBlur()
    setVisible(false)
    onChange([])
  }

  const renderSuffix = () => {
    const { suffixIcon } = allProps
    // 选择器下拉icon样式
    const arrowIconCls = classNames({
      [`${prefixCls}-icon-arrow`]: true,
      [`${prefixCls}-icon-arrow-up`]: visible,
      [`${prefixCls}-icon-arrow-down`]: !visible,
      [`${prefixCls}-icon-arrow-focus`]: visible,
    })

    const iconShow = allowClear && !disabled && currentOptions.length > 0
    const clearIconCls = classNames({
      [`${prefixCls}-icon-clear`]: true,
    })
    return (
      <>
        {iconShow && (
          <span onClick={handleClear} className={clearIconCls}>
            {<Icon type="close-solid" /> || clearIcon}
          </span>
        )}
        <span className={arrowIconCls}>{suffixIcon || <Icon type="arrow-down" />}</span>
      </>
    )
  }

  const handleMaxTagHolder = useCallback(() => {
    if (typeof maxTagPlaceholder === 'function') {
      return (
        <Tag type="edit" disabled={disabled}>
          {maxTagPlaceholder(currentOptions)}
        </Tag>
      )
    } else {
      return (
        <Tag type="edit" disabled={disabled}>
          {maxTagPlaceholder}
        </Tag>
      )
    }
  }, [disabled, maxTagPlaceholder, currentOptions])

  const handleRemove = (e: any, opt: any) => {
    e.stopPropagation()
    onMultipleChecked([...opt].pop(), false)
  }

  const renderMultiple = () => {
    const multipleCls = classNames({
      [`${prefixCls}-expand`]: visible,
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-multiple`]: true,
      [`${prefixCls}-bordered`]: bordered,
    })

    const itemCls = classNames({
      [`${prefixCls}-selection-item`]: true,
      [`${prefixCls}-tag-describe`]: true,
    })
    const TagStyle = { margin: '2px 8px 2px 0', maxWidth: '100%' }
    return (
      <div className={multipleCls} ref={mergeRef as any} style={style} {...otherProps} tabIndex={-1}>
        <div className={`${prefixCls}-multiple-wrapper`} ref={wrapperRef as any}>
          {Array.isArray(currentOptions) && (
            <>
              {currentOptions.map((option: CascaderOptionType[], index: number) => {
                return (
                  <span key={JSON.stringify(values[index])} className={classNames(`${prefixCls}-selection-tag`)}>
                    {(!maxTagCount || index <= maxTagCount - 1) && (
                      <Tag
                        type="edit"
                        disabled={disabled}
                        style={TagStyle}
                        closable
                        onClose={(e) => handleRemove(e, option)}
                      >
                        {displayRender(labels[index], option)}
                      </Tag>
                    )}
                  </span>
                )
              })}
              {maxTagCount && currentOptions.length > maxTagCount ? (
                maxTagPlaceholder ? (
                  handleMaxTagHolder()
                ) : (
                  <span className={itemCls}>
                    <span className={`${prefixCls}-tag-describe-content`}>共{currentOptions.length}项</span>
                  </span>
                )
              ) : null}
            </>
          )}
          <span className={`${prefixCls}-placeholder`}>{!currentOptions.length && placeholder}</span>
          <span className={`${prefixCls}-suffix`}>{renderSuffix()}</span>
        </div>
      </div>
    )
  }

  const renderSingle = () => {
    const inputProps: Record<string, unknown> = {
      value,
      ref: inputRef,
      placeholder,
      readOnly: true,
      borderType: bordered ? 'bordered' : 'underline',
      disabled: disabled,
      className: classNames(`${prefixCls}-picker-input`, { expand: visible }),
      suffix: props.suffixIcon || <Icon type="arrow-down" className={classNames({ expand: visible })} />,
    }

    const singleProps = {
      style,
      tabIndex: 0,
      className: classNames(`${prefixCls}-picker`, className, {
        [`${prefixCls}-single`]: true,
        [`${prefixCls}-expand`]: visible,
        allowClear,
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-bordered`]: bordered,
      }),
    }

    return (
      <div {...singleProps} ref={mergeRef} {...otherProps}>
        {React.Children.count(children) === 1 && children.type ? (
          React.cloneElement(children)
        ) : (
          <>
            <div className={`${prefixCls}-single-wrapper`} ref={wrapperRef as any}>
              <Input {...inputProps} />
              <span className={`${prefixCls}-picker-label`}>
                {labels?.length ? displayRender(labels, currentOptions) : ''}
              </span>
              {allowClear && <Icon type="close-solid" className={`${prefixCls}-picker-close`} onClick={handleClear} />}
            </div>
          </>
        )}
      </div>
    )
  }

  const cascaderLocator = isMultiple ? renderMultiple() : renderSingle()

  const onExpend = (index: number, opt: CascaderOptionType, opts: Array<CascaderOptionType>) => {
    selectedOptions.splice(index, selectedOptions.length - index, opt)
    setSelectedOptions(selectedOptions)

    if ((!opts?.length && opt.isLeaf !== false) || changeOnSelect) {
      onChange(selectedOptions)
    }

    !opts?.length && opt.isLeaf !== false && setVisible(false)

    const newMenus = [...menus]
    if (opts?.length || opt.isLeaf === false) {
      newMenus.splice(index + 1, newMenus.length - index + 1, opts)
    }
    setMenus(newMenus)
    loadData && opt.isLeaf === false && !opts?.length && loadData(selectedOptions)
  }

  const onMultipleExpend = (index: number, opt: CascaderOptionType, opts: Array<CascaderOptionType>) => {
    selectedOptions.splice(index, selectedOptions.length - index, opt)
    setSelectedOptions(selectedOptions)

    const newMenus = [...menus]
    if (opts?.length || opt.isLeaf === false) {
      newMenus.splice(index + 1, newMenus.length - index + 1, opts)
    }
    setMenus(newMenus)
    loadData && opt.isLeaf === false && !opts?.length && loadData(selectedOptions)
  }

  const onMultipleChecked = (opt: CascaderOptionType, checked: boolean) => {
    const checkState = getAllCheckedKeys(opt.value, checked, checkedKeys, keysData, halfCheckedKeys)
    const newValue = getMultipleCheckValue(value, opt, checked, flattenData, checkState.checkedKeys as any)
    const newMultipleOptions = newValue?.map((item) => {
      return Array.isArray(item) ? item.map((key: string) => keysData[key]) : []
    })
    if (!('value' in props)) {
      setValue(newValue)
    }
    props.onChange?.(newValue, newMultipleOptions)
  }

  const onChange = (selectedOptions: CascaderOptionType[]) => {
    const selectedValue = selectedOptions.map(
      ({ [fieldNames.value]: value }: CascaderOptionType) => value as string | number,
    )

    if (typeof props.value === 'undefined') {
      setCurrentOptions(selectedOptions)
      setValue(selectedValue as CascaderValueType)
    }
    props.onChange && props.onChange(selectedValue as CascaderValueType, selectedOptions)
  }

  const onVisibleChange = (visible: boolean) => {
    setVisible(visible)
    onPopupVisibleChange && onPopupVisibleChange(visible)
    onPopperVisibleChange && onPopperVisibleChange(visible)
    visible && setSelectedOptions(currentOptions.slice(0))
  }

  const cascaderMenus = (
    <>
      {options?.length ? (
        menus?.length &&
        menus.map((opts: Array<CascaderOptionType>, index: number) => (
          <ul key={index} className={`${prefixCls}-menu`}>
            {opts?.length &&
              opts.map((opt: CascaderOptionType) => {
                const {
                  isLeaf,
                  loading,
                  [fieldNames.value]: value,
                  [fieldNames.label]: label,
                  [fieldNames.children]: children,
                } = opt
                const expendEvent =
                  expandTrigger === 'click' || !(children && children.length) ? 'onClick' : 'onMouseEnter'
                const selected = selectedOptions[index] && selectedOptions[index][fieldNames.value] === value
                const optionProps: Record<string, unknown> = {
                  role: 'menuitem',
                  className: classNames(`${prefixCls}-menu-item`, {
                    disabled: opt.disabled,
                    last: !children?.length && isLeaf !== false,
                    selected,
                  }),
                }
                if (!opt.disabled) {
                  optionProps[expendEvent] = isMultiple
                    ? onMultipleExpend.bind(null, index, opt, children)
                    : onExpend.bind(null, index, opt, children)
                }

                const node = (
                  <>
                    <span className={`${prefixCls}-menu-item-label`}>{label}</span>
                    {loading ? (
                      <Icon type="loadding-circle" spin />
                    ) : (
                      (children?.length || isLeaf === false) && (props.expandIcon || <Icon type="arrow-right" />)
                    )}
                  </>
                )
                return (
                  <li key={value} {...optionProps} title={label as string}>
                    {isMultiple ? (
                      <>
                        <Checkbox
                          checked={getChecked(checkedKeys, value)}
                          indeterminate={getHalfChecked(halfCheckedKeys, value)}
                          disabled={opt.disabled}
                          onChange={(e) => onMultipleChecked(opt, e.target.checked)}
                          className={`${prefixCls}-checkbox`}
                        />
                        {node}
                      </>
                    ) : (
                      node
                    )}
                  </li>
                )
              })}
          </ul>
        ))
      ) : (
        <Empty description={notFoundContent} />
      )}
    </>
  )

  const cascaderPopper = dropdownRender(cascaderMenus)

  const popperProps = {
    ...allProps,
    gap: 4,
    visible,
    onVisibleChange,
    trigger: expandTrigger,
    getPopupContainer,
    prefixCls: `${prefixCls}-menus`,
    placement: allProps.popperPlacement || popupPlacement,
    popperClassName: allProps.popperClassName || allProps.popupClassName,
    getTriggerElement: () => mergeRef.current,
  }

  return usePopper(cascaderLocator, cascaderPopper, popperProps)
})

Cascader.displayName = 'Cascader'

export default Cascader
