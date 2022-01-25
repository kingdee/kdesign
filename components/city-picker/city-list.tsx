import React, { useContext } from 'react'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import CityPanelItem, { City } from './city-panel-item'
import NoData from './no-data'

type CityList = {
  [key: string]: Array<City>
}

export interface CityListProps {
  groupKeys?: Array<string> | null
  cityList?: Array<Array<City>>
  onSelect?: (city: City) => void
}

const CityList: React.FC<CityListProps> = (props) => {
  const { getPrefixCls, prefixCls } = useContext(ConfigContext)
  const { groupKeys, cityList, onSelect: handleSelect } = props
  const cityPickerPrefixCls = getPrefixCls!(prefixCls, 'city-picker')
  const tableCls = classNames(`${cityPickerPrefixCls}-city-table`)
  const tableGroupCls = classNames(`${cityPickerPrefixCls}-city-table-group`)
  const keyCls = classNames(`${cityPickerPrefixCls}-city-table-key`)
  const itemContainerCls = classNames(`${cityPickerPrefixCls}-city-table-item-container`)
  const hasData =
    cityList &&
    cityList.some((citys) => {
      return citys.length > 0
    })

  if (!hasData) {
    return (
      <div className={tableCls}>
        <NoData />
      </div>
    )
  }

  return (
    <div className={tableCls}>
      {groupKeys &&
        groupKeys.length > 0 &&
        groupKeys.map((key, index) => {
          const list = cityList![index] || []
          return (
            <div className={tableGroupCls} key={key}>
              <div className={keyCls}>{key}</div>
              <div className={itemContainerCls}>
                {list.map((city) => {
                  return <CityPanelItem key={city.id} city={city} onSelect={handleSelect} />
                })}
              </div>
            </div>
          )
        })}
      {!groupKeys &&
        cityList &&
        cityList!.map((citys) => {
          return citys.map((city) => {
            return <CityPanelItem key={city.id} city={city} onSelect={handleSelect} />
          })
        })}
    </div>
  )
}

export default CityList
