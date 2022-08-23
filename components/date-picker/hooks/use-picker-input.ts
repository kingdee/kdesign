import * as React from 'react'
import { useState, useEffect, useRef } from 'react'
import KeyCode from '../../_utils/KeyCode'

export default function usePickerInput({
  preventBlurRef,
  open,
  value,
  isClickOutside,
  triggerOpen,
  // forwardKeyDown,
  blurToCancel,
  onSubmit,
  onCancel,
  onFocus,
  onBlur,
}: {
  preventBlurRef: React.RefObject<boolean>
  open: boolean
  value: string
  isClickOutside: (clickElement: EventTarget | null) => boolean
  triggerOpen: (open: boolean) => void
  // forwardKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => boolean
  blurToCancel?: boolean
  onSubmit: () => void | boolean
  onCancel: () => void
  onFocus?: React.FocusEventHandler<HTMLInputElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement>
}): [React.DOMAttributes<HTMLInputElement>, { focused: boolean; typing: boolean }] {
  const [typing, setTyping] = useState(false)
  const [focused, setFocused] = useState(false)

  const valueChangedRef = useRef<boolean>(false)

  const inputProps: React.DOMAttributes<HTMLInputElement> = {
    onMouseDown: () => {
      setTyping(true)
      triggerOpen(true)
    },
    onKeyDown: (e) => {
      setTyping(true)
      triggerOpen(true)

      switch (e.which) {
        case KeyCode.ENTER: {
          if (!open) {
            triggerOpen(true)
          } else if (onSubmit() !== false) {
            setTyping(true)
          }

          e.preventDefault()
          return
        }

        case KeyCode.TAB: {
          if (typing && open && !e.shiftKey) {
            setTyping(false)
            e.preventDefault()
          }
          return
        }

        case KeyCode.ESC: {
          setTyping(true)
          onCancel()
          return
        }
      }

      if (!open && ![KeyCode.SHIFT].includes(e.which)) {
        triggerOpen(true)
      }
    },

    onFocus: (e) => {
      setTyping(true)
      setFocused(true)

      if (onFocus) {
        onFocus(e)
      }
    },

    onBlur: (e) => {
      if (preventBlurRef.current || !isClickOutside(document.activeElement)) {
        // preventBlurRef.current = false
        return
      }
      if (blurToCancel) {
        setTimeout(() => {
          if (isClickOutside(document.activeElement)) {
            onCancel()
          }
        }, 0)
      } else if (open) {
        triggerOpen(false)

        if (valueChangedRef.current) {
          onSubmit()
        }
      }
      setFocused(false)

      if (onBlur) {
        onBlur(e)
      }
    },
  }

  // check if value changed
  useEffect(() => {
    valueChangedRef.current = false
  }, [open])

  useEffect(() => {
    valueChangedRef.current = true
  }, [value])

  return [inputProps, { focused, typing }]
}
