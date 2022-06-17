import * as React from 'react'
import classNames from 'classnames'
import { tuple } from '../_utils/type'
import { getCompProps } from '../_utils'
import { ConfigContext } from '../config-provider'
import usePopper, { PopperProps } from '../_utils/usePopper'
import Input from '../input'
import Icon from '../icon'
import Empty from '../empty'

export interface CascaderOptionType {
  value?: string | number
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

export const CascaderPlacement = tuple('topLeft', 'topRight', 'bottomLeft', 'bottomRight')

export type CascaderPlacementType = typeof CascaderPlacement[number]

export type CascaderValueType = Array<string | number>

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
  children?: React.ReactNode
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
    style,
    options,
    children,
    loadData,
    className,
    fieldNames,
    placeholder,
    defaultValue,
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
  } = allProps

  // className前缀
  const prefixCls = getPrefixCls!(pkgPrefixCls, 'cascader', customPrefixcls)

  const pickerRef = React.useRef<HTMLSpanElement>()
  const triggerRef = React.useRef<HTMLSpanElement>()

  const mergeRef = (ref || pickerRef) as any

  const [visible, setVisible] = React.useState(!!props.popperVisible || !!props.popupVisible || defaultPopupVisible)
  React.useEffect(() => {
    setVisible(!!props.popperVisible || !!props.popupVisible)
  }, [props.popperVisible, props.popupVisible])

  const [menus, setMenus] = React.useState<CascaderOptionType[][]>([options])
  const [currentOptions, setCurrentOptions] = React.useState<CascaderOptionType[]>([])
  const [selectedOptions, setSelectedOptions] = React.useState<CascaderOptionType[]>([])
  const [value, setValue] = React.useState<CascaderValueType>(props.value || defaultValue || [])
  React.useEffect(() => {
    props.value && setValue(props.value)
  }, [props.value])

  React.useEffect(() => {
    if (value && options?.length > 0) {
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
  }, [options, value, selectedOptions, fieldNames])

  React.useEffect(() => {
    if (allProps.autoFocus) {
      mergeRef.current?.focus()
    }
  }, [allProps.autoFocus, mergeRef])

  const labels = currentOptions.map(({ [fieldNames.label]: label }: CascaderOptionType) => label as string)

  const allowClear = allProps.allowClear && value.length > 0

  const locatorProps = {
    style,
    tabIndex: 0,
    className: classNames(`${prefixCls}-picker`, className, { expand: visible, allowClear, disabled: props.disabled }),
  }

  const handleClear = () => {
    setValue([])
  }

  const inputProps: Record<string, unknown> = {
    value,
    placeholder,
    readOnly: true,
    disabled: props.disabled,
    className: classNames(`${prefixCls}-picker-input`, { expand: visible }),
    suffix: props.suffixIcon || <Icon type="arrow-down" className={classNames({ expand: visible })} />,
  }

  if (props.bordered) {
    inputProps.borderType = 'bordered'
  }

  const cascaderLocator = (
    <span {...locatorProps} ref={mergeRef}>
      {React.Children.count(children) === 1 && children.type ? (
        React.cloneElement(children, { ref: triggerRef as any })
      ) : (
        <>
          <span ref={triggerRef as any}>
            <Input {...inputProps} />
            <span className={`${prefixCls}-picker-label`}>
              {labels?.length ? displayRender(labels, currentOptions) : ''}
            </span>
          </span>
          {allowClear && <Icon type="close" className={`${prefixCls}-picker-close`} onClick={handleClear} />}
        </>
      )}
    </span>
  )

  const onExpend = (index: number, opt: CascaderOptionType, opts: Array<CascaderOptionType>) => {
    selectedOptions.splice(index, selectedOptions.length - index, opt)
    setSelectedOptions(selectedOptions)
    const newMenus = [...menus]
    if (opts?.length || opt.isLeaf === false) {
      newMenus.splice(index + 1, newMenus.length - index + 1, opts)
    }

    if ((!opts?.length && opt.isLeaf !== false) || changeOnSelect) {
      onChange(selectedOptions)
    }

    !opts?.length && opt.isLeaf !== false && setVisible(false)

    setMenus(newMenus)
    loadData && opt.isLeaf === false && !opts?.length && loadData(selectedOptions)
  }

  const onChange = (selectedOptions: CascaderOptionType[]) => {
    const selectedValue = selectedOptions.map(
      ({ [fieldNames.value]: value }: CascaderOptionType) => value as string | number,
    )

    setCurrentOptions(selectedOptions)
    props.value === undefined && setValue(selectedValue)
    props.onChange && props.onChange(selectedValue, selectedOptions)
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
                const optionProps: Record<string, unknown> = {
                  role: 'menuitem',
                  className: classNames(`${prefixCls}-menu-item`, {
                    disabled: opt.disabled,
                    last: !children?.length && isLeaf !== false,
                    selected: selectedOptions[index] && selectedOptions[index][fieldNames.value] === value,
                  }),
                }
                if (!opt.disabled) {
                  optionProps[expendEvent] = onExpend.bind(null, index, opt, children)
                }
                return (
                  <li key={value} {...optionProps} title={label as string}>
                    <span className={`${prefixCls}-menu-item-label`}>{label}</span>
                    {loading ? (
                      <Icon type="loadding-circle" spin />
                    ) : (
                      (children?.length || isLeaf === false) && (props.expandIcon || <Icon type="arrow-right" />)
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
    trigger: 'click',
    getPopupContainer,
    prefixCls: `${prefixCls}-menus`,
    placement: allProps.popperPlacement || allProps.popupPlacement,
    popperClassName: allProps.popperClassName || allProps.popupClassName,
    getTriggerElement: () => triggerRef.current,
  }

  return usePopper(cascaderLocator, cascaderPopper, popperProps)
})

Cascader.displayName = 'Cascader'

export default Cascader
