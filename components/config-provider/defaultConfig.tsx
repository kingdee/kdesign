import { getLangMsg, getCompLangMsg } from '../locale'
import type { DirectionType } from './ConfigContext'

const defaultConfig = {
  getPrefixCls: (configPrefixCls?: string, suffixCls?: string, customizePrefixCls?: string) => {
    // 获取样式前缀方法
    if (customizePrefixCls) return customizePrefixCls
    configPrefixCls = configPrefixCls || 'kd'
    const t = suffixCls ? `${configPrefixCls}-${suffixCls}` : configPrefixCls
    return t
  },
  prefixCls: 'kd', // 样式前缀
  locale: { getLangMsg, getCompLangMsg },
  direction: 'ltr' as DirectionType,
  isMobile: false,
}
export default defaultConfig
