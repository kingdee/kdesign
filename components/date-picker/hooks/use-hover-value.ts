import isNumber from 'lodash/isNumber'
import { useState, useEffect, useRef } from 'react'
import { DateType } from '../interface'
import useValueTexts, { ValueTextConfig } from './use-value-texts'

export default function useHoverValue(
  valueText: string,
  { format }: ValueTextConfig,
): [string, (date: DateType) => void, (immediately?: boolean) => void] {
  const [value, internalSetValue] = useState<DateType | null>(null)
  const ref = useRef<number>()

  function setValue(val: DateType | null, immediately = false) {
    isNumber(ref.current) && cancelAnimationFrame(ref.current)
    if (immediately) {
      internalSetValue(val)
      return
    }
    ref.current = requestAnimationFrame(() => {
      internalSetValue(val)
    })
  }

  const valueTexts = useValueTexts(value, {
    format,
  })!

  function onEnter(date: DateType) {
    setValue(date)
  }

  function onLeave(immediately = false) {
    setValue(null, immediately)
  }

  useEffect(() => {
    onLeave(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueText])

  useEffect(
    () => () => {
      if (isNumber(ref.current)) {
        return cancelAnimationFrame(ref.current)
      }
    },
    [],
  )

  return [valueTexts, onEnter, onLeave]
}
