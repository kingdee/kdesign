import React, { useContext, useRef, useEffect, useState, useCallback, useMemo } from 'react'
import { useMergedState } from '../_utils/hooks'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { getCompProps } from '../_utils'
import { Icon, Tabs, Spin } from '../index'
import { CityPickerProps, CityList, Type, City } from './interface'
import usePopper from '../_utils/usePopper'
import Option from './option'
import escapeRegExp from 'lodash/escapeRegExp'
import KeyCode from '../_utils/KeyCode'
import isObject from 'lodash/isObject'

const getCityId = (data: City | string | number) => {
  if (isObject(data)) {
    return data?.id
  }
  return data
}

const InternalSelect: React.ForwardRefRenderFunction<CityPickerProps> = (props: any, ref: unknown) => {
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps, locale } = useContext(ConfigContext)
  const selectProps = getCompProps('CityPicker', userDefaultProps, props)
  const cityPickerLangMsg = locale.getCompLangMsg({ componentName: 'CityPicker' })
  const {
    type,
    size,
    value,
    className,
    defaultOpen,
    disabled,
    borderType,
    showArrow = true,
    allowClear,
    prefixCls: customPrefixcls,
    onFocus,
    onBlur,
    onClear,
    onVisibleChange,
    onChange,
    onSearch,
    defaultValue,
    placeholder,
    dropdownStyle = {},
    style,
    clearIcon,
    loading,
    showDescription,
    description,
    optionHighlightProps,
    popperStyle = {},
    commonList = [],
    domesticList = [],
    foreignList = [],
    itemRender,
    onTabPaneChange,
  } = selectProps
  const [initValue, setInitValue] = useMergedState(undefined, {
    value: getCityId(value),
    defaultValue: getCityId(defaultValue),
  })
  const tabsData = [
    { id: 'domestic', name: cityPickerLangMsg?.tabsDomestic },
    { id: 'foreign', name: cityPickerLangMsg?.tabsInternation },
  ]
  const innerRef = useRef<HTMLElement>()
  const selectRef = (ref as any) || innerRef
  const searchRef = useRef<any>(null) // 搜索框ref
  const selectionRef = useRef<any>(null)
  const clearRef = useRef<HTMLSpanElement>(null)
  const optionsListRef = useRef<HTMLDivElement>(null)

  const [optionShow, setOptionShow] = useState<boolean>(
    typeof props.visible === 'undefined' ? !!defaultOpen : !!props.visible,
  )
  const [searchValue, setSearchValue] = useState<any>('')
  const [focusd, setFocusd] = useState(false)
  const [afterChangeFocus, setAfterChangeFocus] = useState(false)
  const [seletedCity, setSeletedCity] = useState<City | null>(null)
  const [tabsValue, setTabsValue] = useState<Type>('domestic')

  const isDomestic = (type: Type) => type === 'domestic'

  const selectPrefixCls = getPrefixCls!(prefixCls, 'city-picker', customPrefixcls)
  const cityPickerCls = classNames(selectPrefixCls, className, {
    [`${selectPrefixCls}-visible`]: optionShow,
  })

  const selectionCls = classNames({
    [`${selectPrefixCls}-selector`]: true,
  })

  // 公共样式
  const commCls = classNames({
    [`${selectPrefixCls}-bordered`]: borderType === 'bordered',
    [`${selectPrefixCls}-underline`]: borderType === 'underline',
    [`${selectPrefixCls}-borderless`]: borderType === 'none',
    [`${selectPrefixCls}-size-${size}`]: size,
    [`${selectPrefixCls}-wrapper`]: true,
    [`${selectPrefixCls}-show-search`]: focusd,
  })

  useEffect(() => {
    if (typeof value === 'undefined') return
    if (isObject(value)) {
      setSeletedCity(value)
      return
    }
    const cityList = [...commonList, ...domesticList, ...foreignList]
    const city = cityList.find((city) => city.id === value)
    setSeletedCity(city)
  }, [commonList, domesticList, foreignList, value])

  useEffect(() => {
    if (typeof props.visible !== 'undefined') {
      setOptionShow(props.visible)
    }
  }, [props.visible])

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
      setAfterChangeFocus(false)
      onBlur && onBlur(e)
    },
    [onBlur],
  )

  useEffect(() => {
    selectionRef.current.addEventListener('mouseup', (e: MouseEvent) => {
      const isCloseBtn = (e?.target as Element)?.className.indexOf('kd-tag-close-icon') > -1
      if (isCloseBtn) {
        e.stopPropagation()
      }
    })
  }, [])

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
    onClear && onClear('')
    setInitValue('')
    setSeletedCity(null)
    setSearchValue('')
    onChange && onChange(undefined, '')
  }

  // 渲染后缀图标
  const renderSuffix = () => {
    if (disabled) return null
    const { suffixIcon } = selectProps
    const arrowIconCls = classNames({
      [`${selectPrefixCls}-icon-arrow`]: true,
      [`${selectPrefixCls}-icon-arrow-up`]: optionShow,
      [`${selectPrefixCls}-icon-arrow-down`]: !optionShow,
      [`${selectPrefixCls}-icon-arrow-focus`]: optionShow,
    })

    const iconShow = allowClear && !disabled && ((initValue ?? '') !== '' || searchValue)

    return (
      <>
        {iconShow && (
          <span
            onClick={handleReset}
            onMouseDown={(e) => e.preventDefault()}
            className={`${selectPrefixCls}-icon-clear`}
            ref={clearRef}
          >
            {clearIcon || <Icon type="close" />}
          </span>
        )}
        {showArrow && <span className={arrowIconCls}>{suffixIcon || <Icon type="arrow-down" />}</span>}
      </>
    )
  }

  // 下拉列表为空时显示的内容
  const renderNotContent = (msg: string) => {
    const { notFoundContent } = selectProps
    const emptyContent = notFoundContent || msg
    return <div className={`${selectPrefixCls}-dropdown-empty`}>{emptyContent}</div>
  }

  const getHighlightText = (text: string | undefined, inputValue: string | Array<string>) => {
    if (!inputValue || !text) return text
    const regex = new RegExp(
      Array.isArray(inputValue)
        ? inputValue.map((item) => `(${escapeRegExp(item)})`).join('|')
        : `(${escapeRegExp(inputValue)})`,
      'i',
    )

    const strArr = text?.split(regex)

    return (
      <>
        {strArr?.map((item: string, index: number) =>
          regex?.test(item) ? (
            <span key={index} className={`${selectPrefixCls}-highlight`}>
              {item}
            </span>
          ) : (
            <span key={index}>{item}</span>
          ),
        )}
      </>
    )
  }

  const handleOption = (city: City) => {
    handleVisibleChange(false)
    city.type = tabsValue === 'domestic' ? 'domestic' : 'foreign'
    city?.id !== initValue && onChange?.(city?.id, city)
    searchRef.current?.focus()
    setAfterChangeFocus(true)
    if (typeof value === 'undefined') {
      setSeletedCity(city)
      setInitValue(city?.id)
    }
  }

  const renderNodeList = (data: CityList, notContent: string, isCommon = false) => {
    if (!data.length) {
      return renderNotContent(notContent)
    }
    return (
      <div className={`${selectPrefixCls}-list`} ref={optionsListRef} onMouseDown={(e) => e?.preventDefault()}>
        {data.map((item, index) => {
          return (
            <Option
              key={item.id}
              value={initValue}
              city={item}
              className={searchValue ? `${selectPrefixCls}-list-item-match` : undefined}
              renderCityInfo={(data, flag) => renderCityInfo(data, isCommon, flag)}
              onChangeSelect={handleOption}
              itemRender={itemRender}
              activeIndex={activeIndex}
              index={index}
              onChangeActiveIndex={(i) => {
                setActiveIndex(i)
              }}
            >
              {searchValue ? getHighlightText(item?.name, item?.[optionHighlightProps] || searchValue) : item?.name}
            </Option>
          )
        })}
      </div>
    )
  }

  const renderLoading = () => (
    <div className={`${selectPrefixCls}-dropdown-loading`}>
      <Spin type="container" />
    </div>
  )

  const toggleTabPane = (type: Type) => {
    setTabsValue(type)
    onTabPaneChange?.(type)
  }

  // 渲染下拉列表框
  const renderContent = () => {
    return loading ? (
      renderLoading()
    ) : (
      <>
        {searchValue ? (
          <>
            {isDomestic(type) && (
              <Tabs noContainer onChange={toggleTabPane} activeKey={tabsValue}>
                {tabsData.map((item) => (
                  <Tabs.TabPane key={item.id} tab={item.name}>
                    {item}
                  </Tabs.TabPane>
                ))}
              </Tabs>
            )}

            {tabsValue === 'domestic'
              ? renderNodeList(domesticList, cityPickerLangMsg?.emptyText)
              : renderNodeList(foreignList, cityPickerLangMsg?.emptyText)}
          </>
        ) : (
          <>
            {!!commonList.length && (
              <div className={`${selectPrefixCls}-dropdown-common`}>{cityPickerLangMsg?.common}</div>
            )}
            {renderNodeList(commonList, cityPickerLangMsg?.commonEmptyText, true)}
          </>
        )}
      </>
    )
  }

  const renderCityInfo = useCallback(
    (data: City | null, isCommon = false, flag = false, symbol = ', ') => {
      if (!data) return null
      if (isDomestic(type)) {
        if (isCommon) {
          const curVal = data?.province ? data?.province : data?.country
          return `${flag && curVal ? symbol : ''}${curVal}`
        }
        if (data?.type) {
          const curVal = data.type === 'domestic' ? data?.province || data?.country : data?.country
          return `${flag && curVal ? symbol : ''}${curVal}`
        }
        const curVal = tabsValue === 'domestic' ? data?.province || data?.country : data?.country
        return `${flag && curVal ? symbol : ''}${curVal}`
      } else {
        return `${flag && (data?.province || data?.country) ? symbol : ''}${data?.province}${
          data?.country && data?.province ? symbol : ''
        }${data?.country}`
      }
    },
    [type, tabsValue],
  )

  const renderSingle = () => {
    const hiddenStyle = !!searchValue || (initValue ?? '') !== '' ? { visibility: 'hidden' as const } : undefined
    const itemCls = classNames({
      [`${selectPrefixCls}-content-item`]: true,
      [`${selectPrefixCls}-content-item-seleted`]: afterChangeFocus,
    })
    return (
      <>
        <div className={singleCls} ref={selectionRef}>
          <div className={`${selectPrefixCls}-content`}>
            <span className={`${selectPrefixCls}-content-search`}>
              <input
                ref={searchRef}
                value={searchValue}
                className={`${selectPrefixCls}-content-search-input`}
                onChange={handleSearchChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                readOnly={!!disabled}
              />
              {!searchValue && (
                <span className={itemCls} title={seletedCity?.name}>
                  {seletedCity?.name}
                </span>
              )}
            </span>
            {!searchValue && <span className={`${selectPrefixCls}-content-info`}>{renderCityInfo(seletedCity)}</span>}
          </div>
          <span className={`${selectPrefixCls}-placeholder`} style={hiddenStyle}>
            {!disabled ? placeholder : null}
          </span>
          <span className={`${selectPrefixCls}-suffix`}>{renderSuffix()}</span>
        </div>
      </>
    )
  }

  const singleCls = classNames(commCls, {
    [`${selectPrefixCls}-disabled`]: disabled,
    [`${selectPrefixCls}-focused`]: (!disabled && focusd) || optionShow,
  })

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
  }, [initValue])

  // keyboard
  const curkeyboardList = useMemo(() => {
    if (!searchValue) {
      return commonList
    } else if (tabsValue === 'domestic') {
      return domesticList
    } else {
      return foreignList
    }
  }, [commonList, domesticList, foreignList, searchValue, tabsValue])

  const getActiveIndex = (index: number, offset = 1): number => {
    const len = curkeyboardList.length
    for (let i = 0; i < len; i += 1) {
      const current = (index + i * offset + len) % len
      return current
    }
    return -1
  }

  const [activeIndex, setActiveIndex] = useState(-1)

  const initActiveIndex = (index: number | undefined = undefined) => {
    setActiveIndex(index === undefined ? getActiveIndex(0) : index)
  }

  useEffect(() => {
    initActiveIndex(searchValue ? undefined : -1)
  }, [searchValue, tabsValue, curkeyboardList])

  const onInternalKeyDown: React.KeyboardEventHandler<HTMLSpanElement> = (e) => {
    const { which } = e
    // open
    if (which === KeyCode.ENTER || which === KeyCode.UP || which === KeyCode.DOWN) {
      e.preventDefault()
      setOptionShow(true)
    }
    // up、down、enter、esc
    if (optionShow) {
      let offset = 0
      switch (which) {
        case KeyCode.UP:
          offset = -1
          break
        case KeyCode.DOWN:
          offset = 1
          break
        case KeyCode.ENTER: {
          const item = curkeyboardList[activeIndex]
          if (!item) return
          handleOption(item)
          handleVisibleChange(false)
          break
        }
        case KeyCode.ESC:
          handleVisibleChange(false)
          break
        default:
          break
      }
      if (offset !== 0) {
        const nextActiveIndex = getActiveIndex(activeIndex + offset, offset)
        const curDom = optionsListRef.current?.children?.[nextActiveIndex]
        if (curDom) {
          optionsListRef.current?.children[nextActiveIndex].scrollIntoView({
            behavior: 'auto',
            block: 'nearest',
          })
        }
        setActiveIndex(nextActiveIndex)
        e.preventDefault()
      }
    }
  }

  const renderCityPicker = () => {
    return (
      <div className={cityPickerCls} ref={selectRef} style={style}>
        {showDescription && <span className={`${selectPrefixCls}-description`}>{description}</span>}
        <span
          className={selectionCls}
          tabIndex={disabled ? -1 : 0}
          onFocus={() => searchRef.current?.focus()}
          onBlur={() => searchRef.current?.blur()}
          onKeyDown={onInternalKeyDown}
        >
          {renderSingle()}
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
      initActiveIndex(-1)
    }
    if (visible !== optionShow) {
      props.visible === undefined && setOptionShow(visible)
      onVisibleChange && onVisibleChange(visible)
    }
  }

  const popperProps = {
    ...selectProps,
    prefixCls: `${selectPrefixCls}-dropdown`,
    placement: 'bottomLeft',
    popperStyle: catchStyle(),
    defaultVisible: optionShow,
    visible: optionShow,
    onVisibleChange: handleVisibleChange,
    clickToClose: !searchValue,
    onTransitionEnd: () => {
      if (optionShow === false) {
        handleClear()
      }
    },
  }
  return usePopper(renderCityPicker(), renderContent(), popperProps)
}

const Select = React.forwardRef<unknown, CityPickerProps>(InternalSelect)

Select.displayName = 'CityPicker'

export default Select
