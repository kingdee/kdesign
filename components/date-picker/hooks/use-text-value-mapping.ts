import * as React from 'react'

export default function useTextValueMapping({
  valueText,
  onTextChange,
}: {
  /** Must useMemo, to assume that `valueTexts` only match on the first change */
  valueText: string
  onTextChange: (text: string) => void
}): [string, (text: string) => void, () => void] {
  const [text, setInnerText] = React.useState('')
  const valueTextRef = React.useRef<string>('')
  valueTextRef.current = valueText

  function triggerTextChange(value: string) {
    setInnerText(value)
    onTextChange(value)
  }

  function resetText() {
    setInnerText(valueTextRef.current)
  }

  React.useEffect(() => {
    if (valueText !== text) {
      resetText()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueText])

  return [text, triggerTextChange, resetText]
}
