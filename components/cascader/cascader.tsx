import React, { useMemo, useCallback, useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
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

export interface CascaderRef {
  focus: () => void
  blur: () => void
  input: HTMLInputElement | null
}

const Cascader = forwardRef<CascaderRef, CascaderProps>((props, ref) => {
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

  const prefixCls = getPrefixCls!(pkgPrefixCls, 'cascader', customPrefixcls)

  const pickerRef = useRef<HTMLInputElement>(null)
  const triggerRef = useRef<HTMLDivElement>()
  const labelRef = useRef<HTMLDivElement>()
  const clearRef = useRef<HTMLDivElement>()

  const [visible, setVisible] = useState(!!props.popperVisible || !!props.popupVisible || defaultPopupVisible)
  useEffect(() => {
    setVisible(!!props.popperVisible || !!props.popupVisible)
  }, [props.popperVisible, props.popupVisible])

  const [menus, setMenus] = useState<CascaderOptionType[][]>([options])
  const [currentOptions, setCurrentOptions] = useState<CascaderOptionType[]>([])
  const [selectedOptions, setSelectedOptions] = useState<CascaderOptionType[]>([])
  const [value, setValue] = useState<CascaderValueType>(props.value || defaultValue || [])
  useEffect(() => {
    props.value && setValue(props.value)
  }, [props.value])

  const isMultiple = useMemo(() => mode === 'multiple', [mode])

  const { flattenData, keysData } = useMemo(() => flattenAll(options, []), [options])

  const [checkedKeys, halfCheckedKeys] = useChecked(value, flattenData, keysData, isMultiple)

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

  const handleMouseUp = (e: MouseEvent) => {
    const cln = (e?.target as Element)?.className
    const isCloseBtn = cln.indexOf('kd-tag-close-icon') > -1 || cln.indexOf('kdicon') > -1

    if (isCloseBtn) {
      e.stopPropagation()
    }
  }

  const handleClear = (e: any) => {
    e.stopPropagation()
    onChange([])
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

  const inputProps: Record<string, unknown> = {
    value,
    placeholder,
    readOnly: true,
    borderType: bordered ? 'bordered' : 'underline',
    disabled: disabled,
    ref: pickerRef,
    className: classNames(`${prefixCls}-picker-input`, { expand: visible }),
    suffix: props.suffixIcon || <Icon type="arrow-down" className={classNames({ expand: visible })} />,
  }

  const renderSingle = () => {
    const singleProps = {
      style,
      className: classNames(`${prefixCls}-picker`, className, {
        [`${prefixCls}-expand`]: visible,
        [`${prefixCls}-clear`]: allowClear,
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-bordered`]: bordered,
      }),
    }

    return (
      <div {...singleProps} {...otherProps}>
        {React.Children.count(children) === 1 && children.type ? (
          React.cloneElement(children, { ref: triggerRef as any })
        ) : (
          <>
            <div ref={triggerRef as any}>
              <Input {...inputProps} />
              <div className={`${prefixCls}-picker-label`}>
                {labels?.length ? displayRender(labels, currentOptions) : ''}
              </div>
              {allowClear && (
                <div ref={clearRef as any} className={`${prefixCls}-picker-close`} onClick={handleClear}>
                  {clearIcon || <Icon type="close-solid" />}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    )
  }

  const renderMultiple = () => {
    const multipleProps = {
      style,
      className: classNames(`${prefixCls}-picker`, className, {
        [`${prefixCls}-multiple`]: true,
        [`${prefixCls}-clear`]: allowClear,
        [`${prefixCls}-expand`]: visible,
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-bordered`]: bordered,
      }),
    }

    const itemCls = classNames({
      [`${prefixCls}-selection-item`]: true,
      [`${prefixCls}-tag-describe`]: true,
    })

    const tagStyle = { margin: '2px 8px 2px 0', maxWidth: '100%' }

    return (
      <div {...multipleProps} {...otherProps}>
        {React.Children.count(children) === 1 && children.type ? (
          React.cloneElement(children, { ref: triggerRef as any })
        ) : (
          <div ref={triggerRef as any}>
            <Input {...inputProps} />
            <div className={`${prefixCls}-picker-label`} ref={labelRef as any}>
              {Array.isArray(currentOptions) && currentOptions.length ? (
                <>
                  {currentOptions.map((option: CascaderOptionType[], index: number) => {
                    return (
                      <span key={JSON.stringify(values[index])} className={classNames(`${prefixCls}-selection-tag`)}>
                        {(!maxTagCount || index <= maxTagCount - 1) && (
                          <Tag
                            type="edit"
                            disabled={disabled}
                            style={tagStyle}
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
              ) : null}
            </div>
            {allowClear && (
              <div ref={clearRef as any} className={`${prefixCls}-picker-close`} onClick={handleClear}>
                {clearIcon || <Icon type="close-solid" />}
              </div>
            )}
          </div>
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

  useEffect(() => {
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

  useEffect(() => {
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

  useEffect(() => {
    if (autoFocus) {
      pickerRef.current?.focus()
    }
  }, [autoFocus, pickerRef])

  useEffect(() => {
    labelRef.current?.addEventListener('mouseup', handleMouseUp)
    clearRef.current?.addEventListener('mouseup', handleMouseUp)
  }, [allowClear])

  useImperativeHandle(ref, () => ({
    blur: () => {
      pickerRef.current?.blur()
    },
    focus: () => {
      pickerRef.current?.focus()
    },
    input: pickerRef.current,
  }))

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
    getTriggerElement: () => triggerRef.current,
  }

  return usePopper(cascaderLocator, cascaderPopper, popperProps)
})

Cascader.displayName = 'Cascader'

export default Cascader
