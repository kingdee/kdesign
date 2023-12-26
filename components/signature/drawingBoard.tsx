import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle, RefObject } from 'react'
import Icon from '../icon'
import SignaturePad from 'signature_pad'
import { Cancellation } from '@kdcloudjs/kdesign-icons'
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
        {undo && <Cancellation onClick={() => handleUndo()} />}
        {redo && <Cancellation onClick={() => handleRedo()} />}
        {onClear && (
          <Icon type="delete" className={`${prefixCls}-drawing-board-clear`} onClick={() => handleOnClear()} />
        )}
      </div>
      <span className={`${prefixCls}-drawing-board-tip`}>{isEmpty ? signatureLangMsg?.pleaseWriteHere : ''}</span>
      <canvas ref={canvasRef}></canvas>
    </div>
  )
})

export default DrawingBoard
