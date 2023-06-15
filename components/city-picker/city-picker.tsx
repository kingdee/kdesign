import React, { useContext, useState, useRef, useEffect } from 'react'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import CityPanelItem, { City } from './city-panel-item'
import CityPanel, { Common, Group, List as CityList } from './city-panel'
import SearchPanel from './city-search-panel'
import usePopper, { PopperProps } from '../_utils/usePopper'

export interface CityPickerProps {
  cityList?: CityList
  className?: string
  commons?: Common
  disabled?: boolean
  groups?: Group
  inputClassName?: string
  inputStyle?: React.CSSProperties
  placeholder?: string
  showTitle?: boolean
  style?: React.CSSProperties
  title?: string
}

export interface MenuType extends React.FC<CityPickerProps> {
  PanelItem: typeof CityPanelItem
  Panel: typeof CityPanel
  SearchPanel: typeof SearchPanel
}

const CityPicker: MenuType = ({
  cityList,
  className,
  commons,
  disabled,
  groups,
  inputClassName,
  inputStyle,
  placeholder,
  showTitle,
  style,
  title,
}) => {
  const { getPrefixCls, prefixCls } = useContext(ConfigContext)

  const [inputVal, setInputVal] = useState('')
  const [additionalVal, setAdditionalVal] = useState('')
  const [popperVisible, setPopperVisible] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const allCity = useRef<Array<City> | null>([])

  useEffect(() => {
    if (!cityList) {
      return
    }
    const { domestic, foreign } = cityList
    allCity.current = [...Object.values(domestic), ...Object.values(foreign)].reduce((arr, current) => {
      return arr.concat(current)
    }, [])
  }, [cityList])

  const cityPickerPrefixCls = getPrefixCls!(prefixCls, 'city-picker')
  const containerCls = classNames(`${cityPickerPrefixCls}-container`, className)
  const contentCls = classNames(`${cityPickerPrefixCls}-content`)
  const titleCls = classNames(`${cityPickerPrefixCls}-title`)
  const additionalInfoCls = classNames(`${cityPickerPrefixCls}-info`)
  const inputCls = classNames(`${cityPickerPrefixCls}-input`, inputClassName)
  const arrowCls = classNames('kdicon kdicon-arrow-down', `${cityPickerPrefixCls}-arrow`, {
    'arrow-up': popperVisible,
  })

  const handleContainerClick = () => {
    if (document.activeElement === inputRef.current) {
      return
    }
    inputRef.current?.focus()
  }

  const handleCitySelect = (city: City) => {
    setInputVal(city.name || '')
    const otherInfoStr =
      city.country === '中国' ? `${city.province}` : `${city.province}${city.province ? ',' : ''}${city.country}`
    setAdditionalVal(otherInfoStr)
    setPopperVisible(false)
  }

  const handleFocus = () => {
    if (popperVisible) {
      return
    }

    setPopperVisible(true)
  }

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target
    setAdditionalVal('')
    setInputVal(value)
  }

  const handlePopperVisibleChange = (visible: boolean) => {
    if (!visible) {
      setPopperVisible(false)
    }
  }

  const inputSelector = (
    <div className={containerCls} style={style} onClick={handleContainerClick}>
      {showTitle && <div className={titleCls}>{title}</div>}
      <div className={contentCls}>
        <input
          ref={inputRef}
          type="text"
          readOnly={disabled}
          onChange={handleChange}
          placeholder={placeholder}
          style={inputStyle}
          className={inputCls}
          title={inputVal}
          value={inputVal}
          onFocus={handleFocus}
        />
        <span className={additionalInfoCls}>{additionalVal}</span>
        <i className={arrowCls} />
      </div>
    </div>
  )

  const cityPanel = <CityPanel commons={commons} groups={groups} cityList={cityList} onSelect={handleCitySelect} />

  const getSearchResults = () => {
    if (!allCity.current || allCity.current.length === 0 || !inputVal) {
      return []
    }
    return allCity.current.filter((city) => {
      return city.name?.startsWith(inputVal)
    })
  }
  const searchPanel = <SearchPanel keyword={inputVal} data={getSearchResults()} onSelect={handleCitySelect} />

  const popperProps: PopperProps = {
    visible: popperVisible,
    placement: 'bottomLeft',
    trigger: 'focus',
    prefixCls: `${cityPickerPrefixCls}-panel`,
    onVisibleChange: handlePopperVisibleChange,
  }
  const panel = inputVal.length > 0 ? searchPanel : cityPanel
  return usePopper(inputSelector, panel, popperProps)
}

CityPicker.displayName = 'CityPicker'
CityPicker.PanelItem = CityPanelItem
CityPicker.Panel = CityPanel
CityPicker.SearchPanel = SearchPanel
export default CityPicker
