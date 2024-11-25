import React, { useState, useCallback, RefObject } from 'react'
import classnames from 'classnames'
import { usePopper } from 'react-popper'

import { useOnClickOutside } from '../_utils/hooks'
import { OutPopperProps, PickerMode } from './interface'

export interface PopperProps extends OutPopperProps {
  prefixCls: string
  inputDivRef: RefObject<HTMLDivElement>
  children: React.ReactNode
  isRange?: boolean
  isShowTime?: boolean
  picker?: PickerMode
  arrowLeft?: number
  triggerInnerOpen: (open: boolean) => void
  onClickOutside?: () => void
}

function Popper(props: PopperProps, ref: React.RefObject<HTMLDivElement>) {
  const {
    showArrow,
    onClickOutside,
    inputDivRef,
    prefixCls,
    arrowLeft = 0,
    dropdownClassName,
    popupStyle,
    isRange,
    isShowTime,
    picker,
  } = props
  const [arrowRef, setArrowRef] = useState(null)
  const onSetArrowRef = useCallback((ref) => {
    setArrowRef(ref)
  }, [])

  useOnClickOutside([ref, inputDivRef], () => {
    onClickOutside && onClickOutside()
  })

  const { styles, attributes } = usePopper(inputDivRef.current, ref.current, {
    placement: 'bottom-start',
    modifiers: [
      {
        name: 'arrow',
        options: {
          element: arrowRef,
          padding: { left: 30 },
        },
      },
    ],
  })
  const arrowCls = classnames({
    [`${prefixCls}-has-arrow`]: showArrow,
    [`${prefixCls}-no-arrow`]: !showArrow,
  })
  const panelWarpperCls = classnames(`${prefixCls}-panel`, dropdownClassName, {
    'has-arrow': showArrow,
    'no-arrow': !showArrow,
    [`${prefixCls}-panel-range`]: isRange && !isShowTime && picker !== 'time',
  })
  const arrowPositionStyle = { transform: `translate(${20 + arrowLeft}px, 0px)` }
  const popperStyle = {
    ...styles.popper,
    ...popupStyle,
  }
  return (
    <div
      ref={ref}
      style={popperStyle}
      {...attributes.popper}
      className={panelWarpperCls}
      onMouseDown={(e) => {
        e.preventDefault()
      }}
    >
      <div ref={onSetArrowRef} style={(styles.arrow, arrowPositionStyle)} className={arrowCls} />
      {props.children}
    </div>
  )
}

export default React.forwardRef(Popper)
