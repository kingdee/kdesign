import { DateFormat, DateType, InnerLocale } from '../interface'
import { formatDate } from '../utils/date-fns'
import useStateMemo from './use-state-memo'

export interface ValueTextConfig {
  format: DateFormat
  locale?: InnerLocale
}

export default function useValueTexts(value: DateType | null, { format, locale }: ValueTextConfig) {
  return useStateMemo(
    () => {
      if (!value) {
        return ''
      }

      const valueTexts: string = formatDate(value, format, locale)!

      return valueTexts
    },
    [value],
    (prev, next) => prev !== next,
  )
}
