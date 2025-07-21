/**
 * 提供外层注入属性的context
 */
import { createContext } from 'react'
import defaultConfig from './defaultConfig'
import { LocaleConfigType, CompLangMsgParams, ComponentType } from '../locale'
interface IntlUniversal {
  getCompLangMsg: (
    compLangMsgParams: CompLangMsgParams,
    customGetLangMsg?: (componentName: string, labelName: string, params: any) => any,
  ) => any
  getLangMsg: (componentName: ComponentType | string, labelName: string, params?: any) => string | React.ReactNode[]
}
export interface IConfigProps {
  getPrefixCls?: (configPrefixCls?: string, suffixCls?: string, customizePrefixCls?: string) => string
  compDefaultProps?: any
  prefixCls?: string
  localeConfig?: LocaleConfigType
  locale?: IntlUniversal
  isMobile?: boolean
}
export interface IContextConfigProps {
  getPrefixCls?: (configPrefixCls?: string, suffixCls?: string, customizePrefixCls?: string) => string
  compDefaultProps?: any
  prefixCls?: string
  localeConfig?: LocaleConfigType
  locale: IntlUniversal
  isMobile?: boolean
}
const ConfigContext = createContext<IContextConfigProps>(defaultConfig)
export default ConfigContext
