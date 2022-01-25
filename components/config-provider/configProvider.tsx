/**
 * 对外暴露用于注入全局配置属性的Context.Provider
 */
import React, { FunctionComponentElement, useMemo } from 'react'
import assign from 'lodash/assign'
import ConfigContext, { IConfigProps } from './ConfigContext'
import defaultConfig from './defaultConfig'
import localeCacher, { getLangMsg as getLang, getCompLangMsg as getCompLang, CompLangMsgParams } from '../locale/index'
interface IConfigProviderProps {
  value?: IConfigProps
  children?: React.ReactNode
}

const ConfigProvider = (props: IConfigProviderProps): FunctionComponentElement<IConfigProviderProps> => {
  // 处理当前语言
  const { value } = props
  const localeConfig = value && value.localeConfig
  if (localeConfig) {
    localeCacher.setLocalesData(localeConfig.locale, localeConfig.localeData)
  }
  const locale = useMemo(
    () => ({
      getLangMsg: (componentName: string, labelName: string, params?: any) => {
        if (localeConfig && localeConfig.customGetLangMsg) {
          return localeConfig.customGetLangMsg(componentName, labelName, params)
        }
        return getLang(componentName, labelName, params)
      },
      getCompLangMsg: (compLangMsgParams: CompLangMsgParams) => {
        return getCompLang(compLangMsgParams, localeConfig?.customGetLangMsg)
      },
      locale: localeCacher.getLocal(),
    }),
    [localeConfig],
  )
  // 处理组件默认属性

  const providerValue = useMemo(() => assign({}, defaultConfig, value, { locale }), [locale, value])
  return <ConfigContext.Provider value={providerValue}>{props.children}</ConfigContext.Provider>
}
export default ConfigProvider
