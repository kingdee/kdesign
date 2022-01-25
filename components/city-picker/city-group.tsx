import React, { useContext } from 'react'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'

export interface CityGroupProps {
  groups: Array<string>
  activedIndex?: number
  changeIndex?: (index: number) => void
}

const CityGroup: React.FC<CityGroupProps> = (props) => {
  const { getPrefixCls, prefixCls } = useContext(ConfigContext)
  const { groups, activedIndex: current = 0, changeIndex } = props

  const cityPickerPrefixCls = getPrefixCls!(prefixCls, 'city-picker')
  const containerCls = classNames(`${cityPickerPrefixCls}-group-container`)

  const handleClick = (groupIndex: number) => {
    changeIndex && changeIndex!(groupIndex)
  }

  return (
    <div className={containerCls}>
      {groups.map((item, index) => {
        const itemCls = classNames(`${cityPickerPrefixCls}-group-item`, {
          active: current === index,
          last: index === groups.length - 1,
        })
        const handleTitleClick = () => {
          handleClick(index)
        }
        return (
          <div className={itemCls} title={item} key={`${item}_${index}`} onClick={handleTitleClick}>
            {item}
          </div>
        )
      })}
    </div>
  )
}

export default CityGroup
