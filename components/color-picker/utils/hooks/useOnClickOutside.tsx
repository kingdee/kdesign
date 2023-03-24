import { useEffect } from 'react'

const useOnClickOutside = (refArr: Array<any>, handler: (e: Event) => void) => {
  useEffect(() => {
    const mouseDownListener = (event: Event) => {
      if (
        refArr.some((ref: any) => {
          return !ref.current || ref.current.contains(event.target)
        })
      ) {
        return
      }

      handler(event)
    }

    document.addEventListener('mousedown', mouseDownListener)
    document.addEventListener('touchstart', mouseDownListener)
  }, [refArr, handler])
}

export default useOnClickOutside
