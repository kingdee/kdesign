import { DateFormat, DateType } from '../interface'
import { formatDate } from '../utils/date-fns'
import useStateMemo from './use-state-memo'

export interface ValueTextConfig {
  format: DateFormat
  // use12Hours?: boolean
}

export default function useValueTexts(value: DateType | null, { format }: ValueTextConfig) {
  return useStateMemo<string>(
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
