import React, { FunctionComponentElement, useContext, useEffect, useState, useRef, useMemo } from 'react'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { getCompProps } from '../_utils'
import Input from '../input'
import Icon from '../icon'
import Spin from '../spin'
import { TabType, Country, RegionArray, RegionValue, Region } from './interface'
import Popper, { PopperProps } from '../popper'
import { useOnClickOutside } from '../_utils/hooks'
import RegionPickerPanel from './region-picker-panel'
import escapeRegExp from 'lodash/escapeRegExp'

export interface IGeoZonePickerProps {
  style?: Record<string, unknown>
  countryClassName?: string
  regionClassName?: string
  className?: string
  prefixCls?: string
  disabled?: boolean
  children?: React.ReactNode
  level?: number
  bordered?: boolean
  countryList?: Country[]
  geoZoneData?: RegionArray
  provinceGroup?: string[][]
  defaultCountry?: string
  showSearch?: boolean
  tabOptions?: string[]
  onClear?: () => void
  onChange?: (value: RegionValue) => void
  onCountryChange?: (value: Country) => void
}

const GeoZonePicker = (props: IGeoZonePickerProps): FunctionComponentElement<IGeoZonePickerProps> => {
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps, locale } = useContext(ConfigContext)
  const geoZonePickerProps = getCompProps('GeoZonePicker', userDefaultProps, props)
  const geoZonePickerLangMsg = locale.getCompLangMsg({ componentName: 'GeoZonePicker' })
  const {
    className,
    countryClassName,
    regionClassName,
    prefixCls: customPrefixcls,
    disabled,
    level,
    bordered,
    countryList,
    provinceGroup,
    onChange,
    onClear,
    tabOptions = [geoZonePickerLangMsg.Province, geoZonePickerLangMsg.City, geoZonePickerLangMsg.County],
    geoZoneData,
    showSearch,
    defaultCountry,
    onCountryChange,
    ...others
  } = geoZonePickerProps
  const geoZonePickerPrefixCls = getPrefixCls!(prefixCls, 'geo-zone-picker', customPrefixcls)
  const langMsgs = locale.getCompLangMsg({ componentName: 'global' })

  const [currRegionData, setCurrRegionData] = useState<RegionValue | null>(null)
  const [currCountry, setCurrCountry] = useState<Country | null>()
  const [currCountryList, setCurrCountryList] = useState<Country[]>(countryList)
  const [inputValue, setInputValue] = useState<string>('')
  const [searchValue, setSearchValue] = useState<string>('')
  const [currTabKey, setCurrTabKey] = useState<TabType>('PROVINCE')
  const [showCountryPanel, setShowCountryPanel] = useState<boolean>(false)
  const [showRegionPanel, setShowRegionPanel] = useState<boolean>(false)
  const [isCountryMouseEnter, setIsCountryMouseEnter] = useState<boolean>(false)
  const [isRegionMouseEnter, setIsRegionMouseEnter] = useState<boolean>(false)
  const [currProvince, setCurrProvince] = useState<Region | null>(null)
  const [currCity, setCurrCity] = useState<Region | null>(null)
  const [currDistrict, setCurrDistrict] = useState<Region | null>(null)
  const [currGeoZoneData, setCurrGeoZoneData] = useState<RegionArray>(geoZoneData)
  const [loading, setLoading] = useState<boolean>(false)
  const loadingTimeId = useRef()
  const countryPanelRef = useRef<HTMLDivElement | null>(null)
  const countryInputRef = useRef<HTMLDivElement | null>(null)
  const regionPanelRef = useRef<HTMLDivElement | null>(null)
  const regionInputRef = useRef<HTMLDivElement | null>(null)

  const geoZonePickerClass = classNames(geoZonePickerPrefixCls, className, {
    [`${geoZonePickerPrefixCls}-active`]: showCountryPanel || showRegionPanel,
    [`${geoZonePickerPrefixCls}-bordered`]: bordered,
    [`${geoZonePickerPrefixCls}-disabled`]: disabled,
  })

  const countryPanelClass = classNames(countryClassName, {
    [`${geoZonePickerPrefixCls}-country-panel`]: true,
  })
  const regionPanelClass = classNames(regionClassName, {
    [`${geoZonePickerPrefixCls}-region-panel`]: true,
  })
  useEffect(() => {
    if (defaultCountry) {
      const defCountry = countryList.find((el: Country) => el.code === defaultCountry)
      setCurrCountry(defCountry)
      onCountryChange && onCountryChange(defCountry)
    }
  }, [])
  useEffect(() => {
    if (currRegionData) {
      onChange && onChange(currRegionData)
    }
  }, [currRegionData])
  const handleCountryChange = (country: Country) => {
    setCurrCountry(country)
    onCountryChange && onCountryChange(country)
    setShowCountryPanel(false)
    if (country !== currCountry) {
      clear()
    }
  }
  useEffect(() => {
    if (!currCountry) {
      setCurrGeoZoneData([])
    }
  }, [currCountry])

  useEffect(() => {
    setCurrCountryList(countryList)
  }, [countryList])

  useEffect(() => {
    setCurrGeoZoneData(geoZoneData)
  }, [geoZoneData])

  const handleCountrySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    if (loadingTimeId.current) {
      clearTimeout(loadingTimeId.current)
    }
    if (e.target.value === '') {
      setSearchValue('')
      setCurrCountryList(countryList)
      setLoading(false)
      return
    }
    setSearchValue(e.currentTarget.value)
    const currCountrys = countryList?.filter((item: Country) => {
      return item.name?.includes(e.currentTarget.value)
    })
    setCurrCountryList(currCountrys)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  const regionPanelProps = useMemo(
    () => ({
      prefixCls: geoZonePickerPrefixCls,
      regionPanelClass,
      level,
      countryList,
      currGeoZoneData,
      provinceGroup,
      onChange,
      onClear,
      currProvince,
      currCity,
      currDistrict,
      currTabKey,
      tabOptions,
      setCurrProvince,
      setCurrCity,
      setCurrDistrict,
      setCurrRegionData,
      setInputValue,
      setShowRegionPanel,
      setCurrTabKey,
    }),
    [
      countryList,
      currCity,
      currDistrict,
      currGeoZoneData,
      currProvince,
      currTabKey,
      geoZonePickerPrefixCls,
      level,
      onChange,
      onClear,
      provinceGroup,
      regionPanelClass,
      tabOptions,
    ],
  )

  const clear = () => {
    setCurrProvince(null)
    setCurrCity(null)
    setCurrDistrict(null)
    setCurrRegionData(null)
    setInputValue('')
    setCurrTabKey('PROVINCE')
  }
  const handleCountryClear = () => {
    setCurrCountry(null)
    clear()
  }
  const handleRegionClear = () => {
    clear()
  }

  const handleCountryMouseEnter: React.MouseEventHandler<HTMLDivElement> = () => {
    setIsCountryMouseEnter(true)
  }

  const handleCountryMouseLeave: React.MouseEventHandler<HTMLDivElement> = () => {
    setIsCountryMouseEnter(false)
  }
  const handleRegionMouseEnter: React.MouseEventHandler<HTMLDivElement> = () => {
    setIsRegionMouseEnter(true)
  }

  const handleRegionMouseLeave: React.MouseEventHandler<HTMLDivElement> = () => {
    setIsRegionMouseEnter(false)
  }
  const renderLoading = () => (
    <div className={`${geoZonePickerPrefixCls}-country-list-loading`}>
      <Spin type="container"></Spin>
    </div>
  )
  const renderCountryIcon = () => {
    const needClear = currCountry && isCountryMouseEnter
    if (needClear) {
      return (
        <span className={`${geoZonePickerPrefixCls}-clear-icon`} onClick={() => handleCountryClear()}>
          <Icon type="close"></Icon>
        </span>
      )
    } else {
      return (
        <span
          className={classNames(`${geoZonePickerPrefixCls}-country-arrow`, {
            [`${geoZonePickerPrefixCls}-country-arrow-up`]: showCountryPanel,
          })}
          onClick={() => {
            if (disabled) return
            setShowCountryPanel(!showCountryPanel)
          }}
        >
          <Icon type="arrow-down" />
        </span>
      )
    }
  }

  const renderRegionIcon = () => {
    const needClear = currRegionData && isRegionMouseEnter
    if (needClear) {
      return (
        <span className={`${geoZonePickerPrefixCls}-clear-icon`} onClick={() => handleRegionClear()}>
          <Icon type="close"></Icon>
        </span>
      )
    } else {
      return (
        <span
          className={classNames(`${geoZonePickerPrefixCls}-region-arrow`, {
            [`${geoZonePickerPrefixCls}-region-arrow-up`]: showRegionPanel,
          })}
          onClick={() => {
            if (disabled) return
            setShowRegionPanel(!showRegionPanel)
          }}
        >
          <Icon type="arrow-down" />
        </span>
      )
    }
  }

  const getHighlightText = (text: string | undefined, inputValue: string | Array<string>) => {
    if (!inputValue || !text) return
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
            <span key={index} className={`${geoZonePickerPrefixCls}-country-panel-highlight-text`}>
              {item}
            </span>
          ) : (
            <span key={index}>{item}</span>
          ),
        )}
      </>
    )
  }

  const countrySelectorInput = (
    <div
      ref={countryInputRef}
      className={classNames(`${geoZonePickerPrefixCls}-country`, {
        [`${geoZonePickerPrefixCls}-country-hovered`]: isCountryMouseEnter,
        [`${geoZonePickerPrefixCls}-country-border-right-active`]: isRegionMouseEnter,
      })}
      onMouseEnter={handleCountryMouseEnter}
      onMouseLeave={handleCountryMouseLeave}
    >
      <div
        className={classNames(`${geoZonePickerPrefixCls}-country-input`, {
          [`${geoZonePickerPrefixCls}-country-input-active`]: showCountryPanel,
        })}
        onClick={() => {
          if (disabled) return
          setShowCountryPanel(!showCountryPanel)
        }}
      >
        <div className={`${geoZonePickerPrefixCls}-country-input-text`}>{currCountry?.name}</div>
      </div>
      {renderCountryIcon()}
    </div>
  )

  const countrySelectorPanel = () => (
    <div ref={countryPanelRef} className={countryPanelClass}>
      {showSearch && (
        <div className={`${geoZonePickerPrefixCls}-country-panel-search`}>
          <Input
            value={searchValue}
            onChange={handleCountrySearch}
            prefix={<Icon type="search" />}
            borderType="bordered"
            allowClear
          />
        </div>
      )}

      <div className={`${geoZonePickerPrefixCls}-country-list`}>
        {loading && renderLoading()}
        {!loading &&
          (currCountryList && currCountryList.length ? (
            currCountryList.map((country: Country) => {
              return (
                <div
                  className={classNames(`${geoZonePickerPrefixCls}-country-list-item`, {
                    [`${geoZonePickerPrefixCls}-country-list-item-active`]: country.code === currCountry?.code,
                  })}
                  key={country.code}
                  onClick={() => handleCountryChange(country)}
                >
                  {searchValue ? getHighlightText(country.name, searchValue) : country.name}
                </div>
              )
            })
          ) : (
            <div className={`${geoZonePickerPrefixCls}-country-list-empty`}>暂无数据</div>
          ))}
      </div>
    </div>
  )

  const regionInput = (
    <div
      ref={regionInputRef}
      className={classNames(`${geoZonePickerPrefixCls}-region`, {
        [`${geoZonePickerPrefixCls}-region-hovered`]: isRegionMouseEnter,
      })}
      onMouseEnter={handleRegionMouseEnter}
      onMouseLeave={handleRegionMouseLeave}
    >
      <div
        className={classNames(`${geoZonePickerPrefixCls}-region-input`, {
          [`${geoZonePickerPrefixCls}-region-input-active`]: showRegionPanel,
        })}
        onClick={() => {
          if (disabled) return
          setShowRegionPanel(!showRegionPanel)
        }}
      >
        <div className={`${geoZonePickerPrefixCls}-region-input-text`}>
          {inputValue ||
            (currCountry && (
              <span className={`${geoZonePickerPrefixCls}-region-input-placeholder`}>{langMsgs.selectholder}</span>
            ))}
        </div>
      </div>
      {renderRegionIcon()}
    </div>
  )

  const regionPickerPanel = <RegionPickerPanel ref={regionPanelRef} {...regionPanelProps} />

  useOnClickOutside([regionPanelRef, regionInputRef], () => {
    setShowRegionPanel(false)
  })

  useOnClickOutside([countryInputRef, countryPanelRef], () => {
    setShowCountryPanel(false)
  })
  const countryInputpopperProps: PopperProps = {
    prefixCls: `${geoZonePickerPrefixCls}-country-dropdown`,
    placement: 'bottomLeft',
    visible: showCountryPanel,
    popperStyle: { width: '230px', maxHeight: '240px' },
  }
  const regionInputpopperProps: PopperProps = {
    prefixCls: `${geoZonePickerPrefixCls}-region-dropdown`,
    placement: 'bottomLeft',
    visible: showRegionPanel,
  }
  return (
    <div className={geoZonePickerClass} {...others}>
      <Popper tip={countrySelectorPanel()} {...countryInputpopperProps}>
        {countrySelectorInput}
      </Popper>
      <Popper tip={regionPickerPanel} {...regionInputpopperProps}>
        {regionInput}
      </Popper>
    </div>
  )
}

GeoZonePicker.displayName = 'GeoZonePicker'
export default GeoZonePicker
