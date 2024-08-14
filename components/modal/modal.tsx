import React, {
  ReactNode,
  useContext,
  useEffect,
  useState,
  useRef,
  ReactElement,
  useCallback,
  CSSProperties,
} from 'react'
import { Icon } from '../index'
import Button, { IButtonProps } from '../button/button'
import ReactDOM from 'react-dom'
import { tuple } from '../_utils/type'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { getCompProps } from '../_utils'
import devWarning from '../_utils/devwarning'
import Draggable from 'react-draggable'
import type { DraggableBounds, DraggableEventHandler, DraggableEvent, DraggableData } from 'react-draggable'
import { getLangMsg } from '../locale/locale'
import { useHideDocumentScrollBar } from '../_utils/hooks'
import { isIE } from '../_utils/ieUtil'

type CSSSelector = string
export const ConfirmModalTypes = ['confirm', 'normal']
export const ModalTypes = tuple('confirm', 'warning', 'error', 'normal')
export type ModalType = typeof ModalTypes[number]
type CloseModalFCType = (
  onDoingAction?: ((event?: ClickMouseEvent) => void) | undefined,
  event?: ClickMouseEvent,
) => void
export interface IModalProps {
  body?: ReactNode
  bodyClassName?: string
  bodyStyle?: CSSProperties
  style?: CSSProperties
  cancelButtonProps?: IButtonProps
  cancelText?: ReactNode
  className?: string
  closable?: boolean
  closeIcon?: ReactNode
  destroyOnClose?: boolean
  draggable?: boolean
  focusTriggerAfterClose?: boolean
  footer?: ReactNode
  footerBtnOrder?: 'normal' | 'reverse'
  footerClassName?: string
  footerStyle?: CSSProperties
  getContainer?: HTMLElement | (() => HTMLElement | CSSSelector | null | false) | null | false
  height?: number
  keyboard?: boolean
  mask?: boolean
  maskClassName?: string
  maskClosable?: boolean
  maskStyle?: CSSProperties
  okButtonProps?: IButtonProps
  okText?: ReactNode
  onCancel?: () => void
  onOk?: () => void
  prefixCls?: string
  title?: ReactNode
  titleClassName?: string
  titleIcon?: ReactNode
  titleStyle?: CSSProperties
  type?: ModalType
  visible?: boolean
  width?: number
  showline?: boolean
  bounds?: DraggableBounds | string | false
  overroll?: boolean
  resizable?: boolean
  onResizeStart?: (event: MouseEvent) => void
  onResize?: (event: MouseEvent) => void
  onResizeStop?: (event: MouseEvent) => void
  onDragStart?: DraggableEventHandler
  onDrag?: DraggableEventHandler
  onDragStop?: DraggableEventHandler
}
enum DragDirection {
  N = 'n',
  E = 'e',
  S = 's',
  W = 'w',
  NE = 'ne',
  NW = 'nw',
  SE = 'se',
  SW = 'sw',
}
interface ResizePositon {
  initialX: number
  initialY: number
  initialWidth: number
  initialHeight: number
  top: number
  left: number
  x: number
  y: number
  type: DragDirection | null
}
const initPosition: ResizePositon = {
  initialX: 0,
  initialY: 0,
  initialWidth: 0,
  initialHeight: 0,
  top: 0,
  left: 0,
  x: 0,
  y: 0,
  type: null,
}

type ClickMouseEvent = React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>
const InternalModal = (
  props: IModalProps,
  ref: React.RefObject<HTMLDivElement>,
): ReactElement | React.ReactPortal | null => {
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps } = useContext(ConfigContext)
  const modalProps: IModalProps = getCompProps('Modal', userDefaultProps, props) // 属性需要合并一遍用户定义的默认属性
  const {
    body,
    bodyClassName,
    bodyStyle,
    cancelButtonProps,
    cancelText,
    className,
    closable,
    closeIcon,
    destroyOnClose,
    draggable,
    focusTriggerAfterClose,
    footer,
    footerClassName,
    footerStyle,
    footerBtnOrder,
    getContainer,
    height,
    keyboard,
    mask,
    maskClosable,
    maskStyle,
    maskClassName,
    okButtonProps,
    okText,
    onCancel,
    onOk,
    prefixCls: customPrefixcls,
    title,
    titleIcon,
    type,
    visible,
    width,
    showline,
    onDragStart,
    onDrag,
    onDragStop,
    bounds,
    overroll,
    resizable,
    ...others
  } = modalProps
  const isForceController = visible !== undefined
  const [innerVisible, setInnerVisible] = useState(isForceController ? visible : true) // 需要根据visible来判断，不能一开始为true再去设置false

  const previousActiveElement = useRef<HTMLElement | null>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const containerRef = ref || innerRef
  const modalPrefixCls = getPrefixCls!(prefixCls, 'modal', customPrefixcls)
  devWarning(ModalTypes.indexOf(type!) === -1, 'modal', `cannot found modal type '${type}'`)
  let modalContainer: Element | CSSSelector | undefined | null | false =
    typeof getContainer === 'function' ? getContainer() : getContainer
  if (modalContainer !== false && !(modalContainer instanceof HTMLElement)) {
    try {
      modalContainer = document.querySelector(modalContainer as CSSSelector)
    } catch (error) {
      devWarning(true, 'modal', 'getContainer"s returnValue/value is not a correct CSSSelector')
    }
    modalContainer = document.body
  }
  const [position, setPosition] = useState(
    modalContainer && !overroll ? { x: -(width! / 2), y: -(height! / 2) } : { x: 0, y: 0 },
  )

  useHideDocumentScrollBar(isForceController ? !!visible : !!innerVisible, modalContainer === document.body, !!mask)
  const closeModal = useCallback(() => {
    setInnerVisible(false)
  }, [])
  const proxyCloseModal: CloseModalFCType = useCallback(
    (onDoingAction, event) => {
      onDoingAction && onDoingAction(event)

      if (isForceController) {
        return
      }
      closeModal()
    },
    [isForceController, closeModal],
  )
  const escapeToCloseModal = useCallback(
    (evt: KeyboardEvent) => {
      // In Internet Explorer 9 and Firefox 36 and earlier, the Esc key returns "Esc" instead of "Escape"
      const isModalVisible = destroyOnClose || (isForceController ? visible : innerVisible)
      if (['Escape', 'Esc'].includes(evt.key) && isModalVisible) {
        evt.preventDefault()
        proxyCloseModal(onCancel)
      }
    },
    [proxyCloseModal, onCancel],
  )
  const enterToCloseModal = useCallback(
    (evt: React.KeyboardEvent<HTMLDivElement>) => {
      if (evt.key === 'Enter' && evt.target === containerRef.current) {
        proxyCloseModal(onOk)
        // 无效
        // evt.stopPropagation()
      }
    },
    [proxyCloseModal, onOk],
  )
  const isConfirmType = ConfirmModalTypes.includes(type!)
  const isNormalBtn = !footerBtnOrder || footerBtnOrder === 'normal'
  const finalCancelButtonProps: IButtonProps = Object.assign(
    {
      onClick: useCallback(
        (event: ClickMouseEvent) => {
          proxyCloseModal(onCancel, event)
        },
        [onCancel, proxyCloseModal],
      ),
      type: 'second',
      className: classNames(`${modalPrefixCls}-cancel-btn`, {
        [`${modalPrefixCls}-margin-btn`]: isConfirmType && isNormalBtn,
      }),
    },
    cancelButtonProps,
  )
  const finalOkButtonProps: IButtonProps = Object.assign(
    {
      onClick: useCallback(
        (event: ClickMouseEvent) => {
          proxyCloseModal(onOk, event)
        },
        [onOk, proxyCloseModal],
      ),
      type: ConfirmModalTypes.includes(type!) ? 'primary' : 'second',
      className: classNames(`${modalPrefixCls}-ok-btn`, {
        [`${modalPrefixCls}-margin-btn`]: isConfirmType && !isNormalBtn,
      }),
    },
    okButtonProps,
  )

  const generatorFooterByType = useCallback(
    (type: ModalType = 'confirm') => {
      switch (type) {
        case 'error':
        case 'warning': {
          return (
            <div className={`${modalPrefixCls}-iknow-node`}>
              <Button {...finalOkButtonProps}>{okText || getLangMsg('Modal', 'iknowText')}</Button>
            </div>
          )
        }
        case 'confirm':
        case 'normal':
        default: {
          return (
            <>
              <div className={`${modalPrefixCls}-cancel-node`}>
                <Button {...finalCancelButtonProps}>{cancelText || getLangMsg('Modal', 'cancelText')}</Button>
              </div>
              <div className={`${modalPrefixCls}-ok-node`}>
                <Button {...finalOkButtonProps}>{okText || getLangMsg('Modal', 'okText')}</Button>
              </div>
            </>
          )
        }
      }
    },
    [modalPrefixCls, okText, cancelText, finalCancelButtonProps, finalOkButtonProps],
  )

  useEffect(() => {
    if (isForceController) {
      // 强控制下只有下面该条件成立获取焦点
      if (focusTriggerAfterClose && visible === true) {
        !previousActiveElement.current && (previousActiveElement.current = document.activeElement as HTMLElement)
      }
    } else {
      // 不控制时, 只有下面该条件成立获取焦点
      focusTriggerAfterClose &&
        !previousActiveElement.current &&
        (previousActiveElement.current = document.activeElement as HTMLElement)
    }
    return () => {
      if (focusTriggerAfterClose && previousActiveElement.current) {
        // 这里可能有种情况，如果回车触发弹窗，由于回车又可以关闭弹窗，会导致连续触发回车
        ;(previousActiveElement.current as HTMLElement).focus()
        previousActiveElement.current = null
      }
    }
  }, [focusTriggerAfterClose, visible, isForceController])
  useEffect(() => {
    if (keyboard) {
      document.body.addEventListener('keydown', escapeToCloseModal)
    }
    return () => {
      document.body.removeEventListener('keydown', escapeToCloseModal)
    }
  }, [keyboard, escapeToCloseModal, proxyCloseModal, onCancel])

  let isResizing = false
  const initPositionRef = useRef(initPosition)

  const startResize = useCallback(
    (event: MouseEvent) => {
      const targetElement = event.target as HTMLElement
      if (!targetElement.classList.contains(`${modalPrefixCls}-resise-handle`) || !containerRef.current) {
        return
      }
      const { width: initialWidth, height: initialHeight, top, left } = containerRef.current.getBoundingClientRect()
      initPositionRef.current = {
        initialX: event.clientX,
        initialY: event.clientY,
        initialWidth,
        initialHeight,
        top,
        left,
        x: position.x,
        y: position.y,
        type: targetElement.dataset.type as DragDirection,
      }
      event.preventDefault()
      isResizing = true
      if (overroll && wrapperRef.current) {
        wrapperRef.current.classList.add(`${modalPrefixCls}-wrapper-resizable`)
        setPosition({
          x: left,
          y: top,
        })
        initPositionRef.current.x = left
        initPositionRef.current.y = top
      }
      document.addEventListener('mousemove', resize)
      document.addEventListener('mouseup', stopResize)
    },
    [position],
  )

  useEffect(() => {
    if (containerRef.current && visible) {
      containerRef.current.addEventListener('mousedown', startResize)
    }
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousedown', startResize)
      }
    }
  }, [containerRef, startResize, visible])

  const resize = (event: MouseEvent) => {
    if (!containerRef.current) return
    if (!isResizing || !containerRef.current) return
    const { initialX, initialY, initialHeight, initialWidth, y, x, type } = initPositionRef.current
    const curNHeight = initialY - event.clientY
    const curSHeight = -curNHeight
    const curEWidth = event.clientX - initialX
    const curWWidth = -curEWidth
    switch (type) {
      case DragDirection.N: {
        containerRef.current.style.height = `${curNHeight + initialHeight}px`
        setPosition((pre) => ({
          y: y - curNHeight,
          x: pre.x,
        }))
        break
      }
      case DragDirection.E: {
        containerRef.current.style.width = `${curEWidth + initialWidth}px`
        break
      }
      case DragDirection.S: {
        containerRef.current.style.height = `${curSHeight + initialHeight}px`
        break
      }
      case DragDirection.W: {
        containerRef.current.style.width = `${curWWidth + initialWidth}px`
        setPosition((pre) => ({
          y: pre.y,
          x: x - curWWidth,
        }))
        break
      }
      case DragDirection.NE: {
        containerRef.current.style.height = `${curNHeight + initialHeight}px`
        containerRef.current.style.width = `${curEWidth + initialWidth}px`
        setPosition((pre) => ({
          y: y - curNHeight,
          x: pre.x,
        }))
        break
      }
      case DragDirection.NW: {
        containerRef.current.style.height = `${curNHeight + initialHeight}px`
        containerRef.current.style.width = `${curWWidth + initialWidth}px`
        setPosition({
          y: y - curNHeight,
          x: x - curWWidth,
        })
        break
      }
      case DragDirection.SE: {
        containerRef.current.style.height = `${curSHeight + initialHeight}px`
        containerRef.current.style.width = `${curEWidth + initialWidth}px`
        break
      }
      case DragDirection.SW: {
        containerRef.current.style.width = `${curWWidth + initialWidth}px`
        containerRef.current.style.height = `${curSHeight + initialHeight}px`
        setPosition((pre) => ({
          y: pre.y,
          x: x - curWWidth,
        }))
        break
      }
      default: {
        break
      }
    }
  }

  const stopResize = () => {
    isResizing = false
    initPositionRef.current = initPosition
    document.removeEventListener('mousemove', resize)
    document.removeEventListener('mouseup', stopResize)
  }

  const handleMaskClick = useCallback(() => {
    if (maskClosable) {
      proxyCloseModal(onCancel)
    }
  }, [proxyCloseModal, onCancel, maskClosable])

  const handleWrapperClick = (e: React.MouseEvent<HTMLElement>) => {
    if (wrapperRef.current === e.target) {
      handleMaskClick()
    }
  }

  const isHidden = !destroyOnClose && !(isForceController ? visible : innerVisible)
  const modalClasses = classNames(modalPrefixCls, className, {
    [`${modalPrefixCls}-container`]: true,
    [`${modalPrefixCls}-container-ie`]: isIE,
    [`${modalPrefixCls}-container-hidden`]: isHidden,
    [`${modalPrefixCls}-container-show`]: !isHidden,
  })
  const headerClass = `${modalPrefixCls}-header`
  const container = (
    <div
      className={classNames({
        [`${modalPrefixCls}-container-box`]: true,
        [`${modalPrefixCls}-has-container-box`]: modalContainer && !overroll,
        [`${modalPrefixCls}-showline`]: showline,
      })}
      style={{
        width,
        height,
      }}
      ref={containerRef}
      tabIndex={-1}
      onKeyDown={enterToCloseModal}
    >
      {resizable && (
        <>
          <div data-type="n" className={`${modalPrefixCls}-resise-handle ${modalPrefixCls}-resise-n`}></div>
          <div data-type="e" className={`${modalPrefixCls}-resise-handle ${modalPrefixCls}-resise-e`}></div>
          <div data-type="s" className={`${modalPrefixCls}-resise-handle ${modalPrefixCls}-resise-s`}></div>
          <div data-type="w" className={`${modalPrefixCls}-resise-handle ${modalPrefixCls}-resise-w`}></div>
          <div data-type="ne" className={`${modalPrefixCls}-resise-handle ${modalPrefixCls}-resise-ne`}></div>
          <div data-type="se" className={`${modalPrefixCls}-resise-handle ${modalPrefixCls}-resise-se`}></div>
          <div data-type="sw" className={`${modalPrefixCls}-resise-handle ${modalPrefixCls}-resise-sw`}></div>
          <div data-type="nw" className={`${modalPrefixCls}-resise-handle ${modalPrefixCls}-resise-nw`}></div>
        </>
      )}

      <div className={headerClass}>
        <div className={`${modalPrefixCls}-title-container`}>
          {titleIcon !== undefined
            ? titleIcon
            : type !== 'normal' && (
                <div
                  className={classNames(`${modalPrefixCls}-title-icon`, {
                    [`modal-${type}-title-icon-bgcolor`]: type,
                  })}
                />
              )}
          <div className={`${modalPrefixCls}-title`}>{title}</div>
        </div>
        {closable && (
          <div className={`${modalPrefixCls}-close-icon`} onClick={() => proxyCloseModal(onCancel)}>
            {closeIcon || <Icon type="close" />}
          </div>
        )}
      </div>
      <div className={classNames(`${modalPrefixCls}-body`, bodyClassName)} style={bodyStyle}>
        {body}
      </div>
      {footer !== null && (
        <div
          className={classNames(`${modalPrefixCls}-footer`, `${modalPrefixCls}-${type}-footer`, footerClassName)}
          style={Object.assign(
            { flexDirection: !footer && (!footerBtnOrder || footerBtnOrder === 'normal') ? 'row' : 'row-reverse' },
            footerStyle || {},
          )}
        >
          {footer || generatorFooterByType(type)}
        </div>
      )}
    </div>
  )
  // 没有容器应该是不用居中的
  // 但仍可拖拽
  const handleDragStart = (e: DraggableEvent, data: DraggableData) => {
    onDragStart?.(e, data)
  }

  const handleDrag = (e: DraggableEvent, ui: DraggableData) => {
    setPosition({ x: ui.x, y: ui.y })
    onDrag?.(e, ui)
  }
  const comp: ReactElement = (
    <div className={modalClasses} {...others}>
      {/* 增加clickOutside */}
      {mask && (
        <div
          onClick={handleMaskClick}
          className={classNames(maskClassName, {
            [`${modalPrefixCls}-mask`]: true,
          })}
          style={maskStyle}
        ></div>
      )}
      {overroll ? (
        <div
          tabIndex={-1}
          className={classNames({
            [`${modalPrefixCls}-wrapper`]:
              modalContainer && ((isForceController ? visible : innerVisible) || !destroyOnClose),
          })}
          ref={wrapperRef}
          onMouseDown={handleWrapperClick}
        >
          <div className={`${modalPrefixCls}-dialog`}>
            <Draggable
              position={position}
              handle={`.${headerClass}`}
              disabled={!draggable}
              onStart={handleDragStart}
              onDrag={handleDrag}
              onStop={onDragStop}
              bounds={bounds}
              cancel={`.${modalPrefixCls}-title-container, .${modalPrefixCls}-close-icon`}
            >
              {container}
            </Draggable>
          </div>
        </div>
      ) : (
        <Draggable
          handle={`.${headerClass}`}
          disabled={!draggable}
          position={position}
          onStart={handleDragStart}
          onDrag={handleDrag}
          onStop={onDragStop}
          bounds={bounds}
          cancel={`.${modalPrefixCls}-title-container, .${modalPrefixCls}-close-icon`}
        >
          {container}
        </Draggable>
      )}
    </div>
  )
  const renderComp = ((isForceController ? visible : innerVisible) || !destroyOnClose) && comp
  if (modalContainer && renderComp) return ReactDOM.createPortal(renderComp, modalContainer!)
  return renderComp || null
}

const Modal = React.forwardRef<unknown, IModalProps>(InternalModal)
Modal.displayName = 'Modal'
export default Modal
