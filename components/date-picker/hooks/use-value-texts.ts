import { DateFormat, DateType } from '../interface'
import { formatDate } from '../utils/date-fns'
import useStateMemo from './use-state-memo'

export interface ValueTextConfig {
  format: DateFormat
}

export default function useValueTexts(value: DateType | null, { format }: ValueTextConfig) {
  return useStateMemo(
    () => {
      if (!value) {
        return ''
      }

      const valueTexts: string = formatDate(value, format)!

      return valueTexts
    },
    [value],
    (prev, next) => prev !== next,
  )
}
