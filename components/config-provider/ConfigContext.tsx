/**
 * 提供外层注入属性的context
 */
import { createContext } from 'react'
import defaultConfig from './defaultConfig'
import { tuple } from '../_utils/type'
import { LocaleConfigType, CompLangMsgParams, ComponentType } from '../locale'

export const DirectionTypes = tuple('ltr', 'rtl')
export type DirectionType = typeof DirectionTypes[number]
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
  direction?: DirectionType
}
export interface IContextConfigProps {
  getPrefixCls?: (configPrefixCls?: string, suffixCls?: string, customizePrefixCls?: string) => string
  compDefaultProps?: any
  prefixCls?: string
  localeConfig?: LocaleConfigType
  locale: IntlUniversal
  direction?: DirectionType
}
const ConfigContext = createContext<IContextConfigProps>(defaultConfig)
export default ConfigContext
