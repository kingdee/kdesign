import { useEffect, RefObject, useState, useRef, useReducer } from 'react'
import ResizeObserver from 'resize-observer-polyfill'
import devWarning from './devwarning'

/**
 * @description 点击指定区域外执行回调
 *
 * @export
 * @param {RefObject<HTMLElement>[]} refs
 * @param {(e: Event) => void} handler
 */
export function useOnClickOutside(refs: RefObject<HTMLElement>[], handler: (e: Event) => void) {
  useEffect(() => {
    const listener = (event: Event) => {
      for (const ref of refs) {
        if (!ref.current || ref.current.contains(event.target as Element)) {
          return
        }
      }
      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [refs, handler])
}

/**
 * @description 合并状态
 *
 * @export
 * @template T
 * @template R
 * @param {(T | (() => T))} defaultStateValue
 * @param {({
 *     defaultValue?: T | (() => T)
 *     value?: T
 *     onChange?: (value: T, prevValue: T) => void
 *     postState?: (value: T) => T
 *   })} [option]
 * @returns {[R, (value: T) => void]}
 */
export function useMergedState<T, R = T>(
  defaultStateValue: T | (() => T), // 初始state
  option?: {
    defaultValue?: T | (() => T) // 传入的默认state
    value?: T // 传入的state
    onChange?: (value: T, prevValue: T) => void // state 变更执行 onChange 回调
    postState?: (value: T) => T // 外部控制内部 state
  },
): [R, (value: T) => void] {
  const { defaultValue, value, onChange, postState } = option || {}
  const [innerValue, setInnerValue] = useState(() => {
    if (value !== undefined) {
      return value
    }
    if (defaultValue !== undefined) {
      return typeof defaultValue === 'function' ? (defaultValue as any)() : defaultValue
    }
    return typeof defaultStateValue === 'function' ? (defaultStateValue as any)() : defaultStateValue
  })

  let mergedValue = value !== undefined ? value : innerValue
  if (postState) {
    mergedValue = postState(mergedValue)
  }

  function triggerChange(newValue: T) {
    setInnerValue(newValue)
    if (mergedValue !== newValue && onChange) {
      onChange(newValue, mergedValue)
    }
  }

  const firstRenderRef = useRef(true)
  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false
      return
    }

    if (value === undefined) {
      setInnerValue(value)
    }
  }, [value])

  return [mergedValue as unknown as R, triggerChange]
}

/**
 * @description 获取之前的值
 *
 * @export
 * @param {P} value
 */

export function usePrevious<P>(value: P): P {
  const ref = useRef(value)
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}

export function useHideDocumentScrollBar(visible: boolean, isBody: boolean, mask: boolean) {
  useEffect(() => {
    let isChange = false
    const previousDocumentOverflow = document.documentElement.style.overflow
    if (visible && isBody && mask) {
      document.documentElement.style.overflow = 'hidden'
      isChange = true
    }
    return () => {
      if (isChange) {
        document.documentElement.style.overflow = previousDocumentOverflow
      }
    }
  }, [visible, isBody, mask])
}

export function useOverflowHidden(container: HTMLElement, hidden?: boolean, allowDisable?: boolean) {
  const needResetContainerStyle = useRef<boolean>(false)
  const originContainerStyle = useRef<Partial<CSSStyleDeclaration>>({})

  const getScrollBarWidth = (element: HTMLElement) => {
    return element.tagName === 'BODY'
      ? window.innerWidth - (document.body.clientWidth || document.documentElement.clientWidth)
      : element.offsetWidth - element.clientWidth
  }

  const setContainerStyle = () => {
    if (container && container.style.overflow !== 'hidden') {
      const originStyle = container.style
      needResetContainerStyle.current = true

      const containerScrollBarWidth = getScrollBarWidth(container)
      if (containerScrollBarWidth) {
        originContainerStyle.current.width = originStyle.width
        container.style.width = `calc(${container.style.width || '100%'} - ${containerScrollBarWidth}px)`
      }

      originContainerStyle.current.overflow = originStyle.overflow
      container.style.overflow = 'hidden'
    }
  }

  const resetContainerStyle = () => {
    if (needResetContainerStyle.current && container) {
      const originStyle = originContainerStyle.current
      Object.keys(originStyle).forEach((i: any) => ((container as any).style[i] = originStyle[i]))
    }
    needResetContainerStyle.current = false
    originContainerStyle.current = {}
  }

  useEffect(() => {
    if (!allowDisable) return
    hidden ? setContainerStyle() : resetContainerStyle()

    return () => {
      resetContainerStyle()
    }
  }, [container, hidden, allowDisable])

  return [resetContainerStyle, setContainerStyle]
}

interface ContentRectType {
  hide: boolean
  bottom: number
  height: number
  left: number
  right: number
  top: number
  width: number
  x: number
  y: number
}
export function useResizeObserver(
  element: (() => HTMLElement | null) | HTMLElement | null,
  handler?: (react: ContentRectType) => void,
) {
  useEffect(() => {
    if (typeof element === 'function') {
      element = element()
    }
    if (!element) {
      devWarning(
        !element && element !== null,
        'useResizeMeasure',
        'Specified element for useResizeMeasure does not exist',
      )
      return
    }
    const measure = (entries: any[]) => {
      if (!entries[0] || !entries[0].contentRect) {
        return
      }
      const contentRect: DOMRectReadOnly = entries[0].contentRect
      const hide = contentRect.width === 0 && contentRect.height === 0 // 隐藏条件：高宽都为0
      // DOMRectReadOnly 对象不可读, 不可赋值
      const rect: ContentRectType = Object.assign({ hide }, contentRect)
      ;['width', 'height', 'x', 'y', 'bottom', 'top', 'left', 'right'].forEach(
        (prop: keyof DOMRectReadOnly & 'hide') => {
          rect[prop] = contentRect[prop]
        },
      )
      handler && handler(rect)
    }
    const resizeObserver = new ResizeObserver(measure)
    resizeObserver && resizeObserver.observe(element)
    return () => {
      resizeObserver && resizeObserver.disconnect()
    }
  }, [element, handler])
}

export function useIsFirstRender() {
  const isFirst = useRef<boolean>(true)
  useEffect(() => {
    isFirst.current = false
  }, [])
  return isFirst.current
}

export function useForceUpdate() {
  const [, dispatch] = useReducer((v) => v + 1, 0)
  return dispatch
}

export function useStateWithPromise<T>(defaultVal: T): [T, (updater: any) => Promise<T>] {
  const [state, setState] = useState({
    value: defaultVal,
    resolve: (e: any) => {
      // eslint-disable-next-line no-unused-expressions, @typescript-eslint/no-unused-expressions
      e
    },
  })

  useEffect(() => {
    state.resolve(state.value)
  }, [state])

  return [
    state.value,
    (updater) => {
      return new Promise((resolve) => {
        setState((prevState) => {
          let nextVal = updater
          if (typeof updater === 'function') {
            nextVal = updater(prevState.value)
          }
          return {
            value: nextVal,
            resolve,
          }
        })
      })
    },
  ]
}
