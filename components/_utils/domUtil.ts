import React from 'react'
import scrollIntoView from 'dom-scroll-into-view'

export const scrollToDirectory = (ref: React.MutableRefObject<any>) => {
  const directoryElement: HTMLDivElement = ref.current
  if (directoryElement) {
    const rect = ref.current.getBoundingClientRect()
    const parent = ref.current.parentElement
    const parentRect = parent.getBoundingClientRect()

    const relativeTop = rect.top - parentRect.top
    const relativeBottom = rect.bottom - parentRect.top
    const isHide = relativeTop < 0 || relativeBottom > parent.clientHeight

    if (isHide) {
      scrollIntoView(ref.current, ref.current.parentElement)
    }
  }
}
