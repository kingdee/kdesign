import React, { useContext, useRef, useState, useEffect, useLayoutEffect, useCallback } from 'react'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { getCompProps } from '../_utils'
import { IAdvancedSelectorProps, IIndxPosListProps, IColumnsProps, ISearchInfoProps, IOptionsProps } from './interface'
import { Input, Icon, Tabs, Empty, Spin, Checkbox } from '../index'
import usePopper from '../_utils/usePopper'

const InternalBaseData: React.ForwardRefRenderFunction<IAdvancedSelectorProps> = (
  props: IAdvancedSelectorProps,
  ref: unknown,
): React.FunctionComponentElement<any> => {
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps, locale } = useContext(ConfigContext)
  const advancedSelectortProps = getCompProps('BaseData', userDefaultProps, props)
  const baseDataLangMsg = locale.getCompLangMsg({ componentName: 'BaseData' })
  const {
    prefixCls: customPrefixcls,
    className,
    mode,
    disabled,
    delimiter = '，',
    placeholder = locale.getLangMsg('global', 'selectholder'),
    showDetailIcon,
    showFrequent,
    showCollectIcon,
    columns,
    options = [],
    value,
    optionLabelProp,
    size,
    style,
    dropdownFooterRender,
    collectList = [],
    historyList = [],
    loading,
    searchField,
    dropdownStyle,
    onChange,
    onSearch,
    onSelect,
    onShowDetail,
    onCollect,
    onShowMore,
    onVisibleChange,
  } = advancedSelectortProps

  const isMultiple = mode === 'multiple' // 是否多选

  const [seletedOptions, setSeletedOptions] = useState<any[]>([])
  const [inputValue, setInputValue] = useState('')
  const [indxPosList, setIndxPosList] = useState<IIndxPosListProps[]>([])
  const [showTotal, setShowTotal] = useState(false)
  const [isFocused, setFocused] = useState(false)
  const [optionShow, setOptionShow] = useState(!!props.visible)

  const innerRef = useRef<HTMLElement>()
  const advancedSelectorRef = (ref as any) || innerRef
  const inputRef = useRef<any>()

  const searchInfo = useRef<ISearchInfoProps>({
    previousInputValue: '',
    searchIndex: 0,
    editOptions: [],
    selectionStart: 0,
    previousEditValue: '',
    deleteEndIndx: 0,
  })

  const advancedSelectorfixCls = getPrefixCls!(prefixCls, 'baseData', customPrefixcls)
  // class
  const advancedSelectorCls = classNames(advancedSelectorfixCls, className, {
    [`${advancedSelectorfixCls}-disabled`]: disabled,
  })

  // 多选模式下 维护新增选中的下标
  useEffect(() => {
    searchInfo.current.searchIndex = seletedOptions.length
    searchInfo.current.editOptions = seletedOptions
  }, [seletedOptions])

  // 记录每个选项的开始与结束下标
  const setValIndxPosition = useCallback(
    (str = '') => {
      const arr: IIndxPosListProps[] = []
      ;(str || inputValue)
        .split(delimiter)
        .filter((item: string) => !!item)
        .reduce((pre: number, next: string) => {
          arr.push({ start: pre, end: pre + next.length })
          return pre + next.length + 1
        }, 0)
      return arr
    },
    [delimiter, inputValue],
  )

  const initInputValue = (searchInfo.current.editOptions || [])
    .filter((item) => !!item)
    .reduce(
      (pre: string, next: any, index, arr) =>
        `${pre}${next[optionLabelProp]}${index !== arr.length - 1 ? delimiter : ''}`,
      '',
    )

  const initIndexPos = setValIndxPosition(initInputValue)

  useEffect(() => {
    const list = setValIndxPosition()
    setIndxPosList(list)
  }, [setValIndxPosition])

  useEffect(() => {
    let seletedItems = []
    // 多选
    if (isMultiple && Array.isArray(value)) {
      seletedItems = value
    }
    // 单选
    if (!isMultiple && value) {
      seletedItems = [value]
    }
    setSeletedOptions(seletedItems)
    searchInfo.current.editOptions = [...seletedItems]
  }, [value, isMultiple])

  useEffect(() => {
    if (!searchInfo.current.previousEditValue) return
    const posList = setValIndxPosition()
    const preValueArr = getStrToArr(searchInfo.current.previousEditValue, delimiter)
    const valueArr = getStrToArr(inputValue, delimiter)
    const selectionStart = inputRef.current?.input?.selectionStart || 0
    const index = findSelectionIndex(selectionStart, posList)
    searchInfo.current.searchIndex = index
    // 新增一个
    const list = [...(searchInfo.current.editOptions || [])]
    if (valueArr.length - preValueArr.length === 1) {
      list.splice(index, 0, null)
    }
    if (valueArr.length < preValueArr.length) {
      const val = searchInfo.current.previousEditValue
      /**
       * selectionStart 被删除的字符串开始下标
       * deleteEndIndx 被删除的字符串结束下标
       * 多选时，判断删除的字符包含了几个已选项
       * 单选时，判断selectionStart与deleteEndIndx相等（都为0），则表示选项被删除
       */
      const deleteEndIndx = isMultiple ? val.length - inputValue.length + selectionStart : 0
      const { start, end } = findDeleteInterval(selectionStart, deleteEndIndx, indxPosList)
      list?.splice(start, end - start + 1)
    }
    // 判断每次单个按del键时删除了分隔符后下一次触发
    if (searchInfo.current.deleteEndIndx > 0 && selectionStart !== searchInfo.current.deleteEndIndx) {
      const { start, end } = findDeleteInterval(selectionStart, searchInfo.current.deleteEndIndx, initIndexPos)
      // 单个删除时找到合理的下标触发
      if (start !== null && end !== null && start <= end) {
        list?.splice(start, end - start + 1)
        searchInfo.current.deleteEndIndx = 0
      }
    }
    searchInfo.current.editOptions = list
    searchInfo.current.previousEditValue = inputValue
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delimiter, inputValue, isMultiple, setValIndxPosition])

  const getStrToArr = (str = '', delimiter: string) => {
    return str.split(delimiter).filter((item) => item)
  }

  // 当选中项文字超出输入框时，显示共多少项
  useLayoutEffect(() => {
    const inputDom = inputRef.current?.input
    if (!inputDom) return
    if (inputDom.scrollWidth - inputDom.offsetWidth > 0 && inputValue) {
      setShowTotal(true)
    } else {
      setShowTotal(false)
    }
  }, [inputRef, inputValue])

  // 通过选中项显示input文字， optionLabelProp为回填到选择框的属性
  const setValueBySeleted = useCallback(() => {
    const defaultInputValue = seletedOptions.reduce(
      (pre: string, next: any, index, arr) =>
        `${pre}${next[optionLabelProp]}${index !== arr.length - 1 ? delimiter : ''}`,
      '',
    )
    searchInfo.current.previousInputValue = defaultInputValue
    setInputValue(defaultInputValue)
    searchInfo.current.previousEditValue = `${defaultInputValue}${delimiter}`
  }, [delimiter, optionLabelProp, seletedOptions])

  useEffect(() => {
    setValueBySeleted()
  }, [setValueBySeleted])

  const findDeletedChar = (prev: string, current: string) => {
    if (prev.length > current.length) {
      for (let i = 0; i < prev.length; i++) {
        if (prev[i] !== current[i]) {
          return prev[i]
        }
      }
      return prev[prev.length - 1]
    }
    return null
  }

  const changeInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptionShow(true)
    const textValue = e.target.value
    let val = textValue
    const inputDom = inputRef.current?.input
    const selectionStart = inputDom.selectionStart || 0 // selectionStart: 光标前面有几个字符
    if (isMultiple && inputDom && textValue && textValue.length > inputValue.length) {
      searchInfo.current.selectionStart = selectionStart

      const isInHead = selectionStart === 1 && textValue[1] !== delimiter && textValue.length !== 1 // 在首部添加
      const isInMid =
        selectionStart !== textValue.length &&
        textValue[selectionStart - 2] === delimiter &&
        textValue[selectionStart] !== delimiter
      if (isInHead || isInMid) {
        inputDom.value = val =
          textValue.substring(0, selectionStart) + delimiter + textValue.substring(selectionStart, textValue.length)
        setCursorPosition(inputDom, selectionStart)
      }
    }
    // 单个删除时 当删除的字符为分隔符delimiter 记录位置
    if (findDeletedChar(searchInfo.current.previousEditValue || '', textValue) === delimiter) {
      searchInfo.current.deleteEndIndx = selectionStart
    }
    setInputValue(val)
    handleChange(val)
  }

  const handleChange = (val: string) => {
    const str = getQueryStr(val)
    searchInfo.current.searchValue = str
    onSearch?.(str)
  }

  const getQueryStr = (queryStr: string) => {
    if (!isMultiple) {
      return queryStr
    }
    if (inputRef.current && queryStr) {
      if (queryStr.indexOf(delimiter) < 0) {
        // 只有一条记录
        return queryStr
      }

      const selectionStart = inputRef.current?.input?.selectionStart || 0
      const startIndex = queryStr.slice(0, selectionStart).lastIndexOf(delimiter) + 1 // 光标前面最近分隔符index
      let endIndex = queryStr.slice(selectionStart).indexOf(delimiter)
      endIndex = endIndex === -1 ? queryStr.length : selectionStart + endIndex // 光标后面最近分隔符index
      queryStr = queryStr.slice(startIndex, endIndex)
      return queryStr
    }
    return queryStr
  }

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = () => {
    if (disabled) return
    setFocused(true)
    isMultiple && seletedOptions.length && setInputValue(`${inputValue}${delimiter}`)
  }

  const handleBlur = () => {
    if (disabled) return
    setFocused(false)
    setInputValue(searchInfo.current.previousInputValue)
    searchInfo.current.previousEditValue = `${searchInfo.current.previousInputValue}${delimiter}`
    // 多选失去焦点时，通过editOptions去改写选中项
    const list = (searchInfo.current.editOptions || []).filter((item) => item) || []
    if (JSON.stringify(list) !== JSON.stringify(seletedOptions)) {
      onChange?.(
        list.filter((item) => item).map((v) => v.value),
        list.filter((item) => item),
      )
    }
    if (value !== undefined) {
      return
    }
    setSeletedOptions(list)
  }

  const showInputTotal = () => {
    if (disabled) return
    const inputDom = inputRef.current?.input
    if (inputDom) {
      const scrollToWidth = inputDom.scrollWidth - inputDom.offsetWidth
      inputDom.scrollLeft = scrollToWidth
      setTimeout(() => {
        setCursorPosition(inputDom, inputValue.length + 1)
      }, 0)
    }
  }

  const handleShowDetail = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    onShowDetail?.(seletedOptions)
  }

  const handleShowMore = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    onShowMore?.()
  }

  // 设置光标位置
  const setCursorPosition = (element: any, prePosition: number) => {
    if (element.setSelectionRange) {
      // Chrome Firefox
      element.focus()
      window.setTimeout(element.setSelectionRange(prePosition, prePosition), 0)
    } else if (element.createTextRange) {
      // 兼容IE
      const range = element.createTextRange
      range.collapse(true)
      range.moveEnd('character', prePosition)
      range.moveStart('character', prePosition)
      range.select()
    }
  }

  // 双击选中当前项
  const handleDoubleClick = () => {
    const inputDom = inputRef.current?.input
    const { start, end } = findDbClickSelectedPos(inputDom?.selectionStart || 0, inputDom?.selectionEnd || 0)
    handleSeletedText(inputDom, start, end)
  }

  const findDbClickSelectedPos = (selectionStart: number, selectionEnd: number) => {
    for (let index = 0; index < indxPosList.length; index++) {
      const item: any = indxPosList[index]
      if (item.start <= selectionStart && item.end >= selectionEnd) {
        return item
      }
    }
    return {}
  }

  // 多选，找到光标停留的当前项的下标
  const findSelectionIndex = (selectionStart: number, posList: IIndxPosListProps[]) => {
    let indx = 0
    for (let index = 0; index < posList.length; index++) {
      const v: IIndxPosListProps = posList[index]
      if (v.start <= selectionStart && v.end >= selectionStart) {
        indx = index
      }
    }
    return indx
  }

  /**
   * 找出删除项的下标
   *
   * @param start 删除时文字光标的起始位置
   * @param end 删除时文字光标的终止位置
   * @param posList 每个选中项的下标区间
   */
  const findDeleteInterval = (start: number, end: number, posList: IIndxPosListProps[]) => {
    const delIndex: any = {
      start: null,
      end: null,
    }
    for (let index = 0; index < posList.length; index++) {
      const v: IIndxPosListProps = posList[index]
      if (v.start >= start && delIndex.start === null) delIndex.start = index
      if (v.end <= end) delIndex.end = index
    }
    return delIndex
  }

  const handleSeletedText = (element: any, start: number, end: number) => {
    element.setSelectionRange(start, end)
  }

  const handleSelect = (item: any) => {
    searchInfo.current.searchValue = undefined
    if (seletedOptions.findIndex((v) => v.value === item.value) !== -1) {
      const list = seletedOptions.filter((v) => v.value !== item.value)
      // 取消选中(非受控状态下)
      isMultiple && value === undefined && setSeletedOptions(list)
      onChange?.(
        list.filter((item) => item).map((v) => v.value),
        list.filter((item) => item),
      )
      return
    }
    const list = [...(searchInfo.current.editOptions || [])]
    list?.splice(searchInfo.current.searchIndex || 0, 1, item)
    if (isMultiple) {
      onChange?.(
        (list || []).filter((item) => item).map((v) => v.value),
        (list || []).filter((item) => item),
      )
    } else {
      onChange?.(item.value, item)
    }
    onSelect?.(item.value, item)

    if (value !== undefined) {
      return
    }

    searchInfo.current.editOptions = list
    setSeletedOptions((list || []).filter((item) => item))
  }

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.checked ? options : []
    onChange(
      list.map((item: any) => item.value),
      list,
    )

    if (value !== undefined) {
      return
    }

    setSeletedOptions(list)
  }

  const handleCollect = useCallback(
    (item: any, flag: boolean) => {
      onCollect?.(flag, item)
    },
    [onCollect],
  )

  const isShowDetailBtn = showDetailIcon && !isMultiple && !isFocused

  const renderAdvancedSelector = () => {
    const totalText = locale.getLangMsg('BaseData', 'total', { total: seletedOptions.length })
    return (
      <div className={advancedSelectorCls} ref={advancedSelectorRef} style={style}>
        <Input
          ref={inputRef}
          borderType="none"
          disabled={disabled}
          onChange={changeInputText}
          placeholder={placeholder}
          value={inputValue}
          onDoubleClick={handleDoubleClick}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {showTotal && !isFocused && isMultiple && (
          <span className={`${advancedSelectorfixCls}-total`} onClick={showInputTotal}>
            {totalText}
          </span>
        )}
        {isShowDetailBtn && !disabled && (
          <span className={`${advancedSelectorfixCls}-detail`} onClick={handleShowDetail}>
            <Icon type="material" />
          </span>
        )}
        {!disabled && (
          <span className={`${advancedSelectorfixCls}-suffix`} onClick={handleShowMore}>
            <Icon type="search" />
          </span>
        )}
      </div>
    )
  }

  // 渲染下拉列表框
  const renderContent = () => {
    return (
      <div className={`${advancedSelectorfixCls}-dropdown`}>
        {searchInfo.current.searchValue ? renderDropdownContent(options, columns, true, true) : renderHistoryContent()}
      </div>
    )
  }

  /**
   * 判断Checkbox半选状态
   *
   * @param {string[]} value 选中项数组
   * @returns {boolean}
   */
  const getIndeterminate = useCallback(
    (value: any[]) => {
      return value.length > 0 && value.length < options.length
    },
    [options],
  )

  const getChecked = (value: any[]) => options.length && value.length === options.length

  /**
   * 渲染下拉列表
   *
   * @param {IOptionsProps} data 下拉列表的数据
   * @param {IColumnsProps} myColumns 下拉列表的展示列
   * @param {boolean} showFooter 是否显示下拉框footer
   * @param {boolean} showCheckbox 是否显示多选框
   * @returns {React.ReactNode}
   */
  const renderDropdownContent = (data: any[], myColumns: IColumnsProps[], showFooter = false, showCheckbox = false) => {
    const dropDownColumns =
      myColumns && Array.isArray(myColumns)
        ? myColumns
        : data && Array.isArray(data) && data.length
        ? Object.keys(data[0]).map((v) => ({ key: v }))
        : []

    const indeterminate = getIndeterminate(seletedOptions)
    const checked = getChecked(seletedOptions)

    return (
      <>
        {myColumns && Array.isArray(myColumns) && (
          <div className={`${advancedSelectorfixCls}-dropdown-columns`}>
            {dropDownColumns.map((item: IColumnsProps, index) => (
              <span key={item.key} className={`${advancedSelectorfixCls}-dropdown-columns-item`} title={item.title}>
                {isMultiple && index === 0 && showCheckbox && (
                  <Checkbox
                    style={{ marginRight: 5 }}
                    checked={checked}
                    indeterminate={indeterminate}
                    onChange={handleSelectAll}
                  />
                )}
                {item.title}
              </span>
            ))}
          </div>
        )}
        {loading ? (
          <div className={`${advancedSelectorfixCls}-dropdown-loading`}>
            <Spin />
          </div>
        ) : data.length ? (
          renderOptionsContent(data, dropDownColumns, showCheckbox)
        ) : (
          renderNotContent()
        )}
        {showFooter && dropdownFooterRender && (
          <div className={`${advancedSelectorfixCls}-dropdown-footer`}>{dropdownFooterRender}</div>
        )}
      </>
    )
  }

  /**
   * 渲染收藏图标
   *
   * @param {IOptionsProps} item
   * @returns {React.ReactNode}
   */
  const renderCollect = useCallback(
    (item: IOptionsProps) => (
      <span
        className={`${advancedSelectorfixCls}-dropdown-options-item-collect`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {collectList.findIndex((v: any) => v.value === item.value) === -1 ? (
          <Icon
            className={`${advancedSelectorfixCls}-dropdown-options-item-collect-not-icon`}
            type="collect"
            onClick={() => handleCollect(item, true)}
          />
        ) : (
          <Icon
            className={`${advancedSelectorfixCls}-dropdown-options-item-collect-icon`}
            type="star"
            onClick={() => handleCollect(item, false)}
            style={{ visibility: 'visible' }}
          />
        )}
      </span>
    ),
    [advancedSelectorfixCls, collectList, handleCollect],
  )

  const renderSearchValue = (item: any, column: IColumnsProps) =>
    searchField === 'all' || searchField === column.key ? findSearchValue(item[column.key]) : item[column.key]

  /**
   * 渲染下拉项
   *
   * @param {IOptionsProps} data 下拉列表的数据
   * @param {IColumnsProps} myColumns 下拉列表的展示列
   * @param {boolean} showCheckbox 是否显示多选框
   * @returns {React.ReactNode}
   */
  const renderOptionsContent = (data: IOptionsProps[], myColumns: IColumnsProps[], showCheckbox = false) => {
    return (
      <>
        {data.map((item: any, index) => {
          if (index + 1 > size) {
            return null
          }
          return (
            <div
              key={item.value}
              className={classNames(`${advancedSelectorfixCls}-dropdown-options`, {
                selected: seletedOptions.some((v) => v.value === item.value),
              })}
              onMouseDown={() => handleSelect(item)}
            >
              {myColumns.map((column: IColumnsProps, index) => (
                <span
                  key={column.key}
                  className={`${advancedSelectorfixCls}-dropdown-options-item`}
                  title={item[column.key]}
                >
                  {isMultiple && showCheckbox && index === 0 && (
                    <Checkbox
                      style={{ marginRight: 5 }}
                      value={item.value}
                      checked={seletedOptions.some((v) => v.value === item.value)}
                    />
                  )}
                  {renderSearchValue(item, column)}
                  {showCollectIcon && myColumns.length - 1 === index && renderCollect(item)}
                </span>
              ))}
            </div>
          )
        })}
      </>
    )
  }

  /**
   * 标注出搜索的文字
   *
   * @param {string} title 搜索的文字
   * @returns {React.ReactNode}
   */
  const findSearchValue = (title: string) => {
    const { searchValue = '' } = searchInfo.current
    const index = title.indexOf(searchValue)
    const beforeStr = title.substr(0, index)
    const afterStr = title.substr(index + searchValue.length)
    const content =
      index > -1 ? (
        <span>
          {beforeStr}
          <span className={`${advancedSelectorfixCls}-dropdown-options-item-search`}>{searchValue}</span>
          {afterStr}
        </span>
      ) : (
        <span>{title}</span>
      )
    return content
  }

  const renderHistoryContent = () => {
    if (!showFrequent) {
      return null
    }
    return (
      <Tabs defaultActiveKey="history">
        <Tabs.TabPane key="history" tab={baseDataLangMsg.history}>
          {renderDropdownContent(historyList, columns)}
        </Tabs.TabPane>
        <Tabs.TabPane key="collect" tab={baseDataLangMsg.favorites}>
          {renderDropdownContent(collectList, columns)}
        </Tabs.TabPane>
      </Tabs>
    )
  }

  const renderNotContent = useCallback(
    () => (
      <div className={`${advancedSelectorfixCls}-dropdown-empty`}>
        <Empty />
      </div>
    ),
    [advancedSelectorfixCls],
  )

  const catchStyle = () => {
    if (advancedSelectorRef?.current) {
      return { width: dropdownStyle?.width || 330, zIndex: 1050 }
    }
  }

  const handleVisibleChange = (visible: boolean) => {
    onVisibleChange?.(visible)
    if (props.visible !== undefined) return
    if (visible) {
      isFocused && setOptionShow(visible)
      return
    }
    setOptionShow(visible)
  }

  const popperProps = {
    popperStyle: catchStyle(),
    placement: 'bottomLeft',
    ...advancedSelectortProps,
    defaultVisible: optionShow,
    visible: optionShow,
    prefixCls: `${advancedSelectorfixCls}-dropdown-wrapper`,
    onVisibleChange: handleVisibleChange,
  }

  return usePopper(renderAdvancedSelector(), renderContent(), popperProps)
}

const BaseData = React.forwardRef<unknown, IAdvancedSelectorProps>(InternalBaseData)

BaseData.displayName = 'BaseData'
export default BaseData
