import React, {
  useContext,
  useRef,
  useEffect,
  useState,
  useCallback,
  useLayoutEffect,
  useMemo,
  useImperativeHandle,
} from 'react'
import { useMergedState } from '../_utils/hooks'
import isBoolean from 'lodash/isBoolean'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { getCompProps } from '../_utils'
import { toArray } from '../_utils/react-children'
import { Icon, Checkbox, Tag } from '../index'
import Option from './option'
import { ISelectProps, SelectValue } from './interface'
import usePopper from '../_utils/usePopper'
import VirtualList from '../virtual-list'
import KeyCode from '../_utils/KeyCode'
const INPUT_MIN_WIDTH = 4 // 输入框最小宽度

const InternalSelect: React.ForwardRefRenderFunction<ISelectProps<SelectValue>> = (props: any, ref: unknown) => {
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps, locale } = useContext(ConfigContext)
  const selectProps = getCompProps('Select', userDefaultProps, props)
  const selectLangMsg = locale.getCompLangMsg({ componentName: 'Select' })
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
    dropdownStyle = {},
    style,
    clearIcon,
    filterOption,
    optionFilterProp,
    optionLabelProp,
    popperStyle = {},
    tagRender,
    virtualListProps,
  } = selectProps
  const isMultiple = mode === 'multiple' // 是否多选
  const [initValue, setInitValue] = useMergedState(undefined, {
    value,
    defaultValue,
  })
  const realChildren = Array.isArray(options) ? options : toArray(children) // options配置项和默认children
  const selectRef = useRef<any>()
  const searchRef = useRef<any>(null) // 搜索框ref
  const selectionRef = useRef<any>(null)
  const dropDownRef = useRef<any>(null)
  const multipleRef = useRef<any>({ selectedVal: isMultiple ? [] : null, selectMulOpts: [] }) // 多选ref已选中项
  const measureRef = useRef<HTMLSpanElement>(null)
  const clearRef = useRef<HTMLSpanElement>(null)

  const [mulOptions, setMulOptions] = useState<any>([])
  const [singleVal, setSingleVal] = useState<any>('')
  const [optionShow, setOptionShow] = useState<boolean>(
    typeof props.visible === 'undefined' ? !!defaultOpen : !!props.visible,
  )
  // 下拉列表是否展示
  // const [searchInput, setSearchInput] = useState<string>('') // 搜索框值
  const [searchValue, setSearchValue] = useState<any>('') // 搜索框定时器
  const [inputWidth, setInputWidth] = useState(INPUT_MIN_WIDTH) // 输入框宽度
  const [focusd, setFocusd] = useState(autoFocus)

  const isShowSearch = useMemo(() => {
    return isBoolean(showSearch) ? showSearch : isMultiple
  }, [isMultiple, showSearch])

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

  // 下拉子项列表样式
  const dropContentCls = classNames({
    [`${selectPrefixCls}-dropdown-scroll`]:
      (isMultiple ? realChildren?.length > 8 : realChildren?.length > 10) || selectProps.dropdownRender,
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
    [`${selectPrefixCls}-show-search`]: isShowSearch && focusd,
  })

  useEffect(() => {
    if (typeof props.visible !== 'undefined') {
      setOptionShow(props.visible)
    }
  }, [props.visible])

  // realchildren更新时数据处理---待解决
  useEffect(() => {
    if (isMultiple) {
      multipleRef.current.selectedVal = Array.isArray(initValue) ? [...initValue] : initValue || []
      if (Array.isArray(initValue)) {
        if (realChildren?.length) {
          const arr: any = []
          ;(initValue as any[]).map((item: any) => {
            const obj = realChildren?.find((child: any) => {
              if (child && child.props) {
                return child.props.value === item
              } else {
                return child.value === item
              }
            })
            if (obj) {
              if (options && options.length) {
                arr.push({ value: obj?.value, label: obj?.label || obj?.value })
              } else {
                arr.push({ value: obj.props?.value, label: obj.props?.children })
              }
            } else {
              arr.push({ value: item, label: item })
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
        const obj = realChildren?.find((child: any) => {
          if (child && child.props) {
            return child.props?.value === initValue
          } else {
            return child?.value === initValue
          }
        })
        if (obj) {
          if (options && options.length) {
            setSingleVal(getOptionLabel(obj) || obj?.value)
          } else {
            setSingleVal(getOptionLabel(obj))
          }
        } else {
          setSingleVal(initValue)
        }
      } else {
        setSingleVal(undefined)
      }
    }
  }, [initValue, realChildren])

  useEffect(() => {
    if (optionShow === false) {
      handleClear()
    }
  }, [optionShow])

  const handleFocus = useCallback(
    (e: React.ChangeEvent<HTMLSpanElement>) => {
      e.stopPropagation()
      setFocusd(true)
      onFocus && onFocus(e)
    },
    [onFocus],
  )

  const handleBlur = useCallback(
    (e: React.ChangeEvent<HTMLSpanElement>) => {
      e.stopPropagation()
      setFocusd(false)
      onBlur && onBlur(e)
    },
    [onBlur],
  )

  // 点击组件
  // const handleClick = () => {
  //   if (disabled) return
  //   if (optionShow) {
  //     const { onDropdownVisibleChange } = selectProps
  //     onDropdownVisibleChange && onDropdownVisibleChange(true)
  //   }
  // }

  useEffect(() => {
    selectionRef.current.addEventListener('mouseup', (e: MouseEvent) => {
      const isCloseBtn = (e?.target as Element)?.className.indexOf('kd-tag-close-icon') > -1
      if (isCloseBtn) {
        e.stopPropagation()
      }
    })
  }, [])

  useLayoutEffect(() => {
    measureRef.current && setInputWidth(measureRef.current.scrollWidth)
  }, [searchValue])

  const filledOptions = useMemo(() => {
    if (filterOption === false || !searchValue) {
      return realChildren
    }
    const childrenList: any[] = []
    const handleFilledOption = (option: any) => {
      if (filterOption === true) {
        return String(option[optionFilterProp]).toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
      } else if (typeof filterOption === 'function') {
        return filterOption(searchValue, option)
      }
      return true
    }
    realChildren.map((item: any) => {
      if (item === null || item === undefined) return
      let isValidOption = true
      if (item?.props && (item.type.displayName === 'Option' || item.type.name === 'Option')) {
        isValidOption = handleFilledOption(item.props)
      } else {
        isValidOption = handleFilledOption(item)
      }
      if (isValidOption) {
        childrenList.push(item)
      }
    })
    return childrenList
  }, [searchValue, realChildren, filterOption, optionFilterProp])

  const getOptionLabel = useCallback(
    (obj) => {
      const text =
        Object.prototype.hasOwnProperty.call(selectProps, 'options') &&
        !Object.prototype.hasOwnProperty.call(props, 'optionLabelProp')
          ? 'label'
          : optionLabelProp
      if (obj.props) {
        if (text) {
          return obj?.props[text]
        }
        return obj.props?.children
      } else {
        if (text) {
          return obj[text]
        }
      }
      return obj?.label
    },
    [optionLabelProp, selectProps],
  )

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
    if (isMultiple) {
      searchRef.current?.focus()
    } else {
      searchRef.current?.blur()
    }
    const optionsObj = obj.props ? obj.props : obj || {}
    if (value !== undefined) {
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
            ...optionsObj,
            value: key,
            // label: obj.props ? obj.props?.children : obj.label || key,
            label: getOptionLabel(obj) || key,
          })
        }
        onChange && onChange(labelInValue ? optsArr : valArr, optsArr)
        if (!isSelected) {
          onDeselect && onDeselect(key) // 下拉项取消选中时调用，参数为选中项的value,多选模式下生效
        }
      } else {
        props.visible === undefined && setOptionShow(false)
        initValue !== key &&
          onChange &&
          onChange(labelInValue ? { value: key, label } : key, { ...optionsObj, value: key, label })
      }
      onSelect && onSelect(key)
      return
    }
    if (!isMultiple) {
      setSingleVal(getOptionLabel(obj) || key)
      multipleRef.current.selectedVal = key
      setInitValue(key)
      props.visible === undefined && setOptionShow(false)
      initValue !== key &&
        onChange &&
        onChange(labelInValue ? { value: key, label } : key, { ...optionsObj, value: key, label })
    } else {
      const { selectedVal, selectMulOpts } = multipleRef.current
      if (selectedVal.includes(key)) {
        const idx = selectedVal.indexOf(key)
        selectedVal.splice(idx, 1)
        selectMulOpts.splice(idx, 1)
      } else {
        selectedVal.push(key)
        selectMulOpts.push({
          ...optionsObj,
          value: key,
          label: getOptionLabel(obj) || key,
        })
      }
      setMulOptions([...selectMulOpts])
      onChange && onChange(labelInValue ? selectMulOpts : selectedVal, selectMulOpts)
      if (!isSelected) {
        onDeselect && onDeselect(key) // 下拉项取消选中时调用，参数为选中项的value,多选模式下生效
      }
    }

    setSearchValue('')
    onSelect && onSelect(key) // 下拉项被选中时调用，参数为选中项value或key
  }

  // 多选模式下选中所有 与清除所有 (可以优化)
  const handleSelectAll = () => {
    const { selectedVal, selectMulOpts } = multipleRef.current
    let newSelectedVal = [...selectedVal]
    let newSelectMulOpts = [...selectMulOpts]
    if (filledOptions?.length !== newSelectedVal.length) {
      filledOptions.map((child: any) => {
        const { value } = child.props || child
        if (!newSelectedVal.includes(value)) {
          newSelectedVal.push(value)
          newSelectMulOpts.push({ value, label: getOptionLabel(child) })
        }
      })
      if (typeof value === 'undefined') {
        multipleRef.current.selectedVal = newSelectedVal
        multipleRef.current.selectMulOpts = newSelectMulOpts
        setMulOptions([...newSelectMulOpts])
        setSearchValue('')
      }
    } else {
      newSelectedVal = []
      newSelectMulOpts = []
      if (typeof value === 'undefined') {
        multipleRef.current.selectedVal = []
        multipleRef.current.selectMulOpts = []
        setMulOptions([])
      }
    }
    onChange && onChange(labelInValue ? newSelectMulOpts : newSelectedVal, newSelectMulOpts)
  }

  // 输入框变化搜索内容
  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const val = event.currentTarget.value
      setOptionShow(true)
      setSearchValue(val)
      onSearch?.(val)
    },
    [onSearch],
  )

  // 清除搜索内容
  const handleClear = useCallback(() => {
    if (searchRef.current) {
      searchRef.current.value = ''
      setSearchValue('')
    }
  }, [searchRef])

  // 清空选择器内容
  const handleReset = (e: any) => {
    e.stopPropagation()
    if (isMultiple) {
      multipleRef.current.selectedVal = []
      multipleRef.current.selectMulOpts = []
      setMulOptions([])
    } else {
      setInitValue('')
    }
    onClear && onClear('')
    setSearchValue('')
    onChange && onChange(isMultiple ? '' : undefined)
  }

  // 多选模式下清除某一项
  const handleRemove = (e: any, tag: any) => {
    if (disabled) return
    const { selectedVal, selectMulOpts } = multipleRef.current
    const idx = selectedVal.indexOf(tag)
    selectedVal.splice(idx, 1)
    selectMulOpts.splice(idx, 1)
    setMulOptions([...selectMulOpts])
    onChange && onChange(labelInValue ? selectMulOpts : selectedVal, selectMulOpts)
    e.stopPropagation()
  }

  // 渲染后缀图标
  const renderSuffix = () => {
    const { suffixIcon } = selectProps
    // 选择器下拉icon样式
    const arrowIconCls = classNames({
      [`${selectPrefixCls}-icon-arrow`]: true,
      [`${selectPrefixCls}-icon-arrow-up`]: optionShow,
      [`${selectPrefixCls}-icon-arrow-down`]: !optionShow,
      [`${selectPrefixCls}-icon-arrow-focus`]: optionShow,
    })

    const iconShow =
      allowClear && !disabled && ((isMultiple ? mulOptions.length > 0 : (singleVal ?? '') !== '') || searchValue)
    const clearIconCls = classNames({
      [`${selectPrefixCls}-icon-clear`]: true,
    })
    return (
      <>
        {iconShow ? (
          <span onClick={handleReset} onMouseDown={(e) => e.preventDefault()} className={clearIconCls} ref={clearRef}>
            {clearIcon || <Icon type="close-solid" />}
          </span>
        ) : null}
        {showArrow ? <span className={arrowIconCls}>{suffixIcon || <Icon type="arrow-down" />}</span> : null}
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
          activeIndex={activeIndex}
          onChangeSelect={handleOption}
          values={multipleRef.current.selectedVal}
          onChangeActiveIndex={(i) => {
            setActiveIndex(i)
          }}
        />
      )
    } else {
      return (
        <Option
          isMultiple={isMultiple}
          value={child?.value}
          key={index}
          index={index}
          activeIndex={activeIndex}
          onChangeSelect={handleOption}
          values={multipleRef.current.selectedVal}
          onChangeActiveIndex={(i) => {
            setActiveIndex(i)
          }}
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
    return filledOptions?.length === 0 && <div className={emptyListCls}>{emptyContent}</div>
  }

  useEffect(() => {
    if (isShowSearch && autoFocus && !disabled) {
      searchRef.current?.focus()
    }
  }, [isShowSearch, autoFocus, disabled])
  const optionsListRef: any = React.useRef(null)
  // 渲染下拉列表框
  const renderContent = () => {
    const { dropdownRender, listHeight } = selectProps
    const { selectedVal } = multipleRef.current
    let childrenToRender: any = filledOptions
    let eleOptionList: any = filledOptions
    if (Array.isArray(childrenToRender) && childrenToRender.length > 0) {
      childrenToRender = childrenToRender.map((item: any, index: number) => {
        if (item === null || item === undefined) return
        const temp = renderOption(item, index)
        return temp
      })

      eleOptionList = (
        <VirtualList
          role="listbox"
          data={childrenToRender}
          itemKey={(child) => child.props?.value}
          onMouseDown={(e) => e?.preventDefault()}
          isStaticItemHeight={true}
          height={listHeight || 300}
          measureLongestItem={false}
          ref={optionsListRef}
          {...virtualListProps}
        >
          {(child) => {
            return child
          }}
        </VirtualList>
      )
    }

    const heightStyle = {
      maxHeight: listHeight || '300px',
    }
    // 下拉框style属性
    const checkboxStyle = {
      height: '30px',
      background: 'none',
    }
    const indeterminate = mulOptions.length > 0 && mulOptions.length < filledOptions.length
    const checked = mulOptions.length === filledOptions.length
    return (
      <>
        {
          <div className={dropDownCls} style={dropdownStyle} ref={dropDownRef}>
            {!dropdownRender && childrenToRender.length > 0 ? dropRender(eleOptionList, heightStyle) : null}
            {/* 下拉列表为空 */}
            {renderNotContent()}
            {/* 拓展菜单 */}
            <div>{dropdownRender ? dropdownRender(dropRender(eleOptionList, heightStyle)) : null}</div>
            {/* 多选模式-----底部 */}
            {isMultiple && realChildren.length > 0 ? (
              <div className={multipleFooterCls}>
                <Checkbox
                  style={checkboxStyle}
                  checked={checked}
                  indeterminate={indeterminate}
                  onChange={handleSelectAll}
                >
                  {selectLangMsg?.selectAll}
                </Checkbox>
                <span className={`${selectPrefixCls}-multiple-footer-hadSelected`}>
                  {locale.getLangMsg('Select', 'seleted', {
                    size: (
                      <span className={`${selectPrefixCls}-multiple-footer-hadSelected-number`}>
                        {selectedVal.length}
                      </span>
                    ),
                  })}
                </span>
              </div>
            ) : null}
          </div>
        }
      </>
    )
  }

  // 处理多选tag
  const handleMaxTagHolder = useCallback(() => {
    const { maxTagPlaceholder } = selectProps
    if (typeof maxTagPlaceholder === 'function') {
      return (
        <Tag type="edit" size={size} disabled={disabled}>
          {maxTagPlaceholder(mulOptions)}
        </Tag>
      )
    } else {
      return (
        <Tag type="edit" size={size} disabled={disabled}>
          {maxTagPlaceholder}
        </Tag>
      )
    }
  }, [mulOptions])

  const renderSingle = () => {
    const obj =
      realChildren?.find((child: any) => {
        if (child && child.props) {
          return child.props?.value === initValue
        } else {
          return child?.value === initValue
        }
      }) || {}
    let title = ''
    if (obj.props) {
      title = obj?.props?.title || obj?.props?.label || obj?.props?.children
    } else {
      title = obj?.title || obj?.label || obj?.children
    }
    const hiddenStyle = (isShowSearch && !!searchValue) || singleVal ? { visibility: 'hidden' as const } : undefined
    return (
      <>
        <div className={singleCls} ref={selectionRef} title={title}>
          <span className={`${selectPrefixCls}-selection-search`}>
            <input
              ref={searchRef}
              value={searchValue}
              className={`${selectPrefixCls}-selection-search-input`}
              onChange={handleSearchChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              readOnly={!isShowSearch || !!disabled}
            />
          </span>
          {singleVal && !searchValue ? <span className={`${selectPrefixCls}-selection-item`}>{singleVal}</span> : null}
          <span className={`${selectPrefixCls}-placeholder`} style={hiddenStyle}>
            {placeholder}
          </span>
          <span className={`${selectPrefixCls}-suffix`}>{renderSuffix()}</span>
        </div>
      </>
    )
  }

  // 渲染多选选择器 (待优化：多选框下拉按钮样式调整，限制tag数代码优化)
  const renderMultiple = () => {
    const { maxTagCount, maxTagPlaceholder } = selectProps
    const multipleCls = classNames(commCls, {
      [`${selectPrefixCls}-multiple-disabled`]: disabled,
      [`${selectPrefixCls}-${mode}`]: mode,
      [`${selectPrefixCls}-focused`]: focusd || optionShow,
    })

    const itemCls = classNames({
      [`${selectPrefixCls}-selection-item`]: true,
      [`${selectPrefixCls}-selection-item-${size}`]: size,
    })
    const TagStyle = { margin: '2px 8px 2px 0', maxWidth: '100%' }
    return (
      <div className={multipleCls} ref={selectionRef}>
        {Array.isArray(mulOptions) ? (
          <>
            {mulOptions.map((item: any, index: number) => {
              const { label, value } = item
              return !maxTagCount || index <= maxTagCount - 1 ? (
                <span
                  key={value}
                  className={classNames(`${selectPrefixCls}-selection-tag`)}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {typeof tagRender === 'function' ? (
                    tagRender?.({ onClose: handleRemove, value, label, disabled, size })
                  ) : (
                    <Tag
                      type="edit"
                      style={TagStyle}
                      size={size}
                      closable
                      disabled={disabled}
                      onClose={(e) => handleRemove(e, value)}
                      data-tag={value}
                    >
                      {label}
                    </Tag>
                  )}
                </span>
              ) : null
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
        ) : null}
        <span className={`${selectPrefixCls}-selection-search`} style={{ width: inputWidth }}>
          <input
            ref={searchRef}
            value={searchValue}
            className={`${selectPrefixCls}-selection-search-input`}
            onChange={handleSearchChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            readOnly={!isShowSearch || !!disabled}
          />
          <span ref={measureRef} className={`${selectPrefixCls}-selection-search-mirror`}>
            {searchValue}&nbsp;
          </span>
        </span>
        <span className={`${selectPrefixCls}-placeholder`}>
          {!mulOptions.length && !searchValue ? placeholder : null}
        </span>
        <span className={`${selectPrefixCls}-suffix`}>{renderSuffix()}</span>
      </div>
    )
  }

  const singleCls = classNames(commCls, {
    [`${selectPrefixCls}-single`]: true,
    [`${selectPrefixCls}-single-disabled`]: disabled,
    [`${selectPrefixCls}-single-focused`]: (focusd && !disabled) || optionShow,
  })
  // keyboard
  const getActiveIndex = (index: number, offset = 1): number => {
    const len = filledOptions.length
    for (let i = 0; i < len; i += 1) {
      const current = (index + i * offset + len) % len
      const { props } = filledOptions[current]
      if (!props?.disabled) {
        return current
      }
    }
    return -1
  }
  // reset activeIndex
  useEffect(() => {
    if (searchValue) {
      setActiveIndex(getActiveIndex(0))
    }
  }, [searchValue])
  useEffect(() => {
    if (optionShow && !disabled) {
      const { onDropdownVisibleChange } = selectProps
      onDropdownVisibleChange && onDropdownVisibleChange(true)
    }
  }, [optionShow])

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      e.stopPropagation()
    }
    clearRef.current?.addEventListener('mouseup', fn)
    return () => {
      clearRef.current?.removeEventListener('mouseup', fn)
    }
  }, [singleVal, mulOptions])

  useImperativeHandle(ref as any, () => {
    return {
      select: selectRef.current,
      focus: () => {
        setFocusd(true)
        searchRef.current?.focus()
      },
      blur: () => {
        setFocusd(false)
        searchRef.current?.blur()
      },
    }
  })

  const [activeIndex, setActiveIndex] = useState(isShowSearch ? getActiveIndex(0) : -1)
  const onInternalKeyDown: React.KeyboardEventHandler<HTMLSpanElement> = (e) => {
    const { which } = e
    // open
    if (which === KeyCode.ENTER || which === KeyCode.UP || which === KeyCode.DOWN) {
      e.preventDefault()
      handleVisibleChange(true)
    }
    // backspace
    const { selectedVal, selectMulOpts } = multipleRef.current
    // isMultiple
    if (which === KeyCode.BACKSPACE && !searchValue && isMultiple && selectedVal.length && selectMulOpts.length) {
      selectedVal.splice(-1, 1)
      selectMulOpts.splice(-1, 1)
      setMulOptions([...selectMulOpts])
      onChange && onChange(labelInValue ? selectMulOpts : selectedVal, selectMulOpts)
      // !isMultiple
    } else if (which === KeyCode.BACKSPACE && allowClear && !isMultiple) {
      setInitValue('')
      onClear && onClear('')
      setSearchValue('')
      onChange && onChange(undefined)
    }
    // optionsList: up、down、enter
    if (optionShow) {
      let offset = 0
      if (which === KeyCode.UP) {
        offset = -1
      } else if (which === KeyCode.DOWN) {
        offset = 1
      } else if (which === KeyCode.ENTER) {
        const item = filledOptions[activeIndex]
        if (!item) return
        const key = item.props?.value || item.value
        const label = item.props?.children || item.label
        handleOption(key, label, true)
        // search
        if (searchValue) {
          setActiveIndex(
            realChildren.findIndex((child) => {
              if (child && child.props) {
                return child.props?.value === key
              } else {
                return child?.value === key
              }
            }),
          )
        }
        if (!isMultiple) {
          handleVisibleChange(false)
        }
      } else if (which === KeyCode.ESC) {
        handleVisibleChange(false)
      }
      if (offset !== 0) {
        const nextActiveIndex = getActiveIndex(activeIndex + offset, offset)
        if (optionsListRef.current) {
          optionsListRef.current.scrollTo({ index: nextActiveIndex })
        }
        setActiveIndex(nextActiveIndex)
        e.preventDefault()
      }
    }
  }
  const renderSelect = () => {
    return (
      <div className={selectCls} ref={selectRef} style={style}>
        <span
          className={selectionCls}
          tabIndex={disabled ? -1 : 0}
          onFocus={() => searchRef.current?.focus()}
          onBlur={() => searchRef.current?.blur()}
          onKeyDown={onInternalKeyDown}
        >
          {/* 单选模式Input  多选输入框 */}
          {!isMultiple ? renderSingle() : renderMultiple()}
        </span>
      </div>
    )
  }

  const catchStyle = () => {
    if (selectRef?.current) {
      const { width } = selectRef.current?.getBoundingClientRect()
      return {
        minWidth: width,
        maxWidth: 600,
        ...dropdownStyle,
        width: dropdownStyle?.width || 'auto',
        zIndex: 1050,
        ...popperStyle,
      }
    }
  }

  const handleVisibleChange = (visible: boolean) => {
    if (!visible) {
      setActiveIndex(isShowSearch ? getActiveIndex(0) : -1)
    }
    if (visible !== optionShow) {
      props.visible === undefined && setOptionShow(visible)
      onVisibleChange && onVisibleChange(visible)
    }
  }

  const popperProps = {
    ...selectProps,
    prefixCls: `${selectPrefixCls}-dropdown-panel${isMultiple ? ` ${selectPrefixCls}-multiple-dropdown-panel` : ''}`,
    placement: 'bottomLeft',
    popperStyle: catchStyle(),
    defaultVisible: optionShow,
    visible: optionShow,
    onVisibleChange: handleVisibleChange,
    clickToClose: !(isShowSearch && searchValue),
  }
  return usePopper(renderSelect(), renderContent(), popperProps)
}

const Select = React.forwardRef<unknown, ISelectProps<SelectValue>>(InternalSelect)

Select.displayName = 'Select'

export default Select
