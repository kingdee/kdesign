import React, { useContext } from 'react'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'

const NoData = () => {
  const { getPrefixCls, prefixCls, locale: globalLocale } = useContext(ConfigContext)
  const cityPickerLang = globalLocale.getCompLangMsg({ componentName: 'CityPicker' })

  const cityPickerPrefixCls = getPrefixCls!(prefixCls, 'city-picker')
  const cls = classNames(`${cityPickerPrefixCls}-no-data`)
  return <div className={cls}>{cityPickerLang.noData}</div>
}

export default NoData
