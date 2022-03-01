import React, { useContext, useRef, useEffect, useState, useCallback } from 'react'
import { useMergedState } from '../_utils/hooks'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { getCompProps } from '../_utils'
import { toArray } from '../_utils/react-children'
import { Input, Icon, Checkbox, Tag } from '../index'
import Option from './option'
import { ISelectProps, SelectValue } from './interface'
import usePopper from '../_utils/usePopper'

const InternalSelect: React.ForwardRefRenderFunction<ISelectProps> = (props: any, ref: unknown) => {
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps } = useContext(ConfigContext)
  const selectProps = getCompProps('Select', userDefaultProps, props)
  const {
    size,
    value,
    autoFocus,
    className,
    defaultOpen,
    dropdownClassName,
    disabled,
    borderType,
    showArrow = true,
    allowClear,
    prefixCls: customPrefixcls,
    onFocus,
    onBlur,
    onClear,
    onVisibleChange,
    mode,
    showSearch,
    onChange,
    onSearch,
    defaultValue,
    labelInValue,
    children,
    options,
    placeholder,
    dropdownStyle,
    style,
    clearIcon,
  } = selectProps
  const isMultiple = mode === 'multiple' // 是否多选
  const [initValue, setInitValue] = useMergedState(undefined, {
    value,
    defaultValue,
  })
  const realChildren = Array.isArray(options) ? options : toArray(children) // options配置项和默认children
  // console.log('real', realChildren)
  const innerRef = React.useRef<HTMLElement>()
  const selectRef = (ref as any) || innerRef
  const searchRef = useRef<any>(null) // 搜索框ref
  const selectionRef = useRef<any>(null)
  const dropDownRef = useRef<any>(null)
  const multipleRef = useRef<any>({ selectedVal: isMultiple ? [] : null, selectMulOpts: [] }) // 多选ref已选中项
  const [mulOptions, setMulOptions] = useState<any>([])
  const [singleVal, setSingleVal] = useState<any>('')
  const [optionShow, setOptionShow] = useState<boolean>(!!props.visible || defaultOpen) // 下拉列表是否展示
  const [searchInput, setSearchInput] = useState<string>('') // 搜索框值
  const [timer, setTimer] = useState<any>(null) // 搜索框定时器
  const selectPrefixCls = getPrefixCls!(prefixCls, 'select', customPrefixcls)
  // 选择器样式
  const selectCls = classNames(selectPrefixCls, className, {
    [`${selectPrefixCls}-visible`]: optionShow,
  })

  const selectionCls = classNames({
    [`${selectPrefixCls}-selector`]: true,
  })

  // 下拉列表框样式
  const dropDownCls = classNames(dropdownClassName, {
    [`${selectPrefixCls}-dropdown`]: true,
  })

  // 下拉搜索框样式
  const searchCls = classNames({
    [`${selectPrefixCls}-dropdown-search`]: true,
  })

  // 下拉子项列表样式
  const dropContentCls = classNames({
    [`${selectPrefixCls}-dropdown-scroll`]: isMultiple ? realChildren?.length > 8 : realChildren?.length > 10,
  })

  // 多选底部样式
  const multipleFooterCls = classNames({
    [`${selectPrefixCls}-multiple-footer`]: true,
  })

  // 多选，单选公共样式
  const commCls = classNames({
    [`${selectPrefixCls}-bordered`]: borderType === 'bordered',
    [`${selectPrefixCls}-underline`]: borderType === 'underline',
    [`${selectPrefixCls}-borderless`]: borderType === 'none',
    [`${selectPrefixCls}-size-${size}`]: size,
    [`${selectPrefixCls}-wrapper`]: true,
  })

  React.useEffect(() => {
    setOptionShow(!!props.visible)
  }, [props.visible])

  // realchildren更新时数据处理---待解决
  useEffect(() => {
    if (isMultiple) {
      multipleRef.current.selectedVal = initValue || []
      if (Array.isArray(initValue)) {
        if (realChildren?.length) {
          const arr: any = []
          ;(initValue as any[]).map((item: any) => {
            const obj =
              realChildren?.find((child: any) => {
                if (child && child.props) {
                  return child.props.value === item
                } else {
                  return child.value === item
                }
              }) || {}
            if (options && options.length) {
              arr.push({ value: obj?.value, label: obj?.label || obj?.value })
            } else {
              arr.push({ value: obj.props?.value, label: obj.props?.children })
            }
          })
          setMulOptions([...arr])
          multipleRef.current.selectMulOpts = arr.concat()
        }
        if (!initValue?.length) {
          setMulOptions([])
        }
      }
    }
  }, [isMultiple, initValue, children, options])

  useEffect(() => {
    if (!isMultiple) {
      multipleRef.current.selectedVal = initValue // 默认选中值
      if (initValue !== undefined) {
        const obj =
          realChildren?.find((child: any) => {
            if (child && child.props) {
              return child.props?.value === initValue
            } else {
              return child?.value === initValue
            }
          }) || {}
        if (options && options.length) {
          setSingleVal(obj?.label || obj?.value)
        } else {
          setSingleVal(obj.props?.children)
        }
      } else {
        setSingleVal(undefined)
      }
    }
  }, [initValue, realChildren])

  // 更新搜索框的值，判断清除按钮显隐
  useEffect(() => {
    setSearchInput(searchRef.current?.value)
  }, [searchRef.current?.value])

  useEffect(() => {
    handleClear()
  }, [optionShow === false])

  const handleFocus = useCallback(
    (e: React.ChangeEvent<HTMLSpanElement>) => {
      onFocus && onFocus(e)
    },
    [onFocus],
  )

  const handleBlur = useCallback(
    (e: React.ChangeEvent<HTMLSpanElement>) => {
      onBlur && onBlur(e)
    },
    [onBlur],
  )

  // 点击组件
  const handleClick = () => {
    if (disabled) return
    if (!optionShow) {
      const { onDropdownVisibleChange } = selectProps
      onDropdownVisibleChange && onDropdownVisibleChange(!optionShow)
    }
    // handleClear()
  }

  // 点击下拉列表中某项回调
  const handleOption = (key: SelectValue, label: string | undefined, isSelected: boolean) => {
    const { onSelect, onDeselect, labelInValue, value } = selectProps
    const obj =
      realChildren?.find((child: any) => {
        if (child && child.props) {
          return child.props?.value === key
        } else {
          return child?.value === key
        }
      }) || {}
    if (value !== undefined) {
      // onChange && onChange(labelInValue ? { value: key, label } : key)
      if (isMultiple) {
        const { selectedVal, selectMulOpts } = multipleRef.current
        const valArr = [...selectedVal]
        const optsArr = [...selectMulOpts]
        if (selectedVal.includes(key)) {
          const idx = selectedVal.indexOf(key)
          valArr.splice(idx, 1)
          optsArr.splice(idx, 1)
        } else {
          valArr.push(key)
          optsArr.push({
            value: key,
            label: obj.props ? obj.props?.children : obj.label || key,
          })
        }
        onChange && onChange(labelInValue ? optsArr : valArr)
        if (!isSelected) {
          onDeselect && onDeselect(key) // 下拉项取消选中时调用，参数为选中项的value,多选模式下生效
        }
      } else {
        props.visible === undefined && setOptionShow(false)
        onChange && onChange(labelInValue ? { value: key, label } : key)
      }
      onSelect && onSelect(key)
      return
    }
    if (!isMultiple) {
      setSingleVal(obj.props ? obj.props?.children : obj.label || key)
      multipleRef.current.selectedVal = key
      setInitValue(key)
      props.visible === undefined && setOptionShow(false)
      // handleClear()
      onChange && onChange(labelInValue ? { value: key, label } : key)
    } else {
      const { selectedVal, selectMulOpts } = multipleRef.current
      if (selectedVal.includes(key)) {
        const idx = selectedVal.indexOf(key)
        selectedVal.splice(idx, 1)
        selectMulOpts.splice(idx, 1)
      } else {
        selectedVal.push(key)
        selectMulOpts.push({
          value: key,
          label: obj.props ? obj.props?.children : obj.label || key,
        })
      }
      // setInitValue([...selectedVal])
      setMulOptions([...selectMulOpts])
      onChange && onChange(labelInValue ? selectMulOpts : selectedVal)
      if (!isSelected) {
        onDeselect && onDeselect(key) // 下拉项取消选中时调用，参数为选中项的value,多选模式下生效
      }
    }
    // if (isSelected) {
    //   onSelect && onSelect(key) // 下拉项被选中时调用，参数为选中项value或key
    // }
    onSelect && onSelect(key) // 下拉项被选中时调用，参数为选中项value或key
  }

  // 多选模式下选中所有 与清除所有 (可以优化)
  const handleSelectAll = () => {
    const { selectedVal, selectMulOpts } = multipleRef.current
    if (realChildren?.length !== selectedVal.length) {
      realChildren.map((child: any) => {
        const { value, children } = child.props
        if (!selectedVal.includes(value)) {
          selectedVal.push(value)
          selectMulOpts.push({ value, label: children })
        }
      })
      setMulOptions([...selectMulOpts])
    } else {
      multipleRef.current.selectedVal = []
      multipleRef.current.selectMulOpts = []
      setMulOptions([])
    }
    onChange && onChange(labelInValue ? selectMulOpts : selectedVal)
  }

  // 筛选内容 ---可以优化，抽成hook
  const handleSearch = useCallback(
    (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      if (event.currentTarget.matches('i')) {
        onSearch && onSearch(searchRef.current?.value)
      }
    },
    [onSearch],
  )

  // 输入框变化搜索内容
  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const val = event.currentTarget.value
      clearTimeout(timer)
      setTimer(
        setTimeout(() => {
          onSearch && onSearch(val)
        }, 500),
      )
    },
    [onSearch, timer],
  )

  // 清除搜索内容
  const handleClear = useCallback(() => {
    if (searchRef.current) {
      searchRef.current.value = ''
      onSearch && onSearch('')
      setSearchInput('')
    }
  }, [onSearch, searchRef])

  // 清空选择器内容
  const handleReset = (e: any) => {
    e.stopPropagation()
    // setOptionShow(false)
    // e.nativeEvent.stopImmediatePropagation()
    if (isMultiple) {
      multipleRef.current.selectedVal = []
      multipleRef.current.selectMulOpts = []
      setMulOptions([])
    } else {
      // setSingleVal('')
      setInitValue('')
      // selectionRef.current.value = ''
      // multipleRef.current.selectedVal = ''
    }
    onClear && onClear('')
    onChange && onChange(isMultiple ? '' : undefined)
  }

  // 多选模式下清除某一项
  const handleRemove = (e: any) => {
    if (disabled) return
    const tag = e.currentTarget.parentNode.getAttribute('data-tag')
    // const { tag } = e.currentTarget.dataset
    const { selectedVal, selectMulOpts } = multipleRef.current
    const idx = selectedVal.indexOf(tag)
    selectedVal.splice(idx, 1)
    selectMulOpts.splice(idx, 1)
    setMulOptions([...selectMulOpts])
    onChange && onChange(labelInValue ? selectMulOpts : selectedVal)
    e.stopPropagation()
  }

  // 渲染后缀图标
  const renderSuffix = () => {
    const { suffixIcon } = selectProps
    const { selectedVal } = multipleRef.current
    // 选择器下拉icon样式
    const arrowIconCls = classNames({
      [`${selectPrefixCls}-icon-arrow`]: true,
      [`${selectPrefixCls}-icon-arrow-up`]: optionShow,
      [`${selectPrefixCls}-icon-arrow-down`]: !optionShow,
      [`${selectPrefixCls}-icon-arrow-focus`]: optionShow,
    })

    const iconShow = allowClear && (isMultiple ? mulOptions.length > 0 : selectedVal)
    const clearIconCls = classNames({
      [`${selectPrefixCls}-icon-clear`]: true,
    })
    return (
      <>
        {iconShow && (
          <span onClick={handleReset} className={clearIconCls}>
            {<Icon type="close" /> || clearIcon}
          </span>
        )}
        {showArrow && <span className={arrowIconCls}>{suffixIcon || <Icon type="arrow-down" />}</span>}
      </>
    )
  }

  const renderOption = (child: any, index: number) => {
    if (child?.props && (child.type.displayName === 'Option' || child.type.name === 'Option')) {
      return (
        <Option
          isMultiple={isMultiple}
          {...child.props}
          key={index}
          index={index}
          onChangeSelect={handleOption}
          values={multipleRef.current.selectedVal}
        />
      )
    } else {
      return (
        <Option
          isMultiple={isMultiple}
          value={child?.value}
          key={index}
          index={index}
          onChangeSelect={handleOption}
          values={multipleRef.current.selectedVal}
          {...child}
        >
          {child?.label || child?.value}
        </Option>
      )
    }
  }

  const dropRender = (childrenToRender: any, heightStyle: any) => {
    return (
      <div className={dropContentCls} style={heightStyle}>
        {childrenToRender}
      </div>
    )
  }

  // 下拉列表为空时显示的内容
  const renderNotContent = () => {
    // 下拉列表为空
    const emptyListCls = classNames({
      [`${selectPrefixCls}-dropdown-empty`]: true,
    })
    const { notFoundContent } = selectProps
    const emptyContent = notFoundContent || '暂无数据'
    return realChildren?.length === 0 && <div className={emptyListCls}>{emptyContent}</div>
  }

  // 渲染下拉列表框
  const renderContent = () => {
    const { searchIcon, dropdownRender, listHeight } = selectProps
    const { selectedVal } = multipleRef.current
    let childrenToRender = realChildren
    if (Array.isArray(realChildren) && realChildren.length > 0) {
      childrenToRender = realChildren.map((item: any, index: number) => {
        if (item === null || item === undefined) return
        const temp = renderOption(item, index)
        return temp
      })
    }
    const heightStyle = {
      maxHeight: listHeight || '300px',
    }
    // 下拉框style属性
    const dropDownStyle = Object.assign({ width: style?.width }, dropdownStyle)
    const checkboxStyle = {
      height: '30px',
      background: 'none',
    }
    const indeterminate = mulOptions.length > 0 && mulOptions.length < realChildren.length
    const checked = mulOptions.length === realChildren.length
    return (
      <>
        {
          <div className={dropDownCls} style={dropDownStyle} ref={dropDownRef}>
            {/* 搜索框 */}
            {(showSearch || isMultiple) && (
              <div className={searchCls}>
                <Input
                  ref={searchRef}
                  value={searchRef.current?.value || ''}
                  borderType="bordered"
                  placeholder="请输入需要搜索的内容"
                  // 搜索图标
                  prefix={<span onClick={handleSearch}>{<Icon type="search" /> || searchIcon}</span>}
                  suffix={
                    searchInput && (
                      <span onClick={handleClear}>
                        <Icon type="close" />
                      </span>
                    )
                  }
                  onChange={handleSearchChange}
                />
              </div>
            )}
            {!dropdownRender && realChildren.length > 0 && dropRender(childrenToRender, heightStyle)}
            {/* 下拉列表为空 */}
            {renderNotContent()}
            {/* 拓展菜单 */}
            <div>{dropdownRender && dropdownRender(dropRender(childrenToRender, heightStyle))}</div>
            {/* 多选模式-----底部 */}
            {isMultiple && (
              <div className={multipleFooterCls}>
                <Checkbox
                  style={checkboxStyle}
                  checked={checked}
                  indeterminate={indeterminate}
                  onChange={handleSelectAll}
                >
                  全选
                </Checkbox>
                <span className={`${selectPrefixCls}-multiple-footer-hadSelected`}>
                  已选<span>{isMultiple ? selectedVal.length : 0}</span>项
                </span>
              </div>
            )}
          </div>
        }
      </>
    )
  }

  // 处理多选tag
  const handleMaxTagHolder = useCallback(() => {
    const { maxTagPlaceholder } = selectProps
    const TagStyle = { margin: '2px 8px 2px 0' }
    if (typeof maxTagPlaceholder === 'function') {
      return (
        <Tag type="edit" style={TagStyle} size={size} disabled={disabled}>
          {maxTagPlaceholder(mulOptions)}
        </Tag>
      )
    } else {
      return (
        <Tag type="edit" style={TagStyle} size={size} disabled={disabled}>
          {maxTagPlaceholder}
        </Tag>
      )
    }
  }, [mulOptions])

  // 渲染多选选择器 (待优化：多选框下拉按钮样式调整，限制tag数代码优化)
  const renderMultiple = () => {
    const { maxTagCount, maxTagPlaceholder } = selectProps
    const multipleCls = classNames(commCls, {
      [`${selectPrefixCls}-multiple-disabled`]: disabled,
      [`${selectPrefixCls}-${mode}`]: mode,
      [`${selectPrefixCls}-focused`]: autoFocus || optionShow,
      [`${selectPrefixCls}-placeholder`]: placeholder && !mulOptions.length,
    })

    const itemCls = classNames({
      [`${selectPrefixCls}-selection-item`]: true,
      [`${selectPrefixCls}-selection-item-${size}`]: size,
    })
    const TagStyle = { margin: '2px 8px 2px 0' }
    return (
      <div className={multipleCls} ref={selectionRef}>
        {Array.isArray(mulOptions) && (
          <>
            {mulOptions.map((item: any, index: number) => {
              const { label, value } = item
              return (
                (!maxTagCount || index <= maxTagCount - 1) && (
                  <span key={value}>
                    <Tag
                      type="edit"
                      style={TagStyle}
                      size={size}
                      closable
                      disabled={disabled}
                      onClose={handleRemove}
                      data-tag={value}
                    >
                      {label}
                    </Tag>
                  </span>
                )
              )
            })}
            {maxTagCount && mulOptions.length > maxTagCount ? (
              maxTagPlaceholder ? (
                handleMaxTagHolder()
              ) : (
                <span className={itemCls}>
                  <span className={`${selectPrefixCls}-selection-item-content`}>共{mulOptions.length}项</span>
                </span>
              )
            ) : null}
          </>
        )}
        <span className={`${selectPrefixCls}-placeholder`}>{!mulOptions.length && placeholder}</span>
        <span className={`${selectPrefixCls}-suffix`}>{renderSuffix()}</span>
      </div>
    )
  }

  const singleCls = classNames(commCls, {
    [`${selectPrefixCls}-single`]: true,
    [`${selectPrefixCls}-single-disabled`]: disabled,
    [`${selectPrefixCls}-single-focused`]: (autoFocus && !disabled) || optionShow,
  })

  const singleTextCls = classNames({
    [`${selectPrefixCls}-single-text`]: true,
    [`${selectPrefixCls}-single-disabled-text`]: disabled,
  })

  const renderSelect = () => {
    return (
      <div className={selectCls} ref={selectRef} style={style}>
        <span className={selectionCls} onClick={handleClick} onFocus={handleFocus} onBlur={handleBlur}>
          {/* 单选模式Input  多选输入框 */}
          {!isMultiple ? (
            <div className={singleCls} ref={selectionRef}>
              <span className={singleTextCls}>{singleVal || null}</span>
              <span className={`${selectPrefixCls}-placeholder`}>{!singleVal && placeholder}</span>
              <span className={`${selectPrefixCls}-suffix`}>{renderSuffix()}</span>
            </div>
          ) : (
            renderMultiple()
          )}
        </span>
      </div>
    )
  }

  const catchStyle = () => {
    if (selectRef?.current) {
      const { width } = selectRef.current?.getBoundingClientRect()
      return { width: dropdownStyle?.width || (width > 75 ? width : 75), zIndex: 1050 }
    }
  }

  const handleVisibleChange = (visible: boolean) => {
    props.visible === undefined && setOptionShow(visible)
    onVisibleChange && onVisibleChange(visible)
  }

  const popperProps = {
    ...selectProps,
    prefixCls: selectPrefixCls,
    placement: 'bottomLeft',
    popperStyle: catchStyle(),
    defaultVisible: optionShow,
    visible: optionShow,
    onVisibleChange: handleVisibleChange,
  }
  return usePopper(renderSelect(), renderContent(), popperProps)
}

const Select = React.forwardRef<unknown, ISelectProps>(InternalSelect)

Select.displayName = 'Select'

export default Select
