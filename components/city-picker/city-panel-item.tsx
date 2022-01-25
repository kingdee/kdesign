import React, { useContext } from 'react'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'

export type City = {
  id: string
  country?: string
  province?: string
  name?: string
}

export interface CityPanelItemProps {
  city: City
  onSelect?: (city: City) => void
}

const CityPanelItem: React.FC<CityPanelItemProps> = (props) => {
  const { getPrefixCls, prefixCls } = useContext(ConfigContext)
  const { city, onSelect } = props

  const cityPickerPrefixCls = getPrefixCls!(prefixCls, 'city-picker')
  const cls = classNames(`${cityPickerPrefixCls}-city-table-cell`)
  const handleCitySelect = () => {
    onSelect?.(city)
  }
  return (
    <div className={cls} key={city.id} title={city.name} onClick={handleCitySelect}>
      {city.name}
    </div>
  )
}

export default CityPanelItem
