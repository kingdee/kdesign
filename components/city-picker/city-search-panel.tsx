import React, { useContext } from 'react'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { City } from './city-panel-item'
import NoData from './no-data'

export interface SearchPanelProps {
  keyword: string
  data: Array<City>
  onSelect?: (city: City) => void
}

const SearchPanel: React.FC<SearchPanelProps> = ({ data = [], keyword = '', onSelect: handleSelect }) => {
  const { getPrefixCls, prefixCls } = useContext(ConfigContext)

  const cityPickerPrefixCls = getPrefixCls!(prefixCls, 'city-picker')
  const containerCls = classNames(`${cityPickerPrefixCls}-search-panel`)
  const hasData = data && data.length > 0
  return (
    <div className={containerCls}>
      {hasData ? (
        data.map((city) => {
          const itemContainerCls = classNames(`${cityPickerPrefixCls}-search-panel-item`)
          const itemLeftCls = classNames(`${cityPickerPrefixCls}-search-panel-item-left`)
          const itemRightCls = classNames(`${cityPickerPrefixCls}-search-panel-item-right`)
          const handleClick = () => {
            handleSelect?.(city)
          }
          return (
            <div className={itemContainerCls} onClick={handleClick} key={city.id}>
              <div className={itemLeftCls}>
                <span
                  dangerouslySetInnerHTML={{
                    __html: city.name!.replace(
                      keyword,
                      `<span class="${cityPickerPrefixCls}-search-keyword">${keyword}</span>`,
                    ),
                  }}
                />
              </div>
              <div className={itemRightCls}>
                <span>{city.province}</span>
                <span>{city.country === '中国' ? '' : city.country}</span>
              </div>
            </div>
          )
        })
      ) : (
        <NoData />
      )}
    </div>
  )
}

export default SearchPanel
