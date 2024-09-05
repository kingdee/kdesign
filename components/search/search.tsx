import React, { useCallback, useContext, useRef, useState } from 'react'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import QuickSearch from './quick-search'
import SearchPanel from './search-panel'
import { getCompProps } from '../_utils'
import { Input, Icon } from '../index'
import { ISearchProps, SearchSizeTypes, BorderTypes, IQuickSearchProps, SearchTypes } from './interface'
import devWarning from '../_utils/devwarning'

const InternalSearch: React.ForwardRefRenderFunction<ISearchProps, IQuickSearchProps> = (props: any, ref: unknown) => {
  const thisSearchRef = useRef<HTMLElement>()
  const searchRef = (ref as any) || thisSearchRef

  const {
    getPrefixCls,
    prefixCls,
    compDefaultProps: userDefaultProps,
    locale: { getLangMsg },
  } = useContext(ConfigContext)
  const searchProps = getCompProps('Search', userDefaultProps, props)
  const {
    prefixCls: customPrefixcls,
    className,
    style,
    size,
    disabled,
    onPressEnter,
    prefix,
    suffix,
    borderType,
    children,
    type,
    placeholder,
    value,
    defaultValue,
    allowClear,
    onSearch,
    onFocus,
    onBlur,
    ...restProps
  } = searchProps
  devWarning(SearchSizeTypes.indexOf(size) === -1, 'search', `cannot found search size '${size}'`)
  devWarning(BorderTypes.indexOf(borderType) === -1, 'search', `cannot found search borderType '${borderType}'`)
  devWarning(SearchTypes.indexOf(type) === -1, 'search', `cannot found search Search type '${type}'`)

  const [focused, setFocused] = useState(false)

  const searchPrefixCls = getPrefixCls!(prefixCls, 'search', customPrefixcls)

  const searchCls = classNames(searchPrefixCls, className, {
    [`${searchPrefixCls}-size-${size}`]: size,
    [`${searchPrefixCls}-disabled`]: disabled,
    [`${searchPrefixCls}-focused`]: focused && !disabled,
    [`${searchPrefixCls}-borderless`]: borderType === 'none',
    [`${searchPrefixCls}-border`]: borderType === 'bordered',
  })

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onSearch && onSearch?.(event)
    },
    [onSearch],
  )

  const handlePressEnter = useCallback(
    (_: string, event: React.KeyboardEvent) => {
      onPressEnter && onPressEnter?.(searchRef.current?.input?.value, event)
    },
    [onPressEnter, searchRef],
  )

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setFocused(true)
      onFocus && onFocus(event)
    },
    [onFocus],
  )

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setFocused(false)
      onBlur && onBlur(event)
    },
    [onBlur],
  )

  const renderPrefix = useCallback(() => {
    if (!prefix) {
      return null
    }
    return prefix && typeof prefix === 'boolean' ? (
      <span className={`${searchPrefixCls}-prefix`}>
        <Icon type="search" />
      </span>
    ) : (
      prefix
    )
  }, [prefix, searchPrefixCls])

  const renderSuffix = useCallback(() => {
    if (!suffix) {
      return null
    }
    return typeof suffix === 'boolean' && suffix ? (
      <span className={`${searchPrefixCls}-suffix`}>
        <Icon className="kd-search-prefix" type="search" />
      </span>
    ) : (
      suffix
    )
  }, [suffix, searchPrefixCls])

  if (type === 'quick-search') {
    return (
      <QuickSearch
        {...restProps}
        ref={ref}
        borderType={borderType}
        disabled={disabled}
        onSearch={onSearch}
        className={className}
        style={style}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {children}
      </QuickSearch>
    )
  }

  if (type === 'panel') {
    // prefixCls后面需要跟传下去的props合并
    return <SearchPanel {...searchProps} prefixCls={searchPrefixCls} />
  }

  return (
    <div className={searchCls} style={style} {...restProps}>
      <Input
        value={value}
        defaultValue={defaultValue}
        allowClear={allowClear}
        ref={searchRef}
        size={size}
        disabled={disabled}
        placeholder={placeholder || getLangMsg('Search', 'placeholder')}
        borderType="none"
        prefix={renderPrefix()}
        suffix={renderSuffix()}
        onChange={handleSearchChange}
        onPressEnter={handlePressEnter}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  )
}

const Search = React.forwardRef<unknown, ISearchProps>(InternalSearch)

Search.displayName = 'Search'

export default Search
