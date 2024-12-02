import React, { useState, useEffect, forwardRef } from 'react'
import { TabType, RegionArray, Region, RegionValue } from './interface'
import Tabs from '../tabs'
import { generateRegionMap } from './utils'
import classNames from 'classnames'
const TAB_OPTION = [
  {
    id: 'PROVINCE',
    name: '省',
  },
  {
    id: 'CITY',
    name: '市',
  },
  {
    id: 'DISTRICT',
    name: '区',
  },
]
const defaultGroup = [
  ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
  ['H', 'I', 'J', 'K', 'L', 'M', 'N'],
  ['O', 'P', 'Q', 'R', 'S', 'T'],
  ['U', 'V', 'W', 'X', 'Y', 'Z'],
]
interface IRegionPickerPanelProps {
  prefixCls: string
  regionPanelClass: string
  currGeoZoneData: RegionArray
  level: number
  currProvince: Region | null
  currCity: Region | null
  currDistrict: Region | null
  currTabKey: TabType
  provinceGroup?: string[][]
  setCurrProvince: (region: Region | null) => void
  setCurrCity: (region: Region | null) => void
  setCurrDistrict: (region: Region | null) => void
  setCurrTabKey: (tab: TabType) => void
  setCurrRegionData: (data: RegionValue | null) => void
  setInputValue: (val: string) => void
  setShowRegionPanel: (val: boolean) => void
}
const RegionPickerPanel = forwardRef<HTMLDivElement, IRegionPickerPanelProps>((props, ref) => {
  const {
    prefixCls,
    regionPanelClass,
    level,
    currGeoZoneData,
    provinceGroup,
    currProvince,
    currCity,
    currDistrict,
    currTabKey,
    setCurrProvince,
    setCurrCity,
    setCurrDistrict,
    setCurrRegionData,
    setInputValue,
    setShowRegionPanel,
    setCurrTabKey,
  } = props
  const [provinceData, setProvinceData] = useState<Record<string, RegionArray>>({})
  const [group, setGroup] = useState<string[][]>(provinceGroup || defaultGroup)
  const [tabOption, setTabOption] = useState(TAB_OPTION)
  const showChange = (key: TabType) => {
    setCurrTabKey(key)
  }
  const handleOnClick = (data: Region) => {
    if (currTabKey === 'PROVINCE') {
      setCurrDistrict(null)
      setCurrCity(null)
      setCurrProvince(data)
      setInputValue && setInputValue(data.name)
      if (!data.children || data.children.length === 0 || level === 1) {
        setCurrRegionData && setCurrRegionData({ provinceCode: data.code, provinceName: data.name })
        setShowRegionPanel && setShowRegionPanel(false)
        return
      }
      if (data.children && data.children.length === 1 && level > 1) {
        setCurrCity(data.children[0])
        const inputVal = data?.name + '/' + data.children[0].name
        setInputValue && setInputValue(inputVal)
        if (level === 3) {
          setCurrTabKey('DISTRICT')
          return
        }
        setCurrRegionData && setCurrRegionData({ cityCode: data.children[0].code, cityName: data.children[0].name })
        setShowRegionPanel && setShowRegionPanel(false)
      }
      setCurrTabKey('CITY')
    } else if (currTabKey === 'CITY') {
      setCurrCity(data)
      const inputVal = currProvince?.name + '/' + data.name
      setInputValue && setInputValue(inputVal)
      if (!data.children || data.children.length === 0 || level === 2) {
        setCurrRegionData && setCurrRegionData({ cityCode: data.code, cityName: data.name })
        setShowRegionPanel && setShowRegionPanel(false)
      }
      level === 3 && setCurrTabKey('DISTRICT')
    } else {
      setCurrDistrict(data)
      const inputVal = currProvince?.name + '/' + currCity?.name + '/' + data.name
      setInputValue && setInputValue(inputVal)
      setShowRegionPanel && setShowRegionPanel(false)

      const result = {
        provinceCode: currProvince?.code,
        provinceName: currProvince?.name,
        cityCode: currCity?.code,
        cityName: currCity?.name,
        districtCode: data.code,
        districtName: data.name,
      }
      setCurrRegionData && setCurrRegionData(result)
    }
  }

  const handleComputedDisabled = (tabName: string) => {
    if (tabName === 'CITY') {
      return !!(!currProvince?.children || currProvince?.children.length === 0)
    }
    if (tabName === 'DISTRICT') {
      return !!(!currCity?.children || currCity?.children.length === 0)
    }
  }

  const renderRegionSeletion = () => {
    if (currTabKey === 'PROVINCE') {
      return (
        <div className={`${prefixCls}-region-panel-province-container`}>
          {Object.keys(provinceData).map((item, index) => {
            return (
              <div key={index} className={`${prefixCls}-region-panel-province`}>
                <div className={`${prefixCls}-region-panel-province-group`}>{item}</div>
                <div className={`${prefixCls}-region-panel-province-list`}>
                  {provinceData[item].map((item) => {
                    return (
                      <div
                        className={classNames(`${prefixCls}-region-panel-province-item`, {
                          [`${prefixCls}-region-panel-province-item-active`]: item.code === currProvince?.code,
                        })}
                        key={item.code}
                        onClick={() => handleOnClick(item)}
                      >
                        {item.name}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      )
    }
    if (currTabKey === 'CITY' && level > 1) {
      return (
        <div className={`${prefixCls}-region-panel-city`}>
          {currProvince?.children?.map((item) => {
            return (
              <div
                className={classNames(`${prefixCls}-region-panel-city-item`, {
                  [`${prefixCls}-region-panel-city-item-active`]: item.code === currCity?.code,
                })}
                key={item.code}
                onClick={() => handleOnClick(item)}
              >
                {item.name}
              </div>
            )
          })}
        </div>
      )
    }
    if (currTabKey === 'DISTRICT' && level === 3) {
      return (
        <div className={`${prefixCls}-region-panel-district`}>
          {currCity?.children?.map((item) => {
            return (
              <div
                className={classNames(`${prefixCls}-region-panel-district-item`, {
                  [`${prefixCls}-region-panel-district-item-active`]: item.code === currDistrict?.code,
                })}
                key={item.code}
                onClick={() => handleOnClick(item)}
              >
                {item.name}
              </div>
            )
          })}
        </div>
      )
    }
  }

  useEffect(() => {
    if (!currGeoZoneData) return
    console.log(group, currGeoZoneData)
    setProvinceData(generateRegionMap(group, currGeoZoneData))
  }, [currGeoZoneData])

  useEffect(() => {
    if (provinceGroup) {
      setGroup(provinceGroup)
    }
  }, [group])

  useEffect(() => {
    setTabOption(tabOption.slice(0, level))
  }, [level])

  return (
    <div className={regionPanelClass} ref={ref}>
      <div className={`${prefixCls}-region-panel-tabs`}>
        <Tabs activeKey={currTabKey} onChange={showChange}>
          {tabOption.map((item) => (
            <Tabs.TabPane key={item.id} tab={item.name} disabled={handleComputedDisabled(item.id)} />
          ))}
        </Tabs>
      </div>
      {renderRegionSeletion()}
    </div>
  )
})
RegionPickerPanel.displayName = 'RegionPickerPanel'

export default React.memo(RegionPickerPanel)
