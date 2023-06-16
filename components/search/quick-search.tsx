import React, { useContext, useState, useRef, useCallback, useLayoutEffect, useMemo } from 'react'
import classNames from 'classnames'
import debounce from 'lodash/debounce'
import ConfigContext from '../config-provider/ConfigContext'
// import { getCompProps } from '../_utils'
import { IQuickSearchProps, LabeledValue } from './interface'
import { toArray } from '../_utils/react-children'
import usePopper from '../_utils/usePopper'
import Option from './option'
import { Icon } from '../index'
import { getStringToArray } from '../_utils/arrayUtil'

const INPUT_MIN_WIDTH = 4 // 输入框最小宽度

const InternalQuickSearch: React.ForwardRefRenderFunction<IQuickSearchProps> = (props: any, ref: unknown) => {
  const {
    getPrefixCls,
    prefixCls,
    // compDefaultProps: userDefaultProps,
    locale: { getLangMsg },
  } = useContext(ConfigContext)
  // const quickSearchProps = getCompProps('QuickSearch', userDefaultProps, props)
  const {
    prefixCls: customPrefixcls,
    className,
    placeholder,
    style,
    desc,
    dropdownStyle,
    tags = [],
    children,
    onBlur,
    onFocus,
    onChange,
    onSelect,
    onSearch,
    disabled,
    borderType,
    ...others
  } = props

  const realChildren = Array.isArray(tags) && tags.length ? tags : toArray(children) // tags配置项和默认children

  const innerRef = useRef<HTMLElement>()
  const quickSearchRef = (ref as any) || innerRef
  const dropDownRef = useRef<any>(null)
  const inputRef = useRef<any>(null)
  const measureRef = React.useRef<HTMLSpanElement>(null)

  const [isFocused, setIsFocused] = useState(false) // input focus
  const [optionShow, setOptionShow] = useState<boolean>(false) // 下拉列表是否展示
  const [searchValue, setSearchValue] = useState('') // input输入值
  const [tagsList, setTagsList] = useState<LabeledValue[]>([]) // tags
  const [inputWidth, setInputWidth] = useState(INPUT_MIN_WIDTH) // 输入框宽度
  const [selectedIndex, setSelectedIndex] = useState(0) // 下拉选中 默认第一个

  // 处理智能搜索props
  const getNlpSearchProps = () => {
    const { nlpSearch } = props
    if (!nlpSearch) return {}
    return {
      isSupportNlpSearch: true,
      nlpSearchLoading: false,
      nlpSearchResult: {},
      ...(typeof nlpSearch === 'object' ? nlpSearch : null),
    }
  }

  const { isSupportNlpSearch, nlpSearchLoading, onNlpSearch, nlpSearchResult } = getNlpSearchProps()
  const onNlpSearchDebounce = useMemo(() => debounce((val) => onNlpSearch?.(val), 300), [onNlpSearch])
  useLayoutEffect(() => {
    measureRef.current && setInputWidth(measureRef.current.scrollWidth)
    setOptionShow(!!searchValue)
  }, [searchValue])

  const quickSearchPrefixCls = getPrefixCls!(prefixCls, 'quick-search', customPrefixcls)

  const quickSearchCls = classNames(quickSearchPrefixCls, className, {
    [`${quickSearchPrefixCls}-focused`]: isFocused || tagsList.length,
    [`${quickSearchPrefixCls}-disabled`]: disabled,
    [`${quickSearchPrefixCls}-borderless`]: borderType === 'none',
    [`${quickSearchPrefixCls}-border`]: borderType === 'bordered',
  })

  const quickSearchSelectorCls = classNames({
    [`${quickSearchPrefixCls}-selector`]: true,
    [`${quickSearchPrefixCls}-selector-disabled`]: disabled,
  })

  const inputCls = classNames({
    [`${quickSearchPrefixCls}-input`]: true,
  })

  // 下拉列表样式
  const dropDownCls = classNames({
    [`${quickSearchPrefixCls}-dropdown`]: true,
  })

  const dropContentCls = classNames({
    [`${quickSearchPrefixCls}-dropdown-scroll`]: true,
  })

  const setInputFocus = () => {
    setIsFocused(true)
    inputRef.current && inputRef.current.focus()
  }

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setIsFocused(true)
      onFocus && onFocus?.(event)
    },
    [onFocus],
  )

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setIsFocused(false)
      setSelectedIndex(0)
      onBlur && onBlur?.(event)
    },
    [onBlur],
  )

  const handleAddTagsList = (addTag: any) => {
    setTagsList([...tagsList, addTag])
    setSelectedIndex(0)
    setSearchValue('')
    setOptionShow(false)
    setInputFocus()
  }

  const handleKeyDownDel = (val: string, tags: any) => {
    if (!val && tags.length) {
      const popItem = tags.pop()
      setTagsList(tags)
      setSearchValue(popItem?.label as string)
    }
  }

  const handleKeyDownUp = (index: number, length: number) => {
    // index 为下标 length为长长度
    let currentIndex = index
    if (index === 0) {
      currentIndex = length - 1
    } else {
      currentIndex--
    }
    setSelectedIndex(currentIndex)
  }

  const handleKeyDownDown = (index: number, length: number) => {
    let currentIndex = index
    if (index === length - 1) {
      currentIndex = 0
    } else {
      currentIndex++
    }
    setSelectedIndex(currentIndex)
  }

  const handleKeyDownEnter = (val: string, index: number) => {
    if (!val) {
      const seletedKeyList = getParamsListByKey(tagsList, 'value')
      const formatedTagList = tagsList.map((item) => ({ ...item, label: formatSelectedTagsLabel(item.label || '') }))
      onChange && onChange?.(seletedKeyList, formatedTagList)
      return
    }
    if (realChildren[index]) {
      let selectedTag: LabeledValue = realChildren[index]
      if (
        realChildren[index].props &&
        (realChildren[index].type.displayName === 'Option' || realChildren[index].type.name === 'Option')
      ) {
        const { value, tag } = realChildren[index].props
        selectedTag = { value, tag }
      }
      handleAddTagsList({ ...selectedTag, label: val })
      handleOption({ ...selectedTag, label: val })
    } else {
      const tag = getLangMsg('Search', 'nplDesc')
      handleAddTagsList({ tag, ...nlpSearchResult })
      handleOption({ tag, ...nlpSearchResult })
    }
    setSelectedIndex(0)
    setSearchValue('')
    setOptionShow(false)
    setInputFocus()
  }

  const onKeyDown = (e: any) => {
    const val = e.target.value
    let tagsLength = realChildren.length
    const hasNlpSearchResult = isSupportNlpSearch && !nlpSearchLoading
    if (hasNlpSearchResult) {
      tagsLength++
    }
    switch (e.keyCode) {
      // backspace
      case 8:
        !val && e.preventDefault()
        handleKeyDownDel(val, JSON.parse(JSON.stringify(tagsList), e))
        break
      // enter
      case 13:
        handleKeyDownEnter(val, selectedIndex)
        break
      // up
      case 38:
        !canShowDesc() && handleKeyDownUp(selectedIndex, tagsLength)
        break
      // down
      case 40:
        !canShowDesc() && handleKeyDownDown(selectedIndex, tagsLength)
        break
      default:
        break
    }
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value
    setSearchValue(val)
    onSearch && onSearch?.(event)
    isSupportNlpSearch && onNlpSearchDebounce?.(val)
  }

  const getParamsListByKey = <LabeledValue, K extends keyof LabeledValue>(params: LabeledValue[], key: K) =>
    params.map((param) => param[key])

  const handleOption = (selectedTag: LabeledValue) => {
    const { value, label } = selectedTag
    const formatedTag = { ...selectedTag, label: formatSelectedTagsLabel(label || '') }
    handleAddTagsList(selectedTag)
    const seletedKeyList = [...getParamsListByKey(tagsList, 'value'), value]
    const formatedTagList = tagsList.map((item) => ({ ...item, label: formatSelectedTagsLabel(item.label || '') }))
    onChange && onChange?.(seletedKeyList, [...formatedTagList, formatedTag])
    onSelect && onSelect?.(value, formatedTag)
    setSearchValue('')
  }

  const handleDelSelectedTags = (e: React.MouseEvent, index: number) => {
    e.stopPropagation()
    const newTagsList = tagsList.filter((_item, ind) => {
      return index !== ind
    })
    setTagsList(newTagsList)
    setInputFocus()
    onChange && onChange?.(getParamsListByKey(newTagsList, 'value'), newTagsList)
  }

  const renderSelectedTags = () => {
    return (
      <>
        {tagsList.map((item, index) => {
          const formatTag = formatSearchValue(item.label as string)
          return (
            <div key={index} className={classNames({ [`${quickSearchPrefixCls}-selection-overflow-item`]: true })}>
              <span
                className={classNames({ [`${quickSearchPrefixCls}-selection-overflow-item-tag`]: true })}
                title={item.tag}
              >
                {item.tag}
              </span>
              <span
                className={classNames({ [`${quickSearchPrefixCls}-selection-overflow-item-label`]: true })}
                title={formatTag}
              >
                {formatTag}
              </span>
              <Icon
                className={classNames({ [`${quickSearchPrefixCls}-selection-overflow-item-del`]: true })}
                type="close-solid"
                onClick={(e) => handleDelSelectedTags(e, index)}
              />
            </div>
          )
        })}
      </>
    )
  }

  const getInputPlaceholder = () => {
    return placeholder || getLangMsg('Search', 'placeholder')
  }

  // 实现input placeholder
  const renderPlaceholder = () => {
    if (tagsList.length > 0 || searchValue) return null
    return (
      <span className={classNames({ [`${quickSearchPrefixCls}-selection-placeholder`]: true })}>
        {getInputPlaceholder()}
      </span>
    )
  }

  const handleClickInputFosus = (e: any) => {
    e.stopPropagation()
    !disabled && setInputFocus()
  }

  const renderSelect = () => {
    return (
      <div className={quickSearchCls} ref={quickSearchRef} style={style} onClick={handleClickInputFosus} {...others}>
        <span className={classNames({ [`${quickSearchPrefixCls}-prefix`]: true })}>
          <Icon type="search" />
        </span>
        <div className={quickSearchSelectorCls}>
          <div
            className={classNames({ [`${quickSearchPrefixCls}-selection-overflow`]: true })}
            onClick={handleClickInputFosus}
          >
            {renderSelectedTags()}
            {renderPlaceholder()}
            <div className={`${quickSearchPrefixCls}-selection-search`} style={{ width: inputWidth }}>
              <input
                ref={inputRef}
                value={searchValue}
                className={inputCls}
                onChange={handleSearchChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={onKeyDown}
              />
              <span ref={measureRef} className={`${quickSearchPrefixCls}-selection-search-mirror`}>
                {searchValue}&nbsp;
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const formatSelectedTagsLabel = (val: string) => (val.indexOf(' ') !== -1 ? getStringToArray(val) : val)

  const formatSearchValue = (val: string) => getStringToArray(val).join(` ${getLangMsg('Search', 'or')} `)

  const renderOption = (child: any, index: number, val: string, isFormatVal = true) => {
    if (child?.props && (child.type?.displayName === 'Option' || child.type?.name === 'Option')) {
      return (
        <Option
          key={index}
          {...child.props}
          index={index}
          selectedIndex={selectedIndex}
          searchValue={val}
          onChangeSelect={handleOption}
          isFormatVal={isFormatVal}
        />
      )
    }
    return (
      <Option
        key={index}
        index={index}
        selectedIndex={selectedIndex}
        value={child?.value}
        tag={child?.tag}
        searchValue={val}
        onChangeSelect={handleOption}
        isFormatVal={isFormatVal}
      />
    )
  }

  // 是否展示下拉提示
  const canShowDesc = () => {
    return !searchValue && !tagsList.length
  }

  // loading
  const renderLoading = () => {
    const loadingItemPrefixCls = classNames({ [`${quickSearchPrefixCls}-npl-loading-item`]: true })
    return (
      <div className={classNames({ [`${quickSearchPrefixCls}-npl-loading`]: true })}>
        {/* <Spin type="container" /> */}
        <span className={loadingItemPrefixCls} />
        <span className={loadingItemPrefixCls} />
        <span className={loadingItemPrefixCls} />
        <span className={loadingItemPrefixCls} />
      </div>
    )
  }

  // 智能搜索
  const renderNlpSearch = () => {
    const tag = getLangMsg('Search', 'nplDesc')
    const { value, label } = nlpSearchResult
    return (
      <div className={classNames({ [`${quickSearchPrefixCls}-npl`]: true })}>
        {nlpSearchLoading ? renderLoading() : renderOption({ tag, value }, realChildren.length, label, false)}
      </div>
    )
  }

  // 下拉列表为空时显示的内容
  const renderNotContent = () => {
    // 下拉列表为空
    const emptyListCls = classNames({
      [`${quickSearchPrefixCls}-dropdown-empty`]: true,
    })
    // const { notFoundContent } = quickSearchProps
    const { notFoundContent } = props
    const emptyContent = notFoundContent || getLangMsg('Search', 'emptyTip')
    // 当输入tags为空并且input的输入值不为空时展示
    return realChildren.length === 0 && searchValue && <div className={emptyListCls}>{emptyContent}</div>
  }

  // 下拉列表
  const renderDropDownContent = (tagsTorender: any, heightStyle: any) => {
    return (
      <div className={dropContentCls} style={heightStyle}>
        {tagsTorender}
        {isSupportNlpSearch && renderNlpSearch()}
      </div>
    )
  }

  // 下拉提示
  const renderDesc = () => {
    const dropDoenDescCls = classNames({
      [`${quickSearchPrefixCls}-dropdown-desc`]: true,
    })
    const dropDoenDesc = desc || (getLangMsg('Search', 'desc') as string)
    return (
      <>
        {dropDoenDesc.map((item: string, index: number) => (
          <div className={dropDoenDescCls} key={index} title={dropDoenDesc}>
            {item}
          </div>
        ))}
      </>
    )
  }

  const renderDropDown = () => {
    // dropdownRender 自定义下拉列表 待完成
    // const { listHeight } = quickSearchProps
    const { listHeight } = props
    let tagsTorender = realChildren
    if (Array.isArray(realChildren) && realChildren.length > 0) {
      tagsTorender = realChildren.map((item: any, index: number) => {
        if (item === null || item === undefined) return
        const temp = renderOption(item, index, searchValue)
        return temp
      })
    }

    const heightStyle = {
      maxHeight: listHeight || '300px',
    }

    // 下拉框style属性
    const dropDownStyle = Object.assign({ width: style?.width }, dropdownStyle)
    return (
      <div className={dropDownCls} style={dropDownStyle} ref={dropDownRef}>
        {canShowDesc() ? renderDesc() : renderDropDownContent(tagsTorender, heightStyle)}
        {renderNotContent()}
      </div>
    )
  }

  const catchStyle = () => {
    if (quickSearchRef?.current) {
      const { width } = quickSearchRef.current?.getBoundingClientRect()
      return { width: dropdownStyle?.width || (width > 75 ? width : 75), zIndex: 1050 }
    }
  }

  const canShowDropDown = () => {
    return (!searchValue && !tagsList.length) || searchValue
  }

  const handleVisibleChange = (visible: boolean) => {
    if (visible) {
      canShowDropDown() && setOptionShow(visible)
      return
    }
    setIsFocused(false)
    setOptionShow(visible)
  }

  const popperProps = {
    ...props,
    placement: 'bottomLeft',
    popperStyle: catchStyle(),
    defaultVisible: optionShow,
    visible: optionShow,
    prefixCls: `${quickSearchPrefixCls}-dropdown-wrapper`,
    onVisibleChange: handleVisibleChange,
  }

  return usePopper(renderSelect(), renderDropDown(), popperProps)
}

const QuickSearch = React.forwardRef<unknown, IQuickSearchProps>(InternalQuickSearch)

QuickSearch.displayName = 'QuickSearch'

export default QuickSearch
