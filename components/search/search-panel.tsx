import React, { useEffect, useRef, useState, useContext, useCallback } from 'react'
import classNames from 'classnames'
import { Input, Tooltip, Icon, Spin, Image } from '../index'
import ConfigContext from '../config-provider/ConfigContext'

interface ISearchPanelProps {
  suffix?: React.ReactNode
  placeholder?: string
  panelSearch?: PanelSearchProps
}

export interface PanelSearchProps {
  onPanelSearch?: () => void
  onPanelSelect?: () => void
  onPanelChange?: () => void
  panelResult?: resultProps
  panelTypes?: ItypeProps
  panelSearchLoading?: boolean
  displayImg?: React.ReactNode
}

interface ItypeProps {
  label?: string
  code?: string | number
}

export interface resultProps {
  title?: string
  typeName?: string
  subTitle?: string
  icon?: React.ReactNode
  cloud?: string
  id?: string | number
}

const InternalSearchPanel: React.ForwardRefRenderFunction<ISearchPanelProps> = (props: any, ref: unknown) => {
  const thisSearchPanelRef = useRef<HTMLElement>()
  const searchPanelRef = (ref as any) || thisSearchPanelRef
  const tooltipRef = useRef<HTMLDivElement>(null)

  const { locale } = useContext(ConfigContext)

  const { prefixCls, className, style, placeholder, suffix, panelSearch = {} } = props
  const searchLanMsg = locale.getCompLangMsg({ componentName: 'Search' })
  const {
    panelTypes,
    panelResult = [],
    onPanelSelect,
    onPanelSearch,
    onPanelChange,
    panelSearchLoading = false,
    displayList,
    displayImg,
  } = panelSearch

  const [visible, setVisible] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState('')
  const [type, setType] = useState<ItypeProps>(Array.isArray(panelTypes) && panelTypes.length ? panelTypes[0] : {})
  const [result, setResult] = useState<resultProps>({})

  useEffect(() => {
    setResult(Array.isArray(panelResult) && panelResult.length ? panelResult[0] : {})
  }, [panelResult])

  const searchPanelCls = classNames(className, {
    [`${prefixCls}-panel`]: true,
  })

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    onPanelChange({ ...type, value: e.target.value })
  }

  const handleMouseOver = (item: resultProps) => {
    setResult(item)
  }

  const handleSelect = (item: resultProps) => {
    onPanelSelect(item)
  }

  const handleSearch = () => {
    onPanelSearch({ ...type, value: inputValue })
  }

  const onVisibleChange = (visible: boolean) => {
    setVisible(visible)
  }

  const handleSelectType = (item: ItypeProps) => {
    setType(item)
    setVisible(false)
    inputValue && onPanelChange?.({ ...item, value: inputValue })
  }

  const text = () => {
    return (
      <div className={`${prefixCls}-panel-type`}>
        {panelTypes.map((item: ItypeProps, index: number) => (
          <span
            key={index}
            className={`${prefixCls}-panel-type-list${
              item.code === type.code ? ` ${prefixCls}-panel-type-list-active` : ''
            }`}
            onClick={() => handleSelectType(item)}
          >
            {/* <span>
              <Icon type="right-bold" />
            </span> */}
            {item.label}
          </span>
        ))}
      </div>
    )
  }

  const renderDisplayListShow = useCallback((left: string, right: any) => {
    const leftContent = left && right ? `${left}: ` : ''
    const rightContent = right || ''
    return `${leftContent}${rightContent}`
  }, [])
  const getMoreInputValue = locale.getLangMsg('Search', 'viewMoreResult', { inputValue: inputValue })
  return (
    <>
      <div ref={searchPanelRef} className={searchPanelCls} style={style}>
        <div className={`${prefixCls}-panel-wrapper`}>
          <div ref={tooltipRef} className={`${prefixCls}-panel-tooltip-content`}>
            <Tooltip
              placement="bottomLeft"
              visible={visible}
              trigger="click"
              onVisibleChange={onVisibleChange}
              tip={text()}
              popperClassName={`${prefixCls}-panel-tooltip`}
              getTriggerElement={(ele) => tooltipRef.current || ele}
            >
              <div className={`${prefixCls}-panel-recommend`}>
                <div style={{ whiteSpace: 'nowrap' }}>{type.label}</div>
                <span
                  className={`${prefixCls}-panel-recommend-icon`}
                  style={{ transform: `${visible ? 'rotate(180deg)' : 'rotate(0deg)'}` }}
                >
                  <Icon type="arrow-down" />
                </span>
              </div>
            </Tooltip>
          </div>
          <Input
            placeholder={placeholder || locale.getLangMsg('Search', 'placeholder')}
            borderType="none"
            allowClear
            suffix={suffix}
            onChange={handleSearchChange}
          />
        </div>
        <div
          className={`${prefixCls}-panel-dropDown`}
          style={inputValue ? { visibility: 'visible', opacity: 1 } : { visibility: 'hidden', height: 0, opacity: 0 }}
        >
          <div className={`${prefixCls}-panel-dropDown-result`}>
            <div className={`${prefixCls}-panel-dropDown-result-wrapper`}>
              {Array.isArray(panelResult) &&
                panelResult.map((item: resultProps, index: number) => (
                  // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
                  <div
                    className={`${prefixCls}-panel-dropDown-result-list${
                      item.id === result.id ? ` ${prefixCls}-panel-dropDown-result-list-active` : ''
                    }`}
                    key={index}
                    onMouseOver={() => handleMouseOver(item)}
                    onClick={() => handleSelect(item)}
                  >
                    {item.icon && <img src={item.icon as string} alt="img" />}
                    <div style={{ display: 'flex', justifyContent: 'space-between', flex: 1 }}>
                      <div style={{ width: '60%' }}>
                        <div className={`${prefixCls}-panel-dropDown-result-list-title`} title={item.title}>
                          {item.title}
                        </div>
                        <div className={`${prefixCls}-panel-dropDown-result-list-type`}>{item.typeName}</div>
                      </div>
                      <div className={`${prefixCls}-panel-dropDown-result-list-sub-title`}>{item.subTitle}</div>
                    </div>
                  </div>
                ))}
            </div>
            {/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */}
            <div
              className={`${prefixCls}-panel-dropDown-search${
                result.id === 'search' ? ` ${prefixCls}-panel-dropDown-search-active` : ''
              }`}
              onMouseOver={() => handleMouseOver({ id: 'search' })}
              onClick={handleSearch}
            >
              <Icon style={{ fontSize: 18 }} type="search" />
              <span className={`${prefixCls}-panel-dropDown-search-value`}>{`“${inputValue}”`}</span>
            </div>
            {panelSearchLoading && (
              <span className={`${prefixCls}-panel-dropDown-loading`}>
                <Spin type="container" />
              </span>
            )}
          </div>
          <div className={`${prefixCls}-panel-dropDown-summary`}>
            <div className={`${prefixCls}-panel-dropDown-summary-pic`}>
              {typeof displayImg === 'string' ? <Image src={displayImg} preview={false} /> : displayImg}
            </div>
            <div className={`${prefixCls}-panel-dropDown-summary-title`}>
              {result.id === 'search' ? getMoreInputValue : result.title}
            </div>
            {result.id === 'search' ? (
              <div className={`${prefixCls}-panel-dropDown-summary-list`}>{`${searchLanMsg.range}: ${type.label}`}</div>
            ) : (
              Object.keys(displayList).map((item: keyof typeof result, index) => (
                <div key={index} className={`${prefixCls}-panel-dropDown-summary-list`}>
                  {renderDisplayListShow(displayList[item], result[item])}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  )
}

const SearchPanel = React.forwardRef<unknown, ISearchPanelProps>(InternalSearchPanel)

SearchPanel.displayName = 'SearchPanel'

export default SearchPanel
