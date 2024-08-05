import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle, RefObject } from 'react'
import Icon from '../icon'
import SignaturePad from './utils/signature_pad'
import classNames from 'classnames'

export interface DrawingBoardProps {
  prefixCls: string
  signatureLangMsg: any
  isEmpty: boolean
  setDataUrl: (dataUrl: string) => void
  setIsEmpty: (value: boolean) => void
  signaturePad: () => SignaturePad | null | undefined
  undo?: () => void
  redo?: () => void
  onClear?: () => void
}

interface SignatureHistoryItem {
  data: string
}
const DrawingBoard = forwardRef<unknown, DrawingBoardProps>((props, ref) => {
  const { prefixCls, isEmpty, setIsEmpty, onClear, signaturePad, undo, redo, signatureLangMsg } = props
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState<number>(-1)
  const [signatureHistory, setSignatureHistory] = useState<SignatureHistoryItem[]>([])
  const canvasRef = useRef() as RefObject<HTMLCanvasElement>
  const canvasWrapperRef = useRef() as RefObject<HTMLDivElement>

  const handleOnClear = () => {
    signaturePad()?.clear()
    setIsEmpty(true)
    setSignatureHistory(signatureHistory.slice(0, 1))
    setCurrentHistoryIndex(0)
    onClear && onClear()
  }

  const saveSignatureToHistory = () => {
    if (signaturePad()) {
      const data = signaturePad()?.toDataURL()
      if (data !== undefined) setSignatureHistory((prevHistory) => [...prevHistory, { data }])
      setCurrentHistoryIndex((prevIndex) => prevIndex + 1)
    }
  }
  const handleUndo = () => {
    if (currentHistoryIndex > 0) {
      setCurrentHistoryIndex((prevIndex) => prevIndex - 1)
      const historyItem = signatureHistory[currentHistoryIndex - 1]
      if (signaturePad() && historyItem) {
        signaturePad()?.clear()
        signaturePad()?.fromDataURL(historyItem.data, { ratio: 1 })
        undo && undo()
      }
    }
  }

  const handleRedo = () => {
    if (currentHistoryIndex < signatureHistory.length - 1) {
      setCurrentHistoryIndex((prevIndex) => prevIndex + 1)
      const historyItem = signatureHistory[currentHistoryIndex + 1]
      if (signaturePad() && historyItem) {
        signaturePad()?.fromDataURL(historyItem.data, { ratio: 1 })
        redo && redo()
      }
    }
  }
  useEffect(() => {
    currentHistoryIndex > 0 ? setIsEmpty(false) : setIsEmpty(true)
  }, [currentHistoryIndex])

  useImperativeHandle(ref as RefObject<unknown>, () => ({
    getCanvasRef: () => canvasRef.current,
    getCanvasWrapperRef: () => canvasWrapperRef.current,
    saveSignatureToHistory,
    signatureHistory,
    setSignatureHistory,
    setCurrentHistoryIndex,
  }))
  return (
    <div className={`${prefixCls}-drawing-board`} ref={canvasWrapperRef}>
      <div
        className={classNames({
          [`${prefixCls}-drawing-board-operation`]: true,
          enabled: !isEmpty,
        })}
      >
        {undo ? (
          <span onClick={() => handleUndo()}>
            <svg width="1em" height="1em" viewBox="0 0 32 32">
              <g id="1016.撤销" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="编组" transform="translate(2.000000, 1.000000)" fill="#000000" fill-rule="nonzero">
                  <path
                    d="M9.16767025,16.9762781 C9.5300869,17.3386948 9.5300869,17.9262881 9.16767025,18.2887049 C8.84552213,18.6108529 8.34545651,18.6466472 7.98377112,18.3960875 L7.85524348,18.2887049 L0.815437446,11.2488988 C-0.203859357,10.229602 -0.267565411,8.61657722 0.624319283,7.52306442 L0.815437446,7.31161852 L7.85524348,0.271812484 C8.21766013,-0.0906041612 8.80525361,-0.0906041612 9.16767025,0.271812484 C9.48981838,0.593960608 9.5256126,1.09402626 9.27505297,1.45571158 L9.16767025,1.58423925 L2.39801882,8.35223283 L18.7197413,8.35223283 C24.8235066,8.35223283 28,11.88167 28,18.5605173 C28,25.0286774 25.0409921,28.8154573 19.1996764,29.6367412 L18.7197413,29.6968277 L3.87132753,29.6968277 C3.358793,29.6968277 2.94330165,29.2813365 2.94330165,28.7688019 C2.94330165,28.3132156 3.27159111,27.9343054 3.70451369,27.8557278 L3.87132753,27.840776 L18.6172581,27.846452 C23.6969089,27.2820464 26.1439483,24.2912204 26.1439483,18.5605173 C26.1439483,13.0283959 23.8870007,10.3626156 19.1446408,10.2148013 L18.7197413,10.2082845 L2.39987488,10.2082845 L9.16767025,16.9762781 Z"
                    id="路径"
                    fill="currentColor"
                  ></path>
                </g>
              </g>
            </svg>
          </span>
        ) : null}
        {redo ? (
          <span onClick={() => handleRedo()}>
            <svg width="1em" height="1em" viewBox="0 0 32 32">
              <g id="1016.撤销" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="编组" transform="translate(2.000000, 1.000000)" fill="#000000" fill-rule="nonzero">
                  <path
                    d="M9.16767025,16.9762781 C9.5300869,17.3386948 9.5300869,17.9262881 9.16767025,18.2887049 C8.84552213,18.6108529 8.34545651,18.6466472 7.98377112,18.3960875 L7.85524348,18.2887049 L0.815437446,11.2488988 C-0.203859357,10.229602 -0.267565411,8.61657722 0.624319283,7.52306442 L0.815437446,7.31161852 L7.85524348,0.271812484 C8.21766013,-0.0906041612 8.80525361,-0.0906041612 9.16767025,0.271812484 C9.48981838,0.593960608 9.5256126,1.09402626 9.27505297,1.45571158 L9.16767025,1.58423925 L2.39801882,8.35223283 L18.7197413,8.35223283 C24.8235066,8.35223283 28,11.88167 28,18.5605173 C28,25.0286774 25.0409921,28.8154573 19.1996764,29.6367412 L18.7197413,29.6968277 L3.87132753,29.6968277 C3.358793,29.6968277 2.94330165,29.2813365 2.94330165,28.7688019 C2.94330165,28.3132156 3.27159111,27.9343054 3.70451369,27.8557278 L3.87132753,27.840776 L18.6172581,27.846452 C23.6969089,27.2820464 26.1439483,24.2912204 26.1439483,18.5605173 C26.1439483,13.0283959 23.8870007,10.3626156 19.1446408,10.2148013 L18.7197413,10.2082845 L2.39987488,10.2082845 L9.16767025,16.9762781 Z"
                    id="路径"
                    fill="currentColor"
                  ></path>
                </g>
              </g>
            </svg>
          </span>
        ) : null}
        {<Icon type="delete" className={`${prefixCls}-drawing-board-clear`} onClick={() => handleOnClear()} />}
      </div>
      <span className={`${prefixCls}-drawing-board-tip`}>{isEmpty ? signatureLangMsg?.pleaseWriteHere : ''}</span>
      <canvas ref={canvasRef}></canvas>
    </div>
  )
})

export default DrawingBoard
