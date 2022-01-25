import React, { useContext, useState, useEffect } from 'react'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import CityGroup from './city-group'
import CityList from './city-list'
import { City } from './city-panel-item'
import grouping from './utils/grouping'

export type CityGroups = 'domestic' | 'foreign'
export type Common = Record<CityGroups, Array<City>>
export type Group = Record<CityGroups, Array<string>>
export type List = Record<CityGroups, Citys>

export type Citys = {
  [key: string]: Array<City>
}

export interface CityPanelProps {
  commons?: Common
  groups?: Group
  cityList?: List
  onSelect?: (city: City) => void
}

const CityPanel: React.FC<CityPanelProps> = ({ groups, commons, cityList, onSelect }) => {
  const { getPrefixCls, prefixCls, locale: globalLocale } = useContext(ConfigContext)

  const cityPickerLang = globalLocale.getCompLangMsg({ componentName: 'CityPicker' })

  const [activedIndex, setActivedIndex] = useState<CityGroups>('domestic')
  const [cityGroups, setCityGroups] = useState<Record<CityGroups, Array<string>>>({ domestic: [], foreign: [] })
  const [groupKeys, setGroupKeys] = useState<Array<string> | null>(null)
  const [activedGroupIndex, setActivedGroupIndex] = useState(0)
  const [list, setList] = useState<Array<Array<City>>>([commons ? commons.domestic : []])

  useEffect(() => {
    if (!groups) {
      return
    }
    let { domestic, foreign } = groups
    domestic = grouping(domestic)
    foreign = grouping(foreign)

    if (commons?.domestic) {
      domestic.unshift(cityPickerLang.common)
    }

    if (commons?.foreign) {
      foreign.unshift(cityPickerLang.common)
    }

    setCityGroups({ domestic, foreign })
  }, [groups, commons])

  useEffect(() => {
    if (commons) {
      setList([commons[activedIndex]])
    } else {
      const groups = cityGroups[activedIndex]
      const currentGroup = groups[0]
      const currentGroups = (currentGroup || '').split('')
      const newList: Array<Array<City>> = []
      const currentList = cityList![activedIndex]
      currentGroups.forEach((character) => {
        const temp = currentList[character] ? currentList[character] : []
        newList.push(temp)
      })
      setList(newList)
      setGroupKeys(currentGroups)
    }
    setActivedGroupIndex(0)
  }, [activedIndex, cityGroups, groups, cityList])

  const cityPickerPrefixCls = getPrefixCls!(prefixCls, 'city-picker')
  const containerCls = classNames(`${cityPickerPrefixCls}-panel-container`)
  const headerCls = classNames(`${cityPickerPrefixCls}-header`)
  const contentContainerCls = classNames(`${cityPickerPrefixCls}-content-container`)
  const domesticCls = classNames(`${cityPickerPrefixCls}-tab-item ${cityPickerPrefixCls}-header-domestic`, {
    active: activedIndex === 'domestic',
  })
  const internationalCls = classNames(`${cityPickerPrefixCls}-tab-item ${cityPickerPrefixCls}-header-internation`, {
    active: activedIndex === 'foreign',
  })

  const handleDomesticClick = () => {
    if (activedIndex === 'domestic') return
    setActivedIndex('domestic')
  }

  const handleInternationClick = () => {
    if (activedIndex === 'foreign') return
    setActivedIndex('foreign')
  }

  /**
   * 分组变换事件
   * @param index 分组索引
   */
  const handleGroupChange = (index: number) => {
    if (!cityList) {
      return
    }
    const groups = cityGroups[activedIndex]
    const currentGroup = groups[index]
    if (commons && currentGroup === cityPickerLang.common) {
      setList([commons[activedIndex] || []])
      setGroupKeys(null)
      return
    }

    const currentGroups = (currentGroup || '').split('')
    const newList: Array<Array<City>> = []
    const currentList = cityList![activedIndex]
    currentGroups.forEach((character) => {
      const temp = currentList[character] ? currentList[character] : []
      newList.push(temp)
    })

    setList(newList)
    setGroupKeys(currentGroups)
    setActivedGroupIndex(index)
  }

  const handleSelectCity = (city: City) => {
    onSelect?.(city)
  }

  const isClassified = commons && commons.domestic && commons.foreign
  return (
    <div className={containerCls}>
      {isClassified && (
        <div className={headerCls}>
          <div className={domesticCls} onClick={handleDomesticClick}>
            {cityPickerLang.domestic}
          </div>
          <div className={internationalCls} onClick={handleInternationClick}>
            {cityPickerLang.internation}
          </div>
        </div>
      )}
      <div className={contentContainerCls}>
        <CityGroup groups={cityGroups[activedIndex]} activedIndex={activedGroupIndex} changeIndex={handleGroupChange} />
        <CityList groupKeys={groupKeys} cityList={list} onSelect={handleSelectCity} />
      </div>
    </div>
  )
}

export default CityPanel
